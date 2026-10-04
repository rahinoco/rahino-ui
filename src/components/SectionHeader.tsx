/**
 * @fileoverview Section Header — list/section dividers with optional actions.
 */

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import type { UiIcon } from '@/types/icon';

type SectionColor =
  | 'primary'
  | 'blue'
  | 'amber'
  | 'warning'
  | 'emerald'
  | 'success'
  | 'rose'
  | 'error'
  | 'slate';

const COLOR_MAP: Record<SectionColor, string> = {
  primary: 'bg-primary-100 text-primary-600 border-primary-200',
  blue: 'bg-primary-100 text-primary-600 border-primary-200',
  amber: 'bg-warning-50 text-warning-600 border-warning-100',
  warning: 'bg-warning-50 text-warning-600 border-warning-100',
  emerald: 'bg-success-100 text-success-600 border-success-200',
  success: 'bg-success-100 text-success-600 border-success-200',
  rose: 'bg-error-100 text-error-600 border-error-200',
  error: 'bg-error-100 text-error-600 border-error-200',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
};

export interface SectionHeaderProps {
  icon?: UiIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  color?: SectionColor;
  actions?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  color = 'slate',
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div className={clsx('flex items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={clsx(
            'w-10 h-10 rounded-2xl flex items-center justify-center border shadow-sm shrink-0',
            COLOR_MAP[color] || COLOR_MAP.slate
          )}
        >
          {Icon && <Icon size={18} strokeWidth={2.5} />}
        </div>
        <div className="flex flex-col min-w-0">
          <h2 className="text-lg font-black text-slate-800 tracking-tight truncate">{title}</h2>
          {subtitle && <span className="text-[10px] font-bold text-slate-400">{subtitle}</span>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
