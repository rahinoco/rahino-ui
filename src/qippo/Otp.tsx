import { useId, useRef, type KeyboardEvent, type ClipboardEvent } from 'react';

import { cn } from '@/lib/cn';

export type QippoOtpTone = 'inactive' | 'focused' | 'active' | 'error' | 'disabled';

export interface QippoOtpProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * Qippo Login Code / OTP cells — Figma Tab / Login Code (2187:3585).
 * Qippo-only. NOT Rahino canonical.
 */
export function QippoOtp({
  length = 4,
  value = '',
  onChange,
  disabled,
  error,
  className,
  'aria-label': ariaLabel = 'کد ورود',
}: QippoOtpProps) {
  const id = useId();
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const setAt = (index: number, char: string) => {
    const next = chars.map((c, i) => (i === index ? char : c));
    onChange?.(next.join('').slice(0, length));
  };

  const onKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !chars[index] && index > 0) {
      refs.current[index - 1]?.focus();
      setAt(index - 1, '');
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange?.(text);
    const focusIdx = Math.min(text.length, length - 1);
    refs.current[focusIdx]?.focus();
  };

  return (
    <span className={cn('qippo inline-flex', className)}>
      <div className="qippo-otp" role="group" aria-label={ariaLabel}>
        {chars.map((char, index) => {
          let tone: QippoOtpTone = 'inactive';
          if (disabled) tone = 'disabled';
          else if (error) tone = 'error';
          else if (char) tone = 'active';
          return (
            <input
              key={`${id}-${index}`}
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="qippo-otp__cell"
              data-tone={tone}
              inputMode="numeric"
              maxLength={1}
              value={char}
              disabled={disabled}
              aria-label={`${ariaLabel} ${index + 1}`}
              onChange={(e) => {
                const digit = e.target.value.replace(/\D/g, '').slice(-1);
                setAt(index, digit);
                if (digit && index < length - 1) refs.current[index + 1]?.focus();
              }}
              onKeyDown={(e) => onKeyDown(index, e)}
              onPaste={onPaste}
              onFocus={(e) => e.target.select()}
            />
          );
        })}
      </div>
    </span>
  );
}
