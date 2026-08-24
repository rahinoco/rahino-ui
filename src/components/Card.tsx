import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  className?: string;
  padding?: boolean;
}

/** Soft surface card — borderless by default. */
export default function Card({ children, className, padding = true, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-bg-surface/90 w-full rounded-[1.75rem]',
          'shadow-light',
          padding && 'p-6',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}
