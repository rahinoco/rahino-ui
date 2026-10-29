import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const masterDir = fileURLToPath(new URL('../', import.meta.url));
export const foundationDir = path.resolve(masterDir, '..');
// Generated files are compared with LF endings; Windows checkouts may store CRLF.
export const readText = async file => (await readFile(file, 'utf8')).replaceAll('\r\n', '\n');
export const json = async name => JSON.parse(await readText(path.join(masterDir, name)));
export const save = async (name, value) => writeFile(path.join(masterDir, name), JSON.stringify(value, null, 2) + '\n', 'utf8');
export const at = (object, keys) => keys.reduce((value, key) => value[key], object);

export function dimension(value) {
  const match = /^(-?[\d.]+)(px|rem)$/.exec(value);
  if (!match) throw new Error(`Not a DTCG dimension: ${value}`);
  return { value: Number(match[1]), unit: match[2] };
}

export function color(value) {
  let rgb, alpha = 1;
  if (/^#[\da-f]{6}$/i.test(value)) rgb = value.slice(1).match(/../g).map(v => parseInt(v, 16));
  else {
    const match = /^rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)$/.exec(value);
    if (!match) throw new Error(`Unsupported source color: ${value}`);
    rgb = match.slice(1, 4).map(Number);
    alpha = Number(match[4]);
  }
  return { colorSpace: 'srgb', components: rgb.map(v => v / 255), alpha };
}

export function encode(type, value) {
  if (type === 'dimension') return dimension(value);
  if (type === 'color') return color(value);
  if (type === 'duration') {
    if (!/^\d+(?:\.\d+)?ms$/.test(value)) throw new Error(`Unsupported duration: ${value}`);
    return { value: Number(value.slice(0, -2)), unit: 'ms' };
  }
  if (type === 'cubicBezier') {
    if (value === 'linear') return [0, 0, 1, 1];
    const match = /^cubic-bezier\(([^)]+)\)$/.exec(value);
    if (!match) throw new Error(`Unsupported easing: ${value}`);
    return match[1].split(',').map(Number);
  }
  if (type === 'fontFamily') return value.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
  if (type === 'shadow') {
    const match = /^0 (\d+)px (\d+)px 0 rgba\(0, 0, 0, ([\d.]+)\)$/.exec(value);
    if (!match) throw new Error(`Unsupported source shadow: ${value}`);
    return {
      color: { colorSpace: 'srgb', components: [0, 0, 0], alpha: Number(match[3]) },
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: Number(match[1]), unit: 'px' },
      blur: { value: Number(match[2]), unit: 'px' },
      spread: { value: 0, unit: 'px' },
    };
  }
  if (type === 'number' || type === 'fontWeight') return value;
  throw new Error(`Unsupported token type: ${type}`);
}

export function insert(document, publicPath, token) {
  const keys = publicPath.split('.');
  let group = document;
  for (const key of keys.slice(0, -1)) {
    if (group[key]?.$value !== undefined) throw new Error(`Token/group collision: ${publicPath}`);
    group = group[key] ??= {};
  }
  const last = keys.at(-1);
  if (group[last] !== undefined) throw new Error(`Duplicate path: ${publicPath}`);
  group[last] = token;
}

