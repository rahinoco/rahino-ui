# Unselected control fill: foundation proposal

Status: proposed, not adopted. Checkbox states and foundation mappings still require design review.

## Missing semantic role

`color.edge.control` identifies a boundary. A borderless checkbox's opaque unselected fill is a different role. `surface.sunken` identifies a general surface, not an enabled control state. Neither should be redefined to cover this gap.

Propose `color.control.bg.unselected` for the visible body of unselected selection controls such as checkboxes and, after their own review, radio buttons. This is not the background of text fields, cards, list rows or selection-group containers. Preserve state names at the end of each path, consistent with the existing color naming convention.

| Proposed semantic path | Role / candidate reference mapping |
| --- | --- |
| `color.control.bg.unselected.default` | Enabled resting fill. The user selected existing `surface.sunken` for the review candidate: light `ref.color.gray-warm.140`, dark `ref.color.gray.975`. This is not a contrast-approved or adopted control mapping. |
| `color.control.bg.unselected.hover` | Hover fill or state layer. Select an existing appropriate ref, including an existing alpha ref where appropriate; do not calculate a new color. |
| `color.control.bg.unselected.pressed` | Pressed fill or state layer. Select an existing appropriate ref; do not calculate a new color. |
| `color.control.bg.unselected.disabled` | Existing `ref.color.gray-warm.100` in light; candidate `ref.color.gray.600` in dark. |

If hover/pressed remain separate alpha layers, represent them explicitly as interaction-layer semantics instead of describing a translucent layer as an opaque background. The current checkbox retains the existing `interaction.neutral.hover/pressed` reference-backed layers while this contract is reviewed.

## Reference palette gap

The mixed `#858E9C` and `#3E3C43` values were not reference tokens and have been removed. Do not add them to the reference collection merely to preserve a component experiment. The existing neutral/cool references do not offer a slightly lighter replacement near `#858E9C` that still meets 3:1 on the light subtle surface. The user has since selected the existing `surface.sunken` alias for default; preserve its reference-backed values and record the resulting contrast findings. If a new reference is wanted later, review it as an explicit foundation palette addition before use. Disabled editing is deferred and its current reference mappings remain in place.

## Adoption work

- Review names, use cases and theme/state reference mappings as a foundation change.
- Validate the control silhouette on actual host surfaces; disabled mark readability remains a separate design goal.
- Define enhanced contrast and forced-colors behavior. Preserve native system-color accessibility cues.
- Add approved semantic aliases to the canonical light/dark token sets, their export bindings and generated outputs. Every alias must terminate at an existing approved reference token.
- Replace the checkbox's temporary direct references and check all states before product approval.

The proposal does not change the shared palette, `edge.control`, or other components.
