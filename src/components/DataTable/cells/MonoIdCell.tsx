/**
 * @fileoverview Mono ID badge cell — logistics id / client_req_id style.
 */
import { toPersianDigits } from '@/utils/persianDigits';

export interface MonoIdCellProps {
  prefix?: string;
  suffix?: string;
  label?: string;
}

export function MonoIdCell({ prefix = '', suffix, label }: MonoIdCellProps) {
  return (
    <div className="rds-table__two-line">
      {label ? (
        <span className="rds-table__secondary">
          {label}
        </span>
      ) : null}
      <div className="rds-table__id">
        <span className="rds-table__id-prefix">
          {toPersianDigits(prefix)}
        </span>
        {suffix ? (
          <>
            <span aria-hidden="true">/</span>
            <span>{toPersianDigits(suffix)}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
