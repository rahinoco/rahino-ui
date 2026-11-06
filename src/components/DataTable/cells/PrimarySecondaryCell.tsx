/**
 * @fileoverview Two-line cell — primary title + muted subtitle.
 */
export interface PrimarySecondaryCellProps {
  primary?: string;
  secondary?: string;
  primaryClassName?: string;
}

export function PrimarySecondaryCell({
  primary = '',
  secondary = '',
  primaryClassName,
}: PrimarySecondaryCellProps) {
  if (!primary && !secondary) return <span className="rds-table__secondary">—</span>;

  return (
    <div className="rds-table__two-line">
      <span
        className={
          primaryClassName ??
          'rds-table__primary'
        }
      >
        {primary}
      </span>
      {secondary ? (
        <span className="rds-table__secondary">
          {secondary}
        </span>
      ) : null}
    </div>
  );
}
