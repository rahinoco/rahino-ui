# @rahinoco/rahino-ui

Phase 1 candidate UI library for Rahino products (Qippo, Qipper, Digix).

This is **not** the final Design System. It is a clean extraction of reusable Qipper UI so the team can compare it against Qippo Figma, component by component.

## What this package is

- Source of truth for **implementation** during Phase 1
- Shared component **behavior / API / accessibility**
- Token-based **product visual themes** (`data-product`: `rahino` | `qipper` | `qippo` | `digix`)

Qippo and Digix token slots exist but are empty until those phases.

## What this package is not

- Not a second copy of Qipper
- Not an automatic Figma-to-code dump
- Not a Digix or Qippo migration

## Consume

```ts
import { Button, ThemeProvider } from '@rahinoco/rahino-ui';
import '@rahinoco/rahino-ui/styles.css';
```

`styles.css` imports `@rahinoco/rahino-ui/fonts.css`. That entry is the font loading path (`src/styles/fonts.css`). A package consumer does not use the docs site `/public/fonts` path. Put class `rahino-ui` on the app root for `font-synthesis: none`. Font redistribution license is unknown.

## Adopted foundations

The canonical foundation master supplied by the owner is in `src/foundations/canonical/master-tokens/`. It was adopted locally on 2026-10-26 and synchronized with the edited source on 2026-10-28. Shared/light/dark DTCG JSON and the typography/context policy generate the TypeScript modules, CSS, design handoff data and guide tables. Component approval and package publication remain separate.

Edit values in the master JSON, then run `npm run tokens:build`. Run `npm run tokens:check` to validate aliases, value types, contrast records and generated output freshness. `npm run test:foundations` checks runtime integration and fallback behavior.

Color APIs `resolveColorContext`, `resolveColor` and `applyColorPreferences` are generated from the same collection and are also available at `@rahinoco/rahino-ui/color-resolver`. ThemeProvider uses that controller and follows system preference changes.

New public APIs include `SPACE`, `SPACING`, numeric `RADIUS`, `VEIL`, `SHADOW`, `TYPOGRAPHY_BY_SCRIPT`, `PAGE_GRID` and `resolveContext`. ThemeProvider synchronizes data-rds-theme with existing theme classes. Plain CSS consumers use data-rds-theme=light|dark|system and data-rds-contrast=standard|more|system. Content uses explicit data-rds-script=fa|latin.

See [the migration guide](docs/FOUNDATION_MIGRATION.md) for old-to-new API mappings, compatibility boundaries and rollback.

Inventory, comparison registry, and design decisions are exported from the same package so the documentation workbench cannot drift:

```ts
import { INVENTORY, COMPARISON_REGISTRY, DECISIONS } from '@rahinoco/rahino-ui';
```

## Docs workbench

`rahino-ui-frontend` (Storybook) at [design.rahino.co](https://design.rahino.co) — consumes this library. Do not reimplement components there.

## Next phase

Qippo Figma via MCP → Comparison Lab → human decision → update this library.

The [2026-10-28 change report](docs/FOUNDATION_UPDATE_2026-10-28.md) records every source change and verification result. The supplied palette has known contrast failures: `tokens:check` and the normal release build remain blocked. `tokens:check-generated` checks freshness independently; it does not waive the contrast gate.
