# DataTable review candidate

Status: implemented for local review; no human state approval recorded. Do not treat checks as approval or adopt in products until the matrix below is approved.

Owner direction (2026-11-04): clicking the row opens پرونده details; selection stays in its checkbox. Neutral background change is the preferred hover and the default in the component, review page and logistics example. Brand hover remains available for comparison. This direction does not constitute approval of every state.

## Scope and use cases

Built from the existing Qipper floating-row DataTable, not a second table implementation. Card is for opening a part, shipment or order record. Compact supports longer operational lists. Asset gives multiline records more space. Multiple selection supports a separate batch-action workflow; opening a record never changes selection. Read-only display is supported by omitting onRowClick.

Removed column dot menus from the shared table, including the old menu-based filters. Sorting stays on the header with one icon, cycling ascending, descending and source order. The pipeline filter helpers remain internal for compatibility; filterable metadata no longer produces UI. Compose product filters outside the table with the existing Select. The logistics example also removes the trailing پرونده action and opens a real sample dialog from the whole row. Caller-supplied action columns are still supported for other use cases.

## Foundation mapping

- Surface: surface.base. Selected: interaction.surface.selected. Brand hover/press: brand.bg.hover / brand.bg.pressed. Neutral hover/press: existing interaction.neutral.hover / pressed alpha references, used without changing their supplied opacity. Per the owner's explicit correction, each state REPLACES the row background; no white base or selected plate is retained beneath the state color, and no pseudo-element overlay is used. The token's supplied alpha therefore composites against the containing canvas. Checkboxes preserve the selection indication while the hover/pressed background replaces the selected plate.
- Foreground: ink.primary / secondary / disabled; status text and backgrounds use their corresponding status roles.
- Card and asset: radius.16. Compact: radius.8. Ordinary rows have no default elevation; eligible rows use shadow.sm on hover alongside interaction.neutral.hover by default.
- Spacing uses semantic space tokens. Card padding is space.200 vertically (12px) and space.300 horizontally (16px), with space.900 minimum height (80px). Asset uses space.300 vertical padding (16px); compact uses space.85 vertical (6px) and space.100 horizontal padding (8px), retaining control.md.minHeight (44px). Legacy DATA_TABLE_VARIANT numeric geometry is retained as exported compatibility metadata; the CSS recipe owns rendered geometry.
- Row focus: independent 2px inset indicator in focus.ring; forced colors uses an inset system Highlight outline. No component colors, color mixing or new alpha values.
- Owner-requested hover/press motion: background-color and box-shadow transition with motion.duration.feedback (150ms) and motion.easing.standard, including return to rest. State endpoints still replace the row background with the exact tokens. Browser interpolation is limited to this explicitly requested transition; no intermediate colors are authored as tokens or component values. Focus stays immediate, layout does not move, and prefers-reduced-motion disables transitions.
- Pagination composes existing IconButton with appearance="ghost" and Select. The visible Select label and its 80px-wide field share one vertically centered row, separated by space.200 (12px); its existing 44px control height and styling remain. Selection composes the existing Checkbox, including indeterminate select-all.
- Shared DataState loading, empty and error presentations now use foundation styles; their existing API is retained. The retry action reuses Button and the spinner respects reduced motion. Its loop uses the same feedback-duration × 6 recipe as Button, rather than the presentation-only semantic.
- MoneyCell and MonoIdCell now use foundation ink/surface/type/space/radius roles rather than legacy slate colors, 9/11px type or custom alpha rings. RowActionCell composes Button with one directional icon and a visible label, retaining propagation isolation. These helper styles are included with DataTable styles.

No foundation values changed. The owner's explicit row-background replacement instruction takes precedence over the existing token usage description's overlay guidance for this recipe; this exception is recorded here rather than silently rewriting the foundation. If the existing neutral hover proves insufficient, propose a component-independent stronger interaction role mapped to an existing reference color for explicit foundation review. Do not repurpose a pressed token as hover or manufacture a tint. Brand hover is offered for comparison.

## Behavior and accessibility

Sorting is column-specific. In the logistics and review examples, مالک sets sortable: false, rendering a plain column heading with no sort icon, activation button or aria-sort. Other sortable headings retain their existing behavior.

A row uses a native button stretched over its surface, inside a table cell. It has one keyboard stop with getRowLabel (fallback: accessible accessor values). Enter and Space activate it natively. Semantic table/rowgroup/row/columnheader/cell roles and aria-sort remain available; this is not an editable ARIA grid. Nested controls sit above the activation surface and do not trigger row navigation. Use onRowClick for in-app detail actions; URL destinations needing open-in-new-tab should use an explicit link column instead. Screen reader review is pending.

The responsive card is preserved for all three variants. Desktop hidden columns are removed from the corresponding grid tracks; facts still appear on mobile. Long text wraps. Use explicit mobileRole for predictable content placement. Consumer width/minWidth metadata is retained; flexible tracks now shrink to available container width instead of forcing horizontal overflow. Column resize, pinning and spreadsheet editing remain unsupported.

Selection is independent of activation. Select-all affects eligible rows on the current page and preserves selection on other pages. Disabled rows cannot activate or be selected; disabled state is not an authorization boundary, and callers must govern any custom cell actions. Controlled selectedKeys is supported. Loading takes priority over error; error takes priority over empty. Retry is supplied by the caller. Pagination hides during loading, error and empty states.

## Review surface

/components/data-table in the documentation workbench contains light/dark and increased contrast switches; card/compact/asset layouts; neutral/brand hover; selection; page sizes; loading/empty/error and working retry; long text; and disabled rows. Opening a row shows a sample record dialog. These are review combinations, not approved variants.

## Approval matrix

All entries: human approval PENDING.

| Area | States to review |
| --- | --- |
| Card, compact, asset | Default, neutral/brand hover, pressed, keyboard focus |
| Selection | Unselected, selected, selected + hover/pressed/focus, indeterminate/all, across pages |
| Availability | Disabled navigation/selection; display-only rows |
| Data | Loading announcement, empty guidance, error and retry |
| Sorting | None, ascending, descending; keyboard |
| Context | Light, dark, increased contrast, forced colors, reduced motion |
| Viewports | Desktop, intermediate hidden columns, mobile 375px and 320px |
| Assistive technology | Screen reader table structure, row names and sort announcements |

## Validation

Run library and frontend typecheck/build, foundation token validation, and node scripts/check-data-table-page.cjs from the frontend. Browser checks and screenshots are local evidence only. Human state approval and manual screen reader review remain separate.

Validation result (2026-11-04): library and frontend typechecks and production builds PASS; canonical foundation token checks PASS under the existing contrast exception policy; browser review checks PASS across the states and viewports listed above. Visual inspection covered light/default/brand hover, dark selected/hover and the revised 320px card. Evidence is in rahino-ui-frontend/tmp-verify/data-table-page. Existing frontend chunk-size warning remains. No approval or publication was performed.
