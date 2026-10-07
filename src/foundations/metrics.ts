export const SPACE_REF: Record<string, string> = {
  '0': '0',
  '1': '0.0625rem',
  '2': '0.125rem',
  '4': '0.25rem',
  '6': '0.375rem',
  '8': '0.5rem',
  '12': '0.75rem',
  '16': '1rem',
  '20': '1.25rem',
  '24': '1.5rem',
  '32': '2rem',
  '40': '2.5rem',
  '48': '3rem',
  '56': '3.5rem',
  '64': '4rem',
  '80': '5rem',
  '96': '6rem',
};

export const SPACE_ROLE = {
  'icon-gap': '0.5rem',
  'label-gap': '0.25rem',
  'help-gap': '0.25rem',
  'field-gap': '1rem',
  'form-group-gap': '2rem',
  'toolbar-gap': '0.5rem',
  'group-gap': '1.5rem',
  'panel-padding': '1.5rem',
  'popover-padding': '1rem',
  'dialog-padding': '2rem',
  'dialog-padding-narrow': '1.5rem',
  'sheet-padding': '1.5rem',
  'section-gap': 'clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem)',
} as const;

export const CONTROL_SIZE = {
  sm: { minHeight: '2.25rem', paddingInline: '0.75rem', paddingBlock: '0.25rem', label: '0.875rem', icon: '16px' },
  md: { minHeight: '2.75rem', paddingInline: '1rem', paddingBlock: '0.375rem', label: '0.875rem', icon: '20px' },
  lg: { minHeight: '3.25rem', paddingInline: '1.25rem', paddingBlock: '0.625rem', label: '1rem', icon: '24px' },
} as const;

export const DENSITY = {
  compact: { padding: '1rem', groupGap: '1rem', rowMin: '2.25rem', cellBlock: '0.25rem', actionGap: '0.25rem' },
  regular: { padding: '1.5rem', groupGap: '1.5rem', rowMin: '2.75rem', cellBlock: '0.5rem', actionGap: '0.5rem' },
  spacious: { padding: '2rem', groupGap: '2rem', rowMin: '3.25rem', cellBlock: '0.75rem', actionGap: '0.75rem' },
} as const;

export const RADIUS = {
  none: '0',
  small: '0.25rem',
  control: '0.75rem',
  group: '1rem',
  panel: '1.25rem',
  dialog: '1.5rem',
  sheet: '1.75rem',
} as const;

export const FOCUS = { width: '2px', offset: '2px' } as const;
export const EDGE_WIDTH = { thin: '1px' } as const;

export const LAYOUT = {
  reading: '42rem',
  readingWide: '48rem',
  web: '75rem',
  dashboard: '90rem',
  fluidMin: '20rem',
  fluidMax: '90rem',
  pageGutter: 'clamp(1rem, calc(0.714286rem + 1.428571vw), 2rem)',
  columns: { narrow: 4, mid: 8, wide: 12 },
  gutters: { narrow: '1rem', mid: '1.5rem', wide: '1.5rem' },
} as const;

export const LAYER = {
  base: 0,
  sticky: 100,
  floating: 200,
  overlay: 300,
  notification: 400,
} as const;

export const LIFT = {
  none: null,
  rest: { contact: [0, 0.0625, 0.125], ambient: [0, 0.125, 0.375], light: [0.1, 0.06], dark: [0.18, 0.14] },
  float: { contact: [0, 0.125, 0.25], ambient: [0, 0.5, 1.25], light: [0.12, 0.1], dark: [0.22, 0.2] },
  raise: { contact: [0, 0.1875, 0.375], ambient: [0, 1, 2.25], light: [0.14, 0.14], dark: [0.26, 0.26] },
  modal: { contact: [0, 0.25, 0.5], ambient: [0, 1.5, 3.5], light: [0.16, 0.18], dark: [0.3, 0.34] },
} as const;

export type LiftLevel = keyof typeof LIFT;

export function liftShadow(level: LiftLevel, appearance: 'light' | 'dark'): string {
  const spec = LIFT[level];
  if (!spec) return 'none';
  const alpha = appearance === 'dark' ? spec.dark : spec.light;
  const shadow = (part: readonly number[], a: number) =>
    `${part[0]}rem ${part[1]}rem ${part[2]}rem rgb(0 0 0 / ${a})`;
  return `${shadow(spec.contact, alpha[0])}, ${shadow(spec.ambient, alpha[1])}`;
}

export const MOTION_DURATION = {
  instant: '0ms',
  feedback: '120ms',
  control: '180ms',
  panel: '240ms',
  overlay: '300ms',
  route: '220ms',
  reduced: '80ms',
} as const;

export const MOTION_EASING = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  gentle: 'cubic-bezier(0.18, 1.02, 0.32, 1)',
  linear: 'linear',
} as const;

export const PRESENTATION_MOTION = { base: '480ms' } as const;

export const ICON_SIZE = { sm: '16px', md: '20px', lg: '24px', display: '32px' } as const;

export const VEIL_TIER = {
  trace: { alpha: 0.31, blur: '1.125rem', saturation: 1.2 },
  air: { alpha: 0.48, blur: '1.75rem', saturation: 1.4 },
  core: { alpha: 0.6, blur: '2.25rem', saturation: 1.4 },
  shelter: { alpha: 0.7, blur: '2.6875rem', saturation: 1.25 },
  opaque: { alpha: 0.9, blur: '2.6875rem', saturation: 1.25 },
} as const;

export type VeilTier = keyof typeof VEIL_TIER;

export const VEIL_FLOOR = {
  light: { primary: 0.54, secondary: 0.86 },
  dark: { primary: 0.66, secondary: 0.82 },
} as const;

export const VEIL_EDGE = {
  light: 'rgb(255 255 255 / 0.04)',
  dark: 'rgb(255 255 255 / 0.06)',
} as const;
