import { AlertCircle, Inbox, Loader2, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

import Button from '@/components/Button';

export interface DataLoadingStateProps {
  label?: string;
  /** Compact = inline / grid overlay (not full page). */
  compact?: boolean;
}

export interface DataErrorStateProps {
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export interface DataEmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  icon?: ReactNode;
}

/** Shared loading / empty / error presentation for query-backed screens + grids. */
export function DataLoadingState({
  label = 'در حال بارگذاری...',
  compact = false,
}: DataLoadingStateProps) {
  return (
    <div
      className={
        compact
          ? 'flex flex-col items-center justify-center gap-3 py-16 px-4'
          : 'flex flex-col items-center justify-center min-h-[50vh] gap-5'
      }
    >
      <Loader2
        className="animate-spin text-primary-600"
        size={compact ? 28 : 42}
        strokeWidth={2.5}
      />
      <span className="text-xs font-black text-slate-400 tracking-widest uppercase">{label}</span>
    </div>
  );
}

export function DataEmptyState({
  title = 'نتیجه‌ای یافت نشد',
  description,
  action,
  compact = false,
  icon,
}: DataEmptyStateProps) {
  return (
    <div
      className={
        compact
          ? 'flex flex-col items-center justify-center gap-3 py-14 px-6 text-center'
          : 'flex flex-col items-center justify-center min-h-[40vh] gap-4 px-6 text-center'
      }
    >
      <div
        className={
          compact
            ? 'w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center'
            : 'w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200/80'
        }
      >
        {icon ?? <Inbox size={compact ? 22 : 28} strokeWidth={2.25} />}
      </div>
      <div className="flex flex-col gap-1.5 max-w-sm">
        <p className="text-sm font-black text-slate-600">{title}</p>
        {description ? (
          <p className="text-xs font-bold text-slate-400 leading-relaxed">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function DataErrorState({
  message = 'بارگذاری داده‌ها ناموفق بود.',
  onRetry,
  compact = false,
}: DataErrorStateProps) {
  return (
    <div
      className={
        compact
          ? 'flex flex-col items-center justify-center gap-3 py-14 px-6 text-center'
          : 'flex flex-col items-center justify-center min-h-[50vh] gap-4 px-6 text-center'
      }
    >
      <div className="w-14 h-14 rounded-2xl bg-error-50 text-error-600 flex items-center justify-center border border-error-100">
        <AlertCircle size={28} strokeWidth={2.5} />
      </div>
      <p className="text-sm font-bold text-slate-600 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>
          <RefreshCw size={16} /> تلاش مجدد
        </Button>
      )}
    </div>
  );
}
