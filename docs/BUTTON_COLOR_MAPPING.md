# Semantic action colors

The owner approved the 2% press effect for the button family. The face keeps its existing rest, hover or selected colors while held. The mappings below cover the colors currently used by the recipes. Review and approval of the complete state matrix are still pending.

## Foundation roles used by button recipes

Paths below begin with `rds.color.`. Reference paths begin with `ref.color.`. Semantic aliases shown in parentheses terminate at the references listed. Reusable pressed-color roles remain in the [color foundation](../src/foundations/canonical/Color.md) for other controls and existing consumers.

| Semantic role | Light reference | Dark reference | Use case |
| --- | --- | --- | --- |
| `action.neutral.bg.default` | `gray.935` | `gray.50` | Resting high-emphasis neutral action |
| `action.neutral.bg.hover` | `gray.975` | `gray.225` | Enabled neutral action hover |
| `action.brand.bg.default` | `plum.775` | `plum.775` | Resting high-emphasis brand action |
| `action.brand.bg.hover` | `plum.850` | `plum.725` | Enabled brand action hover |
| `action.brand.bg.disabled` | `plum.375` | `plum.750` | Disabled high-emphasis brand action |
| `action.brand.fg` | `white` (`ink.on-brand`) | `white` (`ink.on-brand`) | Enabled brand action label/icon |
| `action.danger.bg.default` | `red.575` (`status.error.fill`) | `red.550` (`status.error.fill`) | Resting destructive action |
| `action.danger.bg.hover` | `red.625` | `red.575` | Enabled destructive action hover |
| `action.danger-subtle.bg.default` | `red.50` (`status.error.bg`) | `red.800` (`status.error.bg`) | Resting low-emphasis destructive action fill |
| `action.danger-subtle.bg.hover` | `red.225` | `red.750` | Opaque destructive hover fill |
| `action.danger-subtle.fg.default` | `red.800` | `red.50` | Stable label/icon on soft destructive fills |
| `action.danger-subtle.fg.hover` | `red.800` | `red.50` | Same label/icon color during hover |

These names describe reusable action roles, not components. Do not use action fills as generic page surfaces, status-message backgrounds or selection-control fills. High-emphasis neutral actions retain `ink.inverse`; low-emphasis neutral actions retain `ink.primary`. Branded soft/selected actions retain `brand.fg`. Solid destructive actions retain `status.error.on-fill`.

Soft danger and selected danger use `action.danger-subtle.bg.default/hover` with a stable foreground. Unselected ghost danger uses `status.error.fg` throughout.

## Component recipes

Button, IconButton and ToggleButton consume the same semantic recipes. Default, hover, active, focus-visible, disabled, loading and selected states must be reviewed in both themes and contrast modes.

- Soft neutral uses `surface.subtle` at rest. Soft and ghost neutral use the existing `interaction.neutral.hover` reference alpha over the parent surface on hover.
- Ghost uses `background: none` at rest and the corresponding semantic fill on hover.
- Neutral and brand toggles use the existing branded selection colors while selected. Holding the action scales the face over its current colors, including selected colors.
- Disabled ghost uses disabled ink and no fill in standard and enhanced contrast. Loading and other disabled appearances use existing disabled semantic fills and inks. Solid brand retains its existing disabled primary fill and primary ink treatment.
- Focus uses the independent semantic focus ring. Reduced motion and forced colors use an inset press outline in the current foreground. Forced-colors mode uses system colors for the face, press, selection and focus cues.
- Color, opacity and shadow interpolation are absent. Spinner rotation remains, without a fade. Reduced motion stops the rotation.
- Existing `shadow.sm` remains reference-backed, without component-specific alpha changes.

Theme preview scopes retain the canonical semantic/reference alias chain instead of writing resolved raw colors. Canonical token sets, generated CSS, resolver/API exports and decision receipts are regenerated together.

## Verification

Run the normal token gate, both project typechecks, button behavior/browser checks, foundation behavior and the documentation build. Browser review measures enabled foreground/background contrast and verifies the actual state fill and foreground against their semantic recipes. Native forced colors, reduced motion, loading, selection, RTL/LTR and touch targets remain in scope. Record final evidence in `BUTTON_REDESIGN.md`; visual approval remains pending.
