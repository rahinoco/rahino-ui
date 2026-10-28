# RDS — Veil & Shadow Foundations

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

Veil creates **translucency and background blur**. Shadow creates **visual elevation**. They are separate systems: a component may use either, both, or neither, depending on its behavior.

Dialogs, menus, popovers and floating toolbars use opaque `rds.color.surface.raised` by default. Glass is an explicit component choice on controlled backdrops, with final text/state contrast checks and an opaque fallback when blur is unavailable, transparency is reduced or increased contrast is required.

## Veil tokens

Each veil **group** contains two tokens: `.color` is a theme-specific fill with alpha already included; `.blur` is a backdrop-blur dimension. Higher levels are more opaque and use less blur. A group organizes the two settings; it is not itself a token.

<!-- rds:generated:veil:start -->
| Group | Role | Light | Dark | Blur | Recommended use |
| --- | --- | --- | --- | --- | --- |
| `rds.veil.100` | Atmospheric | `#FFFFFF / 4%` | `#2B2B2B / 4%` | 64px | Decorative glass, subtle background effects, non-interactive layers. |
| `rds.veil.200` | Ambient | `#FFFFFF / 18%` | `#252525 / 18%` | 48px | Background overlays and atmospheric floating layers. |
| `rds.veil.300` | Lightweight | `#FFFFFF / 52%` | `#1A1918 / 56%` | 36px | Opt-in glass for short labels and simple overlays on controlled backdrops; validate final contrast and provide an opaque fallback. |
| `rds.veil.400` | Functional | `#FFFFFF / 72%` | `#1A191B / 76%` | 24px | Opt-in glass for toolbars, navigation flyouts, dropdowns and popovers on controlled backdrops; opaque raised surfaces remain the default. |
| `rds.veil.500` | Focused | `#FFFFFF / 92%` | `#1A191B / 92%` | 16px | Opt-in glass for content-rich panels, expanded navigation and modals on controlled backdrops; opaque raised surfaces remain the default. |
| `rds.veil.scrim` | Scrim | `#140C11 / 52%` | `#2B2529 / 52%` | 24px | Blurred background overlay behind floating modals. |
<!-- rds:generated:veil:end -->

### Public token paths

<!-- rds:generated:veilPaths:start -->
| Token | Light reference | Dark reference |
| --- | --- | --- |
| `rds.veil.100.color` | `ref.color.white-alpha-4` | `ref.color.gray.825-alpha-4` |
| `rds.veil.100.blur` | `ref.blur.64` | `ref.blur.64` |
| `rds.veil.200.color` | `ref.color.white-alpha-18` | `ref.color.gray.875-alpha-18` |
| `rds.veil.200.blur` | `ref.blur.48` | `ref.blur.48` |
| `rds.veil.300.color` | `ref.color.white-alpha-52` | `ref.color.gray-warm.900-alpha-56` |
| `rds.veil.300.blur` | `ref.blur.36` | `ref.blur.36` |
| `rds.veil.400.color` | `ref.color.white-alpha-72` | `ref.color.gray.925-alpha-76` |
| `rds.veil.400.blur` | `ref.blur.24` | `ref.blur.24` |
| `rds.veil.500.color` | `ref.color.white-alpha-92` | `ref.color.gray.925-alpha-92` |
| `rds.veil.500.blur` | `ref.blur.16` | `ref.blur.16` |
| `rds.veil.scrim.color` | `ref.color.gray-warm.950-alpha-52` | `ref.color.gray-warm.850-alpha-52` |
| `rds.veil.scrim.blur` | `ref.blur.24` | `ref.blur.24` |
<!-- rds:generated:veilPaths:end -->

For example, `rds.veil.400` is the Functional group; apply `rds.veil.400.color` as `background-color` and `rds.veil.400.blur` as the `backdrop-filter` blur radius. CSS variable names are `--rds-veil-400-color` and `--rds-veil-400-blur`.

The 2026-10-28 update changes opaque gray swatches; the supplied alpha variants retain their existing values. For example, `ref.color.gray.925-alpha-76` and `ref.color.gray.925-alpha-92` remain separate raw references rather than inheriting a new RGB value from opaque `ref.color.gray.925`. The veil and shadow tables therefore retain their approved values. Recheck the final composite over updated opaque surfaces in consuming components.

**Veil rules**

- Apply the color as `background-color` and blur as `backdrop-filter: blur(...)`. Opacity is already in the color; **do not** set CSS `opacity` on the whole component.
- Use `100–200` mainly for decoration; use `300` only on controlled backgrounds. Check contrast for readable or interactive content on `400–500`.
- Provide an opaque fallback when blur is unavailable or transparency is reduced. Validate text, icons and controls against the actual background.
- `rds.veil.scrim` is a **group** for a blurred scrim treatment. Its `rds.veil.scrim.color` token is separate from `rds.color.scrim.modal`; keep the treatments distinct.

