/**
 * Rahino Design System — Typography foundations
 * Generated from the canonical master collection. Do not edit values here.
 * Regenerate: node master-tokens/scripts/build.mjs
 * Guide: Typography.md.
 */

export type TypographyProfile = keyof typeof LINE_HEIGHT;
export interface TypographyStyle { fontSize: string; fontWeight: number; lineHeight: number; profile: TypographyProfile; fontFamily?: string; }
export type TypographyRole = keyof typeof TYPOGRAPHY;
type ResolvedTypographyStyles = Readonly<Record<TypographyRole, TypographyStyle & { fontFamily: string }>>;
const withFontFamily = (fontFamily: string): ResolvedTypographyStyles => Object.fromEntries(
  Object.entries(TYPOGRAPHY as Record<string, TypographyStyle>).map(([role, style]) => [role, { ...style, fontFamily: style.fontFamily ?? fontFamily }]),
) as ResolvedTypographyStyles;

export const FONT_FAMILY = {
  /** @token rds.font.family.fa @alias ref.font.family.iranyekanx */
  "fa": "IRANYekanX, sans-serif",
  /** @token rds.font.family.latin @alias ref.font.family.roboto-condensed */
  "latin": "\"Roboto Condensed\", sans-serif",
  /** @token rds.font.family.code @alias ref.font.family.system-monospace */
  "code": "ui-monospace, SFMono-Regular, Consolas, monospace",
} as const;

export const FONT_WEIGHT = {
  /** @token rds.font.weight.regular @alias ref.font.weight.400 */
  "regular": 400,
  /** @token rds.font.weight.medium @alias ref.font.weight.500 */
  "medium": 500,
  /** @token rds.font.weight.semibold @alias ref.font.weight.600 */
  "semibold": 600,
  /** @token rds.font.weight.bold @alias ref.font.weight.700 */
  "bold": 700,
} as const;

export const LINE_HEIGHT = {
  /** @token rds.type.line-height.ui @alias ref.font.line-height.1-8 */
  "ui": 1.8,
  /** @token rds.type.line-height.reading @alias ref.font.line-height.1-95 */
  "reading": 1.95,
  /** @token rds.type.line-height.heading @alias ref.font.line-height.1-7 */
  "heading": 1.7,
  /** @token rds.type.line-height.display @alias ref.font.line-height.1-6 */
  "display": 1.6,
  /** @token rds.type.line-height.fixed @alias ref.font.line-height.1-6 */
  "fixed": 1.6,
} as const;

export const TYPOGRAPHY = {
  /** @token rds.type.caption-sm */
  "caption-sm": {
    "fontSize": "0.75rem",
    "fontWeight": 400,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.caption-md */
  "caption-md": {
    "fontSize": "0.875rem",
    "fontWeight": 400,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.ui-sm */
  "ui-sm": {
    "fontSize": "0.875rem",
    "fontWeight": 400,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.ui-md */
  "ui-md": {
    "fontSize": "1rem",
    "fontWeight": 400,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.label-sm */
  "label-sm": {
    "fontSize": "0.875rem",
    "fontWeight": 500,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.label-md */
  "label-md": {
    "fontSize": "1rem",
    "fontWeight": 500,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.body-sm */
  "body-sm": {
    "fontSize": "0.875rem",
    "fontWeight": 400,
    "lineHeight": 1.95,
    "profile": "reading"
  } as TypographyStyle,
  /** @token rds.type.body-md */
  "body-md": {
    "fontSize": "1rem",
    "fontWeight": 400,
    "lineHeight": 1.95,
    "profile": "reading"
  } as TypographyStyle,
  /** @token rds.type.body-lg */
  "body-lg": {
    "fontSize": "1.125rem",
    "fontWeight": 400,
    "lineHeight": 1.95,
    "profile": "reading"
  } as TypographyStyle,
  /** @token rds.type.title-sm */
  "title-sm": {
    "fontSize": "1rem",
    "fontWeight": 600,
    "lineHeight": 1.7,
    "profile": "heading"
  } as TypographyStyle,
  /** @token rds.type.title-md */
  "title-md": {
    "fontSize": "1.25rem",
    "fontWeight": 600,
    "lineHeight": 1.7,
    "profile": "heading"
  } as TypographyStyle,
  /** @token rds.type.heading-section */
  "heading-section": {
    "fontSize": "1.5rem",
    "fontWeight": 600,
    "lineHeight": 1.7,
    "profile": "heading"
  } as TypographyStyle,
  /** @token rds.type.heading-page */
  "heading-page": {
    "fontSize": "clamp(1.5rem, calc(1.357143rem + 0.714286vw), 2rem)",
    "fontWeight": 700,
    "lineHeight": 1.7,
    "profile": "heading"
  } as TypographyStyle,
  /** @token rds.type.display */
  "display": {
    "fontSize": "clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem)",
    "fontWeight": 700,
    "lineHeight": 1.6,
    "profile": "display"
  } as TypographyStyle,
  /** @token rds.type.input-touch */
  "input-touch": {
    "fontSize": "1rem",
    "fontWeight": 400,
    "lineHeight": 1.8,
    "profile": "ui"
  } as TypographyStyle,
  /** @token rds.type.code */
  "code": {
    "fontSize": "0.875rem",
    "fontWeight": 400,
    "lineHeight": 1.6,
    "profile": "fixed",
    "fontFamily": "ui-monospace, SFMono-Regular, Consolas, monospace"
  } as TypographyStyle,
} as const;

export const TYPOGRAPHY_BY_SCRIPT = { fa: withFontFamily(FONT_FAMILY.fa), latin: withFontFamily(FONT_FAMILY.latin) } as const;

export const TEXT_LAYOUT = {
  "measure": {
      /** @token rds.type.layout.measure.reading */
      "reading": "42rem",
      /** @token rds.type.layout.measure.wide @alias rds.type.layout.measure.reading */
      "wide": "42rem",
    },
  "gap": {
      /** @token rds.type.layout.gap.paragraph */
      "paragraph": "1em",
      /** @token rds.type.layout.gap.title-description @alias rds.space.100 */
      "title-description": "8px",
      /** @token rds.type.layout.gap.section-content @alias rds.space.300 */
      "section-content": "16px",
    },
} as const;
