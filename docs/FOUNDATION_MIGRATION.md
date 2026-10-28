# Foundation adoption — 2026-10-26 master

Current source synchronization: [2026-10-28 update and validation findings](FOUNDATION_UPDATE_2026-10-28.md). The original adoption below remains historical; the current snapshot is recorded in FOUNDATION_MANIFEST.

The foundation folder supplied by the owner was adopted into `src/foundations/canonical/`. The source folder outside these repos is unchanged. The snapshot date comes from its README; it is not a newly invented semantic package release. The package remains 0.1.0 and unpublished.

## Source and generation

Edit the JSON in `src/foundations/canonical/master-tokens/`. Edit explanatory Markdown outside generated table markers. Run `npm run tokens:build`; verify with `npm run tokens:check`, `npm run test:foundations`, `npm run typecheck` and `npm run build`.

The supplied generator and validator remain in that collection. Historical baselines, amendments, deferred decisions and provenance are retained. Integration generates shared CSS, installed-font registration, compatibility CSS and the guide text exported to the documentation frontend.

## Public migration

| Previous use | Current use |
| --- | --- |
| Handwritten colors in color.ts | Generated canonical/Color.ts, re-exported by color.ts |
| SPACE_REF and per-gap foundation roles | SPACE raw values and SPACING global indexes |
| Named radius presets | RADIUS[0/4/8/12/16/24] |
| rest / float / raise / modal elevation | SHADOW.sm / md / lg; modal uses lg |
| trace / air / core / shelter / opaque Veil | VEIL['100'/'200'/'300'/'400'/'500'], each with color and blur |
| Synthetic protective film / guaranteed alpha floor | Actual theme-specific color alpha; validate the background or use an opaque component fallback |
| Different Persian/Latin line metrics | Identical semantic metrics, explicit script font selection |
| Separate wide reading cap | One 42rem reading cap; old wide name aliases it |
| Default percentage input interpretation | Explicit ratio or percent input |
| Implicit .dark-only foundations | data-rds-theme and data-rds-contrast, kept in sync by ThemeProvider |

New APIs are exported from the package root and the foundations subpath. Existing import paths color.ts, type.ts and metrics.ts are adapters. They contain no alternative canonical palette.

## Compatibility and boundaries

Deprecated CSS mappings and legacy component request names remain only where existing component and Brand Book consumers need them. `compatibility-map.json` records name mappings, not independent design values. Retire these adapters in the next breaking package release after all consumers have migrated. No removed shadow.xlg alias is published.

Four fixed historical Brand Book artwork colors remain in `brandbook-legacy-palette.css`; they are not new foundation tokens and are not used by the Rahino product theme. Brand identity artwork was not redesigned as part of this adoption.

Existing control-size, density and layering constants are component integration recipes, not newly approved shared token sets. The canonical source explicitly defers component identifying cues, complete number precision profiles and presentation design. This migration does not declare those areas or all product components approved.

The VeilPanel component uses an opaque raised-surface fallback for unvalidated essential text over unknown backgrounds, decorative-only levels carrying essential text, enhanced contrast, reduced transparency, missing blur support and native forced colors. That is a component fallback policy; no new alpha floor is attributed to the source collection.

## Documentation

All ten foundation pages consume the library's generated values. Their complete source guides are exported from the same master to prevent documentation tables drifting. The frontend keeps existing navigation structure and uses the current tokens in its interactive examples.

## Verification

The supplied canonical checker validates typed values, aliases, derived records and generated outputs. Runtime tests compare context selection with the source selector and exercise both appearances, fallbacks and formatting. Browser checks cover all ten routes at desktop, 390px and 320px, keyboard focus, font loading, native forced colors and reduced motion. `rahino-ui-frontend/scripts/check-foundation-site.cjs` serves the production build on a temporary local port and writes screenshots to the OS temporary directory. It uses an installed Playwright and browser (or RAHINO_PLAYWRIGHT_PATH / RAHINO_CHROME_PATH).

The editable Glass & Shadow playground remains a labeled simplified experiment, seeded from the master; its one-blur model is not the per-level canonical contract.

## Rollback

Revert the coordinated foundation-adoption changes in both repositories together and rebuild. Preserve unrelated local edits; no deployment, commit, package publication or changes to the external source folder are performed by this migration.
