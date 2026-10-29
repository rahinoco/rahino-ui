import assert from 'node:assert/strict';
import { json } from './lib.mjs';
import { renderColorReview } from './color-review.mjs';

// Structural token checks live in check.mjs. This module owns contrast policy:
// approved usage pairs must pass, and known below-target pairs are diagnostics only.
const pairKey = pair => [pair.appearance, pair.contrast, pair.family, pair.foreground, pair.background].join(' | ');

export async function checkContrastPolicy({ darkFocusOnSurfaces }) {
  const registry = await json('known-contrast-exceptions.json');
  const approved = new Set(registry.approvedUsageFamilies);
  const exceptions = registry.exceptions;

  assert.deepEqual(exceptions.filter(entry => approved.has(entry.family)).map(pairKey), [], 'Approved usage families cannot be listed as known contrast exceptions.');

  const review = await renderColorReview();
  const tests = review.data.contexts.flatMap(context => context.tests.map(test => ({ appearance: context.appearance, contrast: context.contrast, ...test })));
  const failing = tests.filter(test => !test.passes);
  const known = new Set(exceptions.map(pairKey));

  assert.deepEqual(failing.filter(test => !known.has(pairKey(test))).map(pairKey), [], 'Unregistered below-target contrast pair.');
  assert.deepEqual(exceptions.filter(entry => !failing.some(test => pairKey(test) === pairKey(entry))).map(pairKey), [], 'Known contrast exception passes or no longer exists; remove it from known-contrast-exceptions.json.');

  // Dark focus is also measured on surfaces outside the neutral review set.
  const registeredFocus = new Set(exceptions.filter(entry => entry.appearance === 'dark' && entry.family === 'Focus on neutral parent' && entry.foreground === 'rds.color.focus.ring').map(entry => entry.background));
  const unregisteredFocus = Object.entries(darkFocusOnSurfaces).filter(([surface, ratio]) => ratio < 3 && !registeredFocus.has(`rds.color.surface.${surface}`)).map(([surface]) => surface);
  assert.deepEqual(unregisteredFocus, [], 'Dark focus ring below 3:1 on an unregistered surface.');

  return {
    reviewedPairs: tests.length,
    approvedPairsChecked: tests.filter(test => approved.has(test.family)).length,
    approvedPairsFailing: failing.filter(test => approved.has(test.family)).length,
    knownDiagnosticExceptions: exceptions.length,
    unregisteredFailures: 0,
  };
}
