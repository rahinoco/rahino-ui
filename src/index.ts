export { cn } from '@/lib/cn';
export { FIELD } from '@/tokens/fieldTokens';
export { useMediaQuery } from '@/hooks/useMediaQuery';
export {
  formatMoney,
  formatMoneyCompact,
  formatMoneyWithLabel,
  type MoneyInput,
} from '@/utils/currency';
export {
  formatJalaliDate,
  formatJalaliDateShort,
  formatJalaliDateTime,
  formatJalaliTime,
} from '@/utils/date';
export { hasWesternDigits, toPersianDigits } from '@/utils/persianDigits';
export {
  applyDocumentTheme,
  getSystemTheme,
  persistAppearance,
  readPersistedAppearance,
  resolveTheme,
  ThemeProvider,
  UI_PRODUCTS,
  UI_STORAGE_KEY,
  useOptionalTheme,
  useTheme,
  type PersistedAppearance,
  type ThemeContextValue,
  type ThemeProviderProps,
  type UiBrand,
  type UiProduct,
  type UiTheme,
  type UiThemeMode,
} from '@/theme';

export { default as AppearanceControls } from '@/components/AppearanceControls';
export { default as AuthShell, type AuthShellProps } from '@/components/AuthShell';
export { default as Badge, type BadgeProps } from '@/components/Badge';
export { default as Button, type ButtonProps, type ButtonSize, type ButtonVariant } from '@/components/Button';
export { default as Card, type CardProps } from '@/components/Card';
export { default as Checkbox, type CheckboxProps } from '@/components/Checkbox';
export { default as ConfirmationModal, type ConfirmationModalProps } from '@/components/ConfirmationModal';
export {
  DataEmptyState,
  DataErrorState,
  DataLoadingState,
  type DataEmptyStateProps,
  type DataErrorStateProps,
  type DataLoadingStateProps,
} from '@/components/DataState';
export { default as DatePicker, type DatePickerChangePayload, type DatePickerProps } from '@/components/DatePicker';
export { default as DateTimePicker, type DateTimePickerProps } from '@/components/DateTimePicker';
export { DefinitionRow, SpecRow, type DefinitionRowProps, type SpecRowProps } from '@/components/DefinitionRow';
export { default as ErrorBoundary, type ErrorBoundaryProps } from '@/components/ErrorBoundary';
export {
  default as FormField,
  FieldError,
  FieldLabel,
  FormRow,
  type FieldErrorProps,
  type FieldLabelProps,
  type FormFieldProps,
  type FormRowProps,
} from '@/components/FormField';
export { InlineNotice, type InlineNoticeProps } from '@/components/InlineNotice';
export { default as Input, type InputProps } from '@/components/Input';
export {
  DrillDownList,
  MetricCard,
  MetricCardGrid,
  METRIC_TONE,
  normalizeMetricTone,
  type DrillDownItem,
  type MetricCardGridProps,
  type MetricCardProps,
  type MetricLayout,
  type MetricTone,
} from '@/components/MetricCard';
export {
  ChoiceTile,
  default as Modal,
  ModalFormCard,
  type ChoiceTileProps,
  type ModalFormCardProps,
  type ModalProps,
  type ModalSize,
} from '@/components/Modal';
export { default as PageHeader, type PageHeaderProps } from '@/components/PageHeader';
export {
  default as PageShell,
  SurfacePanel,
  type PageShellProps,
  type SurfacePanelProps,
} from '@/components/PageShell';
export { default as RadioGroup, RadioPills, type RadioGroupProps, type RadioOption, type RadioPillsProps } from '@/components/RadioGroup';
export { default as SectionHeader, type SectionHeaderProps } from '@/components/SectionHeader';
export { default as Select, type SelectOption, type SelectProps } from '@/components/Select';
export { SegmentedPills, type PillOption, type SegmentedPillsProps } from '@/components/SegmentedPills';
export { default as StatCard } from '@/components/StatCard';
export {
  default as Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  type TableColumn,
  type TableProps,
} from '@/components/Table';
export {
  default as Tabs,
  SegmentedTabs,
  UnderlineTabs,
  type TabItem,
  type TabsProps,
  type UnderlineTabsProps,
} from '@/components/Tabs';
export { default as Textarea, type TextareaProps } from '@/components/Textarea';
export { default as TimePicker, type TimePickerProps } from '@/components/TimePicker';
export {
  DATA_TABLE_PAGE_SIZES,
  DATA_TABLE_VARIANT,
  DataTable,
  QipperTable,
  exportTableCsv,
  MoneyCell,
  MonoIdCell,
  PrimarySecondaryCell,
  RowActionCell,
  TypeBadgeCell,
  type DataTableColumn,
  type DataTableProps,
  type DataTableVariant,
} from '@/components/DataTable';

