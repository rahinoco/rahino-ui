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

## Rahino color palette

The official RDS colors live in `tokens/Value.tokens.json`, `tokens/Light.tokens.json`, and `tokens/Dark.tokens.json`. `src/styles/rds-colors.css` is generated from those files and loaded by the package's base stylesheet. It exposes every primitive plus light, dark, and appearance-aware semantic CSS variables using the Figma `--rds-color-*` names. The `rahino` product skin maps older `--qipper-*` variables to those RDS colors; the `qipper` skin keeps its existing palette.

When the workspace source JSON files change, run `npm run tokens:sync` in this repo. `npm run tokens:check` verifies the generated CSS and checks the workspace originals when they are present.

Inventory, comparison registry, and design decisions are exported from the same package so the documentation workbench cannot drift:

```ts
import { INVENTORY, COMPARISON_REGISTRY, DECISIONS } from '@rahinoco/rahino-ui';
```

## Docs workbench

`rahino-ui-frontend` (Storybook) at [design.rahino.co](https://design.rahino.co) — consumes this library. Do not reimplement components there.

## Next phase

Qippo Figma via MCP → Comparison Lab → human decision → update this library.
