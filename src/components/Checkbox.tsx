import { clsx } from 'clsx';
import { Check, Minus } from 'lucide-react';
import { useId, useRef, useState, type ReactNode } from 'react';

export type CheckboxType = 'simple' | 'item' | 'item-desc';
export interface CheckboxProps {
  /** Reuse the checkbox recipe as one listbox option, without a nested control. */
  role?: 'checkbox' | 'option';
  id?: string;
  tabIndex?: number;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  type?: CheckboxType;
  'aria-label'?: string;
}

/** Foundation-based candidate. Human state approval remains separate. */
export default function Checkbox({ checked = false, indeterminate = false, onChange, className, disabled, label, description, type = 'simple', 'aria-label': ariaLabel, role = 'checkbox', id: controlId, tabIndex }: CheckboxProps) {
  const id = useId();
  const [pressed, setPressed] = useState(false);
  const pointerId = useRef<number | null>(null);
  const endPress = () => { pointerId.current = null; setPressed(false); };
  const selected = indeterminate || checked;
  const showDescription = type === 'item-desc' && Boolean(description);
  return (
    <button type="button" id={controlId} tabIndex={tabIndex} role={role}
      aria-checked={role === 'checkbox' ? indeterminate ? 'mixed' : checked : undefined}
      aria-selected={role === 'option' ? checked : undefined} aria-disabled={disabled || undefined}
      aria-label={ariaLabel} aria-labelledby={!ariaLabel && label ? `${id}-label` : undefined}
      aria-describedby={showDescription ? `${id}-description` : undefined} disabled={disabled}
      onPointerDown={event => {
        if (!disabled && event.isPrimary && event.button === 0) {
          pointerId.current = event.pointerId;
          setPressed(true);
        }
      }}
      onPointerEnter={event => {
        if (!disabled && pointerId.current === event.pointerId && event.buttons === 1) setPressed(true);
      }}
      onPointerLeave={() => setPressed(false)}
      onPointerUp={endPress} onPointerCancel={endPress} onLostPointerCapture={endPress}
      onKeyDown={event => {
        if (!disabled && !event.repeat && (event.key === ' ' || event.key === 'Enter')) setPressed(true);
      }}
      onKeyUp={event => { if (event.key === ' ' || event.key === 'Enter') endPress(); }}
      onBlur={endPress}
      onClick={() => { if (!disabled) onChange?.(indeterminate || !checked); }}
      className={clsx('rds-checkbox', className)} data-type={type} data-selected={selected ? 'true' : undefined}
      data-pressed={pressed && !disabled ? 'true' : undefined}>
      <span className="rds-checkbox__box" aria-hidden="true">
        {indeterminate ? <Minus /> : checked ? <Check /> : null}
      </span>
      {label ? <span className="rds-checkbox__label" id={`${id}-label`}>{label}</span> : null}
      {showDescription ? <span className="rds-checkbox__description" id={`${id}-description`}>{description}</span> : null}
    </button>
  );
}
