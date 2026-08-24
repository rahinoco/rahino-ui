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
 * Phase 1: every record is pending. Do not invent outcomes.
 * These records live with rahino-ui so decisions stay next to the implementation.
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
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'input',
    componentId: 'input',
    componentName: 'Input',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Input.tsx → src/components/Input.tsx',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'select',
    componentId: 'select',
    componentName: 'Select',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Select.tsx → src/components/Select.tsx',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'dialog',
    componentId: 'dialog',
    componentName: 'Dialog / Modal',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Modal.tsx → src/components/Modal.tsx',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'tabs',
    componentId: 'tabs',
    componentName: 'Tabs',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Tabs.tsx → src/components/Tabs.tsx',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'data-table',
    componentId: 'data-table',
    componentName: 'Data Table',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/QipperTable/ → src/components/DataTable/',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'date-picker',
    componentId: 'date-picker',
    componentName: 'Date Picker',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/DatePicker.tsx → src/components/DatePicker.tsx',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'badge',
    componentId: 'badge',
    componentName: 'Badge',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/shared/ui/Badge.tsx → src/components/Badge.tsx',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'color',
    componentId: 'color',
    componentName: 'Color',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'src/app/styles/tokens.css → src/styles/tokens.css',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
  {
    id: 'typography',
    componentId: 'typography',
    componentName: 'Typography',
    status: 'pending',
    outcome: 'undecided',
    sources: {
      qipper: 'IRANYekanX in Qipper app CSS',
      qippo: 'Awaiting Qippo Figma (MCP phase)',
    },
  },
];

export function getDecision(componentId: string) {
  return DECISIONS.find((d) => d.componentId === componentId);
}
