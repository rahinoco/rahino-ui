import { writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { json, flatten, resolve, display, foundationDir } from './lib.mjs';

// This output is generated from the master, including its spacing aliases.
export async function renderLayout() {
  const tokens = flatten(await json('shared.tokens.json'));
  const value = publicPath => {
    const token = tokens.get(publicPath);
    if (!token) throw new Error(`Missing layout token: ${publicPath}`);
    if (typeof token.$value === 'string' && /^\{rds\.space\.\d+\}$/.test(token.$value)) {
      return `SPACING[${token.$value.slice(11, -1)}]`;
    }
    const resolved = resolve(tokens, publicPath);
    return resolved.$type === 'number' ? String(resolved.$value)
      : JSON.stringify(display(resolved.$type, resolved.$value));
  };
  const leaf = (key, publicPath, indent) => [
    `${indent}/** @token ${publicPath}${tokens.get(publicPath).$value?.startsWith?.('{') ? ` @alias ${tokens.get(publicPath).$value.slice(1, -1)}` : ''} */`,
    `${indent}${key}: ${value(publicPath)},`,
  ];
  return [
    '/**',
    ' * Rahino Design System — Layout foundations',
    ' * Generated from master-tokens/shared.tokens.json. Do not edit values here.',
    ' * Regenerate: node master-tokens/scripts/build.mjs',
    ' * Guide: Layout.md.',
    ' */',
    'import { SPACING } from "./Spacing.ts";',
    '',
    'export const BREAKPOINTS = {',
    ...leaf('medium', 'rds.layout.breakpoint.medium', '  '),
    ...leaf('wide', 'rds.layout.breakpoint.wide', '  '),
    '} as const;',
    '',
    'export const PAGE_GRID = {',
    ...['narrow', 'medium', 'wide'].flatMap(range => [
      `  ${range}: {`,
      ...['columns', 'gutter', 'margin'].flatMap(key => leaf(key, `rds.layout.grid.${range}.${key}`, '    ')),
      '  },',
    ]),
    '} as const;',
    '',
    '/** @token rds.layout.content.max */',
    `export const PAGE_MAX_WIDTH = ${value('rds.layout.content.max')};`,
    '',
  ].join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await writeFile(path.join(foundationDir, 'layout.ts'), await renderLayout(), 'utf8');
  console.log('Generated layout.ts from the master collection.');
}
