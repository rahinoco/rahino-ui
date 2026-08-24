/**
 * @fileoverview DataTable — floating card rows, breathable header, smart mobile.
 */
import { clsx } from 'clsx';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { type KeyboardEvent, useCallback, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import Checkbox from '@/components/Checkbox';
import { DataEmptyState, DataLoadingState } from '@/components/DataState';
import { formatCellValue } from '@/components/DataTable/formatCellValue';
import { DataTableColumnMenu } from '@/components/DataTable/DataTableColumnMenu';
import { DataTableMobileCard } from '@/components/DataTable/DataTableMobileCard';
import { DataTablePagination } from '@/components/DataTable/DataTablePagination';
import {
  DATA_TABLE_PAGE_SIZES,
  DATA_TABLE_VARIANT,
  type DataTableColumn,
  type DataTableProps,
  type DataTableVariant,
} from '@/components/DataTable/types';
import { useDataTablePipeline } from '@/components/DataTable/useDataTablePipeline';

const HEADER_CLASS = 'text-[10px] font-semibold text-fg-subtle tracking-wide';
const HIDE_CLASS = {
  sm: 'hidden sm:flex',
  md: 'hidden md:flex',
  lg: 'hidden lg:flex',
  xl: 'hidden xl:flex',
} as const;

const ROW_CARD =
  'rounded-2xl bg-bg-surface px-5 py-4 ' +
  'shadow-light ' +
  'border border-transparent ' +
  'transition-all duration-200 ' +
  'hover:shadow-heavy hover:border-primary-100';

const ROW_CARD_SELECTED =
  'border-primary-200/80 bg-primary-50/10 shadow-[0_8px_24px_color-mix(in_srgb,var(--qipper-brand-500)_8%,transparent)]';

const ROW_COMPACT =
  'rounded-xl bg-bg-surface px-3 py-1.5 ' +
  'ring-1 ring-border ' +
  'transition-colors duration-150 ' +
  'hover:ring-border';

const ROW_ASSET =
  'rounded-2xl bg-bg-surface ' +
  'shadow-light ' +
  'hover:shadow-heavy ' +
  'transition-all duration-300';

const ROW_COMPACT_SELECTED = 'bg-primary-50/15 ring-primary-200/40';

function rowShellClass(variant: DataTableVariant, selected: boolean) {
  if (variant === 'asset') {
    return clsx(ROW_ASSET, selected && ROW_CARD_SELECTED);
  }
  if (variant === 'card') {
    return clsx(ROW_CARD, selected && ROW_CARD_SELECTED);
  }
  return clsx(ROW_COMPACT, selected && ROW_COMPACT_SELECTED);
}

function rowPadClass(variant: DataTableVariant) {
  if (variant === 'asset') return 'p-5';
  if (variant === 'card') return 'px-5 py-4';
  return 'px-3 py-1.5';
}

function gapClassForVariant(variant: DataTableVariant) {
  if (variant === 'card') return 'gap-3';
  if (variant === 'asset') return 'gap-1';
  return 'gap-1 max-md:gap-3';
}

function buildGridTemplate<T>(columns: DataTableColumn<T>[], withCheckbox: boolean): string {
  const parts: string[] = [];
  if (withCheckbox) parts.push('auto');
  for (const col of columns) {
    if (col.width) parts.push(`${col.width}px`);
    else if (col.maxWidth && !col.flex) {
      parts.push(`minmax(${col.minWidth ?? 56}px, ${col.maxWidth}px)`);
    } else {
      parts.push(`minmax(${col.minWidth ?? 72}px, ${col.flex ?? 1}fr)`);
    }
  }
  return parts.join(' ');
}

function cellAlignClass(align?: DataTableColumn<unknown>['align']) {
  if (align === 'center') return 'justify-center text-center';
  if (align === 'end') return 'justify-end text-left';
  return 'justify-start text-right';
}

export function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  variant = 'card',
  loading = false,
  pagination = true,
  pageSize: pageSizeProp,
  pageSizeOptions = [...DATA_TABLE_PAGE_SIZES],
  rowSelection = 'none',
  selectedKeys,
  onSelectionChange,
  onRowClick,
  emptyTitle = 'نتیجه‌ای یافت نشد',
  emptyDescription,
  className,
  height,
  showHeader = true,
}: DataTableProps<T>) {
  const variantConfig = DATA_TABLE_VARIANT[variant];
  const pageSize = pageSizeProp ?? variantConfig.pageSize;
  const withCheckbox = rowSelection === 'multiple';
  const rowMinH = variantConfig.rowMinHeight;

  const pipeline = useDataTablePipeline({
    data,
    columns,
    pagination,
    pageSize,
  });

  const [internalSelected, setInternalSelected] = useState<Set<string | number>>(new Set());
  const selectedSet = useMemo(() => {
    if (selectedKeys) return new Set(selectedKeys);
    return internalSelected;
  }, [selectedKeys, internalSelected]);

  const emitSelection = useCallback(
    (next: Set<string | number>) => {
      if (!selectedKeys) setInternalSelected(next);
      if (onSelectionChange) {
        const rows = data.filter((row) => next.has(rowKey(row)));
        onSelectionChange(rows);
      }
    },
    [data, onSelectionChange, rowKey, selectedKeys]
  );

  const toggleRow = (row: T) => {
    const key = rowKey(row);
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    emitSelection(next);
  };

  const toggleAll = () => {
    const pageKeys = pipeline.rows.map(rowKey);
    const allSelected = pageKeys.every((k) => selectedSet.has(k));
    const next = new Set(selectedSet);
    if (allSelected) {
      for (const k of pageKeys) next.delete(k);
    } else {
      for (const k of pageKeys) next.add(k);
    }
    emitSelection(next);
  };

  const gridTemplate = buildGridTemplate(columns, withCheckbox);
  const allPageSelected =
    pipeline.rows.length > 0 && pipeline.rows.every((row) => selectedSet.has(rowKey(row)));

  const handleHeaderSort = (col: DataTableColumn<T>) => {
    if (col.sortable === false) return;
    pipeline.toggleSort(col.id);
  };

  const containerStyle = height
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : undefined;

  const gapClass = gapClassForVariant(variant);
  const headerPadClass = variant === 'card' || variant === 'asset' ? 'px-5' : 'px-3';
  const headerMbClass = variant === 'card' ? 'mb-2' : variant === 'asset' ? 'mb-0' : 'mb-1.5';

  return (
    <div
      className={twMerge('qipper-table rahino-table flex flex-col min-h-0 w-full', className)}
      style={containerStyle}
      dir="rtl"
    >
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* Desktop header — breathable, no box */}
        {showHeader ? (
          <div
            className={clsx(
              'shrink-0 hidden md:grid items-center gap-x-3',
              headerPadClass,
              headerMbClass,
              'text-slate-400'
            )}
            style={{ gridTemplateColumns: gridTemplate, minHeight: 32 }}
          >
            {withCheckbox ? (
              <div className="flex items-center justify-center">
                <Checkbox checked={allPageSelected} onChange={toggleAll} aria-label="انتخاب همه" />
              </div>
            ) : null}
            {columns.map((col) => (
              <HeaderCell
                key={col.id}
                col={col}
                sort={pipeline.sort}
                hasFilter={Boolean(pipeline.filters[col.id]?.size)}
                uniqueValues={pipeline.getUniqueFilterValues(col)}
                onHeaderSort={() => handleHeaderSort(col)}
                onSort={(dir) => pipeline.toggleSort(col.id, dir)}
                onClearSort={pipeline.clearSort}
                onApplyFilter={(values) => pipeline.setColumnFilter(col.id, values)}
                onClearFilter={() => pipeline.clearColumnFilter(col.id)}
                activeFilter={pipeline.filters[col.id]}
              />
            ))}
          </div>
        ) : null}

        {/* Body */}
        <div
          className={clsx(
            'flex-1 min-h-0 overflow-y-auto custom-scrollbar flex flex-col pb-1',
            gapClass
          )}
        >
          {loading ? (
            <DataLoadingState compact label="در حال بارگذاری..." />
          ) : pipeline.rows.length === 0 ? (
            <DataEmptyState compact title={emptyTitle} description={emptyDescription} />
          ) : (
            pipeline.rows.map((row, index) => {
              const key = rowKey(row);
              const selected = selectedSet.has(key);
              return (
                <DataTableRow
                  key={key}
                  row={row}
                  index={index}
                  columns={columns}
                  variant={variant}
                  rowMinH={rowMinH}
                  gridTemplate={gridTemplate}
                  withCheckbox={withCheckbox}
                  checked={selected}
                  onToggleCheck={() => toggleRow(row)}
                  onRowClick={onRowClick ? () => onRowClick(row) : undefined}
                  selected={selected}
                />
              );
            })
          )}
        </div>
      </div>

      {pagination && !loading && pipeline.totalRows > 0 ? (
        <DataTablePagination
          page={pipeline.page}
          pageCount={pipeline.pageCount}
          pageSize={pipeline.pageSize}
          totalRows={pipeline.totalRows}
          pageSizeOptions={pageSizeOptions}
          onPageChange={pipeline.setPage}
          onPageSizeChange={pipeline.setPageSize}
        />
      ) : null}
    </div>
  );
}

