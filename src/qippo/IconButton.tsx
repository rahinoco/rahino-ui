import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoIconButtonSize = '48' | '56';
export type QippoIconButtonForce = 'auto' | 'hover' | 'selected';

export interface QippoIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: QippoIconButtonSize;
  badge?: boolean;
  forceState?: QippoIconButtonForce;
  children?: ReactNode;
}

function BellIcon() {
  return (
    <svg className="qippo-icon-btn__glyph" viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
      <path
        d="M12 3.5c-2.8 0-5 2.1-5 4.7v2.3c0 .7-.3 1.4-.7 2L5 14.5h14l-1.3-2c-.4-.6-.7-1.3-.7-2V8.2c0-2.6-2.2-4.7-5-4.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 17.5a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Qippo Icon Button — Figma Header-Component / icon-Button (2039:3836).
 * Qipper fakes this with Button + !w-10 !px-0.
 * NOT Rahino canonical.
 */
export function QippoIconButton({
  size = '48',
  badge = false,
  forceState = 'auto',
  children,
  className,
  type = 'button',
  ...props
}: QippoIconButtonProps) {
  return (
    <span className="qippo inline-flex">
      <button
        type={type}
        className={cn('qippo-icon-btn', className)}
        data-size={size}
        data-badge={badge ? 'true' : undefined}
        data-force={forceState === 'auto' ? undefined : forceState}
        {...props}
      >
        {children ?? <BellIcon />}
        {badge ? <span className="qippo-icon-btn__badge" aria-hidden /> : null}
      </button>
    </span>
  );
}
