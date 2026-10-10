export type DecisionStatus = 'pending' | 'approved';

export type DecisionOutcome =
  | 'adopt-qipper'
  | 'adopt-qippo'
  | 'merge'
  | 'modify-both'
  | 'new-rahino'
  | 'undecided';

export interface DesignDecision {
  id: string;
  componentId: string;
  componentName: string;
  status: DecisionStatus;
  outcome: DecisionOutcome;
  sources: {
    qipper?: string;
    qippo?: string;
  };
  behaviorSource?: string;
  apiDecision?: string;
  visualDirection?: string;
  states?: string;
  accessibility?: string;
  productDifferences?: string;
  rationale?: string;
  decidedAt?: string;
  decidedBy?: string;
}

/**
 * Still pending. Qippo paths are Figma node references + live code paths, not chosen winners.
 */
export const DECISIONS: DesignDecision[] = [
  {
    id: 'button',
    componentId: 'button',
    componentName: 'Button',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Button.tsx → src/components/Button.tsx',
      qippo: '2230:6522 → archived 2026-10-10 from rahino-ui/src/qippo/Button.tsx',
    },
    productDifferences:
      'Qippo: Primary/Secondary/Stroke/Ghost/Text Only, Sm32/Md40/Lg48, curved|square, icon as variant, named hover/selected. No Danger, no loading. Pill radius-xl 24. Qipper: primary/secondary/ghost/danger, icons as children, CSS hover, frequent !h-12.',
  },
  {
    id: 'input',
    componentId: 'input',
    componentName: 'Input',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Input.tsx → src/components/Input.tsx',
      qippo: '7130:57816 → rahino-ui/src/qippo/Input.tsx (live)',
    },
    productDifferences:
      'Qippo soft-filled field, optional floating label, size sm/md/lg/xl, Eror caption. Qipper borderless h-11 with FieldLabel above.',
  },
  {
    id: 'select',
    componentId: 'select',
    componentName: 'Select',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Select.tsx → src/components/Select.tsx',
      qippo: '7347:24406 → rahino-ui/src/qippo/Select.tsx (live)',
    },
    productDifferences:
      'Qippo closed/open menu with checkmarks. Qipper searchable custom list by default.',
  },
  {
    id: 'checkbox',
    componentId: 'checkbox',
    componentName: 'Checkbox',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/Checkbox.tsx',
      qippo: '2896:22985 → rahino-ui/src/qippo/Checkbox.tsx (live)',
    },
    productDifferences: 'Qippo simple/Item/Item+Desc; Qipper bare control.',
  },
  {
    id: 'radio',
    componentId: 'radio',
    componentName: 'Radio',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/RadioGroup.tsx (segmented)',
      qippo: '2858:4242 → rahino-ui/src/qippo/Radio.tsx classic circle (live)',
    },
    productDifferences: 'Classic circle vs segmented RadioGroup/RadioPills — large API gap.',
  },
  {
    id: 'switch',
    componentId: 'switch',
    componentName: 'Switch',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qippo: '2014:3071 → rahino-ui/src/qippo/Switch.tsx (live, Qippo-only)',
    },
    productDifferences: 'Absent from Qipper shared UI.',
  },
  {
    id: 'tabs',
    componentId: 'tabs',
    componentName: 'Tabs',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/Tabs.tsx',
      qippo: '2035:4098 → qippo/Tabs.tsx; Segmented 7506:49134 → qippo/Segmented.tsx (live)',
    },
    productDifferences:
      'Qippo splits Tab vs Segmented. Qipper combines layouts plus RadioPills/SegmentedPills.',
  },
  {
    id: 'icon-button',
    componentId: 'icon-button',
    componentName: 'Icon Button',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'Button + !w-10 !px-0 (not a primitive)',
      qippo: '2039:3836 → archived 2026-10-10 from rahino-ui/src/qippo/IconButton.tsx',
    },
    productDifferences: 'Qippo dedicated 48/56 icon-button with badge. Qipper composes Button.',
  },
  {
    id: 'avatar',
    componentId: 'avatar',
    componentName: 'Avatar',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'PersianAvatar widget (not extracted)',
      qippo: '2066:1223 → rahino-ui/src/qippo/Avatar.tsx (live)',
    },
  },
  {
    id: 'card',
    componentId: 'card',
    componentName: 'Card',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/Card.tsx',
      qippo: '2325:1506 chrome → rahino-ui/src/qippo/Card.tsx fair-lab surface (live)',
    },
    productDifferences: 'Qippo kit is product modules; fair-lab surface only for comparison.',
  },
  {
    id: 'toast',
    componentId: 'toast',
    componentName: 'Snackbar',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'InlineNotice (floating banner)',
      qippo: '2302:1232 → rahino-ui/src/qippo/Snackbar.tsx (live)',
    },
  },
  {
    id: 'otp',
    componentId: 'otp',
    componentName: 'Login Code',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qippo: '2187:3585 → rahino-ui/src/qippo/Otp.tsx (live, Qippo-only)',
    },
  },
  {
    id: 'dialog',
    componentId: 'dialog',
    componentName: 'Dialog / Modal',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/Modal.tsx',
      qippo: 'Not found as named Modal/Dialog on Ui Kit — Qipper-only (do not invent)',
    },
  },
  {
    id: 'data-table',
    componentId: 'data-table',
    componentName: 'Data Table',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/DataTable/',
      qippo: 'Not found as named Table on Ui Kit — Qipper-only (do not invent)',
    },
  },
  {
    id: 'date-picker',
    componentId: 'date-picker',
    componentName: 'Date Picker',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/DatePicker.tsx',
      qippo: '7453:49460 (awaiting interactive reconstruction)',
    },
  },
  {
    id: 'badge',
    componentId: 'badge',
    componentName: 'Badge',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/components/Badge.tsx',
      qippo: 'Magicoon “Badge” overlays only — not a status Badge set',
    },
  },
  {
    id: 'color',
    componentId: 'color',
    componentName: 'Color',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/styles/tokens.css',
      qippo: 'Local variables: Primary/Primary #3b8dd4, Primary/Dark-600 #2771b2',
    },
    productDifferences: 'Qipper extracted primary #4179f0 vs Qippo #3b8dd4 / #2771b2.',
  },
  {
    id: 'typography',
    componentId: 'typography',
    componentName: 'Typography',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'IRANYekanX in Qipper app CSS',
      qippo: 'Yekan Bakh FaNum + Estedad-VF mixed in Ui Kit (Needs Review)',
    },
  },
];

export function getDecision(componentId: string) {
  return DECISIONS.find((d) => d.componentId === componentId);
}
