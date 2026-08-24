/**
 * @fileoverview Badge — semantic + palette variants. Purple removed (use primary).
 */

import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type BadgeVariant =
  | 'emerald'
  | 'success'
  | 'blue'
  | 'primary'
  | 'rose'
  | 'error'
  | 'danger'
  | 'amber'
  | 'warning'
  | 'purple'
  | 'slate'
  | 'outline';

type BadgeSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<BadgeVariant, string> = {
  emerald: 'bg-success-100 text-success-700 border-success-200/60',
  success: 'bg-success-100 text-success-700 border-success-200/60',
  blue: 'bg-primary-100 text-primary-700 border-primary-200/60',
  primary: 'bg-primary-100 text-primary-700 border-primary-200/60',
  rose: 'bg-error-100 text-error-700 border-error-200/60',
  error: 'bg-error-100 text-error-700 border-error-200/60',
  danger: 'bg-error-100 text-error-700 border-error-200/60',
  amber: 'bg-warning-50 text-warning-700 border-warning-200/50',
  warning: 'bg-warning-50 text-warning-700 border-warning-200/50',
  purple: 'bg-primary-100 text-primary-700 border-primary-200/60',
  slate: 'bg-slate-100 text-slate-600 border-slate-200',
  outline: 'bg-bg-surface border-slate-200 text-slate-500 hover:border-slate-300',
};

const SIZES: Record<BadgeSize, string> = {
  sm: 'text-[9px] px-2 py-0.5 rounded-md uppercase tracking-widest',
  md: 'text-[11px] px-2.5 py-1.5 rounded-xl',
  lg: 'text-xs px-3 py-2 rounded-xl',
};

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: LucideIcon;
  className?: string;
}

export default function Badge({
  children,
  variant = 'slate',
  size = 'md',
  icon: Icon,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-black border transition-colors shadow-sm tabular-nums font-sans',
        VARIANTS[variant] || VARIANTS.slate,
        SIZES[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 10 : 14} strokeWidth={2.5} />}
      {children}
    </span>
  );
}
