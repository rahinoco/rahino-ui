export { FOUNDATION_MANIFEST } from './manifest.ts';
export {
  ACTION_PRIMARY_BG,
  ACTION_PRIMARY_FG,
  BRAND,
  CONTRAST_REFERENCE,
  DATA_CATEGORICAL,
  DATA_DIVERGING,
  DATA_ON_FILL,
  DATA_SEQUENTIAL,
  EDGE,
  FOCUS_RING,
  HIGH_CONTRAST,
  INK,
  INTERACTION,
  PRESENTATION_GRADIENTS,
  SCRIM,
  STATUS,
  SURFACE,
  type AppearanceName,
} from './color.ts';
export { compositeOver, contrastRatio, luminance, parseColor } from './contrast.ts';
export { renderFoundationsCss } from './css.ts';
export { formatGrouped, formatMoneyDisplay, formatPercent, toPersianDigits, type MoneyUnit } from './format.ts';
export {
  BUTTON_FOCUS,
  CONTROL_SIZE,
  DENSITY,
  EDGE_WIDTH,
  FOCUS,
  ICON_SIZE,
  ICON_STROKE,
  LAYER,
  LAYOUT,
  LIFT,
  MOTION_DURATION,
  MOTION_EASING,
  PRESENTATION_MOTION,
  RADIUS,
  SPACE_REF,
  SPACE_ROLE,
  TOUCH_MIN,
  VEIL_TIER,
  liftShadow,
  type LiftLevel,
  type VeilTier,
} from './metrics.ts';
export {
  readVeilEnvironment,
  resolveVeil,
  type RenderPath,
  type VeilBackground,
  type VeilContent,
  type VeilEnvironment,
  type VeilForeground,
  type VeilReason,
  type VeilRequest,
  type VeilResolution,
} from './resolveVeil.ts';
export { FONT_FAMILY, FONT_FILES, FONT_WEIGHT, LATIN_LINE, LINE_PROFILES, TYPE_ROLES, type TypeRole } from './type.ts';
export { VeilPanel } from './VeilPanel.tsx';

export { BORDER_WIDTH, FOCUS_RING_GEOMETRY, DURATION, EASING, SCALE, TRANSLATION, FULL_RADIUS_CSS, SHADOW, SPACE, SPACING, VEIL, BREAKPOINTS, PAGE_GRID, PAGE_MAX_WIDTH } from './metrics.ts';
export { LINE_HEIGHT, TEXT_LAYOUT, TYPOGRAPHY, TYPOGRAPHY_BY_SCRIPT } from './type.ts';
export type { TypographyProfile, TypographyRole, TypographyStyle } from './type.ts';
export { REFERENCE } from './canonical/master-tokens/generated/reference.ts';
export { resolveContext, type FoundationSettings, type FoundationEnvironment } from './context.ts';
export { FOUNDATION_GUIDES } from './guides.ts';

export { resolveColorContext, resolveColor, applyColorPreferences } from './context.ts';
export type { ColorTokenName, ColorPreferences, ColorEnvironment, ColorContext, ColorPreferenceController } from './context.ts';
export { default as FOUNDATION_CONTRAST_REVIEW } from './canonical/output/contrast-review/results.json' with { type: 'json' };

export { default as FOUNDATION_INTERACTION_CONTRAST_REVIEW } from './interaction-contrast.json' with { type: 'json' };
