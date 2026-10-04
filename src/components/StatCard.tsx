/**
 * @fileoverview StatCard — backward-compatible alias for MetricCard.
 */
import type { ReactNode } from 'react';

import { MetricCard, normalizeMetricTone } from '@/components/MetricCard';
import type { UiIcon } from '@/types/icon';

type DashboardColor = 'blue' | 'emerald' | 'primary' | 'rose';
type CompactColor = 'primary' | 'success' | 'error';

type StatCardProps =
  | {
      variant?: 'dashboard';
      title: string;
      value: number;
      icon: UiIcon;
      color?: DashboardColor;
      isAlert?: boolean;
    }
  | {
      variant: 'compact';
      label: string;
      value: string | number;
      icon: ReactNode;
      color?: CompactColor;
    };

export default function StatCard(props: StatCardProps) {
  if (props.variant === 'compact') {
    const { label, value, icon, color = 'primary' } = props;
    return (
      <MetricCard
        layout="mini"
        tone={normalizeMetricTone(color)}
        label={label}
        value={value}
        icon={icon}
      />
    );
  }

  const { title, value, icon, color = 'blue', isAlert } = props;
  return (
    <MetricCard
      layout="stat"
      tone={normalizeMetricTone(color)}
      label={title}
      value={value}
      icon={icon}
      alert={isAlert}
    />
  );
}
