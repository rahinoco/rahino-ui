# Icons

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

Adopted 2026-11-03. Button-family, checkbox and text-input integration were requested separately on this date. Other component integration and component-state approval remain pending.

Use simple Lucide outline icons with rounded ends and joins. Their clear geometry and controlled curves fit Rahino's visual principles. Keep one icon family throughout a product; bank and brand logos remain separate assets.

## Sizes and use cases

<!-- rds:generated:iconSizes:start -->
| Token | Reference | Size | Visible stroke | Use |
| --- | --- | --- | --- | --- |
| `rds.icon.size.sm` | `ref.size.16` | 16px | 1.5px | Compact actions and small supporting indicators. |
| `rds.icon.size.md` | `ref.size.20` | 20px | 1.875px | Default buttons, fields, toolbars and navigation. |
| `rds.icon.size.lg` | `ref.size.24` | 24px | 2.25px | Large controls and prominent actions. |
| `rds.icon.size.display` | `ref.size.32` | 32px | 3px | Empty states and standalone explanatory symbols. |
<!-- rds:generated:iconSizes:end -->

## Stroke

Use **2.25 on the original 24 × 24 grid**, scaling naturally with the icon. Preserve its proportions and internal padding. Do not apply a fixed screen-pixel stroke or increase the weight on hover or selection.

<!-- rds:generated:iconGeometry:start -->
| Token | Reference | Value | Meaning |
| --- | --- | --- | --- |
| `rds.icon.grid.size` | `ref.number.24` | 24 | Original square SVG grid size in unitless coordinates. |
| `rds.icon.stroke.width` | `ref.number.2-25` | 2.25 | Stroke width on the original 24 by 24 grid; scales proportionally with rendered icon size. Not a fixed CSS pixel width. |
<!-- rds:generated:iconGeometry:end -->

## Usage

- Keep size and stroke consistent within a group. Use the component's reviewed state treatment rather than switching to filled artwork.
- Inherit the control's foreground color. Standalone icons use existing semantic ink, brand or status roles appropriate to their meaning and background. Do not invent colors or opacity values.
- Add visible text for unfamiliar or consequential actions. Give icon-only controls an accessible name; hide decorative icons from screen readers.
- A button shows at most one icon. Loading replaces it with a spinner.
- In Persian RTL, leading icons sit on the right. Mirror navigation arrows when direction changes; keep search, save, plus, trash and logos unchanged.
- Icon size is separate from the hit area. Retain the existing 44px minimum target on touch devices.

## Integration boundary

Canonical tokens are `rds.icon.size.*`, `rds.icon.grid.size` and `rds.icon.stroke.width`; the generated `Icons.ts` exports `ICONOGRAPHY`. Stroke and grid values are unitless SVG coordinates, not CSS pixel widths. Visible stroke is `stroke × rendered size ÷ grid size`.

Button, IconButton and ToggleButton now bind directly to `rds.icon.size.sm/md/lg` and `rds.icon.stroke.width`, including loading spinners and selection checkmarks. Their Lucide artwork retains the original 24 × 24 grid, rounded ends/joins, inherited foreground and proportional stroke. Loading spinners never mirror in RTL.

Checkbox recipes bind the 20px box to `rds.icon.size.md` and the 16px check/minus to `rds.icon.size.sm`, using `rds.icon.stroke.width` for a proportional 1.5px visible stroke. Both marks retain Lucide's 24 × 24 grid, rounded ends/joins and inherited foreground, with no RTL mirroring. Box and label are vertically centered in plain item rows; the mark is centered inside the box. Description variants keep the box centered against the label's first line.

Text-input recipes bind field icons to `rds.icon.size.md` (20px) and the bare error exclamation to `rds.icon.size.sm` (16px), using `rds.icon.stroke.width` on the 24 × 24 grid with rounded ends/joins and proportional scaling. Field icons are centered within their slots and controls; the borderless error symbol is vertically centered beside its message. Decorative icons can occupy either logical edge. Clickable icons on either edge use the button family's icon recipe and preserve its 44px target and single-icon rule. They can change artwork with the action (Eye/EyeOff for show/hide), or keep their artwork after activation (Copy with separate outcome feedback). These text-field actions do not use selection indicators or a persistent selected fill. See [Input usage](../../../docs/INPUT_USAGE.md).

Existing `metrics.ts` exports and the `--rds-icon-stroke` compatibility binding retain their previous value of 2 for components awaiting migration. These requests do not migrate other components or add this guide to frontend pages. Review all affected component states before product use.
