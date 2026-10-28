# Color contrast review

Generated from the current [master collection](../../master-tokens/Master-Token-List.md). Rebuild with `node master-tokens/scripts/build.mjs`. Token roles and usage mappings are unchanged.

## Current findings

176 opaque color-pair checks cover light/dark and standard/enhanced contrast. 11 context/pair checks fall below their existing targets. Targets are evaluated before rounding.

| Theme | Contrast | Foreground | Background | Ratio | Target |
| --- | --- | --- | --- | --- | --- |
| light | standard | `rds.color.ink.tertiary`<br>`#6D656B` | `rds.color.surface.sunken`<br>`#E8E3E5` | 4.4442:1 | 4.5:1 |
| light | standard | `rds.color.edge.control`<br>`#7A8493` | `rds.color.surface.sunken`<br>`#E8E3E5` | 2.9824:1 | 3:1 |
| light | more | `rds.color.edge.control`<br>`#7A8493` | `rds.color.surface.sunken`<br>`#E8E3E5` | 2.9824:1 | 3:1 |
| dark | standard | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.surface.raised`<br>`#333135` | 2.9694:1 | 3:1 |
| dark | standard | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.status.success.bg`<br>`#203B2A` | 2.8159:1 | 3:1 |
| dark | standard | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.status.warning.bg`<br>`#40341D` | 2.8053:1 | 3:1 |
| dark | standard | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.status.info.bg`<br>`#23354B` | 2.8797:1 | 3:1 |
| dark | more | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.surface.raised`<br>`#333135` | 2.9694:1 | 3:1 |
| dark | more | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.status.success.bg`<br>`#203B2A` | 2.8159:1 | 3:1 |
| dark | more | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.status.warning.bg`<br>`#40341D` | 2.8053:1 | 3:1 |
| dark | more | `rds.color.focus.ring`<br>`#A9638B` | `rds.color.status.info.bg`<br>`#23354B` | 2.8797:1 | 3:1 |

Below-target results remain unresolved. The standard checker enforces its existing neutral-parent focus target and can stop before later checks when a pair fails. This review also includes tinted focus parents and ordinary resting text. These findings do not authorize different color values or usage mappings.

## Neutral resting text

Each cell compares the named ink with the surface column. Values are contrast ratios; “below target” means less than 4.5:1.

| Theme | Contrast | Ink | canvas | base | subtle | raised | sunken |
| --- | --- | --- | --- | --- | --- | --- | --- |
| light | standard | `ink.primary` | 14.8067:1 | 16.6499:1 | 15.8828:1 | 16.6499:1 | 13.1219:1 |
| light | standard | `ink.secondary` | 6.1421:1 | 6.9067:1 | 6.5885:1 | 6.9067:1 | 5.4432:1 |
| light | standard | `ink.tertiary` | 5.0148:1 | 5.6391:1 | 5.3793:1 | 5.6391:1 | 4.4442:1 — below target |
| light | more | `ink.primary` | 16.6499:1 | 16.6499:1 | 15.8828:1 | 16.6499:1 | 13.1219:1 |
| light | more | `ink.secondary` | 16.6499:1 | 16.6499:1 | 15.8828:1 | 16.6499:1 | 13.1219:1 |
| light | more | `ink.tertiary` | 6.5941:1 | 6.5941:1 | 6.2903:1 | 6.5941:1 | 5.1968:1 |
| dark | standard | `ink.primary` | 15.2247:1 | 13.2600:1 | 11.9664:1 | 11.1085:1 | 17.8756:1 |
| dark | standard | `ink.secondary` | 9.5226:1 | 8.2938:1 | 7.4847:1 | 6.9481:1 | 11.1807:1 |
| dark | standard | `ink.tertiary` | 7.3846:1 | 6.4316:1 | 5.8042:1 | 5.3881:1 | 8.6704:1 |
| dark | more | `ink.primary` | 20.7127:1 | 17.6411:1 | 13.8657:1 | 12.8716:1 | 20.7127:1 |
| dark | more | `ink.secondary` | 17.8756:1 | 15.2247:1 | 11.9664:1 | 11.1085:1 | 17.8756:1 |
| dark | more | `ink.tertiary` | 9.9215:1 | 8.4501:1 | 6.6417:1 | 6.1656:1 | 9.9215:1 |

## Focus and functional control edges

Each cell compares the named color with the neutral parent surface. The existing target is 3:1. Validate actual adjacency and component states separately.

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

## Other opaque text pairs

| Theme | Contrast | Family | Minimum ratio | Below target |
| --- | --- | --- | --- | --- |
| light | standard | Enabled primary label | 12.3491:1 | No |
| light | standard | Status text on soft background | 5.3775:1 | No |
| light | standard | Status text on solid fill | 4.6363:1 | No |
| light | standard | Brand text on soft background | 9.0816:1 | No |
| light | more | Enabled primary label | 12.3491:1 | No |
| light | more | Status text on soft background | 5.3775:1 | No |
| light | more | Status text on solid fill | 4.6363:1 | No |
| light | more | Brand text on soft background | 9.0816:1 | No |
| dark | standard | Enabled primary label | 10.4363:1 | No |
| dark | standard | Status text on soft background | 6.0559:1 | No |
| dark | standard | Status text on solid fill | 4.5181:1 | No |
| dark | standard | Brand text on soft background | 8.5925:1 | No |
| dark | more | Enabled primary label | 10.4363:1 | No |
| dark | more | Status text on soft background | 6.0559:1 | No |
| dark | more | Status text on solid fill | 4.5181:1 | No |
| dark | more | Brand text on soft background | 8.5925:1 | No |

## Scope and history

The checks cover opaque resting text, enabled primary labels, status text, brand text, focus on neutral/brand/status parents, and control edges on neutral parents. Disabled text, hover/pressed overlay composites, glass, charts, gradients and rendered components require their own checks. Native forced colors use system colors, so no fixed hex contrast is inferred for that mode. These are calculations, not browser or application certification.

The [earlier borderless review](archive/before-color-update-2026-10-28/Contrast-Review.md) and its [calculated results](archive/before-color-update-2026-10-28/results.json) are archived with the previous palette. Its inverted field pair was rejected as a default, and its dark-button proposal with black labels was not approved. Enabled primary labels continue to use `rds.color.ink.on-brand`.

Complete current values and pair inventory: [results.json](results.json). Color changes: [before/after report](../color-value-update/Changes.md).
