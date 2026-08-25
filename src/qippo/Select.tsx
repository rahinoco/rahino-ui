import { type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

export type QippoSelectSize = 'sm' | 'md' | 'lg';

export interface QippoSelectOption {
  value: string;
  label: string;
}

export interface QippoSelectProps {
  options?: QippoSelectOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  size?: QippoSelectSize;
  className?: string;
}

/** Magicoon chevron-down from Figma Controls=chevron-down-small (7315:33345). */
function ChevronIcon() {
  return (
    <svg className="qippo-select__chevron" viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
      <path d="M16.5 9.75L12 14.25L7.5 9.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="qippo-select__check" viewBox="0 0 16 16" width={16} height={16} fill="none" aria-hidden>
      <path d="M3.5 8.25L6.5 11.25L12.5 4.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Qippo Select reference — reconstructed from Figma Ui Kit component set
 * `qippo app / Ui Kit / Other-Component / Select` (node 7347:24406).
 *
 * Closed/open menu (not a searchable combobox). Geometry from Figma;
 * paint from Qipper tokens so Comparison Lab can isolate structure.
 *
 * This is NOT the Rahino canonical Select. Do not use in production apps yet.
 */
export function QippoSelect({
  options = [],
  value,
  onChange,
  placeholder = 'انتخاب کنید',
  label,
  error,
  disabled,
  size = 'md',
  className,
}: QippoSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const selected = options.find((opt) => opt.value === value);
  const hasError = Boolean(error);

  useEffect(() => {
    const handlePointer = (event: MouseEvent) => {
      if (containerRef.current && event.target instanceof Node && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <span className={cn('qippo inline-flex w-full min-w-0', className)}>
      <div ref={containerRef} className="qippo-select">
        {label ? (
          <label htmlFor={id} className="qippo-select__label">
            {label}
          </label>
        ) : null}
        <button
          id={id}
          type="button"
          className="qippo-select__trigger"
          data-size={size}
          data-open={isOpen ? 'true' : undefined}
          data-error={hasError ? 'true' : undefined}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-invalid={hasError || undefined}
          aria-haspopup="listbox"
          onClick={() => !disabled && setIsOpen((open) => !open)}
        >
          <span className={cn('qippo-select__value', !selected && 'qippo-select__value--placeholder')}>
            {selected?.label ?? placeholder}
          </span>
          <ChevronIcon />
        </button>
        <ul
          className={cn('qippo-select__menu', isOpen && 'qippo-select__menu--open')}
          role="listbox"
          aria-hidden={!isOpen}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className="qippo-select__option"
                  data-selected={isSelected ? 'true' : undefined}
                  onClick={() => {
                    onChange?.(opt.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected ? <CheckIcon /> : null}
                </button>
              </li>
            );
          })}
        </ul>
        {hasError ? <p className="qippo-select__error">{error}</p> : null}
      </div>
    </span>
  );
}
