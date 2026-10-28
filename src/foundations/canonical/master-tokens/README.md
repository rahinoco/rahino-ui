# Rahino master collection

This is the **canonical local source of truth**, adopted on 2026-10-26. Start with [Master-Token-List.md](Master-Token-List.md).

## Source files

| File | Purpose |
| --- | --- |
| shared.tokens.json | Raw references and shared semantic values. |
| light.tokens.json / dark.tokens.json | Theme-dependent semantic values, including chart colors. |
| typography.json | The 16 semantic text styles: property references, font selection and usage guidance. |
| recipes.json | Paragraph spacing, contrast overrides and the three presentation definitions deferred to design. |
| context-policy.json | System/app theme precedence, enhanced-contrast mappings and explicit script selection. |
| supplementary-decisions.json | Supporting geometry, layout and number-formatting rules, plus calculated contrast records. |
| export-map.json | Existing TypeScript API shapes and bindings to canonical values; it contains no independent design values. |
| decisions.json | Approved decisions and explicitly deferred component, number-profile and presentation work. |

The three token sets use DTCG structures. Text styles use the project structure described once in [Typography](../Typography.md#source-and-format). Supporting rules and policies are separate project records; do not pass these files to a DTCG publisher as token sets.

## Build and verify

Run these from the foundation folder:

~~~powershell
node master-tokens/scripts/build.mjs
node master-tokens/scripts/check.mjs
~~~

Optional browser integration check: `node master-tokens/scripts/browser-check.cjs`. It uses Playwright and an installed Chrome/Edge or Playwright browser. It verifies CSS/resolver parity, preference updates and cleanup, theme/contrast precedence, script scoping, typography, inherited letter spacing and fluid heading bounds.

The build regenerates all nine foundation TypeScript files, the raw reference module, the color resolver and its types, CSS, design-tool handoff data, marked documentation tables and the master list. Edit values and references in JSON; edit explanations in Markdown outside generated table blocks. TypeScript is generated application code with links to its guides.

For text styles, edit `properties` in typography.json: keep an alias such as `{ref.font.size.rem-1}` or the approved fluid CSS expression. There is no separate resolved value to update. Font bindings select Persian, English or code fonts. Foundation guides show semantic tokens, reference chains and resolved values together; use [Colors](../Color.md), [Typography](../Typography.md), [Spacing](../Spacing.md) and the other topic guides for everyday reading.

The normal checker validates the current master: aliases, supported value shapes, complete export coverage, theme selection, contrast calculations and output freshness. It allows intentional edits to canonical values. The build refreshes derived layout and contrast records automatically.

The build also regenerates the [current contrast review](../output/contrast-review/Contrast-Review.md) and its [pair inventory](../output/contrast-review/results.json), plus text and boundary contrast tables in the guides. These calculations use the active palette; earlier rejected proposals and browser results are kept in a [labeled archive](../output/contrast-review/archive/before-color-update-2026-10-28/README.md).

The 2026-10-28 color update changes 15 raw reference values and three dark-theme references. Usage roles, token paths and TypeScript API shapes remain the same. The normal checker currently stops at dark focus on the raised surface: 2.9694:1 against a 3:1 target. Light tertiary text on the sunken surface is also below its ordinary-text target: 4.4442:1 against 4.5:1. The refreshed review additionally finds light control-edge contrast on the sunken surface at 2.9824:1 against 3:1. Generated output freshness and matching source values do not resolve these contrast findings. See the [before/after report](../output/color-value-update/Changes.md).

Historical comparison is separate: `node master-tokens/scripts/check.mjs --audit-adoption` checks the original adoption values and amendment hashes. Differences after intentional edits are expected; do not rewrite historical snapshots to make this audit pass.

For ordinary edits, change `$value` in the appropriate source JSON and run build, then check. Change a raw reference to affect all roles using it; change a semantic alias to repoint just that role. Descriptions can be edited in `$description`. Adding or renaming public paths also requires updating their aliases and output bindings in export-map.json.

## Use the outputs

- Existing imports from Color.ts, Typography.ts, Spacing.ts and the other foundations retain their exports and object shapes; resolved values follow the current master.
- [generated/reference.ts](generated/reference.ts) exports every raw reference under its full path.
- [generated/tokens.css](generated/tokens.css) provides raw and semantic variables plus complete typography classes such as .rds-type-body-md.
- [generated/color-resolver.mjs](generated/color-resolver.mjs) provides `resolveColorContext`, `resolveColor` and `applyColorPreferences`, with TypeScript declarations. Importing is safe without a browser; preference application is opt-in. See the [resolver guide](../Rahino-Resolver.md#application-use).
- [generated/design-map.json](generated/design-map.json) records slash-separated design names and typed light/dark values. It is handoff data, not a Figma API payload or an uploaded library.

Load fonts in the consuming app. On the document root, set data-rds-theme to light, dark or system, and data-rds-contrast to standard, more or system. Omit these settings to follow the system. Native forced colors take precedence. Use data-rds-script=fa or latin on content containers; code keeps its monospace font. Apply the paragraph-gap variable explicitly between adjacent reading paragraphs.

See [context selection](../Rahino-Resolver.md) and [Typography](../Typography.md) for usage rules. No component behavior, script detection, number precision or new presentation artwork is inferred by the build.

## Naming and migrations

Color references use stable hue families and sparse steps from light to dark. These are Rahino palette IDs inspired by Spectrum; their values do not match Adobe's palette automatically. Alpha suffixes record opacity. Fixed raw references do not reverse between themes.

Chart colors use rds.color.data.*; presentation recipes use rds.color.presentation.gradient.*. Three shadow levels remain: sm, md and lg. The former wide reading name remains a deprecated alias to the 42rem reading cap.

Color state families use a separate final state segment, following `rds.color.action.primary.bg.hover`. Repository token-name updates:

| Previous path | Current path |
| --- | --- |
| `rds.color.brand.bg` | `rds.color.brand.bg.default` |
| `rds.color.brand.bg-hover` | `rds.color.brand.bg.hover` |
| `rds.color.interaction.selected.surface` | `rds.color.interaction.surface.selected` |

The state-name migration preserved values and existing TypeScript exports/keys at the time of the rename. Later color-value changes are recorded separately. Old CSS variable names remain supported through aliases; the hover CSS name is identical after flattening. Use current paths for JSON and design-tool names. Exact mappings are in [state-name-migration.json](state-name-migration.json).

- [Semantic color names](Semantic-Color-Migration.md)
- [Raw color names](Color-Reference-Migration.md)
- [Spacing names](Spacing-Migration.md)
- [Shadow removal](Shadow-Migration.md)

Historical baseline and migration JSON files are audit receipts, not current value sources. Original hashes and value snapshots are retained; approved amendments and rename maps explain later changes. Capture provenance is stored separately from current generated source locations.

## Product launch

Local foundation adoption and documentation cleanup are complete. Component accessibility and identifying cues, application integration, external consumer migration, number-profile implementation and presentation design remain product work. Motion's Figma phase is complete; Qipper implementation testing remains pending. The three presentation expressions are preserved in the existing TypeScript API, but their deferred CSS tokens and automatic background switching are not published by this build.

Validation does not certify every component or arbitrary foreground/background pairing. A TypeScript compiler check and consuming-app tests are separate from runtime export preservation.

## References

- [Rahino tokenization policy](../Rahino-Tokenization.md)
- [DTCG Format 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- [Spectrum design tokens](https://spectrum.adobe.com/foundations/design-data/design-tokens)
- [Spectrum spacing scale](https://spectrum.adobe.com/foundations/layout-and-structure/spacing/layout-spacing)
