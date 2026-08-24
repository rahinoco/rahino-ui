/**
 * @fileoverview DataTable column & table prop types — AG Grid replacement.
 */
import type { ReactNode } from 'react';

export type DataTableVariant = 'card' | 'compact' | 'asset';
export type DataTableSortDir = 'asc' | 'desc';
export type DataTableBreakpoint = 'sm' | 'md' | 'lg' | 'xl';
/** Mobile card layout role — avoids stacked label/value dump */
export type DataTableMobileRole = 'lead' | 'badge' | 'meta' | 'action' | 'skip';

export interface DataTableCellContext<T> {
  row: T;
  index: number;
}

export interface DataTableColumn<T> {
  id: string;
  header: ReactNode;
  accessor?: (row: T) => string | number | null | undefined;
  cell?: (ctx: DataTableCellContext<T>) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterValue?: (row: T) => string;
  flex?: number;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  hideBelow?: DataTableBreakpoint;
  align?: 'start' | 'center' | 'end';
  pin?: 'start' | 'end';
  className?: string;
  headerClassName?: string;
  /** Latin / mono IDs — keeps Western digits */
  latin?: boolean;
  /** Smart mobile card placement (overrides hideBelow on small screens) */
  mobileRole?: DataTableMobileRole;
  /** Mobile facts value — overrides accessor/cell in the 2-col grid */
  mobileDisplay?: (row: T) => ReactNode;
  /** Mobile facts: plain text from accessor (default) or full cell renderer */
  mobileMeta?: 'text' | 'cell';
  /** Desktop card variant — vertical divider before this column */
  desktopDivider?: boolean;
}

export interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T) => string | number;
  variant?: DataTableVariant;
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  rowSelection?: 'none' | 'multiple';
  selectedKeys?: (string | number)[];
  onSelectionChange?: (rows: T[]) => void;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  height?: number | string;
  /** Show column header row on desktop (default true) */
  showHeader?: boolean;
}

export const DATA_TABLE_PAGE_SIZES = [10, 15, 25, 50] as const;

export const DATA_TABLE_VARIANT = {
  card: { pageSize: 12, rowMinHeight: 72, gap: 12, headerGap: 8 },
  compact: { pageSize: 15, rowMinHeight: 44, gap: 4, headerGap: 6 },
  asset: { pageSize: 20, rowMinHeight: 88, gap: 4, headerGap: 0 },
} as const;
