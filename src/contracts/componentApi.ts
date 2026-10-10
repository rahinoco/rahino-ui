import type { ButtonProps } from '@/components/Button';
import type { ModalProps } from '@/components/Modal';
import type { ConfirmationModalProps } from '@/components/ConfirmationModal';

export interface PropRow<Name extends string> {
  name: Name;
  type: string;
  defaultValue: string;
  required: boolean;
  meaning: string;
}

function propsOf<T>() {
  return function <Name extends Extract<keyof T, string>>(rows: PropRow<Name>[]) {
    return rows;
  };
}

/** نام‌ها به کلیدهای ButtonProps وصل‌اند. معنی از مشاهدهٔ Button.tsx است، نه از API مفهومی سند. */
export const BUTTON_PROPS = propsOf<ButtonProps>()([
  { name: 'appearance', type: 'solid | soft | ghost', defaultValue: 'soft', required: false, meaning: 'ظاهر. با intent ترکیب می‌شود. outline در این خانواده نیست.' },
  { name: 'intent', type: 'neutral | brand | danger', defaultValue: 'neutral', required: false, meaning: 'نیت. اقدام اصلی در نمونه‌ها solid و brand است.' },
  { name: 'size', type: 'sm | md | lg', defaultValue: 'md', required: false, meaning: 'حداقل ارتفاع و فاصله از توکن کنترل. sm در لمس به ۴۴ پیکسل می‌رسد.' },
  { name: 'iconStart', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'آیکون ابتدای خط. تزئینی است و دوباره خوانده نمی‌شود.' },
  { name: 'iconEnd', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'آیکون انتهای خط.' },
  { name: 'mirrorStart', type: 'boolean', defaultValue: 'false', required: false, meaning: 'فقط اگر آیکون شروع جهت‌دار و وابسته به مسیر باشد در RTL آینه می‌شود.' },
  { name: 'mirrorEnd', type: 'boolean', defaultValue: 'false', required: false, meaning: 'همان قاعده برای آیکون پایان.' },
  { name: 'loading', type: 'boolean', defaultValue: 'false', required: false, meaning: 'از بیرون کنترل می‌شود. عرض و فوکوس را نگه می‌دارد و کلیک و ارسال تکراری را می‌بندد.' },
  { name: 'loadingLabel', type: 'string', defaultValue: 'در حال انجام', required: false, meaning: 'نام وضعیت بارگذاری برای اعلان.' },
  { name: 'fullWidth', type: 'boolean', defaultValue: 'false', required: false, meaning: 'عرض را به والد می‌دهد.' },
  { name: 'href', type: 'string', defaultValue: '—', required: false, meaning: 'اگر باشد عنصر لینک است، نه دکمه.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'undefined', required: false, meaning: 'ویژگی بومی. اجرا را می‌بندد و با کم‌کردن opacity ساخته نمی‌شود.' },
  { name: 'type', type: 'button | submit | reset', defaultValue: 'button', required: false, meaning: 'پیش‌فرض button است. submit باید صریح باشد.' },
  { name: 'children', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'برچسب. متن بلند بریده نمی‌شود.' },
  { name: 'onClick', type: 'MouseEventHandler', defaultValue: '—', required: false, meaning: 'در loading و disabled اجرا نمی‌شود.' },
]);

export const BUTTON_LIMITS = [
  'outline، success، warning، gradient، glass، raised و shadow در API نیستند.',
  'pressed تعامل لحظه‌ای است و prop وضعیت نیست. انتخاب مال ToggleButton است.',
  'hover و focus در API عمومی جعل نمی‌شوند.',
  'این جزء هنوز approved نیست.',
];

export const MODAL_PROPS = propsOf<ModalProps>()([
  { name: 'isOpen', type: 'boolean', defaultValue: '—', required: true, meaning: 'باز بودن. نام open در این جزء نیست.' },
  { name: 'onClose', type: '() => void', defaultValue: '—', required: true, meaning: 'درخواست بستن. onOpenChange وجود ندارد.' },
  { name: 'title', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'عنوان دیداری در h3. اگر مقدار داشته باشد، dialog با aria-labelledby به همان عنوان وصل است.' },
  { name: 'subtitle', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'توضیح زیر عنوان.' },
  { name: 'children', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'بدنه.' },
  { name: 'footer', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'نوار پایین. دکمه‌ها را مصرف‌کننده می‌سازد.' },
  { name: 'size', type: 'sm | md | lg | xl | 2xl', defaultValue: 'md', required: false, meaning: 'حداکثر عرض. تراکم صفحه نیست.' },
  { name: 'hideClose', type: 'boolean', defaultValue: 'false', required: false, meaning: 'دکمهٔ بستن را پنهان می‌کند. Escape از این پرچم پیروی نمی‌کند.' },
  { name: 'closeOnBackdrop', type: 'boolean', defaultValue: 'true', required: false, meaning: 'کلیک زمینه onClose را صدا می‌زند. برای دادهٔ ذخیره‌نشده false.' },
  { name: 'closeOnEscape', type: 'boolean', defaultValue: 'true', required: false, meaning: 'Escape و دکمهٔ بستن روی لایهٔ فعال onClose را صدا می‌زنند. false یعنی داده بی‌اطلاع دور ریخته نمی‌شود.' },
  { name: 'onDismissBlocked', type: '() => void', defaultValue: '—', required: false, meaning: 'وقتی Escape یا زمینه به‌خاطر پرچم بالا نبندد. جزء خودش پیام هشدار نمی‌سازد.' },
  { name: 'icon', type: 'UiIcon', defaultValue: '—', required: false, meaning: 'آیکون کنار عنوان.' },
  { name: 'headerExtra', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'ردیف اضافه زیر عنوان.' },
  { name: 'bodyClassName', type: 'string', defaultValue: 'bg-bg-body', required: false, meaning: 'کلاس بدنه.' },
  { name: 'className', type: 'string', defaultValue: '—', required: false, meaning: 'کلاس قاب.' },
]);

export const MODAL_LIMITS = [
  'propهای مفهومی open و onOpenChange و defaultOpen در Modal نیستند.',
  'فوکوس اولیه خود قاب است تا عنوان خوانده شود. prop برای هدف‌گرفتن فیلد مشخص وجود ندارد.',
  'محافظت از دادهٔ ذخیره‌نشده با closeOnEscape و closeOnBackdrop برابر false است. در این حالت Escape، زمینه و دکمهٔ بستن onClose را صدا نمی‌زنند. جزء دیالوگ تأیید دوم نمی‌سازد؛ ادامه یا انصراف را مصرف‌کننده نشان می‌دهد.',
  'سایهٔ قاب shadow-heavy است و با سطح آرام بنیان‌ها یکی نیست. این محدودیت اجراست، نه مجوز سایهٔ تازه.',
  'ConfirmationModal جزء جداست و پرچم دادهٔ ذخیره‌نشده را خودش ندارد.',
  'کیبورد مجازی موبایل در این جزء آزمون جدا ندارد.',
  'این جزء candidate است و تصویب نشده.',
];

export const CONFIRMATION_PROPS = propsOf<ConfirmationModalProps>()([
  { name: 'isOpen', type: 'boolean', defaultValue: '—', required: true, meaning: 'باز بودن.' },
  { name: 'onClose', type: '() => void', defaultValue: '—', required: true, meaning: 'بستن یا انصراف.' },
  { name: 'onConfirm', type: '() => void', defaultValue: '—', required: true, meaning: 'اقدام تأیید. نمونهٔ مستندات عملیات واقعی انجام نمی‌دهد.' },
  { name: 'title', type: 'string', defaultValue: 'تأیید عملیات', required: false, meaning: 'پیش‌فرض بی‌موضوع است و در مصرف واقعی باید با نام عمل عوض شود.' },
  { name: 'message', type: 'string', defaultValue: '—', required: false, meaning: 'توضیح.' },
  { name: 'confirmText', type: 'string', defaultValue: 'تأیید', required: false, meaning: 'پیش‌فرض بی‌موضوع است. باید نام عمل باشد.' },
  { name: 'cancelText', type: 'string', defaultValue: 'انصراف', required: false, meaning: 'متن انصراف.' },
  { name: 'variant', type: 'danger | warning | info', defaultValue: 'danger', required: false, meaning: 'شدت بصری همین دیالوگ تأیید.' },
  { name: 'isLoading', type: 'boolean', defaultValue: 'false', required: false, meaning: 'وضعیت انتظار روی تأیید. نتیجهٔ نامعلوم مالی را جایگزین نمی‌کند.' },
]);
