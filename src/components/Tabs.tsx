/**
 * Tabs — Inventory segmented + ItemDossier underline benchmarks.
 */

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
}

type TabSize = 'sm' | 'md' | 'lg';
type TabVariant = 'segmented' | 'underline';

export interface TabsProps {
  tabs?: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  size?: TabSize;
  layoutId?: string;
  className?: string;
  variant?: TabVariant;
}

/** Inventory warehouse tabs benchmark */
export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  size = 'md',
  layoutId = 'qipper-segmented-tabs',
  className,
  variant = 'segmented',
}: TabsProps) {
  if (variant === 'underline') {
    return (
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={onChange}
        layoutId={layoutId}
        className={className}
      />
    );
  }

  const sizes: Record<TabSize, string> = {
    sm: 'px-4 py-2 text-xs font-black',
    md: 'px-5 py-2.5 text-xs font-black',
    lg: 'px-6 py-2.5 text-sm font-bold',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'inline-flex w-fit max-w-full items-center gap-0 overflow-x-auto rounded-[14px] bg-bg-muted p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]',
          className
        )
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const is_active = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={is_active}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={clsx(
              'relative z-10 flex items-center gap-2 whitespace-nowrap rounded-xl border-0 font-sans outline-none transition-colors',
              sizes[size],
              is_active ? 'text-primary-700' : 'text-fg-muted hover:bg-bg-elevated/50 hover:text-fg'
            )}
          >
            {is_active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 z-0 rounded-[10px] bg-bg-surface shadow-light"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {Icon && <Icon size={14} strokeWidth={2.5} />}
              {tab.label}
              {tab.badge != null && (
                <span className="tabular-nums font-sans text-[10px] font-black text-slate-400">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export interface UnderlineTabsProps {
  tabs?: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  layoutId?: string;
  className?: string;
}

/** ItemDossier / Full History underline tabs */
export function UnderlineTabs({
  tabs = [],
  activeTab,
  onChange,
  layoutId = 'qipper-underline-tabs',
  className,
}: UnderlineTabsProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'flex shrink-0 gap-2 overflow-x-auto border-b border-border bg-bg-surface px-6 pt-3',
          className
        )
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const is_active = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={is_active}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={clsx(
              'relative flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors outline-none shrink-0 border-0 bg-transparent font-sans',
              is_active ? 'text-primary-600' : 'text-slate-400 hover:text-slate-700'
            )}
          >
            {Icon && <Icon size={15} strokeWidth={2.5} />}
            {tab.label}
            {is_active && (
              <motion.span
                layoutId={layoutId}
                className="absolute bottom-0 left-2 right-2 h-[3px] bg-primary-600 rounded-t-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export const SegmentedTabs = Tabs;
