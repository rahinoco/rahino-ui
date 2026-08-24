export type ComparisonSourceId = 'qipper' | 'qippo' | 'proposed';

export type SourceAvailability = 'live' | 'awaiting-figma' | 'mirrors-qipper' | 'unavailable';

export interface ComparisonSourceMeta {
  id: ComparisonSourceId;
  label: string;
  availability: SourceAvailability;
  notes?: string;
}

export interface ComparisonEntry {
  componentId: string;
  componentName: string;
  sources: ComparisonSourceMeta[];
  inspect: string[];
}

const QIPPER = {
  id: 'qipper' as const,
  label: 'مرجع کیپر',
  availability: 'live' as const,
  notes: 'پیاده‌سازی استخراج‌شده از qipper-app-frontend. فاز ۱ است، نه نظام نهایی راهینو.',
};

const QIPPO = {
  id: 'qippo' as const,
  label: 'کیپو',
  availability: 'awaiting-figma' as const,
  notes: 'در این فاز وصل نشده. ظاهر کیپو اختراع نمی‌شود.',
};

const PROPOSED = {
  id: 'proposed' as const,
  label: 'راهینو نهایی',
  availability: 'mirrors-qipper' as const,
  notes: 'تصمیم گرفته نشده. استخراج را نظام طراحی نهایی ندانید.',
};

export const COMPARISON_REGISTRY: ComparisonEntry[] = [
  {
    componentId: 'button',
    componentName: 'دکمه',
    inspect: [
      'primary | secondary | ghost | danger',
      'aliases outline/soft→secondary, slate→primary',
      'sm | md | lg',
      'isLoading',
      'disabled',
      'className overrides (!h-12, icon-only)',
      'icons as children',
      'CSS hover/active/focus-visible (not props)',
    ],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'input',
    componentName: 'ورودی',
    inspect: [
      'label',
      'icon',
      'endAdornment',
      'dir=ltr',
      'error',
      'disabled',
      'mono',
      'dense',
      'native input attrs',
    ],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'select',
    componentName: 'انتخابگر',
    inspect: [
      'labeled | unlabeled toolbar',
      'searchable (default true)',
      'open/closed',
      'error',
      'disabled',
      'className !h-12 on unlabeled',
    ],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'checkbox',
    componentName: 'چک‌باکس',
    inspect: ['unchecked', 'checked', 'disabled', 'CSS hover/focus-visible'],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'badge',
    componentName: 'نشان',
    inspect: [
      'emerald/success',
      'blue/primary',
      'rose/error/danger',
      'amber/warning',
      'purple→primary',
      'slate',
      'outline',
      'sm | md | lg',
      'optional icon',
    ],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'tabs',
    componentName: 'تب',
    inspect: ['segmented | underline', 'sm | md | lg', 'icon', 'badge', 'disabled'],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'dialog',
    componentName: 'مودال',
    inspect: [
      'sm | md | lg | xl | 2xl',
      'title/subtitle/icon',
      'footer',
      'hideClose',
      'closeOnBackdrop',
      'headerExtra',
      'Escape + portal',
    ],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'card',
    componentName: 'کارت',
    inspect: ['padding', 'surface'],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'data-table',
    componentName: 'جدول داده',
    inspect: ['card | compact | asset', 'loading', 'empty', 'sort', 'pagination', 'selection'],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
  {
    componentId: 'metric-card',
    componentName: 'کارت متریک',
    inspect: ['hero | radar | stat | progress', 'formatAsMoney', 'drillContent', 'tone'],
    sources: [QIPPER, QIPPO, PROPOSED],
  },
];

export function getComparison(componentId: string) {
  return COMPARISON_REGISTRY.find((entry) => entry.componentId === componentId);
}
