# Component Inventory (Phase 0)

Readable baseline. Source of truth for fields: `COMPONENT_INVENTORY.json`.

Scope status: **PROVISIONAL** (see `SCOPE_FREEZE.md`).

## 1. Summary counts

- Total items: **71**
- By kind:
  - `component`: 15
  - `composite`: 5
  - `foundation`: 14
  - `layout`: 4
  - `pattern`: 3
  - `primitive`: 11
  - `product-specific`: 15
  - `utility`: 4
- By status:
  - `ambiguous`: 8
  - `duplicate`: 6
  - `missing`: 3
  - `needs-review`: 13
  - `partial`: 29
  - `verified`: 12

No item has `canonical: present`. Rahino Input/Select are `experimental` candidates.

## 2. Foundations

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accessibility | Accessibility | foundation | partial | unknown | extracted | missing | missing | missing | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Button.tsx |
| border | Border | foundation | partial | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/app/styles/tokens.css |
| brand | Brand | foundation | present | partial | extracted | missing | missing | missing | present | missing | needs-review | needs-review | qipper-app-frontend:src/shared/ui/QipperLogo.tsx; figma:3663:19593 |
| breakpoints | Breakpoints | foundation | present | unknown | extracted | missing | missing | missing | present | missing | candidate | partial | qipper-app-frontend:src/shared/hooks/useMediaQuery.ts |
| color | Color | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | ambiguous | qipper-app-frontend:src/app/styles/tokens.css; figma:2230:6522 |
| iconography | Iconography | foundation | present | present | extracted | missing | missing | missing | present | missing | required | ambiguous | qipper-app-frontend:package.json; figma:2024:6267 |
| motion | Motion | foundation | partial | unknown | extracted | missing | missing | missing | present | missing | candidate | partial | qipper-app-frontend:src/shared/ui/Modal.tsx |
| radius | Radius | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | partial | rahino-ui:src/styles/tokens.css; figma:2230:6522 |
| rtl | RTL | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Input.tsx; figma:2230:6522 |
| shadow | Shadow | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | partial | rahino-ui:src/styles/tokens.css; figma:2073:4138 |
| sizing | Sizing | foundation | partial | partial | extracted | missing | missing | missing | missing | missing | candidate | partial | rahino-ui:src/tokens/fieldTokens.ts; figma:2230:6522 |
| spacing | Spacing | foundation | present | unknown | extracted | missing | missing | missing | present | missing | required | partial | rahino-ui:src/styles/tokens.css |
| typography | Typography | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | ambiguous | rahino-ui:src/styles/index.css; figma:7130:57816 |
| z-index | Z-index | foundation | partial | missing | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/Modal.tsx |

## 3. Primitives

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| avatar | Avatar | primitive | present | present | reconstructed | missing | missing | live | missing | missing | candidate | duplicate | qipper-app-frontend:src/widgets/dashboard/components/PersianAvatar.tsx; figma:2066:1223 |
| badge | Badge | primitive | present | partial | extracted | missing | missing | placeholder | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/Badge.tsx; figma:2023:3412 |
| checkbox | Checkbox | primitive | present | present | extracted | missing | missing | live | missing | missing | required | partial | qipper-app-frontend:src/shared/ui/Checkbox.tsx; figma:2896:22985 |
| icon-button | Icon Button | primitive | missing | present | reconstructed | missing | missing | live | missing | missing | candidate | needs-review | figma:2039:3836 |
| input | Input | primitive | present | present | extracted | present | missing | live | present | missing | required | ambiguous | qipper-app-frontend:src/shared/ui/Input.tsx; figma:7130:57816 |
| radio | Radio | primitive | present | present | extracted | missing | missing | live | missing | missing | required | ambiguous | qipper-app-frontend:src/shared/ui/RadioGroup.tsx; figma:2858:4242 |
| rahino-input | Rahino Input (candidate) | primitive | present | partial | experimental | present | missing | live | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/Input.tsx; figma:7130:57816 |
| skeleton | Skeleton | primitive | present | unknown | missing | missing | missing | missing | missing | missing | deferred | missing | qipper-app-frontend:src/widgets/inventory/inventory-list/components/InventoryListUi.tsx |
| switch | Switch | primitive | missing | present | reconstructed | missing | missing | live | missing | missing | candidate | needs-review | figma:2014:3071 |
| table | Table (primitive) | primitive | present | missing | extracted | missing | missing | missing | missing | missing | needs-review | duplicate | qipper-app-frontend:src/shared/ui/Table.tsx |
| textarea | Textarea | primitive | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/Textarea.tsx |

