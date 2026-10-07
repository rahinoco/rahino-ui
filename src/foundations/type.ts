export const FONT_FAMILY = {
  fa: 'IRANYekanX, sans-serif',
  latin: 'Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Consolas, monospace',
} as const;

/** Weights that have their own file in this package. */
export const FONT_FILES = [
  { weight: 300, file: 'IRANYekanX-Light.woff2' },
  { weight: 400, file: 'IRANYekanX-Regular.woff2' },
  { weight: 500, file: 'IRANYekanX-Medium.woff2' },
  { weight: 700, file: 'IRANYekanX-Bold.woff2' },
] as const;

export const FONT_WEIGHT = {
  emphasis: 700,
  structure: 600,
  control: 500,
} as const;

export const LINE_PROFILES = {
  reading: { fa: 1.95, latin: 1.8 },
  ui: { fa: 1.8, latin: 1.65 },
  heading: { fa: 1.7, latin: 1.55 },
  display: { fa: 1.6, latin: 1.45 },
  code: { fa: 1.6, latin: 1.6 },
} as const;

export interface TypeRole {
  id: string;
  size: string;
  weight: number;
  lineHeight: number;
  letterSpacing: string;
  family: string;
  fluid?: string;
}

const fa = FONT_FAMILY.fa;
const mono = FONT_FAMILY.mono;

export const TYPE_ROLES: TypeRole[] = [
  { id: 'caption-sm', size: '0.75rem', weight: 400, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'caption-md', size: '0.875rem', weight: 400, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'ui-sm', size: '0.875rem', weight: 400, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'ui-md', size: '1rem', weight: 400, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'label-sm', size: '0.875rem', weight: 500, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'label-md', size: '1rem', weight: 500, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'body-sm', size: '0.875rem', weight: 400, lineHeight: LINE_PROFILES.reading.fa, letterSpacing: '0', family: fa },
  { id: 'body-md', size: '1rem', weight: 400, lineHeight: LINE_PROFILES.reading.fa, letterSpacing: '0', family: fa },
  { id: 'body-lg', size: '1.125rem', weight: 400, lineHeight: LINE_PROFILES.reading.fa, letterSpacing: '0', family: fa },
  { id: 'title-sm', size: '1rem', weight: 600, lineHeight: LINE_PROFILES.heading.fa, letterSpacing: '0', family: fa },
  { id: 'title-md', size: '1.25rem', weight: 600, lineHeight: LINE_PROFILES.heading.fa, letterSpacing: '0', family: fa },
  { id: 'heading-section', size: '1.5rem', weight: 600, lineHeight: LINE_PROFILES.heading.fa, letterSpacing: '0', family: fa },
  {
    id: 'heading-page',
    size: 'clamp(1.5rem, calc(1.357143rem + 0.714286vw), 2rem)',
    weight: 700,
    lineHeight: LINE_PROFILES.heading.fa,
    letterSpacing: '0',
    family: fa,
    fluid: 'clamp(1.5rem, calc(1.357143rem + 0.714286vw), 2rem)',
  },
  {
    id: 'display',
    size: 'clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem)',
    weight: 700,
    lineHeight: LINE_PROFILES.display.fa,
    letterSpacing: '0',
    family: fa,
    fluid: 'clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem)',
  },
  { id: 'input-touch', size: '1rem', weight: 400, lineHeight: LINE_PROFILES.ui.fa, letterSpacing: '0', family: fa },
  { id: 'code', size: '0.875rem', weight: 400, lineHeight: 1.6, letterSpacing: '0', family: mono },
];

export const LATIN_LINE = LINE_PROFILES;
