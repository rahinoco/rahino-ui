# Open questions — Phase 0

Do not treat answers here as decisions. Design questions are unanswered.

## Blocking

### Q-RADIO-01

- **Related inventory item:** radio, segmented-pills
- **Question:** Should RDS Radio be a circular radio (Qippo), segmented pills (Qipper RadioGroup/RadioPills), both as separate components, or something else?
- **Why it matters:** Current lab id `radio` compares non-equivalent controls. Shipping one name would encode a false match.
- **Evidence currently available:** Qipper `src/shared/ui/RadioGroup.tsx`; Figma `Radio button` `2858:4242`; Figma `Segmented control` `7506:49134`.
- **Required human decision or missing source:** Human decision. Do not merge names.

### Q-SELECT-01

- **Related inventory item:** select, rahino-select
- **Question:** Is searchable Qipper Select a Combobox, and is Qippo Select a separate non-search menu?
- **Why it matters:** Default `searchable=true` vs Figma closed/open Select. RahinoSelect is experimental only.
- **Evidence currently available:** Qipper `Select.tsx`; Figma `Select` `7347:24406`; `src/rahino/Select.tsx`; decisions still `pending`.
- **Required human decision or missing source:** Human decision on component split and whether RahinoSelect proceeds.

### Q-TOAST-01

- **Related inventory item:** toast, inline-notice
- **Question:** Are Snackbar and Inline notice both in RDS, and which lab id owns each?
- **Why it matters:** Lab `toast` maps Qippo Snackbar to Qipper banners.
- **Evidence currently available:** Figma `Snackbar` `2302:1232`; `DutyNotice.tsx`; `InlineNotice.tsx`.
- **Required human decision or missing source:** Human naming + presence decision.

### Q-CARD-01

- **Related inventory item:** card, landing-info-card, module-components
- **Question:** What is the RDS Card primitive versus Qippo product cards?
- **Why it matters:** Generic Qipper Card ≠ Landing Info Card ≠ Module Components.
- **Evidence currently available:** `Card.tsx`; Figma `2325:1506`; section `3189:45067`.
- **Required human decision or missing source:** Human scope cut.

### Q-INPUT-FIGMA-01

- **Related inventory item:** input
- **Question:** Which Figma set is the Qippo input source: `Text input` `7130:57816`, duplicate `7878:50634`, or `Input` `2397:9197`?
- **Why it matters:** Three sets. Reconstruction currently follows one without a recorded decision.
- **Evidence currently available:** MCP COMPONENT_SET list on Ui Kit.
- **Required human decision or missing source:** Designer confirmation + property dump when API allows.

### Q-COLOR-01

- **Related inventory item:** color
- **Question:** Which color system is the RDS baseline: Qipper `--qipper-*`, Qippo local fills, or a future Rahino palette?
- **Why it matters:** Live extracted UI uses Qipper #4179f0. Qippo components use different fills. No color page verified.
- **Evidence currently available:** `rahino-ui/src/styles/tokens.css`; Figma components; `products.css` labels only.
- **Required human decision or missing source:** Human token decision. Do not invent a third palette in Phase 0.

### Q-TYPE-01

- **Related inventory item:** typography
- **Question:** Which typeface(s) are in RDS: IRANYekanX (Qipper live), Yekan Bakh / Estedad (Ui Kit mix), or other?
- **Why it matters:** Cannot freeze typography while faces conflict.
- **Evidence currently available:** `src/styles/index.css`; Figma text on `Text input` `7130:57816`.
- **Required human decision or missing source:** Human / brand decision.

### Q-ICON-01

- **Related inventory item:** iconography, magicoon
- **Question:** Is Magicoon in RDS, or does RDS keep lucide (Qipper), or a third set?
- **Why it matters:** Icon foundation cannot freeze with two libraries.
- **Evidence currently available:** Qipper lucide usage; Figma Magicoon sections `2024:6267` / `2024:10873`.
- **Required human decision or missing source:** Human decision. Magicoon full import is huge.

## High Priority

### Q-INPUT-01

- **Related inventory item:** input, rahino-input
- **Question:** Does RahinoInput (floating label hybrid) remain a lab candidate or get withdrawn until a Decision Record is approved?
- **Why it matters:** It is already live in the lab Rahino slot while decisions are pending. Easy to mistake for canonical.
- **Evidence currently available:** `src/rahino/Input.tsx`; `src/decisions/index.ts` status pending; ComparisonPage live slot.
- **Required human decision or missing source:** Human process decision.

### Q-ICONBTN-01

