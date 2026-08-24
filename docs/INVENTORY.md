# Phase 1 inventory

Canonical data lives in `src/inventory/catalog.ts` (imported by the docs workbench).

Do not add empty component files to satisfy this list.

## Extracted (candidate in rahino-ui)

Button, Badge, Input, Textarea, Select, Checkbox, RadioGroup / RadioPills / SegmentedPills, Field / FormField / FormRow, Tabs, Card, Table, DataTable (from QipperTable), MetricCard, StatCard (deprecated alias), Modal / ConfirmationModal, DataStates, DatePicker, DateTimePicker, TimePicker, PageShell, PageHeader, SectionHeader, AuthShell, DefinitionRow / SpecRow, InlineNotice, AppearanceControls, ErrorBoundary, ThemeProvider, tokens.

## Exists in Qipper — not extracted

- QipperLogo (product wordmark)
- Eldora device frames (login marketing)
- App chrome: Sidebar, Header, Command Palette, Notification Drawer, mobile nav (`src/widgets`)
- Task StatusBadge / PriorityBadge (domain enums)
- Kanban / Duty / Logistics / Finance feature components
- LoginWireBackground (hardcoded brand color)

## Missing vs the target DS list

Icon Button, Link, Text, Heading, Switch, Slider, Autocomplete, Alert, Skeleton, Drawer, Tooltip, Dropdown, Context Menu, Command Menu, Breadcrumb, Navigation Menu, Avatar, List, Accordion, Separator, Stack/Flex, Divider, Date Range Picker, File Upload, Search, z-index scale, motion tokens.

## Status key

`extracted` · `existing` · `missing` · `needs-review` · `proposed` · `approved` · `deprecated`

No component is `approved` yet. Comparison against Qippo Figma happens in the next phase.
