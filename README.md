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

Inventory, comparison registry, and design decisions are exported from the same package so the documentation workbench cannot drift:

```ts
import { INVENTORY, COMPARISON_REGISTRY, DECISIONS } from '@rahinoco/rahino-ui';
```

## Docs workbench

`rahino-ui-frontend` (Storybook) at [design.rahino.co](https://design.rahino.co) — consumes this library. Do not reimplement components there.

## Next phase

Qippo Figma via MCP → Comparison Lab → human decision → update this library.
