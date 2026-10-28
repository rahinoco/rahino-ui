/**
 * Rahino Design System — Color foundations
 * Generated from the canonical master collection. Do not edit values here.
 * Regenerate: node master-tokens/scripts/build.mjs
 * Guide: Color.md.
 */

export type AppearanceName = "light" | "dark";
export interface Pair { light: string; dark: string; }
const pair = (light: string, dark: string): Pair => ({ light, dark });
type ReferenceInk = "primary" | "secondary" | "tertiary";

export const SURFACE = {
  /** @token rds.color.surface.canvas @lightAlias ref.color.gray-warm.75 @darkAlias ref.color.gray.950 */
  "canvas": pair("#F3F1F2", "#1A181B"),
  /** @token rds.color.surface.base @lightAlias ref.color.white @darkAlias ref.color.gray.925 */
  "base": pair("#FFFFFF", "#262429"),
  /** @token rds.color.surface.subtle @lightAlias ref.color.gray-warm.25 @darkAlias ref.color.gray.900 */
  "subtle": pair("#FBF9FA", "#2D2C30"),
  /** @token rds.color.surface.raised @lightAlias ref.color.white @darkAlias ref.color.gray.850 */
  "raised": pair("#FFFFFF", "#333135"),
  /** @token rds.color.surface.sunken @lightAlias ref.color.gray-warm.100 @darkAlias ref.color.gray.975 */
  "sunken": pair("#E8E3E5", "#030203"),
  /** @token rds.color.surface.inverse @lightAlias ref.color.gray-warm.875 @darkAlias ref.color.gray.50 */
  "inverse": pair("#211D20", "#EEEEF0"),
} as const;

export const SCRIM = {
  /** @token rds.color.scrim.modal @lightAlias ref.color.gray-warm.950-alpha-52 @darkAlias ref.color.black-alpha-72 */
  "modal": pair("rgb(20 12 17 / 0.52)", "rgb(0 0 0 / 0.72)"),
} as const;

export const INK = {
  /** @token rds.color.ink.primary @lightAlias ref.color.gray-warm.875 @darkAlias ref.color.gray.50 */
  "primary": pair("#211D20", "#EEEEF0"),
  /** @token rds.color.ink.secondary @lightAlias ref.color.gray-warm.625 @darkAlias ref.color.gray.225 */
  "secondary": pair("#5F585D", "#C0BDC6"),
  /** @token rds.color.ink.tertiary @lightAlias ref.color.gray-warm.575 @darkAlias ref.color.gray.325 */
  "tertiary": pair("#6D656B", "#AAA6B0"),
  /** @token rds.color.ink.disabled @lightAlias ref.color.gray-warm.325 @darkAlias ref.color.gray.600 */
  "disabled": pair("#AAA3A7", "#625F69"),
  /** @token rds.color.ink.on-brand @alias ref.color.white */
  "on-brand": pair("#FFFFFF", "#FFFFFF"),
  /** @token rds.color.ink.inverse @lightAlias ref.color.gray.50 @darkAlias ref.color.gray-warm.875 */
  "inverse": pair("#EEEEF0", "#211D20"),
} as const;

export const BRAND = {
  /** @token rds.color.brand.seed @alias ref.color.plum.775 */
  "seed": pair("#631244", "#631244"),
  /** @token rds.color.brand.bg.default @lightAlias ref.color.plum.50 @darkAlias ref.color.plum.875 */
  "bg": pair("#F0E5EB", "#321A29"),
  /** @token rds.color.brand.bg.hover @lightAlias ref.color.plum.100 @darkAlias ref.color.plum.850 */
  "bg-hover": pair("#E8D9E1", "#4A0D33"),
  /** @token rds.color.brand.fg @lightAlias ref.color.plum.775 @darkAlias ref.color.plum.200 */
  "fg": pair("#631244", "#E7B6D0"),
} as const;

/** @token rds.color.link.fg @alias rds.color.brand.fg */
export const LINK_FG = BRAND.fg;

