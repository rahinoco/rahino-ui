import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

/** Accessible checkbox matching Qipper primary tokens. */
export default function Checkbox({
  checked = false,
  onChange,
  className,
  disabled,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={clsx(
        'w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1',
        checked
          ? 'bg-primary-500 border-primary-500 text-white'
          : 'bg-bg-surface border-slate-300 hover:border-primary-400',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {checked && <Check size={14} strokeWidth={3} />}
    </button>
  );
}
