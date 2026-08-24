/**
 * FormField — canonical wrapper so every control shares identical vertical rhythm.
 * FormRow — places fields on one line with items-start (labels align, controls align).
 */

import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { FIELD } from '@/tokens/fieldTokens';

export interface FieldLabelProps {
  children?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  srOnly?: boolean;
}

export function FieldLabel({ children, required, htmlFor, className, srOnly }: FieldLabelProps) {
  if (!children && !srOnly) {
    return <div className="h-[18px] mb-2.5" aria-hidden="true" />;
  }
  return (
    <label htmlFor={htmlFor} className={twMerge(clsx(FIELD.label, srOnly && 'sr-only', className))}>
      {children}
      {required && <span className="text-primary-500">*</span>}
    </label>
  );
}

export interface FieldErrorProps {
  children?: ReactNode;
}

export function FieldError({ children }: FieldErrorProps) {
  if (!children) {
    return <div className="min-h-0" aria-hidden="true" />;
  }
  return (
    <div className={FIELD.errorSlot}>
      <p className={FIELD.errorText}>{children}</p>
    </div>
  );
}

export interface FormFieldProps {
  label?: ReactNode;
  required?: boolean;
  error?: ReactNode;
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
  hideLabel?: boolean;
  dense?: boolean;
}

/** Wrap any control. Always reserves label + error slots for row alignment. */
export default function FormField({
  label,
  required,
  error,
  htmlFor,
  className,
  children,
  hideLabel = false,
  dense = false,
}: FormFieldProps) {
  if (dense) {
    return (
      <div className={twMerge('relative w-full min-w-0 flex items-center', className)}>
        {children}
      </div>
    );
  }

  const showLabelSlot = hideLabel || label != null || required;

  return (
    <div className={twMerge('w-full min-w-0 flex flex-col', className)}>
      {showLabelSlot ? (
        <FieldLabel htmlFor={htmlFor} required={required} srOnly={hideLabel && label != null}>
          {hideLabel ? null : label}
        </FieldLabel>
      ) : null}
      <div className={clsx(FIELD.control, 'relative w-full flex items-center')}>{children}</div>
      <FieldError>{error}</FieldError>
    </div>
  );
}

export interface FormRowProps {
  children?: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  gap?: string;
}

export function FormRow({ children, cols = 2, className, gap = 'gap-4' }: FormRowProps) {
  const colClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
    }[cols] || 'grid-cols-1 sm:grid-cols-2';

  return (
    <div className={twMerge(clsx('grid items-start', colClass, gap, className))}>{children}</div>
  );
}
