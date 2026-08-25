/**
 * Local Figma variables read from concrete Ui Kit nodes (get_variable_defs).
 * There is no attached Figma library on this file. Values are observed, not promoted.
 */
export const QIPPO_OBSERVED_TOKENS = {
  color: {
    'Primary/Primary': '#3b8dd4',
    'Primary/Dark-600': '#2771b2',
    'Primary/Dark-800': '#173855',
    'Neutral/White': '#ffffff',
    'Neutral/Black': '#0c0c0c',
    'Neutral/50': '#f1f1f1',
    'Neutral/200': '#cbcbcb',
    'Neutral/400': '#979797',
    'Neutral/Neutral': '#7d7d7d',
    'Neutral/600': '#646464',
    'Low Opacity/Nautral-50': '#8c91971f',
    'Low Opacity/white-8%': '#ffffff14',
    'Low Opacity/Black-14': '#66666624',
  },
  radius: {
    '--radius-xs': 4,
    '--radius-sm': 8,
    '--radius-md': 12,
    '--radius-xl': 24,
    '--radius-i-xs': 4,
  },
  padding: {
    '--padding-none': 0,
    '--padding-6xs': 4,
    '--padding-5xs': 8,
    '--padding-4xs': 12,
  },
  typefaces: ['Yekan Bakh FaNum', 'Yekan Bakh FaNum VF', 'Estedad-VF'] as const,
  typeStyles: {
    'Caption/Caption - sm': { family: 'Yekan Bakh FaNum', size: 10, weight: 400, lineHeight: 1.8 },
    'Caption/Caption - md': { family: 'Yekan Bakh FaNum VF', size: 12, weight: 400, lineHeight: 1.8 },
    'Heading/H6': { family: 'Yekan Bakh FaNum', size: 16, weight: 700, lineHeight: 1.4 },
    'UI Type/text-sm/[R]': { family: 'Estedad-VF', size: 14, weight: 400, lineHeight: 24 },
    'UI Type/text-xs/[R]': { family: 'Estedad-VF', size: 12, weight: 400, lineHeight: 16 },
    'UI Type/text-2xs/[R]': { family: 'Estedad-VF', size: 10, weight: 400, lineHeight: 16 },
  },
  notes: [
    'No dedicated Typography / Color / Spacing / Shadow page on Ui Kit.',
    'Tokens live as local variables on component nodes, not an attached library.',
    'Typeface is inconsistent across components (Yekan Bakh vs Estedad-VF) — Needs Review.',
    'Qipper extracted primary is #4179f0; Qippo Primary/Primary is #3b8dd4 and Dark-600 is #2771b2.',
  ],
} as const;
