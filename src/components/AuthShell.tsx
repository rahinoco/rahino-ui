/**
 * Auth shell — liquid glass card. Product wordmark is injected via `mark`.
 */

import type { ReactNode } from 'react';

export interface AuthShellProps {
  title: string;
  subtitle?: string;
  mark?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export default function AuthShell({ title, subtitle, mark, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg-body px-4 py-10 font-sans">
      <div className="relative z-10 w-full max-w-[420px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[56%] z-0 h-[62%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400 opacity-[0.14] blur-[80px]"
        />

        <div
          className="relative z-10 overflow-hidden rounded-[28px] border border-border bg-bg-surface/80 shadow-heavy backdrop-blur-[40px]"
          style={{
            WebkitBackdropFilter: 'blur(40px) saturate(1.55)',
            backdropFilter: 'blur(40px) saturate(1.55)',
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-bg-elevated/50 to-transparent"
          />

          <div className="relative z-10 px-8 py-10 sm:px-10 sm:py-11">
            <div className="mb-10 flex flex-col items-center text-center">
              {mark ? (
                <div className="mb-6 flex h-16 items-center justify-center rounded-[var(--rahino-radius-lg)] border border-border bg-bg-muted/80 px-4 shadow-light">
                  {mark}
                </div>
              ) : null}
              <h1 className="text-balance text-2xl font-black tracking-tight text-fg sm:text-[1.75rem]">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-3 max-w-[32ch] text-pretty text-[15px] leading-7 text-fg-muted">
                  {subtitle}
                </p>
              ) : null}
            </div>

            {children}
          </div>
        </div>

        {footer ? <div className="relative z-10 mt-8 text-center">{footer}</div> : null}
      </div>
    </div>
  );
}
