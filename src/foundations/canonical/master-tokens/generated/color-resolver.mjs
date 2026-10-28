/** Generated color resolver. Edit master JSON or generator sources and rebuild. Guide: ../../Rahino-Resolver.md. */

const data = {
  "policy": {
    "approval": "context-selection-and-contrast-policy",
    "status": "approved-foundation-policy",
    "appearance": {
      "default": "system",
      "fallback": "light",
      "precedence": [
        "explicit-app-setting",
        "system-preference",
        "light-fallback"
      ]
    },
    "contrast": {
      "default": "system",
      "precedence": [
        "native-forced-colors",
        "explicit-app-setting",
        "system-preference",
        "standard-fallback"
      ],
      "enhancedOverrides": {
        "light": {
          "rds.color.surface.canvas": "{ref.color.white}",
          "rds.color.surface.base": "{ref.color.white}",
          "rds.color.ink.primary": "{ref.color.gray-warm.875}",
          "rds.color.ink.secondary": "{ref.color.gray-warm.875}",
          "rds.color.ink.tertiary": "{ref.color.gray-warm.600}"
        },
        "dark": {
          "rds.color.surface.canvas": "{ref.color.gray.975}",
          "rds.color.surface.base": "{ref.color.gray.950}",
          "rds.color.ink.primary": "{ref.color.white}",
          "rds.color.ink.secondary": "{ref.color.gray.50}",
          "rds.color.ink.tertiary": "{ref.color.gray.275}"
        }
      },
      "forcedColors": "Use native system colors through component CSS; do not apply custom enhanced-contrast aliases."
    },
    "language": {
      "selection": "explicit-content-script",
      "supportedScripts": [
        "fa",
        "latin"
      ],
      "automaticDetection": false,
      "codeOverride": "rds.font.family.code"
    },
    "scope": "Foundation selection rules and alias mappings. Applications supply preference changes and implement native forced-color styling; density, reduced motion and presentation recipes are independent."
  },
  "shared": {
    "ref.color.gray-warm.25": "#FBF9FA",
    "ref.color.gray-warm.75": "#F3F1F2",
    "ref.color.gray-warm.100": "#E8E3E5",
    "ref.color.gray-warm.200": "#CAC2C7",
    "ref.color.gray-warm.325": "#AAA3A7",
    "ref.color.gray-warm.575": "#6D656B",
    "ref.color.gray-warm.600": "#625B60",
    "ref.color.gray-warm.625": "#5F585D",
    "ref.color.gray-warm.650": "#5E585F",
    "ref.color.gray-warm.875": "#211D20",
    "ref.color.gray-warm.950-alpha-52": "rgb(20 12 17 / 0.52)",
    "ref.color.gray-warm.875-alpha-6": "rgb(33 29 32 / 0.06)",
    "ref.color.gray-warm.875-alpha-10": "rgb(33 29 32 / 0.10)",
    "ref.color.gray-warm.900-alpha-56": "rgb(26 25 24 / 0.56)",
    "ref.color.gray-warm.850-alpha-52": "rgb(43 37 41 / 0.52)",
    "ref.color.white": "#FFFFFF",
    "ref.color.gray.50": "#EEEEF0",
    "ref.color.gray.225": "#C0BDC6",
    "ref.color.gray.275": "#B5B2BC",
    "ref.color.gray.325": "#AAA6B0",
    "ref.color.gray.600": "#625F69",
    "ref.color.gray.850": "#333135",
    "ref.color.gray.900": "#2D2C30",
    "ref.color.gray.925": "#262429",
    "ref.color.gray.950": "#1A181B",
    "ref.color.gray.975": "#030203",
    "ref.color.gray.50-alpha-8": "rgb(238 238 240 / 0.08)",
    "ref.color.gray.50-alpha-12": "rgb(238 238 240 / 0.12)",
    "ref.color.gray.825-alpha-4": "rgb(43 43 43 / 0.04)",
    "ref.color.gray.875-alpha-18": "rgb(37 37 37 / 0.18)",
    "ref.color.gray.925-alpha-76": "rgb(26 25 27 / 0.76)",
    "ref.color.gray.925-alpha-92": "rgb(26 25 27 / 0.92)",
    "ref.color.plum.50": "#F0E5EB",
    "ref.color.plum.100": "#E8D9E1",
    "ref.color.plum.200": "#E7B6D0",
    "ref.color.plum.250": "#D9A7C3",
    "ref.color.plum.300": "#C7A4B6",
    "ref.color.plum.325": "#C89CB6",
    "ref.color.plum.350": "#E18FBD",
    "ref.color.plum.375": "#DCC7D4",
    "ref.color.plum.400": "#B48BA6",
    "ref.color.plum.425": "#A7839B",
    "ref.color.plum.450": "#A47891",
    "ref.color.plum.500": "#A9638B",
    "ref.color.plum.525": "#966883",
    "ref.color.plum.550": "#9B5878",
    "ref.color.plum.575": "#99507A",
    "ref.color.plum.600": "#8C5776",
    "ref.color.plum.625": "#824465",
    "ref.color.plum.700": "#752C55",
    "ref.color.plum.725": "#741A52",
    "ref.color.plum.750": "#4A3742",
    "ref.color.plum.775": "#631244",
    "ref.color.plum.850": "#4A0D33",
    "ref.color.plum.875": "#321A29",
    "ref.color.plum.900": "#400C2C",
    "ref.color.plum.925": "#291823",
    "ref.color.plum.950": "#1E0515",
    "ref.color.gray-cool.250": "#A4BECD",
    "ref.color.gray-cool.450": "#7A8493",
    "ref.color.gray-cool.550": "#526C7B",
    "ref.color.gray-cool.925-alpha-12": "rgb(15 23 42 / 0.12)",
    "ref.color.green.50": "#DAFBE8",
    "ref.color.green.175": "#ADD7BC",
    "ref.color.green.200": "#87DCA4",
    "ref.color.green.450": "#4F9166",
    "ref.color.green.500": "#348556",
    "ref.color.green.525": "#2F7D50",
    "ref.color.green.600": "#216E43",
    "ref.color.green.775": "#203B2A",
    "ref.color.amber.50": "#FEF3DF",
    "ref.color.amber.175": "#F0C86F",
    "ref.color.amber.200": "#E8C98C",
    "ref.color.amber.225": "#E5B567",
    "ref.color.amber.400": "#BE882E",
    "ref.color.amber.475": "#9B7937",
    "ref.color.amber.500": "#9E6A19",
    "ref.color.amber.550": "#926119",
    "ref.color.amber.575": "#8A5A12",
    "ref.color.amber.775": "#40341D",
    "ref.color.amber.925": "#1B1407",
    "ref.color.red.50": "#FCE9EB",
    "ref.color.red.225": "#EDB3B8",
    "ref.color.red.275": "#F4979F",
    "ref.color.red.300": "#E9968D",
    "ref.color.red.525": "#AA5963",
    "ref.color.red.550": "#B94C57",
    "ref.color.red.575": "#B54650",
    "ref.color.red.600": "#9B4D48",
    "ref.color.red.625": "#A33A43",
    "ref.color.red.800": "#42262B",
    "ref.color.blue.50": "#E2ECF8",
    "ref.color.blue.200": "#B6CCE6",
    "ref.color.blue.275": "#86B9EE",
    "ref.color.blue.300": "#85B7ED",
    "ref.color.blue.475": "#5A83AE",
    "ref.color.blue.500": "#4479B5",
    "ref.color.blue.550": "#416FA8",
    "ref.color.blue.575": "#386EAA",
    "ref.color.blue.600": "#345E91",
    "ref.color.blue.775": "#23354B",
    "ref.color.teal.200": "#8AD3BF",
    "ref.color.teal.250": "#74CCB4",
    "ref.color.teal.400": "#64988D",
    "ref.color.teal.425": "#58968A",
    "ref.color.teal.550": "#287569",
    "ref.color.teal.575": "#246F67",
    "ref.color.purple.300": "#B8A1E6",
    "ref.color.purple.625": "#654D91",
    "ref.color.olive.200": "#BFCB7A",
    "ref.color.olive.550": "#637437",
    "ref.color.white-alpha-4": "rgb(255 255 255 / 0.04)",
    "ref.color.white-alpha-18": "rgb(255 255 255 / 0.18)",
    "ref.color.white-alpha-52": "rgb(255 255 255 / 0.52)",
    "ref.color.white-alpha-72": "rgb(255 255 255 / 0.72)",
    "ref.color.white-alpha-92": "rgb(255 255 255 / 0.92)",
    "ref.color.black-alpha-6": "rgb(0 0 0 / 0.06)",
    "ref.color.black-alpha-10": "rgb(0 0 0 / 0.10)",
    "ref.color.black-alpha-14": "rgb(0 0 0 / 0.14)",
    "ref.color.black-alpha-72": "rgb(0 0 0 / 0.72)",
    "ref.color.white-alpha-10": "rgb(255 255 255 / 0.10)",
    "ref.color.black-alpha-20": "rgb(0 0 0 / 0.20)",
    "ref.color.black-alpha-26": "rgb(0 0 0 / 0.26)"
  },
  "palettes": {
    "light": {
      "standard": {
        "rds.color.surface.canvas": "#F3F1F2",
        "rds.color.surface.base": "#FFFFFF",
        "rds.color.surface.subtle": "#FBF9FA",
        "rds.color.surface.raised": "#FFFFFF",
        "rds.color.surface.sunken": "#E8E3E5",
        "rds.color.surface.inverse": "#211D20",
        "rds.color.scrim.modal": "rgb(20 12 17 / 0.52)",
        "rds.color.ink.primary": "#211D20",
        "rds.color.ink.secondary": "#5F585D",
        "rds.color.ink.tertiary": "#6D656B",
        "rds.color.ink.disabled": "#AAA3A7",
        "rds.color.ink.on-brand": "#FFFFFF",
        "rds.color.ink.inverse": "#EEEEF0",
        "rds.color.brand.seed": "#631244",
        "rds.color.brand.bg.default": "#F0E5EB",
        "rds.color.brand.bg.hover": "#E8D9E1",
        "rds.color.brand.fg": "#631244",
        "rds.color.action.primary.bg.default": "#631244",
        "rds.color.action.primary.bg.hover": "#400C2C",
        "rds.color.action.primary.bg.pressed": "#1E0515",
        "rds.color.action.primary.bg.disabled": "#DCC7D4",
        "rds.color.action.primary.fg": "#FFFFFF",
        "rds.color.edge.subtle": "rgb(15 23 42 / 0.12)",
        "rds.color.edge.control": "#7A8493",
        "rds.color.link.fg": "#631244",
        "rds.color.focus.ring": "#99507A",
        "rds.color.interaction.neutral.hover": "rgb(33 29 32 / 0.06)",
        "rds.color.interaction.neutral.pressed": "rgb(33 29 32 / 0.10)",
        "rds.color.interaction.surface.selected": "#F0E5EB",
        "rds.color.status.success.bg": "#DAFBE8",
        "rds.color.status.success.edge": "#ADD7BC",
        "rds.color.status.success.fg": "#216E43",
        "rds.color.status.success.fill": "#2F7D50",
        "rds.color.status.success.on-fill": "#FFFFFF",
        "rds.color.status.warning.bg": "#FEF3DF",
        "rds.color.status.warning.edge": "#E8C98C",
        "rds.color.status.warning.fg": "#8A5A12",
        "rds.color.status.warning.fill": "#9E6A19",
        "rds.color.status.warning.on-fill": "#FFFFFF",
        "rds.color.status.error.bg": "#FCE9EB",
        "rds.color.status.error.edge": "#EDB3B8",
        "rds.color.status.error.fg": "#A33A43",
        "rds.color.status.error.fill": "#B54650",
        "rds.color.status.error.on-fill": "#FFFFFF",
        "rds.color.status.info.bg": "#E2ECF8",
        "rds.color.status.info.edge": "#B6CCE6",
        "rds.color.status.info.fg": "#345E91",
        "rds.color.status.info.fill": "#416FA8",
        "rds.color.status.info.on-fill": "#FFFFFF",
        "rds.color.data.on-fill": "#FFFFFF",
        "rds.color.data.categorical.01": "#631244",
        "rds.color.data.categorical.02": "#287569",
        "rds.color.data.categorical.03": "#386EAA",
        "rds.color.data.categorical.04": "#926119",
        "rds.color.data.categorical.05": "#654D91",
        "rds.color.data.categorical.06": "#9B4D48",
        "rds.color.data.categorical.07": "#526C7B",
        "rds.color.data.categorical.08": "#637437",
        "rds.color.data.sequential.01": "#966883",
        "rds.color.data.sequential.02": "#8C5776",
        "rds.color.data.sequential.03": "#824465",
        "rds.color.data.sequential.04": "#752C55",
        "rds.color.data.sequential.05": "#631244",
        "rds.color.data.diverging.01": "#246F67",
        "rds.color.data.diverging.02": "#64988D",
        "rds.color.data.diverging.03": "#CAC2C7",
        "rds.color.data.diverging.04": "#9B5878",
        "rds.color.data.diverging.05": "#631244",
        "rds.veil.100.color": "rgb(255 255 255 / 0.04)",
        "rds.veil.200.color": "rgb(255 255 255 / 0.18)",
        "rds.veil.300.color": "rgb(255 255 255 / 0.52)",
        "rds.veil.400.color": "rgb(255 255 255 / 0.72)",
        "rds.veil.500.color": "rgb(255 255 255 / 0.92)",
        "rds.veil.scrim.color": "rgb(20 12 17 / 0.52)"
      },
      "more": {
        "rds.color.surface.canvas": "#FFFFFF",
        "rds.color.ink.secondary": "#211D20",
        "rds.color.ink.tertiary": "#625B60"
      }
    },
    "dark": {
      "standard": {
        "rds.color.surface.canvas": "#1A181B",
        "rds.color.surface.base": "#262429",
        "rds.color.surface.subtle": "#2D2C30",
        "rds.color.surface.raised": "#333135",
        "rds.color.surface.sunken": "#030203",
        "rds.color.surface.inverse": "#EEEEF0",
        "rds.color.scrim.modal": "rgb(0 0 0 / 0.72)",
        "rds.color.ink.primary": "#EEEEF0",
        "rds.color.ink.secondary": "#C0BDC6",
        "rds.color.ink.tertiary": "#AAA6B0",
        "rds.color.ink.disabled": "#625F69",
        "rds.color.ink.on-brand": "#FFFFFF",
        "rds.color.ink.inverse": "#211D20",
        "rds.color.brand.seed": "#631244",
        "rds.color.brand.bg.default": "#321A29",
        "rds.color.brand.bg.hover": "#4A0D33",
        "rds.color.brand.fg": "#E7B6D0",
        "rds.color.action.primary.bg.default": "#631244",
        "rds.color.action.primary.bg.hover": "#741A52",
        "rds.color.action.primary.bg.pressed": "#4A0D33",
        "rds.color.action.primary.bg.disabled": "#4A3742",
        "rds.color.action.primary.fg": "#FFFFFF",
        "rds.color.edge.subtle": "rgb(255 255 255 / 0.10)",
        "rds.color.edge.control": "#7A8493",
        "rds.color.link.fg": "#E7B6D0",
        "rds.color.focus.ring": "#A9638B",
        "rds.color.interaction.neutral.hover": "rgb(238 238 240 / 0.08)",
        "rds.color.interaction.neutral.pressed": "rgb(238 238 240 / 0.12)",
        "rds.color.interaction.surface.selected": "#321A29",
        "rds.color.status.success.bg": "#203B2A",
        "rds.color.status.success.edge": "#4F9166",
        "rds.color.status.success.fg": "#87DCA4",
        "rds.color.status.success.fill": "#348556",
        "rds.color.status.success.on-fill": "#FFFFFF",
        "rds.color.status.warning.bg": "#40341D",
        "rds.color.status.warning.edge": "#9B7937",
        "rds.color.status.warning.fg": "#F0C86F",
        "rds.color.status.warning.fill": "#BE882E",
        "rds.color.status.warning.on-fill": "#1B1407",
        "rds.color.status.error.bg": "#42262B",
        "rds.color.status.error.edge": "#AA5963",
        "rds.color.status.error.fg": "#F4979F",
        "rds.color.status.error.fill": "#B94C57",
        "rds.color.status.error.on-fill": "#FFFFFF",
        "rds.color.status.info.bg": "#23354B",
        "rds.color.status.info.edge": "#5A83AE",
        "rds.color.status.info.fg": "#86B9EE",
        "rds.color.status.info.fill": "#4479B5",
        "rds.color.status.info.on-fill": "#FFFFFF",
        "rds.color.data.on-fill": "#211D20",
        "rds.color.data.categorical.01": "#E18FBD",
        "rds.color.data.categorical.02": "#74CCB4",
        "rds.color.data.categorical.03": "#85B7ED",
        "rds.color.data.categorical.04": "#E5B567",
        "rds.color.data.categorical.05": "#B8A1E6",
        "rds.color.data.categorical.06": "#E9968D",
        "rds.color.data.categorical.07": "#A4BECD",
        "rds.color.data.categorical.08": "#BFCB7A",
        "rds.color.data.sequential.01": "#A7839B",
        "rds.color.data.sequential.02": "#B48BA6",
        "rds.color.data.sequential.03": "#C89CB6",
        "rds.color.data.sequential.04": "#D9A7C3",
        "rds.color.data.sequential.05": "#E7B6D0",
        "rds.color.data.diverging.01": "#8AD3BF",
        "rds.color.data.diverging.02": "#58968A",
        "rds.color.data.diverging.03": "#5E585F",
        "rds.color.data.diverging.04": "#A47891",
        "rds.color.data.diverging.05": "#E18FBD",
        "rds.veil.100.color": "rgb(43 43 43 / 0.04)",
        "rds.veil.200.color": "rgb(37 37 37 / 0.18)",
        "rds.veil.300.color": "rgb(26 25 24 / 0.56)",
        "rds.veil.400.color": "rgb(26 25 27 / 0.76)",
        "rds.veil.500.color": "rgb(26 25 27 / 0.92)",
        "rds.veil.scrim.color": "rgb(43 37 41 / 0.52)"
      },
      "more": {
        "rds.color.surface.canvas": "#030203",
        "rds.color.surface.base": "#1A181B",
        "rds.color.ink.primary": "#FFFFFF",
        "rds.color.ink.secondary": "#EEEEF0",
        "rds.color.ink.tertiary": "#B5B2BC"
      }
    }
  },
  "forced": {
    "rds.color.surface.canvas": "Canvas",
    "rds.color.surface.base": "Canvas",
    "rds.color.surface.subtle": "Canvas",
    "rds.color.surface.raised": "Canvas",
    "rds.color.surface.sunken": "Canvas",
    "rds.color.surface.inverse": "Canvas",
    "rds.color.scrim.modal": "Canvas",
    "rds.color.ink.primary": "CanvasText",
    "rds.color.ink.secondary": "CanvasText",
    "rds.color.ink.tertiary": "CanvasText",
    "rds.color.ink.disabled": "GrayText",
    "rds.color.ink.on-brand": "ButtonText",
    "rds.color.ink.inverse": "CanvasText",
    "rds.color.brand.seed": "CanvasText",
    "rds.color.brand.bg.default": "Canvas",
    "rds.color.brand.bg.hover": "Canvas",
    "rds.color.brand.fg": "CanvasText",
    "rds.color.action.primary.bg.default": "ButtonFace",
    "rds.color.action.primary.bg.hover": "ButtonFace",
    "rds.color.action.primary.bg.pressed": "ButtonFace",
    "rds.color.action.primary.bg.disabled": "GrayText",
    "rds.color.action.primary.fg": "ButtonText",
    "rds.color.edge.subtle": "ButtonBorder",
    "rds.color.edge.control": "ButtonBorder",
    "rds.color.link.fg": "LinkText",
    "rds.color.focus.ring": "Highlight",
    "rds.color.interaction.neutral.hover": "CanvasText",
    "rds.color.interaction.neutral.pressed": "CanvasText",
    "rds.color.interaction.surface.selected": "Highlight",
    "rds.color.status.success.bg": "Canvas",
    "rds.color.status.success.edge": "CanvasText",
    "rds.color.status.success.fg": "CanvasText",
    "rds.color.status.success.fill": "CanvasText",
    "rds.color.status.success.on-fill": "Canvas",
    "rds.color.status.warning.bg": "Canvas",
    "rds.color.status.warning.edge": "CanvasText",
    "rds.color.status.warning.fg": "CanvasText",
    "rds.color.status.warning.fill": "CanvasText",
    "rds.color.status.warning.on-fill": "Canvas",
    "rds.color.status.error.bg": "Canvas",
    "rds.color.status.error.edge": "CanvasText",
    "rds.color.status.error.fg": "CanvasText",
    "rds.color.status.error.fill": "CanvasText",
    "rds.color.status.error.on-fill": "Canvas",
    "rds.color.status.info.bg": "Canvas",
    "rds.color.status.info.edge": "CanvasText",
    "rds.color.status.info.fg": "CanvasText",
    "rds.color.status.info.fill": "CanvasText",
    "rds.color.status.info.on-fill": "Canvas",
    "rds.color.data.on-fill": "Canvas",
    "rds.color.data.categorical.01": "CanvasText",
    "rds.color.data.categorical.02": "CanvasText",
    "rds.color.data.categorical.03": "CanvasText",
    "rds.color.data.categorical.04": "CanvasText",
    "rds.color.data.categorical.05": "CanvasText",
    "rds.color.data.categorical.06": "CanvasText",
    "rds.color.data.categorical.07": "CanvasText",
    "rds.color.data.categorical.08": "CanvasText",
    "rds.color.data.sequential.01": "CanvasText",
    "rds.color.data.sequential.02": "CanvasText",
    "rds.color.data.sequential.03": "CanvasText",
    "rds.color.data.sequential.04": "CanvasText",
    "rds.color.data.sequential.05": "CanvasText",
    "rds.color.data.diverging.01": "CanvasText",
    "rds.color.data.diverging.02": "CanvasText",
    "rds.color.data.diverging.03": "CanvasText",
    "rds.color.data.diverging.04": "CanvasText",
    "rds.color.data.diverging.05": "CanvasText",
    "rds.veil.100.color": "Canvas",
    "rds.veil.200.color": "Canvas",
    "rds.veil.300.color": "Canvas",
    "rds.veil.400.color": "Canvas",
    "rds.veil.500.color": "Canvas",
    "rds.veil.scrim.color": "Canvas"
  }
};

