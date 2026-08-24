import { clsx } from 'clsx';
import type { ElementType } from 'react';

import { RadioPills } from '@/components/RadioGroup';

export interface PillOption {
  value: string;
  label: string;
  icon?: ElementType;
}

export interface SegmentedPillsProps {
  label?: string;
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
  accent?: 'primary' | 'error' | 'success';
  className?: string;
}

export function SegmentedPills({
  label,
  options,
  value,
  onChange,
  accent = 'primary',
  className,
}: SegmentedPillsProps) {
  const accentClass =
    accent === 'error'
      ? '[&_button.shadow-sm]:!bg-error-500 [&_button.shadow-sm]:!text-white [&_button.shadow-sm]:!border-error-500'
      : accent === 'success'
        ? '[&_button.shadow-sm]:!bg-success-500 [&_button.shadow-sm]:!text-white [&_button.shadow-sm]:!border-success-500'
        : '';

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider ms-1">
          {label}
        </span>
      )}
      <RadioPills
        options={options}
        value={value}
        onChange={onChange}
        className={clsx('h-[46px]', accentClass, className)}
      />
    </div>
  );
}
