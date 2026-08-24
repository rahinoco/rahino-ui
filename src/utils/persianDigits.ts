const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

export function toPersianDigits(value: string | number | null | undefined): string {
  if (value == null) return '';
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

export function hasWesternDigits(value: string): boolean {
  return /\d/.test(value);
}
