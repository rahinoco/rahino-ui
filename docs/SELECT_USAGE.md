# Select: use cases and review contract

Status: implemented review candidate, 2026-11-04. Human state approval is pending. Do not treat the implementation or passing checks as product approval.

## Use cases

| Variant | Use it for | Behavior |
| --- | --- | --- |
| Single | Shipping method, priority, one status | One value; no checkbox or checkmark; committing closes the menu. |
| Multiple | Status filters, allowed delivery methods | Independent choices; existing Checkbox recipe; each change commits immediately and menu stays open. |
| Searchable single/multiple | Long lists and known item names | Filter existing options in the field; arbitrary text never becomes a value. |
| Non-searchable single/multiple | Short, browsable lists | Pointer/touch, arrow navigation, Enter/Space, and prefix typeahead. |
| `sm` | Dense filters and toolbar controls | 32px minimum field height. |
| `md` (default) | Standard forms | 40px minimum field height. |
| `lg` | Spacious or touch-first forms | 48px minimum field height. |
| Readonly | Review an existing choice without edits | Focusable/copyable value; no menu; participates in form data. |
| Disabled | A prerequisite is missing | Preserves display, skips keyboard focus, does not submit. Explain the prerequisite in helperText. |
| Loading | A caller is fetching replacement options | Keeps the committed value; spinner replaces chevron; stale options cannot be chosen. The caller owns data fetching and error/retry UI. |
| Empty/no results | No options supplied or filtering matches none | A visible status message; no active descendant and no invented option. |
| Error/required | A selection needs correction | Visible error replaces hint; aria-invalid and linked description; focus indicator remains independent. |

Use visible radio buttons or checkboxes when the choices should remain visible. Do not use Select for commands, navigation, free text, creation, or a large data explorer. Clearable chips, nested groups, select-all, virtualization, and remote request management are outside this recipe.

## Foundation mapping

| Part/state | Existing foundation mapping |
| --- | --- |
| Default trigger | `surface.sunken`, `radius.12`, no border |
| Hover / press layers | `interaction.neutral.hover` / `interaction.neutral.pressed` behind full-opacity content |
| Focus/open trigger | `focus.ring.width` (2px) + `color.focus.ring`, inset and independent of fill |
| Error / disabled / readonly | `status.error.bg` / `surface.subtle` / `surface.base` |
| Menu | Opaque `surface.raised`, `shadow.md`, native `radius.12` |
| Field size | `space.500` / `space.600` / `space.700` for the 32 / 40 / 48px minimum heights, matching text input; all sizes use `radius.12` and 16px `type.input-touch` |
| Row | `radius.8`, a minimum of 44px or the field height if larger, foundation spacing and label typography |
| Previously selected row | No persistent row fill, ring or single-select marker; multi selection is shown only by Checkbox |
| Active row | Neutral hover layer during keyboard navigation; pointer hover follows the actual hovered row. No option focus ring. |
| Text / hint / disabled | `ink.primary` / `ink.secondary` / `ink.disabled` |
| Icons | `icon.size.md`, `icon.stroke.width`; error mark uses `icon.size.sm` |
| Multi indicator | Actual existing Checkbox component, including its existing fills, disabled states, 4px radius and press motion |
| Forced colors | System Canvas/ButtonText/Highlight/GrayText cues with inset focus |

All colors terminate at existing `ref.color.*` tokens. No palette values, semantic names, opacity values, or manufactured colors are added. Recipe variables use the Select name; no foundation token contains it. A 280px menu cap is a layout constraint, exposed as `--rds-select-menu-max-height`; position and available height adapt to the viewport. Gap and screen gutter resolve through `space.100`.

The requested text-field-style 12px trigger is an explicit recipe choice over the general 8px control default. The matching compact menu uses the existing 12px smaller-surface radius; rows use the smaller 8px radius. No new radius token or smoothing is needed. Larger floating panels still use their existing 16px rule. Shadow lg is never used.

## Foundation review still required

- The existing sunken field fill does not establish 3:1 silhouette contrast on every host surface. This is inherited from the chosen text-field treatment; do not manufacture a replacement.
- The unchecked checkbox retains the already documented unselected-control semantic proposal in `CHECKBOX_TOKEN_PROPOSAL.md` and its contrast findings.
- Options have no focus ring. The field keeps its independent inset ring; keyboard navigation uses the existing neutral interaction layer (system Highlight fill in forced colors).
- A future semantic improvement must describe a reusable control/state role, terminate at an approved reference color and update the master collection. This component does not silently adopt a foundation proposal.

## API and edge policy

`SelectProps` discriminates `multiple`: single `value` is a string or null and `onChange` receives a string; multiple values are readonly string arrays and callbacks receive a string array. Controlled and uncontrolled modes follow React conventions. `defaultValue` initializes uncontrolled state. Native form reset restores it and closes the menu; a controlled owner resets its own value. A canceled reset is respected.

