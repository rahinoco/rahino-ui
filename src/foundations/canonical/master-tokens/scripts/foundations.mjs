import { json, flatten, resolve, display, isAlias } from './lib.mjs';
import { resolveTypographyStyles } from './typography.mjs';
import { renderLayout } from './layout.mjs';

export const rawOutputFile = 'master-tokens/generated/reference.ts';
export const cssName = publicPath => '--' + publicPath.replaceAll('.', '-');
export const fontStack = families => families.map(f => /\s/.test(f) ? JSON.stringify(f) : f).join(', ');
export function runtimeValue(type, value) {
  if (type === 'fontFamily') return fontStack(value);
  if (type === 'color' && value.alpha !== 1) return `rgb(${value.components.map(v => Math.round(v * 255)).join(' ')} / ${value.alpha.toFixed(2)})`;
  if (type === 'cubicBezier' && value.join(',') === '0,0,1,1') return 'linear';
  if (type === 'shadow') {
    const d = field => value[field].value === 0 ? '0' : display('dimension', value[field]);
    const color = value.color;
    return `${d('offsetX')} ${d('offsetY')} ${d('blur')} ${d('spread')} rgba(${color.components.map(v => Math.round(v * 255)).join(', ')}, ${color.alpha.toFixed(2)})`;
  }
  return ['number', 'fontWeight'].includes(type) ? value : display(type, value);
}
export const luminance = hex => hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255)
  .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
export const contrastRatio = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
// Stored ratios are rounded so last-bit floating-point differences between runtimes cannot make generated files drift.
export const roundRatio = value => Number(value.toFixed(10));

export async function loadModel() {
  const manifest = await json('manifest.json');
  const pending = await json(manifest.recipesFile);
  const typography = await json(manifest.typographyFile);
  const supplementary = await json(manifest.supplementaryFile);
  const schema = (await json('export-map.json')).files;
  const sets = {};
  for (const [name, config] of Object.entries(manifest.sets)) sets[name] = flatten(await json(config.file));
  const contexts = Object.fromEntries(['light', 'dark'].map(name => [name, new Map([...sets.shared, ...sets[name]])]));
  const token = (publicPath, appearance = 'light') => resolve(contexts[appearance], publicPath);
  const value = (publicPath, appearance) => { const t = token(publicPath, appearance); return runtimeValue(t.$type, t.$value); };
  const styles = await resolveTypographyStyles();
  const baseStyle = entry => {
    const style = { ...styles.fa[entry.publicPath.slice('rds.type.'.length)] };
    if (!entry.fontOverride) delete style.fontFamily;
    return style;
  };
  const textContrast = Object.fromEntries(['light', 'dark'].map(appearance => [appearance,
    Object.fromEntries(['primary', 'secondary', 'tertiary'].map(ink => [ink,
      Object.fromEntries(['canvas', 'base', 'subtle', 'raised', 'sunken'].map(surface => [surface,
        Number(contrastRatio(value(`rds.color.ink.${ink}`, appearance), value(`rds.color.surface.${surface}`, appearance)).toFixed(2)),
      ])),
    ])),
  ]));
  const api = {};
  const evaluate = (node, file) => {
    if (node.$binding === 'token') return value(node.path, node.set === 'shared' ? 'light' : node.set);
    if (node.$binding === 'text-style') return baseStyle(typography.entries.find(e => e.id === node.id));
    if (node.$binding === 'recipe') {
      const entry = pending.entries.find(e => e.id === node.id);
      if (entry.valueReference) { const t = resolve(sets.shared, entry.valueReference.slice(1, -1)); return runtimeValue(t.$type, t.$value); }
      return entry.value;
    }
    if (node.$binding === 'full-rounding') return supplementary.entries.find(e => e.id === 'full-rounding').value.cssShortcut;
    if (node.$binding === 'text-contrast') return textContrast;
    if (node.$binding === 'projection') return node.order.map(slot => api[file][node.sourceExport][slot]);
    if (node.$binding === 'script-styles') return styles;
    return Object.fromEntries(Object.entries(node).map(([key, child]) => [key, evaluate(child, file)]));
  };
  for (const [file, exports] of Object.entries(schema)) {
    api[file] = {};
    for (const [name, node] of Object.entries(exports)) api[file][name] = evaluate(node, file);
  }
  return { manifest, pending, typography, supplementary, schema, sets, contexts, token, value, api, baseStyle, textContrast };
}

