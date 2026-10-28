# Color resolver and context selection

Use the generated [color-resolver.mjs](master-tokens/generated/color-resolver.mjs) in applications, alongside [tokens.css](master-tokens/generated/tokens.css). TypeScript declarations are included. The resolver and CSS share the selection rules below; edit their settings and enhanced-contrast mappings in [context-policy.json](master-tokens/context-policy.json), then rebuild.

## Application use

```js
import { applyColorPreferences } from './master-tokens/generated/color-resolver.mjs';

const colors = applyColorPreferences({
  appearance: 'system', // or 'light' / 'dark'
  contrast: 'system',   // or 'standard' / 'more'
});

```

Components keep using CSS variables such as `var(--rds-color-surface-base)`. The helper writes only `data-rds-theme` and `data-rds-contrast` on the document root. It follows system changes and preserves unrelated styles, script selection and direction. Repeated setup on the same root reuses one controller.

Change settings through the controller, for example `colors.setPreferences({ appearance: 'dark' })`, so CSS and JavaScript subscribers stay aligned.

Apps save user preferences. Set saved root attributes early, or render them on the server, to avoid an initial wrong-theme flash. Calling `applyColorPreferences()` without settings preserves existing root preferences. Call `colors.dispose()` when tearing down the integration; the chosen CSS settings remain in place.

## JavaScript colors

```js
import { resolveColor, resolveColorContext } from './master-tokens/generated/color-resolver.mjs';

const context = resolveColorContext({ appearance: 'dark', contrast: 'standard' });
const background = resolveColor('rds.color.surface.base', context);
```

`resolveColorContext(preferences, environment)` is browser-independent and safe on the server. Its fallback is light/standard. The browser controller supplies current system preferences automatically through `getContext()`; use `colors.subscribe(context => ...)` to update JavaScript consumers. Subscription calls back immediately and returns an unsubscribe function.

Colors and aliases are resolved during generation. Unknown names and invalid settings throw errors. Use current canonical names; existing foundation exports and legacy CSS variables retain their compatibility behavior. Semantic colors return native keywords such as `Canvas` in forced-colors mode, while raw references retain their fixed values. APIs requiring numeric RGB must obtain the actual system color through the browser.

## Selection rules

| Setting | Rule |
| --- | --- |
| Appearance | Follow the operating system by default. An explicit app choice of light or dark overrides it. Use light when no system preference is available. |
| Contrast | Handle separately from appearance. Native forced colors take priority and use system colors; otherwise an explicit standard/more choice overrides the system contrast preference. |
| Enhanced contrast | Apply the five approved overrides for the selected appearance after shared and appearance tokens. Other roles keep their theme values and require component testing. |
| Language | Select Persian (`fa`) or English (`latin`) explicitly per content run. The code role keeps its monospace override. Fonts, direction and mixed-script segmentation remain application responsibilities. |

The enhanced overrides map `canvas` and `base` to their surface roles, and `primary`, `secondary` and `tertiary` to their ink roles. This is an accessibility override of light/dark, not a third appearance.

Override values follow the active master references. The updated dark enhanced canvas resolves to `#030203` and enhanced base to `#1A181B`; the five target mappings and selection rules are unchanged. See the [generated override table](Color.md#enhanced-contrast-values) for all current values. Enhanced contrast leaves the focus role unchanged, so the dark raised-surface focus finding also applies in that context; see the [current contrast review](output/contrast-review/Contrast-Review.md).

The existing [context.mjs](master-tokens/scripts/context.mjs) remains available for foundation tooling with its original return shape. The public color resolver uses the same selector; the browser helper adds preference listeners. Generated CSS supplies the native forced-color styling and suppresses custom enhanced colors in that context.

Components still select their semantic tokens, interaction states and valid foreground/background pairs. Content scripts, fonts, density, reduced motion, material choices and number formatting remain independent responsibilities.
