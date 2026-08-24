/**
 * Confirmation dialog on Modal shell — same visual language.
 */
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

type ConfirmationVariant = 'danger' | 'warning' | 'info';

const VARIANT_META: Record<
  ConfirmationVariant,
  { icon: typeof AlertTriangle; iconClass: string; confirmVariant: 'danger' | 'primary' }
> = {
  danger: {
    icon: AlertTriangle,
    iconClass: 'bg-error-100 text-error-600 border-error-200',
    confirmVariant: 'danger',
  },
  warning: {
    icon: AlertCircle,
    iconClass: 'bg-warning-50 text-warning-600 border-warning-100',
    confirmVariant: 'primary',
  },
  info: {
    icon: Info,
    iconClass: 'bg-primary-100 text-primary-600 border-primary-200',
    confirmVariant: 'primary',
  },
};

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationVariant;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأیید عملیات',
  message,
  confirmText = 'تأیید',
  cancelText = 'انصراف',
  variant = 'danger',
  isLoading = false,
}: ConfirmationModalProps) {
  const meta = VARIANT_META[variant] || VARIANT_META.info;
  const Icon = meta.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={title}
      icon={Icon}
      bodyClassName="bg-bg-surface"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={meta.confirmVariant} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="px-6 sm:px-8 py-6">
        {message && (
          <p className="text-sm font-bold text-slate-600 leading-relaxed text-justify">{message}</p>
        )}
      </div>
    </Modal>
  );
}
