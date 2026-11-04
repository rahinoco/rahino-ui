# Semantic action colors

2026-11-03. The owner requested semantic-only colors, approved adding reusable action roles using existing reference tokens, and initially chose stable soft danger fills with foreground feedback. After reviewing the result, the owner requested matching the other soft buttons: background feedback with stable label/icon color. The mappings below implement this updated direction. Component/state visual approval remains pending; passing verification does not approve product use.

## Added foundation roles

Paths below begin with `rds.color.`. Reference paths begin with `ref.color.`. Semantic aliases shown in parentheses terminate at the references listed. The user-requested 2026-11-04 palette update adds `ref.color.red.750` (`#562A2F`) for dark soft danger hover and moves dark soft danger press to `red.625`. No opacity value is added or changed.

| Semantic role | Light reference | Dark reference | Use case |
| --- | --- | --- | --- |
| `action.neutral.bg.default` | `gray-warm.875` | `gray.50` | Resting high-emphasis neutral action |
| `action.neutral.bg.hover` | `gray-warm.650` | `gray.225` | Enabled neutral action hover |
| `action.neutral.bg.pressed` | `gray-warm.600` | `gray.275` | Temporary neutral action press |
| `action.neutral-subtle.bg.default` | `gray-warm.25` (`surface.subtle`) | `gray.900` (`surface.subtle`) | Resting low-emphasis neutral action |
| `action.neutral-subtle.bg.hover` | `gray-warm.75` | `gray.850` | Opaque low-emphasis neutral hover |
| `action.neutral-subtle.bg.pressed` | `gray-warm.100` | `gray.600` | Opaque low-emphasis neutral press |
| `brand.bg.pressed` | `plum.200` | `plum.775` | Soft branded action or branded selection press |
| `action.danger.bg.default` | `red.575` (`status.error.fill`) | `red.550` (`status.error.fill`) | Resting destructive action |
| `action.danger.bg.hover` | `red.625` | `red.575` | Enabled destructive action hover |
| `action.danger.bg.pressed` | `red.800` | `red.625` | Temporary destructive action press |
| `action.danger-subtle.bg.default` | `red.50` (`status.error.bg`) | `red.800` (`status.error.bg`) | Resting low-emphasis destructive action fill |
| `action.danger-subtle.bg.hover` | `red.225` | `red.750` | Opaque destructive hover fill |
| `action.danger-subtle.bg.pressed` | `red.275` | `red.625` | Opaque destructive pressed fill |
| `action.danger-subtle.fg.default` | `red.800` | `red.50` | Stable label/icon on soft destructive fills |
| `action.danger-subtle.fg.hover` | `red.800` | `red.50` | Same label/icon color during hover |
| `action.danger-subtle.fg.pressed` | `red.800` | `red.50` | Same label/icon color during press |

These names describe reusable action roles, not components. Do not use action fills as generic page surfaces, status-message backgrounds or selection-control fills. High-emphasis neutral actions retain `ink.inverse`; low-emphasis neutral actions retain `ink.primary`. Branded soft/selected actions retain `brand.fg`. Solid destructive actions retain `status.error.on-fill`.

Soft danger and selected danger use `action.danger-subtle.bg.default/hover/pressed` with a stable foreground, matching the other soft appearances. Light uses dark red labels; dark uses pale red labels so every reference fill retains at least 4.5:1 text contrast. Ghost danger retains its existing red foreground at rest, then uses the matching contrasting soft foreground when its semantic fill appears. The new red reference is an explicit palette addition; no color computation is introduced.

## Component recipes

Button, IconButton and ToggleButton consume the same semantic recipes. Default, hover, active, focus-visible, disabled, loading and selected states must be reviewed in both themes and contrast modes.

- Neutral soft/ghost feedback uses opaque semantic fills without an extra alpha layer.
- Ghost rest uses `background: none` (no paint), rather than manufacturing a transparent reference. Hover/press use the corresponding semantic fills; danger uses the contrasting soft foreground on its filled states.
- Neutral and brand selection retain the existing branded selection semantics. Pressed feedback uses `brand.bg.pressed`; temporary press and persistent selection remain distinct states.
- Disabled/loading use existing disabled semantic fills and inks. Solid brand retains its existing disabled primary fill and primary ink treatment.
- Focus retains the existing semantic focus ring. Forced-colors mode uses system colors, preserving accessibility cues.
- Color, opacity and shadow interpolation are absent. Spinner rotation remains, without a fade. Reduced motion stops the rotation.
- Existing `shadow.sm` remains reference-backed, without component-specific alpha changes.

Theme preview scopes retain the canonical semantic/reference alias chain instead of writing resolved raw colors. Canonical token sets, generated CSS, resolver/API exports and decision receipts are regenerated together.

## Verification

Run the normal token gate, both project typechecks, button behavior/browser checks, foundation behavior and the documentation build. Browser review measures enabled foreground/background contrast and verifies the actual state fill and foreground against their semantic recipes. Native forced colors, reduced motion, loading, selection, RTL/LTR and touch targets remain in scope. Record final evidence in `BUTTON_REDESIGN.md`; visual approval remains pending.
