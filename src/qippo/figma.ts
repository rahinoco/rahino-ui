/** Qippo Figma file inspected for the Comparison Lab. Not a production source. */

export const QIPPO_FIGMA = {
  team: 'Rahino',
  project: 'qippo.app',
  fileName: 'qippo app',
  fileKey: 'X3QxAzFoH4KzwUDY1FggbE',
  pageName: 'Ui Kit',
  pageNodeId: '1:3',
  inspectedAt: '2026-08-25',
} as const;

export function qippoFigmaUrl(nodeId: string) {
  return `https://www.figma.com/design/${QIPPO_FIGMA.fileKey}/qippo-app?node-id=${nodeId.replace(':', '-')}&m=dev`;
}

export const QIPPO_KIT_SECTIONS = [
  { id: '2009:10320', name: 'Header-Component' },
  { id: '2229:6259', name: 'Button-Component' },
  { id: '2073:4138', name: 'Card-Component' },
  { id: '2023:3412', name: 'Other-Component' },
  { id: '2024:6267', name: 'Magicoon - regular' },
  { id: '2024:10873', name: 'Magicoon - filled' },
  { id: '2024:15446', name: 'Other Icons' },
  { id: '2047:933', name: 'Tab' },
  { id: '3121:40868', name: 'Useless Assets', nonCanonical: true },
  { id: '3121:44466', name: 'Not Categorised -> make the components', ambiguous: true },
  { id: '3121:44468', name: 'Prototyping components', nonCanonical: true },
  { id: '3189:45067', name: 'Module Components' },
  { id: '3663:19593', name: 'Login' },
] as const;
