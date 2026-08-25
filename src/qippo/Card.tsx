import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface QippoCardProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  padding?: boolean;
  className?: string;
}

/**
 * Qippo surface Card — reconstructed as a reusable surface from Card-Component chrome
 * (2325:1506). Figma kit mostly holds product/marketing modules, not a padded primitive
 * like Qipper Card. This is a fair-lab surface only.
 * NOT Rahino canonical.
 */
export function QippoCard({ children, padding = true, className, ...props }: QippoCardProps) {
  return (
    <span className={cn('qippo block w-full', className)}>
      <div className="qippo-card" data-padding={padding ? 'true' : undefined} {...props}>
        {children}
      </div>
    </span>
  );
}
