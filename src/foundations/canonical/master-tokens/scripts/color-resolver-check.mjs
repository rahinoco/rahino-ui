import assert from 'node:assert/strict';
import { json, resolve } from './lib.mjs';
import { loadModel, runtimeValue } from './foundations.mjs';
import { resolveContext } from './context.mjs';
import { forcedColorFor } from './color-policy.mjs';
import { resolveColor, resolveColorContext, applyColorPreferences } from '../generated/color-resolver.mjs';

export async function checkColorResolver() {
  const model = await loadModel();
  const policy = await json(model.manifest.contextPolicy.policyFile);
  const paths = [...model.contexts.light].filter(([, t]) => t.$type === 'color').map(([p]) => p);
  let contexts = 0, checked = 0;
  for (const appearance of ['system', 'light', 'dark']) for (const contrast of ['system', 'standard', 'more']) {
    for (const systemAppearance of ['light', 'dark']) for (const systemContrast of ['standard', 'more']) for (const forcedColors of [false, true]) {
      const settings = { appearance, contrast }, environment = { appearance: systemAppearance, contrast: systemContrast, forcedColors };
      const old = resolveContext(settings, environment), current = resolveColorContext(settings, environment);
      assert.deepEqual(current, { appearance: old.appearance, contrast: old.contrast }, 'Resolver changed approved context precedence');
      const tokens = new Map(model.contexts[current.appearance]);
      if (current.contrast === 'more') for (const [p, alias] of Object.entries(policy.contrast.enhancedOverrides[current.appearance])) tokens.set(p, { ...tokens.get(p), $value: alias });
      for (const p of paths) {
        const t = resolve(tokens, p);
        const expected = forcedColors && p.startsWith('rds.') ? forcedColorFor(p) : runtimeValue(t.$type, t.$value);
        assert.equal(resolveColor(p, current), expected, `Incorrect resolved color: ${p}`);
        checked++;
      }
      contexts++;
    }
  }
  assert.deepEqual(resolveColorContext(), { appearance: 'light', contrast: 'standard' }, 'SSR fallback must remain stable');
  assert.throws(() => applyColorPreferences(), /document root/, 'Importing is safe without a DOM; applying preferences requires one');
  assert.throws(() => resolveColor('missing.color'), RangeError);
  assert.throws(() => resolveColor('__proto__'), RangeError);
  assert.throws(() => resolveColor('rds.space.100'), RangeError);
  assert.throws(() => resolveColor('rds.color.surface.base', { appearance: 'system', contrast: 'standard' }), TypeError);
  assert.throws(() => resolveColorContext({ appearance: 'sepia' }), TypeError);
  assert.throws(() => resolveColorContext({ contrast: 'forced-colors' }), TypeError);
  assert.throws(() => resolveColorContext({ theme: 'dark' }), TypeError);
  assert.equal(resolveColor('rds.color.brand.bg.hover', { appearance: 'light', contrast: 'forced-colors' }), 'Canvas');
  assert.equal(resolveColor('rds.color.brand.fg', { appearance: 'dark', contrast: 'forced-colors' }), 'CanvasText');
  assert.equal(resolveColor('rds.color.ink.on-brand', { appearance: 'dark', contrast: 'forced-colors' }), 'ButtonText');
  assert.equal(resolveColor('rds.color.action.primary.fg', { appearance: 'light', contrast: 'forced-colors' }), 'ButtonText');
  return { contexts, colorValuesChecked: checked, serverImportSafe: true };
}
