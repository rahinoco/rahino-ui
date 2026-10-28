# Radius & Rounding

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

Rahino uses restrained rounding for controls and softer corners for larger surfaces. Radius is independent of typography, color, borders, and elevation.

## Radius tokens

All primitive values use `px`. Token names reflect their actual values and remain the same across themes, viewports, and density modes.

<!-- rds:generated:radius:start -->
| Token | Reference | Value | Usage |
| --- | --- | --- | --- |
| `rds.radius.0` | `ref.radius.0` | 0px | Sharp corners, viewport-attached edges, adjoining surfaces, and precision-oriented elements where rounding is inappropriate. |
| `rds.radius.4` | `ref.radius.4` | 4px | Checkboxes and very small controls needing restrained rounding. |
| `rds.radius.8` | `ref.radius.8` | 8px | Default buttons, inputs, and regular interactive controls. |
| `rds.radius.12` | `ref.radius.12` | 12px | Grouped controls, compact cards, and smaller nested surfaces. |
| `rds.radius.16` | `ref.radius.16` | 16px | Panels, popovers, and larger cards; pair floating surfaces with their appropriate surface and elevation roles. |
| `rds.radius.24` | `ref.radius.24` | 24px | Dialogs and sheets where geometry permits rounded outer corners. |
<!-- rds:generated:radius:end -->

**Full** is a shape rule, not a fixed numeric primitive token. Use `border-radius: 9999px` for pills in CSS (the browser limits the effective radius to the shape); use half the component height in Figma. For a circle, use `50%` on an element with equal width and height.

## Rounding rules

- **Default:** Use 8px for regular controls. Do not make every button or input a pill.
- **Nested corners:** Inner radius should generally be smaller than outer radius. Account for inset spacing and prioritize visual balance over rigid formulas.
- **Attached edges:** Use 0px where a surface joins the viewport or an adjacent surface. A bottom sheet may have only its top corners rounded.
- **Responsive:** Keep radius values stable across breakpoints. Change a component's radius only if its geometry or layout pattern changes.
- **Density:** Regular and Spacious modes share the same radius tokens; increased spacing alone does not justify more rounding.
- **Exceptions:** Sharp corners are appropriate for some data visualizations, precision elements, and connected layouts.

## Implementation

Consume numeric radius tokens through their CSS variables (for example, `--rds-radius-8`). Apply **Full** only in component recipes that call for chips, pills, or circles; do not create a separate numeric radius for every component, theme, viewport, or density mode.
