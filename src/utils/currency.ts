export type MoneyInput = string | number | null | undefined;

function toFiniteNumber(amount: MoneyInput): number | null {
  if (amount == null || amount === '') return null;
  const n = typeof amount === 'number' ? amount : Number(amount);
  if (!Number.isFinite(n)) return null;
  return n;
}

export function formatMoney(
  amount: MoneyInput,
  locale = 'fa-IR',
  options: Intl.NumberFormatOptions = {}
): string {
  const n = toFiniteNumber(amount);
  if (n == null) return '—';
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
    ...options,
  }).format(n);
}

export function formatMoneyWithLabel(amount: MoneyInput, currencyLabel = 'تومان'): string {
  const formatted = formatMoney(amount);
  if (formatted === '—') return formatted;
  return currencyLabel ? `${formatted} ${currencyLabel}` : formatted;
}

export function formatMoneyCompact(amount: MoneyInput): string {
  const n = toFiniteNumber(amount);
  if (n == null) return '—';
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) {
    return `${formatMoney(n / 1_000_000_000)} میلیارد`;
  }
  if (abs >= 1_000_000) {
    return `${formatMoney(n / 1_000_000)} میلیون`;
  }
  return formatMoney(n);
}
