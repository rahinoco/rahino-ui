import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CONTRAST_REFERENCE, INK, SURFACE } from '../src/foundations/color.ts';
import { contrastRatio } from '../src/foundations/contrast.ts';
import { renderFontsCss, renderFoundationsCss } from '../src/foundations/css.ts';
import { resolveVeil } from '../src/foundations/resolveVeil.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'src/styles/rds-foundations.css');
const fontsOutput = path.join(root, 'src/styles/fonts.css');
const check = process.argv.includes('--check');
const css = renderFoundationsCss();
const fontsCss = renderFontsCss();
const failures: string[] = [];

for (const appearance of ['light', 'dark'] as const) {
  for (const ink of ['primary', 'secondary', 'tertiary'] as const) {
    for (const surface of ['canvas', 'base', 'subtle', 'raised', 'sunken'] as const) {
      const actual = contrastRatio(INK[ink][appearance], SURFACE[surface][appearance]);
      const expected = CONTRAST_REFERENCE[appearance][ink][surface];
      if (Math.abs(actual - expected) > 0.02) {
        failures.push(`${appearance} ${ink} on ${surface}: computed ${actual.toFixed(2)} vs ${expected}`);
      }
    }
  }
}

const lightCore = resolveVeil(
  { tier: 'core', content: 'short', foreground: 'secondary', background: 'unknown', lift: 'rest' },
  { appearance: 'light', contrast: 'standard', reduceTransparency: false, reduceMotion: false, forcedColors: false, backdropFilter: true },
);
if (lightCore.protectAlpha !== 0.65 || Math.abs(lightCore.effectiveAlpha - 0.86) > 0.001) {
  failures.push(`light core secondary protect ${lightCore.protectAlpha} effective ${lightCore.effectiveAlpha}`);
}

const darkCore = resolveVeil(
  { tier: 'core', content: 'short', foreground: 'secondary', background: 'unknown', lift: 'rest' },
  { appearance: 'dark', contrast: 'standard', reduceTransparency: false, reduceMotion: false, forcedColors: false, backdropFilter: true },
);
if (darkCore.protectAlpha !== 0.55 || Math.abs(darkCore.effectiveAlpha - 0.82) > 0.001) {
  failures.push(`dark core secondary protect ${darkCore.protectAlpha} effective ${darkCore.effectiveAlpha}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

if (check) {
  const current = await readFile(output, 'utf8').catch(() => '');
  const currentFonts = await readFile(fontsOutput, 'utf8').catch(() => '');
  if (current !== css || currentFonts !== fontsCss) {
    console.error('foundations CSS is out of date. Run npm run tokens:build.');
    process.exit(1);
  }
  console.log('foundations css and contrast checks passed');
} else {
  await writeFile(output, css);
  await writeFile(fontsOutput, fontsCss);
  console.log('wrote', output);
  console.log('wrote', fontsOutput);
}