export const ACTION_PRIMARY_BG = {
  /** @token rds.color.action.primary.bg.default @alias ref.color.plum.775 */
  "default": pair("#631244", "#631244"),
  /** @token rds.color.action.primary.bg.hover @lightAlias ref.color.plum.900 @darkAlias ref.color.plum.725 */
  "hover": pair("#400C2C", "#741A52"),
  /** @token rds.color.action.primary.bg.pressed @lightAlias ref.color.plum.950 @darkAlias ref.color.plum.850 */
  "pressed": pair("#1E0515", "#4A0D33"),
  /** @token rds.color.action.primary.bg.disabled @lightAlias ref.color.plum.375 @darkAlias ref.color.plum.750 */
  "disabled": pair("#DCC7D4", "#4A3742"),
} as const;

/** @token rds.color.action.primary.fg @alias rds.color.ink.on-brand */
export const ACTION_PRIMARY_FG = INK["on-brand"];

/** @token rds.color.focus.ring @lightAlias ref.color.plum.575 @darkAlias ref.color.plum.500 */
export const FOCUS_RING = pair("#99507A", "#A9638B");

export const INTERACTION = {
  /** @token rds.color.interaction.neutral.hover @lightAlias ref.color.gray-warm.875-alpha-6 @darkAlias ref.color.gray.50-alpha-8 */
  "neutral-hover": pair("rgb(33 29 32 / 0.06)", "rgb(238 238 240 / 0.08)"),
  /** @token rds.color.interaction.neutral.pressed @lightAlias ref.color.gray-warm.875-alpha-10 @darkAlias ref.color.gray.50-alpha-12 */
  "neutral-pressed": pair("rgb(33 29 32 / 0.10)", "rgb(238 238 240 / 0.12)"),
} as const;

/** @token rds.color.interaction.surface.selected @alias rds.color.brand.bg.default */
export const INTERACTION_SELECTED_SURFACE = BRAND.bg;

export const EDGE = {
  /** @token rds.color.edge.subtle @lightAlias ref.color.gray-cool.925-alpha-12 @darkAlias ref.color.white-alpha-10 */
  "subtle": pair("rgb(15 23 42 / 0.12)", "rgb(255 255 255 / 0.10)"),
  /** @token rds.color.edge.control @alias ref.color.gray-cool.450 */
  "control": pair("#7A8493", "#7A8493"),
} as const;

export const STATUS = {
  "success": {
      /** @token rds.color.status.success.bg @lightAlias ref.color.green.50 @darkAlias ref.color.green.775 */
      "bg": pair("#DAFBE8", "#203B2A"),
      /** @token rds.color.status.success.edge @lightAlias ref.color.green.175 @darkAlias ref.color.green.450 */
      "edge": pair("#ADD7BC", "#4F9166"),
      /** @token rds.color.status.success.fg @lightAlias ref.color.green.600 @darkAlias ref.color.green.200 */
      "fg": pair("#216E43", "#87DCA4"),
      /** @token rds.color.status.success.fill @lightAlias ref.color.green.525 @darkAlias ref.color.green.500 */
      "fill": pair("#2F7D50", "#348556"),
      /** @token rds.color.status.success.on-fill @alias ref.color.white */
      "on-fill": pair("#FFFFFF", "#FFFFFF"),
    },
  "warning": {
      /** @token rds.color.status.warning.bg @lightAlias ref.color.amber.50 @darkAlias ref.color.amber.775 */
      "bg": pair("#FEF3DF", "#40341D"),
      /** @token rds.color.status.warning.edge @lightAlias ref.color.amber.200 @darkAlias ref.color.amber.475 */
      "edge": pair("#E8C98C", "#9B7937"),
      /** @token rds.color.status.warning.fg @lightAlias ref.color.amber.575 @darkAlias ref.color.amber.175 */
      "fg": pair("#8A5A12", "#F0C86F"),
      /** @token rds.color.status.warning.fill @lightAlias ref.color.amber.500 @darkAlias ref.color.amber.400 */
      "fill": pair("#9E6A19", "#BE882E"),
      /** @token rds.color.status.warning.on-fill @lightAlias ref.color.white @darkAlias ref.color.amber.925 */
      "on-fill": pair("#FFFFFF", "#1B1407"),
    },
  "error": {
      /** @token rds.color.status.error.bg @lightAlias ref.color.red.50 @darkAlias ref.color.red.800 */
      "bg": pair("#FCE9EB", "#42262B"),
      /** @token rds.color.status.error.edge @lightAlias ref.color.red.225 @darkAlias ref.color.red.525 */
      "edge": pair("#EDB3B8", "#AA5963"),
      /** @token rds.color.status.error.fg @lightAlias ref.color.red.625 @darkAlias ref.color.red.275 */
      "fg": pair("#A33A43", "#F4979F"),
      /** @token rds.color.status.error.fill @lightAlias ref.color.red.575 @darkAlias ref.color.red.550 */
      "fill": pair("#B54650", "#B94C57"),
      /** @token rds.color.status.error.on-fill @alias ref.color.white */
      "on-fill": pair("#FFFFFF", "#FFFFFF"),
    },
  "info": {
      /** @token rds.color.status.info.bg @lightAlias ref.color.blue.50 @darkAlias ref.color.blue.775 */
      "bg": pair("#E2ECF8", "#23354B"),
      /** @token rds.color.status.info.edge @lightAlias ref.color.blue.200 @darkAlias ref.color.blue.475 */
      "edge": pair("#B6CCE6", "#5A83AE"),
      /** @token rds.color.status.info.fg @lightAlias ref.color.blue.600 @darkAlias ref.color.blue.275 */
      "fg": pair("#345E91", "#86B9EE"),
      /** @token rds.color.status.info.fill @lightAlias ref.color.blue.550 @darkAlias ref.color.blue.500 */
      "fill": pair("#416FA8", "#4479B5"),
      /** @token rds.color.status.info.on-fill @alias ref.color.white */
      "on-fill": pair("#FFFFFF", "#FFFFFF"),
    },
} as const;

