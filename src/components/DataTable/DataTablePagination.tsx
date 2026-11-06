import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import IconButton from '@/components/IconButton';
import Select from '@/components/Select';
import { toPersianDigits } from '@/utils/persianDigits';
export function DataTablePagination({ page, pageCount, pageSize, totalRows, pageSizeOptions, onPageChange, onPageSizeChange }: {
  page: number; pageCount: number; pageSize: number; totalRows: number; pageSizeOptions: number[];
  onPageChange: (page: number) => void; onPageSizeChange: (size: number) => void;
}) {
  return <div className="rds-table__pagination">
    <nav aria-label="صفحه‌های جدول" className="rds-table__pages">
      <IconButton appearance="ghost" disabled={page <= 0} onClick={() => onPageChange(0)} aria-label="صفحه اول"><ChevronsRight className="rds-table__directional" /></IconButton>
      <IconButton appearance="ghost" disabled={page <= 0} onClick={() => onPageChange(page - 1)} aria-label="صفحه قبل"><ChevronRight className="rds-table__directional" /></IconButton>
      <IconButton appearance="ghost" disabled={page >= pageCount - 1} onClick={() => onPageChange(page + 1)} aria-label="صفحه بعد"><ChevronLeft className="rds-table__directional" /></IconButton>
      <IconButton appearance="ghost" disabled={page >= pageCount - 1} onClick={() => onPageChange(pageCount - 1)} aria-label="صفحه آخر"><ChevronsLeft className="rds-table__directional" /></IconButton>
    </nav>
    <p role="status">ردیف {toPersianDigits(page * pageSize + 1)} تا {toPersianDigits(Math.min((page + 1) * pageSize, totalRows))} از {toPersianDigits(totalRows)}</p>
    <Select className="rds-table__page-size" label="تعداد در صفحه" searchable={false} value={String(pageSize)} onChange={value => onPageSizeChange(Number(value))} options={[...new Set([pageSize, ...pageSizeOptions])].sort((a, b) => a - b).map(n => ({ value: String(n), label: toPersianDigits(n) }))} />
  </div>;
}