## 4. Components

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| button | Button | component | present | present | extracted | missing | missing | live | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Button.tsx; figma:2230:6522 |
| card | Card | component | present | present | extracted | missing | missing | live | missing | missing | candidate | ambiguous | qipper-app-frontend:src/shared/ui/Card.tsx; figma:2073:4138 |
| date-picker | Date picker | component | present | present | extracted | missing | missing | placeholder | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/DatePicker.tsx; figma:7453:49460 |
| date-time | Date time | component | present | present | extracted | missing | missing | missing | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/DateTimePicker.tsx; figma:3296:54884 |
| dialog | Dialog / Modal | component | present | missing | extracted | missing | missing | partial | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Modal.tsx |
| menu-item | Menu item | component | unknown | present | missing | missing | missing | missing | missing | missing | deferred | missing | figma:7336:54313 |
| otp | OTP / Login code | component | missing | present | reconstructed | missing | missing | live | missing | missing | product-specific | needs-review | figma:2187:3585 |
| rahino-select | Rahino Select (candidate) | component | present | partial | experimental | present | missing | live | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/Select.tsx; figma:7347:24406 |
| range-slider | Range slider | component | unknown | present | missing | missing | missing | missing | missing | missing | deferred | missing | figma:2858:7100 |
| segmented-pills | Segmented control | component | present | present | extracted | missing | missing | live | missing | missing | required | duplicate | qipper-app-frontend:src/shared/ui/RadioGroup.tsx; figma:7506:49134 |
| select | Select | component | present | present | extracted | present | missing | live | present | missing | required | ambiguous | qipper-app-frontend:src/shared/ui/Select.tsx; figma:7347:24406 |
| tabs | Tabs | component | present | present | extracted | missing | missing | live | missing | missing | required | partial | qipper-app-frontend:src/shared/ui/Tabs.tsx; figma:2047:933 |
| time-picker | Time picker | component | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/TimePicker.tsx |
| toast | Snackbar / Toast | component | present | present | reconstructed | missing | missing | live | missing | missing | candidate | ambiguous | rahino-ui:src/components/InlineNotice.tsx; figma:2302:1232 |
| tooltip | Tooltip | component | present | unknown | missing | missing | missing | missing | missing | missing | deferred | duplicate | qipper-app-frontend:src/widgets/layout/sidebar/SidebarTooltip.tsx |

## 5. Composites

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| confirmation | Confirmation modal | composite | present | missing | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/ConfirmationModal.tsx |
| data-table | Data table | composite | present | missing | extracted | missing | missing | partial | present | missing | candidate | duplicate | qipper-app-frontend:src/shared/ui/QipperTable/QipperTable.tsx |
| form-field | Form field | composite | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/FormField.tsx |
| metric-card | Metric card | composite | present | unknown | extracted | missing | missing | placeholder | present | missing | candidate | partial | qipper-app-frontend:src/shared/ui/MetricCard/MetricCard.tsx |
| stat-card | Stat card | composite | present | unknown | extracted | missing | missing | missing | missing | missing | needs-review | duplicate | qipper-app-frontend:src/shared/ui/StatCard.tsx |

## 6. Patterns

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| data-state | Data state | pattern | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/DataState.tsx |
| definition-row | Definition row | pattern | partial | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/features/inventory/components/product-details/InfoRow.tsx |
| inline-notice | Inline notice | pattern | present | missing | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/features/tasks/components/duties/DutyNotice.tsx |

