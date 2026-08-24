/**
 * @fileoverview Pagination bar — AG Grid-style Persian panel.
 */
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { ReactNode } from 'react';

import Select from '@/components/Select';
import { toPersianDigits } from '@/utils/persianDigits';

interface DataTablePaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  totalRows: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({
  page,
  pageCount,
  pageSize,
  totalRows,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const start = totalRows === 0 ? 0 : page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, totalRows);

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3.5 pb-1 px-1"
      dir="rtl"
    >
      <div className="flex items-center gap-2 order-2 sm:order-1">
        <PageBtn disabled={page <= 0} onClick={() => onPageChange(0)} aria-label="صفحه اول">
          <ChevronsRight size={16} />
        </PageBtn>
        <PageBtn disabled={page <= 0} onClick={() => onPageChange(page - 1)} aria-label="صفحه قبل">
          <ChevronRight size={16} />
        </PageBtn>
        <PageBtn
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
          aria-label="صفحه بعد"
        >
          <ChevronLeft size={16} />
        </PageBtn>
        <PageBtn
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(pageCount - 1)}
          aria-label="صفحه آخر"
        >
          <ChevronsLeft size={16} />
        </PageBtn>
      </div>

      <p className="text-xs font-bold text-slate-400 order-1 sm:order-2 tabular-nums">
        ردیف <span className="text-slate-700 font-black">{toPersianDigits(start)}</span>
        {' تا '}
        <span className="text-slate-700 font-black">{toPersianDigits(end)}</span>
        {' از '}
        <span className="text-slate-700 font-black">{toPersianDigits(totalRows)}</span>
      </p>

      <div className="flex items-center gap-2 order-3 ms-auto sm:ms-0">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">
          تعداد در صفحه
        </span>
        <Select
          searchable={false}
          value={String(pageSize)}
          onChange={(v) => onPageSizeChange(Number(v))}
          options={pageSizeOptions.map((n) => ({
            value: String(n),
            label: toPersianDigits(n),
          }))}
          className="min-w-[88px]"
          controlClassName="!h-11 !rounded-2xl !bg-slate-50 !text-xs !font-black"
        />
      </div>
    </div>
  );
}

function PageBtn({
  children,
  disabled,
  onClick,
  'aria-label': ariaLabel,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  'aria-label'?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center w-9 h-9 rounded-[0.875rem] border transition-colors',
        disabled
          ? 'cursor-not-allowed border-border bg-bg-muted text-fg-subtle opacity-35'
          : 'border-border bg-bg-surface text-fg-muted hover:border-primary-200 hover:bg-primary-50/60 hover:text-primary-600'
      )}
    >
      {children}
    </button>
  );
}