- **Related inventory item:** icon-button, button
- **Question:** Does RDS get a dedicated Icon Button, or only Button with icon children / size overrides?
- **Why it matters:** Qipper has no primitive; Qippo has `icon-Button` `2039:3836`.
- **Evidence currently available:** Qipper Button className overrides; Figma set.
- **Required human decision or missing source:** Human API decision.

### Q-DIALOG-01

- **Related inventory item:** dialog
- **Question:** Is Dialog required in RDS without a Qippo Figma source?
- **Why it matters:** Strong Qipper Modal; Ui Kit has no named Modal.
- **Evidence currently available:** `Modal.tsx`; MCP Ui Kit list with no Modal/Dialog name.
- **Required human decision or missing source:** Accept Qipper-only, search other Figma pages, or defer.

### Q-AVATAR-01

- **Related inventory item:** avatar
- **Question:** Which Figma Avatar set is source (`2066:1223` vs `2021:5611`), and is PersianAvatar in RDS?
- **Why it matters:** Duplicate Figma names. Qipper avatar is a dashboard widget.
- **Evidence currently available:** MCP duplicate Avatar; `PersianAvatar.tsx`.
- **Required human decision or missing source:** Designer pick + RDS inclusion.

### Q-TABS-01

- **Related inventory item:** tabs, segmented-pills
- **Question:** Should Qipper `Tabs` segmented layout be removed from Tabs once Segmented is a separate component?
- **Why it matters:** One module currently encodes two patterns.
- **Evidence currently available:** `Tabs.tsx` SegmentedTabs/UnderlineTabs; Figma Horizental Tabs `2035:4098`.
- **Required human decision or missing source:** Human API split.

### Q-TABLE-01

- **Related inventory item:** data-table, table
- **Question:** Is primitive `Table` kept beside `DataTable`/`QipperTable`?
- **Why it matters:** Two extracted table APIs.
- **Evidence currently available:** `Table.tsx`; `DataTable`.
- **Required human decision or missing source:** Keep both, deprecate one, or nest.

## Normal

### Q-BADGE-01

- **Related inventory item:** badge, status-badge
- **Question:** Does Qippo have a status Badge set, or only Magicoon overlays?
- **Why it matters:** Registry notes vs MCP: no dedicated Badge set confirmed.
- **Evidence currently available:** Qipper `Badge.tsx`; Other-Component section `2023:3412`.
- **Required human decision or missing source:** Figma property search / designer.

### Q-SWITCH-01

- **Related inventory item:** switch
- **Question:** Which switch set is source: `Switch-Button` `2014:3071` or `Switch kits` `7124:55551`?
- **Why it matters:** Two sets. Reconstruction follows one.
- **Evidence currently available:** MCP list.
- **Required human decision or missing source:** Designer confirmation.

### Q-DATE-01

- **Related inventory item:** date-picker
- **Question:** Are the two Figma Date picker sets duplicates or different products (Jalali vs Gregorian)?
- **Why it matters:** IDs `7453:49460` and `3296:54851`. Qipper is Jalali.
- **Evidence currently available:** MCP names only.
- **Required human decision or missing source:** Inspect variants when properties API works.

### Q-DATETIME-01

- **Related inventory item:** date-time
- **Question:** Does Figma Date time match Qipper DateTimePicker?
- **Why it matters:** Name-only match is forbidden as exact-match.
- **Evidence currently available:** `DateTimePicker.tsx`; Figma `3296:54884`.
- **Required human decision or missing source:** Variant/property comparison.

### Q-TEXTAREA-01

- **Related inventory item:** textarea
- **Question:** Is there a Qippo Textarea on Ui Kit under another name?
- **Why it matters:** Qipper has Textarea; Figma set not confirmed.
- **Evidence currently available:** `Textarea.tsx`; MCP list without Textarea name.
- **Required human decision or missing source:** Designer / deeper node walk.

### Q-METRIC-01

- **Related inventory item:** metric-card
- **Question:** Is MetricCard RDS or Qipper dashboard-only?
- **Why it matters:** Heavy composite; Figma mapping unknown.
- **Evidence currently available:** `MetricCard.tsx`; docs page exists.
- **Required human decision or missing source:** Scope decision.

### Q-STAT-01

- **Related inventory item:** stat-card, metric-card
- **Question:** Keep StatCard as a separate composite?
- **Why it matters:** Overlap with MetricCard.
- **Evidence currently available:** `StatCard.tsx`.
- **Required human decision or missing source:** Human consolidate-or-keep.

### Q-HEADER-01

- **Related inventory item:** page-header
- **Question:** Is Qippo Header (`2287:6171`) an RDS layout or Qippo app chrome only?
- **Why it matters:** Lab `app-chrome` is not live. Qipper PageHeader is different.
- **Evidence currently available:** Figma Header-Component `2009:10320`; `PageHeader.tsx`; widgets `Header.tsx`.
- **Required human decision or missing source:** Scope cut.

