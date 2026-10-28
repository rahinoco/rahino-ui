# RDS Border Strategy

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

**Status:** Adopted foundation policy; component validation remains pending  
**Scope:** Rahino Design System and Qipper (Inventory, Finance, Project & Task Management)

## Decision

Adopt a **mostly borderless, semantic-boundary approach**, not a strict no-borders policy.

- **Spacing and typography** organize content.
- **Surface contrast** separates groups and static containers.
- **Borders** clarify controls, dense data, and interaction states.
- **Shadows** indicate actual elevation (menus, popovers, dialogs), not decorative cards.

This aligns with the restrained visual direction of products such as Linear, Notion, and Figma, without losing the clarity needed in dense tools such as Airtable and GitHub. These observations are drawn from publicly shown product interfaces, not exhaustive authenticated in-app audits.

## Component Rules

| Context                                   | RDS rule                                                                          |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| Page sections, standard cards, dashboards | Borderless by default; use spacing and surface contrast.                          |
| Text inputs, selects, other form controls | Clear boundary: recognizable filled treatment.                                    |
| Primary buttons                           | Filled; no border.                                                                |
| Secondary buttons                         | Subtle fill by default; outline only when necessary to communicate affordance.    |
| Toolbar / tertiary buttons                | Borderless but recognizably interactive.                                          |
| Inventory and finance tables              | **1px separators** as needed for readability; avoid boxing every cell.            |
| Task boards, selectable cards             | Surface-based cards; use an attention ring when selecting, dragging, or dropping. |
| Sidebars, headers, adjacent panels | Surface change first; a single separator only when separation is unclear. |
| Popovers, dropdowns, dialogs              | Raised surface plus existing RDS elevation token;                                 |
| Keyboard focus                            | **Independent 2px focus ring**, not a border-color change.                        |

**Constraints:** Avoid nested outlines and decorative card borders. A selected or invalid state must not be communicated through border color alone. Preserve functional controls and focus indicators on mobile even when outer card borders disappear.

## Final Minimal Token Set

These approved roles use the canonical foundation values. Component-specific identifying cues and interaction states are defined and validated during component work.

<!-- rds:generated:border:start -->
| Token | Light value / reference | Dark value / reference | Meaning |
| --- | --- | --- | --- |
| `rds.border.width.default` | `1px`<br>`ref.stroke.width.1` | `1px`<br>`ref.stroke.width.1` | Functional boundaries and separators |
| `rds.border.width.strong` | `2px`<br>`ref.stroke.width.2` | `2px`<br>`ref.stroke.width.2` | Selection and drop targets |
| `rds.color.edge.subtle` | `rgb(15 23 42 / 0.12)`<br>`ref.color.gray-cool.925-alpha-12` | `rgb(255 255 255 / 0.10)`<br>`ref.color.white-alpha-10` | Optional decorative dividers |
| `rds.color.edge.control` | `#7A8493`<br>`ref.color.gray-cool.450` | `#7A8493`<br>`ref.color.gray-cool.450` | Control boundary when needed |
| `rds.focus.ring.width` | `2px`<br>`ref.stroke.width.2` | `2px`<br>`ref.stroke.width.2` | Independent focus outline |
| `rds.color.focus.ring` | `#99507A`<br>`ref.color.plum.575` | `#A9638B`<br>`ref.color.plum.500` | Keyboard focus color |
<!-- rds:generated:border:end -->

Boundaries required to identify a control or state must meet **WCAG 2.2 non-text contrast ≥ 3:1**. Focus indicators must remain clearly visible.

**No extra tokens:** Do not keep a large legacy `edge.*` family unless a documented component need justifies a distinct role. Do not copy research-proposed radius, surface, or shadow scales into RDS.

## Current boundary contrast

These calculated ratios use the current master colors against opaque neutral parent surfaces; the target is 3:1. Standard and enhanced contrast are shown separately. The updated dark raised surface makes the existing dark focus ring fall below target, at 2.9694:1. The light control edge against the updated sunken surface also falls below target, at 2.9824:1. Both findings remain in enhanced contrast because those role/background pairs are not overridden. Neither a filled control nor a tinted parent is covered by a neutral-parent result; see the [complete contrast review](output/contrast-review/Contrast-Review.md).

<!-- rds:generated:boundaryContrast:start -->
| Theme | Contrast | Role | canvas | base | subtle | raised | sunken |
| --- | --- | --- | --- | --- | --- | --- | --- |
| light | standard | `focus.ring` | 4.9367:1 | 5.5512:1 | 5.2955:1 | 5.5512:1 | 4.3749:1 |
| light | standard | `edge.control` | 3.3653:1 | 3.7842:1 | 3.6099:1 | 3.7842:1 | 2.9824:1 — below target |
| light | more | `focus.ring` | 5.5512:1 | 5.5512:1 | 5.2955:1 | 5.5512:1 | 4.3749:1 |
| light | more | `edge.control` | 3.7842:1 | 3.7842:1 | 3.6099:1 | 3.7842:1 | 2.9824:1 — below target |
| dark | standard | `focus.ring` | 4.0697:1 | 3.5445:1 | 3.1987:1 | 2.9694:1 — below target | 4.7783:1 |
| dark | standard | `edge.control` | 4.6617:1 | 4.0601:1 | 3.6641:1 | 3.4014:1 | 5.4734:1 |
| dark | more | `focus.ring` | 4.7783:1 | 4.0697:1 | 3.1987:1 | 2.9694:1 — below target | 4.7783:1 |
| dark | more | `edge.control` | 5.4734:1 | 4.6617:1 | 3.6641:1 | 3.4014:1 | 5.4734:1 |
<!-- rds:generated:boundaryContrast:end -->

## Component validation

Test one representative **Inventory grid**, **Finance form**, **Task board**, and **Settings page**, each in light/dark mode, keyboard navigation, mobile, and RTL. Check scanning, control discoverability, focus, selected/error states, and excessive nested containers.

## References

- [Material 3 — Card variants](https://m3.material.io/components/cards/overview)
- [Microsoft Fluent 2 — Elevation](https://fluent2.microsoft.design/elevation)
- [NN/g — Recognizable clickable elements](https://www.nngroup.com/articles/clickable-elements/)
- [W3C — Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [W3C — Focus visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