## Shadow tokens

All shadows use black, with `x = 0` and `spread = 0`. Only offset, blur and opacity change by level and theme.

<!-- rds:generated:shadow:start -->
| Token | Role | Y / Blur | Light opacity | Dark opacity | Recommended use |
| --- | --- | --- | --- | --- | --- |
| `rds.shadow.sm` | Subtle elevation | 2px / 6px | 6% | 14% | Raised cards when elevation is needed, interactive card hover, sticky headers/toolbars above scrolling content, and buttons whose elevation is explicitly part of their component recipe. |
| `rds.shadow.md` | Contextual floating surfaces | 8px / 20px | 10% | 20% | Dropdown menus, select menus, popovers, date pickers, autocomplete panels, floating tooltips, and toasts. |
| `rds.shadow.lg` | Modal elevation | 16px / 36px | 14% | 26% | Large navigation flyouts, modal and confirmation dialogs, expanded contextual panels, and non-modal floating drawers. |
<!-- rds:generated:shadow:end -->

### Shadow references

<!-- rds:generated:shadowRefs:start -->
| Token | Part | Light reference / value | Dark reference / value |
| --- | --- | --- | --- |
| `rds.shadow.sm` | offsetX | `ref.shadow.offset.0`<br>`0px` | `ref.shadow.offset.0`<br>`0px` |
| `rds.shadow.sm` | offsetY | `ref.shadow.offset.2`<br>`2px` | `ref.shadow.offset.2`<br>`2px` |
| `rds.shadow.sm` | blur | `ref.shadow.blur.6`<br>`6px` | `ref.shadow.blur.6`<br>`6px` |
| `rds.shadow.sm` | spread | `ref.shadow.spread.0`<br>`0px` | `ref.shadow.spread.0`<br>`0px` |
| `rds.shadow.sm` | color | `ref.color.black-alpha-6`<br>`rgb(0 0 0 / 0.06)` | `ref.color.black-alpha-14`<br>`rgb(0 0 0 / 0.14)` |
| `rds.shadow.md` | offsetX | `ref.shadow.offset.0`<br>`0px` | `ref.shadow.offset.0`<br>`0px` |
| `rds.shadow.md` | offsetY | `ref.shadow.offset.8`<br>`8px` | `ref.shadow.offset.8`<br>`8px` |
| `rds.shadow.md` | blur | `ref.shadow.blur.20`<br>`20px` | `ref.shadow.blur.20`<br>`20px` |
| `rds.shadow.md` | spread | `ref.shadow.spread.0`<br>`0px` | `ref.shadow.spread.0`<br>`0px` |
| `rds.shadow.md` | color | `ref.color.black-alpha-10`<br>`rgb(0 0 0 / 0.10)` | `ref.color.black-alpha-20`<br>`rgb(0 0 0 / 0.20)` |
| `rds.shadow.lg` | offsetX | `ref.shadow.offset.0`<br>`0px` | `ref.shadow.offset.0`<br>`0px` |
| `rds.shadow.lg` | offsetY | `ref.shadow.offset.16`<br>`16px` | `ref.shadow.offset.16`<br>`16px` |
| `rds.shadow.lg` | blur | `ref.shadow.blur.36`<br>`36px` | `ref.shadow.blur.36`<br>`36px` |
| `rds.shadow.lg` | spread | `ref.shadow.spread.0`<br>`0px` | `ref.shadow.spread.0`<br>`0px` |
| `rds.shadow.lg` | color | `ref.color.black-alpha-14`<br>`rgb(0 0 0 / 0.14)` | `ref.color.black-alpha-26`<br>`rgb(0 0 0 / 0.26)` |
<!-- rds:generated:shadowRefs:end -->

**Shadow rules**

- **No shadow by default.** Ordinary cards, table rows, inputs and layout containers primarily use surface contrast and spacing.
- Choose elevation by **behavior**, not size. A small dropdown can need `md`; a large static card can need none.
- Use `lg` for modal and confirmation dialogs. It is the maximum shadow level for modal and non-modal elements. The scale contains only `sm`, `md` and `lg`.
- Use **one shadow token per surface**; do not stack shadow levels.
- **Shadow ≠ z-index:** shadow shows elevation; z-index sets stacking order.

## Extension guidelines

- Keep **veil** (`color` + `blur`) and **shadow** (`box-shadow`) as independent foundations. Combine them only in component recipes that need both.
- Use the existing token levels before adding new ones; introduce a token only for a distinct, repeatable purpose.
- Preserve light/dark pairs and document every new token with its use cases, exclusions and accessibility considerations.
- Treat the master collection as the canonical value source; TypeScript, CSS and marked documentation tables are generated outputs.
