/**
 * Input — borderless soft field, FormField-aligned.
 * Optional `dir="ltr"` for English/numeric credentials: text starts left, icon at end (right).
 */

import { clsx } from 'clsx';
import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import FormField from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'dir'> {
  label?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  /** Extra control on the end edge (e.g. password visibility). Rendered inside the field. */
  endAdornment?: ReactNode;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  mono?: boolean;
  dense?: boolean;
  id?: string;
  /**
   * Text direction inside the control.
   * Use `ltr` for username/password/english values so glyphs and caret read left-to-right.
   */
  dir?: 'ltr' | 'rtl' | 'auto';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      endAdornment,
      className,
      inputClassName,
      placeholder,
      required,
      mono,
      dense = false,
      id: idProp,
      dir,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp || autoId;
    const hasIcon = Boolean(icon);
    const hasEndAdornment = Boolean(endAdornment);
    /** LTR credentials: adornments on the right. Default fields keep icon on the physical left (existing app convention). */
    const isLtr = dir === 'ltr';

    return (
      <FormField
        label={label}
        required={required}
        error={error}
        htmlFor={id}
        className={className}
        dense={dense}
      >
        <div dir={dir} className="relative w-full">
          <input
            id={id}
            ref={ref}
            dir={dir}
            placeholder={placeholder}
            className={twMerge(
              clsx(
                FIELD.controlClass,
                isLtr
                  ? (hasIcon || hasEndAdornment) && 'pe-11'
                  : [hasIcon && 'pl-11', hasEndAdornment && 'pr-11'],
                isLtr && 'text-start',
                error ? FIELD.controlError : FIELD.controlOk,
                mono && 'tabular-nums tracking-wide',
                inputClassName
              )
            )}
            {...props}
          />
          {icon ? (
            <div
              className={clsx(
                'pointer-events-none absolute inset-y-0 flex w-11 items-center justify-center text-fg-subtle',
                isLtr ? 'end-0' : 'left-0'
              )}
            >
              {icon}
            </div>
          ) : null}
          {endAdornment ? (
            <div
              className={clsx(
                'absolute inset-y-0 z-10 flex items-center',
                isLtr ? 'end-1' : 'right-1'
              )}
            >
              {endAdornment}
            </div>
          ) : null}
        </div>
      </FormField>
    );
  }
);

Input.displayName = 'Input';
export default Input;
