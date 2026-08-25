/**
 * Qipper Button — borderless, soft-fill, minimal motion.
 */

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const MotionButton = motion.create ? motion.create('button') : motion.button;

const VARIANT_ALIASES: Record<string, ButtonVariant> = {
  outline: 'secondary',
  soft: 'secondary',
  slate: 'primary',
};

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'stroke' | 'text-only';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onAnimationStart'
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
    | 'onDragEnter'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDrop'
  > {
  children?: ReactNode;
  variant?: ButtonVariant | keyof typeof VARIANT_ALIASES;
  size?: ButtonSize;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const resolved = VARIANT_ALIASES[variant] || (variant as ButtonVariant);

  const base =
    'relative inline-flex items-center justify-center gap-2 font-semibold select-none outline-none ' +
    'transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none ' +
    'rounded-2xl border-0 focus-visible:ring-2 focus-visible:ring-primary-400/35 focus-visible:ring-offset-0';

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 ' +
      'shadow-glow hover:shadow-glow',
    secondary:
      'bg-bg-muted text-fg-muted hover:bg-bg-elevated hover:text-fg active:bg-bg-muted ' +
      'shadow-light hover:shadow-light',
    ghost: 'bg-transparent text-fg-muted hover:bg-bg-muted hover:text-fg active:bg-bg-muted',
    danger:
      'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 ' +
      'shadow-[0_4px_16px_rgba(239,68,68,0.28)] hover:shadow-[0_6px_22px_rgba(239,68,68,0.34)]',
    stroke:
      'bg-transparent text-primary-600 shadow-[inset_0_0_0_2px_var(--qipper-brand-600)] ' +
      'hover:bg-primary-500 hover:text-white hover:shadow-glow active:bg-primary-600',
    'text-only':
      'bg-transparent text-primary-600 shadow-none hover:bg-transparent hover:text-primary-700 ' +
      'active:text-primary-800',
  };

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-4 text-xs rounded-xl',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-7 text-sm',
  };

  return (
    <MotionButton
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 520, damping: 28 }}
      className={twMerge(
        clsx(base, variants[resolved] || variants.primary, sizes[size], className)
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </MotionButton>
  );
}
