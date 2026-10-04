/**
 * @fileoverview MetricCard — unified KPI / stat card with rich layout variants.
 */
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, TrendingDown, TrendingUp } from 'lucide-react';
import { isValidElement, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import {
  METRIC_CARD_HOVER,
  METRIC_CARD_SHELL,
  METRIC_TONE,
  type MetricLayout,
  type MetricTone,
  normalizeMetricTone,
} from '@/components/MetricCard/themes';
import type { UiIcon } from '@/types/icon';
import { formatMoney } from '@/utils/currency';
import { toPersianDigits } from '@/utils/persianDigits';

const expandVariant = {
  collapsed: { height: 0, opacity: 0, marginTop: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    marginTop: 16,
    transition: { type: 'spring' as const, stiffness: 300, damping: 26 },
  },
};

export interface MetricCardProps {
  layout?: MetricLayout;
  tone?: MetricTone | string;
  label: string;
  value: ReactNode;
  suffix?: string;
  unit?: string;
  icon?: UiIcon | ReactNode;
  trend?: number;
  /** Pulse alert dot when value > 0 */
  alert?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  drillContent?: ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  /** Format numeric value as money */
  formatAsMoney?: boolean;
  /** Progress bar 0–100 (layout=progress) */
  progress?: number;
  progressHint?: string;
  /** Trend direction for bare layout */
  trendDirection?: 'up' | 'down';
}

function formatValue(value: ReactNode, formatAsMoney?: boolean): ReactNode {
  if (loadingPlaceholder(value)) return value;
  if (formatAsMoney && typeof value === 'number') {
    return toPersianDigits(formatMoney(value));
  }
  if (typeof value === 'number') return toPersianDigits(value);
  if (typeof value === 'string' && /^\d/.test(value.trim())) {
    return toPersianDigits(value);
  }
  return value;
}

function loadingPlaceholder(value: ReactNode) {
  return value === '...' || value === '—';
}

function renderIcon(icon: UiIcon | ReactNode | undefined, iconClass: string, size = 20) {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  const Icon = icon as UiIcon;
  return <Icon size={size} strokeWidth={2.25} className={iconClass} />;
}

export function MetricCard({
  layout = 'stat',
  tone: toneProp = 'primary',
  label,
  value,
  suffix,
  unit,
  icon,
  trend,
  alert,
  expanded,
  onToggle,
  drillContent,
  onClick,
  className,
  loading,
  formatAsMoney,
  progress,
  progressHint,
  trendDirection,
}: MetricCardProps) {
  const tone = normalizeMetricTone(toneProp);
  const theme = METRIC_TONE[tone];
  const displayValue = loading ? '...' : formatValue(value, formatAsMoney);
  const interactive = Boolean(onClick || onToggle);
  const isExpanded = expanded ?? false;
  const numericAlert = alert && typeof value === 'number' && value > 0;

  const shellClass = twMerge(
    'relative overflow-hidden transition-all duration-300',
    interactive && 'cursor-pointer',
    className
  );

  if (layout === 'bare') {
    const TrendIcon = trendDirection === 'down' ? TrendingDown : TrendingUp;
    const trendUp = trendDirection !== 'down';
    return (
      <div className={shellClass}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400">{label}</span>
          {trendDirection ? (
            <TrendIcon
              size={14}
              className={clsx(trendUp ? 'text-slate-400' : 'text-slate-500')}
              strokeWidth={2}
            />
          ) : null}
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight tabular-nums">
            {displayValue}
          </span>
          {suffix ? <span className="text-xs font-semibold text-slate-400">{suffix}</span> : null}
        </div>
      </div>
    );
  }

  if (layout === 'mini') {
    return (
      <div
        className={twMerge(
          shellClass,
          METRIC_CARD_SHELL,
          METRIC_CARD_HOVER,
          'flex flex-col items-center gap-2 p-4'
        )}
        onClick={onClick}
      >
        <div className={clsx('p-2 rounded-xl', theme.iconSoft)}>{renderIcon(icon, '', 16)}</div>
        <span className="text-xl font-bold text-slate-800 tabular-nums text-center">
          {displayValue}
        </span>
        <span className="text-[10px] font-semibold text-slate-400 text-center leading-snug">
          {label}
        </span>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div
        className={twMerge(
          shellClass,
          METRIC_CARD_SHELL,
          METRIC_CARD_HOVER,
          theme.border,
          'flex items-center gap-3 sm:gap-4 p-4 sm:p-5'
        )}
        onClick={onClick}
      >
        <div
          className={clsx(
            'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0',
            theme.iconSoft
          )}
        >
          {renderIcon(icon, '', 20)}
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[10px] font-semibold text-slate-400 mb-0.5 truncate">{label}</span>
          <span className="text-lg sm:text-xl font-bold text-slate-800 tabular-nums leading-none">
            {displayValue}
          </span>
        </div>
        {numericAlert ? <AlertPulse /> : null}
      </div>
    );
  }

  if (layout === 'split') {
    return (
      <div
        className={twMerge(
          shellClass,
          METRIC_CARD_SHELL,
          METRIC_CARD_HOVER,
          theme.border,
          'flex items-center justify-between gap-3 p-4 sm:p-5'
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={clsx(
              'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
              theme.iconSoft
            )}
          >
            {renderIcon(icon, '', 17)}
          </div>
          <span className="text-xs font-semibold text-slate-500 truncate">{label}</span>
        </div>
        <span className="text-xl sm:text-2xl font-bold text-slate-800 tabular-nums shrink-0">
          {displayValue}
        </span>
      </div>
    );
  }

  if (layout === 'progress') {
    const pct = Math.min(100, Math.max(0, progress ?? 0));
    return (
      <div
        className={twMerge(
          shellClass,
          METRIC_CARD_SHELL,
          theme.border,
          'flex flex-col justify-center p-4 sm:p-5'
        )}
      >
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="text-[10px] font-semibold text-slate-400">{label}</span>
          <span className={clsx('text-sm font-bold tabular-nums text-slate-700')}>
            {toPersianDigits(Math.round(pct))}٪
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={clsx('h-full rounded-full', theme.signal)}
          />
        </div>
        {progressHint ? (
          <span className="text-[10px] font-medium text-slate-400 mt-2">{progressHint}</span>
        ) : null}
      </div>
    );
  }

  if (layout === 'radar') {
    return (
      <div
        className={twMerge(
          shellClass,
          METRIC_CARD_SHELL,
          METRIC_CARD_HOVER,
          theme.border,
          'p-5 sm:p-6'
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={clsx('p-2.5 rounded-xl shrink-0', theme.iconSoft)}>
            {renderIcon(icon, '', 18)}
          </div>
          <span className="text-xs font-semibold text-slate-500 leading-snug">{label}</span>
        </div>

        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-2xl sm:text-3xl font-bold text-slate-800 tabular-nums tracking-tight">
            {displayValue}
          </span>
          {unit ? <span className="text-[10px] font-medium text-slate-400">{unit}</span> : null}
          {suffix ? <span className="text-[10px] font-medium text-slate-400">{suffix}</span> : null}
        </div>
        {numericAlert ? (
          <div className="absolute top-4 left-4">
            <AlertPulse />
          </div>
        ) : null}
      </div>
    );
  }

  if (layout === 'hero') {
    const isPositive = (trend ?? 0) > 0;
    return (
      <div
        onClick={onToggle ?? onClick}
        className={twMerge(
          shellClass,
          METRIC_CARD_SHELL,
          'p-4 sm:p-5',
          isExpanded
            ? 'shadow-[0_4px_20px_rgba(15,23,42,0.06)]'
            : clsx(theme.border, METRIC_CARD_HOVER)
        )}
      >
        <div className="flex justify-between items-start gap-3">
          <div className={clsx('p-2.5 sm:p-3 rounded-xl shrink-0', theme.iconSoft)}>
            {renderIcon(icon, '', 20)}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {trend !== undefined && trend !== 0 ? (
              <div className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg bg-slate-50 text-slate-600">
                {isPositive ? (
                  <TrendingUp size={12} className="text-slate-500" />
                ) : (
                  <TrendingDown size={12} className="text-slate-500" />
                )}
                {toPersianDigits(Math.abs(trend))}٪
              </div>
            ) : null}
            {onToggle ? (
              <div
                className={clsx(
                  'w-7 h-7 rounded-lg flex items-center justify-center transition-colors bg-bg-muted',
                  isExpanded ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-400'
                )}
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} strokeWidth={2.5} />
                </motion.div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-4 sm:mt-5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight tabular-nums">
              {displayValue}
            </span>
            {suffix ? (
              <span className="text-[10px] font-medium text-slate-400">{suffix}</span>
            ) : null}
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1.5 leading-snug">
            {label}
          </p>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && drillContent ? (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={expandVariant}
              className="pt-4 mt-4"
            >
              {drillContent}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  // layout === 'stat' (default)
  return (
    <div
      className={twMerge(
        shellClass,
        METRIC_CARD_SHELL,
        METRIC_CARD_HOVER,
        theme.border,
        'p-5 sm:p-6'
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div
            className={clsx(
              'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center',
              theme.iconSoft
            )}
          >
            {renderIcon(icon, '', 18)}
          </div>
          {numericAlert ? <AlertPulse /> : null}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold text-slate-400">{label}</span>
          <span className="text-2xl sm:text-3xl font-bold text-slate-800 tabular-nums">
            {displayValue}
          </span>
        </div>
      </div>
    </div>
  );
}

function AlertPulse() {
  return (
    <span className="flex h-2.5 w-2.5 relative shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-60" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-500" />
    </span>
  );
}

export default MetricCard;
