/**
 * @fileoverview Mobile row — identity bar + inset fact rows (RTL logical).
 */
import { clsx } from 'clsx';
import { ChevronLeft } from 'lucide-react';
import type { KeyboardEvent, ReactNode } from 'react';

import Checkbox from '@/components/Checkbox';
import { formatCellValue } from '@/components/DataTable/formatCellValue';
import type { DataTableColumn, DataTableMobileRole } from '@/components/DataTable/types';

interface DataTableMobileCardProps<T extends object> {
  row: T;
  index: number;
  columns: DataTableColumn<T>[];
  withCheckbox: boolean;
  checked: boolean;
  selected: boolean;
  onToggleCheck: () => void;
  onRowClick?: () => void;
}

function resolveMobileRole<T>(col: DataTableColumn<T>, index: number): DataTableMobileRole {
  if (col.mobileRole) return col.mobileRole;
  if (col.id === 'actions') return 'action';
  if (col.id === 'action') return 'skip';
  if (col.id === 'statusIcon' || col.id === 'type') return 'badge';
  if (index === 0 && !col.header) return 'badge';
  if (col.id === 'name' || col.id === 'part' || col.id === 'part_name' || col.id === 'title') {
    return 'lead';
  }
  if (col.hideBelow) return 'skip';
  return 'meta';
}

function renderCell<T extends object>(col: DataTableColumn<T>, row: T, index: number): ReactNode {
  return col.cell?.({ row, index }) ?? col.accessor?.(row) ?? null;
}

function metaLabel<T>(col: DataTableColumn<T>): string {
  if (typeof col.header === 'string' && col.header) return col.header;
  return '';
}

function metaValue<T extends object>(
  col: DataTableColumn<T>,
  row: T,
  index: number
): ReactNode | null {
  if (col.mobileDisplay) return col.mobileDisplay(row);

  const hasAccessor = Boolean(col.accessor);
  const useText = hasAccessor && col.mobileMeta !== 'cell';

  if (useText) {
    const raw = col.accessor!(row);
    if (raw == null || raw === '') return null;
    return (
      <span
        className={clsx(
          'text-[12px] font-semibold text-slate-800',
          col.latin && 'font-mono tracking-wide'
        )}
      >
        {formatCellValue(raw, col.latin)}
      </span>
    );
  }

  const fromCell = renderCell(col, row, index);
  if (fromCell == null || fromCell === '') return null;
  return fromCell;
}

export function DataTableMobileCard<T extends object>({
  row,
  index,
  columns,
  withCheckbox,
  checked,
  selected,
  onToggleCheck,
  onRowClick,
}: DataTableMobileCardProps<T>) {
  const grouped = columns.map((col, i) => ({
    col,
    role: resolveMobileRole(col, i),
  }));

  const badge = grouped.find((g) => g.role === 'badge');
  const lead = grouped.find((g) => g.role === 'lead');
  const action = grouped.find((g) => g.role === 'action');
  const facts = grouped
    .filter((g) => g.role === 'meta' && metaLabel(g.col))
    .map((g) => ({
      ...g,
      label: metaLabel(g.col),
      value: metaValue(g.col, row, index),
    }))
    .filter((f) => f.value != null && f.value !== '');

  const onKeyDown = onRowClick
    ? (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRowClick();
        }
      }
    : undefined;

  return (
    <div
      role={onRowClick ? 'button' : undefined}
      tabIndex={onRowClick ? 0 : undefined}
      onClick={onRowClick}
      onKeyDown={onKeyDown}
      className={clsx(
        'md:hidden rounded-2xl transition-colors duration-150',
        'bg-bg-surface px-3.5 py-3',
        'ring-1 ring-slate-900/[0.05]',
        selected && 'bg-primary-50/25 ring-primary-200/60',
        onRowClick && 'cursor-pointer active:bg-slate-50/80'
      )}
    >
      {/* Identity — checkbox · badge? · lead · action */}
      <div className="flex items-start gap-3 min-w-0">
        {withCheckbox ? (
          <div
            className="shrink-0 pt-1"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Checkbox checked={checked} onChange={onToggleCheck} aria-label="انتخاب" />
          </div>
        ) : null}

        {badge && !lead ? (
          <div className="shrink-0 pt-0.5" onClick={(e) => e.stopPropagation()}>
            {renderCell(badge.col, row, index)}
          </div>
        ) : null}

        <div className="flex-1 min-w-0 pt-0.5">
          {lead ? (
            <div className="min-w-0 [&_button]:pointer-events-auto [&_button]:w-full [&_button]:text-right">
              {renderCell(lead.col, row, index)}
            </div>
          ) : badge ? (
            <div onClick={(e) => e.stopPropagation()}>{renderCell(badge.col, row, index)}</div>
          ) : null}
        </div>

        {action ? (
          <div className="shrink-0 -ms-1" onClick={(e) => e.stopPropagation()}>
            {renderCell(action.col, row, index)}
          </div>
        ) : onRowClick ? (
          <ChevronLeft
            size={18}
            className="shrink-0 text-slate-300 mt-1"
            strokeWidth={2}
            aria-hidden
          />
        ) : null}
      </div>

      {/* Facts — stacked label/value rows inside inset panel */}
      {facts.length > 0 ? (
        <div className="mt-3 divide-y divide-border overflow-hidden rounded-xl bg-bg-muted/70">
          {facts.map(({ col, label, value }) => (
            <div
              key={col.id}
              className="flex items-center justify-between gap-4 px-3 py-2.5 min-h-[40px]"
            >
              <span className="text-[11px] font-medium text-slate-500 shrink-0">{label}</span>
              <div className="min-w-0 flex-1 flex justify-end items-center">{value}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
