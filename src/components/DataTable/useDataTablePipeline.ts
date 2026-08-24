/**
 * @fileoverview Sort, column filter, and pagination pipeline for DataTable.
 */
import { useMemo, useState } from 'react';

import type { DataTableColumn, DataTableSortDir } from '@/components/DataTable/types';

export interface ColumnSort {
  column_id: string;
  direction: DataTableSortDir;
}

function compareValues(a: unknown, b: unknown, dir: DataTableSortDir): number {
  const mul = dir === 'asc' ? 1 : -1;
  if (a == null && b == null) return 0;
  if (a == null) return 1 * mul;
  if (b == null) return -1 * mul;
  if (typeof a === 'number' && typeof b === 'number') return (a - b) * mul;
  return String(a).localeCompare(String(b), 'fa') * mul;
}

function getColumnValue<T>(row: T, col: DataTableColumn<T>): unknown {
  return col.accessor?.(row);
}

function getFilterValue<T>(row: T, col: DataTableColumn<T>): string {
  if (col.filterValue) return col.filterValue(row);
  const v = col.accessor?.(row);
  return v == null ? '' : String(v);
}

export function useDataTablePipeline<T extends object>(opts: {
  data: T[];
  columns: DataTableColumn<T>[];
  pagination: boolean;
  pageSize: number;
}) {
  const { data, columns, pagination, pageSize: initialPageSize } = opts;

  const [sort, setSort] = useState<ColumnSort | null>(null);
  const [filters, setFilters] = useState<Record<string, Set<string>>>({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const processed = useMemo(() => {
    let rows = [...data];

    for (const col of columns) {
      const selected = filters[col.id];
      if (!selected || selected.size === 0) continue;
      rows = rows.filter((row) => selected.has(getFilterValue(row, col)));
    }

    if (sort) {
      const col = columns.find((c) => c.id === sort.column_id);
      if (col && col.sortable !== false) {
        rows.sort((a, b) =>
          compareValues(getColumnValue(a, col), getColumnValue(b, col), sort.direction)
        );
      }
    }

    return rows;
  }, [data, columns, filters, sort]);

  const totalRows = processed.length;
  const pageCount = pagination ? Math.max(1, Math.ceil(totalRows / pageSize)) : 1;
  const safePage = pagination ? Math.min(page, pageCount - 1) : 0;

  const pageRows = useMemo(() => {
    if (!pagination) return processed;
    const start = safePage * pageSize;
    return processed.slice(start, start + pageSize);
  }, [processed, pagination, safePage, pageSize]);

  const toggleSort = (column_id: string, direction?: DataTableSortDir) => {
    setPage(0);
    setSort((prev) => {
      if (direction) return { column_id, direction };
      if (prev?.column_id !== column_id) return { column_id, direction: 'asc' };
      if (prev.direction === 'asc') return { column_id, direction: 'desc' };
      return null;
    });
  };

  const clearSort = () => setSort(null);

  const setColumnFilter = (column_id: string, values: Set<string>) => {
    setPage(0);
    setFilters((prev) => {
      if (values.size === 0) {
        const next = { ...prev };
        delete next[column_id];
        return next;
      }
      return { ...prev, [column_id]: values };
    });
  };

  const clearColumnFilter = (column_id: string) => {
    setPage(0);
    setFilters((prev) => {
      const next = { ...prev };
      delete next[column_id];
      return next;
    });
  };

  const getUniqueFilterValues = (col: DataTableColumn<T>): string[] => {
    const set = new Set<string>();
    for (const row of data) {
      const v = getFilterValue(row, col);
      if (v) set.add(v);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'fa'));
  };

  return {
    rows: pageRows,
    totalRows,
    page: safePage,
    pageCount,
    pageSize,
    sort,
    filters,
    setPage,
    setPageSize: (size: number) => {
      setPageSize(size);
      setPage(0);
    },
    toggleSort,
    clearSort,
    setColumnFilter,
    clearColumnFilter,
    getUniqueFilterValues,
    getFilterValue: (row: T, col: DataTableColumn<T>) => getFilterValue(row, col),
  };
}

export type DataTablePipeline<T extends object> = ReturnType<typeof useDataTablePipeline<T>>;
