import contextPolicy from './canonical/master-tokens/context-policy.json' with { type: 'json' };
import { BUTTON_FOCUS, CONTROL_SIZE, DENSITY, FOCUS, ICON_SIZE, ICON_STROKE, LAYER, SPACE_ROLE, SPACING, TOUCH_MIN } from './metrics.ts';
import { FONT_FILES, FONT_WEIGHT, TYPE_ROLES } from './type.ts';

/** Recipes only alias reusable semantic colors; no color calculations. */
function buttonRecipe() {
  const roles: Record<string, string> = {
    "solid-neutral-bg": "action.neutral.bg.default",
    "solid-neutral-bg-hover": "action.neutral.bg.hover",
    "solid-neutral-bg-pressed": "action.neutral.bg.pressed",
    "solid-neutral-fg": "ink.inverse",
    "solid-brand-bg": "action.brand.bg.default",
    "solid-brand-bg-hover": "action.brand.bg.hover",
    "solid-brand-bg-pressed": "action.brand.bg.pressed",
    "solid-brand-fg": "action.brand.fg",
    "solid-brand-bg-disabled": "action.brand.bg.disabled",
    "solid-danger-bg": "action.danger.bg.default",
    "solid-danger-bg-hover": "action.danger.bg.hover",
    "solid-danger-bg-pressed": "action.danger.bg.pressed",
    "solid-danger-fg": "status.error.on-fill",
    "soft-neutral-bg": "surface.subtle",
    "soft-neutral-bg-hover": "interaction.neutral.hover",
    "soft-neutral-bg-pressed": "interaction.neutral.pressed",
    "soft-neutral-fg": "ink.primary",
    "soft-brand-bg": "brand.bg.default",
    "soft-brand-bg-hover": "brand.bg.hover",
    "soft-brand-bg-pressed": "brand.bg.pressed",
    "soft-brand-fg": "brand.fg",
    "soft-danger-bg": "action.danger-subtle.bg.default",
    "soft-danger-bg-hover": "action.danger-subtle.bg.hover",
    "soft-danger-bg-pressed": "action.danger-subtle.bg.pressed",
    "soft-danger-fg": "action.danger-subtle.fg.default",
    "soft-danger-fg-hover": "action.danger-subtle.fg.hover",
    "soft-danger-fg-pressed": "action.danger-subtle.fg.pressed",
    "bg-disabled": "surface.subtle",
    "fg-disabled": "ink.disabled",
    "selected-neutral-bg": "interaction.surface.selected",
    "selected-neutral-bg-hover": "brand.bg.hover",
    "selected-neutral-bg-pressed": "brand.bg.pressed",
    "selected-neutral-fg": "brand.fg",
    "selected-brand-bg": "interaction.surface.selected",
    "selected-brand-bg-hover": "brand.bg.hover",
    "selected-brand-bg-pressed": "brand.bg.pressed",
    "selected-brand-fg": "brand.fg",
    "selected-danger-bg": "action.danger-subtle.bg.default",
    "selected-danger-bg-hover": "action.danger-subtle.bg.hover",
    "selected-danger-bg-pressed": "action.danger-subtle.bg.pressed",
    "selected-danger-fg": "action.danger-subtle.fg.default"
  };
  return Object.entries(roles).map(([name, role]) =>
    `  --rds-button-${name}: var(--rds-color-${role.replaceAll('.', '-')});`);
}


