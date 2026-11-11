# Dialog usage

Status: redesign candidate for state review. See the interactive examples at `/components/modal` and the [research report](../../reviews/modal-dialog-research-2026-11-06.md).

## Use cases

| Pattern | Use it for | Dismissal |
| --- | --- | --- |
| `Modal` preview | Inspect a short shipment record before returning to the list. Use the labeled header Close or a single footer Close. | Close or Escape. Opt into backdrop dismissal only for a low-risk preview. |
| `Modal` form | Rename an item or edit a small group of related fields. Focus the first useful field. | Cancel and Escape use the same draft policy. Use `hideClose` when Cancel already provides a visible exit. |
| `ConfirmationModal` danger | Permanently delete a named record or discard a meaningful draft. Name the consequence and the exact action. | Cancel or Escape takes the safe path. While the irreversible request is pending, the confirmation stays open and blocks repeat activation. |
| `ConfirmationModal` warning | Make a short decision about a significant shared consequence. | Same safe path as danger. Use the warning variant only when the message warrants immediate attention. |
| `ConfirmationModal` info | Record a brief confirmation in a workflow that intentionally pauses for the answer. | Cancel or Escape. The standard dialog role is used. |
| `ModalFormCard` | Group closely related controls inside a legacy modal form. | Uses the parent dialog's dismissal behavior. |
| `ChoiceTile` | Present a labeled, immediate choice with optional supporting copy in an existing choice flow. | The caller owns the choice and the parent dialog's dismissal. |

Use a docked panel for tools that need to stay open during other work. Use an inline message for validation or routine feedback. For routine reversible removal, provide real restoration through Undo. For multi-step tasks or a lengthy review, use a dedicated page.

## Recipe and behavior

- The opaque panel uses `surface.raised`, `shadow.lg` and native `radius.24`. The topmost dialog uses `veil.scrim.color` and `veil.scrim.blur` (16px in both themes) on its native backdrop. Without blur support, with reduced transparency, or with increased contrast or forced colors, the backdrop uses `scrim.modal`. Title and copy use the existing `title-md` and `body-md` roles. Warning and error copy or icons use the matching status roles. Brand and danger commitment use the shared Button recipe.
- The dialog recipe caps `sm`, `md` and `lg` at 25rem, 35rem and 48rem. The `xl` and `2xl` widths remain for existing consumers. Spacing uses the foundation scale. The bottom inset stays visible while the body scrolls. At a short viewport height, the header, body, and actions scroll together above the same inset.
- Place the primary action first in the DOM. In Persian RTL it appears on the right, with Cancel to its left. When stacked, the primary action stays above Cancel. Use one primary button and a labeled safe exit. On a pending confirmation the shared button spinner occupies the single icon position.
- A short `subtitle` becomes the accessible description. Keep structured content in the body. Supply a visible title, or set `accessibleName` for exceptional layouts. Supply `closeLabel` for a different UI language. Use `initialFocusRef` when the opening target is task-specific, and `returnFocusRef` when closing can remove the opener.
- The native dialog owns background inertness. The component stays in its original DOM tree, so it inherits theme and direction. Put dependent overlay content inside the dialog subtree. The shared Select, DatePicker and TimePicker have compatible rendering paths. Third-party overlays that portal to the document root need a container inside the active dialog.
- A modal is controlled by `isOpen`. For a dirty form, send footer Cancel and `onClose` through the same guard. `closeOnBackdrop` defaults to `false`. Allow one nested confirmation for a short decision, such as continuing editing or discarding a draft.
- The confirmation caller owns request state. Set `isLoading` while the request is in flight, keep the dialog open with actionable `error` copy if it fails, and close after a successful commitment. Reversible and cancelable requests can use a custom modal with an explicit action that really cancels the request.

## Foundation follow-up

The existing dark `focus.ring` on `surface.raised` measures 2.9694:1 in the foundation diagnostic. A correction belongs in the reusable focus role and its reference mapping. The redesign keeps the existing focus treatment pending that foundation decision. [Foundation contrast report](../src/foundations/canonical/output/contrast-review/Contrast-Review.md)

Review each state with keyboard, pointer, touch, screen readers, light and dark, increased contrast, forced colors, RTL and LTR, and a real mobile keyboard before approval.
