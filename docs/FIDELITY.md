# Qipper Fidelity Audit (Phase 1)

Scope: extract **Qipper Reference** UI, not a Rahino Design System and not a Qippo comparison.

SOURCE: `qipper-app-frontend` (`src/shared/ui`, call sites in `src/pages`, `src/features`)
TARGET: `rahino-ui`
WORKBENCH: `rahino-ui-frontend`

Verdict in one line: **core primitives (Button, Input, Select, Modal, Checkbox, Badge, Tabs, Card, FormField, Textarea) are copies of Qipper modules, not redesigns. The workbench previously rendered a reconstruction of the canvas (font, incomplete globals, missing Tailwind scan, English toy stories). That canvas is now restored. Several layout/theme adapters remain adapted, not byte-identical.**

---

## Runtime canvas (the actual visual bug)

These are not component-API changes. They made extracted TSX look like a cousin of Qipper:

| Gap | Qipper | Previous rahino-ui / workbench | Correction |
| --- | --- | --- | --- |
| Typeface | IRANYekanX woff2 via `@font-face` | Vazirmatn Google font | Copied Qipper woff2; `@theme --font-sans: IRANYekanX` |
| Token names | `--qipper-*` | `--rahino-*` only | `--qipper-*` restored; `--rahino-*` aliases |
| `fieldTokens` focus ring | `var(--qipper-brand-500)` | `var(--rahino-brand-500)` | Restored `--qipper-*` |
| Globals | scrollbar hide, dark `bg-white` remaps, `button/input { font-family }` | Partial | Copied from Qipper `index.css` |
| Tailwind scan | Vite plugin scans the Qipper app | Library classes often not generated | `@source` on library + workbench TSX |
| Stories | Persian call sites, icons, `!h-12` | English Primary/Secondary toys | Qipper Reference stories from real files |

---

## Button

1. **Original:** `src/shared/ui/Button.tsx`
2. **Dependencies:** `clsx`, `framer-motion`, `tailwind-merge`. Icons are **not** a dependency of Button; call sites pass Lucide nodes as children.
3. **Variants:** `primary | secondary | ghost | danger`. Aliases in the same file: `outline→secondary`, `soft→secondary`, `slate→primary`. Call sites overwhelmingly use the four real variants. `outline` is used on **Badge**, not Button.
4. **States:** default; CSS `hover` / `active`; `focus-visible` ring; `disabled` (opacity 40); `isLoading` (inline SVG spinner + disabled). `whileTap` scale 0.98 unless disabled/loading. **No** `icon` / `success` / `block` props.
5. **Styling:** Tailwind semantic tokens (`bg-primary-500`, `shadow-glow`, `rounded-2xl`). Sizes: sm `h-9`, md `h-11`, lg `h-12`. Login submit is **md + `className="w-full !h-12"`**, not `size="lg"`.
6. **Behavior:** native button attrs; loading forces disabled; aliases resolve before class map.
7. **Transferred:** TSX is the Qipper module (imports rewritten to `@/components`).
8. **Changed:** none in the component. Canvas/font/story presentation changed (now restored).
9. **Why:** import paths only.
10. **Lost:** nothing in the Button module. Previously lost visually: IRANYekanX, `shadow-glow` if Tailwind did not scan the file.

Call-site references: `pages/auth/LoginPage.tsx`, `pages/logistics/LogisticsHubPage.tsx`, `features/tasks/modals/CreateFocusTaskModal.tsx`.

---

## Input

1. **Original:** `src/shared/ui/Input.tsx` + `FormField.tsx` + `fieldTokens.ts`
2. **Dependencies:** FormField, FIELD tokens, `clsx`, `tailwind-merge`
3. **Variants / options:** `label`, `icon`, `endAdornment`, `dir` (`ltr` for credentials), `mono`, `dense`, native input attrs. **No size prop.**
4. **States:** default, hover (CSS on FIELD.controlOk), focus glow via `--qipper-*`, error, disabled. **No loading.**
5. **Styling:** `h-11 rounded-2xl border-0 bg-bg-muted`. Login LTR puts icon/endAdornment on the inline-end. Logistics search passes `className="!h-12"` onto **FormField**, not the `<input>` — that is Qipper’s real API, kept.
6. **Behavior:** `forwardRef`; auto id; FormField error slot.
7. **Transferred:** copy + import rewrite. FIELD vars restored to `--qipper-*`.
8. **Changed:** previously FIELD used `--rahino-*` (visual no-op once aliases exist; now original names).
9. **Why:** extraction rename; reverted.
10. **Lost:** previously focus ring if `--qipper-*` missing. No Input-level loading was ever in Qipper.

