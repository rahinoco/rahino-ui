/**
 * @fileoverview Mono ID badge cell — logistics id / client_req_id style.
 */
import { toPersianDigits } from '@/utils/persianDigits';

export interface MonoIdCellProps {
  prefix?: string;
  suffix?: string;
  label?: string;
}

export function MonoIdCell({ prefix = '', suffix, label }: MonoIdCellProps) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      {label ? (
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider hidden md:inline">
          {label}
        </span>
      ) : null}
      <div className="flex items-center gap-1 text-[11px] font-mono font-bold min-w-0">
        <span className="text-slate-700 tracking-wide bg-slate-50 px-1.5 py-0.5 rounded-md ring-1 ring-slate-900/[0.04] shrink-0">
          {toPersianDigits(prefix)}
        </span>
        {suffix ? (
          <>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 tracking-wide truncate">{toPersianDigits(suffix)}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
