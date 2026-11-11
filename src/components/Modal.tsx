import { AnimatePresence, usePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react';

import IconButton from '@/components/IconButton';
import type { UiIcon } from '@/types/icon';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  accessibleName?: string;
  closeLabel?: string;
  role?: 'dialog' | 'alertdialog';
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
  icon?: UiIcon;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  hideClose?: boolean;
  bodyClassName?: string;
  className?: string;
  headerExtra?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  onDismissBlocked?: () => void;
}

export default function Modal({ isOpen, ...props }: ModalProps) {
  // Only an open nested dialog needs to participate in its parent’s exit.
  return (
    <AnimatePresence propagate={isOpen}>
      {isOpen && <OpenModal {...props} />}
    </AnimatePresence>
  );
}

function OpenModal({
  onClose,
  title,
  subtitle,
  accessibleName = 'دیالوگ',
  closeLabel = 'بستن',
  role = 'dialog',
  initialFocusRef,
  returnFocusRef,
  icon: Icon,
  children,
  footer,
  size = 'md',
  hideClose = false,
  bodyClassName,
  className,
  headerExtra,
  closeOnBackdrop = false,
  closeOnEscape = true,
  onDismissBlocked,
}: Omit<ModalProps, 'isOpen'>) {
  const [isPresent, safeToRemove] = usePresence();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartedOnBackdrop = useRef(false);
  const focusOptions = useRef({ initialFocusRef, returnFocusRef });
  const titleId = useId();
  const descriptionId = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isPresent) return;
    const focus = focusOptions.current;
    const requested = focus.initialFocusRef?.current;
    const initial = requested && dialog.contains(requested) && !requested.matches(':disabled, [hidden]')
      ? requested
      : (children == null ? closeRef.current ?? titleRef.current : titleRef.current ?? closeRef.current);
    const alreadyAutofocus = initial?.hasAttribute('autofocus');
    initial?.setAttribute('autofocus', '');
    dialog.showModal();
    if (!alreadyAutofocus) initial?.removeAttribute('autofocus');

    const viewport = window.visualViewport;
    function fitViewport() {
      if (!dialog || !viewport) return;
      dialog.style.setProperty('--rds-dialog-viewport-top', `${viewport.offsetTop}px`);
      dialog.style.setProperty('--rds-dialog-viewport-bottom', `${Math.max(0, document.documentElement.clientHeight - viewport.height - viewport.offsetTop)}px`);
      dialog.toggleAttribute('data-short-viewport', viewport.height < 400);
    }
    fitViewport();
    viewport?.addEventListener('resize', fitViewport);
    viewport?.addEventListener('scroll', fitViewport);
    return () => {
      viewport?.removeEventListener('resize', fitViewport);
      viewport?.removeEventListener('scroll', fitViewport);
      dialog.close();
      requestAnimationFrame(() => {
        if (dialog.open || document.activeElement !== document.body) return;
        focus.returnFocusRef?.current?.focus();
      });
    };
  }, [isPresent]);

  useEffect(() => {
    if (isPresent) return;

    // Native modality ends immediately. Keep the DOM only while the exit is painted.
    const exit = dialogRef.current?.getAnimations().find(
      (animation) => animation instanceof CSSTransition && animation.transitionProperty === 'display',
    );
    if (!exit) {
      safeToRemove?.();
      return;
    }

    let cancelled = false;
    const remove = () => { if (!cancelled) safeToRemove?.(); };
    void exit.finished.then(remove, remove);
    return () => { cancelled = true; };
  }, [isPresent, safeToRemove]);

  function requestDismiss(allowed: boolean) {
    if (allowed) onClose();
    else onDismissBlocked?.();
  }

  return (
    <dialog
      ref={dialogRef}
      className={['rds-dialog', className].filter(Boolean).join(' ')}
      data-size={size}
      inert={!isPresent}
      role={role === 'alertdialog' ? role : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : accessibleName}
      aria-describedby={subtitle ? descriptionId : undefined}
      onCancel={(event) => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        requestDismiss(closeOnEscape);
      }}
      onClose={(event) => {
        if (isPresent && event.target === event.currentTarget && !event.currentTarget.open) onClose();
      }}
      onPointerDown={(event) => {
        pointerStartedOnBackdrop.current = event.target === event.currentTarget && event.button === 0;
      }}
      onClick={(event) => {
        if (pointerStartedOnBackdrop.current && event.target === event.currentTarget) requestDismiss(closeOnBackdrop);
        pointerStartedOnBackdrop.current = false;
      }}
    >
      <div className="rds-dialog__panel">
        <div className="rds-dialog__content">
          {(title || subtitle || Icon || headerExtra || !hideClose) && (
            <div className="rds-dialog__header">
              <div className="rds-dialog__heading">
                {Icon && <span className="rds-dialog__icon" aria-hidden="true"><Icon /></span>}
                <div className="rds-dialog__copy">
                  {title && <h2 id={titleId} ref={titleRef} tabIndex={-1} className="rds-type-title-md">{title}</h2>}
                  {subtitle && <div id={descriptionId} className="rds-dialog__description rds-type-body-md">{subtitle}</div>}
                </div>
                {!hideClose && (
                  <IconButton ref={closeRef} appearance="ghost" size="md" aria-label={closeLabel} onClick={() => requestDismiss(closeOnEscape)}>
                    <X />
                  </IconButton>
                )}
              </div>
              {headerExtra}
            </div>
          )}
          {children != null && <div className={['rds-dialog__body', bodyClassName].filter(Boolean).join(' ')}>{children}</div>}
          {footer && <div className="rds-dialog__footer">{footer}</div>}
        </div>
      </div>
    </dialog>
  );
}

export interface ModalFormCardProps {
  children?: ReactNode;
  className?: string;
}

export function ModalFormCard({ children, className }: ModalFormCardProps) {
  return <div className={['rds-dialog-form-card', className].filter(Boolean).join(' ')}>{children}</div>;
}

export interface ChoiceTileProps {
  icon?: UiIcon;
  label?: ReactNode;
  description?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ChoiceTile({ icon: Icon, label, description, onClick, className }: ChoiceTileProps) {
  return (
    <button type="button" onClick={onClick} className={['rds-dialog-choice', className].filter(Boolean).join(' ')}>
      {Icon && <span className="rds-dialog__icon" aria-hidden="true"><Icon /></span>}
      <span className="rds-type-label-md">{label}</span>
      {description && <span className="rds-type-body-sm">{description}</span>}
    </button>
  );
}