---

## Select

1. **Original:** `src/shared/ui/Select.tsx`
2. **Dependencies:** FormField, FIELD, lucide `Check` + `ChevronDown`
3. **Variants:** labeled vs unlabeled toolbar. `searchable` defaults **true**. `controlClassName` or unlabeled `className` applies to the trigger (`!h-12` on logistics filters).
4. **States:** closed, open (`FIELD.controlOpen`), search filter, empty filtered list, error, disabled. Click-outside closes. **Not** a WAI-ARIA combobox.
5. **Styling:** same FIELD geometry as Input; chevron `left-0` (physical left, Qipper quirk).
6. **Behavior:** custom dropdown, not native `<select>`.
7. **Transferred:** copy + import rewrite.
8. **Changed:** none in TSX.
9. **Why:** n/a
10. **Lost:** none in the module. Keyboard nav was already limited in Qipper.

---

## Modal

1. **Original:** `src/shared/ui/Modal.tsx` (plus `ConfirmationModal.tsx`)
2. **Dependencies:** `framer-motion`, `lucide-react` (`X`), `createPortal`
3. **Variants:** sizes `sm md lg xl 2xl`; `ModalFormCard`; `ChoiceTile` (finance tile).
4. **States:** open/closed AnimatePresence; Escape; backdrop click (`closeOnBackdrop`); body scroll lock; `hideClose`.
5. **Styling:** `rounded-[2rem] shadow-heavy bg-bg-surface`; overlay `bg-overlay backdrop-blur-sm`; icon well `bg-primary-50`. Default `bodyClassName="bg-bg-body"`. CreateFocusTask overrides `bodyClassName="bg-bg-surface"`.
6. **Behavior:** portal to `document.body`; Persian `aria-label="بستن"`.
7. **Transferred:** byte-identical except imports.
8. **Changed:** none.
9. **Why:** n/a
10. **Lost:** none. Close copy is Persian-only (Qipper).

---

## DataTable / QipperTable

1. **Original:** `src/shared/ui/QipperTable/` (`QipperTable.tsx` + column menu, pagination, mobile card, cells)
2. **Dependencies:** Checkbox, DataState, lucide arrows
3. **Variants:** `card | compact | asset` (Qipper `DATA_TABLE_VARIANT`)
4. **States:** loading, empty, sort, filter, pagination, selection, mobile card
5. **Styling:** row cards `rounded-2xl shadow-light`; selected row uses `var(--qipper-brand-500)` mix
6. **Behavior:** client pipeline (sort/filter/page); CSV export helper
7. **Transferred:** folder copied, **exported as `DataTable`** with `QipperTable` alias restored
8. **Changed:** rename QipperTable→DataTable; class `qipper-table` restored (also `rahino-table`); CSS var `--rahino-brand-500` reverted to `--qipper-brand-500`
9. **Why:** library naming vs product class hooks
10. **Lost:** product name at the export (alias restored). Mobile heuristics still hardcode Qipper column ids (`name`, `part`, `statusIcon`). Persian copy in menu/pagination kept.

---

## MetricCard

1. **Original:** `src/shared/ui/MetricCard/`
2. **Dependencies:** lucide, internal themes
3. **Variants:** hero, radar, stat, inline, mini, bare, split, progress (from Qipper)
4. **States:** loading, alert, expanded, trend
5. **Styling:** Qipper metric themes / primary tokens
6. **Behavior:** layout switch + optional drill-down
7. **Transferred:** copy + import rewrite. `StatCard` remains a deprecated alias (as in Qipper).
8. **Changed:** import paths
9. **Why:** package layout
10. **Lost:** none identified in the module. Workbench previously showed generic English-ish samples; Data stories still use simplified rows, not a live logistics grid.

