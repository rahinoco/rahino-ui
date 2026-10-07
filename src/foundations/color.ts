export type AppearanceName = 'light' | 'dark';

export interface Pair {
  light: string;
  dark: string;
}

const pair = (light: string, dark: string): Pair => ({ light, dark });

export const SURFACE = {
  canvas: pair('#F4F2F3', '#121113'),
  base: pair('#FFFFFF', '#1A191B'),
  subtle: pair('#F8F6F7', '#232225'),
  raised: pair('#FFFFFF', '#2B292D'),
  sunken: pair('#ECE8EA', '#0E0D0F'),
  inverse: pair('#211D20', '#EEEEF0'),
} as const;

export const SCRIM = {
  modal: pair('rgb(20 12 17 / 0.52)', 'rgb(0 0 0 / 0.72)'),
} as const;

export const INK = {
  primary: pair('#211D20', '#EEEEF0'),
  secondary: pair('#625B60', '#B5B2BC'),
  tertiary: pair('#766E73', '#9C98A1'),
  disabled: pair('#AAA3A7', '#625F69'),
  'on-brand': pair('#FFFFFF', '#FFFFFF'),
  inverse: pair('#EEEEF0', '#211D20'),
} as const;

export const BRAND = {
  seed: pair('#631244', '#631244'),
  bg: pair('#F3ECF0', '#291823'),
  'bg-hover': pair('#EADCE4', '#321A29'),
  fg: pair('#631244', '#C7A4B6'),
} as const;

export const ACTION_PRIMARY_BG = {
  default: pair('#631244', '#631244'),
  hover: pair('#400C2C', '#741A52'),
  pressed: pair('#1E0515', '#4A0D33'),
  disabled: pair('#B28DA4', '#4A3742'),
} as const;

export const ACTION_PRIMARY_FG = pair('#FFFFFF', '#FFFFFF');
export const FOCUS_RING = pair('#5A103E', '#B28DA4');

export const INTERACTION = {
  'neutral-hover': pair('rgb(33 29 32 / 0.06)', 'rgb(238 238 240 / 0.08)'),
  'neutral-pressed': pair('rgb(33 29 32 / 0.10)', 'rgb(238 238 240 / 0.12)'),
} as const;

export const EDGE = {
  subtle: pair('#E3DFE2', '#323035'),
  default: pair('#D0C9CD', '#49474E'),
  strong: pair('#AAA3A7', '#625F69'),
  disabled: pair('#ECE8EA', '#2B292D'),
} as const;

export const STATUS = {
  success: {
    bg: pair('#EAF5EE', '#203B2A'),
    edge: pair('#ADD7BC', '#4F9166'),
    fg: pair('#216E43', '#87DCA4'),
    fill: pair('#2F7D50', '#348556'),
    'on-fill': pair('#FFFFFF', '#FFFFFF'),
  },
  warning: {
    bg: pair('#FBF2E2', '#40341D'),
    edge: pair('#E8C98C', '#9B7937'),
    fg: pair('#8A5A12', '#F0C86F'),
    fill: pair('#9E6A19', '#BE882E'),
    'on-fill': pair('#FFFFFF', '#1B1407'),
  },
  error: {
    bg: pair('#FBEAEC', '#42262B'),
    edge: pair('#EDB3B8', '#AA5963'),
    fg: pair('#A33A43', '#F4979F'),
    fill: pair('#B54650', '#B94C57'),
    'on-fill': pair('#FFFFFF', '#FFFFFF'),
  },
  info: {
    bg: pair('#EAF1F9', '#23354B'),
    edge: pair('#B6CCE6', '#5A83AE'),
    fg: pair('#345E91', '#86B9EE'),
    fill: pair('#416FA8', '#4479B5'),
    'on-fill': pair('#FFFFFF', '#FFFFFF'),
  },
} as const;

export const HIGH_CONTRAST = {
  light: {
    canvas: '#FFFFFF',
    base: '#FFFFFF',
    primary: '#211D20',
    secondary: '#211D20',
    tertiary: '#625B60',
  },
  dark: {
    canvas: '#0E0D0F',
    base: '#121113',
    primary: '#FFFFFF',
    secondary: '#EEEEF0',
    tertiary: '#B5B2BC',
  },
} as const;

/** Published pair table from the contract. Acceptance uses the precise computed ratio. */
export const CONTRAST_REFERENCE: Record<AppearanceName, Record<'primary' | 'secondary' | 'tertiary', Record<string, number>>> = {
  light: {
    primary: { canvas: 14.94, base: 16.65, subtle: 15.47, raised: 16.65, sunken: 13.71 },
    secondary: { canvas: 5.92, base: 6.59, subtle: 6.13, raised: 6.59, sunken: 5.43 },
    tertiary: { canvas: 4.44, base: 4.94, subtle: 4.59, raised: 4.94, sunken: 4.07 },
  },
  dark: {
    primary: { canvas: 16.25, base: 15.12, subtle: 13.66, raised: 12.43, sunken: 16.73 },
    secondary: { canvas: 9.02, base: 8.39, subtle: 7.58, raised: 6.9, sunken: 9.29 },
    tertiary: { canvas: 6.65, base: 6.19, subtle: 5.59, raised: 5.09, sunken: 6.85 },
  },
};

export const DATA_CATEGORICAL: Pair[] = [
  pair('#631244', '#C7A4B6'),
  pair('#36766B', '#75BFB0'),
  pair('#416FA8', '#86B9EE'),
  pair('#8A681F', '#D5B76F'),
  pair('#586B86', '#9AAAC1'),
  pair('#96513D', '#D69A82'),
  pair('#6A6198', '#AAA4CC'),
  pair('#5B733A', '#A8C58B'),
];

export const DATA_SEQUENTIAL: Pair[] = [
  pair('#F3ECF0', '#291823'),
  pair('#DAB8CB', '#593649'),
  pair('#B980A2', '#85556F'),
  pair('#93476F', '#AC7E97'),
  pair('#631244', '#C7A4B6'),
];

export const DATA_DIVERGING: Pair[] = [
  pair('#345E91', '#86B9EE'),
  pair('#AFC5DE', '#466483'),
  pair('#ECE8EA', '#2B292D'),
  pair('#DFC1B3', '#805D4D'),
  pair('#96513D', '#D69A82'),
];

export const DATA_ON_FILL = pair('#FFFFFF', '#211D20');

export const PRESENTATION_GRADIENTS = {
  'brand-dark': 'linear-gradient(135deg, #121113 0%, #291823 65%, #631244 100%)',
  'brand-light': 'linear-gradient(135deg, #FFFFFF 0%, #F3ECF0 65%, #EADCE4 100%)',
  atmosphere: 'radial-gradient(ellipse at 30% 20%, rgb(99 18 68 / 0.16), transparent 65%)',
} as const;