function HeaderCell<T extends object>({
  col,
  sort,
  hasFilter,
  uniqueValues,
  onHeaderSort,
  onSort,
  onClearSort,
  onApplyFilter,
  onClearFilter,
  activeFilter,
}: {
  col: DataTableColumn<T>;
  sort: ReturnType<typeof useDataTablePipeline<T>>['sort'];
  hasFilter: boolean;
  uniqueValues: string[];
  onHeaderSort: () => void;
  onClearSort: () => void;
  onSort: (dir: 'asc' | 'desc') => void;
  onApplyFilter: (values: Set<string>) => void;
  onClearFilter: () => void;
  activeFilter?: Set<string>;
}) {
  const isSorted = sort?.column_id === col.id;
  const sortable = col.sortable !== false;
  const hideClass = col.hideBelow ? HIDE_CLASS[col.hideBelow] : undefined;

  if (!col.header) {
    return <div className={hideClass} />;
  }

  return (
    <div className={clsx('flex items-center gap-1 min-w-0', hideClass, col.headerClassName)}>
      <button
        type="button"
        onClick={sortable ? onHeaderSort : undefined}
        className={clsx(
          'flex items-center gap-1 min-w-0 flex-1 py-1',
          sortable && 'cursor-pointer hover:text-slate-500',
          !sortable && 'cursor-default'
        )}
      >
        <span className={clsx(HEADER_CLASS, 'truncate')}>{col.header}</span>
        {sortable ? (
          <SortIcon direction={isSorted ? sort!.direction : null} active={isSorted || hasFilter} />
        ) : null}
      </button>
      <DataTableColumnMenu
        column={col}
        sort={sort}
        activeFilter={activeFilter}
        uniqueValues={uniqueValues}
        onSort={onSort}
        onClearSort={onClearSort}
        onApplyFilter={onApplyFilter}
        onClearFilter={onClearFilter}
      />
    </div>
  );
}

