/**
 * RadioGroup — Process Selection style, h-11 aligned with Category inputs.
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import FormField from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options?: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  name?: string;
}

export default function RadioGroup({
  options = [],
  value,
  onChange,
  label,
  required,
  error,
  className,
  name,
}: RadioGroupProps) {
  return (
    <FormField label={label} required={required} error={error} className={className}>
      <div
        role="radiogroup"
        className="w-full h-11 flex items-stretch gap-1.5 p-1 rounded-2xl border border-slate-200 bg-slate-50"
      >
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              name={name}
              onClick={() => onChange?.(opt.value)}
              className={clsx(
                'flex-1 min-w-0 h-full rounded-xl text-xs font-black transition-all outline-none truncate px-2 border-0 font-sans',
                active
                  ? 'bg-bg-surface text-primary-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </FormField>
  );
}

export interface RadioPillsProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function RadioPills({ options, value, onChange, className }: RadioPillsProps) {
  return (
    <div
      className={twMerge(
        clsx(
          FIELD.control,
          'w-full flex items-stretch gap-1.5 p-1 rounded-2xl border border-slate-200 bg-slate-50',
          className
        )
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange?.(opt.value)}
            className={clsx(
              'flex-1 h-full rounded-xl text-xs font-black transition-all truncate px-2 border-0 font-sans',
              active
                ? 'bg-bg-surface text-primary-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
