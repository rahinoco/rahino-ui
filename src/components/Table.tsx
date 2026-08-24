/**
 * Soft Table — borderless light rows.
 */

import { clsx } from 'clsx';
import type { KeyboardEvent, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const HEADER_CLASS = 'text-[11px] font-bold text-slate-400 tracking-wide';

export interface TableColumn<T extends Record<string, unknown>> {
  key: string;
  header: ReactNode;
  className?: string;
  numeric?: boolean;
  render?: (row: T, index: number) => ReactNode;
}

type TableVariant = 'soft' | 'card' | 'classic';

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns?: TableColumn<T>[];
  data?: T[];
  variant?: TableVariant;
  rowKey?: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  isSelected?: (row: T) => boolean;
  emptyState?: ReactNode;
  className?: string;
  gridTemplate?: string;
  children?: ReactNode;
}

export default function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns = [],
  data = [],
  variant = 'soft',
  rowKey = (row, i) => (row.id as string | number | undefined) ?? i,
  onRowClick,
  isSelected,
  emptyState,
  className,
  gridTemplate,
  children,
}: TableProps<T>) {
  if (children && !columns.length) {
    return <ClassicShell className={className}>{children}</ClassicShell>;
  }

  if (!data.length) {
    return (
      emptyState || (
        <div className="py-20 text-center text-sm font-bold text-slate-400 bg-bg-surface/60 rounded-[1.75rem]">
          موردی برای نمایش وجود ندارد
        </div>
      )
    );
  }

  if (variant === 'classic') {
    return (
      <ClassicShell className={className}>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key} className={col.className}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, i) => (
            <Tr
              key={rowKey(row, i)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={clsx(
                onRowClick && 'cursor-pointer',
                isSelected?.(row) && 'bg-primary-50/50'
              )}
            >
              {columns.map((col) => (
                <Td key={col.key} className={clsx(col.className, col.numeric && 'tabular-nums')}>
                  {col.render ? col.render(row, i) : (row[col.key] as ReactNode)}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ClassicShell>
    );
  }

  const template = gridTemplate || `repeat(${columns.length}, minmax(0, 1fr))`;

  return (
    <div
      className={twMerge(
        clsx(
          variant === 'soft' && 'bg-slate-100/50 rounded-[2rem] overflow-hidden',
          variant === 'card' && 'flex flex-col gap-4',
          className
        )
      )}
    >
      {variant === 'soft' && (
        <div
          className="grid h-12 px-6 items-center gap-4"
          style={{ gridTemplateColumns: template }}
        >
          {columns.map((col) => (
            <div key={col.key} className={clsx(HEADER_CLASS, col.className)}>
              {col.header}
            </div>
          ))}
        </div>
      )}

      <div
        className={clsx(variant === 'soft' && 'pb-2', variant === 'card' && 'flex flex-col gap-3')}
      >
        {data.map((row, i) => {
          const selected = isSelected?.(row);
          return (
            <div
              key={rowKey(row, i)}
              role={onRowClick ? 'button' : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              onKeyDown={
                onRowClick
                  ? (e: KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onRowClick(row);
                      }
                    }
                  : undefined
              }
              className={clsx(
                'transition-all duration-200',
                variant === 'soft' &&
                  'grid h-[76px] mx-4 my-2 px-4 items-center gap-4 rounded-2xl bg-bg-surface shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5',
                variant === 'soft' &&
                  selected &&
                  'ring-2 ring-primary-100 scale-[1.01] shadow-[0_8px_32px_rgba(65,121,240,0.08)]',
                variant === 'card' &&
                  'rounded-[1.5rem] border border-slate-100 bg-bg-surface p-5 hover:border-slate-300 hover:shadow-sm',
                variant === 'card' &&
                  selected &&
                  'border-primary-300 bg-primary-50/20 ring-1 ring-primary-100',
                onRowClick && 'cursor-pointer'
              )}
              style={variant === 'soft' ? { gridTemplateColumns: template } : undefined}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={clsx(
                    'min-w-0',
                    col.numeric && 'tabular-nums font-sans',
                    col.className
                  )}
                >
                  {col.render ? col.render(row, i) : (row[col.key] as ReactNode)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ClassicShellProps {
  children?: ReactNode;
  className?: string;
}

function ClassicShell({ children, className }: ClassicShellProps) {
  return (
    <div
      className={twMerge(
        'w-full overflow-x-auto rounded-[1.75rem] bg-bg-surface/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)]',
        className
      )}
    >
      <table className="w-full text-right border-collapse">{children}</table>
    </div>
  );
}

export interface TheadProps {
  children?: ReactNode;
}

export function Thead({ children }: TheadProps) {
  return <thead className="bg-slate-50/50">{children}</thead>;
}

export interface TbodyProps {
  children?: ReactNode;
}

export function Tbody({ children }: TbodyProps) {
  return <tbody>{children}</tbody>;
}

export interface TrProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Tr({ children, className, onClick }: TrProps) {
  return (
    <tr
      onClick={onClick}
      className={clsx(
        'hover:bg-slate-50/70 transition-colors duration-200 group',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </tr>
  );
}

export interface ThProps {
  children?: ReactNode;
  className?: string;
}

export function Th({ children, className }: ThProps) {
  return (
    <th className={clsx('px-6 py-4 whitespace-nowrap text-right', HEADER_CLASS, className)}>
      {children}
    </th>
  );
}

export interface TdProps {
  children?: ReactNode;
  className?: string;
}

export function Td({ children, className }: TdProps) {
  return (
    <td
      className={clsx(
        'px-6 py-4 text-sm font-bold text-slate-700 whitespace-nowrap align-middle',
        className
      )}
    >
      {children}
    </td>
  );
}
