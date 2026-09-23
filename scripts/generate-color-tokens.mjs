import { access, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const names = ['Value', 'Light', 'Dark'];
const output = path.join(root, 'src/styles/rds-colors.css');
const args = new Set(process.argv.slice(2));

if (args.has('--sync')) {
  for (const name of names) {
    await copyFile(path.join(root, '..', `${name}.tokens.json`), path.join(root, 'tokens', `${name}.tokens.json`));
  }
}

const sources = Object.fromEntries(
  await Promise.all(names.map(async (name) => [name, JSON.parse(await readFile(path.join(root, 'tokens', `${name}.tokens.json`), 'utf8'))]))
);

function flatten(node, segments = [], result = new Map()) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const next = [...segments, key];
    if (value && typeof value === 'object' && '$value' in value) result.set(next.join('.'), value);
    else if (value && typeof value === 'object') flatten(value, next, result);
  }
  return result;
}

function cssColor(value, namespace = '') {
  if (typeof value === 'string') return `var(--rds-color-${namespace}${value.replace(/[{}]/g, '').replaceAll('.', '-')})`;
  if (value.colorSpace !== 'srgb' || !/^#[0-9a-f]{6}$/i.test(value.hex)) {
    throw new Error(`Unsupported token color: ${JSON.stringify(value)}`);
  }
  if (value.alpha >= 0.999) return value.hex.toUpperCase();
  const rgb = value.hex.match(/[0-9a-f]{2}/gi).map((part) => parseInt(part, 16));
  return `rgb(${rgb.join(' ')} / ${Number(value.alpha.toFixed(2))})`;
}

function validateAliases(tokens, mode) {
  for (const [key, token] of tokens) {
    const seen = new Set([key]);
    let value = token.$value;
    while (typeof value === 'string') {
      const target = value.slice(1, -1);
      if (!tokens.has(target) || seen.has(target)) throw new Error(`Invalid ${mode} alias: ${key} -> ${target}`);
      seen.add(target);
      value = tokens.get(target).$value;
    }
  }
}

const primitive = flatten(sources.Value);
const light = flatten(sources.Light);
const dark = flatten(sources.Dark);
validateAliases(light, 'Light');
validateAliases(dark, 'Dark');
if (light.size !== dark.size || [...light.keys()].some((key) => !dark.has(key))) {
  throw new Error('Light and Dark semantic token paths differ.');
}

function declaration(key, token, prefix = '', aliasNamespace = '') {
  const name = `--rds-color-${prefix}${key.replaceAll('.', '-')}`;
  const figmaName = token.$extensions?.['com.figma.codeSyntax']?.WEB;
  if (figmaName && figmaName !== `var(--rds-color-${key.replaceAll('.', '-')})`) {
    throw new Error(`Figma CSS name mismatch: ${key}`);
  }
  return `  ${name}: ${cssColor(token.$value, aliasNamespace)};`;
}

const css = [
  '/* Generated from tokens/{Value,Light,Dark}.tokens.json. Run npm run tokens:sync after updating the workspace source files. */',
  ':root {',
  '  /* RDS color primitives */',
  ...[...primitive].map(([key, token]) => declaration(key, token, 'primitive-')),
  '  /* Explicit modes are available to dark-only or light-only surfaces. */',
  ...[...light].map(([key, token]) => declaration(key, token, 'light-', 'light-')),
  ...[...dark].map(([key, token]) => declaration(key, token, 'dark-', 'dark-')),
  '  /* Active semantic colors follow the document appearance. */',
  ...[...light].map(([key]) => `  --rds-color-${key.replaceAll('.', '-')}: var(--rds-color-light-${key.replaceAll('.', '-')});`),
  '}',
  '',
  ':root.dark {',
  ...[...dark].map(([key]) => `  --rds-color-${key.replaceAll('.', '-')}: var(--rds-color-dark-${key.replaceAll('.', '-')});`),
  '}',
  '',
].join('\n');

if (args.has('--check')) {
  const current = await readFile(output, 'utf8');
  if (current !== css) throw new Error('RDS CSS is out of date. Run npm run tokens:build.');
  for (const name of names) {
    const workspaceFile = path.join(root, '..', `${name}.tokens.json`);
    try {
      await access(workspaceFile);
    } catch {
      continue; // Published package or isolated checkout: snapshots remain authoritative.
    }
    if (await readFile(workspaceFile, 'utf8') !== await readFile(path.join(root, 'tokens', `${name}.tokens.json`), 'utf8')) {
      throw new Error(`${name}.tokens.json differs from the workspace source. Run npm run tokens:sync.`);
    }
  }
} else {
  await writeFile(output, css);
}
console.log(`RDS colors: ${primitive.size} primitives and ${light.size} semantic tokens per mode${args.has('--check') ? ' verified' : ' generated'}.`);
