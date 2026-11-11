import { clsx } from 'clsx';
import { forwardRef, type InputHTMLAttributes, type MouseEventHandler, type ReactNode, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { ICONOGRAPHY } from '../foundations/canonical/Icons';
import { credentialDirection } from '../lib/credentialDirection';
import IconButton from './IconButton';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'dir'> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  /** Decorative by default; use iconAction for an interactive icon. */
  icon?: ReactNode;
  /** Logical edge: start is right in RTL and left in LTR. */
  iconPosition?: 'start' | 'end';
  /** Clickable icon with a 40px minimum target on touch devices. */
  iconAction?: { label: string; onClick: MouseEventHandler<HTMLButtonElement>; disabled?: boolean };
  /** Content at the reading end, such as a unit or a labeled password visibility button. */
  endAdornment?: ReactNode;
  className?: string;
  inputClassName?: string;
  mono?: boolean;
  /** Visually hide the label; preserve its accessible name and supporting text. */
  dense?: boolean;
  controlSize?: 'sm' | 'md' | 'lg';
  /** Text script and direction are independent: Persian phone digits can still use dir="ltr". */
  textScript?: 'fa' | 'latin';
  id?: string;
  /** Credentials default to LTR in the input. An explicit direction overrides the default. */
  dir?: 'ltr' | 'rtl' | 'auto';
}

/** Filled text input. State approval is tracked separately from implementation. */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helperText, error, icon, iconPosition = 'start', iconAction, endAdornment, className, inputClassName, required,
    mono, dense = false, controlSize = 'md', textScript, id: idProp, dir,
    disabled, readOnly, 'aria-describedby': describedBy, 'aria-invalid': ariaInvalid, ...props }, ref
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasError = error != null && error !== false && error !== '';
  const hasHelper = !hasError && helperText != null && helperText !== false && helperText !== '';
  const invalid = hasError || ariaInvalid === true || ariaInvalid === 'true';
  const description = [describedBy, hasHelper && `${id}-hint`, hasError && `${id}-error`].filter(Boolean).join(' ') || undefined;
  const iconSlot = icon ? iconAction ? <span className={`rds-input__${iconPosition}`}>
    <IconButton appearance="ghost" aria-label={iconAction.label} onClick={iconAction.onClick}
      disabled={disabled || iconAction.disabled}>{icon}</IconButton>
  </span> : <span className="rds-input__icon" aria-hidden="true">{icon}</span> : null;

  return <div className={twMerge(clsx('rds-input', className))} data-control-size={controlSize}>
    {label != null ? <label htmlFor={id} className={clsx('rds-input__label', dense && 'rds-input__label--hidden')}>
      {label}{required ? <span className="rds-input__required" aria-hidden="true">*</span> : null}
    </label> : null}
    <div className="rds-input__field" dir={dir === 'auto' ? undefined : dir}
      onClick={event => {
        if (!(event.target instanceof Element) || event.target.closest('button, a, input, select, textarea, [role="button"]')) return;
        event.currentTarget.querySelector('input')?.focus();
      }}
      data-invalid={invalid || undefined} data-disabled={disabled || undefined} data-readonly={readOnly || undefined}>
      {iconPosition === 'start' ? iconSlot : null}
      <input {...props} id={id} ref={ref} dir={dir ?? credentialDirection(props.type, props.autoComplete)} required={required} disabled={disabled} readOnly={readOnly}
        aria-describedby={description} aria-invalid={hasError ? true : ariaInvalid}
        data-text-script={textScript} data-mono={mono || undefined}
        className={twMerge(clsx('rds-input__control', inputClassName))} />
      {iconPosition === 'end' ? iconSlot : null}
      {endAdornment ? <span className="rds-input__end">{endAdornment}</span> : null}
    </div>
    {hasHelper ? <p className="rds-input__helper" id={`${id}-hint`}>{helperText}</p> : null}
    {hasError ? <p className="rds-input__error" id={`${id}-error`} role="alert">
      <svg className="rds-input__error-mark" viewBox={`0 0 ${ICONOGRAPHY.grid.size} ${ICONOGRAPHY.grid.size}`} aria-hidden="true" focusable="false">
        <path d="M12 5v8M12 19h.01" />
      </svg>{error}
    </p> : null}
  </div>;
});

Input.displayName = 'Input';
export default Input;
