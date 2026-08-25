import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoRadioType = 'simple' | 'item' | 'item-desc';

export interface QippoRadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
}

export interface QippoRadioProps {
  options?: QippoRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: QippoRadioType;
  name?: string;
  className?: string;
}

/**
 * Qippo classic circular Radio — Figma Ui Kit / Other-Component / Radio (2858:4242).
 * Distinct from Qipper segmented RadioGroup / RadioPills.
 * NOT Rahino canonical.
 */
export function QippoRadio({
  options = [],
  value,
  onChange,
  disabled,
  type = 'simple',
  name,
  className,
}: QippoRadioProps) {
  return (
    <span className={cn('qippo inline-flex w-full', className)}>
      <div className="qippo-radio-group" role="radiogroup" data-type={type}>
        {options.map((opt) => {
          const selected = opt.value === value;
          const circle = (
            <span className="qippo-radio__circle" data-selected={selected ? 'true' : undefined} aria-hidden>
              {selected ? <span className="qippo-radio__dot" /> : null}
            </span>
          );

          if (type === 'simple') {
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                name={name}
                aria-checked={selected}
                disabled={disabled}
                className="qippo-radio qippo-radio--simple"
                data-disabled={disabled ? 'true' : undefined}
                onClick={() => !disabled && onChange?.(opt.value)}
              >
                <span className="qippo-radio__label">{opt.label}</span>
                {circle}
              </button>
            );
          }

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              name={name}
              aria-checked={selected}
              disabled={disabled}
              className="qippo-radio qippo-radio--item"
              data-type={type}
              data-selected={selected ? 'true' : undefined}
              data-disabled={disabled ? 'true' : undefined}
              onClick={() => !disabled && onChange?.(opt.value)}
            >
              <span className="qippo-radio__row">
                <span className="qippo-radio__label">{opt.label}</span>
                {circle}
              </span>
              {type === 'item-desc' && opt.description ? (
                <span className="qippo-radio__desc">{opt.description}</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </span>
  );
}
