import { isAlias, display, json } from './lib.mjs';
import { loadModel, cssName, fontStack } from './foundations.mjs';
import { forcedColorFor } from './color-policy.mjs';

const cssValue = (type, value) => {
  if (isAlias(value)) return `var(${cssName(value.slice(1, -1))})`;
  if (type === 'shadow') return ['offsetX', 'offsetY', 'blur', 'spread'].map(k => cssValue('dimension', value[k])).concat(cssValue('color', value.color)).join(' ');
  if (type === 'fontFamily') return fontStack(value);
  return display(type, value);
};
const declarations = tokens => [...tokens].map(([p, t]) => `  ${cssName(p)}: ${cssValue(t.$type, t.$value)};`).join('\n');
const rule = (selector, content) => `${selector} {\n${content}\n}`;
const appearanceRules = (light, dark, suffix = '') => [
  rule(':root' + suffix, light),
  '@media (prefers-color-scheme: dark) {\n' + rule(':root' + suffix + ':not([data-rds-theme="light"]):not([data-rds-theme="dark"])', dark) + '\n}',
  rule(':root[data-rds-theme="dark"]' + suffix, dark),
].join('\n\n');
export async function renderCss(model) {
  model ??= await loadModel();
  const { sets, pending, typography, manifest } = model;
  const policy = await import('../context-policy.json', { with: { type: 'json' } });
  const overrides = appearance => Object.entries(policy.default.contrast.enhancedOverrides[appearance]).map(([p, alias]) => `  ${cssName(p)}: ${cssValue('color', alias)};`).join('\n');
  const migration = manifest.stateNamingMigration ? await json(manifest.stateNamingMigration) : null;
  const compatibility = (migration?.cssCompatibility ?? []).map(e => `  ${e.from}: var(${e.to});`);
  const shared = [declarations(sets.shared), ...compatibility].join('\n');
  const light = '  color-scheme: light;\n' + declarations(sets.light);
  const dark = '  color-scheme: dark;\n' + declarations(sets.dark);
  const styleVars = [], classes = [];
  for (const entry of typography.entries) {
    const name = entry.publicPath.replaceAll('.', '-');
    const size = isAlias(entry.properties.fontSize) ? cssValue('dimension', entry.properties.fontSize) : entry.properties.fontSize;
    styleVars.push(`  --${name}-font-size: ${size};`, `  --${name}-font-weight: ${cssValue('fontWeight', entry.properties.fontWeight)};`, `  --${name}-line-height: ${cssValue('number', entry.properties.lineHeight)};`);
    classes.push(rule('.' + name, `  font-family: ${entry.fontOverride ? cssValue('fontFamily', entry.fontOverride) : 'var(--rds-font-family-content, inherit)'};\n  font-size: var(--${name}-font-size);\n  font-weight: var(--${name}-font-weight);\n  line-height: var(--${name}-line-height);`));
  }
  const paragraph = pending.entries.find(e => e.id === 'paragraph-gap');
  styleVars.push(`  ${cssName(paragraph.publicPath)}: ${paragraph.value};`);
  const forced = [...new Map([...sets.shared, ...sets.light])].filter(([p, t]) => p.startsWith('rds.') && ['color', 'shadow'].includes(t.$type))
    .map(([p, t]) => `  ${cssName(p)}: ${t.$type === 'shadow' ? 'none' : forcedColorFor(p)} !important;`);
  for (const [p] of sets.shared) if (p.startsWith('rds.veil.') && p.endsWith('.blur')) forced.push(`  ${cssName(p)}: 0px !important;`);
  return [
    '/* Generated from the canonical master. Run node master-tokens/scripts/build.mjs. */',
    '/* Load fonts separately. Set data-rds-theme=light|dark|system and data-rds-contrast=standard|more|system on the root. */',
    rule(':root', shared + '\n' + styleVars.join('\n')),
    appearanceRules(light, dark),
    '@media (prefers-contrast: more) {\n' + appearanceRules(overrides('light'), overrides('dark'), ':not([data-rds-contrast="standard"])') + '\n}',
    appearanceRules(overrides('light'), overrides('dark'), '[data-rds-contrast="more"]'),
    '@media (forced-colors: active) {\n' + rule(':root', forced.join('\n')) + '\n}',
    rule('[data-rds-script="fa"]', '  --rds-font-family-content: var(--rds-font-family-fa);'),
    rule('[data-rds-script="latin"]', '  --rds-font-family-content: var(--rds-font-family-latin);'),
    ...classes,
    '/* Paragraph spacing is a variable only: apply once between reading paragraphs. Deferred presentation recipes are not published as CSS tokens. */',
    '',
  ].join('\n\n');
}
