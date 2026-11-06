/** Floating rows with foundation recipes and one native activation target per row. */
import { clsx } from 'clsx';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';
import Checkbox from '@/components/Checkbox';
import { DataEmptyState, DataErrorState, DataLoadingState } from '@/components/DataState';
import { formatCellValue } from './formatCellValue';
import { DataTableMobileCard } from './DataTableMobileCard';
import { DataTablePagination } from './DataTablePagination';
import { DATA_TABLE_PAGE_SIZES, DATA_TABLE_VARIANT, type DataTableColumn, type DataTableProps } from './types';
import { useDataTablePipeline } from './useDataTablePipeline';

function gridTemplate<T>(columns: DataTableColumn<T>[], selection: boolean, breakpoint: number) {
  const minimum = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  return [selection ? 'auto' : '', ...columns.filter(col => !col.hideBelow || minimum[col.hideBelow] <= breakpoint).map(col => {
    if (col.width) return `${col.width}px`;
    if (col.maxWidth && !col.flex) return `minmax(0, ${col.maxWidth}px)`;
    return `minmax(0, ${col.flex ?? 1}fr)`;
  })].filter(Boolean).join(' ');
}
export function DataTable<T extends object>({
  data, columns, rowKey, variant = 'card', loading = false, error, onRetry,
  pagination = true, pageSize: pageSizeProp, pageSizeOptions = [...DATA_TABLE_PAGE_SIZES],
  rowSelection = 'none', selectedKeys, onSelectionChange, onRowClick, getRowLabel,
  isRowDisabled, hoverTone = 'neutral', emptyTitle = 'نتیجه‌ای یافت نشد', emptyDescription,
  className, height, showHeader = true, 'aria-label': ariaLabel = 'جدول داده', dir = 'rtl',
}: DataTableProps<T>) {
  const withCheckbox = rowSelection === 'multiple';
  const pipeline = useDataTablePipeline({ data, columns, pagination, pageSize: pageSizeProp ?? DATA_TABLE_VARIANT[variant].pageSize });
  const [internalSelected, setInternalSelected] = useState<Set<string | number>>(new Set());
  const selected = useMemo(() => selectedKeys ? new Set(selectedKeys) : internalSelected, [selectedKeys, internalSelected]);
  const selectable = pipeline.rows.filter(row => !isRowDisabled?.(row));
  const selectedCount = selectable.filter(row => selected.has(rowKey(row))).length;
  const emit = (next: Set<string | number>) => {
    if (!selectedKeys) setInternalSelected(next);
    onSelectionChange?.(data.filter(row => next.has(rowKey(row))));
  };
  const toggleRow = (row: T) => {
    if (isRowDisabled?.(row)) return;
    const next = new Set(selected), key = rowKey(row);
    if (next.has(key)) next.delete(key); else next.add(key);
    emit(next);
  };
  const toggleAll = () => {
    const next = new Set(selected), all = selectedCount === selectable.length;
    selectable.forEach(row => { if (all) next.delete(rowKey(row)); else next.add(rowKey(row)); });
    emit(next);
  };
  const style = {
    height: typeof height === 'number' ? `${height}px` : height,
    '--rds-table-grid-md': gridTemplate(columns, withCheckbox, 768),
    '--rds-table-grid-lg': gridTemplate(columns, withCheckbox, 1024),
    '--rds-table-grid-xl': gridTemplate(columns, withCheckbox, 1280),
  } as CSSProperties;
  const activationColumn = columns.findIndex(col => !col.hideBelow || col.hideBelow === 'sm' || col.hideBelow === 'md');
  const rowLabel = (row: T) => getRowLabel?.(row) ?? `باز کردن ${columns.map(col => col.accessor?.(row)).filter(value => value != null && value !== '').join('، ') || rowKey(row)}`;
  return <div className={clsx('qipper-table rahino-table rds-table', className)} data-variant={variant} data-hover-tone={hoverTone} data-filled={height != null || /\bh-full\b/.test(className ?? '') || undefined} dir={dir} style={style}>
    <div role="table" aria-label={ariaLabel} aria-busy={loading || undefined} className="rds-table__content">
      {showHeader && <div role="rowgroup" className="rds-table__headgroup"><div role="row" className="rds-table__header rds-table__grid">
        {withCheckbox && <div role="columnheader" className="rds-table__check"><Checkbox checked={selectable.length > 0 && selectedCount === selectable.length} indeterminate={selectedCount > 0 && selectedCount < selectable.length} disabled={loading || Boolean(error) || !selectable.length} onChange={toggleAll} aria-label="انتخاب همه ردیف‌های این صفحه" /></div>}
        {columns.map(col => {
          const sorted = pipeline.sort?.column_id === col.id ? pipeline.sort.direction : null;
          const sortable = col.sortable !== false && Boolean(col.accessor) && Boolean(col.header);
          const Icon = sorted === 'asc' ? ArrowUp : sorted === 'desc' ? ArrowDown : ArrowUpDown;
          return <div key={col.id} role="columnheader" aria-sort={sortable ? sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none' : undefined} className={clsx('rds-table__cell', col.headerClassName)} data-hide-below={col.hideBelow} data-align={col.align}>
            {sortable ? <button type="button" className="rds-table__sort" onClick={() => pipeline.toggleSort(col.id)} disabled={loading || Boolean(error)}><span>{col.header}</span><Icon aria-hidden="true" /></button> : col.header}
          </div>;
        })}
      </div></div>}
      <div role="rowgroup" className="rds-table__body">
        {loading || error || !pipeline.rows.length ? <div role="row"><div role="cell" aria-colspan={columns.length + Number(withCheckbox)}>
          {loading ? <DataLoadingState compact /> : error ? <DataErrorState compact message={error} onRetry={onRetry} /> : <DataEmptyState compact title={emptyTitle} description={emptyDescription} />}
        </div></div> : pipeline.rows.map((row, index) => {
          const key = rowKey(row), disabled = Boolean(isRowDisabled?.(row)), checked = selected.has(key);
          const label = rowLabel(row);
          const activate = onRowClick && !disabled ? () => onRowClick(row) : undefined;
          return <div key={key} className="rds-table__row-pair">
            <DataTableMobileCard row={row} index={index} columns={columns} withCheckbox={withCheckbox} checked={checked} selected={checked} disabled={disabled} onToggleCheck={() => toggleRow(row)} onRowClick={activate} rowLabel={label} />
            <div role="row" aria-disabled={disabled || undefined} className="rds-table__row rds-table__grid rds-table__desktop" data-selected={checked || undefined} data-disabled={disabled || undefined} data-clickable={Boolean(activate) || undefined}>
              {withCheckbox && <div role="cell" className="rds-table__check"><Checkbox checked={checked} disabled={disabled} onChange={() => toggleRow(row)} aria-label={`انتخاب ${label.replace(/^باز کردن /, '')}`} /></div>}
              {columns.map((col, colIndex) => {
                const raw = col.accessor?.(row);
                return <div key={col.id} role="cell" className={clsx('rds-table__cell', col.className)} data-hide-below={col.hideBelow} data-align={col.align} data-latin={col.latin || undefined} data-divider={col.desktopDivider || undefined}>
                  {col.cell?.({ row, index }) ?? (raw != null && raw !== '' ? formatCellValue(raw, col.latin) : '—')}
                  {colIndex === Math.max(0, activationColumn) && activate && <button type="button" className="rds-table__activate" aria-label={label} onClick={activate} />}
                </div>;
              })}
            </div>
          </div>;
        })}
      </div>
    </div>
    {pagination && !loading && !error && pipeline.totalRows > 0 && <DataTablePagination page={pipeline.page} pageCount={pipeline.pageCount} pageSize={pipeline.pageSize} totalRows={pipeline.totalRows} pageSizeOptions={pageSizeOptions} onPageChange={pipeline.setPage} onPageSizeChange={pipeline.setPageSize} />}
  </div>;
}
export default DataTable;
