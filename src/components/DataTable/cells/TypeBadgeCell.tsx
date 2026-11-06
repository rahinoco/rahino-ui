export interface TypeBadgeCellProps {
  tone?: 'primary' | 'success' | 'warning' | 'slate' | 'error';
  label?: string;
}
export function TypeBadgeCell({ label = '—', tone = 'slate' }: TypeBadgeCellProps) {
  return <span className="rds-table__badge" data-tone={tone}>{label}</span>;
}
