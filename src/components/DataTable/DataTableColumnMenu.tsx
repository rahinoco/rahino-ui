/**
 * @fileoverview Column header menu — sort + set filter (AG Grid ⋮ equivalent).
 */
import { clsx } from 'clsx';
import { ArrowDown, ArrowUp, Filter, MoreVertical, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import type { DataTableColumn, DataTableSortDir } from '@/components/DataTable/types';
import type { ColumnSort } from '@/components/DataTable/useDataTablePipeline';

interface DataTableColumnMenuProps<T> {
  column: DataTableColumn<T>;
  sort: ColumnSort | null;
  activeFilter: Set<string> | undefined;
  uniqueValues: string[];
  onSort: (direction: DataTableSortDir) => void;
  onClearSort: () => void;
  onApplyFilter: (values: Set<string>) => void;
  onClearFilter: () => void;
}

export function DataTableColumnMenu<T>({
  column,
  sort,
  activeFilter,
  uniqueValues,
  onSort,
  onClearSort,
  onApplyFilter,
  onClearFilter,
}: DataTableColumnMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  const sortable = column.sortable !== false;
  const filterable = column.filterable !== false && uniqueValues.length > 0;
  const isSorted = sort?.column_id === column.id;
  const hasFilter = Boolean(activeFilter && activeFilter.size > 0);

  useEffect(() => {
    if (!open) return;
    setDraft(new Set(activeFilter ?? uniqueValues));
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [open, activeFilter, uniqueValues]);

  if (!sortable && !filterable) return null;

  const toggleDraft = (value: string) => {
    setDraft((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        aria-label="منوی ستون"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={clsx(
          'w-7 h-7 rounded-lg flex items-center justify-center transition-colors',
          open || isSorted || hasFilter
            ? 'text-primary-600 bg-primary-50'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
        )}
      >
        <MoreVertical size={14} />
      </button>

      {open ? (
        <div className="absolute top-full start-0 mt-1.5 z-50 min-w-[220px] max-w-[min(280px,calc(100vw-2rem))] bg-bg-surface border border-slate-200/90 rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.08)] p-1.5">
          {sortable ? (
            <div className="flex flex-col gap-0.5 pb-1.5 mb-1.5 border-b border-slate-100">
              <MenuItem
                icon={ArrowUp}
                label="مرتب‌سازی صعودی"
                active={isSorted && sort?.direction === 'asc'}
                onClick={() => {
                  onSort('asc');
                  setOpen(false);
                }}
              />
              <MenuItem
                icon={ArrowDown}
                label="مرتب‌سازی نزولی"
                active={isSorted && sort?.direction === 'desc'}
                onClick={() => {
                  onSort('desc');
                  setOpen(false);
                }}
              />
              {isSorted ? (
                <MenuItem
                  icon={X}
                  label="حذف مرتب‌سازی"
                  onClick={() => {
                    onClearSort();
                    setOpen(false);
                  }}
                />
              ) : null}
            </div>
          ) : null}

          {filterable ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-2 pt-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <Filter size={12} />
                فیلتر مقادیر
              </div>
              <div className="max-h-48 overflow-y-auto custom-scrollbar px-1 flex flex-col gap-0.5">
                {uniqueValues.map((value) => (
                  <label
                    key={value}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={draft.has(value)}
                      onChange={() => toggleDraft(value)}
                      aria-label={value}
                    />
                    <span className="text-xs font-bold text-slate-600 truncate">{value}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2 px-1 pt-1 border-t border-slate-100">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="flex-1 !text-[10px]"
                  onClick={() => {
                    onApplyFilter(draft);
                    setOpen(false);
                  }}
                >
                  اعمال
                </Button>
                {hasFilter ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="!text-[10px] !text-error-500"
                    onClick={() => {
                      onClearFilter();
                      setOpen(false);
                    }}
                  >
                    پاک
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof ArrowUp;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-colors text-right',
        active ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'
      )}
    >
      <Icon size={14} className="shrink-0 opacity-70" />
      {label}
    </button>
  );
}