export const HIGH_CONTRAST = {
  "light": {
      "canvas": "#FFFFFF",
      "base": "#FFFFFF",
      "primary": "#211D20",
      "secondary": "#211D20",
      "tertiary": "#625B60",
    },
  "dark": {
      "canvas": "#030203",
      "base": "#1A181B",
      "primary": "#FFFFFF",
      "secondary": "#EEEEF0",
      "tertiary": "#B5B2BC",
    },
} as const;

export const CONTRAST_REFERENCE: Record<AppearanceName, Record<ReferenceInk, Record<string, number>>> = {
  "light": {
    "primary": {
      "canvas": 14.81,
      "base": 16.65,
      "subtle": 15.88,
      "raised": 16.65,
      "sunken": 13.12
    },
    "secondary": {
      "canvas": 6.14,
      "base": 6.91,
      "subtle": 6.59,
      "raised": 6.91,
      "sunken": 5.44
    },
    "tertiary": {
      "canvas": 5.01,
      "base": 5.64,
      "subtle": 5.38,
      "raised": 5.64,
      "sunken": 4.44
    }
  },
  "dark": {
    "primary": {
      "canvas": 15.22,
      "base": 13.26,
      "subtle": 11.97,
      "raised": 11.11,
      "sunken": 17.88
    },
    "secondary": {
      "canvas": 9.52,
      "base": 8.29,
      "subtle": 7.48,
      "raised": 6.95,
      "sunken": 11.18
    },
    "tertiary": {
      "canvas": 7.38,
      "base": 6.43,
      "subtle": 5.8,
      "raised": 5.39,
      "sunken": 8.67
    }
  }
};

