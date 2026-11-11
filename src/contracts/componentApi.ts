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
  { name: 'size', type: 'sm | md | lg', defaultValue: 'md', required: false, meaning: 'حداقل ارتفاع و فاصله از توکن کنترل. sm در لمس به ۴۰ پیکسل می‌رسد.' },
  { name: 'radius', type: 'less | more', defaultValue: 'less', required: false, meaning: 'گردی مستقل از ظاهر، نیت و اندازه: less از radius.8 و more از radius.12. در هر سه عضو خانواده یکسان است.' },
  { name: 'iconStart', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'تنها آیکون ابتدای خط. تزئینی است؛ اگر هر دو آیکون داده شوند، فقط این آیکون نمایش داده می‌شود.' },
  { name: 'iconEnd', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'تنها آیکون انتهای خط، وقتی iconStart داده نشده باشد. بارگذاری جای همان آیکون می‌نشیند.' },
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
  'حداکثر یک آیکون در هر دکمه؛ Check و نشانگر بارگذاری هم آیکون محسوب می‌شوند. آیکون دوم داخل برچسب یا children آیکون‌دکمه قرار ندهید.',
  'outline، success، warning، gradient، glass، raised و shadow در API نیستند.',
  'pressed تعامل لحظه‌ای است و prop وضعیت نیست. انتخاب مال ToggleButton است.',
  'hover و focus در API عمومی جعل نمی‌شوند.',
  'این جزء هنوز approved نیست.',
];

export const MODAL_PROPS = propsOf<ModalProps>()([
  { name: 'isOpen', type: 'boolean', defaultValue: '—', required: true, meaning: 'وضعیت باز بودن.' },
  { name: 'onClose', type: '() => void', defaultValue: '—', required: true, meaning: 'درخواست بستن. مصرف‌کننده می‌تواند تغییرات ذخیره‌نشده را بررسی کند.' },
  { name: 'title', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'عنوان دیداری و نام دسترس‌پذیر دیالوگ.' },
  { name: 'subtitle', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'توضیح کوتاه متصل به دیالوگ برای فناوری کمکی.' },
  { name: 'accessibleName', type: 'string', defaultValue: 'دیالوگ', required: false, meaning: 'نام دسترس‌پذیر برای حالت بدون عنوان. یک نام مشخص ارائه کنید.' },
  { name: 'closeLabel', type: 'string', defaultValue: 'بستن', required: false, meaning: 'نام دکمه بستن برای زبان صفحه.' },
  { name: 'role', type: 'dialog | alertdialog', defaultValue: 'dialog', required: false, meaning: 'alertdialog برای پیام کوتاه و فوری همراه با تصمیم.' },
  { name: 'initialFocusRef', type: 'RefObject<HTMLElement | null>', defaultValue: '—', required: false, meaning: 'هدف فوکوس اولیه در قاب، مانند فیلد فرم یا اقدام امن.' },
  { name: 'returnFocusRef', type: 'RefObject<HTMLElement | null>', defaultValue: '—', required: false, meaning: 'هدف جایگزین وقتی بازکننده دیگر در دسترس نیست.' },
  { name: 'children', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'محتوا یا فرم.' },
  { name: 'footer', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'اقدامات. اقدام اصلی را قبل از انصراف قرار دهید.' },
  { name: 'size', type: 'sm | md | lg | xl | 2xl', defaultValue: 'md', required: false, meaning: 'حداکثر عرض. xl و 2xl اندازه‌های قدیمی برای سازگاری هستند.' },
  { name: 'hideClose', type: 'boolean', defaultValue: 'false', required: false, meaning: 'وقتی اقدام امن در پایین وجود دارد، دکمه بستن بالا را پنهان کنید.' },
  { name: 'closeOnBackdrop', type: 'boolean', defaultValue: 'false', required: false, meaning: 'بستن با کلیک بیرون. مناسب پیش‌نمایش کم‌خطر.' },
  { name: 'closeOnEscape', type: 'boolean', defaultValue: 'true', required: false, meaning: 'Escape و دکمه بستن بالا اجازه درخواست بستن دارند.' },
  { name: 'onDismissBlocked', type: '() => void', defaultValue: '—', required: false, meaning: 'درخواست ردشده با Escape، زمینه یا دکمه بستن بالا.' },
  { name: 'icon', type: 'UiIcon', defaultValue: '—', required: false, meaning: 'آیکون اختیاری کنار عنوان.' },
  { name: 'headerExtra', type: 'ReactNode', defaultValue: '—', required: false, meaning: 'محتوای اضافه زیر عنوان.' },
  { name: 'bodyClassName', type: 'string', defaultValue: '—', required: false, meaning: 'کلاس بدنه.' },
  { name: 'className', type: 'string', defaultValue: '—', required: false, meaning: 'کلاس قاب.' },
]);

export const MODAL_LIMITS = [
  'برای دیالوگ غیرمسدودکننده، از پنل درون صفحه یا الگوی شناور مناسب استفاده کنید.',
  'برای فرم با داده ذخیره‌نشده، انصراف و onClose را به یک مسیر بررسی وصل کنید.',
  'کلیک زمینه فقط با closeOnBackdrop فعال می‌شود.',
  'حالت‌ها برای بازبینی هستند. تأیید انسانی پیش از استفاده لازم است.',
];

export const CONFIRMATION_PROPS = propsOf<ConfirmationModalProps>()([
  { name: 'isOpen', type: 'boolean', defaultValue: '—', required: true, meaning: 'وضعیت باز بودن.' },
  { name: 'onClose', type: '() => void', defaultValue: '—', required: true, meaning: 'بستن با انصراف یا Escape.' },
  { name: 'onConfirm', type: '() => void', defaultValue: '—', required: true, meaning: 'اجرای اقدام اصلی. وضعیت درخواست در اختیار مصرف‌کننده است.' },
  { name: 'title', type: 'string', defaultValue: 'تأیید عملیات', required: false, meaning: 'عنوان را با نام اقدام و موضوع آن بنویسید.' },
  { name: 'message', type: 'string', defaultValue: '—', required: false, meaning: 'پیامد کوتاه که به نام و نقش دیالوگ اضافه می‌شود.' },
  { name: 'confirmText', type: 'string', defaultValue: 'تأیید', required: false, meaning: 'نام دقیق اقدام اصلی.' },
  { name: 'cancelText', type: 'string', defaultValue: 'انصراف', required: false, meaning: 'برچسب اقدام امن.' },
  { name: 'variant', type: 'danger | warning | info', defaultValue: 'danger', required: false, meaning: 'حذف دائمی، هشدار مهم یا تأیید عادی.' },
  { name: 'isLoading', type: 'boolean', defaultValue: 'false', required: false, meaning: 'درخواست فعال است. تأیید دوباره، انصراف و Escape غیرفعال می‌شوند.' },
  { name: 'error', type: 'string', defaultValue: '—', required: false, meaning: 'خطای قابل بازیابی داخل دیالوگ با امکان تلاش دوباره.' },
  { name: 'returnFocusRef', type: 'RefObject<HTMLElement | null>', defaultValue: '—', required: false, meaning: 'هدف فوکوس وقتی بازکننده حذف شده است.' },
]);
