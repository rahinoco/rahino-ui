/**
 * Inline notice / toast banner. Extracted from Qipper DutyNotice (name was domain-specific).
 */
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

export interface InlineNoticeProps {
  message: string | null;
  onDismiss: () => void;
  durationMs?: number;
}

export function InlineNotice({ message, onDismiss, durationMs = 3200 }: InlineNoticeProps) {
  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [message, durationMs, onDismiss]);

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="pointer-events-auto fixed bottom-24 start-4 end-4 z-[80] sm:bottom-8 sm:start-auto sm:end-6 sm:max-w-sm"
        >
          <div className="flex items-start gap-3 rounded-lg bg-slate-900 px-4 py-3 text-white shadow-lg shadow-black/10">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-success-400" />
            <p className="flex-1 text-xs leading-5">{message}</p>
            <button
              type="button"
              aria-label="بستن"
              onClick={onDismiss}
              className="shrink-0 rounded-sm text-white/60 transition-colors hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
