import { getQippoComponent } from '../qippo/catalog';

export type ComparisonSourceId = 'qipper' | 'qippo' | 'proposed';

export type SourceAvailability =
  | 'live'
  | 'awaiting-figma'
  | 'figma-reference'
  | 'mirrors-qipper'
  | 'unavailable';

export interface ComparisonSourceMeta {
  id: ComparisonSourceId;
  label: string;
  availability: SourceAvailability;
  notes?: string;
  screenshot?: string;
  screenshots?: string[];
  figmaUrl?: string;
  nodeId?: string;
}

export type ComparisonPresence = 'mapped' | 'qippo-only' | 'qipper-only' | 'needs-review';

export interface ComparisonEntry {
  componentId: string;
  componentName: string;
  presence: ComparisonPresence;
  reviewPriority?: number;
  inspect: string[];
  qippoInspect?: string[];
  sources: ComparisonSourceMeta[];
}

const QIPPER: ComparisonSourceMeta = {
  id: 'qipper',
  label: 'مرجع کیپر',
  availability: 'live',
  notes: 'پیاده‌سازی استخراج‌شده از qipper-app-frontend. فاز ۱ است، نه نظام نهایی راهی‌نو.',
};

const QIPPER_ABSENT: ComparisonSourceMeta = {
  id: 'qipper',
  label: 'مرجع کیپر',
  availability: 'unavailable',
  notes: 'در رابط اشتراکی کیپر استخراج نشده یا وجود ندارد.',
};

const PROPOSED: ComparisonSourceMeta = {
  id: 'proposed',
  label: 'راهی‌نو نهایی',
  availability: 'mirrors-qipper',
  notes: 'تصمیم گرفته نشده. نه کیپر و نه کیپو نظام نهایی نیستند.',
};

const QIPPO_LIVE_NOTES: Record<string, string> = {
  button: 'پیاده‌سازی تعاملی از جزء Button فیگما — Ui Kit / Button-Component / 2230:6522. نظام نهایی نیست.',
  input: 'پیاده‌سازی تعاملی Text input — 7130:57816. هندسه از فیگما؛ رنگ از توکن کیپر.',
  select: 'پیاده‌سازی تعاملی Select — 7347:24406. منوی بسته/باز، نه combobox جستجوپذیر.',
  checkbox: 'پیاده‌سازی تعاملی Checkbox — 2896:22985. simple / Item / Item+Desc.',
  radio: 'پیاده‌سازی تعاملی Radio دایره‌ای — 2858:4242. شکاف بزرگ با RadioGroup قطعه‌ای کیپر.',
  switch: 'پیاده‌سازی تعاملی Switch — 2014:3071. فقط کیپو؛ کیپر twin ندارد.',
  tabs: 'پیاده‌سازی تعاملی Tabs زیرخطی — 2035:4098. Segmented جداست.',
  'segmented-pills': 'پیاده‌سازی تعاملی Segmented — 7506:49134.',
  avatar: 'پیاده‌سازی تعاملی Avatar — 2066:1223. کیپر avatar استخراج نشده.',
  card: 'سطح fair-lab از chrome کارت — 2325:1506. ماژول‌های محصول فیگما جایگزین نمی‌شوند.',
  'icon-button': 'پیاده‌سازی تعاملی Icon Button — 2039:3836.',
  toast: 'پیاده‌سازی تعاملی Snackbar — 2302:1232. با InlineNotice کیپر فقط مفهومی هم‌ارز است.',
  otp: 'پیاده‌سازی تعاملی Login Code — 2187:3585. فقط کیپو.',
};

const QIPPO_LIVE_IDS = new Set(Object.keys(QIPPO_LIVE_NOTES));

function qippoSource(id: string): ComparisonSourceMeta {
  const item = getQippoComponent(id);
  if (QIPPO_LIVE_IDS.has(id) && item) {
    return {
      id: 'qippo',
      label: 'مرجع کیپو',
      availability: 'live',
      notes: QIPPO_LIVE_NOTES[id],
      figmaUrl: item.figmaUrl,
      nodeId: item.nodeId,
    };
  }
  if (!item || item.presence === 'qipper-only') {
    return {
      id: 'qippo',
      label: 'کیپو',
      availability: 'unavailable',
      notes:
        item?.summary ??
        'در صفحهٔ Ui Kit کیپو به‌عنوان جزء نام‌گذاری‌شده پیدا نشد. حدس زده نمی‌شود.',
      figmaUrl: item?.figmaUrl,
      nodeId: item?.nodeId,
    };
  }
  return {
    id: 'qippo',
    label: 'کیپو',
    availability: 'awaiting-figma',
    notes: 'هنوز به‌صورت کد بازسازی نشده است.',
    figmaUrl: item.figmaUrl,
    nodeId: item.nodeId,
  };
}

