import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, renderOutputs } from '../src/foundations/canonical/master-tokens/scripts/build.mjs';
import { loadModel, cssName } from '../src/foundations/canonical/master-tokens/scripts/foundations.mjs';
import { renderCss } from '../src/foundations/canonical/master-tokens/scripts/css.mjs';
import { calculateInteractionContrast } from '../src/foundations/interactionContrast.ts';
import { renderFontsCss, renderFoundationsCss } from '../src/foundations/css.ts';
import compatibility from '../src/foundations/compatibility-map.json' with { type: 'json' };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkGenerated = process.argv.includes('--check-generated');
const check = process.argv.includes('--check') || checkGenerated;
if (check && !checkGenerated) await import('../src/foundations/canonical/master-tokens/scripts/check.mjs');
else if (!check) await build();
if (check) {
  const { renderReview } = await import('../src/foundations/canonical/master-tokens/scripts/lib.mjs');
  const canonicalOutputs = { ...await renderOutputs(), 'master-tokens/Master-Token-List.md': await renderReview() };
  for (const [file, content] of Object.entries(canonicalOutputs)) {
    const current = await readFile(path.join(root, 'src/foundations/canonical', file), 'utf8').catch(() => '');
    if (current !== content) throw new Error('Canonical output is stale: ' + file + '. Run npm run tokens:build.');
  }
}
const model = await loadModel();
const stateMigration = JSON.parse(await readFile(path.join(root, 'src/foundations/canonical/master-tokens/state-name-migration.json'), 'utf8'));
const modes = Object.fromEntries(['light', 'dark'].map(appearance => [appearance,
  ['  color-scheme: ' + appearance + ';', ...[...model.sets[appearance]].map(([name]) => '  ' + cssName(name) + ': ' + model.value(name, appearance) + ';'), ...stateMigration.cssCompatibility.map((entry: { from: string; to: string }) => '  ' + entry.from + ': var(' + entry.to + ');')].join('\n'),
])) as Record<'light' | 'dark', string>;
const legacyLines = Object.entries(compatibility.primitive).map(([old, next]) => '  ' + old + ': var(' + cssName(next) + ');');
for (const appearance of ['light', 'dark']) {
  for (const [old, next] of Object.entries(compatibility.color)) {
    legacyLines.push('  --rds-color-' + appearance + '-' + old + ': ' + model.value('rds.color.' + next, appearance) + ';');
  }
  for (const [old, level] of Object.entries({ trace: '100', air: '200', core: '300', shelter: '400', solid: '500' })) {
    legacyLines.push('  --rds-color-' + appearance + '-veil-' + old + '-fill: ' + model.value('rds.veil.' + level + '.color', appearance) + ';');
  }
  legacyLines.push('  --rds-color-' + appearance + '-veil-opaque-fill: ' + model.value('rds.color.surface.base', appearance) + ';');
  legacyLines.push('  --rds-color-' + appearance + '-bg-raised: ' + model.value('rds.color.surface.raised', appearance) + ';');
}
const guideFiles = { colors: 'Color.md', typography: 'Typography.md', spacing: 'Spacing.md', veil: 'Veil & Shadow.md', lift: 'Veil & Shadow.md', border: 'Border.md', radius: 'Radius.md', numbers: 'Numbers.md', motion: 'Motion.md', layout: 'Layout.md', tokens: 'Rahino-Tokenization.md', context: 'Rahino-Resolver.md', contrast: 'output/contrast-review/Contrast-Review.md', changes: 'output/color-value-update/Changes.md' };
const guides = Object.fromEntries(await Promise.all(Object.entries(guideFiles).map(async ([key, file]) => [key,
  await readFile(path.join(root, 'src/foundations/canonical', file), 'utf8'),
])));
const outputs = {
  'src/foundations/interaction-contrast.json': JSON.stringify(calculateInteractionContrast(), null, 2) + '\n',
  'src/styles/rds-foundations.css': renderFoundationsCss(await renderCss(model), modes),
  'src/styles/fonts.css': renderFontsCss(),
  'src/styles/rds-legacy-bridge.css': '/* Generated compatibility projections from the adopted master. No independent foundation values. */\n:root {\n' + legacyLines.join('\n') + '\n}\n',
  'src/foundations/guides.ts': '/** Generated from the canonical foundation guides. Do not edit. */\nexport const FOUNDATION_GUIDES = ' + JSON.stringify(guides, null, 2) + ' as const;\n',
};
for (const [file, content] of Object.entries(outputs)) {
  const target = path.join(root, file);
  if (check) {
    if (await readFile(target, 'utf8').catch(() => '') !== content) throw new Error(file + ' is stale. Run npm run tokens:build.');
  } else await writeFile(target, content);
}
console.log(check ? 'Foundation integration outputs are current.' : 'Built canonical foundations, styles, compatibility projections and shared guides.');