function selectContext(policy, settings = {}, environment = {}) {
  const appearanceChoice = settings.appearance ?? policy.appearance.default;
  const contrastChoice = settings.contrast ?? policy.contrast.default;
  if (!['system', 'light', 'dark'].includes(appearanceChoice)) throw new TypeError('Appearance must be system, light or dark.');
  if (!['system', 'standard', 'more'].includes(contrastChoice)) throw new TypeError('Contrast must be system, standard or more.');
  if (settings.script !== undefined && !policy.language.supportedScripts.includes(settings.script)) throw new TypeError('Script must be explicitly fa or latin.');
  const appearance = appearanceChoice !== 'system' ? appearanceChoice
    : ['light', 'dark'].includes(environment.appearance) ? environment.appearance : policy.appearance.fallback;
  const useSystemColors = environment.forcedColors === true;
  const enhanced = contrastChoice === 'more' || (contrastChoice === 'system' && environment.contrast === 'more');
  const contrast = useSystemColors ? 'forced-colors' : enhanced ? 'more' : 'standard';
  return { appearance, contrast, script: settings.script ?? null, setsInOrder: ['shared', appearance],
    overrides: contrast === 'more' ? { ...policy.contrast.enhancedOverrides[appearance] } : {}, useSystemColors };
}

function createColorResolver(data, selectContext) {
  const controllers = new WeakMap();
  const validatePreferences = preferences => {
    if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) throw new TypeError('Color preferences must be an object.');
    for (const key of Object.keys(preferences)) if (!['appearance', 'contrast'].includes(key)) throw new TypeError(`Unknown color preference: ${key}`);
  };
  const resolveColorContext = (preferences = {}, environment = {}) => {
    validatePreferences(preferences);
    const { appearance, contrast } = selectContext(data.policy, preferences, environment);
    return Object.freeze({ appearance, contrast });
  };
  const resolveColor = (tokenName, context = resolveColorContext()) => {
    if (typeof tokenName !== 'string') throw new TypeError('A color token name must be a string.');
    if (!context || !['light', 'dark'].includes(context.appearance) || !['standard', 'more', 'forced-colors'].includes(context.contrast)) throw new TypeError('Use a resolved color context with light/dark appearance and standard/more/forced-colors contrast.');
    if (Object.hasOwn(data.shared, tokenName)) return data.shared[tokenName];
    const palette = data.palettes[context.appearance];
    if (!Object.hasOwn(palette.standard, tokenName)) throw new RangeError(`Unknown color token: ${tokenName}`);
    if (context.contrast === 'forced-colors') return data.forced[tokenName];
    return context.contrast === 'more' && Object.hasOwn(palette.more, tokenName) ? palette.more[tokenName] : palette.standard[tokenName];
  };
  const applyColorPreferences = (preferences = {}, options = {}) => {
    validatePreferences(preferences);
    const root = options.root ?? globalThis.document?.documentElement;
    if (!root || root !== root.ownerDocument?.documentElement || !root.ownerDocument.defaultView) throw new TypeError('Color preferences require the document root of a browser window.');
    const existing = controllers.get(root);
    if (existing) { existing.setPreferences(preferences); return existing; }
    const win = root.ownerDocument.defaultView;
    const queries = typeof win.matchMedia === 'function' ? {
      appearance: win.matchMedia('(prefers-color-scheme: dark)'),
      contrast: win.matchMedia('(prefers-contrast: more)'),
      forcedColors: win.matchMedia('(forced-colors: active)'),
    } : {};
    const environment = () => ({ appearance: queries.appearance?.matches ? 'dark' : 'light',
      contrast: queries.contrast?.matches ? 'more' : 'standard', forcedColors: queries.forcedColors?.matches === true });
    let selected = {
      appearance: root.getAttribute('data-rds-theme') ?? data.policy.appearance.default,
      contrast: root.getAttribute('data-rds-contrast') ?? data.policy.contrast.default,
      ...preferences,
    };
    selected = Object.freeze({ appearance: selected.appearance ?? data.policy.appearance.default,
      contrast: selected.contrast ?? data.policy.contrast.default });
    let current = resolveColorContext(selected, environment()), disposed = false;
    const listeners = new Set(), removers = [];
    const ensureActive = () => { if (disposed) throw new Error('This color preference controller has been disposed.'); };
    const refresh = () => {
      const next = resolveColorContext(selected, environment());
      if (next.appearance === current.appearance && next.contrast === current.contrast) return;
      current = next;
      for (const listener of listeners) listener(current);
    };
    const writeAttributes = () => {
      root.setAttribute('data-rds-theme', selected.appearance);
      root.setAttribute('data-rds-contrast', selected.contrast);
    };
    const controller = Object.freeze({
      getContext: () => current,
      getPreferences: () => selected,
      setPreferences(patch) {
        ensureActive();
        validatePreferences(patch);
        const next = { appearance: patch.appearance ?? selected.appearance, contrast: patch.contrast ?? selected.contrast };
        resolveColorContext(next, environment());
        selected = Object.freeze(next);
        writeAttributes();
        refresh();
      },
      subscribe(listener) {
        ensureActive();
        if (typeof listener !== 'function') throw new TypeError('A color-context listener must be a function.');
        listeners.add(listener);
        listener(current);
        return () => listeners.delete(listener);
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        for (const remove of removers) remove();
        listeners.clear();
        controllers.delete(root);
      },
    });
    writeAttributes();
    for (const query of Object.values(queries)) {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', refresh);
        removers.push(() => query.removeEventListener('change', refresh));
      } else if (typeof query.addListener === 'function') {
        query.addListener(refresh);
        removers.push(() => query.removeListener(refresh));
      }
    }
    controllers.set(root, controller);
    return controller;
  };
  return { resolveColorContext, resolveColor, applyColorPreferences };
}

const resolver = createColorResolver(data, selectContext);

export const resolveColorContext = resolver.resolveColorContext;

export const resolveColor = resolver.resolveColor;

export const applyColorPreferences = resolver.applyColorPreferences;

