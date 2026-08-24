/**
 * @fileoverview CSV export helper — replaces AG Grid Excel export.
 */
import type { DataTableColumn } from '@/components/DataTable/types';

function escapeCsv(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function exportTableCsv<T extends object>(opts: {
  data: T[];
  columns: DataTableColumn<T>[];
  fileName: string;
}) {
  const { data, columns, fileName } = opts;
  const exportCols = columns.filter((c) => c.accessor || c.filterValue);

  const header = exportCols
    .map((c) => escapeCsv(typeof c.header === 'string' ? c.header : c.id))
    .join(',');

  const rows = data.map((row) =>
    exportCols
      .map((col) => {
        const raw = col.filterValue?.(row) ?? col.accessor?.(row);
        return escapeCsv(raw == null ? '' : String(raw));
      })
      .join(',')
  );

  const csv = `\uFEFF${[header, ...rows].join('\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
