# Checkbox

Foundation-based candidate. All states require human approval before product use.

Use a checkbox for an independent yes/no choice, consent, selecting table rows, or selecting several options. Use a radio group when exactly one option is allowed, a switch for an immediately applied setting, and a button for an action.

## Variations

| Type | Use case |
| --- | --- |
| `simple` (default) | Inline form choices, consent and table row selection. Supply `label`, or `aria-label` for a standalone box. |
| `item` | A full-width selectable row with a label. The entire row is clickable. |
| `item-desc` | A selectable row whose choice needs a short explanation in `description`. |

All types support unchecked, checked and indeterminate states, enabled or disabled. `indeterminate` means some children are selected; it is not a third value users cycle through. Activating a mixed checkbox requests `true` (select all). The parent owns the selection and updates `checked` and `indeterminate`.

## Foundation recipe

| Part | Foundation |
| --- | --- |
| Unchecked box | User-selected `surface.sunken` fill, backed by light `ref.color.gray-warm.140` (`#E3DFE1`) and dark `ref.color.gray.975` (`#030203`); no border or shadow. Hover/pressed use the existing `interaction.neutral.hover/pressed` alpha reference aliases as supplied. |
| Checked/mixed box | `action.primary.bg.default/hover/pressed`; check or minus in `ink.on-brand`. |
| Disabled box | Unchecked references: light `ref.color.gray-warm.100` (`#E8E3E5`), dark `ref.color.gray.600` (`#625F69`). Selected: `action.primary.bg.disabled` with `ink.tertiary` mark. Labels use `ink.disabled`. |
| Geometry / icons | Recipe box size maps to `icon.size.md` (20px); mark size maps to `icon.size.sm` (16px). Lucide's 24×24 grid uses `icon.stroke.width` (unitless 2.25), giving a proportional 1.5px visible stroke at 16px. Rounded ends/joins, no fixed-screen stroke, 4px box corners and minimum 44px target. |
| Row | `surface.subtle`, selected `interaction.surface.selected`; 12px corners, spacing from foundation tokens. |
| Description layout | Checkbox and name share the first row. Description spans both columns below, aligned with the checkbox's logical start. Horizontal gap `space.200` (12px); row gap `space.100` (8px). The box aligns with the label's first line, including wrapped names. |
| Text | `label.sm` and `font.weight.control`; description `body.sm` and `ink.secondary`. |
| Focus / motion | Foundation focus color and 2px width, 2px offset; feedback duration (150ms) and standard easing. Only the box scales from `motion.scale.rest` (1) to `motion.scale.pressed` (0.923) while pressed. Reduced motion removes transitions and scaling. |
| Elevation | None in every state. |

All colors must resolve to existing reference tokens. The previous computed light gray and charcoal recipes were rejected and removed. The user selected `surface.sunken` for the enabled unchecked fill in this review candidate; `edge.control` is no longer used for this fill. The missing control-specific foundation role and proposed state family are documented in [Checkbox control fill proposal](CHECKBOX_TOKEN_PROPOSAL.md). That proposal is not an adopted token or an approval for product use. Selected and disabled mappings are unchanged by the default-fill edit; disabled colors will be reviewed separately later.

### Disabled color review

Disabled color editing is deferred at the user's request. The prior review replaced the dark unchecked `surface.sunken` fill (`#030203`) with existing `ref.color.gray.600` (`#625F69`). Light disabled unchecked remains existing `ref.color.gray-warm.100` (`#E8E3E5`). These explicit disabled mappings are preserved when the enabled default changes to `surface.sunken`.

Selected disabled checks and mixed marks use `ink.tertiary`: `#6D656B` in light (lighter than the previous `#211D20`) and `#AAA6B0` in dark (darker than the previous `#EEEEF0`). These preserve mark/fill contrast of approximately 3.53:1 and 4.59:1 respectively. `ink.disabled` was considered for the marks, but at about 1.55:1 and 1.75:1 it obscures the retained selection. The 3:1 mark target here is a deliberate readability choice for the candidate, not a mandatory disabled-control conformance threshold.

