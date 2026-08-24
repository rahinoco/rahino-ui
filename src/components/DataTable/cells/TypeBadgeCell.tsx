/**
 * @fileoverview Pill badge for enum / type columns.
 */
import { clsx } from 'clsx';

export interface TypeBadgeCellProps {
  tone?: 'primary' | 'success' | 'warning' | 'slate' | 'error';
  label?: string;
}

const TONE_CLASS = {
  primary: 'bg-primary-50/80 text-primary-700',
  success: 'bg-success-50/80 text-success-700',
  warning: 'bg-warning-50/80 text-warning-700',
  slate: 'bg-slate-100/80 text-slate-600',
  error: 'bg-error-50/80 text-error-700',
} as const;

export function TypeBadgeCell({ label = '—', tone = 'slate' }: TypeBadgeCellProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold',
        TONE_CLASS[tone]
      )}
    >
      {label}
    </span>
  );
}
