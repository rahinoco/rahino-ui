# Component redesign guidelines

These rules apply to component redesign work across this workspace.

- Components must use our foundation tokens and rules without conflicts. If a component needs a foundation addition or change, consider and document that foundation update rather than introducing a conflicting component rule.
- All component states must be checked and approved before the component is used. Implementation or passing checks alone does not mean approval.
- Write use cases for every component.
- A button must never display more than one icon, including selection indicators and loading spinners. Loading replaces the existing icon; a toggle's checkmark must not appear beside a supplied icon.
- In Persian RTL action groups, place the primary action on the right and Cancel on the left; keep DOM and keyboard order consistent with the visual order.
- Destructive actions use a risk-based policy: confirm irreversible or high-impact actions, and offer a working Undo for routine reversible removal. An Undo label must correspond to actual restoration behavior.
- Shadow `lg` is exclusively for modal surfaces. Never use it on cards, card hover, buttons or other non-modal surfaces. Card hover may use `sm` when elevation is needed; floating non-modal surfaces use `md`.
