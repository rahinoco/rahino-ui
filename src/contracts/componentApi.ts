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
  { name: 'children', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'برچسب دیداری عمل. آیکون هم child است، نه prop جدا.' },
  { name: 'variant', type: "primary | secondary | ghost | danger | stroke | text-only | outline | soft | slate", defaultValue: 'primary', required: false, meaning: 'outline و soft به secondary و slate به primary نگاشت می‌شوند. این نام‌ها canonical نیستند.' },
  { name: 'size', type: 'sm | md | lg', defaultValue: 'md', required: false, meaning: 'ارتفاع کلاس: sm نه، md یازده، lg دوازده. تراکم صفحه prop جدا نیست.' },
  { name: 'isLoading', type: 'boolean', defaultValue: 'undefined', required: false, meaning: 'اسپینر نشان می‌دهد و دکمه را disabled می‌کند. متن جدا برای loading وجود ندارد.' },
  { name: 'disabled', type: 'boolean', defaultValue: 'undefined', required: false, meaning: 'از ویژگی دکمهٔ HTML. با isLoading هم disabled می‌شود.' },
  { name: 'type', type: 'button | submit | reset', defaultValue: 'submit در HTML اگر داخل فرم باشد', required: false, meaning: 'برای عمل غیر از ارسال فرم، type="button" لازم است.' },
  { name: 'className', type: 'string', defaultValue: '—', required: false, meaning: 'عرض کامل از این راه است. prop به نام block وجود ندارد.' },
  { name: 'onClick', type: 'MouseEventHandler', defaultValue: '—', required: false, meaning: 'رویداد دکمهٔ HTML. onValueChange وجود ندارد.' },
]);

export const BUTTON_LIMITS = [
  'prop آیکون وجود ندارد.',
  'open، checked و value در Button نیستند.',
  'گونهٔ success و link در این export نیستند.',
  'hover و focus کلاس‌اند، نه مقدار variant.',
  'این جزء candidate است و تصویب نشده.',
];

export const MODAL_PROPS = propsOf<ModalProps>()([
  { name: 'isOpen', type: 'boolean', defaultValue: '—', required: true, meaning: 'باز بودن. نام open در این جزء نیست.' },
  { name: 'onClose', type: '() => void', defaultValue: '—', required: true, meaning: 'درخواست بستن. onOpenChange وجود ندارد.' },
  { name: 'title', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'عنوان دیداری در h3. به aria-labelledby وصل نشده است.' },
  { name: 'subtitle', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'توضیح زیر عنوان.' },
  { name: 'children', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'بدنه.' },
  { name: 'footer', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'نوار پایین. دکمه‌ها را مصرف‌کننده می‌سازد.' },
  { name: 'size', type: 'sm | md | lg | xl | 2xl', defaultValue: 'md', required: false, meaning: 'حداکثر عرض. تراکم صفحه نیست.' },
  { name: 'hideClose', type: 'boolean', defaultValue: 'false', required: false, meaning: 'دکمهٔ بستن را پنهان می‌کند. Escape همچنان onClose را صدا می‌زند.' },
  { name: 'closeOnBackdrop', type: 'boolean', defaultValue: 'true', required: false, meaning: 'کلیک زمینه onClose را صدا می‌زند.' },
  { name: 'icon', type: 'UiIcon', defaultValue: '—', required: false, meaning: 'آیکون کنار عنوان.' },
  { name: 'headerExtra', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'ردیف اضافه زیر عنوان.' },
  { name: 'bodyClassName', type: 'string', defaultValue: 'bg-bg-body', required: false, meaning: 'کلاس بدنه.' },
  { name: 'className', type: 'string', defaultValue: '—', required: false, meaning: 'کلاس قاب.' },
]);

export const MODAL_LIMITS = [
  'propهای مفهومی open و onOpenChange و defaultOpen در Modal نیستند.',
  'تلهٔ فوکوس و بازگرداندن فوکوس به دکمهٔ بازکننده پیاده نشده است.',
  'aria-labelledby به title وصل نیست.',
  'Escape همیشه onClose را صدا می‌زند؛ نگهبان دادهٔ ذخیره‌نشده داخل جزء نیست.',
  'سایهٔ قاب shadow-heavy است و با سطح آرام بنیان‌ها یکی نیست. این محدودیت اجراست، نه مجوز سایهٔ تازه.',
  'ConfirmationModal جزء جداست و قرارداد dirty یا نتیجهٔ نامعلوم را اجرا نمی‌کند.',
  'این جزء candidate است و تصویب نشده.',
];

export const CONFIRMATION_PROPS = propsOf<ConfirmationModalProps>()([
  { name: 'isOpen', type: 'boolean', defaultValue: '—', required: true, meaning: 'باز بودن.' },
  { name: 'onClose', type: '() => void', defaultValue: '—', required: true, meaning: 'بستن یا انصراف.' },
  { name: 'onConfirm', type: '() => void', defaultValue: '—', required: true, meaning: 'اقدام تأیید. نمونهٔ مستندات عملیات واقعی انجام نمی‌دهد.' },
  { name: 'title', type: 'string', defaultValue: '—', required: false, meaning: 'عنوان.' },
  { name: 'message', type: 'string', defaultValue: '—', required: false, meaning: 'توضیح.' },
  { name: 'confirmText', type: 'string', defaultValue: '—', required: false, meaning: 'متن دکمهٔ تأیید. باید نام عمل باشد، نه «تأیید» بی‌موضوع.' },
  { name: 'cancelText', type: 'string', defaultValue: '—', required: false, meaning: 'متن انصراف.' },
  { name: 'variant', type: 'danger | warning | info', defaultValue: '—', required: false, meaning: 'شدت بصری همین دیالوگ تأیید.' },
  { name: 'isLoading', type: 'boolean', defaultValue: '—', required: false, meaning: 'وضعیت انتظار روی تأیید. نتیجهٔ نامعلوم مالی را جایگزین نمی‌کند.' },
]);
