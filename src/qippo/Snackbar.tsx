import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type QippoSnackbarTone = 'error' | 'success';

export interface QippoSnackbarProps {
  tone?: QippoSnackbarTone;
  children?: ReactNode;
  onClose?: () => void;
  progress?: number;
  className?: string;
}

/**
 * Qippo Snackbar — Figma Other-Component / Snackbar (2302:1232).
 * Compact toast with progress bar. Maps conceptually to Qipper InlineNotice (banner).
 * NOT Rahino canonical.
 */
export function QippoSnackbar({
  tone = 'error',
  children,
  onClose,
  progress = 0.68,
  className,
}: QippoSnackbarProps) {
  return (
    <span className={cn('qippo inline-flex', className)}>
      <div className="qippo-snackbar" data-tone={tone} role="status">
        {onClose ? (
          <button type="button" className="qippo-snackbar__close" aria-label="بستن" onClick={onClose}>
            <svg viewBox="0 0 12 12" width={8} height={8} aria-hidden>
              <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
        <p className="qippo-snackbar__text">{children}</p>
        <span className="qippo-snackbar__track" aria-hidden>
          <span className="qippo-snackbar__bar" style={{ width: `${Math.round(progress * 100)}%` }} />
        </span>
      </div>
    </span>
  );
}