export const DATA_CATEGORICAL_TOKENS = {
  /** @token rds.color.data.categorical.01 @lightAlias ref.color.plum.775 @darkAlias ref.color.plum.350 */
  "01": pair("#631244", "#E18FBD"),
  /** @token rds.color.data.categorical.02 @lightAlias ref.color.teal.550 @darkAlias ref.color.teal.250 */
  "02": pair("#287569", "#74CCB4"),
  /** @token rds.color.data.categorical.03 @lightAlias ref.color.blue.575 @darkAlias ref.color.blue.300 */
  "03": pair("#386EAA", "#85B7ED"),
  /** @token rds.color.data.categorical.04 @lightAlias ref.color.amber.550 @darkAlias ref.color.amber.225 */
  "04": pair("#926119", "#E5B567"),
  /** @token rds.color.data.categorical.05 @lightAlias ref.color.purple.625 @darkAlias ref.color.purple.300 */
  "05": pair("#654D91", "#B8A1E6"),
  /** @token rds.color.data.categorical.06 @lightAlias ref.color.red.600 @darkAlias ref.color.red.300 */
  "06": pair("#9B4D48", "#E9968D"),
  /** @token rds.color.data.categorical.07 @lightAlias ref.color.gray-cool.550 @darkAlias ref.color.gray-cool.250 */
  "07": pair("#526C7B", "#A4BECD"),
  /** @token rds.color.data.categorical.08 @lightAlias ref.color.olive.550 @darkAlias ref.color.olive.200 */
  "08": pair("#637437", "#BFCB7A"),
} as const;

export const DATA_CATEGORICAL: Pair[] = Object.values(DATA_CATEGORICAL_TOKENS);

export const DATA_SEQUENTIAL_TOKENS = {
  /** @token rds.color.data.sequential.01 @lightAlias ref.color.plum.525 @darkAlias ref.color.plum.425 */
  "01": pair("#966883", "#A7839B"),
  /** @token rds.color.data.sequential.02 @lightAlias ref.color.plum.600 @darkAlias ref.color.plum.400 */
  "02": pair("#8C5776", "#B48BA6"),
  /** @token rds.color.data.sequential.03 @lightAlias ref.color.plum.625 @darkAlias ref.color.plum.325 */
  "03": pair("#824465", "#C89CB6"),
  /** @token rds.color.data.sequential.04 @lightAlias ref.color.plum.700 @darkAlias ref.color.plum.250 */
  "04": pair("#752C55", "#D9A7C3"),
  /** @token rds.color.data.sequential.05 @lightAlias ref.color.plum.775 @darkAlias ref.color.plum.200 */
  "05": pair("#631244", "#E7B6D0"),
} as const;

export const DATA_SEQUENTIAL: Pair[] = Object.values(DATA_SEQUENTIAL_TOKENS);

export const DATA_DIVERGING_TOKENS = {
  /** @token rds.color.data.diverging.01 @lightAlias ref.color.teal.575 @darkAlias ref.color.teal.200 */
  "01": pair("#246F67", "#8AD3BF"),
  /** @token rds.color.data.diverging.02 @lightAlias ref.color.teal.400 @darkAlias ref.color.teal.425 */
  "02": pair("#64988D", "#58968A"),
  /** @token rds.color.data.diverging.03 @lightAlias ref.color.gray-warm.200 @darkAlias ref.color.gray-warm.650 */
  "03": pair("#CAC2C7", "#5E585F"),
  /** @token rds.color.data.diverging.04 @lightAlias ref.color.plum.550 @darkAlias ref.color.plum.450 */
  "04": pair("#9B5878", "#A47891"),
  /** @token rds.color.data.diverging.05 @lightAlias ref.color.plum.775 @darkAlias ref.color.plum.350 */
  "05": pair("#631244", "#E18FBD"),
} as const;

export const DATA_DIVERGING: Pair[] = Object.values(DATA_DIVERGING_TOKENS);

/** @token rds.color.data.on-fill @lightAlias ref.color.white @darkAlias ref.color.gray-warm.875 */
export const DATA_ON_FILL = pair("#FFFFFF", "#211D20");

export const PRESENTATION_GRADIENTS = {
  /** @token rds.color.presentation.gradient.brand-dark */
  "brand-dark": "linear-gradient(135deg, #121113 0%, #291823 65%, #631244 100%)",
  /** @token rds.color.presentation.gradient.brand-light */
  "brand-light": "linear-gradient(135deg, #FFFFFF 0%, #F3ECF0 65%, #EADCE4 100%)",
  /** @token rds.color.presentation.gradient.atmosphere */
  "atmosphere": "radial-gradient(ellipse at 30% 20%, rgb(99 18 68 / 0.16), transparent 65%)",
} as const;
