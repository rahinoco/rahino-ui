/**
 * Modal — Part Management + Finance Nature/Ledger shell.
 * Header/footer transparent; body soft #f8fafc when needed.
 */

import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import type { UiIcon } from '@/types/icon';

const SIZES = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
  '2xl': 'max-w-7xl',
} as const;

export type ModalSize = keyof typeof SIZES;

type IconComponent = UiIcon;

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
  /** پیش‌فرض true. برای دادهٔ ذخیره‌نشده false بگذارید تا Escape بی‌اطلاع onClose را صدا نزند. */
  closeOnEscape?: boolean;
  /** وقتی Escape یا زمینه بستن را انجام نداد صدا زده می‌شود. خود جزء جملهٔ هشدار نمی‌سازد. */
  onDismissBlocked?: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalLayer = { id: string; node: HTMLElement };

const modalLayers: ModalLayer[] = [];
const inertBefore = new Map<HTMLElement, string | null>();
let scrollLocks = 0;

type SavedScroll = {
  el: HTMLElement;
  overflow: string;
  paddingInlineStart: string;
  paddingInlineEnd: string;
};

let savedScroll: SavedScroll[] = [];

function backgroundScrollers(modalNode: HTMLElement) {
  const found = new Set<HTMLElement>();
  if (document.body) found.add(document.body);
  document.querySelectorAll<HTMLElement>('main').forEach((el) => {
    if (!modalNode.contains(el)) found.add(el);
  });
  return [...found];
}

function focusableIn(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((node) => !node.hasAttribute('disabled') && node.tabIndex !== -1);
}

function syncModalLayers() {
  const top = modalLayers[modalLayers.length - 1];
  for (const layer of modalLayers) {
    if (top && layer.id === top.id) layer.node.removeAttribute('inert');
    else layer.node.setAttribute('inert', '');
  }
  const children = Array.from(document.body.children) as HTMLElement[];
  if (modalLayers.length === 0) {
    for (const [node, previous] of inertBefore) {
      if (previous === null) node.removeAttribute('inert');
      else node.setAttribute('inert', previous);
    }
    inertBefore.clear();
    return;
  }
  for (const child of children) {
    if (child.hasAttribute('data-rahino-modal-root')) continue;
    if (top && child.contains(top.node)) continue;
    if (!inertBefore.has(child)) inertBefore.set(child, child.getAttribute('inert'));
    child.setAttribute('inert', '');
  }
}

function lockModalScroll(modalNode: HTMLElement) {
  scrollLocks += 1;
  if (scrollLocks !== 1) return;
  savedScroll = backgroundScrollers(modalNode).map((el) => {
    const gap = Math.max(0, el.offsetWidth - el.clientWidth);
    const rtl = getComputedStyle(el).direction === 'rtl';
    const cssProp = rtl ? 'padding-inline-start' : 'padding-inline-end';
    const current = Number.parseFloat(getComputedStyle(el).getPropertyValue(cssProp)) || 0;
    const top = el.scrollTop;
    const snapshot: SavedScroll = {
      el,
      overflow: el.style.overflow,
      paddingInlineStart: el.style.paddingInlineStart,
      paddingInlineEnd: el.style.paddingInlineEnd,
    };
    el.style.overflow = 'hidden';
    if (el.scrollTop !== top) el.scrollTop = top;
    if (gap > 0) {
      el.style[rtl ? 'paddingInlineStart' : 'paddingInlineEnd'] = `${current + gap}px`;
    }
    return snapshot;
  });
}

function unlockModalScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks !== 0) return;
  for (const snap of savedScroll) {
    snap.el.style.overflow = snap.overflow;
    snap.el.style.paddingInlineStart = snap.paddingInlineStart;
    snap.el.style.paddingInlineEnd = snap.paddingInlineEnd;
  }
  savedScroll = [];
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
  closeOnEscape = true,
  onDismissBlocked,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const layerId = useId();
  const titleId = useId();
  const subtitleId = useId();
  const onCloseRef = useRef(onClose);
  const onDismissBlockedRef = useRef(onDismissBlocked);
  const closeOnEscapeRef = useRef(closeOnEscape);
  onCloseRef.current = onClose;
  onDismissBlockedRef.current = onDismissBlocked;
  closeOnEscapeRef.current = closeOnEscape;

  useEffect(() => {
    portalRef.current =
      document.getElementById('rahino-portal-root') ??
      document.getElementById('portal-root') ??
      document.body;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    let frame = 0;
    let release: (() => void) | undefined;
    const attach = () => {
      if (cancelled) return;
      const node = rootRef.current;
      const panel = panelRef.current;
      if (!node || !panel) {
        frame = requestAnimationFrame(attach);
        return;
      }
      const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      modalLayers.push({ id: layerId, node });
      lockModalScroll(node);
      syncModalLayers();
      frame = requestAnimationFrame(() => {
        panel.focus();
      });
      const onKey = (event: KeyboardEvent) => {
        if (modalLayers[modalLayers.length - 1]?.id !== layerId) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          if (closeOnEscapeRef.current) onCloseRef.current();
          else onDismissBlockedRef.current?.();
          return;
        }
        if (event.key !== 'Tab') return;
        const items = focusableIn(panel);
        const active = document.activeElement;
        const inside = active === panel || (active instanceof Node && panel.contains(active));
        if (!items.length) {
          event.preventDefault();
          panel.focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        if (!inside || (event.shiftKey && (active === first || active === panel)) || (!event.shiftKey && (active === last || active === panel))) {
          event.preventDefault();
          const backward = event.shiftKey;
          (backward ? last : first).focus();
        }
      };
      document.addEventListener('keydown', onKey, true);
      release = () => {
        cancelAnimationFrame(frame);
        document.removeEventListener('keydown', onKey, true);
        const index = modalLayers.findIndex((layer) => layer.id === layerId);
        if (index >= 0) modalLayers.splice(index, 1);
        unlockModalScroll();
        syncModalLayers();
        requestAnimationFrame(() => {
          if (trigger && trigger.isConnected) {
            trigger.focus();
            return;
          }
          const lower = modalLayers[modalLayers.length - 1]?.node.querySelector<HTMLElement>('[role="dialog"]');
          lower?.focus();
        });
      };
    };
    attach();
    return () => {
      cancelled = true;
      release?.();
    };
  }, [isOpen, mounted, layerId]);

  if (!mounted || !portalRef.current) return null;

  const showChrome = Boolean(title || subtitle || Icon || headerExtra);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen ? (
          <div
          key="rahino-modal"
          ref={rootRef}
          data-rahino-modal-root=""
          className="fixed inset-0 z-[100] flex items-center justify-center overscroll-none p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (closeOnBackdrop) onClose();
              else onDismissBlocked?.();
            }}
            className="absolute inset-0 bg-overlay backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={subtitle ? subtitleId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className={twMerge(
              clsx(
                'relative w-full flex flex-col overflow-hidden max-h-[90vh] outline-none',
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
                        <h3 id={titleId} className="truncate font-sans text-lg font-black tracking-tight text-fg">
                          {title}
                        </h3>
                      )}
                      {subtitle && (
                        <p id={subtitleId} className="mt-1 font-sans text-[12px] font-bold leading-relaxed text-fg-subtle">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  {!hideClose && (
                    <button
                      type="button"
                      onClick={() => {
                        if (closeOnEscape) onClose();
                        else onDismissBlocked?.();
                      }}
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
                  'custom-scrollbar relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain',
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
