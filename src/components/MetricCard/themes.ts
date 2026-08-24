/**
 * @fileoverview MetricCard tone tokens — minimal slate shell, sparse semantic accents.
 */
export type MetricTone =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'slate'
  | 'blue'
  | 'emerald'
  | 'rose'
  | 'amber';

export type MetricLayout =
  | 'hero'
  | 'radar'
  | 'stat'
  | 'inline'
  | 'mini'
  | 'bare'
  | 'split'
  | 'progress';

/** Normalize legacy color names to MetricTone */
export function normalizeMetricTone(tone?: string): MetricTone {
  switch (tone) {
    case 'blue':
    case 'primary':
      return 'primary';
    case 'emerald':
    case 'success':
      return 'success';
    case 'amber':
    case 'warning':
      return 'warning';
    case 'rose':
    case 'error':
      return 'error';
    case 'slate':
      return 'slate';
    default:
      return 'slate';
  }
}

export interface MetricToneTheme {
  icon: string;
  iconSoft: string;
  glow: string;
  mesh: string;
  ring: string;
  border: string;
  accent: string;
  /** Progress / emphasis fill — stays neutral unless semantic tone */
  signal: string;
}

/** Shared minimal surface — cards look uniform; tone only nudges accent text */
const MINIMAL: MetricToneTheme = {
  icon: 'bg-bg-muted text-fg-muted',
  iconSoft: 'bg-bg-muted text-fg-muted border border-border',
  glow: '',
  mesh: '',
  ring: 'ring-border',
  border: 'border-border hover:border-border',
  accent: 'text-fg',
  signal: 'bg-fg-muted',
};

export const METRIC_TONE: Record<MetricTone, MetricToneTheme> = {
  primary: MINIMAL,
  blue: MINIMAL,
  slate: MINIMAL,
  success: {
    ...MINIMAL,
    accent: 'text-fg',
    signal: 'bg-success-500',
  },
  emerald: {
    ...MINIMAL,
    accent: 'text-fg',
    signal: 'bg-success-500',
  },
  warning: {
    ...MINIMAL,
    accent: 'text-fg-muted',
    signal: 'bg-warning-500',
  },
  amber: {
    ...MINIMAL,
    accent: 'text-fg-muted',
    signal: 'bg-warning-500',
  },
  error: {
    ...MINIMAL,
    accent: 'text-fg',
    signal: 'bg-error-500',
  },
  rose: {
    ...MINIMAL,
    accent: 'text-fg',
    signal: 'bg-error-500',
  },
};

/** Card shell shared across layouts */
export const METRIC_CARD_SHELL =
  'bg-bg-surface border border-border rounded-2xl shadow-light transition-colors duration-200';

export const METRIC_CARD_HOVER = 'hover:border-border hover:shadow-heavy';
