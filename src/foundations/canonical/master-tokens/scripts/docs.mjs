import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { foundationDir, referenceChain, isAlias } from './lib.mjs';
import { loadModel } from './foundations.mjs';
import { renderColorReview } from './color-review.mjs';

const table = (headers, rows) => ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |', ...rows.map(row => '| ' + row.map(v => String(v).replaceAll('|', '\\|')).join(' | ') + ' |')].join('\n');
const code = value => '`' + value + '`';
const block = (name, text) => `<!-- rds:generated:${name}:start -->\n${text}\n<!-- rds:generated:${name}:end -->`;
export async function renderDocuments(model) {
  model ??= await loadModel();
  const { value, token, sets, pending, typography, supplementary } = model;
  const refs = (p, appearance = 'light') => referenceChain(model.contexts[appearance], p).slice(1).map(code).join(' → ') || '—';
  const withRef = (p, appearance = 'light') => `${code(value(p, appearance))}<br>${refs(p, appearance)}`;
  const binding = v => isAlias(v) ? referenceChain(model.contexts.light, v.slice(1, -1)).map(code).join(' → ') : 'CSS expression';
  const property = (entry, key, resolved) => `${resolved}<br>${binding(entry.properties[key])}`;
  const sharedPaths = prefix => [...sets.shared.keys()].filter(p => p.startsWith(prefix)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const purpose = p => sets.shared.get(p).$description;
  const models = {};
  models.spacing = table(['Reference token', 'Shared semantic token', 'Value', 'Typical use'], sharedPaths('rds.space.').map(p => [code(sets.shared.get(p).$value.slice(1, -1)), code(p), value(p), purpose(p)]));
  models.radius = table(['Token', 'Reference', 'Value', 'Usage'], sharedPaths('rds.radius.').map(p => [code(p), refs(p), value(p), purpose(p)]));
  models.duration = table(['Token', 'Reference', 'Duration', 'Usage'], sharedPaths('rds.motion.duration.').map(p => [code(p), refs(p), p.endsWith('.reduced') ? `${value('rds.motion.duration.none').slice(0, -2)}–${value(p)}` : value(p), purpose(p).split('. ')[0]]));
  models.easing = table(['Token', 'Reference', 'Value'], sharedPaths('rds.motion.easing.').map(p => [code(p), refs(p), code(value(p))]));
  models.motionGeometry = table(['Token', 'Reference', 'Value'], sharedPaths('rds.motion.').filter(p => !p.includes('.duration.') && !p.includes('.easing.')).map(p => [code(p), refs(p), value(p)]));
  const grid = ['narrow', 'medium', 'wide'].map((range, i) => [range[0].toUpperCase() + range.slice(1), i === 0 ? `Below ${code(value('rds.layout.breakpoint.medium'))}` : i === 1 ? `${code(value('rds.layout.breakpoint.medium'))} to below ${code(value('rds.layout.breakpoint.wide'))}` : `${code(value('rds.layout.breakpoint.wide'))} and above`, ...['columns', 'gutter', 'margin'].map(k => String(value(`rds.layout.grid.${range}.${k}`)))]);
  models.grid = table(['Range', 'Width', 'Columns', 'Gutter', 'Minimum page margin per side'], grid);
  const caps = supplementary.entries.find(e => e.id === 'layout-content-width').value.map(row => [...row]);
  for (const row of caps) if (row[0] === 'Reading') row[1] = value('rds.type.layout.measure.reading'); else if (['Marketing page', 'Dashboard'].includes(row[0])) row[1] = value('rds.layout.content.max');
  models.caps = table(['Content', 'Maximum width'], caps);
  models.layoutBindings = table(['Token', 'Reference chain', 'Value'], sharedPaths('rds.layout.').map(p => [code(p), refs(p), value(p)]));
  models.border = table(['Token', 'Light value / reference', 'Dark value / reference', 'Meaning'], [
    ['rds.border.width.default', value('rds.border.width.default'), value('rds.border.width.default'), 'Functional boundaries and separators'],
    ['rds.border.width.strong', value('rds.border.width.strong'), value('rds.border.width.strong'), 'Selection and drop targets'],
    ['rds.color.edge.subtle', value('rds.color.edge.subtle'), value('rds.color.edge.subtle', 'dark'), 'Optional decorative dividers'],
    ['rds.color.edge.control', value('rds.color.edge.control'), value('rds.color.edge.control', 'dark'), 'Control boundary when needed'],
    ['rds.focus.ring.width', value('rds.focus.ring.width'), value('rds.focus.ring.width'), 'Independent focus outline'],
    ['rds.color.focus.ring', value('rds.color.focus.ring'), value('rds.color.focus.ring', 'dark'), 'Keyboard focus color'],
  ].map(([p, a, b, use]) => [code(p), withRef(p), withRef(p, 'dark'), use]));
  models.fonts = table(['Content', 'Semantic token', 'Reference', 'Font'], [
    ['Persian', 'rds.font.family.fa'], ['English', 'rds.font.family.latin'], ['Technical text', 'rds.font.family.code'],
  ].map(([label, p]) => [label, code(p), refs(p), value(p)]));
  models.typography = table(['Role', 'Font size / reference', 'Weight / reference', 'Line height / reference', 'Use', 'Avoid'], typography.entries.map(e => {
    const style = model.baseStyle(e);
    return [code(e.publicPath), ...['fontSize', 'fontWeight', 'lineHeight'].map(k => property(e, k, style[k])), e.sourceAnnotations.usage, e.sourceAnnotations.avoid];
  }));
  models.typeProperties = table(['Token', 'Reference', 'Value'], [...sharedPaths('rds.font.weight.'), ...sharedPaths('rds.type.line-height.'), ...sharedPaths('rds.type.layout.')].map(p => [code(p), refs(p), value(p)]));
  const veilKeys = ['100', '200', '300', '400', '500', 'scrim'];
  const veilRoles = ['Atmospheric', 'Ambient', 'Lightweight', 'Functional', 'Focused', 'Scrim'];
  const translucent = t => '#' + t.$value.components.map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase() + ' / ' + Math.round(t.$value.alpha * 100) + '%';
  models.veil = table(['Group', 'Role', 'Light', 'Dark', 'Blur', 'Recommended use'], veilKeys.map((key, i) => [code(`rds.veil.${key}`), veilRoles[i], code(translucent(token(`rds.veil.${key}.color`))), code(translucent(token(`rds.veil.${key}.color`, 'dark'))), value(`rds.veil.${key}.blur`), purpose(`rds.veil.${key}.blur`)]));
  models.veilPaths = table(['Token', 'Light reference', 'Dark reference'], veilKeys.flatMap(key => ['color', 'blur'].map(part => {
    const p = `rds.veil.${key}.${part}`;
    return [code(p), refs(p), refs(p, 'dark')];
  })));
  models.shadow = table(['Token', 'Role', 'Y / Blur', 'Light opacity', 'Dark opacity', 'Recommended use'], ['sm', 'md', 'lg'].map(key => {
    const p = `rds.shadow.${key}`, a = token(p), b = token(p, 'dark');
    return [code(p), sets.light.get(p).$extensions.rahino.sourceAnnotations.role, `${a.$value.offsetY.value}px / ${a.$value.blur.value}px`, Math.round(a.$value.color.alpha * 100) + '%', Math.round(b.$value.color.alpha * 100) + '%', sets.light.get(p).$description];
  }));
  models.shadowRefs = table(['Token', 'Part', 'Light reference / value', 'Dark reference / value'], ['sm', 'md', 'lg'].flatMap(key => {
    const p = `rds.shadow.${key}`;
    return ['offsetX', 'offsetY', 'blur', 'spread', 'color'].map(part => {
      const partValue = appearance => {
        const alias = model.contexts[appearance].get(p).$value[part];
        return isAlias(alias) ? `${binding(alias)}<br>${code(value(alias.slice(1, -1), appearance))}` : code(JSON.stringify(alias));
      };
      return [code(p), part, partValue('light'), partValue('dark')];
    });
  }));
  const colorPaths = [...sets.light.keys()].filter(p => p.startsWith('rds.color.'));
  const colorTable = paths => table(['Token', 'Light value / reference', 'Dark value / reference', 'Use'], paths.map(p => [code(p), withRef(p), withRef(p, 'dark'), sets.light.get(p).$description.split('. ')[0]]));
  models.interfaceColors = colorTable(colorPaths.filter(p => !p.startsWith('rds.color.data.')));
  models.chartColors = colorTable(colorPaths.filter(p => p.startsWith('rds.color.data.')));
  const colorReview = await renderColorReview(model);
  models.textContrast = colorReview.textTable;
  models.boundaryContrast = colorReview.boundaryTable;
  models.enhancedColors = table(['Theme', 'Semantic target', 'Reference', 'Value'], pending.entries.filter(entry => entry.kind === 'enhanced-contrast-field').map(entry => [entry.label.split('.')[1], code(entry.targetPath), code(entry.valueReference.slice(1, -1)), code(entry.value)]));
  const numbers = supplementary.entries.find(e => e.id === 'number-formatting').value;
  models.numberExamples = table(['Type', 'Example'], numbers.formattingExamples);
  models.numberType = table(['Context', 'Token'], numbers.typographyRoles);
  const configs = {
    'Spacing.md': [['spacing', '## 1. Reference and shared spacing scale']],
    'Radius.md': [['radius', '## Radius tokens']],
    'Motion.md': [['duration', '## 2. Motion Tokens'], ['easing', '## 3. Easing'], ['motionGeometry', '### Movement and scale tokens']],
    'Layout.md': [['grid', '## 2. Page grid'], ['caps', '## 3. Content width'], ['layoutBindings', '## Token references']],
    'Border.md': [['border', '## Final Minimal Token Set'], ['boundaryContrast', '## Current boundary contrast']],
    'Typography.md': [['fonts', '## Fonts'], ['typography', '## Typography tokens'], ['typeProperties', '## Shared typography properties']],
    'Veil & Shadow.md': [['veil', '## Veil tokens'], ['veilPaths', '### Public token paths'], ['shadow', '## Shadow tokens'], ['shadowRefs', '### Shadow references']],
    'Color.md': [['interfaceColors', '## Interface colors'], ['chartColors', '## Chart colors'], ['enhancedColors', '### Enhanced-contrast values'], ['textContrast', '### Neutral resting text contrast']],
    'Numbers.md': [['numberExamples', '## Display & formatting'], ['numberType', '## Typography']],
  };
  const outputs = {};
  for (const [file, sections] of Object.entries(configs)) {
    let text = (await readFile(path.join(foundationDir, file), 'utf8')).replaceAll('\r\n', '\n');
    for (const [name, heading] of sections) {
      const start = `<!-- rds:generated:${name}:start -->`, end = `<!-- rds:generated:${name}:end -->`;
      if (text.includes(start)) {
        const a = text.indexOf(start), b = text.indexOf(end, a);
        if (b < 0) throw new Error(`Missing generated table end: ${file}:${name}`);
        let rendered = models[name];
        // Preserve aligned table formatting already chosen in a guide.
        if (/^\| [^|]+ {2,}\|/m.test(text.slice(a, b))) {
          const rows = rendered.split('\n').map(line => line.split(/(?<!\\)\|/).slice(1, -1).map(cell => cell.trim()));
          const widths = rows[0].map((_, i) => Math.max(3, ...rows.map(row => row[i].length)));
          rendered = rows.map((row, index) => '| ' + row.map((cell, i) => index === 1 ? '-'.repeat(widths[i]) : cell.padEnd(widths[i])).join(' | ') + ' |').join('\n');
        }
        text = text.slice(0, a) + block(name, rendered) + text.slice(b + end.length);
      } else {
        const headingAt = text.indexOf(heading);
        if (headingAt < 0) throw new Error(`Missing document heading: ${file}:${heading}`);
        const a = text.indexOf('\n|', headingAt) + 1;
        if (a <= 0) throw new Error(`Missing document table: ${file}:${name}`);
        let b = a;
        while (text[b] === '|') { const next = text.indexOf('\n', b); b = next < 0 ? text.length : next + 1; }
        text = text.slice(0, a) + block(name, models[name]) + '\n' + text.slice(b);
      }
    }
    const notice = '<!-- rds:canonical-guide -->\nValues in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.\n';
    if (!text.includes('<!-- rds:canonical-guide -->')) { const first = text.indexOf('\n'); text = text.slice(0, first + 1) + '\n' + notice + text.slice(first + 1); }
    outputs[file] = text;
  }
  return { outputs, grid, caps };
}
