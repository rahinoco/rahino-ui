/**
 * @fileoverview Currency amount cell with Qipper tabular numerals.
 */
import { formatMoney } from '@/utils/currency';
import { toPersianDigits } from '@/utils/persianDigits';

export interface MoneyCellProps {
  amount?: string | number | null;
  emptyLabel?: string;
  emphasize?: boolean;
}

export function MoneyCell({ amount = 0, emptyLabel, emphasize = false }: MoneyCellProps) {
  const num = Number(amount ?? 0);
  if (!num && emptyLabel) {
    return <span className="text-slate-300 font-bold">{emptyLabel}</span>;
  }

  return (
    <span
      className={
        emphasize
          ? 'text-sm font-black text-slate-900 tabular-nums'
          : 'text-sm font-bold text-slate-700 tabular-nums'
      }
    >
      {toPersianDigits(formatMoney(num))}
    </span>
  );
}