export {
  INVENTORY,
  inventoryByCategory,
  inventoryByStatus,
  NOT_FOR_SHARED_SYSTEM,
  type InventoryCategory,
  type InventoryItem,
  type InventoryPresence,
  type InventoryStatus,
} from '@/inventory/catalog';
export { inventoryWithQippo } from '@/inventory/withQippo';
export { DECISIONS, getDecision, type DecisionOutcome, type DecisionStatus, type DesignDecision } from '@/decisions';
export {
  COMPARISON_REGISTRY,
  comparisonReviewQueue,
  getComparison,
  type ComparisonEntry,
  type ComparisonPresence,
  type ComparisonSourceId,
  type ComparisonSourceMeta,
  type SourceAvailability,
} from '@/comparison/registry';
export {
  QIPPO_CATALOG,
  QIPPO_REVIEW_FIRST,
  getQippoComponent,
  qippoByPresence,
  type QippoComponentRef,
  type QippoConfidence,
  type QippoPresence,
} from '@/qippo/catalog';
export { QIPPO_FIGMA, QIPPO_KIT_SECTIONS, qippoFigmaUrl } from '@/qippo/figma';
export { QIPPO_OBSERVED_TOKENS } from '@/qippo/tokens';
export {
  QippoButton,
  type QippoButtonProps,
  type QippoButtonShape,
  type QippoButtonSize,
  type QippoButtonType,
  type QippoForceState,
  type QippoIconStatus,
} from '@/qippo/Button';
export {
  QippoSelect,
  type QippoSelectOption,
  type QippoSelectProps,
  type QippoSelectSize,
} from '@/qippo/Select';
export { QippoInput, type QippoInputProps, type QippoInputSize } from '@/qippo/Input';
export {
  QippoCheckbox,
  type QippoCheckboxProps,
  type QippoCheckboxType,
} from '@/qippo/Checkbox';
export {
  QippoRadio,
  type QippoRadioOption,
  type QippoRadioProps,
  type QippoRadioType,
} from '@/qippo/Radio';
export { QippoSwitch, type QippoSwitchProps, type QippoSwitchSize } from '@/qippo/Switch';
export { QippoTabs, type QippoTabItem, type QippoTabsProps } from '@/qippo/Tabs';
export {
  QippoSegmented,
  type QippoSegmentedOption,
  type QippoSegmentedProps,
  type QippoSegmentedSize,
} from '@/qippo/Segmented';
export {
  QippoAvatar,
  type QippoAvatarProps,
  type QippoAvatarSize,
  type QippoAvatarType,
} from '@/qippo/Avatar';
export { QippoCard, type QippoCardProps } from '@/qippo/Card';
export {
  QippoIconButton,
  type QippoIconButtonForce,
  type QippoIconButtonProps,
  type QippoIconButtonSize,
} from '@/qippo/IconButton';
export { QippoOtp, type QippoOtpProps, type QippoOtpTone } from '@/qippo/Otp';
export {
  QippoSnackbar,
  type QippoSnackbarProps,
  type QippoSnackbarTone,
} from '@/qippo/Snackbar';
export {
  RahinoInput,
  RahinoSelect,
  type RahinoInputProps,
  type RahinoSelectOption,
  type RahinoSelectProps,
} from '@/rahino';
