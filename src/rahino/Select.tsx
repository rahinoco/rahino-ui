/**
 * Rahino Select — Qipper dropdown with Material floating label.
 */

import { clsx } from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { type ChangeEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { FieldError } from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

export interface RahinoSelectOption {
  value: string;
  label: string;
}

export interface RahinoSelectProps {
  options?: RahinoSelectOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: ReactNode;
  error?: ReactNode;
  className?: string;
  /** Applied to the trigger control (toolbar filter chrome, etc.). */
  controlClassName?: string;
  searchable?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export default function RahinoSelect({
  options = [],
  value,
  onChange,
  placeholder = 'انتخاب کنید',
  label,
  error,
  className,
  controlClassName,
  searchable = true,
  required,
  disabled,
}: RahinoSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const selectedOption = options.find((opt) => opt.value === value);
  const showFloating = Boolean(label);
  const filled = Boolean(selectedOption);
  const floated = showFloating && (focused || isOpen || filled);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchQuery('');
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions =
    searchable && searchQuery
      ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

  const displayValue = isOpen && searchable ? searchQuery : selectedOption?.label || '';
  const triggerPlaceholder = showFloating
    ? focused || isOpen
      ? placeholder
      : ' '
    : placeholder;

  return (
    <div className={twMerge('w-full min-w-0 flex flex-col', className)}>
      <div ref={containerRef} className="relative w-full h-11">
        <div
          className="rahino-float h-11"
          data-floated={floated ? 'true' : undefined}
          data-has-icon="true"
          data-error={error ? 'true' : undefined}
        >
          <input
            id={id}
            type={searchable ? 'text' : 'button'}
            disabled={disabled}
            value={displayValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (searchable) {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }
            }}
            onFocus={() => {
              if (disabled) return;
              setFocused(true);
              setIsOpen(true);
            }}
            onBlur={() => {
              /* blur handled via outside click so menu can receive clicks */
            }}
            onClick={() => !disabled && setIsOpen(true)}
            placeholder={triggerPlaceholder}
            readOnly={!searchable}
            aria-invalid={error ? true : undefined}
            aria-required={required || undefined}
            aria-expanded={isOpen}
            className={twMerge(
              clsx(
                FIELD.controlClass,
                showFloating && 'rahino-float__control',
                'pl-11 cursor-pointer',
                error ? FIELD.controlError : FIELD.controlOk,
                isOpen && !error && FIELD.controlOpen,
                disabled && 'opacity-50 cursor-not-allowed',
                showFloating && 'placeholder:text-transparent'
              ),
              controlClassName
            )}
          />
          {showFloating ? (
            <label htmlFor={id} className="rahino-float__label">
              {label}
              {required ? <span className="text-primary-500"> *</span> : null}
            </label>
          ) : null}

          <div
            className={clsx(
              'absolute inset-y-0 left-0 w-11 flex items-center justify-center pointer-events-none transition-colors duration-200',
              isOpen ? 'text-primary-500' : 'text-slate-400/80'
            )}
          >
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              className={clsx('transition-transform duration-300', isOpen && 'rotate-180')}
            />
          </div>
        </div>

        <div
          className={clsx(
            'absolute left-0 right-0 top-[calc(100%+8px)] z-[60] origin-top transition-all duration-200',
            FIELD.popover,
            'overflow-hidden',
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 visible'
              : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
          )}
        >
          <ul className="max-h-56 overflow-y-auto p-1.5 custom-scrollbar">
            {filteredOptions?.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange?.(opt.value);
                        setIsOpen(false);
                        setSearchQuery('');
                        setFocused(false);
                      }}
                      className={clsx(
                        'w-full text-right flex items-center justify-between px-3 py-2.5 my-0.5 text-xs font-semibold rounded-xl transition-colors duration-150',
                        isSelected
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-slate-600 hover:bg-slate-50/90 hover:text-slate-900'
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <Check size={14} strokeWidth={3} className="text-primary-600 shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="px-3 py-4 text-xs font-semibold text-center text-slate-400">
                موردی یافت نشد
              </li>
            )}
          </ul>
        </div>
      </div>
      <FieldError>{error}</FieldError>
    </div>
  );
}
