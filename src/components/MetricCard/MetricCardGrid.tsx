/**
 * @fileoverview Responsive grid for MetricCard clusters.
 */
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ColPreset = '2-4' | '2-3' | '3' | '4' | 'scroll';

const PRESET_CLASS: Record<ColPreset, string> = {
  '2-4': 'grid grid-cols-2 lg:grid-cols-4',
  '2-3': 'grid grid-cols-2 md:grid-cols-3',
  '3': 'grid grid-cols-1 sm:grid-cols-3',
  '4': 'grid grid-cols-2 xl:grid-cols-4',
  scroll:
    'flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory pb-1 -mx-1 px-1 md:mx-0 md:px-0 md:overflow-visible [&>*]:min-w-[78%] [&>*]:max-w-[78%] sm:[&>*]:min-w-[48%] sm:[&>*]:max-w-[48%] md:[&>*]:min-w-0 md:[&>*]:max-w-none [&>*]:snap-center',
};

export interface MetricCardGridProps {
  children: ReactNode;
  preset?: ColPreset;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export function MetricCardGrid({
  children,
  preset = '2-4',
  className,
  gap = 'md',
}: MetricCardGridProps) {
  const gapClass = gap === 'sm' ? 'gap-3' : gap === 'lg' ? 'gap-6' : 'gap-4';

  return (
    <div className={twMerge(clsx(PRESET_CLASS[preset], gapClass, 'items-stretch'), className)}>
      {children}
    </div>
  );
}