export function flatten(document, prefix = '', result = new Map()) {
  for (const [key, value] of Object.entries(document)) {
    if (key.startsWith('$')) continue;
    const publicPath = prefix ? `${prefix}.${key}` : key;
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid group: ${publicPath}`);
    if (Object.hasOwn(value, '$value')) result.set(publicPath, value);
    else flatten(value, publicPath, result);
  }
  return result;
}

export const isAlias = value => typeof value === 'string' && /^\{[^{}]+\}$/.test(value);

export function referenceChain(tokens, publicPath, trail = []) {
  if (trail.includes(publicPath)) throw new Error(`Cyclic alias: ${publicPath}`);
  const token = tokens.get(publicPath);
  if (!token) throw new Error(`Missing token: ${publicPath}`);
  return [publicPath, ...(isAlias(token.$value) ? referenceChain(tokens, token.$value.slice(1, -1), [...trail, publicPath]) : [])];
}

export function resolve(tokens, publicPath, trail = []) {
  if (trail.includes(publicPath)) throw new Error(`Cyclic alias: ${[...trail, publicPath].join(' -> ')}`);
  const token = tokens.get(publicPath);
  if (!token) throw new Error(`Missing token: ${publicPath}`);
  const next = [...trail, publicPath];
  if (isAlias(token.$value)) {
    const target = resolve(tokens, token.$value.slice(1, -1), next);
    if (target.$type !== token.$type) throw new Error(`Alias type mismatch: ${publicPath}`);
    return { ...token, $value: target.$value };
  }
  if (token.$type === 'shadow') {
    const fields = { color: 'color', offsetX: 'dimension', offsetY: 'dimension', blur: 'dimension', spread: 'dimension' };
    const value = { ...token.$value };
    for (const [field, type] of Object.entries(fields)) {
      if (!isAlias(value[field])) continue;
      const target = resolve(tokens, value[field].slice(1, -1), next);
      if (target.$type !== type) throw new Error(`Alias type mismatch: ${publicPath}.${field}`);
      value[field] = target.$value;
    }
    return { ...token, $value: value };
  }
  return token;
}

// Some raw reference values are fields of an existing composite export.
// Preserve that provenance without parsing or copying independent values.
export function encodedSourceValue(type, source, module) {
  const encoded = encode(source.encodingType ?? type, at(module, source.exportPath));
  return source.encodedPath ? at(encoded, source.encodedPath) : encoded;
}

export function display(type, value) {
  if (isAlias(value)) return value;
  if (type === 'dimension' || type === 'duration') return `${value.value}${value.unit}`;
  if (type === 'color') {
    const bytes = value.components.map(v => Math.round(v * 255));
    if (value.alpha === 1) return '#' + bytes.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
    return `rgb(${bytes.join(' ')} / ${value.alpha})`;
  }
  if (type === 'shadow') return [
    ...['offsetX', 'offsetY', 'blur', 'spread'].map(field => display('dimension', value[field])),
    display('color', value.color),
  ].join(' ');
  if (type === 'fontFamily') return value.join(', ');
  if (type === 'cubicBezier') return `cubic-bezier(${value.join(', ')})`;
  return String(value);
}

export function leaves(value, prefix = [], output = []) {
  if (value !== null && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) leaves(child, [...prefix, key], output);
  } else output.push(prefix);
  return output;
}

const esc = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const table = (headers, rows) => [
  `| ${headers.join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map(row => `| ${row.map(esc).join(' | ')} |`),
].join('\n');

export async function renderReview() {
  const manifest = await json('manifest.json');
  const issues = await json(manifest.decisionsFile);
  const pending = await json(manifest.recipesFile);
  const textStyles = await json(manifest.typographyFile);
  const documents = {};
  for (const [name, set] of Object.entries(manifest.sets)) documents[name] = flatten(await json(set.file));
  const allPaths = [...new Set(Object.values(documents).flatMap(m => [...m.keys()]))]
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const sourceLink = (label, source) => `[${label}](../${encodeURI(source.file)}#L${source.line})`;
  const tokenLink = publicPath => {
    const token = documents.shared.get(publicPath) ?? documents.light.get(publicPath) ?? documents.dark.get(publicPath);
    return sourceLink(`\`${publicPath}\``, token.$extensions.rahino.source);
  };
  const contexts = Object.fromEntries(['light', 'dark'].map(name => [name, new Map([...documents.shared, ...documents[name]])]));
  const valueIn = (publicPath, appearance = 'light') => {
    const token = resolve(contexts[appearance], publicPath);
    return display(token.$type, token.$value);
  };
  const references = (publicPath, appearance = 'light') => {
    const t = contexts[appearance].get(publicPath);
    if (t.$type === 'shadow') return Object.entries(t.$value).filter(([, v]) => isAlias(v)).map(([k, v]) => `${k}: \`${referenceChain(contexts[appearance], v.slice(1, -1)).join(' → ')}\``).join('<br>');
    return referenceChain(contexts[appearance], publicPath).slice(1).map(p => `\`${p}\``).join(' → ') || '—';
  };
  const styleProperty = property => isAlias(property) ? `${valueIn(property.slice(1, -1))}<br>\`${referenceChain(contexts.light, property.slice(1, -1)).join(' → ')}\`` : property;
  const openIssues = issues.items.filter(item => item.status === 'open');
  const deferredIssues = issues.items.filter(item => (item.status === 'deferred' || item.status === 'scheduled') && item.disposition !== 'component-scope');
  const resolvedCount = issues.items.filter(item => item.status === 'resolved').length;
  const purpose = publicPath => {
    const token = documents.shared.get(publicPath) ?? documents.light.get(publicPath) ?? documents.dark.get(publicPath);
    const meta = token.$extensions.rahino;
    const summary = meta.sourceAnnotations?.role ?? token.$description.split(/\.\s+(?=[A-Z@])/)[0];
    const flags = meta.reviewIssues.filter(id => openIssues.some(item => item.id === id));
    if (token.$deprecated) flags.push('Deprecated alias');
    return summary + (flags.length ? ` **[${flags.join(', ')}]**` : '');
  };
  const semanticPaths = allPaths.filter(p => p.startsWith('rds.'));
  const referencePaths = allPaths.filter(p => p.startsWith('ref.'));
  const familyNames = {
    border: 'Borders', color: 'Colors', focus: 'Focus', font: 'Fonts',
    layout: 'Layout', motion: 'Motion', radius: 'Corner radius', shadow: 'Shadows',
    space: 'Spacing', type: 'Typography', veil: 'Veils',
  };
  const contrast = pending.entries.filter(e => e.kind === 'enhanced-contrast-field');
  const gradients = pending.entries.filter(e => e.kind === 'presentation-recipe');
  const families = [...new Set(semanticPaths.map(p => p.split('.')[1]))];
  const tokenTables = paths => {
    const shared = paths.filter(p => documents.shared.has(p));
    const themed = paths.filter(p => !documents.shared.has(p));
    return [
      ...(shared.length ? [table(['Token', 'Reference', 'Value (both themes)', 'Use / review'], shared.map(p => [tokenLink(p), references(p), valueIn(p), purpose(p)]))] : []),
      ...(themed.length ? [table(['Token', 'Light value / reference', 'Dark value / reference', 'Use / review'], themed.map(p => [
        tokenLink(p), documents.light.has(p) ? `${valueIn(p, 'light')}<br>${references(p, 'light')}` : '—',
        documents.dark.has(p) ? `${valueIn(p, 'dark')}<br>${references(p, 'dark')}` : '—', purpose(p),
      ]))] : []),
    ];
  };
  const catalog = families.flatMap(family => {
    const paths = semanticPaths.filter(p => p.split('.')[1] === family);
    if (family === 'type') return ['### Typography', '#### Text styles',
      'Semantic text styles are defined in [typography.json](typography.json). See [Typography](../Typography.md) for font selection, usage and format exceptions.',
      table(['Role', 'Font size', 'Weight', 'Line height'], textStyles.entries.map(entry => [sourceLink(`\`${entry.publicPath}\``, entry.source), ...['fontSize', 'fontWeight', 'lineHeight'].map(k => styleProperty(entry.properties[k]))])),
      '#### Text layout and line height', ...tokenTables(paths)];
    if (family !== 'color') return [`### ${familyNames[family] ?? family}`, ...tokenTables(paths)];
    return [
      '### Colors',
      'Current resolved colors appear below. See the [color-value changes](../output/color-value-update/Changes.md), [text contrast table](../Color.md#neutral-resting-text-contrast) and [current contrast review](../output/contrast-review/Contrast-Review.md) for calculation results and unresolved findings.',
      '#### Interface colors',
      ...tokenTables(paths.filter(p => !p.startsWith('rds.color.data.'))),
      '#### Chart palettes',
      'Chart slots start at 01; existing array index 0 maps to slot 01. Series order is preserved.',
      ...tokenTables(paths.filter(p => p.startsWith('rds.color.data.'))),
      ...(gradients.length ? [
        '#### Presentation backgrounds',
        'Full gradient recipes. Brand light/dark follow the active theme; atmosphere remains separate. Final representation and automatic switching remain deferred to design.',
        table(['Recipe', 'CSS value'], gradients.map(entry => [sourceLink(`\`${entry.publicPath}\``, entry.source), entry.value])),
      ] : []),
      ...(contrast.length ? [
        '#### Enhanced contrast',
        'Five overrides per theme have approved semantic targets. Native forced colors use system colors. See [context selection](../Rahino-Resolver.md).',
        table(['Existing field', 'Value'], contrast.map(entry => [sourceLink(entry.label, entry.source), entry.value])),
      ] : []),
    ];
  });
  const recipes = pending.entries.filter(e => e.kind === 'approved-css-recipe');
  const issueSummaries = {
    'canonical-migration': 'Approve adoption and generate the remaining foundation outputs.',
    'identifying-cues': 'Define adequate control/state cues where fills or edges alone are insufficient.',
    'presentation-representation': 'Finalize gradient storage and theme-following brand output during design work.',
    'context-resolution': 'Define theme defaults, override precedence, script selection and accessibility fallbacks.',
    'number-profiles': 'Define required product configuration, including precision.',
    'documentation-cleanup': 'Fix mismatched Border tables and stale source filenames.',
  };
  const rawFamilies = [...new Set(referencePaths.map(p => p.split('.')[1]))];
  const sections = [
    manifest.adopted ? '# Rahino — Master Token List' : '# Rahino — Draft Master Token List',
    manifest.adopted ? '**Canonical foundation. Values and outputs are generated from this collection.**' : '**Draft for review; not adopted or ready to publish.**',
    `${semanticPaths.length} shared and theme-dependent typed tokens, ${textStyles.entries.length} semantic text styles, ${referencePaths.length} raw references, and ${pending.entries.length} supporting definitions.`,
    '## How to read this list',
    '- `ref.*` stores raw values; `rds.*` gives them shared names and purposes. Tables show references alongside resolved values. An arrow follows the alias chain; `—` means a directly defined value.\n- Edit definitions in [shared](shared.tokens.json), [light](light.tokens.json), [dark](dark.tokens.json) or [typography](typography.json) JSON.\n- Token names link to generated TypeScript outputs; capture provenance is retained separately.\n- Component accessibility, application integration and external consumer migration still require product testing.',
    'Generated from the master JSON. Edit the JSON, then run `node master-tokens/scripts/build.mjs` to synchronize this list, foundation guides and contrast review.',
    '## Token catalog',
    ...catalog,
    '## Other preserved definitions',
    'These definitions sit outside the typed token sets. Full recipes and bindings are in [recipes.json](recipes.json).',
    ...recipes.map(entry => `${sourceLink(`\`${entry.publicPath}\``, entry.source)}: **${entry.value}** between consecutive reading paragraphs, relative to paragraph font size. See [paragraph-spacing guidance](../Typography.md#reading-paragraph-spacing).`),
    '## Usage guides',
    'Detailed rules stay in their foundation documents:',
    table(['Topic', 'Read'], [
      ['Circular and pill rounding', '[Radius](../Radius.md#rounding-rules)'],
      ['Responsive grid, content widths and app margins', '[Layout](../Layout.md)'],
      ['Number formatting and precision', '[Numbers](../Numbers.md)'],
      ['Theme, contrast and script selection', '[Context selection](../Rahino-Resolver.md)'],
      ['Text, dark focus-ring and control contrast calculations', '[Contrast records](supplementary-decisions.json)'],
      ['Token renames and removals', '[Semantic colors](Semantic-Color-Migration.md), [Color references](Color-Reference-Migration.md), [Spacing](Spacing-Migration.md), [Shadows](Shadow-Migration.md)'],
    ]),
    '## Open decisions',
    `${openIssues.length} open items. Full evidence and ${resolvedCount} resolved decisions are retained in [decisions.json](decisions.json).`,
    table(['ID', 'Issue', 'Needed next'], openIssues.map(item => [item.id, item.title, issueSummaries[item.id] ?? item.nextStep])),
    ...(deferredIssues.length ? [
      '### Later work',
      table(['Topic', 'When'], deferredIssues.map(item => [item.title, item.scheduling?.trigger ?? item.deferral?.resumeWhen ?? item.nextStep])),
    ] : []),
    '## Raw references',
    'These are the reusable values behind the catalog. Color names use hue families and stable steps, from light to dark; `-alpha-4` means 4% opacity. Steps identify Rahino swatches, not Adobe color matches or contrast guarantees. Decimal names use hyphens (`rem-0-875` = `0.875rem`). Numbered motion curves keep stable IDs.',
    ...rawFamilies.flatMap(family => [
      `### ${family}`,
      table(['Reference', 'Type', 'Value'], referencePaths.filter(p => p.split('.')[1] === family).map(p => {
        const token = documents.shared.get(p);
        return [tokenLink(p), token.$type, display(token.$type, token.$value)];
      })),
    ]),
    '## Validation',
    '`node master-tokens/scripts/check.mjs` checks the current master, supported token shapes, alias resolution, export coverage, contrast calculations and output freshness. Add `--audit-adoption` only when comparing with the historical adoption snapshot.',
    'Current color-pair findings and their targets are generated from the master in the [contrast review](../output/contrast-review/Contrast-Review.md). Build success and fresh documentation do not establish a contrast pass. Historical naming and adoption receipts retain their original values.',
    'Release still requires compiler, full format-conformance, component accessibility and consumer-migration checks. See the [maintenance guide](README.md) for the workflow and implementation history.',
  ];
  return sections.join('\n\n') + '\n';
}
