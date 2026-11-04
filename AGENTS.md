# Component redesign guidelines

These rules apply to component redesign work across this workspace.

- Text inputs use surface.sunken by default and native radius.12 rounding. Use filled controls without default or error borders; the independent 2px focus indicator stays inside the field bounds. Keep labels visible and essential hints outside the field; placeholders are optional supplementary help. Forced-colors mode may use a system-color inset cue.

- Components must use our foundation tokens and rules without conflicts. If a component needs a foundation addition or change, consider and document that foundation update rather than introducing a conflicting component rule.
- Reference and semantic token names must be component-independent. Component names belong only in recipe token names; semantic names describe reusable roles or states.
- Colors must come from existing `ref.color.*` tokens, directly or through semantic aliases. Never invent component colors with `color-mix`, computed lightening/darkening, or new opacity values. Existing alpha reference tokens may be used as supplied; forced-colors mode may use system colors. Document missing reference colors or semantic roles as foundation proposals instead of manufacturing a color or repurposing an unrelated semantic token.
- All component states must be checked and approved before the component is used. Implementation or passing checks alone does not mean approval.
- Write use cases for every component.
- A button must never display more than one icon, including selection indicators and loading spinners. Loading replaces the existing icon; a toggle's checkmark must not appear beside a supplied icon.
- Buttons use native CSS rounding with foundation radius tokens (8px default, 12px more-rounded). Do not add corner smoothing, calculated clipping paths or shape masks to buttons.
- In Persian RTL action groups, place the primary action on the right and Cancel on the left; keep DOM and keyboard order consistent with the visual order.
- Destructive actions use a risk-based policy: confirm irreversible or high-impact actions, and offer a working Undo for routine reversible removal. An Undo label must correspond to actual restoration behavior.
- Shadow `lg` is exclusively for modal surfaces. Never use it on cards, card hover, buttons or other non-modal surfaces. Card hover may use `sm` when elevation is needed; floating non-modal surfaces use `md`.
