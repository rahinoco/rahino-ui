import { AlertCircle, Inbox, Loader2, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';
import Button from '@/components/Button';
export interface DataLoadingStateProps { label?: string; compact?: boolean; }
export interface DataErrorStateProps { message?: string; onRetry?: () => void; compact?: boolean; }
export interface DataEmptyStateProps { title?: string; description?: string; action?: ReactNode; compact?: boolean; icon?: ReactNode; }
export function DataLoadingState({ label = 'در حال بارگذاری...', compact = false }: DataLoadingStateProps) {
  return <div className="rds-data-state" data-compact={compact || undefined} role="status">
    <Loader2 className="rds-data-state__spinner" aria-hidden="true" /><span>{label}</span>
  </div>;
}
export function DataEmptyState({ title = 'نتیجه‌ای یافت نشد', description, action, compact = false, icon }: DataEmptyStateProps) {
  return <div className="rds-data-state" data-compact={compact || undefined} role="status">
    <div className="rds-data-state__icon" aria-hidden="true">{icon ?? <Inbox />}</div>
    <div><p className="rds-data-state__title">{title}</p>{description && <p>{description}</p>}</div>{action}
  </div>;
}
export function DataErrorState({ message = 'بارگذاری داده‌ها ناموفق بود.', onRetry, compact = false }: DataErrorStateProps) {
  return <div className="rds-data-state" data-compact={compact || undefined} role="alert">
    <div className="rds-data-state__icon" data-error aria-hidden="true"><AlertCircle /></div>
    <p className="rds-data-state__title">{message}</p>
    {onRetry && <Button onClick={onRetry} iconStart={<RefreshCw />}>تلاش مجدد</Button>}
  </div>;
}
