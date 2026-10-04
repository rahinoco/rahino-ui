/**
 * PageHeader — title + optional back + actions.
 * Router coupling removed: back uses `onBack` or `history.back()`.
 */

import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

import type { UiIcon } from '@/types/icon';

export interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: UiIcon;
  iconColorClass?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  icon: Icon,
  iconColorClass = 'bg-primary-500 text-white shadow-md shadow-primary-500/25',
  showBackButton = false,
  onBack,
  children,
  className,
}: PageHeaderProps) {
  const handleBack = () => {
    if (onBack) onBack();
    else if (typeof window !== 'undefined') window.history.back();
  };

  return (
    <header
      className={clsx(
        'h-20 shrink-0 flex items-center justify-between px-0 z-20 relative w-full gap-4',
        className
      )}
    >
      <div className="flex items-center gap-5 min-w-0">
        {showBackButton && (
          <>
            <button
              type="button"
              onClick={handleBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-surface text-fg-subtle outline-none transition-all hover:text-fg hover:shadow-md"
              aria-label="بازگشت"
            >
              <ChevronRight size={20} />
            </button>
            <div className="h-6 w-px shrink-0 bg-border" />
          </>
        )}

        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <div
              className={clsx(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                iconColorClass
              )}
            >
              <Icon size={18} strokeWidth={2.5} />
            </div>
          )}
          <div className="flex min-w-0 flex-col truncate">
            <h1 className="truncate font-sans text-xl font-black tracking-tight text-fg">
              {title}
            </h1>
            {subtitle && (
              <span className="mt-0.5 truncate font-sans text-[11px] font-bold uppercase tracking-widest text-fg-subtle">
                {subtitle}
              </span>
            )}
          </div>
        </div>
      </div>

      {children && <div className="flex items-center gap-3 sm:gap-4 shrink-0">{children}</div>}
    </header>
  );
}
