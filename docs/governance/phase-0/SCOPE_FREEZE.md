# Scope Freeze — Phase 0

Scope status: **PROVISIONAL**

This freeze is inventory-only. It does not approve a canonical Rahino Design System. No component is `canonical: present`.

## Inventory provenance

| Source | Git commit / handle | Access this phase |
| --- | --- | --- |
| `rahino-ui` | `3738983346c7573ddcd5d0c4f73f0bf29fb1caf5` | Full source |
| `rahino-ui-frontend` | `c9bb1801ec82565ab5996735ee1f26c880c3a75a` | Full source |
| `qipper-app-frontend` | `28f3d3e43e38de2f058844d018935f01952833d8` | Full source at `Z:\Projects\02 Rahino\03 Qipper\qipper-app-frontend` |
| Qippo Figma `qippo app` / page `Ui Kit` (`1:3`, fileKey `X3QxAzFoH4KzwUDY1FggbE`) | MCP list of COMPONENT_SET names/IDs | Available. `componentPropertyDefinitions` failed on some sets. Screenshots not used. |

## In scope for the current finalization track (candidates only)

These are **RDS `required` or `candidate`** items that exist in at least one verified source. They are **not** frozen as the final API.

Required (still unresolved mapping):

- Color, typography, radius, shadow, spacing, RTL, accessibility, iconography
- Button, Input, Select, Checkbox, Radio, Tabs, Segmented control, Dialog/Modal

Candidate (extracted or reconstructed, not approved):

- Badge, Card, Textarea, Date picker, Date time, Time picker, Form field, Data table, Metric card, Data state, Inline notice, Definition row, Field tokens, format utils, Avatar, Icon button, Switch, Snackbar, sizing, breakpoints, motion, border, z-index, section header, confirmation, Rahino Input/Select experimental slots

Do **not** treat Qipper `src/index` default exports as the approved Rahino API.

## Product-specific (not RDS finalization)

- Qipper widgets: Header, Sidebar, Command palette, Notification drawer, Mobile bottom nav, Kanban, PersianAvatar, Eldora device frames, File upload modal, Status/Priority badges, Appearance controls, Qipper logo, Page shell / Page header as product chrome
- Qippo: Magicoon library, Module Components section, Login screens, Landing info card as a product module, OTP/Login Code (pending decision), Prototyping components

## Deferred

- Range slider, Menu item, Tooltip (shared primitive), Skeleton (shared primitive), Error boundary as a DS primitive, Time picker Figma parity

## Out of scope

- Digix (no source in this inventory; product usage `unknown`)
- Redesign of any component
- Merging registries, moving files, changing exports
- Figma file edits
- Magicoon as a full icon font import
- Prototyping / Useless Assets sections as production UI
- Declaring any component canonical

## What is not frozen

Any item with `unknown`, `needs-verification` implied by `needs-review` / `ambiguous`, or incomplete Figma property tables.

P0 mapping conflicts listed in `OPEN_QUESTIONS.md` (Blocking) still prevent **FROZEN**.

Blocking themes:

- Radio (circular) vs Qipper RadioPills vs Segmented control
- Select vs Combobox (searchable Qipper Select)
- Toast/Snackbar vs Inline notice
- Generic Card vs product cards
- Which Figma Text input / Input set is the source
- Iconography: lucide vs Magicoon
- Color and typography conflicts
- Canonical policy: Qipper default exports must not be treated as approved

## Access notes

- Qipper source: available.
- Qippo Figma: MCP available for structure; variant property tables incomplete.
- Digix: not in workspace.
- No automated tests exist in `rahino-ui` (all `tests: missing`).
