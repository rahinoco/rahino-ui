import assert from 'node:assert/strict';
import { resolveContext, resolveColor, resolveColorContext } from '../src/foundations/context.ts';
import { resolveContext as referenceContext } from '../src/foundations/canonical/master-tokens/scripts/context.mjs';
import { resolveVeil } from '../src/foundations/resolveVeil.ts';
import { VEIL, SHADOW, liftShadow, SPACING, RADIUS } from '../src/foundations/metrics.ts';
import { TYPOGRAPHY_BY_SCRIPT, TEXT_LAYOUT } from '../src/foundations/type.ts';
import { parseColor } from '../src/foundations/contrast.ts';
import { formatMoneyDisplay, formatPercent } from '../src/foundations/format.ts';

let contexts = 0, treatments = 0;
for (const appearance of [undefined, 'system', 'light', 'dark']) for (const contrast of [undefined, 'system', 'standard', 'more']) {
  for (const systemAppearance of [undefined, 'light', 'dark']) for (const systemContrast of [undefined, 'standard', 'more']) for (const forcedColors of [false,true]) {
    const settings = { ...(appearance && { appearance }), ...(contrast && { contrast }) };
    const environment = { appearance: systemAppearance, contrast: systemContrast, forcedColors };
    assert.deepEqual(resolveContext(settings, environment), referenceContext(settings, environment));
    contexts++;
  }
}
for (const appearance of ['light','dark']) for (const tier of ['100','200','300','400','500']) {
  const request = { tier, content: 'decoration', foreground: 'primary', background: 'controlled', lift: 'none' };
  const environment = { appearance, contrast: 'standard', reduceTransparency: false, reduceMotion: false, forcedColors: false, backdropFilter: true };
  const result = resolveVeil(request, environment);
  assert.equal(result.film, VEIL[tier].color[appearance]);
  assert.equal(result.blur, VEIL[tier].blur);
  assert.equal(result.effectiveAlpha, parseColor(result.film)[3]);
  assert.equal(result.protectAlpha, 0, 'Do not carry over obsolete protective films');
  for (const patch of [{ reduceTransparency: true }, { backdropFilter: false }, { forcedColors: true }, { contrast: 'more' }]) {
    const fallbackEnvironment = { ...environment, ...patch };
    const fallback = resolveVeil(request, fallbackEnvironment);
    assert.equal(fallback.renderPath, 'plain');
    assert.equal(fallback.film, resolveColor('rds.color.surface.raised', resolveColorContext({ appearance, contrast: fallbackEnvironment.contrast }, { forcedColors: fallbackEnvironment.forcedColors })));
  }
  assert.equal(resolveVeil({ ...request, content: 'short', background: 'unknown' }, environment).renderPath, 'plain');
  treatments++;
}
for (const appearance of ['light','dark']) {
  assert.equal(liftShadow('modal',appearance), SHADOW.lg[appearance]);
  assert.equal(liftShadow('none',appearance), 'none');
}
assert.throws(() => resolveColor('rds.color.brand.bg'), RangeError);
assert.throws(() => resolveColor('rds.color.interaction.selected.surface'), RangeError);
assert.equal(resolveColor('rds.color.brand.bg.default', { appearance: 'dark', contrast: 'standard' }), '#321A29');
assert.equal(SPACING[300], '16px');
assert.equal(RADIUS[8], '8px');
assert.equal(TEXT_LAYOUT.measure.reading, TEXT_LAYOUT.measure.wide);
assert.equal(TEXT_LAYOUT.gap.paragraph, '1em');
for (const [role, fa] of Object.entries(TYPOGRAPHY_BY_SCRIPT.fa)) {
  const latin = TYPOGRAPHY_BY_SCRIPT.latin[role];
  assert.equal(fa.fontSize, latin.fontSize);
  assert.equal(fa.lineHeight, latin.lineHeight);
  assert.equal(fa.fontWeight, latin.fontWeight);
  assert(!Object.hasOwn(fa, 'letterSpacing'), 'Text roles must preserve inherited letter spacing');
}
assert.equal(formatMoneyDisplay(0,'toman').value,'۰');
assert.equal(formatMoneyDisplay(null,'toman').missing,true);
assert.equal(formatMoneyDisplay(-12500,'usd').value,'−۱۲٬۵۰۰');
assert.equal(formatPercent(.18,'ratio'), '۱۸٪');
assert.equal(formatPercent(18,'percent'), '۱۸٪');
assert.throws(()=>formatPercent(18), TypeError);
console.log(JSON.stringify({ validation: 'PASS', contexts, veilTreatments: treatments, typographyRoles: Object.keys(TYPOGRAPHY_BY_SCRIPT.fa).length, scope: 'Context precedence, canonical treatment fidelity, opaque fallbacks, script metrics, formatting and migrated shadows.' },null,2));
