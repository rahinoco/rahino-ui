/**
 * One-shot extractor: copies Qipper shared UI into rahino-ui with import/token rewrites.
 * Does not modify Qipper.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const qipper = path.resolve(
  root,
  '../../../03 Qipper/qipper-app-frontend/src'
);
const dest = path.resolve(root, '../src');

function read(rel) {
  return fs.readFileSync(path.join(qipper, rel), 'utf8');
}

function write(rel, contents) {
  const full = path.join(dest, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
}

function rewrite(src, extra = []) {
  let out = src;
  const replacements = [
    ["@/shared/ui/FormField", "@/components/FormField"],
    ["@/shared/ui/fieldTokens", "@/tokens/fieldTokens"],
    ["@/shared/ui/Button", "@/components/Button"],
    ["@/shared/ui/Checkbox", "@/components/Checkbox"],
    ["@/shared/ui/Select", "@/components/Select"],
    ["@/shared/ui/Modal", "@/components/Modal"],
    ["@/shared/ui/DatePicker", "@/components/DatePicker"],
    ["@/shared/ui/TimePicker", "@/components/TimePicker"],
    ["@/shared/ui/MetricCard", "@/components/MetricCard"],
    ["@/shared/ui/DataState", "@/components/DataState"],
    ["@/shared/ui/QipperTable", "@/components/DataTable"],
    ["@/shared/ui/RadioGroup", "@/components/RadioGroup"],
    ["@/shared/utils/persianDigits", "@/utils/persianDigits"],
    ["@/shared/utils/currency", "@/utils/currency"],
    ["@/shared/lib/theme", "@/theme"],
    ["--qipper-", "--rahino-"],
    ["qipper-pdp", "rahino-pdp"],
    ["qipper-datepicker", "rahino-datepicker"],
    ["qipper-table", "rahino-table"],
    ["qipper-segmented-tabs", "rahino-segmented-tabs"],
    ["qipper-underline-tabs", "rahino-underline-tabs"],
    ["var(--qipper-brand-500)", "var(--rahino-brand-500)"],
    ...extra,
  ];
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

const simple = [
  ["shared/ui/Button.tsx", "components/Button.tsx"],
  ["shared/ui/Badge.tsx", "components/Badge.tsx"],
  ["shared/ui/Card.tsx", "components/Card.tsx"],
  ["shared/ui/Checkbox.tsx", "components/Checkbox.tsx"],
  ["shared/ui/Input.tsx", "components/Input.tsx"],
  ["shared/ui/Textarea.tsx", "components/Textarea.tsx"],
  ["shared/ui/Select.tsx", "components/Select.tsx"],
  ["shared/ui/RadioGroup.tsx", "components/RadioGroup.tsx"],
  ["shared/ui/Tabs.tsx", "components/Tabs.tsx"],
  ["shared/ui/Table.tsx", "components/Table.tsx"],
  ["shared/ui/FormField.tsx", "components/FormField.tsx"],
  ["shared/ui/Modal.tsx", "components/Modal.tsx"],
  ["shared/ui/ConfirmationModal.tsx", "components/ConfirmationModal.tsx"],
  ["shared/ui/DataState.tsx", "components/DataState.tsx"],
  ["shared/ui/PageShell.tsx", "components/PageShell.tsx"],
  ["shared/ui/SectionHeader.tsx", "components/SectionHeader.tsx"],
  ["shared/ui/TimePicker.tsx", "components/TimePicker.tsx"],
  ["shared/ui/DateTimePicker.tsx", "components/DateTimePicker.tsx"],
  ["shared/ui/StatCard.tsx", "components/StatCard.tsx"],
  ["shared/ui/MetricCard/MetricCard.tsx", "components/MetricCard/MetricCard.tsx"],
  ["shared/ui/MetricCard/themes.ts", "components/MetricCard/themes.ts"],
  ["shared/ui/MetricCard/MetricCardGrid.tsx", "components/MetricCard/MetricCardGrid.tsx"],
  ["shared/ui/MetricCard/DrillDownList.tsx", "components/MetricCard/DrillDownList.tsx"],
  ["shared/ui/MetricCard/index.ts", "components/MetricCard/index.ts"],
];

for (const [from, to] of simple) {
  write(to, rewrite(read(from)));
}

const tableRenames = [
  ["QipperTable", "DataTable"],
  ["QIPPER_TABLE", "DATA_TABLE"],
  ["useQipperTablePipeline", "useDataTablePipeline"],
  ["QipperTableColumn", "DataTableColumn"],
  ["QipperTableProps", "DataTableProps"],
  ["QipperTableVariant", "DataTableVariant"],
  ["QipperTableSortDir", "DataTableSortDir"],
  ["QipperTableBreakpoint", "DataTableBreakpoint"],
  ["QipperTableMobileRole", "DataTableMobileRole"],
  ["QipperTableCellContext", "DataTableCellContext"],
  ["QipperTableColumnMenu", "DataTableColumnMenu"],
  ["QipperTablePagination", "DataTablePagination"],
  ["QipperTableMobileCard", "DataTableMobileCard"],
  ["QipperTableRow", "DataTableRow"],
  ["QipperTablePipeline", "DataTablePipeline"],
];

function rewriteTable(src) {
  return rewrite(src, tableRenames);
}

const tableFiles = [
  ["shared/ui/QipperTable/types.ts", "components/DataTable/types.ts"],
  ["shared/ui/QipperTable/formatCellValue.ts", "components/DataTable/formatCellValue.ts"],
  ["shared/ui/QipperTable/exportCsv.ts", "components/DataTable/exportCsv.ts"],
  ["shared/ui/QipperTable/useQipperTablePipeline.ts", "components/DataTable/useDataTablePipeline.ts"],
  ["shared/ui/QipperTable/QipperTableColumnMenu.tsx", "components/DataTable/DataTableColumnMenu.tsx"],
  ["shared/ui/QipperTable/QipperTablePagination.tsx", "components/DataTable/DataTablePagination.tsx"],
  ["shared/ui/QipperTable/QipperTableMobileCard.tsx", "components/DataTable/DataTableMobileCard.tsx"],
  ["shared/ui/QipperTable/QipperTable.tsx", "components/DataTable/DataTable.tsx"],
  ["shared/ui/QipperTable/cells/MoneyCell.tsx", "components/DataTable/cells/MoneyCell.tsx"],
  ["shared/ui/QipperTable/cells/MonoIdCell.tsx", "components/DataTable/cells/MonoIdCell.tsx"],
  ["shared/ui/QipperTable/cells/PrimarySecondaryCell.tsx", "components/DataTable/cells/PrimarySecondaryCell.tsx"],
  ["shared/ui/QipperTable/cells/RowActionCell.tsx", "components/DataTable/cells/RowActionCell.tsx"],
  ["shared/ui/QipperTable/cells/TypeBadgeCell.tsx", "components/DataTable/cells/TypeBadgeCell.tsx"],
  ["shared/ui/QipperTable/cells/index.ts", "components/DataTable/cells/index.ts"],
  ["shared/ui/QipperTable/index.ts", "components/DataTable/index.ts"],
];

for (const [from, to] of tableFiles) {
  write(to, rewriteTable(read(from)));
}

console.log("Extracted", simple.length + tableFiles.length, "files");
