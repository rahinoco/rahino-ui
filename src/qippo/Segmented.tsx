import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoSegmentedSize = 'sm' | 'md';

export interface QippoSegmentedOption {
  value: string;
  label: ReactNode;
}

export interface QippoSegmentedProps {
  options?: QippoSegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: QippoSegmentedSize;
  disabled?: boolean;
  className?: string;
}

/**
 * Qippo Segmented control — Figma Ui Kit / Other-Component (7506:49134).
 * Pill track with filled selected segment. Paint from Qipper tokens.
 * NOT Rahino canonical.
 */
export function QippoSegmented({
  options = [],
  value,
  onChange,
  size = 'sm',
  disabled,
  className,
}: QippoSegmentedProps) {
  return (
    <span className={cn('qippo inline-flex', className)}>
      <div className="qippo-segmented" role="tablist" data-size={size} data-disabled={disabled ? 'true' : undefined}>
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={selected}
              disabled={disabled}
              className="qippo-segmented__item"
              data-selected={selected ? 'true' : undefined}
              onClick={() => !disabled && onChange?.(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </span>
  );
}
