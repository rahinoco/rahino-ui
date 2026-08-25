import { cn } from '@/lib/cn';

export type QippoSwitchSize = '2xs' | 'xs' | 'sm';

export interface QippoSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: QippoSwitchSize;
  showIcon?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * Qippo Switch — Figma Ui Kit / Other-Component / Switch (2014:3071).
 * Qippo-only vs Qipper (no extracted twin). Paint from Qipper tokens.
 * NOT Rahino canonical.
 */
export function QippoSwitch({
  checked = false,
  onChange,
  disabled,
  size = 'sm',
  showIcon = false,
  className,
  'aria-label': ariaLabel,
}: QippoSwitchProps) {
  return (
    <span className={cn('qippo inline-flex', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        className="qippo-switch"
        data-size={size}
        data-on={checked ? 'true' : undefined}
        data-icon={showIcon ? 'true' : undefined}
        onClick={() => !disabled && onChange?.(!checked)}
      >
        <span className="qippo-switch__thumb" aria-hidden>
          {showIcon ? (
            <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
              {checked ? (
                <path d="M3 6.2L5.1 8.3L9 3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          ) : null}
        </span>
      </button>
    </span>
  );
}