function compatibilityAliases() {
  const pairs: Array<[string, string]> = [
    ['font-family-mono', 'font-family-code'],
    ['motion-duration-control', 'motion-duration-feedback'], ['motion-duration-panel', 'motion-duration-overlay'],
    ['motion-duration-route', 'motion-duration-dissolve'], ['motion-easing-gentle', 'motion-easing-enter'],
    ['color-bg-canvas', 'color-surface-canvas'], ['color-bg-surface', 'color-surface-base'],
    ['color-bg-surface-subtle', 'color-surface-subtle'], ['color-bg-surface-raised', 'color-surface-raised'],
    ['color-bg-surface-sunken', 'color-surface-sunken'], ['color-bg-scrim', 'color-scrim-modal'],
    ['color-fg-primary', 'color-ink-primary'], ['color-fg-secondary', 'color-ink-secondary'],
    ['color-fg-tertiary', 'color-ink-tertiary'], ['color-fg-disabled', 'color-ink-disabled'],
    ['color-fg-on-brand', 'color-ink-on-brand'], ['color-fg-inverse', 'color-ink-inverse'],
    ['color-border-subtle', 'color-edge-subtle'], ['color-border-default', 'color-edge-control'],
    ['color-border-strong', 'color-edge-control'], ['color-border-disabled', 'color-ink-disabled'],
    ['color-border-focus', 'color-focus-ring'], ['color-edge-default', 'color-edge-control'],
    ['color-edge-strong', 'color-edge-control'], ['color-edge-disabled', 'color-ink-disabled'],
    ['color-edge-functional', 'color-edge-control'], ['color-edge-focus', 'color-focus-ring'],
    ['color-brand-surface', 'color-brand-bg-default'], ['color-brand-surface-hover', 'color-brand-bg-hover'],
    ['color-brand-foreground', 'color-brand-fg'], ['color-ink-quiet', 'color-ink-tertiary'],
    ['color-interaction-selected-bg', 'color-interaction-surface-selected'],
    ['color-interaction-selected-fg', 'color-brand-fg'],
    ['color-interaction-selected-emphasis-bg', 'color-interaction-surface-selected'],
    ['color-interaction-selected-emphasis-fg', 'color-brand-fg'],
    ['radius-none', 'radius-0'], ['radius-small', 'radius-4'], ['radius-control', 'radius-8'],
    ['radius-group', 'radius-12'], ['radius-panel', 'radius-16'], ['radius-dialog', 'radius-24'], ['radius-sheet', 'radius-24'],
    ['focus-width', 'focus-ring-width'], ['edge-width-thin', 'border-width-default'],
    ['layout-reading', 'type-layout-measure-reading'], ['layout-reading-wide', 'type-layout-measure-reading'],
    ['layout-web', 'layout-content-max'], ['layout-dashboard', 'layout-content-max'],
    ['lift-rest', 'shadow-sm'], ['lift-float', 'shadow-md'], ['lift-raise', 'shadow-md'], ['lift-modal', 'shadow-lg'],
  ];
  for (const key of ['primary', 'secondary', 'tertiary', 'disabled', 'on-brand']) pairs.push(['color-icon-' + key, 'color-ink-' + key]);
  for (const name of ['success', 'warning', 'error', 'info']) {
    for (const [old, next] of [['surface', 'bg'], ['border', 'edge'], ['foreground', 'fg'], ['solid', 'fill'], ['on-solid', 'on-fill']]) {
      pairs.push(['color-status-' + name + '-' + old, 'color-status-' + name + '-' + next]);
    }
  }
  for (const [old, next] of [['default','bg-default'],['hover','bg-hover'],['pressed','bg-pressed'],['disabled','bg-disabled'],['foreground','fg']]) pairs.push(['color-action-primary-' + old, 'color-action-brand-' + next]);
  for (const [name, level] of Object.entries({ trace: '100', air: '200', core: '300', shelter: '400', opaque: '500' })) {
    pairs.push(['color-veil-' + name + '-fill', 'veil-' + level + '-color'], ['veil-' + name + '-blur', 'veil-' + level + '-blur']);
  }
  return pairs.map(([old, next]) => '  --rds-' + old + ': var(--rds-' + next + ');').join('\n');
}

function staticTokens() {
  const lines: string[] = [];
  const set = (name: string, value: string | number) => lines.push('  ' + name + ': ' + value + ';');
  set('--rds-font-weight-emphasis', FONT_WEIGHT.emphasis);
  set('--rds-font-weight-structure', FONT_WEIGHT.structure);
  set('--rds-font-weight-control', FONT_WEIGHT.control);
  for (const role of TYPE_ROLES) set('--rds-type-' + role.id + '-font-family', role.id === 'code' ? 'var(--rds-font-family-code)' : 'var(--rds-font-family-content, var(--rds-font-family-fa))');
  // Compatibility recipe names are aliases of the approved shared spacing scale.
  for (const [key, value] of Object.entries(SPACE_ROLE)) {
    const index = Object.entries(SPACING).find(([, size]) => size === value)?.[0];
    if (index) set('--rds-space-' + key, 'var(--rds-space-' + index + ')');
  }
  for (const [size, spec] of Object.entries(CONTROL_SIZE)) {
    set('--rds-size-control-' + size + '-min-height', spec.minHeight);
    set('--rds-size-control-' + size + '-padding-inline', spec.paddingInline);
    set('--rds-size-control-' + size + '-padding-block', spec.paddingBlock);
    set('--rds-size-control-' + size + '-label', spec.label);
    set('--rds-size-icon-' + size, spec.icon);
  }
  set('--rds-size-icon-display', ICON_SIZE.display);
  set('--rds-focus-offset', FOCUS.offset);
  set('--rds-button-focus-width', BUTTON_FOCUS.width);
  set('--rds-button-focus-gap', BUTTON_FOCUS.gap);
  set('--rds-button-focus-core', BUTTON_FOCUS.core);
  set('--rds-size-touch-min', TOUCH_MIN);
  set('--rds-icon-stroke', ICON_STROKE);
  for (const [key, value] of Object.entries(LAYER)) set('--rds-layer-' + key, value);
  set('--rds-lift-none', 'none');
  return lines.join('\n');
}

