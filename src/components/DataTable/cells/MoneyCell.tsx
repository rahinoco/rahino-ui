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
    return <span className="rds-table__secondary">{emptyLabel}</span>;
  }

  return (
    <span
      className="rds-table__money"
      data-emphasis={emphasize || undefined}
    >
      {toPersianDigits(formatMoney(num))}
    </span>
  );
}
