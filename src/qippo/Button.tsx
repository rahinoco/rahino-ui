import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoButtonType = 'primary' | 'secondary' | 'stroke' | 'ghost' | 'text-only' | 'danger';
export type QippoButtonSize = 'sm' | 'md' | 'lg';
export type QippoButtonShape = 'curved' | 'square';
export type QippoIconStatus = 'none' | 'left' | 'right' | 'centre';
export type QippoForceState = 'auto' | 'hover' | 'selected';

export interface QippoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  typeVariant?: QippoButtonType;
  size?: QippoButtonSize;
  shape?: QippoButtonShape;
  iconStatus?: QippoIconStatus;
  /** Pin a Figma named state for the Comparison Lab. Real hover still works when auto. */
  forceState?: QippoForceState;
  isLoading?: boolean;
}

/** Magicoon plus-circle path from Figma instance 2245:8775 (button icon status). */
function PlusCircleIcon() {
  return (
    <svg className="qippo-btn__icon" viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 12.75H12.75V15.5C12.75 15.91 12.41 16.25 12 16.25C11.59 16.25 11.25 15.91 11.25 15.5V12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H11.25V8.5C11.25 8.09 11.59 7.75 12 7.75C12.41 7.75 12.75 8.09 12.75 8.5V11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Qippo Button reference — reconstructed from Figma Ui Kit component set
 * `qippo app / Ui Kit / Button-Component / button` (node 2230:6522).
 *
 * Axes from variant names:
 * Type, size, shape, enable, state, icon status.
 *
 * This is NOT the Rahino canonical Button. Do not use in production apps yet.
 */
export function QippoButton({
  children,
  className,
  typeVariant = 'primary',
  size = 'lg',
  shape = 'curved',
  iconStatus = 'none',
  forceState = 'auto',
  isLoading,
  disabled,
  type = 'button',
  ...props
}: QippoButtonProps) {
  const iconOn = iconStatus !== 'none';
  const iconOnly = iconStatus === 'centre';
  const label = iconOnly ? null : children;

  return (
    <span className="qippo inline-flex">
      <button
        type={type}
        className={cn('qippo-btn', className)}
        data-type={typeVariant}
        data-size={size}
        data-shape={shape}
        data-icon={iconStatus}
        data-force={forceState === 'auto' ? undefined : forceState}
        data-loading={isLoading ? 'true' : undefined}
        disabled={disabled || isLoading}
        {...props}
        aria-pressed={forceState === 'selected' ? true : props['aria-pressed']}
        aria-busy={isLoading || undefined}
      >
        {isLoading ? (
          <svg className="qippo-btn__spin" viewBox="0 0 24 24" width={16} height={16} fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        ) : null}
        {iconOn && iconStatus === 'left' ? <PlusCircleIcon /> : null}
        {iconOn && iconStatus === 'centre' ? <PlusCircleIcon /> : null}
        {label}
        {iconOn && iconStatus === 'right' ? <PlusCircleIcon /> : null}
      </button>
    </span>
  );
}
