import { FONT_FAMILY as FAMILY, FONT_WEIGHT as WEIGHT, LINE_HEIGHT, TYPOGRAPHY_BY_SCRIPT } from './canonical/Typography.ts';

export { LINE_HEIGHT, TEXT_LAYOUT, TYPOGRAPHY, TYPOGRAPHY_BY_SCRIPT } from './canonical/Typography.ts';
export type { TypographyProfile, TypographyRole, TypographyStyle } from './canonical/Typography.ts';

/** Legacy property names project canonical values rather than defining new tokens. */
export const FONT_FAMILY = { ...FAMILY, mono: FAMILY.code } as const;
export const FONT_WEIGHT = { ...WEIGHT, emphasis: WEIGHT.bold, structure: WEIGHT.semibold, control: WEIGHT.medium } as const;

/** Installed assets; family selection and text metrics come from the master. */
export const FONT_FILES = [
  { family: 'IRANYekanX', weight: 400, file: 'IRANYekanX-Regular.woff2' },
  { family: 'IRANYekanX', weight: 500, file: 'IRANYekanX-Medium.woff2' },
  { family: 'IRANYekanX', weight: 600, file: 'IRANYekanX-DemiBold.woff2' },
  { family: 'IRANYekanX', weight: 700, file: 'IRANYekanX-Bold.woff2' },
  { family: 'IRANYekanX', weight: 800, file: 'IRANYekanX-ExtraBold.woff2' },
  { family: 'Roboto Condensed', weight: '100 900', file: 'RobotoCondensed-Variable.woff2' },
] as const;

/** Both scripts use identical metrics. Compatibility projection for workbench consumers. */
export const LINE_PROFILES = Object.fromEntries(Object.entries(LINE_HEIGHT).map(([key, value]) => [key, { fa: value, latin: value }])) as Record<keyof typeof LINE_HEIGHT, { fa: number; latin: number }>;
export const LATIN_LINE = LINE_PROFILES;

export interface TypeRole {
  id: string; size: string; weight: number; lineHeight: number; family: string; fluid?: string;
}
/** Legacy list derived from the complete Persian styles. Letter spacing remains inherited. */
export const TYPE_ROLES: TypeRole[] = Object.entries(TYPOGRAPHY_BY_SCRIPT.fa).map(([id, style]) => ({
  id, size: style.fontSize, weight: style.fontWeight, lineHeight: style.lineHeight, family: style.fontFamily,
  ...(style.fontSize.startsWith('clamp(') ? { fluid: style.fontSize } : {}),
}));
