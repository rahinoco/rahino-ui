import policy from './canonical/master-tokens/context-policy.json' with { type: 'json' };
import { resolveColorContext, type ColorEnvironment, type ColorPreferences } from './canonical/master-tokens/generated/color-resolver.mjs';

export { resolveColorContext, resolveColor, applyColorPreferences } from './canonical/master-tokens/generated/color-resolver.mjs';
export type { ColorTokenName, ColorPreferences, ColorEnvironment, ColorContext, ColorPreferenceController } from './canonical/master-tokens/generated/color-resolver.mjs';
export interface FoundationSettings extends ColorPreferences { script?: 'fa' | 'latin'; }
export interface FoundationEnvironment extends ColorEnvironment {}

/** Legacy tooling shape backed by the generated public color selector. */
export function resolveContext(settings: FoundationSettings = {}, environment: FoundationEnvironment = {}) {
  if (settings.script !== undefined && !policy.language.supportedScripts.includes(settings.script)) throw new TypeError('Script must be explicitly fa or latin.');
  const { appearance, contrast } = resolveColorContext({ appearance: settings.appearance, contrast: settings.contrast }, environment);
  return {
    appearance, contrast, script: settings.script ?? null, setsInOrder: ['shared', appearance],
    overrides: contrast === 'more' ? { ...policy.contrast.enhancedOverrides[appearance] } : {},
    useSystemColors: contrast === 'forced-colors',
  };
}