---

## Other extracted modules

| Component | Original | Faithful? | Intentional change |
| --- | --- | --- | --- |
| Badge, Card, Checkbox, Textarea, FormField, Table, Tabs, RadioGroup, TimePicker, DateTimePicker, DataState, PageShell, SectionHeader, ConfirmationModal | `src/shared/ui/*` | Yes (imports) | Tabs default `layoutId` restored to `qipper-*-tabs` |
| DatePicker | `src/shared/ui/DatePicker.tsx` | **Adapted** | `useUIStore` → `ThemeProvider` / `useOptionalTheme`. CSS classes restored to `qipper-pdp` |
| PageHeader | `src/shared/ui/PageHeader.tsx` | **Adapted** | TanStack `useRouter().history.back()` → `onBack` / `window.history.back()` |
| AppearanceControls | Qipper appearance widget | **Adapted / extended** | ThemeProvider; extra product switcher (Qippo/Digix slots) — **not a Qipper product control** |
| ErrorBoundary | `src/shared/ui/ErrorBoundary.tsx` | **Adapted** | Sentry/env removed; optional `onError` |
| AuthShell | `src/pages/auth/AuthGlassShell.tsx` | **Adapted** | QipperLogo removed; `mark` prop |
| SegmentedPills | logistics feature control | **Reconstructed** as shared | Renamed/moved from feature, not `shared/ui` |
| DefinitionRow / SpecRow | inventory `InfoRow` | **Reconstructed** | Renamed |
| InlineNotice | `DutyNotice` | **Reconstructed** | Renamed |

These last three **should not be presented as canonical shared Qipper primitives** until we decide they belong in rahino-ui.

---

## Should not belong in rahino-ui (product chrome / domain)

Documented in inventory `productSpecific: true` / missing extracts:

- QipperLogo
- Eldora device frames
- Sidebar, Header, CommandPalette, NotificationDrawer
- Domain badges, kanban, timeline (`TimelineNode`)
- Finance wizard, PR wizard, logistics BulkIntake as pages
- Task `StatusBadge` (hardcoded TaskStatus)

---

## Qipper-specific dependencies that need adaptation (library already did, or still would)

| Dependency | Used by | Adaptation |
| --- | --- | --- |
| `framer-motion` | Button, Modal, Tabs | Keep — it **is** the Qipper behavior |
| `lucide-react` | call sites + Select/Modal/Checkbox | Keep as peer; not a Rahino icon set |
| `persian-date-kit` | DatePicker | Keep; CSS class names `qipper-pdp` |
| `zustand` `useUIStore` | DatePicker, Appearance | Replaced with ThemeProvider |
| `@tanstack/react-router` | PageHeader | Removed |
| Sentry | ErrorBoundary | Removed |
| QipperLogo | Auth shell | `mark` slot |
| IRANYekanX files | global canvas | Copied from Qipper `public/fonts` (licensing is Qipper’s existing ship) |

---

## Workbench

Qipper Reference stories live under **Qipper Reference/** and use real call-site copy, icons, and className overrides.

Comparison Lab:

- Live column = extracted Qipper implementation
- Qippo = not this phase
- Third column = explicitly **not** a canonical Rahino component

States that are CSS (hover/focus/active) are documented, not invented as matrix cells.

---

## Remaining known gaps (do not call extraction “complete” for these)

1. DatePicker / PageHeader / ErrorBoundary / AuthShell / AppearanceControls are **adapters**.
2. SegmentedPills, DefinitionRow, InlineNotice are **reconstructions**.
3. DataTable is QipperTable with a library name (alias restored).
4. Workbench DataTable story is a 2-row sample, not the logistics grid with Qipper columns.
5. Manager chrome (Storybook sidebar) may still use a fallback font; **preview canvas** uses IRANYekanX.
6. Qipper app itself must be running locally to pixel-compare login / logistics / focus-task modal.

Definition of done for **Button, Input, Select, Modal primitives:** Qipper module ≈ rahino-ui module ≈ Qipper Reference story, with canvas restored. Visual confirmation is required in the running apps.