No shared foundation colors are changed. The proposed `color.control.bg.unselected` state family would replace these temporary direct references after foundation review. `light-dark()` selects between existing refs using the foundation's color scheme, including nested review stages and system theme; it does not calculate a new color. Native disabled behavior, fixed geometry and forced-color system cues remain in place. All disabled states still need visual approval before product use.

The user-selected sunken fill is a visual review candidate, not a contrast-approved control silhouette: it falls below 3:1 on the light and dark neutral host surfaces. Browser checks record these unchecked-fill findings separately from behavior and selected-mark checks; do not report an overall accessibility pass. The existing dark focus-ring / raised-surface pair also remains a foundation contrast exception (about 2.97:1).

Windows forced-colors mode uses system colors and a 1px system border so an unchecked control remains visible. This accessibility fallback is the only stroke exception. Disabled controls must still show their checked/mixed mark; disabled does not mean unchecked.

## Interaction and content

### Name and explanation layout

The `item-desc` type follows the supplied Spectrum layout: the checkbox and name form one row, then the explanation starts on its own full-width row. In RTL the explanation aligns with the right edge of the checkbox column; in LTR it aligns with the left edge. The explanation can use the full inner width rather than remaining indented under the name. Keep the existing selectable row surface and foundation typography. The entire row, including the explanation, remains one checkbox hit target with the label and description connected through ARIA.

The `simple` and `item` types vertically center the box with the label; the item row also keeps both centered within its surface, including wrapped labels. The `item-desc` type centers the box against the label's first line and keeps its explanation separate below. Check and minus artwork stay centered inside the box at rest and during press scaling, with the same proportional foundation stroke across all states.

### Click motion

Adapted from [Spectrum's checkbox](https://spectrum.adobe.com/web/rsp/components/checkbox) and its [press-scale behavior](https://github.com/adobe/react-spectrum/blob/main/packages/@react-spectrum/s2/src/pressScale.ts): the box compresses on press and returns on release, with immediate selection feedback. The requested foundation addition is `ref.motion.scale.0-923` (0.923), aliased by `rds.motion.scale.pressed`. The component recipe token `--rds-checkbox-scale-pressed` aliases `--rds-motion-scale-pressed` for its press scale; it does not use the raw ref directly or hardcode a scale. This approximates Spectrum's visible 24 / 26 compression at the current 20px box size, rather than the previous 0.98 subtle scale. Rest scale, duration and easing continue through existing semantic tokens backed by `ref.motion.scale.1`, `ref.motion.duration.150` and `ref.motion.easing.curve-01`. The [motion foundation](../src/foundations/canonical/Motion.md#checkbox-press-recipe) documents this checkbox-specific exception; the general 0.98 minimum for other controls is unchanged.

The box and its single mark move together; labels, row surfaces, focus indicators and the 44px hit target stay fixed. Pointer, touch and Space/Enter share the same pressed feedback. Leaving the target, cancellation, lost pointer capture or blur releases the effect. Disabled controls never animate. State changes from a parent (including select-all) do not replay a press. Transitions reverse from their current progress on rapid interaction; there are no queued animations, bounce, icon drawing or delayed callbacks. Reduced motion keeps the box at rest throughout the press.

- Tab focuses each enabled checkbox. Space or Enter toggles it. Disabled controls cannot toggle and are skipped by Tab.
- The label and description are inside the same hit target. Do not put links or other interactive elements inside them.
- Keep labels positive and specific, such as “Send delivery updates”. For consent, start unchecked and explain exactly what is accepted.
- `aria-checked="mixed"` exposes partial selection. Descriptions are connected with `aria-describedby`; an explicit `aria-label` overrides the visible label for naming.
- RTL places the box at the logical start; LTR uses the same DOM order. Long labels wrap without shrinking the box.
- There is no loading or error appearance in this API. Show group validation in the surrounding form and connect it at the form level; do not invent a checkbox error color.

## Review coverage

The browser review script checks all three types × three selection states × enabled/disabled across light/dark, standard/increased contrast and RTL/LTR. It checks resting, hover, pressed and focus states, pointer/keyboard/touch press and release, cancellation, repeated input, fixed target geometry, mixed-state changes, disabled behavior, names/descriptions, coarse-pointer targets, wrapping, reduced motion and forced colors. Results are implementation checks, not human approval.