### Q-OTP-01

- **Related inventory item:** otp
- **Question:** Is Login Code in shared RDS or Qippo-auth only?
- **Why it matters:** Reconstructed and live in lab while possibly product-specific.
- **Evidence currently available:** Figma `2187:3585`; no Qipper shared OTP.
- **Required human decision or missing source:** Human scope.

### Q-AUTH-01

- **Related inventory item:** auth-shell, login-screens
- **Question:** Does RDS include an auth layout, or only products?
- **Why it matters:** AuthShell extracted; Qippo Login is a full section.
- **Evidence currently available:** `AuthGlassShell.tsx`; Figma Login `3663:19593`.
- **Required human decision or missing source:** Scope cut.

### Q-THEME-01

- **Related inventory item:** theme-provider, color
- **Question:** What does `data-product` mean for RDS theming?
- **Why it matters:** Currently labels, not palettes. Playground writes Qipper CSS variables.
- **Evidence currently available:** `src/styles/products.css`; theme module.
- **Required human decision or missing source:** Architecture decision (later phase).

### Q-A11Y-01

- **Related inventory item:** accessibility
- **Question:** What is the a11y bar for RDS (focus, names, contrast) and who audits?
- **Why it matters:** Docs page exists; no tests.
- **Evidence currently available:** No `*test*` in rahino-ui.
- **Required human decision or missing source:** Human standard.

### Q-SIZE-01

- **Related inventory item:** sizing, button
- **Question:** Which size names are RDS (sm/md/lg vs Figma button 456 variants)?
- **Why it matters:** Property definitions were not dumped.
- **Evidence currently available:** MCP variantCount on `button` `2230:6522`; Qipper Button sizes.
- **Required human decision or missing source:** Property dump + mapping table.

### Q-MODULE-01

- **Related inventory item:** module-components
- **Question:** Should Module Components be inventoried node-by-node in a later phase?
- **Why it matters:** Section is large; treated as product-specific blob.
- **Evidence currently available:** Section `3189:45067`.
- **Required human decision or missing source:** If any module is shared, list it; else keep out of scope.

### Q-BRAND-01

- **Related inventory item:** brand
- **Question:** Is there a Rahino mark for RDS, or only product logos?
- **Why it matters:** Brand foundation page exists; Rahino-as-finished-DS is forbidden.
- **Evidence currently available:** Docs `/foundations/brand`; QipperLogo.
- **Required human decision or missing source:** Brand owner.

### Q-SLIDER-01

- **Related inventory item:** range-slider
- **Question:** Is Range slider needed in current RDS track?
- **Why it matters:** Figma only so far.
- **Evidence currently available:** `2858:7100`.
- **Required human decision or missing source:** Keep deferred or promote.

### Q-MENU-01

- **Related inventory item:** menu-item
- **Question:** Is Menu item a dropdown primitive for RDS?
- **Why it matters:** Figma set with no extracted twin.
- **Evidence currently available:** `7336:54313`.
- **Required human decision or missing source:** Scope.

### Q-SEG-01

- **Related inventory item:** segmented-pills
- **Question:** Should logistics `SegmentedPills` remain the Qipper source of truth vs RadioPills vs extracted copy?
- **Why it matters:** Three implementations of one pattern.
- **Evidence currently available:** feature file; `RadioGroup.tsx`; `rahino-ui/src/components/SegmentedPills.tsx`.
- **Required human decision or missing source:** Dedup policy (later; do not move files now).

## Deferred

### Q-FIGMA-PROPS-01

- **Related inventory item:** (many Qippo sets)
- **Question:** When can COMPONENT_SET property definitions be dumped (size/type/state enums)?
- **Why it matters:** Freeze of variant matrices is blocked.
- **Evidence currently available:** MCP `componentPropertyDefinitions` errors this phase.
- **Required human decision or missing source:** Retry Figma API or manual inspect in file.

### Q-DIGIX-01

- **Related inventory item:** (all items products.digix)
- **Question:** Does Digix use any of these?
- **Why it matters:** All `digix: unknown`.
- **Evidence currently available:** No Digix repo in this workspace.
- **Required human decision or missing source:** Source or explicit out-of-scope.

### Q-EXTRA-PAGES-01

- **Related inventory item:** dialog, textarea, tooltip
- **Question:** Do other Qippo Figma pages contain Modal/Textarea/Tooltip not on Ui Kit?
- **Why it matters:** Inventory is Ui Kit only by mission.
- **Evidence currently available:** Page `1:3` only.
- **Required human decision or missing source:** Optional later page scan. Do not guess.
