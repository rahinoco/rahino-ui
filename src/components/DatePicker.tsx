/**
 * Jalali DatePicker — persian-date-kit + Qipper Category field shell.
 * Theme comes from ThemeProvider (Qipper used zustand useUIStore).
 */

import { formatJalali, PersianDatePicker, toJalaliParts } from 'persian-date-kit';
import { useId, useMemo } from 'react';
import 'persian-date-kit/styles.css';

import { clsx } from 'clsx';
import { CalendarDays } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import FormField from '@/components/FormField';
import { resolveTheme, useOptionalTheme } from '@/theme';
import { FIELD } from '@/tokens/fieldTokens';

export interface DatePickerChangePayload {
  date: Date | null;
  iso: string | null;
  display: string;
}

export interface DatePickerProps {
  value?: Date | string | null;
  onChange?: (payload: DatePickerChangePayload) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  withTime?: boolean;
}

function formatDisplay(date: Date | null | undefined, withTime: boolean): string {
  if (!date) return '';
  const base = formatJalali(toJalaliParts(date));
  if (!withTime) return base;
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${base} ${hh}:${mm}`;
}

export default function DatePicker({
  value,
  onChange,
  label,
  error,
  placeholder = 'انتخاب تاریخ',
  required,
  disabled,
  className,
  minDate,
  maxDate,
  withTime = false,
}: DatePickerProps) {
  const id = useId();
  const themeCtx = useOptionalTheme();
  const theme = themeCtx ? themeCtx.resolvedTheme : resolveTheme('system');

  const dateValue = useMemo(() => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      const t = Date.parse(value);
      return Number.isNaN(t) ? null : new Date(t);
    }
    return null;
  }, [value]);

  const classes = {
    root: 'qipper-pdp w-full font-sans',
    control: 'w-full relative !gap-0',
    input: clsx(
      FIELD.controlClass,
      'pl-11 w-full text-right cursor-pointer',
      error ? FIELD.controlError : FIELD.controlOk
    ),
    button: '!hidden',
    popover:
      'qipper-pdp-popover z-[220] !rounded-[1.5rem] !border-0 !shadow-heavy !ring-1 !ring-border !p-3 !bg-bg-elevated',
    header: '!font-black !text-fg',
    navButton:
      '!rounded-xl !border-0 !bg-bg-muted !text-fg-muted hover:!bg-primary-100 hover:!text-primary-700',
    monthLabel: '!font-black !text-sm !text-fg font-sans',
    weekday: '!text-[11px] !font-black !text-fg-subtle font-sans',
    day: '!rounded-xl !font-bold !text-sm tabular-nums font-sans !text-fg',
    dayToday: '!text-primary-600',
    dayOutside: '!text-fg-subtle',
    dayDisabled: '!opacity-30',
    timePicker: '!mt-3 !pt-3 !border-t !border-border font-sans',
    timeStepper: '!rounded-xl !bg-bg-muted',
    timeStepperButton: '!text-primary-600',
    timeStepperInput: '!font-black tabular-nums !text-fg font-sans',
  };

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      htmlFor={id}
      className={twMerge('qipper-datepicker relative', className)}
    >
      <div className="relative w-full h-11">
        <PersianDatePicker
          value={dateValue}
          onChange={(next) => {
            const d = Array.isArray(next) ? (next[0] ?? null) : next;
            onChange?.({
              date: d,
              iso: d ? d.toISOString() : null,
              display: formatDisplay(d, withTime),
            });
          }}
          placeholder={placeholder}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          theme={theme}
          timePicker={
            withTime
              ? { enabled: true, format: 'HH:mm', minuteStep: 15, showSeconds: false }
              : undefined
          }
          showCalendarButton={false}
          classes={classes}
          popover={{ portal: true, gutter: 10, align: 'end' }}
          formatValue={(d) => formatDisplay(d, withTime)}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-11 items-center justify-center text-fg-subtle">
          <CalendarDays size={16} strokeWidth={2.5} />
        </div>
      </div>
    </FormField>
  );
}
