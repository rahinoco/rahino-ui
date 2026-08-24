/**
 * @fileoverview Page layout shell — soft light canvas.
 */

import { clsx } from 'clsx';
import type { CSSProperties, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type PageShellVariant = 'hub' | 'viewport';
type SurfacePadding = 'sm' | 'md' | 'lg';

export interface PageShellProps {
  children?: ReactNode;
  variant?: PageShellVariant;
  className?: string;
  maxWidth?: CSSProperties['maxWidth'];
}

export default function PageShell({
  children,
  variant = 'hub',
  className,
  maxWidth = '1920px',
}: PageShellProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'w-full flex flex-col relative',
          variant === 'hub' && 'flex-1 px-4 sm:px-8 lg:px-12 py-8 gap-8 mx-auto min-h-screen',
          variant === 'viewport' && 'h-screen overflow-hidden px-6 lg:px-10 py-6 gap-6',
          className
        )
      )}
      style={variant === 'hub' ? { maxWidth } : undefined}
    >
      {children}
    </div>
  );
}

export interface SurfacePanelProps {
  children?: ReactNode;
  className?: string;
  padding?: SurfacePadding;
}

export function SurfacePanel({ children, className, padding = 'md' }: SurfacePanelProps) {
  const paddings: Record<SurfacePadding, string> = {
    sm: 'p-3',
    md: 'px-6 py-5',
    lg: 'p-6',
  };
  return (
    <div
      className={twMerge(
        clsx('bg-bg-surface/80 rounded-[1.75rem] shadow-light', paddings[padding], className)
      )}
    >
      {children}
    </div>
  );
}
