/**
 * @fileoverview Default text formatting — Persian digits unless column is latin (codes/locations).
 */
import { toPersianDigits } from '@/utils/persianDigits';

export function formatCellValue(
  value: string | number | null | undefined,
  latin?: boolean
): string {
  if (value == null || value === '') return '—';
  const str = String(value);
  return latin ? str : toPersianDigits(str);
}
