import { resolveColor, resolveColorContext } from './canonical/master-tokens/generated/color-resolver.mjs';
import { parseColor } from './contrast.ts';

const luminance = (rgb: number[]) => rgb.map(value => {
  const channel = value / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}).reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a: number[], b: number[]) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);

/** Integration diagnostics supplement the source's opaque-pair report; they do not change token values or targets. */
export function calculateInteractionContrast() {
  const tests = [];
  for (const appearance of ['light', 'dark'] as const) for (const contrast of ['standard', 'more'] as const) {
    const context = resolveColorContext({ appearance, contrast });
    for (const surface of ['canvas', 'base', 'subtle', 'raised', 'sunken'] as const) for (const state of ['hover', 'pressed'] as const) {
      const backgroundName = `rds.color.surface.${surface}` as const;
      const overlayName = `rds.color.interaction.neutral.${state}` as const;
      const background = parseColor(resolveColor(backgroundName, context));
      const overlay = parseColor(resolveColor(overlayName, context));
      const composite = background.slice(0, 3).map((value, i) => overlay[i] * overlay[3] + value * (1 - overlay[3]));
      for (const ink of ['primary', 'secondary'] as const) {
        const foreground = `rds.color.ink.${ink}` as const;
        const actual = ratio(parseColor(resolveColor(foreground, context)).slice(0, 3), composite);
        tests.push({ appearance, contrast, foreground, background: backgroundName + ' + ' + overlayName, ratio: actual, threshold: 4.5, passes: actual >= 4.5 });
      }
    }
  }
  return { scope: 'Integration calculations for primary/secondary text on neutral hover/pressed composites; native forced colors and actual component adjacency require browser checks.', checkedPairs: tests.length, failures: tests.filter(test => !test.passes) };
}
