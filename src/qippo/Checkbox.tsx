import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoCheckboxType = 'simple' | 'item' | 'item-desc';

export interface QippoCheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  type?: QippoCheckboxType;
  className?: string;
  'aria-label'?: string;
}

function CheckMark() {
  return (
    <svg className="qippo-check__mark" viewBox="0 0 16 16" width={12} height={12} fill="none" aria-hidden>
      <path d="M3.5 8.25L6.5 11.25L12.5 4.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PartialMark() {
  return (
    <svg className="qippo-check__mark" viewBox="0 0 16 16" width={12} height={12} fill="none" aria-hidden>
      <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Qippo Checkbox — Figma Ui Kit / Other-Component / Checkbox (2896:22985).
 * Types: simple | Item | Item+Desc. Paint from Qipper tokens.
 * NOT Rahino canonical.
 */
export function QippoCheckbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled,
  label,
  description,
  type = 'simple',
  className,
  'aria-label': ariaLabel,
}: QippoCheckboxProps) {
  const selected = checked || indeterminate;
  const box = (
    <span
      className="qippo-check__box"
      data-checked={checked ? 'true' : undefined}
      data-partial={indeterminate ? 'true' : undefined}
      aria-hidden
    >
      {indeterminate ? <PartialMark /> : checked ? <CheckMark /> : null}
    </span>
  );

  const toggle = () => {
    if (!disabled) onChange?.(!checked);
  };

  if (type === 'simple') {
    return (
      <span className={cn('qippo inline-flex', className)}>
        <button
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-label={ariaLabel}
          disabled={disabled}
          className="qippo-check qippo-check--simple"
          data-disabled={disabled ? 'true' : undefined}
          onClick={toggle}
        >
          {label ? <span className="qippo-check__label">{label}</span> : null}
          {box}
        </button>
      </span>
    );
  }

  return (
    <span className={cn('qippo inline-flex w-full', className)}>
      <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-label={ariaLabel}
        disabled={disabled}
        className="qippo-check qippo-check--item"
        data-type={type}
        data-selected={selected ? 'true' : undefined}
        data-disabled={disabled ? 'true' : undefined}
        onClick={toggle}
      >
        <span className="qippo-check__row">
          {label ? <span className="qippo-check__label">{label}</span> : null}
          {box}
        </span>
        {type === 'item-desc' && description ? (
          <span className="qippo-check__desc">{description}</span>
        ) : null}
      </button>
    </span>
  );
}
