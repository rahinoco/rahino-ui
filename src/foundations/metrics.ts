import { BORDER_WIDTH, FOCUS_RING_GEOMETRY } from './canonical/Border.ts';
import { DURATION, EASING } from './canonical/Motion.ts';
import { RADIUS } from './canonical/Radius.ts';
import { SHADOW } from './canonical/Shadow.ts';
import { SPACE, SPACING } from './canonical/Spacing.ts';
import { TEXT_LAYOUT } from './canonical/Typography.ts';
import { VEIL } from './canonical/Veil.ts';
import { BREAKPOINTS, PAGE_GRID, PAGE_MAX_WIDTH } from './canonical/layout.ts';

export { BORDER_WIDTH, FOCUS_RING_GEOMETRY, DURATION, EASING, RADIUS, SHADOW, SPACE, SPACING, VEIL, BREAKPOINTS, PAGE_GRID, PAGE_MAX_WIDTH };
export { SCALE, TRANSLATION } from './canonical/Motion.ts';
export { FULL_RADIUS_CSS } from './canonical/Radius.ts';

/** Compatibility names project the adopted scale. New consumers use SPACE / SPACING. */
export const SPACE_REF = SPACE;
export const SPACE_ROLE = {
  'icon-gap': SPACING[100], 'label-gap': SPACING[75], 'help-gap': SPACING[75],
  'field-gap': SPACING[300], 'form-group-gap': SPACING[500], 'toolbar-gap': SPACING[100],
  'group-gap': SPACING[400], 'panel-padding': SPACING[400], 'popover-padding': SPACING[300],
  'dialog-padding': SPACING[500], 'dialog-padding-narrow': SPACING[400],
  'sheet-padding': SPACING[400], 'section-gap': SPACING[500],
} as const;

// Existing component recipe geometry, outside the canonical foundation token sets.
// Control sizing and density are not newly approved by foundation adoption.
export const CONTROL_SIZE = {
  sm: { minHeight: '36px', paddingInline: SPACING[200], paddingBlock: SPACING[75], label: '0.875rem', icon: '16px' },
  md: { minHeight: '44px', paddingInline: SPACING[300], paddingBlock: SPACING[85], label: '0.875rem', icon: '20px' },
  lg: { minHeight: '52px', paddingInline: SPACING[350], paddingBlock: '10px', label: '1rem', icon: '24px' },
} as const;
export const DENSITY = {
  compact: { padding: SPACING[300], groupGap: SPACING[300], rowMin: '36px', cellBlock: SPACING[75], actionGap: SPACING[75] },
  regular: { padding: SPACING[400], groupGap: SPACING[400], rowMin: '44px', cellBlock: SPACING[100], actionGap: SPACING[100] },
  spacious: { padding: SPACING[500], groupGap: SPACING[500], rowMin: '52px', cellBlock: SPACING[200], actionGap: SPACING[200] },
} as const;
export const FOCUS = { width: FOCUS_RING_GEOMETRY.width, offset: SPACING[50] } as const;
export const BUTTON_FOCUS = { width: FOCUS_RING_GEOMETRY.width, gap: SPACING[50], core: BORDER_WIDTH.default, soft: '40%' } as const;
export const TOUCH_MIN = '44px';
export const ICON_STROKE = '2';
export const ICON_SIZE = { sm: '16px', md: '20px', lg: '24px', display: '32px' } as const;
export const EDGE_WIDTH = { thin: BORDER_WIDTH.default } as const;
export const LAYER = { base: 0, sticky: 100, floating: 200, overlay: 300, notification: 400 } as const;

/** Deprecated layout shape. Reading has a single cap; page margins follow the grid. */
export const LAYOUT = {
  reading: TEXT_LAYOUT.measure.reading, readingWide: TEXT_LAYOUT.measure.wide,
  web: PAGE_MAX_WIDTH, dashboard: PAGE_MAX_WIDTH, fluidMin: '20rem', fluidMax: PAGE_MAX_WIDTH,
  pageGutter: PAGE_GRID.narrow.margin,
  columns: { narrow: PAGE_GRID.narrow.columns, mid: PAGE_GRID.medium.columns, wide: PAGE_GRID.wide.columns },
  gutters: { narrow: PAGE_GRID.narrow.gutter, mid: PAGE_GRID.medium.gutter, wide: PAGE_GRID.wide.gutter },
} as const;

export const LIFT = SHADOW;
export type LiftLevel = 'none' | keyof typeof SHADOW;
export type LegacyLiftLevel = 'rest' | 'float' | 'raise' | 'modal';
/** Deprecated names map to the three approved shadows; none is not an elevation token. */
export function liftShadow(level: LiftLevel | LegacyLiftLevel, appearance: 'light' | 'dark'): string {
  if (level === 'none') return 'none';
  const name = level === 'rest' ? 'sm' : level === 'float' ? 'md' : level === 'raise' || level === 'modal' ? 'lg' : level;
  return SHADOW[name][appearance];
}
export const MOTION_DURATION = DURATION;
export const MOTION_EASING = EASING;
export const PRESENTATION_MOTION = { base: DURATION.presentation } as const;

export type VeilTier = '100' | '200' | '300' | '400' | '500';
/** Deprecated export name. The new API uses VEIL color + blur groups. */
export const VEIL_TIER = VEIL;
