/**
 * Rahino Input — Qipper field geometry/tokens with Material floating label.
 */

import { clsx } from 'clsx';
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

import { FieldError } from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

export interface RahinoInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'dir'> {
  label?: ReactNode;
  error?: ReactNode;
  icon?: ReactNode;
  /** Extra control on the end edge (e.g. password visibility). Rendered inside the field. */
  endAdornment?: ReactNode;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  mono?: boolean;
  id?: string;
  /**
   * Text direction inside the control.
   * Use `ltr` for username/password/english values so glyphs and caret read left-to-right.
   */
  dir?: 'ltr' | 'rtl' | 'auto';
}

function hasInputValue(value: unknown, defaultValue: unknown): boolean {
  const raw = value !== undefined ? value : defaultValue;
  if (raw == null) return false;
  return String(raw).length > 0;
}

const RahinoInput = forwardRef<HTMLInputElement, RahinoInputProps>(
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
      id: idProp,
      dir,
      onFocus,
      onBlur,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp || autoId;
    const hasIcon = Boolean(icon);
    const hasEndAdornment = Boolean(endAdornment);
    const isLtr = dir === 'ltr';
    const isControlled = value !== undefined;
    const [focused, setFocused] = useState(false);
    const [uncontrolledFilled, setUncontrolledFilled] = useState(() =>
      hasInputValue(undefined, defaultValue)
    );
    const filled = isControlled ? hasInputValue(value, undefined) : uncontrolledFilled;
    const floated = Boolean(label) && (focused || filled);
    const showFloating = Boolean(label);

    return (
      <div className={twMerge('w-full min-w-0 flex flex-col', className)}>
        <div
          dir={dir}
          className="rahino-float"
          data-floated={floated ? 'true' : undefined}
          data-has-icon={hasIcon && !isLtr ? 'true' : undefined}
          data-has-end={hasEndAdornment || (hasIcon && isLtr) ? 'true' : undefined}
          data-ltr={isLtr ? 'true' : undefined}
          data-error={error ? 'true' : undefined}
        >
          <input
            id={id}
            ref={ref}
            dir={dir}
            value={value}
            defaultValue={defaultValue}
            placeholder={showFloating ? (focused && !filled ? placeholder : ' ') : placeholder}
            aria-invalid={error ? true : undefined}
            aria-required={required || undefined}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            onChange={(e) => {
              if (!isControlled) setUncontrolledFilled(e.target.value.length > 0);
              onChange?.(e);
            }}
            className={twMerge(
              clsx(
                FIELD.controlClass,
                showFloating && 'rahino-float__control',
                isLtr
                  ? (hasIcon || hasEndAdornment) && 'pe-11'
                  : [hasIcon && 'pl-11', hasEndAdornment && 'pr-11'],
                isLtr && 'text-start',
                error ? FIELD.controlError : FIELD.controlOk,
                mono && '[font-family:var(--rds-font-family-mono)]',
                showFloating && 'placeholder:text-transparent',
                inputClassName
              )
            )}
            {...props}
          />
          {showFloating ? (
            <label htmlFor={id} className="rahino-float__label">
              {label}
              {required ? <span className="text-primary-500"> *</span> : null}
            </label>
          ) : null}
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
        <FieldError>{error}</FieldError>
      </div>
    );
  }
);

RahinoInput.displayName = 'RahinoInput';
export default RahinoInput;