## 7. Product-specific items

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| appearance-controls | Appearance controls | product-specific | present | missing | extracted | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/shared/ui/AppearanceControls.tsx |
| command-palette | Command palette | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/layout/header/CommandPalette.tsx |
| eldora-devices | Eldora device mocks | product-specific | present | missing | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/shared/ui/eldoraui/iphone-17-pro.tsx |
| file-upload-modal | File upload modal | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/features/knowledge/modals/FileUploadModal.tsx |
| kanban | Kanban board | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/tasks/project-workspace/components/KanbanColumn.tsx |
| landing-info-card | Landing info card | product-specific | missing | present | reconstructed | missing | missing | live | missing | missing | product-specific | needs-review | figma:2325:1506 |
| login-screens | Login screens | product-specific | missing | present | missing | missing | missing | missing | missing | missing | out-of-scope | partial | figma:3663:19593 |
| magicoon | Magicoon icon library | product-specific | missing | present | missing | missing | missing | missing | missing | missing | needs-review | partial | figma:2024:6267 |
| mobile-bottom-nav | Mobile bottom nav | product-specific | present | partial | missing | missing | missing | missing | missing | missing | out-of-scope | needs-review | qipper-app-frontend:src/widgets/layout/mobile/MobileBottomNav.tsx; figma:2047:933 |
| module-components | Module components | product-specific | missing | present | missing | missing | missing | missing | missing | missing | out-of-scope | partial | figma:3189:45067 |
| notification-drawer | Notification drawer | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/layout/header/NotificationDrawer.tsx |
| prototyping-components | Prototyping components | product-specific | missing | present | missing | missing | missing | missing | missing | missing | out-of-scope | verified | figma:3121:44468 |
| qipper-logo | Qipper logo | product-specific | present | missing | missing | missing | missing | missing | present | missing | out-of-scope | verified | qipper-app-frontend:src/shared/ui/QipperLogo.tsx |
| sidebar | Sidebar | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/layout/Sidebar.tsx |
| status-badge | Status / priority badge | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | product-specific | verified | qipper-app-frontend:src/features/tasks/components/task-details/StatusBadge.tsx |

### Layout and utility (same table shape)

## Layout

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| auth-shell | Auth shell | layout | present | present | extracted | missing | missing | missing | missing | missing | product-specific | needs-review | qipper-app-frontend:src/pages/auth/AuthGlassShell.tsx; figma:3663:19593 |
| page-header | Page header | layout | present | present | extracted | missing | missing | placeholder | missing | missing | product-specific | needs-review | qipper-app-frontend:src/shared/ui/PageHeader.tsx; figma:2009:10320 |
| page-shell | Page shell | layout | present | missing | extracted | missing | missing | missing | missing | missing | product-specific | partial | qipper-app-frontend:src/shared/ui/PageShell.tsx |
| section-header | Section header | layout | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/SectionHeader.tsx |

## Utility

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| error-boundary | Error boundary | utility | present | missing | extracted | missing | missing | missing | missing | missing | deferred | verified | qipper-app-frontend:src/shared/ui/ErrorBoundary.tsx |
| field-tokens | Field tokens | utility | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/fieldTokens.ts |
| format-utils | Format utilities | utility | present | missing | extracted | missing | missing | missing | missing | missing | candidate | verified | qipper-app-frontend:src/shared/utils/currency.ts |
| theme-provider | Theme provider | utility | missing | missing | experimental | missing | missing | missing | missing | missing | needs-review | partial | — |

## 8. Duplicate or overlapping implementations

