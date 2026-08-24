/**
 * Select — Category dropdown benchmark (Define New Part).
 */

import { clsx } from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { type ChangeEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import FormField from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options?: SelectOption[];
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

export default function Select({
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
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const selectedOption = options.find((opt) => opt.value === value);
  const unlabeled = label == null && !required;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions =
    searchable && searchQuery
      ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

  /** Legacy call sites passed visual classes via `className` on unlabeled selects. */
  const triggerExtraClass = controlClassName ?? (unlabeled ? className : undefined);
  const fieldClassName = unlabeled ? undefined : className;

  return (
    <FormField
      label={label}
      required={required}
      error={error}
      htmlFor={id}
      className={fieldClassName}
      dense={unlabeled && !error}
    >
      <div ref={containerRef} className="relative w-full h-11">
        <input
          id={id}
          type={searchable ? 'text' : 'button'}
          disabled={disabled}
          value={isOpen && searchable ? searchQuery : selectedOption?.label || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (searchable) {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          readOnly={!searchable}
          className={twMerge(
            clsx(
              FIELD.controlClass,
              'pl-11 cursor-pointer',
              error ? FIELD.controlError : FIELD.controlOk,
              isOpen && !error && FIELD.controlOpen,
              disabled && 'opacity-50 cursor-not-allowed'
            ),
            triggerExtraClass
          )}
        />

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
    </FormField>
  );
}
