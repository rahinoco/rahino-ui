# Button use cases

Defined 2026-11-01. Usage guidance for the existing candidate Button family. The owner confirmed RTL ordering and the risk-based destructive-action policy on this date. Component/state approval remains pending. The 2026-11-03 semantic-only color mapping and consistent soft danger background feedback are recorded in [BUTTON_COLOR_MAPPING.md](BUTTON_COLOR_MAPPING.md).

## Evidence and scope

Published design-system guidance supports emphasizing a principal action, differentiating supporting actions and keeping labels action-specific. [Carbon button guidance](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines) and [Fluent button guidance](https://fluent2.microsoft.design/components/web/react/core/button/usage) provide global references. They differ on secondary-button roles; Rahino does not adopt either taxonomy wholesale.

For Iran, [Divar's Sonnat button guidance](https://www.sonnat.design/components/button) describes a unique high-emphasis action, supporting actions, familiar placement, directional icons and compact icon actions. Its [developer reference](https://www.sonnat.dev/docs/components/Button) distinguishes filled, outlined and inlined emphasis.

## Choose the behavior first

| Component | Use when | Examples | Do not use for |
| --- | --- | --- | --- |
| Button | A person executes a named command or advances a task | ثبت هزینه، ذخیره تغییرات، اعمال فیلتر، ادامه، انصراف | Persistent on/off state; ordinary inline navigation |
| IconButton | A familiar icon identifies a repeated, compact action in context | Refresh a list, copy an invoice number, open row actions, show a password | First-time or ambiguous commands; the sole control for a high-impact destructive commitment |
| ToggleButton | A person turns an independent persistent option on/off | نشان‌شده، بی‌صدا، نمایش جزئیات in a toolbar | Submit, next-step navigation, one-time deletion, or substituting for a settings switch |

### Icons and loading

Every button shows at most one icon:

- A selected toggle keeps its existing icon. Do not add a checkmark beside it.
- A text-only toggle uses the normal label width in default and hover. Selecting it smoothly adds the leading gap and one checkmark; deselecting collapses both. In Persian RTL the checkmark appears on the right. Reduced motion makes this change immediate.
- During loading, the spinner replaces the icon or checkmark. It never appears beside another icon.
- Keep the toggle's label the same when it is selected or unselected. `aria-pressed` tells screen readers which state it is in. See the [WAI button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

### Choosing list or grid view

Back navigation uses `iconStart={<ArrowLeft />}` with `mirrorStart`: in RTL the arrow sits to the right of the label and points right; in LTR it sits to the left and points left. Forward navigation uses `iconEnd={<ArrowRight />}` with `mirrorEnd`. Mirroring follows the button's own direction, including LTR examples inside an RTL page.

For example, show two buttons: «فهرست» and «شبکه». The app keeps exactly one selected. Selecting «شبکه» also unselects «فهرست».

In our current implementation, use Tab to move between these buttons. Arrow-key navigation is not implemented. `role="group"` tells screen readers that the buttons belong together; it does not add keyboard behavior.

Developer note: do not call this a `radiogroup` unless you also implement its selection and arrow-key behavior. See the [WAI radio-group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). For a choice saved in a form, use radios or a suitable selection control. For switching content panels, use tabs.

### Button or link?

- **Go to another page**, such as «مشاهده جزئیات سفارش» → use a link.
- **Do something**, such as «ذخیره», open a dialog, or continue a multi-step form → use a button.

A link can look like a button. Use `Button href="…"` for that appearance; it still renders a link. Links within ordinary text should stay text links. See the [WAI button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

## Choose emphasis and intent
Select one principal action per active task area. A modal can have its own principal action while the underlying page is inactive. Repeated rows and cards should not each compete with the page CTA. This adapts the shared hierarchy described by [Sonnat](https://www.sonnat.design/components/button) and [Fluent](https://fluent2.microsoft.design/components/web/react/core/button/usage).

| Appearance / intent | Rahino role | Use cases and Persian labels | Avoid |
| --- | --- | --- | --- |
| solid / brand | Normal primary CTA | Commit the main form: ثبت هزینه، ذخیره تغییرات؛ advance the current task: ادامه | Repeated row commands; several competing CTAs in one task area |
| solid / neutral | Specialized high-emphasis neutral alternative | A deliberately monochrome or brand-neutral task context: شروع بررسی | A second primary beside solid/brand; casual row actions. Requires a documented product-context choice |
| solid / danger | Destructive commitment | Final confirmation: حذف هزینه، حذف ۱۲ مورد | A harmless Cancel or Back; a generic تأیید hiding the consequence |
| soft / neutral | Default supporting action | پیش‌نمایش، دریافت گزارش، اعمال فیلتر؛ a supporting save in a subtask | Final commitment when it is the main job of the screen |
| soft / brand | Supporting branded emphasis | مشاهده پیشنهاد، بررسی تغییرات when an action needs more attention than nearby neutral utilities | Promoting every secondary action; representing selection through `intent` alone |
| soft / danger | Visible secondary destructive entry | حذف موارد انتخاب‌شده، لغو درخواست when the risky action needs a clear but subordinate container | Harmless dismissal; executing high-impact removal with no confirmation |
| ghost / neutral | Quiet utility or dismissal | انصراف، بازگشت، بستن؛ compact toolbar actions or مشاهده جزئیات | A hard-to-find primary CTA or an undiscoverable action on a busy background |
| ghost / brand | Discoverable low-emphasis branded action | مشاهده جزئیات، مشاهده همه، ویرایش in a clear local context; use `href` when navigating | Paragraph navigation styled as a command; a second primary |
| ghost / danger | Low-emphasis contextual destructive entry | Remove a reversible row or open a deletion confirmation: حذف ردیف | Icon-only irreversible commitment; color as the only explanation of the action |

These nine mappings are Rahino recipes, not nine independent priorities. They adapt the high/medium/low hierarchy and destructive emphasis in [Carbon](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines) to the existing API.

## Destructive actions — owner-confirmed policy

Classify the consequence, including bulk scope and effects on related items, before choosing the flow. The distinction between low-, moderate- and high-impact deletion is supported by [Carbon common actions](https://www.carbondesignsystem.com/building-blocks/core/patterns/common-actions).

- Routine reversible removal: execute the action and offer a working بازگردانی. Do this only when the product can actually restore the item and its state. Removing an item from a list is not necessarily deleting its source object.
- Irreversible or high-impact action: explain the object, scope and consequences in a confirmation dialog; use a labeled solid/danger commitment and ghost/neutral انصراف. Keep the safe control initially focused when accidental commitment would be costly. For exceptionally consequential bulk deletion, consider typed confirmation as a product-specific decision.
- High-impact cancellation can be destructive even without deletion. Merely dismissing a dialog or going back is neutral. Show any loss of unsaved changes before discarding them.
- An icon-only trash action may initiate confirmation or routine reversible removal. Its accessible name identifies the target; add an accessible tooltip where appropriate. The final irreversible commitment has visible text.

## Persian content and placement — owner-confirmed policy

In horizontal RTL action groups, put the principal action on the right and Cancel on the left. Preserve reading/DOM/focus order; do not use CSS reversal to disguise a different keyboard sequence. On a narrow screen, stack the principal action above its supporting action. The horizontal choice keeps our current pattern and matches the RTL placement described by [Fluent](https://fluent2.microsoft.design/components/web/react/core/button/usage). It is not claimed as a universal Iranian standard.

Use a clear verb and object when needed: ثبت هزینه، دریافت گزارش، حذف هزینه. Use ادامه for an intermediate step, and name the actual commitment at the final step. انصراف dismisses the current operation; لغو درخواست can change persisted state and needs consequence-specific treatment. Keep labels consistent with the following status message. Technical props use Latin text; user-facing counts use Persian digits. Retain readable labels under text growth and RTL.

A leading action icon sits at logical start (right in RTL); a directional or disclosure icon can sit at logical end. Use at most one. Mirror directional travel icons deliberately; do not mirror Save, Plus or Trash. The owner rule suppresses an added selection checkmark when an action icon is supplied.

## Size, radius and state use cases

### What button size changes

See the Button documentation page (`/components/button`), under **اندازه و هدف لمس**, or change `sm`, `md` and `lg` in the **ظاهر، نیت و اندازه** playground. All three family members accept `size`.

| Measurement | sm | md (default) | lg |
| --- | --- | --- | --- |
| Minimum height | 36px | 44px | 52px |
| Horizontal padding per side | 12px | 16px | 20px |
| Vertical padding per side | 4px | 6px | 10px |
| Label font size at a 16px root | 14px | 14px | 16px |
| Icon size | 16px | 20px | 24px |

These are minimum heights: long labels can make a button taller. Label line-height uses the foundation's label-sm role for sm/md and label-md for lg. On touch/coarse-pointer devices, the minimum height is at least 44px. Icon-only controls use the control's minimum height for their square width and also respect the touch minimum; they do not use horizontal text padding.

**Button size and shadow level are separate choices.** Size does not select a different appearance, intent, radius variant, shadow token or motion timing. The regular solid/soft button recipe uses shadow.sm at every size; ghost and blocked buttons have no shadow. Both radius variants use native CSS rounding at 8px/12px.

| Axis | Guidance |
| --- | --- |
| sm | Dense tables and toolbars; preserve the foundation's 44px minimum target on coarse pointers |
| md | Default forms, dialogs and general product actions |
| lg | A prominent standalone or mobile CTA when the layout warrants it; size is not a substitute for hierarchy |
| less / more radius | 8px default / 12px softer context; use consistently within a group. Radius does not communicate priority, risk or selection |
| fullWidth | A constrained form or mobile action area where it improves reach and clarity; not automatic at a viewport breakpoint |
| loading | The operation is pending; keep the label and width stable, replace the icon with one spinner, announce progress and block duplicate activation |
| disabled | A known unmet prerequisite; explain how to proceed in nearby accessible text. Do not rely on a hover-only tooltip on a native disabled control |
| selected | Toggle state only, controlled with `pressed` or `defaultPressed`; separate from transient active/hover/focus |
| error / success | Communicate the outcome outside the button. Existing API has no success/error appearance. For an unknown outcome, verify status before offering a potentially duplicate commit |


## Review boundary

Button-family icons use the canonical icon foundation: simple Lucide outlines, rounded caps/joins and stroke 2.25 on the original 24 × 24 grid. Render at 16/20/24px for sm/md/lg (visible strokes 1.5/1.875/2.25px), inheriting the button foreground in every state. Loading replaces the icon and never mirrors; selection uses one supplied icon or one checkmark. Mirror only direction-dependent arrows in RTL; plus, save and trash retain their orientation. Icon-only actions still require an accessible name, and icon size does not reduce the touch target. See [Icons](../src/foundations/canonical/Icons.md).

Review each use case with keyboard, light/dark and enhanced contrast, RTL, narrow layouts, long Persian labels, loading, disabled, selected, reduced motion and forced colors. Preserve foundation colors, elevation and geometry. The known focus-ring contrast finding still applies. These usage definitions and the owner's two policy choices do not approve component states, product use, package release or deployment.