| ID | Overlap | Notes |
| --- | --- | --- |
| avatar | partial-match / duplicate | Qipper PersianAvatar is dashboard widget, not shared/ui. Two Figma Avatar sets with the same name. rahino-ui has QippoAvatar only; no extracted Qipper avatar. |
| brand | not-equivalent / needs-review | Product logos are not a shared Rahino mark. Docs: /foundations/brand. |
| card | not-equivalent / ambiguous | Qipper Card is a padded surface primitive. Qippo Landing Info Card and Module Components are product modules. Lab Qippo column uses a fair-lab chrome, not a product card. |
| color | conflict / ambiguous | Qipper live primary #4179f0 in tokens.css. Qippo fills observed on components; no dedicated Ui Kit color page verified. src/styles/products.css is product labels, not palettes. |
| data-table | unknown / duplicate | No named Table on Ui Kit. QipperTable aliased as DataTable in rahino-ui. Primitive Table.tsx also exists — overlapping table implementations. |
| icon-button | not-equivalent / needs-review | Qipper uses Button + className width overrides, not a primitive. Qippo has a dedicated icon-Button set. |
| iconography | not-equivalent / ambiguous | Qipper uses lucide-react in product code. Qippo Ui Kit ships Magicoon sets plus Other Icons (bank logos). |
| landing-info-card | not-equivalent / needs-review | Lab card column uses this as Qippo card chrome (fair-lab), not a generic Card. |
| magicoon | not-equivalent / partial | Thousands of COMPONENT instances. Not imported into rahino-ui. |
| page-header | not-equivalent / needs-review | Qipper PageHeader is in-app page chrome. Qippo Header set is product app header, not the same layout primitive. Lab id app-chrome is registry-only. |
| qipper-logo | not-equivalent / verified | Site docs brand page. Not exported from rahino-ui package components. |
| radio | conflict / ambiguous | Qipper RadioGroup/RadioPills render segmented pills, not circular radios. Qippo Radio button is a circular radio set. Not equivalent to Segmented control. |
| segmented-pills | partial-match / duplicate | Not equivalent to circular Radio. rahino-ui copies SegmentedPills; Qipper source lives in logistics features. Qipper Tabs also has layout=segmented / SegmentedTabs. |
| select | not-equivalent / ambiguous | Qipper Select is searchable by default (combobox behavior). Qippo Select is a closed/open menu, not a combobox. RahinoSelect in src/rahino is experimental. Not canonical. |
| stat-card | unknown / duplicate | Overlaps MetricCard conceptually; APIs differ. |
| status-badge | not-equivalent / verified | Task-domain badges. Not the shared Badge primitive. |
| table | not-equivalent / duplicate | Lightweight table markup vs QipperTable pipeline. |
| toast | not-equivalent / ambiguous | Qippo Snackbar is a toast-like overlay. Qipper DutyNotice / InlineNotice are inline banners, not snackbars. |
| tooltip | unknown / duplicate | Duplicate product tooltips. No shared Tooltip primitive. |
| typography | conflict / ambiguous | Qipper live face is IRANYekanX. Ui Kit mixes faces on components; type page not verified. |

## 9. Items present in code but absent or incomplete in Lab

| ID | rahino-ui | Lab |
| --- | --- | --- |
| accessibility | extracted | missing |
| appearance-controls | extracted | missing |
| auth-shell | extracted | missing |
| badge | extracted | placeholder |
| border | extracted | missing |
| brand | extracted | missing |
| breakpoints | extracted | missing |
| color | extracted | missing |
| confirmation | extracted | missing |
| data-state | extracted | missing |
| date-picker | extracted | placeholder |
| date-time | extracted | missing |
| definition-row | extracted | missing |
| error-boundary | extracted | missing |
| field-tokens | extracted | missing |
| form-field | extracted | missing |
| format-utils | extracted | missing |
| iconography | extracted | missing |
| inline-notice | extracted | missing |
| metric-card | extracted | placeholder |
| motion | extracted | missing |
| page-header | extracted | placeholder |
| page-shell | extracted | missing |
| radius | extracted | missing |
| rtl | extracted | missing |
| section-header | extracted | missing |
| shadow | extracted | missing |
| sizing | extracted | missing |
| spacing | extracted | missing |
| stat-card | extracted | missing |
| table | extracted | missing |
| textarea | extracted | missing |
| theme-provider | experimental | missing |
| time-picker | extracted | missing |
| typography | extracted | missing |
| z-index | extracted | missing |