export function renderFoundationsCss(canonicalCss = '', modes: Record<'light' | 'dark', string> = { light: '', dark: '' }) {
  const aliases = compatibilityAliases();
  const shared = staticTokens();
  const recipes = buttonRecipe().join('\n');
  const stage = (appearance: 'light' | 'dark', more = false) => {
    const high = more ? Object.entries(contextPolicy.contrast.enhancedOverrides[appearance]).map(([name, alias]) =>
      '  --' + name.replaceAll('.', '-') + ': var(--' + alias.slice(1, -1).replaceAll('.', '-') + ');').join('\n') : '';
    return [modes[appearance], high, shared, aliases, recipes].filter(Boolean).join('\n');
  };
  const rule = (selector: string, content: string) => selector + ' {\n' + content + '\n}';
  return [
    '/* Generated from the adopted master plus component compatibility recipes. Do not edit. */',
    canonicalCss,
    canonicalCss.match(/@media \(forced-colors: active\) \{[\s\S]*?\n\}\n\}/)?.[0].replace(':root', '.rds-stage') ?? '',
    'html { font-size: 100%; }',
    rule(':root', shared + '\n' + aliases + '\n' + recipes),
    rule('.rds-stage[data-appearance="light"], .rds-stage[data-rds-theme="light"]', stage('light')),
    rule('.rds-stage[data-appearance="dark"], .rds-stage[data-rds-theme="dark"]', stage('dark')),
    rule('.rds-stage[data-appearance="light"][data-contrast="more"]', stage('light', true)),
    rule('.rds-stage[data-appearance="dark"][data-contrast="more"]', stage('dark', true)),
    ...Object.entries(DENSITY).map(([name, spec]) => rule(':root[data-density="' + name + '"], .rds-stage[data-density="' + name + '"]',
      Object.entries(spec).map(([key, value]) => '  --rds-density-' + key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase()) + ': ' + value + ';').join('\n'))),
    ':root { --rds-density-padding: ' + DENSITY.regular.padding + '; --rds-density-group-gap: ' + DENSITY.regular.groupGap + '; --rds-density-row-min: ' + DENSITY.regular.rowMin + '; --rds-density-cell-block: ' + DENSITY.regular.cellBlock + '; --rds-density-action-gap: ' + DENSITY.regular.actionGap + '; --rds-layout-page-gutter: var(--rds-layout-grid-narrow-margin); }',
    '@media (min-width: 48rem) { :root { --rds-layout-page-gutter: var(--rds-layout-grid-medium-margin); } }',
    '@media (min-width: 64rem) { :root { --rds-layout-page-gutter: var(--rds-layout-grid-wide-margin); } }',
    '.rds-focus:focus-visible { outline: var(--rds-focus-ring-width) solid var(--rds-color-focus-ring); outline-offset: var(--rds-focus-offset); }',
    '.rds-scroll { scrollbar-width: auto; scrollbar-color: var(--rds-color-ink-tertiary) transparent; }',
    '.rds-scroll:hover { scrollbar-color: var(--rds-color-ink-secondary) transparent; }',
    '.rds-scroll-thin { scrollbar-width: thin; }',
    '.rds-presentation, .rds-presentation-strong { background-color: var(--rds-color-surface-canvas); }',
    '@media (prefers-reduced-motion: reduce) { .rds-motion { animation: none; transition: none; } }',
    '@media (forced-colors: active) { .rds-stage { color: CanvasText; background: Canvas; } .rds-focus:focus-visible { outline-color: Highlight; } }',
    '',
  ].join('\n\n').trimEnd() + '\n';
}

/** Asset registration is separate from generated font selection and typography. */
export function renderFontsCss() {
  return '/* Generated font asset registration. Redistribution license: unknown. */\n' + FONT_FILES.map(file =>
    '@font-face {\n  font-family: "' + file.family + '";\n  src: url("./fonts/' + file.file + '") format("woff2");\n  font-weight: ' + file.weight + ';\n  font-style: normal;\n  font-display: swap;\n}\n'
  ).join('\n');
}