function SortIcon({ direction, active }: { direction: 'asc' | 'desc' | null; active: boolean }) {
  if (direction === 'asc') return <ArrowUp size={11} className="text-primary-600 shrink-0" />;
  if (direction === 'desc') return <ArrowDown size={11} className="text-primary-600 shrink-0" />;
  return (
    <ArrowUpDown
      size={11}
      className={clsx('shrink-0', active ? 'text-primary-400' : 'text-slate-300/80')}
    />
  );
}

interface DataTableRowProps<T extends object> {
  row: T;
  index: number;
  columns: DataTableColumn<T>[];
  variant: DataTableVariant;
  rowMinH: number;
  gridTemplate: string;
  withCheckbox: boolean;
  checked: boolean;
  selected: boolean;
  onToggleCheck: () => void;
  onRowClick?: () => void;
}

function DataTableRow<T extends object>(props: DataTableRowProps<T>) {
  const {
    row,
    index,
    columns,
    variant,
    rowMinH,
    gridTemplate,
    withCheckbox,
    checked,
    selected,
    onToggleCheck,
    onRowClick,
  } = props;

  const onKeyDown = onRowClick
    ? (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRowClick();
        }
      }
    : undefined;

  return (
    <>
      {variant !== 'asset' ? (
        <DataTableMobileCard
          row={row}
          index={index}
          columns={columns}
          withCheckbox={withCheckbox}
          checked={checked}
          selected={selected}
          onToggleCheck={onToggleCheck}
          onRowClick={onRowClick}
        />
      ) : null}

      {/* Desktop / asset row */}
      <div
        role={onRowClick ? 'button' : undefined}
        tabIndex={onRowClick ? 0 : undefined}
        onClick={onRowClick}
        onKeyDown={onKeyDown}
        className={clsx(
          variant === 'asset' ? 'grid' : 'hidden md:grid',
          'items-center gap-x-3 group relative',
          rowPadClass(variant),
          rowShellClass(variant, selected),
          onRowClick && 'cursor-pointer'
        )}
        style={{ gridTemplateColumns: gridTemplate, minHeight: rowMinH }}
      >
        {withCheckbox ? (
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Checkbox checked={checked} onChange={onToggleCheck} aria-label="انتخاب ردیف" />
          </div>
        ) : null}

        {columns.map((col, colIndex) => {
          const hideClass = col.hideBelow ? HIDE_CLASS[col.hideBelow] : undefined;
          const raw = col.accessor?.(row);
          const content =
            col.cell?.({ row, index }) ??
            (raw != null && raw !== '' ? formatCellValue(raw, col.latin) : '—');
          const showDivider = variant === 'card' && col.desktopDivider && colIndex > 0;
          return (
            <div
              key={col.id}
              className={clsx(
                'flex min-w-0 items-center',
                hideClass,
                cellAlignClass(col.align),
                col.latin && 'font-mono tracking-wide',
                showDivider && 'border-r border-slate-100 pr-6',
                col.className
              )}
              onClick={
                col.id === 'actions' || col.id === 'action' ? (e) => e.stopPropagation() : undefined
              }
              onKeyDown={
                col.id === 'actions' || col.id === 'action' ? (e) => e.stopPropagation() : undefined
              }
            >
              {content}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DataTable;
