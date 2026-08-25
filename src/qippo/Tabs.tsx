import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface QippoTabItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface QippoTabsProps {
  tabs?: QippoTabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Qippo underline Tabs — Figma Ui Kit / Tab / Horizental tabs (2035:4098).
 * Segmented control is a separate component (QippoSegmented).
 * NOT Rahino canonical.
 */
export function QippoTabs({ tabs = [], activeTab, onChange, className }: QippoTabsProps) {
  return (
    <span className={cn('qippo inline-flex w-full', className)}>
      <div className="qippo-tabs" role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              disabled={tab.disabled}
              className="qippo-tabs__tab"
              data-selected={selected ? 'true' : undefined}
              onClick={() => !tab.disabled && onChange(tab.id)}
            >
              <span className="qippo-tabs__label">{tab.label}</span>
              {selected ? <span className="qippo-tabs__line" aria-hidden /> : null}
            </button>
          );
        })}
      </div>
    </span>
  );
}
