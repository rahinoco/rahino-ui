import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface DefinitionRowProps {
  label: string;
  value: ReactNode;
  isMono?: boolean;
}

export function DefinitionRow({ label, value, isMono }: DefinitionRowProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
        {label}
      </span>
      <span
        className={clsx(
          'text-slate-900',
          isMono
            ? 'tabular-nums font-sans text-sm tracking-wider font-bold'
            : 'text-base font-black'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export interface SpecRowProps {
  label: string;
  value: ReactNode;
}

export function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex justify-between items-center py-4 px-6 hover:bg-slate-50 transition-colors cursor-default">
      <span className="text-slate-500 text-sm font-black w-1/3">{label}</span>
      <span className="text-slate-900 text-sm tabular-nums font-sans font-bold text-left flex-1 dir-ltr">
        {value}
      </span>
    </div>
  );
}