## 10. Items in Lab but absent or incomplete in Docs

| ID | Lab | Docs |
| --- | --- | --- |
| avatar | live | missing |
| card | live | missing |
| checkbox | live | missing |
| icon-button | live | missing |
| landing-info-card | live | missing |
| otp | live | missing |
| radio | live | missing |
| rahino-input | live | missing |
| rahino-select | live | missing |
| segmented-pills | live | missing |
| switch | live | missing |
| tabs | live | missing |
| toast | live | missing |

## 11. Items in Figma but absent in rahino-ui code

| ID | Qippo | rahino-ui |
| --- | --- | --- |
| login-screens | present | missing |
| magicoon | present | missing |
| menu-item | present | missing |
| module-components | present | missing |
| prototyping-components | present | missing |
| range-slider | present | missing |

## 12. Items in Qipper but absent in rahino-ui

| ID | Qipper evidence |
| --- | --- |
| command-palette | qipper-app-frontend:src/widgets/layout/header/CommandPalette.tsx |
| eldora-devices | qipper-app-frontend:src/shared/ui/eldoraui/iphone-17-pro.tsx |
| file-upload-modal | qipper-app-frontend:src/features/knowledge/modals/FileUploadModal.tsx |
| kanban | qipper-app-frontend:src/widgets/tasks/project-workspace/components/KanbanColumn.tsx |
| mobile-bottom-nav | qipper-app-frontend:src/widgets/layout/mobile/MobileBottomNav.tsx; figma:2047:933 |
| notification-drawer | qipper-app-frontend:src/widgets/layout/header/NotificationDrawer.tsx |
| qipper-logo | qipper-app-frontend:src/shared/ui/QipperLogo.tsx |
| sidebar | qipper-app-frontend:src/widgets/layout/Sidebar.tsx |
| skeleton | qipper-app-frontend:src/widgets/inventory/inventory-list/components/InventoryListUi.tsx |
| status-badge | qipper-app-frontend:src/features/tasks/components/task-details/StatusBadge.tsx |
| tooltip | qipper-app-frontend:src/widgets/layout/sidebar/SidebarTooltip.tsx |

## 13. Unknown / needs verification

| ID | Status | Open questions |
| --- | --- | --- |
| accessibility | partial | Q-A11Y-01 |
| auth-shell | needs-review | Q-AUTH-01 |
| badge | needs-review | Q-BADGE-01 |
| border | partial | — |
| brand | needs-review | Q-BRAND-01 |
| breakpoints | partial | — |
| card | ambiguous | Q-CARD-01 |
| color | ambiguous | Q-COLOR-01 |
| command-palette | verified | — |
| data-state | partial | — |
| date-picker | needs-review | Q-DATE-01 |
| date-time | needs-review | Q-DATETIME-01 |
| definition-row | partial | — |
| field-tokens | partial | — |
| file-upload-modal | verified | — |
| form-field | partial | — |
| icon-button | needs-review | Q-ICONBTN-01 |
| iconography | ambiguous | Q-ICON-01 |
| input | ambiguous | Q-INPUT-01, Q-INPUT-FIGMA-01 |
| kanban | verified | — |
| landing-info-card | needs-review | — |
| menu-item | missing | Q-MENU-01 |
| metric-card | partial | Q-METRIC-01 |
| mobile-bottom-nav | needs-review | — |
| motion | partial | — |
| notification-drawer | verified | — |
| otp | needs-review | Q-OTP-01 |
| page-header | needs-review | Q-HEADER-01 |
| radio | ambiguous | Q-RADIO-01 |
| rahino-input | needs-review | Q-INPUT-01 |
| rahino-select | needs-review | Q-SELECT-01 |
| range-slider | missing | Q-SLIDER-01 |
| section-header | partial | — |
| select | ambiguous | Q-SELECT-01 |
| sidebar | verified | — |
| skeleton | missing | — |
| spacing | partial | — |
| stat-card | duplicate | Q-STAT-01 |
| status-badge | verified | — |
| switch | needs-review | Q-SWITCH-01 |
| textarea | partial | Q-TEXTAREA-01 |
| time-picker | partial | — |
| toast | ambiguous | Q-TOAST-01 |
| tooltip | duplicate | — |
| typography | ambiguous | Q-TYPE-01 |

