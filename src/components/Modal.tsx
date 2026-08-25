/**
 * Modal — Part Management + Finance Nature/Ledger shell.
 * Header/footer transparent; body soft #f8fafc when needed.
 */

import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X, type LucideIcon } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  '2xl': 'max-w-7xl',
} as const;

export type ModalSize = keyof typeof SIZES;

type IconComponent = LucideIcon;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: IconComponent;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  hideClose?: boolean;
  bodyClassName?: string;
  className?: string;
  headerExtra?: ReactNode;
  closeOnBackdrop?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon: Icon,
  children,
  footer,
  size = 'md',
  hideClose = false,
  bodyClassName = 'bg-bg-body',
  className,
  headerExtra,
  closeOnBackdrop = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    portalRef.current =
      document.getElementById('rahino-portal-root') ??
      document.getElementById('portal-root') ??
      document.body;
    setMounted(true);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !portalRef.current) return null;

  const showChrome = Boolean(title || subtitle || Icon || headerExtra);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen ? (
        <div
          key="rahino-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
            className="absolute inset-0 cursor-pointer bg-overlay backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className={twMerge(
              clsx(
                'relative w-full flex flex-col overflow-hidden max-h-[90vh]',
                'bg-bg-surface rounded-[2rem] shadow-heavy',
                SIZES[size],
                className
              )
            )}
          >
            {showChrome && (
              <div className="shrink-0 bg-transparent relative z-10">
                <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    {Icon && (
                      <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 border border-primary-100">
                        <Icon size={20} strokeWidth={2.5} />
                      </div>
                    )}
                    <div className="min-w-0 pt-0.5">
                      {title && (
                        <h3 className="truncate font-sans text-lg font-black tracking-tight text-fg">
                          {title}
                        </h3>
                      )}
                      {subtitle && (
                        <p className="mt-1 font-sans text-[12px] font-bold leading-relaxed text-fg-subtle">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  {!hideClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-fg-subtle outline-none transition-colors hover:bg-error-50 hover:text-error-500"
                      aria-label="بستن"
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
                {headerExtra}
              </div>
            )}

            <div
              className={twMerge(
                clsx(
                  'custom-scrollbar relative flex min-h-0 flex-1 flex-col overflow-y-auto',
                  bodyClassName
                )
              )}
            >
              {children}
            </div>

            {footer && (
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-transparent px-6 py-5 sm:px-8">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    portalRef.current
  );
}

export interface ModalFormCardProps {
  children?: ReactNode;
  className?: string;
}

export function ModalFormCard({ children, className }: ModalFormCardProps) {
  return (
    <div
      className={twMerge(
        'rounded-[2rem] border border-border bg-bg-surface p-6 shadow-light',
        className
      )}
    >
      {children}
    </div>
  );
}

export interface ChoiceTileProps {
  icon?: IconComponent;
  label: ReactNode;
  description?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/** Finance «Select Document Nature» tile */
export function ChoiceTile({
  icon: Icon,
  label,
  description,
  onClick,
  className,
}: ChoiceTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        clsx(
          'group flex flex-col items-center justify-center gap-4 rounded-[2rem] border border-border-subtle bg-bg-surface p-5 text-center font-sans transition-all',
          'hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5',
          className
        )
      )}
    >
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
          <Icon size={22} strokeWidth={2.5} />
        </div>
      )}
      <span className="block text-xs font-black text-fg">{label}</span>
      {description && (
        <span className="block text-[10px] font-bold leading-relaxed text-fg-subtle">
          {description}
        </span>
      )}
    </button>
  );
}
