import type { ReactNode } from 'react';
import Checkbox from '@/components/Checkbox';
import { formatCellValue } from './formatCellValue';
import type { DataTableColumn, DataTableMobileRole } from './types';

function resolveRole<T>(col: DataTableColumn<T>, index: number): DataTableMobileRole {
  if (col.mobileRole) return col.mobileRole;
  if (col.id === 'actions' || col.id === 'action') return 'action';
  if (['name', 'part', 'part_name', 'title'].includes(col.id)) return 'lead';
  if (col.id === 'statusIcon' || col.id === 'type' || (index === 0 && !col.header)) return 'badge';
  return 'meta';
}
export function DataTableMobileCard<T extends object>({ row, index, columns, withCheckbox, checked, selected, disabled, onToggleCheck, onRowClick, rowLabel }: {
  row: T; index: number; columns: DataTableColumn<T>[]; withCheckbox: boolean; checked: boolean; selected: boolean;
  disabled: boolean; onToggleCheck: () => void; onRowClick?: () => void; rowLabel: string;
}) {
  const grouped = columns.map((col, i) => ({ col, role: resolveRole(col, i) }));
  const lead = grouped.find(item => item.role === 'lead') ?? grouped.find(item => item.col.header && item.role !== 'skip' && item.role !== 'action');
  const render = (col: DataTableColumn<T>): ReactNode => col.cell?.({ row, index }) ?? formatCellValue(col.accessor?.(row) ?? '—', col.latin);
  const facts = grouped.filter(item => item !== lead && item.role === 'meta' && item.col.header);
  return <div role="row" aria-disabled={disabled || undefined} className="rds-table__row rds-table__mobile" data-selected={selected || undefined} data-disabled={disabled || undefined} data-clickable={Boolean(onRowClick) || undefined}>
    <div role="cell" className="rds-table__identity">
      {withCheckbox && <Checkbox checked={checked} disabled={disabled} onChange={onToggleCheck} aria-label={`انتخاب ${rowLabel.replace(/^باز کردن /, '')}`} />}
      {lead && <div className="rds-table__lead">{render(lead.col)}</div>}
      {grouped.filter(item => item.role === 'badge' && item !== lead).map(({ col }) => <div key={col.id}>{render(col)}</div>)}
      {onRowClick && <button type="button" className="rds-table__activate" aria-label={rowLabel} onClick={onRowClick} />}
    </div>
    {facts.map(({ col }) => <div role="cell" key={col.id} className="rds-table__fact">
      <span className="rds-table__fact-label">{col.header}</span>
      <div data-latin={col.latin || undefined}>{col.mobileDisplay?.(row) ?? (col.mobileMeta === 'cell' || !col.accessor ? render(col) : formatCellValue(col.accessor(row) ?? '—', col.latin))}</div>
    </div>)}
    {grouped.filter(item => item.role === 'action').map(({ col }) => <div role="cell" key={col.id}>{render(col)}</div>)}
  </div>;
}