export async function renderFoundationFiles(model) {
  model ??= await loadModel();
  const { schema, pending, typography, sets, api } = model;
  const outputs = {};
  const types = {
    'Color.ts': 'export type AppearanceName = "light" | "dark";\nexport interface Pair { light: string; dark: string; }\nconst pair = (light: string, dark: string): Pair => ({ light, dark });\ntype ReferenceInk = "primary" | "secondary" | "tertiary";\n',
    'Veil.ts': 'export type AppearanceName = "light" | "dark";\nexport interface Pair { light: string; dark: string; }\nexport interface VeilTreatment { color: Pair; blur: string; }\nconst pair = (light: string, dark: string): Pair => ({ light, dark });\n',
    'Shadow.ts': 'export type AppearanceName = "light" | "dark";\nexport interface Pair { light: string; dark: string; }\nconst pair = (light: string, dark: string): Pair => ({ light, dark });\n',
    'Typography.ts': 'export type TypographyProfile = keyof typeof LINE_HEIGHT;\nexport interface TypographyStyle { fontSize: string; fontWeight: number; lineHeight: number; profile: TypographyProfile; fontFamily?: string; }\nexport type TypographyRole = keyof typeof TYPOGRAPHY;\ntype ResolvedTypographyStyles = Readonly<Record<TypographyRole, TypographyStyle & { fontFamily: string }>>;\nconst withFontFamily = (fontFamily: string): ResolvedTypographyStyles => Object.fromEntries(\n  Object.entries(TYPOGRAPHY as Record<string, TypographyStyle>).map(([role, style]) => [role, { ...style, fontFamily: style.fontFamily ?? fontFamily }]),\n) as ResolvedTypographyStyles;\n',
  };
  const docs = { 'Color.ts': 'Color.md.', 'Border.ts': 'Border.md.', 'Motion.ts': 'Motion.md.', 'Radius.ts': 'Radius.md.', 'Shadow.ts': 'Veil & Shadow.md.', 'Spacing.ts': 'Spacing.md.', 'Typography.ts': 'Typography.md.', 'Veil.ts': 'Veil & Shadow.md.' };
  for (const [file, exports] of Object.entries(schema)) {
    if (file === 'layout.ts') { outputs[file] = await renderLayout(); continue; }
    const lines = [
      '/**', ` * Rahino Design System — ${file.slice(0, -3)} foundations`,
      ' * Generated from the canonical master collection. Do not edit values here.',
      ' * Regenerate: node master-tokens/scripts/build.mjs', ` * Guide: ${docs[file]}`,
      ' */', '', ...(types[file] ? [types[file]] : []),
    ];
    const tokenAt = node => node.$binding === 'token' ? sets[node.set].get(node.path) : null;
    const annotation = node => {
      if (node.light?.$binding === 'token' && node.dark?.$binding === 'token' && node.light.path === node.dark.path) {
        const light = tokenAt(node.light).$value, dark = tokenAt(node.dark).$value;
        if (light === dark) return annotation(node.light);
        return `/** @token ${node.light.path}${isAlias(light) ? ` @lightAlias ${light.slice(1, -1)}` : ''}${isAlias(dark) ? ` @darkAlias ${dark.slice(1, -1)}` : ''} */`;
      }
      if (node.$binding === 'token') {
        if (node.path.startsWith('ref.')) return null;
        const t = tokenAt(node);
        return `/** @token ${node.path}${isAlias(t.$value) ? ` @alias ${t.$value.slice(1, -1)}` : ''} */`;
      }
      if (node.$binding === 'recipe') {
        const p = pending.entries.find(e => e.id === node.id).publicPath;
        return p ? `/** @token ${p} */` : null;
      }
      if (node.$binding === 'text-style') return `/** @token ${typography.entries.find(e => e.id === node.id).publicPath} */`;
      return null;
    };
    const expr = (node, actual, depth = 0) => {
      if (node.$binding) {
        if (node.$binding === 'text-style') return JSON.stringify(actual, null, 2) + ' as TypographyStyle';
        if (file === 'Spacing.ts' && node.$binding === 'token' && node.path.startsWith('rds.space.')) {
          const alias = tokenAt(node).$value;
          return `SPACE[${alias.slice('{ref.space.'.length, -1)}]`;
        }
        return JSON.stringify(actual, null, 2);
      }
      if (node.light?.$binding === 'token' && node.dark?.$binding === 'token' && ['Color.ts', 'Veil.ts', 'Shadow.ts'].includes(file)) {
        const a = tokenAt(node.light), b = tokenAt(node.dark);
        if (isAlias(a.$value) && a.$value === b.$value && a.$value.startsWith('{rds.')) {
          const target = sets.light.get(a.$value.slice(1, -1));
          const source = target?.$extensions.rahino.source;
          if (source?.file === file) return source.exportPath.slice(1, -1).reduce((access, key) => access + (/^[A-Za-z_$][\w$]*$/.test(key) ? '.' + key : '[' + JSON.stringify(key) + ']'), source.exportPath[0]);
        }
        return `pair(${JSON.stringify(actual.light)}, ${JSON.stringify(actual.dark)})`;
      }
      const indent = '  '.repeat(depth + 1);
      return '{\n' + Object.entries(node).flatMap(([key, child]) => [
        ...(annotation(child) ? [indent + annotation(child)] : []),
        indent + JSON.stringify(key) + ': ' + expr(child, actual[key], depth + 1).replaceAll('\n', '\n' + indent) + ',',
      ]).join('\n') + '\n' + '  '.repeat(depth) + '}';
    };
    for (const [name, node] of Object.entries(exports)) {
      if (annotation(node)) lines.push(annotation(node));
      if (node.$binding === 'projection') lines.push(`export const ${name}: Pair[] = Object.values(${node.sourceExport});`, '');
      else if (node.$binding === 'script-styles') lines.push('export const TYPOGRAPHY_BY_SCRIPT = { fa: withFontFamily(FONT_FAMILY.fa), latin: withFontFamily(FONT_FAMILY.latin) } as const;', '');
      else if (node.$binding === 'text-contrast') lines.push(`export const ${name}: Record<AppearanceName, Record<ReferenceInk, Record<string, number>>> = ${JSON.stringify(api[file][name], null, 2)};`, '');
      else {
        const expression = expr(node, api[file][name]);
        const assertion = expression.startsWith('{') || /^["\d-]/.test(expression) ? ' as const' : '';
        lines.push(`export const ${name} = ${expression}${assertion};`, '');
      }
    }
    if (file === 'Motion.ts') lines.push('export type DurationName = keyof typeof DURATION;', 'export type EasingName = keyof typeof EASING;', 'export type TranslationName = keyof typeof TRANSLATION;', 'export type ScaleName = keyof typeof SCALE;', '');
    outputs[file] = lines.join('\n');
  }
  outputs[rawOutputFile] = ['/** Generated raw references. Edit master-tokens/shared.tokens.json and rebuild. */', 'export const REFERENCE = {',
    ...[...sets.shared].filter(([p]) => p.startsWith('ref.')).flatMap(([p, t]) => [`  /** @token ${p} */`, `  ${JSON.stringify(p)}: ${JSON.stringify(runtimeValue(t.$type, t.$value))},`]),
    '} as const;', '',
  ].join('\n');
  return outputs;
}