## Full table

## All items

| ID | Name | Kind | Qipper | Qippo | rahino-ui | Candidate | Canonical | Lab | Docs | Tests | RDS Scope | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| accessibility | Accessibility | foundation | partial | unknown | extracted | missing | missing | missing | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Button.tsx |
| appearance-controls | Appearance controls | product-specific | present | missing | extracted | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/shared/ui/AppearanceControls.tsx |
| auth-shell | Auth shell | layout | present | present | extracted | missing | missing | missing | missing | missing | product-specific | needs-review | qipper-app-frontend:src/pages/auth/AuthGlassShell.tsx; figma:3663:19593 |
| avatar | Avatar | primitive | present | present | reconstructed | missing | missing | live | missing | missing | candidate | duplicate | qipper-app-frontend:src/widgets/dashboard/components/PersianAvatar.tsx; figma:2066:1223 |
| badge | Badge | primitive | present | partial | extracted | missing | missing | placeholder | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/Badge.tsx; figma:2023:3412 |
| border | Border | foundation | partial | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/app/styles/tokens.css |
| brand | Brand | foundation | present | partial | extracted | missing | missing | missing | present | missing | needs-review | needs-review | qipper-app-frontend:src/shared/ui/QipperLogo.tsx; figma:3663:19593 |
| breakpoints | Breakpoints | foundation | present | unknown | extracted | missing | missing | missing | present | missing | candidate | partial | qipper-app-frontend:src/shared/hooks/useMediaQuery.ts |
| button | Button | component | present | present | extracted | missing | missing | live | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Button.tsx; figma:2230:6522 |
| card | Card | component | present | present | extracted | missing | missing | live | missing | missing | candidate | ambiguous | qipper-app-frontend:src/shared/ui/Card.tsx; figma:2073:4138 |
| checkbox | Checkbox | primitive | present | present | extracted | missing | missing | live | missing | missing | required | partial | qipper-app-frontend:src/shared/ui/Checkbox.tsx; figma:2896:22985 |
| color | Color | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | ambiguous | qipper-app-frontend:src/app/styles/tokens.css; figma:2230:6522 |
| command-palette | Command palette | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/layout/header/CommandPalette.tsx |
| confirmation | Confirmation modal | composite | present | missing | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/ConfirmationModal.tsx |
| data-state | Data state | pattern | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/DataState.tsx |
| data-table | Data table | composite | present | missing | extracted | missing | missing | partial | present | missing | candidate | duplicate | qipper-app-frontend:src/shared/ui/QipperTable/QipperTable.tsx |
| date-picker | Date picker | component | present | present | extracted | missing | missing | placeholder | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/DatePicker.tsx; figma:7453:49460 |
| date-time | Date time | component | present | present | extracted | missing | missing | missing | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/DateTimePicker.tsx; figma:3296:54884 |
| definition-row | Definition row | pattern | partial | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/features/inventory/components/product-details/InfoRow.tsx |
| dialog | Dialog / Modal | component | present | missing | extracted | missing | missing | partial | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Modal.tsx |
| eldora-devices | Eldora device mocks | product-specific | present | missing | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/shared/ui/eldoraui/iphone-17-pro.tsx |
| error-boundary | Error boundary | utility | present | missing | extracted | missing | missing | missing | missing | missing | deferred | verified | qipper-app-frontend:src/shared/ui/ErrorBoundary.tsx |
| field-tokens | Field tokens | utility | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/fieldTokens.ts |
| file-upload-modal | File upload modal | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/features/knowledge/modals/FileUploadModal.tsx |
| form-field | Form field | composite | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/FormField.tsx |
| format-utils | Format utilities | utility | present | missing | extracted | missing | missing | missing | missing | missing | candidate | verified | qipper-app-frontend:src/shared/utils/currency.ts |
| icon-button | Icon Button | primitive | missing | present | reconstructed | missing | missing | live | missing | missing | candidate | needs-review | figma:2039:3836 |
| iconography | Iconography | foundation | present | present | extracted | missing | missing | missing | present | missing | required | ambiguous | qipper-app-frontend:package.json; figma:2024:6267 |
| inline-notice | Inline notice | pattern | present | missing | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/features/tasks/components/duties/DutyNotice.tsx |
| input | Input | primitive | present | present | extracted | present | missing | live | present | missing | required | ambiguous | qipper-app-frontend:src/shared/ui/Input.tsx; figma:7130:57816 |
| kanban | Kanban board | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/tasks/project-workspace/components/KanbanColumn.tsx |
| landing-info-card | Landing info card | product-specific | missing | present | reconstructed | missing | missing | live | missing | missing | product-specific | needs-review | figma:2325:1506 |
| login-screens | Login screens | product-specific | missing | present | missing | missing | missing | missing | missing | missing | out-of-scope | partial | figma:3663:19593 |
| magicoon | Magicoon icon library | product-specific | missing | present | missing | missing | missing | missing | missing | missing | needs-review | partial | figma:2024:6267 |
| menu-item | Menu item | component | unknown | present | missing | missing | missing | missing | missing | missing | deferred | missing | figma:7336:54313 |
| metric-card | Metric card | composite | present | unknown | extracted | missing | missing | placeholder | present | missing | candidate | partial | qipper-app-frontend:src/shared/ui/MetricCard/MetricCard.tsx |
| mobile-bottom-nav | Mobile bottom nav | product-specific | present | partial | missing | missing | missing | missing | missing | missing | out-of-scope | needs-review | qipper-app-frontend:src/widgets/layout/mobile/MobileBottomNav.tsx; figma:2047:933 |
| module-components | Module components | product-specific | missing | present | missing | missing | missing | missing | missing | missing | out-of-scope | partial | figma:3189:45067 |
| motion | Motion | foundation | partial | unknown | extracted | missing | missing | missing | present | missing | candidate | partial | qipper-app-frontend:src/shared/ui/Modal.tsx |
| notification-drawer | Notification drawer | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/layout/header/NotificationDrawer.tsx |
| otp | OTP / Login code | component | missing | present | reconstructed | missing | missing | live | missing | missing | product-specific | needs-review | figma:2187:3585 |
| page-header | Page header | layout | present | present | extracted | missing | missing | placeholder | missing | missing | product-specific | needs-review | qipper-app-frontend:src/shared/ui/PageHeader.tsx; figma:2009:10320 |
| page-shell | Page shell | layout | present | missing | extracted | missing | missing | missing | missing | missing | product-specific | partial | qipper-app-frontend:src/shared/ui/PageShell.tsx |
| prototyping-components | Prototyping components | product-specific | missing | present | missing | missing | missing | missing | missing | missing | out-of-scope | verified | figma:3121:44468 |
| qipper-logo | Qipper logo | product-specific | present | missing | missing | missing | missing | missing | present | missing | out-of-scope | verified | qipper-app-frontend:src/shared/ui/QipperLogo.tsx |
| radio | Radio | primitive | present | present | extracted | missing | missing | live | missing | missing | required | ambiguous | qipper-app-frontend:src/shared/ui/RadioGroup.tsx; figma:2858:4242 |
| radius | Radius | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | partial | rahino-ui:src/styles/tokens.css; figma:2230:6522 |
| rahino-input | Rahino Input (candidate) | primitive | present | partial | experimental | present | missing | live | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/Input.tsx; figma:7130:57816 |
| rahino-select | Rahino Select (candidate) | component | present | partial | experimental | present | missing | live | missing | missing | candidate | needs-review | qipper-app-frontend:src/shared/ui/Select.tsx; figma:7347:24406 |
| range-slider | Range slider | component | unknown | present | missing | missing | missing | missing | missing | missing | deferred | missing | figma:2858:7100 |
| rtl | RTL | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | partial | qipper-app-frontend:src/shared/ui/Input.tsx; figma:2230:6522 |
| section-header | Section header | layout | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/SectionHeader.tsx |
| segmented-pills | Segmented control | component | present | present | extracted | missing | missing | live | missing | missing | required | duplicate | qipper-app-frontend:src/shared/ui/RadioGroup.tsx; figma:7506:49134 |
| select | Select | component | present | present | extracted | present | missing | live | present | missing | required | ambiguous | qipper-app-frontend:src/shared/ui/Select.tsx; figma:7347:24406 |
| shadow | Shadow | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | partial | rahino-ui:src/styles/tokens.css; figma:2073:4138 |
| sidebar | Sidebar | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | out-of-scope | verified | qipper-app-frontend:src/widgets/layout/Sidebar.tsx |
| sizing | Sizing | foundation | partial | partial | extracted | missing | missing | missing | missing | missing | candidate | partial | rahino-ui:src/tokens/fieldTokens.ts; figma:2230:6522 |
| skeleton | Skeleton | primitive | present | unknown | missing | missing | missing | missing | missing | missing | deferred | missing | qipper-app-frontend:src/widgets/inventory/inventory-list/components/InventoryListUi.tsx |
| spacing | Spacing | foundation | present | unknown | extracted | missing | missing | missing | present | missing | required | partial | rahino-ui:src/styles/tokens.css |
| stat-card | Stat card | composite | present | unknown | extracted | missing | missing | missing | missing | missing | needs-review | duplicate | qipper-app-frontend:src/shared/ui/StatCard.tsx |
| status-badge | Status / priority badge | product-specific | present | unknown | missing | missing | missing | missing | missing | missing | product-specific | verified | qipper-app-frontend:src/features/tasks/components/task-details/StatusBadge.tsx |
| switch | Switch | primitive | missing | present | reconstructed | missing | missing | live | missing | missing | candidate | needs-review | figma:2014:3071 |
| table | Table (primitive) | primitive | present | missing | extracted | missing | missing | missing | missing | missing | needs-review | duplicate | qipper-app-frontend:src/shared/ui/Table.tsx |
| tabs | Tabs | component | present | present | extracted | missing | missing | live | missing | missing | required | partial | qipper-app-frontend:src/shared/ui/Tabs.tsx; figma:2047:933 |
| textarea | Textarea | primitive | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/Textarea.tsx |
| theme-provider | Theme provider | utility | missing | missing | experimental | missing | missing | missing | missing | missing | needs-review | partial | — |
| time-picker | Time picker | component | present | unknown | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/TimePicker.tsx |
| toast | Snackbar / Toast | component | present | present | reconstructed | missing | missing | live | missing | missing | candidate | ambiguous | rahino-ui:src/components/InlineNotice.tsx; figma:2302:1232 |
| tooltip | Tooltip | component | present | unknown | missing | missing | missing | missing | missing | missing | deferred | duplicate | qipper-app-frontend:src/widgets/layout/sidebar/SidebarTooltip.tsx |
| typography | Typography | foundation | present | partial | extracted | missing | missing | missing | present | missing | required | ambiguous | rahino-ui:src/styles/index.css; figma:7130:57816 |
| z-index | Z-index | foundation | partial | missing | extracted | missing | missing | missing | missing | missing | candidate | partial | qipper-app-frontend:src/shared/ui/Modal.tsx |

