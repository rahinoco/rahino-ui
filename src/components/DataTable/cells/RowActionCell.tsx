/**
 * @fileoverview Trailing row action — compact ghost button.
 */
import { ArrowLeft } from 'lucide-react';

export interface RowActionCellProps {
  label?: string;
  onAction?: () => void;
}

export function RowActionCell({ label = 'مشاهده', onAction }: RowActionCellProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-1 h-8 px-2.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50/50 transition-colors outline-none text-[10px] font-semibold"
      onClick={(e) => {
        e.stopPropagation();
        onAction?.();
      }}
    >
      <ArrowLeft size={13} strokeWidth={2.5} className="shrink-0" />
      <span className="whitespace-nowrap hidden xl:inline">{label}</span>
    </button>
  );
}
