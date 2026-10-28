# Rahino Design System — Spacing

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

**Status:** Agreed foundation decisions  
**Reference:** [Adobe Spectrum — Layout spacing](https://spectrum.adobe.com/foundations/layout-and-structure/spacing/layout-spacing)

## 1. Reference and shared spacing scale

- **Reference tokens:** `ref.space.<px>` stores the fixed raw value, using its actual size in the name: `ref.space.16` = `16px`.
- **Shared semantic tokens:** `rds.space.<index>` aliases a reference token. Positive indexes match Spectrum's published global spacing numbers; indexes are labels, not pixel values.
- Use the same shared scale for internal component spacing and page layouts. Typical uses are guidance, not predefined component recipes.

<!-- rds:generated:spacing:start -->
| Reference token | Shared semantic token | Value | Typical use |
| --- | --- | --- | --- |
| `ref.space.0` | `rds.space.0` | 0px | Remove spacing. |
| `ref.space.1` | `rds.space.25` | 1px | Exceptional optical adjustments. |
| `ref.space.2` | `rds.space.50` | 2px | Very small internal adjustments. |
| `ref.space.4` | `rds.space.75` | 4px | Tight label relationships. |
| `ref.space.6` | `rds.space.85` | 6px | Fine component spacing. |
| `ref.space.8` | `rds.space.100` | 8px | Icon-label gaps, related elements. |
| `ref.space.12` | `rds.space.200` | 12px | Small component and group gaps. |
| `ref.space.16` | `rds.space.300` | 16px | Fields, small containers. |
| `ref.space.20` | `rds.space.350` | 20px | Intermediate padding. |
| `ref.space.24` | `rds.space.400` | 24px | Standard containers, content groups. |
| `ref.space.32` | `rds.space.500` | 32px | Spacious containers, major groups. |
| `ref.space.40` | `rds.space.600` | 40px | Larger layout separation. |
| `ref.space.48` | `rds.space.700` | 48px | Page sections. |
| `ref.space.56` | `rds.space.750` | 56px | Larger section separation. |
| `ref.space.64` | `rds.space.800` | 64px | Major layout regions. |
| `ref.space.80` | `rds.space.900` | 80px | Large-scale composition. |
| `ref.space.96` | `rds.space.1000` | 96px | Exceptional large layouts. |
<!-- rds:generated:spacing:end -->

All 16 positive mappings match Spectrum. The `0 → 0px` pair preserves Rahino's existing reset and is a Rahino extension; Spectrum's table begins at `25 → 1px`.

Use **1–2px only for exceptional fine adjustments**, not normal layout gaps. Add new reference values only when a real use case justifies them.

In DTCG, `rds.space.300` aliases `{ref.space.16}`. In CSS, `--rds-space-300` references `var(--ref-space-16)`. In TypeScript, `SPACE[16]` remains the raw reference value and `SPACING[300]` references it. Components use shared `rds.space.*` tokens.

## 2. Density

- **Regular** is the default. **Spacious** is optional where useful. **Compact is removed as a named density**.
- **One-step adjustment rule:** To make a component more compact, decrease each spacing token used in its recipe by **one step** on the listed scale (not by arithmetic on token indexes); to make it more spacious, increase each by **one step** (e.g. `12px → 16px`). Apply this when defining and reviewing component recipes, not as an automatic global change. Preserve touch targets and other usability requirements.
- Density applies deliberately to eligible components, collections, or containers; it does **not** automatically affect nested controls.
- Not every component needs both densities. Spacious does not automatically change component sizes, font sizes, or line-heights.

## 3. Usage and responsive behavior

- **Internal spacing:** Component specifications choose padding and gap values from the shared scale, which aliases the reference values.
- **Layout spacing:** Smaller gaps group related content; larger gaps separate independent regions.
- **Reading-paragraph exception:** Consecutive paragraphs in reading content use the text-relative `1em` recipe documented in [Typography](Typography.md#reading-paragraph-spacing). This does not change the fixed spacing scale or interface-element gaps.
- **Responsive:** Primitive values stay fixed. A component or layout may switch between approved values based on available space; prefer container context when practical. Do not create separate mobile/desktop scales.
- **Fluid spacing:** No global `rds.space.fluid` token. A documented layout recipe may use `clamp()` for exceptional page-level needs (e.g. gutters), with approved scale values as endpoints. Ordinary component spacing stays token-based.
- **Accessibility:** Let content grow and reflow under text zoom; maintain usable touch targets and appropriate safe-area spacing.
- **Rahino visual direction:** In mostly borderless interfaces, use spacing, typography, and subtle surface contrast for hierarchy without making data-heavy screens unnecessarily spacious.

## 4. Token architecture

- **Spacing foundation (`Spacing.ts`):** Defines **17 reference tokens** in `SPACE` and **17 shared aliases** in `SPACING`. All physical values are unchanged.
- **Shared layer:** `rds.space.*` uses the Spectrum indexes above and explicitly aliases `ref.space.*`. Keep reference names tied to physical sizes and shared indexes tied to the approved scale.
- **Component specifications:** Reuse the shared spacing layer first. Define component-specific aliases, density recipes, and component sizing rules **as each component is created and validated**, not in advance.

## 5. Naming migration

The previous raw `rds.space.<px>` names move to `ref.space.<px>`. Shared tokens now use `rds.space.<Spectrum index>`; the earlier `rds.spacing.300` alias is superseded by `rds.space.300`. See the complete [old → new mapping](master-tokens/Spacing-Migration.md). These public token/CSS renames require consumer migration before release. The existing TypeScript `SPACE` and `SPACING` export names are retained.
