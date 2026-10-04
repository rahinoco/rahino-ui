/**
 * TimePicker — Qipper Category-shell + soft popover (separate from date).
 */

import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

import FormField from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

interface PopoverPosition {
  top: number;
  left: number;
  width: number;
}

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function TimePicker({
  value = '',
  onChange,
  label,
  error,
  placeholder = 'انتخاب ساعت',
  required,
  disabled,
  className,
}: TimePickerProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLElement | null>(null);
  const [portalMounted, setPortalMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<PopoverPosition>({ top: 0, left: 0, width: 260 });

  const [h, m] = (value || '').split(':');
  const hour = HOURS.includes(h) ? h : '09';
  const minute = MINUTES.includes(m) ? m : '00';

  const updatePos = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.max(r.width, 260);
    let left = r.left;
    if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
    let top = r.bottom + 10;
    if (top + 300 > window.innerHeight) top = Math.max(12, r.top - 310);
    setPos({ top, left, width });
  };

  useEffect(() => {
    portalRef.current =
      document.getElementById('rahino-portal-root') ??
      document.getElementById('portal-root') ??
      document.body;
    setPortalMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePos();
    const onScroll = () => updatePos();
    const onDown = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    document.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  return (
    <FormField label={label} required={required} error={error} htmlFor={id} className={className}>
      <button
        id={id}
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => {
          updatePos();
          setOpen((v) => !v);
        }}
        className={twMerge(
          clsx(
            FIELD.controlClass,
            'pl-11 text-right flex items-center',
            error ? FIELD.controlError : FIELD.controlOk,
            open && !error && FIELD.controlOpen,
            disabled && 'opacity-50 cursor-not-allowed'
          )
        )}
      >
        <span
          className={clsx('tabular-nums font-sans', value ? 'text-slate-900' : 'text-slate-400')}
        >
          {value || placeholder}
        </span>
        <Clock size={16} strokeWidth={2.5} className="absolute left-3.5 text-slate-400" />
      </button>

      {portalMounted && portalRef.current
        ? createPortal(
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="rahino-time-picker"
                  ref={panelRef}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    position: 'fixed',
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    zIndex: 220,
                  }}
                  className={clsx(FIELD.popover, 'overflow-hidden p-3')}
                >
                  <div className="flex items-center justify-center gap-1.5 py-3 mb-2 rounded-2xl bg-slate-50">
                    <span className="text-3xl font-black tabular-nums text-slate-900 font-sans">
                      {hour}
                    </span>
                    <span className="text-3xl font-black text-slate-300">:</span>
                    <span className="text-3xl font-black tabular-nums text-slate-900 font-sans">
                      {minute}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 h-48">
                    <div className="overflow-y-auto custom-scrollbar rounded-2xl bg-slate-50 p-1.5">
                      <div className="text-[10px] font-black text-slate-400 text-center mb-1 tracking-widest">
                        ساعت
                      </div>
                      {HOURS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => onChange?.(`${item}:${minute}`)}
                          className={clsx(
                            'w-full py-2 rounded-xl text-sm font-bold tabular-nums font-sans transition-all',
                            hour === item
                              ? 'bg-bg-surface text-primary-600 shadow-sm'
                              : 'text-slate-500 hover:bg-bg-surface/80'
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="overflow-y-auto custom-scrollbar rounded-2xl bg-slate-50 p-1.5">
                      <div className="text-[10px] font-black text-slate-400 text-center mb-1 tracking-widest">
                        دقیقه
                      </div>
                      {MINUTES.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            onChange?.(`${hour}:${item}`);
                            setOpen(false);
                          }}
                          className={clsx(
                            'w-full py-2.5 rounded-xl text-sm font-bold tabular-nums font-sans transition-all',
                            minute === item
                              ? 'bg-bg-surface text-primary-600 shadow-sm'
                              : 'text-slate-500 hover:bg-bg-surface/80'
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            portalRef.current
          )
        : null}
    </FormField>
  );
}
