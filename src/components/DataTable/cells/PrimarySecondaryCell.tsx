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
  if (!primary && !secondary) return <span className="text-slate-300 text-xs">—</span>;

  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span
        className={
          primaryClassName ??
          'text-[13px] font-semibold text-slate-800 truncate leading-snug group-hover:text-primary-600 transition-colors'
        }
      >
        {primary}
      </span>
      {secondary ? (
        <span className="text-[10px] font-medium text-slate-400 truncate leading-tight">
          {secondary}
        </span>
      ) : null}
    </div>
  );
}
