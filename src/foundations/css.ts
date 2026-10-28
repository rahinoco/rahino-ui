import { HIGH_CONTRAST, type AppearanceName } from './color.ts';
import { BUTTON_FOCUS, CONTROL_SIZE, DENSITY, FOCUS, ICON_SIZE, ICON_STROKE, LAYER, SPACE_ROLE, SPACING, TOUCH_MIN } from './metrics.ts';
import { FONT_FILES, FONT_WEIGHT, TYPE_ROLES } from './type.ts';

/** Aliases only. Missing hover/pressed roles are mixes of semantic tokens, not new hex. */
function buttonRecipe(_appearance: AppearanceName) {
  const mix = (base: string, amount: string, withColor: string) =>
    `color-mix(in srgb, var(${base}) ${amount}, var(${withColor}))`;
  const rows: Array<[string, string]> = [
    ['--rds-button-solid-neutral-bg', 'var(--rds-color-surface-inverse)'],
    ['--rds-button-solid-neutral-bg-hover', mix('--rds-color-surface-inverse', '86%', '--rds-color-ink-primary')],
    ['--rds-button-solid-neutral-bg-pressed', mix('--rds-color-surface-inverse', '72%', '--rds-color-ink-primary')],
    ['--rds-button-solid-neutral-fg', 'var(--rds-color-ink-inverse)'],
    ['--rds-button-solid-brand-bg', 'var(--rds-color-action-primary-bg-default)'],
    ['--rds-button-solid-brand-bg-hover', 'var(--rds-color-action-primary-bg-hover)'],
    ['--rds-button-solid-brand-bg-pressed', 'var(--rds-color-action-primary-bg-pressed)'],
    ['--rds-button-solid-brand-fg', 'var(--rds-color-action-primary-fg)'],
    ['--rds-button-solid-brand-bg-disabled', 'var(--rds-color-action-primary-bg-disabled)'],
    ['--rds-button-solid-danger-bg', 'var(--rds-color-status-error-fill)'],
    ['--rds-button-solid-danger-bg-hover', mix('--rds-color-status-error-fill', '82%', '--rds-color-ink-primary')],
    ['--rds-button-solid-danger-bg-pressed', mix('--rds-color-status-error-fill', '68%', '--rds-color-ink-primary')],
    ['--rds-button-solid-danger-fg', 'var(--rds-color-status-error-on-fill)'],
    ['--rds-button-soft-neutral-bg', 'var(--rds-color-surface-subtle)'],
    ['--rds-button-soft-neutral-bg-hover', mix('--rds-color-surface-subtle', '72%', '--rds-color-ink-primary')],
    ['--rds-button-soft-neutral-bg-pressed', mix('--rds-color-surface-subtle', '58%', '--rds-color-ink-primary')],
    ['--rds-button-soft-neutral-fg', 'var(--rds-color-ink-primary)'],
    ['--rds-button-soft-brand-bg', 'var(--rds-color-brand-bg-default)'],
    ['--rds-button-soft-brand-bg-hover', 'var(--rds-color-brand-bg-hover)'],
    ['--rds-button-soft-brand-bg-pressed', mix('--rds-color-brand-bg-hover', '72%', '--rds-color-brand-seed')],
    ['--rds-button-soft-brand-fg', 'var(--rds-color-brand-fg)'],
    ['--rds-button-soft-danger-bg', 'var(--rds-color-status-error-bg)'],
    ['--rds-button-soft-danger-bg-hover', mix('--rds-color-status-error-bg', '78%', '--rds-color-status-error-fill')],
    ['--rds-button-soft-danger-bg-pressed', mix('--rds-color-status-error-bg', '62%', '--rds-color-status-error-fill')],
    ['--rds-button-soft-danger-fg', 'var(--rds-color-status-error-fg)'],
    ['--rds-button-bg-disabled', 'var(--rds-color-surface-subtle)'],
    ['--rds-button-fg-disabled', 'var(--rds-color-ink-disabled)'],
    ['--rds-button-selected-neutral-bg', 'var(--rds-color-interaction-selected-bg)'],
    ['--rds-button-selected-neutral-bg-hover', mix('--rds-color-interaction-selected-bg', '82%', '--rds-color-ink-primary')],
    ['--rds-button-selected-neutral-bg-pressed', mix('--rds-color-interaction-selected-bg', '68%', '--rds-color-ink-primary')],
    ['--rds-button-selected-neutral-fg', 'var(--rds-color-interaction-selected-fg)'],
    ['--rds-button-selected-brand-bg', 'var(--rds-color-interaction-selected-emphasis-bg)'],
    ['--rds-button-selected-brand-bg-hover', 'var(--rds-color-brand-bg-hover)'],
    ['--rds-button-selected-brand-bg-pressed', mix('--rds-color-brand-bg-hover', '72%', '--rds-color-brand-seed')],
    ['--rds-button-selected-brand-fg', 'var(--rds-color-interaction-selected-emphasis-fg)'],
    ['--rds-button-selected-danger-bg', 'var(--rds-color-status-error-bg)'],
    ['--rds-button-selected-danger-bg-hover', mix('--rds-color-status-error-bg', '78%', '--rds-color-status-error-fill')],
    ['--rds-button-selected-danger-bg-pressed', mix('--rds-color-status-error-bg', '62%', '--rds-color-status-error-fill')],
    ['--rds-button-selected-danger-fg', 'var(--rds-color-status-error-fg)'],
    ['--rds-button-focus-soft', `color-mix(in srgb, var(--rds-color-focus-ring) ${BUTTON_FOCUS.soft}, transparent)`],
  ];
  return rows.map(([name, value]) => `  ${name}: ${value};`);
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
    ['lift-rest', 'shadow-sm'], ['lift-float', 'shadow-md'], ['lift-raise', 'shadow-lg'], ['lift-modal', 'shadow-lg'],
  ];
  for (const key of ['primary', 'secondary', 'tertiary', 'disabled', 'on-brand']) pairs.push(['color-icon-' + key, 'color-ink-' + key]);
  for (const name of ['success', 'warning', 'error', 'info']) {
    for (const [old, next] of [['surface', 'bg'], ['border', 'edge'], ['foreground', 'fg'], ['solid', 'fill'], ['on-solid', 'on-fill']]) {
      pairs.push(['color-status-' + name + '-' + old, 'color-status-' + name + '-' + next]);
    }
  }
  for (const [old, next] of [['default','bg-default'],['hover','bg-hover'],['pressed','bg-pressed'],['disabled','bg-disabled'],['foreground','fg']]) pairs.push(['color-action-primary-' + old, 'color-action-primary-' + next]);
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
  const recipes = buttonRecipe('light').join('\n');
  const stage = (appearance: 'light' | 'dark', more = false) => {
    const high = more ? Object.entries(HIGH_CONTRAST[appearance]).map(([key, value]) => '  --rds-color-' + (key === 'canvas' || key === 'base' ? 'surface-' : 'ink-') + key + ': ' + value + ';').join('\n') : '';
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
