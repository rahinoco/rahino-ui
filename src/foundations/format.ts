const DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function toPersianDigits(value: string) {
  return value.replace(/\d/g, (digit) => DIGITS[Number(digit)] ?? digit);
}

export function formatGrouped(value: number, fractionDigits = 0) {
  if (!Number.isFinite(value)) return '—';
  const negative = value < 0;
  const [whole, fraction] = Math.abs(value).toFixed(fractionDigits).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  const body = fraction ? `${grouped}٫${fraction}` : grouped;
  const persian = toPersianDigits(body);
  return negative ? `−${persian}` : persian;
}

export type MoneyUnit = 'toman' | 'rial' | 'usd' | 'eur';

const UNIT: Record<MoneyUnit, string> = {
  toman: 'تومان',
  rial: 'ریال',
  usd: 'دلار',
  eur: 'یورو',
};

/** Display profile. Does not convert currency and does not round stored money. */
export function formatMoneyDisplay(amount: number | null, unit: MoneyUnit, fractionDigits = 0) {
  if (amount == null || !Number.isFinite(amount)) return { value: '—', unit: UNIT[unit], missing: true };
  return { value: formatGrouped(amount, fractionDigits), unit: UNIT[unit], missing: false, negative: amount < 0 };
}

export function formatPercent(value: number, input: 'ratio' | 'percent' = 'percent', fractionDigits = 0) {
  const amount = input === 'ratio' ? value * 100 : value;
  return `${formatGrouped(amount, fractionDigits)}٪`;
}
