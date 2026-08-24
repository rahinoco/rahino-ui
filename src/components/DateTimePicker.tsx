/**
 * DateTimePicker — Date + Time side-by-side (never one ugly combined popup).
 */
import { useEffect, useState } from 'react';

import DatePicker from '@/components/DatePicker';
import { FormRow } from '@/components/FormField';
import TimePicker from '@/components/TimePicker';

type DateTimeMode = 'datetime' | 'date' | 'time';

export interface DateTimePickerProps {
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  mode?: DateTimeMode;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export default function DateTimePicker({
  value,
  onChange,
  placeholder = 'انتخاب زمان',
  mode = 'datetime',
  className,
  label,
  error,
  required,
}: DateTimePickerProps) {
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [dateDisplay, setDateDisplay] = useState('');
  const [timeValue, setTimeValue] = useState('09:00');

  useEffect(() => {
    if (!value) {
      setDateIso(null);
      setDateDisplay('');
    }
  }, [value]);

  const emit = (d: string, t: string) => {
    if (mode === 'time') return onChange?.(t || '');
    if (mode === 'date') return onChange?.(d || '');
    if (!d && !t) return onChange?.('');
    onChange?.(`${d || '—'}، ساعت ${t || '—'}`);
  };

  if (mode === 'time') {
    return (
      <TimePicker
        label={label}
        error={error}
        required={required}
        placeholder={placeholder}
        value={timeValue}
        className={className}
        onChange={(t) => {
          setTimeValue(t);
          emit('', t);
        }}
      />
    );
  }

  if (mode === 'date') {
    return (
      <DatePicker
        label={label}
        error={error}
        required={required}
        placeholder={placeholder}
        value={dateIso}
        className={className}
        onChange={({ iso, display }) => {
          setDateIso(iso);
          setDateDisplay(display);
          emit(display, '');
        }}
      />
    );
  }

  return (
    <div className={className}>
      <FormRow cols={2} gap="gap-3">
        <DatePicker
          label={label || 'تاریخ'}
          required={required}
          error={error}
          value={dateIso}
          onChange={({ iso, display }) => {
            setDateIso(iso);
            setDateDisplay(display);
            emit(display, timeValue);
          }}
        />
        <TimePicker
          label="ساعت"
          value={timeValue}
          onChange={(t) => {
            setTimeValue(t);
            emit(dateDisplay, t);
          }}
        />
      </FormRow>
    </div>
  );
}