`options` accept nonempty unique string values, text labels and an optional disabled flag. Empty values are reserved for no selection; duplicate values use their first occurrence. The rendered/serialized selection is intersected with available options, so removed values are not shown or submitted. An externally supplied value may become visible again if its option returns. Already selected disabled options remain displayed and submitted; other choices do not erase them. Selection order follows options order, and repeated values cannot produce repeated options or hidden fields.

`name` and `form` use a visually hidden native select for actual FormData participation, multiple values, required validity and external form association. Invalid submission focuses the visible control without opening a hidden native popup. Caller-provided `error` owns the visible correction message. Readonly controls skip required validation and submit their committed value. Disabled controls do not submit. Native autofill, asynchronous request races and server validation remain caller concerns.

`searchable` remains true by default for existing consumers. Use false for the supplied compact browse pattern. `controlSize`, `dir`, `textScript`, `helperText`, `loadingText`, `emptyText`, `aria-label` and `aria-describedby` cover sizing, scripts, naming and support. `className` belongs to the root; legacy trigger-only classes should migrate to `controlClassName`, and neither should override foundation styling. The separate historical RahinoSelect and QippoSelect exports remain reference implementations.

## Interaction and accessibility

- Tab focuses one control. Focus alone does not open it. Click, Enter, ArrowDown, ArrowUp and (non-searchable) Space open it.
- Arrows move the active option, skip disabled options and do not commit changes. Home/End go to list edges in static mode; Ctrl+Home/End do so in searchable mode, preserving text editing keys.
- Opening with a pointer does not highlight the previously selected row. Selection remains available to assistive technology through aria-selected. Keyboard navigation has a temporary fill cue, with no ring or persistent selection fill.
- Enter commits/toggles. Space toggles in non-searchable multiple mode and stays text input in searchable mode. Typeahead handles non-searchable lists; Persian/Arabic kaf and yeh normalize during matching.
- Escape closes without modifying the last committed value. Multi-select changes are immediate and remain committed. Escape is stopped at the open select so a surrounding dialog closes only on a later Escape.
- Tab closes and continues; outside pointer and blur close without stealing focus. Menu descendants are excluded from Tab order. DOM focus stays on the field with aria-activedescendant.
- The multi row is the existing Checkbox itself with role=option and aria-selected, rather than an interactive checkbox nested in an option. Standalone Checkbox defaults remain unchanged. This follows the [W3C listbox restriction on nested interactive content](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/). Combobox behavior follows the [W3C combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/); multi selection uses the modifier-free listbox model.
- IME composition does not commit on Enter. Disabled/readonly changes close an existing menu. Loading and changing option data clear invalid active descendants.
- Native Popover API puts the menu in the top layer while retaining theme inheritance and the modal's DOM subtree. It escapes transformed/overflow-clipped parents, flips above when appropriate, clamps to screen edges and follows scroll, resize and visual viewport changes. Requires ResizeObserver and native Popover API; unsupported older browsers are outside the current compatibility contract.

## Verification and approval

Run `node scripts/check-select-browser.mjs`. Evidence is generated in `tmp-verify/select/`, including results JSON and light/dark single/multi, mobile and forced-color screenshots. The docs route `/components/select` and Storybook `Components/Select` expose the implementation for human review.

Automated evidence covers the state/theme/direction/size matrix and keyboard, pointer, touch, search, forms, reset, dynamic options, loading, composition, clipping, viewport flipping, modal Escape and standalone checkbox regression. It does not prove absence of bugs. Chrome is the tested engine; Firefox/Safari, screen readers and final human state approval remain outstanding. Builds and foundation validation are recorded separately from visual/accessibility approval.

| Review gate | Status |
| --- | --- |
| Core implementation and use cases | Complete |
| Browser regression and visual evidence | Generated by the checked-in review script |
| Foundation contrast findings | Recorded; unresolved |
| Manual screen-reader and other-engine review | Pending |
| Owner approval of every state | Pending |
| Product use / publication | Not approved by this work |

Validation recorded on 2026-11-04: library and frontend type checks/builds passed; canonical token validation passed; Select regression passed 576 cases (2 selection modes × 2 search modes × 2 sizes × 9 states × 2 themes × 2 contrast contexts × 2 directions) and interaction checks. The live documentation bundle passed actual theme/contrast switching, single/multiple behavior, sizing, RTL/LTR, real Modal Escape and 320px layout checks. Existing Checkbox regression passed 576 style cases and interactions and retained its 96 reported unchecked-fill contrast findings. Owner approval and manual assistive-technology/other-engine checks remain pending.

Owner-requested visual revision, 2026-11-04: removed all option focus rings and persistent selected-row fills. Pointer opening no longer highlights the previous selection. The field retains its inset ring; keyboard navigation uses a temporary neutral fill and multi-select keeps its Checkbox checkmarks. The 576-case browser regression now asserts no option outline/shadow/selection fill and no automatic pointer-open highlight; the updated regression and documentation-page checks passed.

Sizing revision, 2026-11-06. The Chrome regression passed 864 cases across all three field sizes and verified the minimum option height. The live docs verified all three field heights in single and multiple Select. Both repositories passed type checks and production builds, and Storybook built successfully. Human state approval remains pending.
