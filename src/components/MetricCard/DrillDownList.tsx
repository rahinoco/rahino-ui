/**
 * @fileoverview Drill-down rows for expandable hero KPI cards.
 */
import { clsx } from 'clsx';

import { toPersianDigits } from '@/utils/persianDigits';

export interface DrillDownItem {
  label: string;
  value: string | number;
  color?: string;
}

export function DrillDownList({ items }: { items: DrillDownItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center gap-4">
          <span className="text-[11px] font-bold text-slate-500">{item.label}</span>
          <span className={clsx('text-xs font-bold tabular-nums', item.color ?? 'text-slate-700')}>
            {typeof item.value === 'number' ? toPersianDigits(item.value) : item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
