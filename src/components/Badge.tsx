/**
 * @fileoverview Badge — semantic + palette variants. Purple removed (use primary).
 */

import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { UiIcon } from '@/types/icon';

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
  emerald: 'bg-success-100 text-success-700',
  success: 'bg-success-100 text-success-700',
  blue: 'bg-primary-100 text-primary-700',
  primary: 'bg-primary-100 text-primary-700',
  rose: 'bg-error-100 text-error-700',
  error: 'bg-error-100 text-error-700',
  danger: 'bg-error-100 text-error-700',
  amber: 'bg-warning-50 text-warning-700',
  warning: 'bg-warning-50 text-warning-700',
  purple: 'bg-primary-100 text-primary-700',
  slate: 'bg-slate-100 text-slate-600',
  outline: 'bg-bg-muted text-fg-muted',
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
  icon?: UiIcon;
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
        'inline-flex items-center gap-1.5 border-0 font-black shadow-sm tabular-nums font-sans transition-colors',
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
