import { FOUNDATION_MANIFEST } from './manifest.ts';
import {
  ACTION_PRIMARY_BG,
  ACTION_PRIMARY_FG,
  BRAND,
  DATA_CATEGORICAL,
  DATA_DIVERGING,
  DATA_ON_FILL,
  DATA_SEQUENTIAL,
  EDGE,
  FOCUS_RING,
  HIGH_CONTRAST,
  INK,
  INTERACTION,
  PRESENTATION_GRADIENTS,
  SCRIM,
  STATUS,
  SURFACE,
  type AppearanceName,
} from './color.ts';
import {
  CONTROL_SIZE,
  DENSITY,
  EDGE_WIDTH,
  FOCUS,
  ICON_SIZE,
  LAYER,
  LAYOUT,
  MOTION_DURATION,
  MOTION_EASING,
  PRESENTATION_MOTION,
  RADIUS,
  SPACE_REF,
  SPACE_ROLE,
  VEIL_EDGE,
  VEIL_TIER,
  liftShadow,
} from './metrics.ts';
import { FONT_FAMILY, FONT_WEIGHT, TYPE_ROLES } from './type.ts';

function hexChannels(hex: string) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function filmColor(base: string, alpha: number) {
  if (base.startsWith('rgb')) return base;
  const [r, g, b] = hexChannels(base);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

function modeColors(appearance: AppearanceName, contrast: 'standard' | 'more') {
  const lines: string[] = [];
  const set = (name: string, value: string) => lines.push(`  ${name}: ${value};`);
  const hc = contrast === 'more' ? HIGH_CONTRAST[appearance] : null;
  const surface = {
    ...SURFACE,
    canvas: { ...SURFACE.canvas, [appearance]: hc?.canvas ?? SURFACE.canvas[appearance] },
    base: { ...SURFACE.base, [appearance]: hc?.base ?? SURFACE.base[appearance] },
  };
  const ink = {
    ...INK,
    primary: { ...INK.primary, [appearance]: hc?.primary ?? INK.primary[appearance] },
    secondary: { ...INK.secondary, [appearance]: hc?.secondary ?? INK.secondary[appearance] },
    tertiary: { ...INK.tertiary, [appearance]: hc?.tertiary ?? INK.tertiary[appearance] },
  };

  for (const [key, value] of Object.entries(surface)) set(`--rds-color-surface-${key}`, value[appearance]);
  set('--rds-color-scrim-modal', SCRIM.modal[appearance]);
  for (const [key, value] of Object.entries(ink)) set(`--rds-color-ink-${key}`, value[appearance]);
  set('--rds-color-ink-quiet', ink.tertiary[appearance]);
  for (const key of ['primary', 'secondary', 'tertiary', 'disabled', 'on-brand'] as const) {
    set(`--rds-color-icon-${key}`, key === 'on-brand' ? ink['on-brand'][appearance] : ink[key][appearance]);
  }
  for (const [key, value] of Object.entries(BRAND)) set(`--rds-color-brand-${key}`, value[appearance]);
  for (const [key, value] of Object.entries(ACTION_PRIMARY_BG)) set(`--rds-color-action-primary-bg-${key}`, value[appearance]);
  set('--rds-color-action-primary-fg', ACTION_PRIMARY_FG[appearance]);
  set('--rds-color-focus-ring', FOCUS_RING[appearance]);
  set('--rds-color-link-fg', BRAND.fg[appearance]);
  set('--rds-color-interaction-neutral-hover', INTERACTION['neutral-hover'][appearance]);
  set('--rds-color-interaction-neutral-pressed', INTERACTION['neutral-pressed'][appearance]);
  set('--rds-color-interaction-selected-bg', appearance === 'light' ? SURFACE.sunken.light : SURFACE.raised.dark);
  set('--rds-color-interaction-selected-fg', ink.primary[appearance]);
  set('--rds-color-interaction-selected-emphasis-bg', BRAND.bg[appearance]);
  set('--rds-color-interaction-selected-emphasis-fg', BRAND.fg[appearance]);
  for (const [key, value] of Object.entries(EDGE)) set(`--rds-color-edge-${key}`, value[appearance]);
  set('--rds-color-edge-functional', ink.tertiary[appearance]);
  set('--rds-color-edge-focus', FOCUS_RING[appearance]);
  for (const [name, roles] of Object.entries(STATUS)) {
    for (const [role, value] of Object.entries(roles)) set(`--rds-color-status-${name}-${role}`, value[appearance]);
  }
  set('--rds-color-veil-film', SURFACE.base[appearance]);
  for (const [tier, spec] of Object.entries(VEIL_TIER)) {
    set(`--rds-veil-${tier}-film-alpha`, String(spec.alpha));
    set(`--rds-veil-${tier}-blur`, spec.blur);
    set(`--rds-veil-${tier}-saturation`, String(spec.saturation));
    set(`--rds-color-veil-${tier}-fill`, filmColor(SURFACE.base[appearance], spec.alpha));
  }
  set('--rds-veil-edge', VEIL_EDGE[appearance]);
  set('--rds-lift-rest', liftShadow('rest', appearance));
  set('--rds-lift-float', liftShadow('float', appearance));
  set('--rds-lift-raise', liftShadow('raise', appearance));
  set('--rds-lift-modal', liftShadow('modal', appearance));
  DATA_CATEGORICAL.forEach((value, index) => set(`--rds-data-categorical-${String(index + 1).padStart(2, '0')}`, value[appearance]));
  DATA_SEQUENTIAL.forEach((value, index) => set(`--rds-data-sequential-${String(index + 1).padStart(2, '0')}`, value[appearance]));
  DATA_DIVERGING.forEach((value, index) => set(`--rds-data-diverging-${String(index + 1).padStart(2, '0')}`, value[appearance]));
  set('--rds-data-on-fill', DATA_ON_FILL[appearance]);

  const alias: Array<[string, string]> = [
    ['--rds-color-bg-canvas', '--rds-color-surface-canvas'],
    ['--rds-color-bg-surface', '--rds-color-surface-base'],
    ['--rds-color-bg-surface-subtle', '--rds-color-surface-subtle'],
    ['--rds-color-bg-surface-raised', '--rds-color-surface-raised'],
    ['--rds-color-bg-surface-sunken', '--rds-color-surface-sunken'],
    ['--rds-color-bg-scrim', '--rds-color-scrim-modal'],
    ['--rds-color-fg-primary', '--rds-color-ink-primary'],
    ['--rds-color-fg-secondary', '--rds-color-ink-secondary'],
    ['--rds-color-fg-tertiary', '--rds-color-ink-tertiary'],
    ['--rds-color-fg-disabled', '--rds-color-ink-disabled'],
    ['--rds-color-fg-on-brand', '--rds-color-ink-on-brand'],
    ['--rds-color-fg-inverse', '--rds-color-ink-inverse'],
    ['--rds-color-border-subtle', '--rds-color-edge-subtle'],
    ['--rds-color-border-default', '--rds-color-edge-default'],
    ['--rds-color-border-strong', '--rds-color-edge-strong'],
    ['--rds-color-border-disabled', '--rds-color-edge-disabled'],
    ['--rds-color-border-focus', '--rds-color-focus-ring'],
    ['--rds-color-brand-surface', '--rds-color-brand-bg'],
    ['--rds-color-brand-surface-hover', '--rds-color-brand-bg-hover'],
    ['--rds-color-brand-foreground', '--rds-color-brand-fg'],
    ['--rds-color-action-primary-default', '--rds-color-action-primary-bg-default'],
    ['--rds-color-action-primary-hover', '--rds-color-action-primary-bg-hover'],
    ['--rds-color-action-primary-pressed', '--rds-color-action-primary-bg-pressed'],
    ['--rds-color-action-primary-disabled', '--rds-color-action-primary-bg-disabled'],
    ['--rds-color-action-primary-foreground', '--rds-color-action-primary-fg'],
    ['--rds-color-interaction-selected-surface', '--rds-color-interaction-selected-bg'],
  ];
  for (const name of ['success', 'warning', 'error', 'info']) {
    alias.push(
      [`--rds-color-status-${name}-surface`, `--rds-color-status-${name}-bg`],
      [`--rds-color-status-${name}-border`, `--rds-color-status-${name}-edge`],
      [`--rds-color-status-${name}-foreground`, `--rds-color-status-${name}-fg`],
      [`--rds-color-status-${name}-solid`, `--rds-color-status-${name}-fill`],
      [`--rds-color-status-${name}-on-solid`, `--rds-color-status-${name}-on-fill`],
    );
  }
  for (const [oldName, next] of alias) set(oldName, `var(${next})`);
  return lines.join('\n');
}

function staticTokens() {
  const lines: string[] = [];
  const set = (name: string, value: string | number) => lines.push(`  ${name}: ${value};`);
  set('--rds-font-family-fa', FONT_FAMILY.fa);
  set('--rds-font-family-latin', FONT_FAMILY.latin);
  set('--rds-font-family-mono', FONT_FAMILY.mono);
  set('--rds-font-weight-emphasis', FONT_WEIGHT.emphasis);
  set('--rds-font-weight-structure', FONT_WEIGHT.structure);
  set('--rds-font-weight-control', FONT_WEIGHT.control);
  for (const role of TYPE_ROLES) {
    const id = role.id;
    set(`--rds-type-${id}-font-family`, role.family);
    set(`--rds-type-${id}-font-size`, role.size);
    set(`--rds-type-${id}-font-weight`, role.weight);
    set(`--rds-type-${id}-line-height`, role.lineHeight);
    set(`--rds-type-${id}-letter-spacing`, role.letterSpacing);
  }
  for (const [key, value] of Object.entries(SPACE_REF)) set(`--ref-space-${key}`, value);
  for (const [key, value] of Object.entries(SPACE_ROLE)) set(`--rds-space-${key}`, value);
  for (const [size, spec] of Object.entries(CONTROL_SIZE)) {
    set(`--rds-size-control-${size}-min-height`, spec.minHeight);
    set(`--rds-size-control-${size}-padding-inline`, spec.paddingInline);
    set(`--rds-size-control-${size}-padding-block`, spec.paddingBlock);
    set(`--rds-size-icon-${size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'}`, spec.icon);
  }
  set('--rds-size-icon-display', ICON_SIZE.display);
  for (const [key, value] of Object.entries(RADIUS)) set(`--rds-radius-${key}`, value);
  set('--rds-focus-width', FOCUS.width);
  set('--rds-focus-offset', FOCUS.offset);
  set('--rds-edge-width-thin', EDGE_WIDTH.thin);
  set('--rds-layout-reading', LAYOUT.reading);
  set('--rds-layout-reading-wide', LAYOUT.readingWide);
  set('--rds-layout-web', LAYOUT.web);
  set('--rds-layout-dashboard', LAYOUT.dashboard);
  set('--rds-layout-page-gutter', LAYOUT.pageGutter);
  for (const [key, value] of Object.entries(LAYER)) set(`--rds-layer-${key}`, value);
  for (const [key, value] of Object.entries(MOTION_DURATION)) set(`--rds-motion-duration-${key}`, value);
  for (const [key, value] of Object.entries(MOTION_EASING)) set(`--rds-motion-easing-${key}`, value);
  set('--rds-presentation-motion-base', PRESENTATION_MOTION.base);
  for (const [key, value] of Object.entries(PRESENTATION_GRADIENTS)) set(`--rds-presentation-gradient-${key}`, value);
  set('--rds-lift-none', 'none');
  const regular = DENSITY.regular;
  set('--rds-density-padding', regular.padding);
  set('--rds-density-group-gap', regular.groupGap);
  set('--rds-density-row-min', regular.rowMin);
  set('--rds-density-cell-block', regular.cellBlock);
  set('--rds-density-action-gap', regular.actionGap);
  return lines.join('\n');
}

function densityBlocks() {
  return (Object.entries(DENSITY) as Array<[keyof typeof DENSITY, (typeof DENSITY)['regular']]>)
    .map(([name, spec]) => `:root[data-density='${name}'],
.rds-stage[data-density='${name}'] {
  --rds-density-padding: ${spec.padding};
  --rds-density-group-gap: ${spec.groupGap};
  --rds-density-row-min: ${spec.rowMin};
  --rds-density-cell-block: ${spec.cellBlock};
  --rds-density-action-gap: ${spec.actionGap};
}`)
    .join('\n\n');
}

export function renderFoundationsCss() {
  return `/* Generated from the foundations contract ${FOUNDATION_MANIFEST.documentVersion}. Source: src/foundations. Do not edit by hand. */
html {
  font-size: 100%;
}

:root {
${staticTokens()}
${modeColors('light', 'standard')}
}

:root.dark {
${modeColors('dark', 'standard')}
}

.rds-stage[data-appearance='light'] {
${modeColors('light', 'standard')}
}

.rds-stage[data-appearance='dark'] {
${modeColors('dark', 'standard')}
}

:root[data-contrast='more']:not(.dark),
.rds-stage[data-appearance='light'][data-contrast='more'] {
${modeColors('light', 'more')}
}

:root.dark[data-contrast='more'],
.rds-stage[data-appearance='dark'][data-contrast='more'] {
${modeColors('dark', 'more')}
}

@media (prefers-contrast: more) {
  :root:not(.dark):not([data-contrast='standard']) {
${modeColors('light', 'more')}
  }
  :root.dark:not([data-contrast='standard']) {
${modeColors('dark', 'more')}
  }
}

${densityBlocks()}

.rds-focus:focus-visible {
  outline: var(--rds-focus-width) solid var(--rds-color-focus-ring);
  outline-offset: var(--rds-focus-offset);
}

.rds-scroll {
  scrollbar-width: auto;
  scrollbar-color: var(--rds-color-ink-tertiary) transparent;
}

.rds-scroll:hover {
  scrollbar-color: var(--rds-color-ink-secondary) transparent;
}

.rds-scroll-thin {
  scrollbar-width: thin;
}

.rds-presentation {
  background-color: var(--rds-color-surface-canvas);
  background-image: var(--rds-presentation-gradient-atmosphere);
}

.rds-presentation-strong {
  background-color: var(--rds-color-surface-canvas);
  background-image: var(--rds-presentation-gradient-brand-dark);
  color: #eeeef0;
}

:root:not(.dark) .rds-presentation-strong,
.rds-stage[data-appearance='light'] .rds-presentation-strong {
  background-image: var(--rds-presentation-gradient-brand-light);
  color: #211d20;
}

:is(
  :root[data-contrast='more'],
  .rds-stage[data-contrast='more'],
  .rds-stage[data-reduce-transparency='on']
) :is(.rds-presentation, .rds-presentation-strong) {
  background-image: none;
}

@media (prefers-contrast: more) {
  :root:not([data-contrast='standard']) :is(.rds-presentation, .rds-presentation-strong) {
    background-image: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  :root:not([data-reduce-transparency='off']) :is(.rds-presentation, .rds-presentation-strong) {
    background-image: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rds-motion {
    animation: none;
    transition: none;
  }
}
`;
}
