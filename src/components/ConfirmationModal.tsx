import { AlertTriangle } from 'lucide-react';
import { useRef, type RefObject } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

type ConfirmationVariant = 'danger' | 'warning' | 'info';

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
  error?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
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
  error,
  returnFocusRef,
}: ConfirmationModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const urgent = variant === 'danger' || variant === 'warning';

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { if (!isLoading) onClose(); }}
      size="sm"
      title={title}
      subtitle={message}
      role={urgent ? 'alertdialog' : 'dialog'}
      className={variant === 'warning' ? 'rds-dialog--warning' : undefined}
      icon={variant === 'warning' ? AlertTriangle : undefined}
      initialFocusRef={isLoading ? confirmRef : cancelRef}
      returnFocusRef={returnFocusRef}
      hideClose
      footer={
        <>
          <Button ref={confirmRef} appearance="solid" intent={variant === 'danger' ? 'danger' : 'brand'} onClick={onConfirm} loading={isLoading}>
            {confirmText}
          </Button>
          <Button ref={cancelRef} appearance="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
        </>
      }
    >
      {error ? <p className="rds-dialog__error rds-type-body-sm" role="alert">{error}</p> : null}
    </Modal>
  );
}
