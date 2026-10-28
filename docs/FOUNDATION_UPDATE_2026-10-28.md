# Foundation synchronization — 2026-10-28

The edited `C:/Home/RAHINO/foundation/` collection was compared with the previous repository snapshot before replacement. The external source folder is unchanged. Existing unrelated local changes in both repositories remain in place.

## Exact source differences

- 30 existing source files changed and 9 source files were added.
- 15 raw color values changed, with three additional dark-theme semantic alias changes. These affect 11 resolved light-theme and 10 resolved dark-theme semantic values.
- Three public token paths were renamed. TypeScript exports and object keys remain compatible.
- The generated color resolver and its declarations, runtime, shared selection policy and tests were added.
- Color, border, typography, material, resolver and tokenization guidance was revised. Seven current/historical source reports were imported.
- Of the nine foundation TypeScript modules, only Color.ts has changed runtime values. Spacing, typography metrics, layout geometry, motion, radius, shadows and Veil treatments are unchanged.

The [source before/after tables](../src/foundations/canonical/output/color-value-update/Changes.md) list every raw color change, dark alias change and resolved semantic value. The [machine-readable comparison](FOUNDATION_UPDATE_2026-10-28.json) includes all 39 changed/added source paths, typed raw-value differences and source hashes.

## Renamed paths

| Before | Current |
| --- | --- |
| rds.color.brand.bg | rds.color.brand.bg.default |
| rds.color.brand.bg-hover | rds.color.brand.bg.hover |
| rds.color.interaction.selected.surface | rds.color.interaction.surface.selected |

The source's legacy CSS aliases remain supported. The hover CSS name is unchanged when the dotted path is flattened. Active repository code and documentation now use the canonical paths.

## Propagated changes

In rahino-ui, the master generator, generated styles, compatibility maps, palette exports, snapshot metadata, component surface choices, runtime context and CI checks were updated. The public resolveColorContext, resolveColor and applyColorPreferences APIs are available from the package root, foundations entry and dedicated color-resolver subpath. ThemeProvider uses the supplied controller, follows system changes and keeps existing product classes synchronized. Pure resolution remains safe on the server.

Floating menus, popovers and dialogs use opaque raised surfaces by default. Glass remains an explicit choice with a validated background and opaque fallback. Primary enabled labels keep on-brand ink; neutral interactive content uses full-opacity secondary or primary ink.

In rahino-ui-frontend, all affected values flow from the shared package. The color and border pages show current findings with unrounded threshold evaluation and four-decimal display. The hub includes complete updated source guides, before/after tables and the current contrast review. Saved theme preferences are applied before loading styles, and existing samples use the renamed tokens and revised material guidance.

## Validation and unresolved source findings

Generated-output freshness, runtime integration, TypeScript checks, source color-resolver tests and dedicated CSS/JavaScript browser parity checks pass. The resolver checks cover 72 preference contexts and 14,184 color values. The frontend production build compiles. Browser route checks cover all ten foundation pages at desktop, 390px and 320px, plus system-theme changes, keyboard focus, fonts, forced colors and reduced motion.

The strict source validation and the normal library release-build gate remain failing because of the supplied colors. They have not been weakened or suppressed.

| New failing combination | Ratio | Existing minimum |
| --- | --- | --- |
| Dark focus ring on raised | 2.9694:1 | 3:1 |
| Light tertiary ink on sunken | 4.4442:1 | 4.5:1 |
| Light control edge on sunken | 2.9824:1 | 3:1 |
| Light secondary ink on sunken + neutral pressed overlay | 4.4961:1 | 4.5:1 |

The source's [opaque-pair review](../src/foundations/canonical/output/contrast-review/Contrast-Review.md) records 11 failing context/pair checks, including existing dark-focus findings on success/warning/info parents. The final row above was additionally found by the supplied browser checker and is reproduced by separate [interaction calculations](../src/foundations/interaction-contrast.json) across 80 pairs. These calculations supplement the source report; they do not modify its scope, colors or targets.

The standard checker stops first at dark focus on raised. The full source browser checker stops at the light sunken pressed-text combination. Dedicated resolver/browser integration checks are independent and do not certify those palette combinations.

## Maintenance

Continue editing canonical JSON, policies and generator sources under `src/foundations/canonical/`, then run `npm run tokens:build`.

- `npm run tokens:check-generated`: validate generated-output freshness independently.
- `npm run test:foundations`: verify adapters, material fallbacks, script metrics and formatting.
- `npm run test:color-resolver`: compare generated color resolution with canonical sets.
- `npm run test:color-resolver:browser`: check CSS/JS parity, system changes and controller lifecycle.
- `npm run tokens:check`: retain the full source validation and contrast gate.
- `npm run typecheck`: check package types.
- Frontend: run typecheck, build and `node scripts/check-foundation-site.cjs`.

Correct source colors or approved usage decisions upstream before release. No new palette values, contrast thresholds, component approvals, commits, pushes or deployments were introduced by this synchronization.