function entry(
  componentId: string,
  componentName: string,
  inspect: string[],
  extras: {
    presence?: ComparisonPresence;
    reviewPriority?: number;
    qippoInspect?: string[];
    qipperLive?: boolean;
  } = {}
): ComparisonEntry {
  const qippo = getQippoComponent(componentId);
  const presence = extras.presence ?? qippo?.presence ?? 'needs-review';
  const qipperLive = extras.qipperLive ?? presence !== 'qippo-only';
  return {
    componentId,
    componentName,
    presence,
    reviewPriority: extras.reviewPriority ?? qippo?.reviewPriority,
    inspect,
    qippoInspect: extras.qippoInspect ?? qippo?.differences,
    sources: [qipperLive ? QIPPER : QIPPER_ABSENT, qippoSource(componentId), PROPOSED],
  };
}

export const COMPARISON_REGISTRY: ComparisonEntry[] = [
  entry(
    'button',
    'دکمه',
    [
      'primary | secondary | ghost | danger',
      'aliases outline/soft→secondary, slate→primary',
      'sm | md | lg',
      'isLoading',
      'disabled',
      'className overrides (!h-12, icon-only)',
      'icons as children',
      'CSS hover/active/focus-visible (not props)',
    ],
    { reviewPriority: 1 }
  ),
  entry(
    'input',
    'ورودی',
    ['label', 'icon', 'endAdornment', 'dir=ltr', 'error', 'disabled', 'mono', 'dense', 'native input attrs'],
    { reviewPriority: 2 }
  ),
  entry(
    'select',
    'انتخابگر',
    [
      'labeled | unlabeled toolbar',
      'searchable (default true)',
      'open/closed',
      'error',
      'disabled',
      'className !h-12 on unlabeled',
    ],
    { reviewPriority: 3 }
  ),
  entry('tabs', 'تب', ['segmented | underline', 'sm | md | lg', 'icon', 'badge', 'disabled'], {
    reviewPriority: 4,
  }),
  entry('icon-button', 'دکمه آیکونی', ['Qipper: Button + !w-10 !px-0 (not a primitive)'], {
    reviewPriority: 5,
    qipperLive: false,
  }),
  entry('checkbox', 'چک‌باکس', ['unchecked', 'checked', 'disabled', 'CSS hover/focus-visible']),
  entry('radio', 'رادیو', ['Qipper: RadioGroup segmented + RadioPills — not a circle']),
  entry('switch', 'سوییچ', ['در کیپر استخراج نشده'], { qipperLive: false }),
  entry('segmented-pills', 'کنترل قطعه‌ای', ['RadioPills', 'SegmentedPills', 'Tabs layout=segmented']),
  entry('avatar', 'آواتار', ['Qipper: PersianAvatar widget, not extracted']),
  entry('card', 'کارت', ['padding', 'surface']),
  entry('date-picker', 'انتخاب تاریخ', ['Jalali', 'persian-date-kit', 'popover']),
  entry('app-chrome', 'هدر', ['Qipper widgets/layout header — not extracted'], { qipperLive: false }),
  entry('toast', 'اسنک‌بار / اعلان', ['Qipper InlineNotice is a page banner, not a snackbar']),
  entry('otp', 'کد ورود', ['در کیپر وجود ندارد'], { qipperLive: false }),
  entry(
    'dialog',
    'مودال',
    [
      'sm | md | lg | xl | 2xl',
      'title/subtitle/icon',
      'footer',
      'hideClose',
      'closeOnBackdrop',
      'headerExtra',
      'Escape + portal',
    ]
  ),
  entry('data-table', 'جدول داده', [
    'card | compact | asset',
    'loading',
    'empty',
    'sort',
    'pagination',
    'selection',
  ]),
  entry('badge', 'نشان', [
    'emerald/success',
    'blue/primary',
    'rose/error/danger',
    'amber/warning',
    'purple→primary',
    'slate',
    'outline',
    'sm | md | lg',
  ]),
  entry('metric-card', 'کارت متریک', ['hero | radar | stat | progress', 'formatAsMoney', 'drillContent', 'tone']),
];

export function getComparison(componentId: string) {
  return COMPARISON_REGISTRY.find((entry) => entry.componentId === componentId);
}

export function comparisonReviewQueue() {
  return [...COMPARISON_REGISTRY]
    .filter((entry) => entry.reviewPriority != null)
    .sort((a, b) => (a.reviewPriority ?? 99) - (b.reviewPriority ?? 99));
}
