/**
 * @fileoverview Trailing row action — compact ghost button.
 */
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/Button';

export interface RowActionCellProps {
  label?: string;
  onAction?: () => void;
}

export function RowActionCell({ label = 'مشاهده', onAction }: RowActionCellProps) {
  return (
    <Button
      appearance="ghost"
      size="sm"
      iconStart={<ArrowLeft />}
      mirrorStart
      onClick={(e) => {
        e.stopPropagation();
        onAction?.();
      }}
    >
      {label}
    </Button>
  );
}
