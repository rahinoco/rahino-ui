import { json, resolve } from './lib.mjs';
import { loadModel, runtimeValue } from './foundations.mjs';
import { selectContext, forcedColorFor } from './color-policy.mjs';
import { createColorResolver } from './color-resolver-runtime.mjs';

export async function renderColorResolver(model) {
  model ??= await loadModel();
  const policy = await json(model.manifest.contextPolicy.policyFile);
  const paths = [...model.contexts.light].filter(([, t]) => t.$type === 'color').map(([p]) => p);
  const shared = {}, palettes = {}, forced = {};
  for (const p of paths.filter(p => p.startsWith('ref.'))) shared[p] = model.value(p);
  for (const appearance of ['light', 'dark']) {
    const context = new Map(model.contexts[appearance]);
    const standard = Object.fromEntries(paths.filter(p => p.startsWith('rds.')).map(p => [p, model.value(p, appearance)]));
    for (const [p, alias] of Object.entries(policy.contrast.enhancedOverrides[appearance])) {
      if (context.get(p)?.$type !== 'color') throw new Error(`Invalid enhanced color target: ${p}`);
      context.set(p, { ...context.get(p), $value: alias });
    }
    const more = {};
    for (const p of Object.keys(standard)) {
      const token = resolve(context, p), value = runtimeValue(token.$type, token.$value);
      if (value !== standard[p]) more[p] = value;
      forced[p] = forcedColorFor(p);
    }
    palettes[appearance] = { standard, more };
  }
  const data = { policy, shared, palettes, forced };
  const module = [
    '/** Generated color resolver. Edit master JSON or generator sources and rebuild. Guide: ../../Rahino-Resolver.md. */',
    `const data = ${JSON.stringify(data, null, 2)};`,
    // Function source keeps the checkout's line endings; normalize so generated output is platform-independent.
    selectContext.toString().replaceAll('\r\n', '\n'), createColorResolver.toString().replaceAll('\r\n', '\n'),
    'const resolver = createColorResolver(data, selectContext);',
    'export const resolveColorContext = resolver.resolveColorContext;',
    'export const resolveColor = resolver.resolveColor;',
    'export const applyColorPreferences = resolver.applyColorPreferences;', '',
  ].join('\n\n');
  const declarations = `/** Generated public types for color-resolver.mjs. */
export type ColorTokenName =\n${paths.map(p => '  | ' + JSON.stringify(p)).join('\n')};
export interface ColorPreferences {
  appearance?: 'system' | 'light' | 'dark';
  contrast?: 'system' | 'standard' | 'more';
}
export interface ColorEnvironment {
  appearance?: 'light' | 'dark';
  contrast?: 'standard' | 'more';
  forcedColors?: boolean;
}
export interface ColorContext {
  readonly appearance: 'light' | 'dark';
  readonly contrast: 'standard' | 'more' | 'forced-colors';
}
export interface ColorPreferenceController {
  getContext(): ColorContext;
  getPreferences(): Readonly<Required<ColorPreferences>>;
  setPreferences(patch: ColorPreferences): void;
  /** Calls the listener immediately, then whenever the resolved context changes. */
  subscribe(listener: (context: ColorContext) => void): () => void;
  /** Stops subscriptions; leaves the chosen CSS settings in place. */
  dispose(): void;
}
export function resolveColorContext(preferences?: ColorPreferences, environment?: ColorEnvironment): ColorContext;
/** Returns a CSS color string, including system-color keywords in forced-colors mode. */
export function resolveColor(tokenName: ColorTokenName, context?: ColorContext): string;
/** Uses the document root; does not store preferences or load styles. */
export function applyColorPreferences(preferences?: ColorPreferences, options?: { root?: HTMLElement }): ColorPreferenceController;
`;
  return { 'master-tokens/generated/color-resolver.mjs': module, 'master-tokens/generated/color-resolver.d.mts': declarations };
}
