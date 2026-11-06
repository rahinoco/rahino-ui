import { clsx } from 'clsx';
import { ChevronDown, LoaderCircle } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import Checkbox from './Checkbox';

export interface SelectOption {
  /** Unique and nonempty. The first occurrence wins for duplicates. */
  value: string;
  label: string;
  disabled?: boolean;
}
interface SelectBaseProps {
  options?: readonly SelectOption[];
  placeholder?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  className?: string;
  controlClassName?: string;
  searchable?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  controlSize?: 'sm' | 'md' | 'lg';
  dir?: 'rtl' | 'ltr';
  textScript?: 'fa' | 'latin';
  id?: string;
  name?: string;
  form?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
export type SelectProps = SelectBaseProps & ({
  multiple?: false;
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string) => void;
} | {
  multiple: true;
  value?: readonly string[];
  defaultValue?: readonly string[];
  onChange?: (value: string[]) => void;
});

const normalize = (text: string) => text.normalize('NFKC').replace(/ي/g, 'ی').replace(/ك/g, 'ک').toLocaleLowerCase().trim();

/** Review candidate. State approval is separate from implementation and checks. */
export default function Select(props: SelectProps) {
  const { options: suppliedOptions = [], label, helperText, error, className, controlClassName,
    placeholder = 'انتخاب کنید', searchable = true, disabled = false, readOnly = false, loading = false,
    loadingText = 'در حال دریافت گزینه‌ها…', emptyText = 'گزینه‌ای پیدا نشد', required, controlSize = 'md',
    dir, textScript, name, form, 'aria-label': ariaLabel, 'aria-describedby': describedBy } = props;
  const autoId = useId();
  const id = props.id ?? autoId;
  const multiple = props.multiple === true;
  const [localValue, setLocalValue] = useState<string | readonly string[]>(props.defaultValue ?? (multiple ? [] : ''));
  const currentValue = props.value !== undefined ? props.value : localValue;
  const valueList = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];
  const values = new Set(multiple ? valueList : valueList.slice(0, 1));
  const [, refreshForm] = useState(0);
  const seen = new Set<string>();
  const options = suppliedOptions.filter(option => {
    if (!option.value || seen.has(option.value)) return false;
    seen.add(option.value); return true;
  });
  const selected = options.filter(option => values.has(option.value));
  const summary = selected.map(option => option.label).join('، ');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const native = useRef<HTMLSelectElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const typeAhead = useRef({ value: '', time: 0 });
  const composing = useRef(false);
  const blocked = disabled || readOnly;
  const expanded = open && !blocked;
  const filtered = loading ? [] : options.filter(option => !searchable || !query || normalize(option.label).includes(normalize(query)));
  const enabled = filtered.filter(option => !option.disabled);
  const active = enabled.find(option => option.value === activeValue) ?? enabled.find(option => values.has(option.value)) ?? enabled[0];
  const optionId = (value: string) => `${id}-option-${options.findIndex(option => option.value === value)}`;
  const hasError = error != null && error !== false && error !== '';
  const hasHint = !hasError && helperText != null && helperText !== false && helperText !== '';
  const description = [describedBy, hasError && `${id}-error`, hasHint && `${id}-hint`].filter(Boolean).join(' ') || undefined;
  const close = () => { setOpen(false); setQuery(''); setActiveValue(null); setKeyboardNavigation(false); typeAhead.current.value = ''; };
  const show = (last = false) => {
    if (blocked) return;
    setQuery(''); setOpen(true); setKeyboardNavigation(false);
    const available = loading ? [] : options.filter(option => !option.disabled);
    setActiveValue((last ? available.at(-1) : available.find(option => values.has(option.value)) ?? available[0])?.value ?? null);
  };
  const choose = (option: SelectOption) => {
    if (blocked || loading || option.disabled) return;
    if (props.multiple) {
      const next = options.filter(item => item.value === option.value ? !values.has(item.value) : values.has(item.value)).map(item => item.value);
      if (props.value === undefined) setLocalValue(next);
      props.onChange?.(next);
    } else {
      if (props.value === undefined) setLocalValue(option.value);
      props.onChange?.(option.value);
      close();
    }
    input.current?.focus({ preventScroll: true });
  };

  useEffect(() => { if (blocked) close(); }, [blocked]);
  useEffect(() => {
    const ownerForm = native.current?.form;
    if (!ownerForm) return;
    const reset = (event: Event) => {
      queueMicrotask(() => {
        if (event.defaultPrevented) return;
        if (props.value === undefined) setLocalValue(props.defaultValue ?? (multiple ? [] : ''));
        // Reapply the native value even when resetting to already-current React state.
        refreshForm(version => version + 1);
        close();
      });
    };
    ownerForm.addEventListener('reset', reset);
    return () => ownerForm.removeEventListener('reset', reset);
  }, [form, props.value, props.defaultValue, multiple]);
  useEffect(() => {
    if (!expanded) return;
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) close();
    };
    document.addEventListener('pointerdown', outside, true);
    return () => document.removeEventListener('pointerdown', outside, true);
  }, [expanded]);

  useLayoutEffect(() => {
    const popup = menu.current, trigger = input.current;
    if (!expanded || !popup || !trigger) return;
    // Top layer escapes clipping while preserving inherited theme and modal DOM order.
    popup.showPopover();
    const position = () => {
      const field = trigger.getBoundingClientRect();
      const css = getComputedStyle(popup);
      const gap = parseFloat(css.getPropertyValue('--rds-select-menu-gap')) || 8;
      const gutter = parseFloat(css.getPropertyValue('--rds-select-viewport-gutter')) || 8;
      const cap = parseFloat(css.getPropertyValue('--rds-select-menu-max-height')) || 280;
      const view = window.visualViewport;
      const leftEdge = (view?.offsetLeft ?? 0) + gutter;
      const topEdge = (view?.offsetTop ?? 0) + gutter;
      const rightEdge = (view?.offsetLeft ?? 0) + (view?.width ?? innerWidth) - gutter;
      const bottomEdge = (view?.offsetTop ?? 0) + (view?.height ?? innerHeight) - gutter;
      const below = Math.max(0, bottomEdge - field.bottom - gap);
      const above = Math.max(0, field.top - gap - topEdge);
      const upwards = below < Math.min(cap, popup.scrollHeight) && above > below;
      const height = Math.min(cap, upwards ? above : below);
      const width = Math.min(field.width, rightEdge - leftEdge);
      popup.style.width = `${width}px`;
      popup.style.maxHeight = `${height}px`;
      popup.style.left = `${Math.max(leftEdge, Math.min(field.left, rightEdge - width))}px`;
      popup.style.top = `${upwards ? field.top - gap - Math.min(popup.scrollHeight, height) : field.bottom + gap}px`;
      popup.dataset.placement = upwards ? 'top' : 'bottom';
    };
    position();
    const scroll = (event: Event) => { if (!(event.target instanceof Node) || !popup.contains(event.target)) position(); };
    const observer = new ResizeObserver(position);
    observer.observe(trigger); observer.observe(popup);
    window.addEventListener('resize', position);
    document.addEventListener('scroll', scroll, true);
    window.visualViewport?.addEventListener('resize', position);
    window.visualViewport?.addEventListener('scroll', position);
    return () => {
      observer.disconnect(); window.removeEventListener('resize', position);
      document.removeEventListener('scroll', scroll, true);
      window.visualViewport?.removeEventListener('resize', position);
      window.visualViewport?.removeEventListener('scroll', position);
      popup.hidePopover();
    };
  }, [expanded]);
  useLayoutEffect(() => {
    if (expanded && active) document.getElementById(optionId(active.value))?.scrollIntoView({ block: 'nearest' });
  }, [expanded, active?.value, query]);

  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (blocked || event.nativeEvent.isComposing || composing.current || event.keyCode === 229) return;
    const key = event.key;
    if (key === 'Tab') { close(); return; }
    if (key === 'Escape' && expanded) { event.preventDefault(); event.stopPropagation(); close(); return; }
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      event.preventDefault();
      if (event.altKey && key === 'ArrowUp') { close(); return; }
      if (!expanded) { show(key === 'ArrowUp'); setKeyboardNavigation(true); return; }
      setKeyboardNavigation(true);
      const index = enabled.findIndex(option => option.value === active?.value);
      setActiveValue(enabled[Math.max(0, Math.min(enabled.length - 1, index + (key === 'ArrowDown' ? 1 : -1)))]?.value ?? null);
    } else if (expanded && (key === 'Home' || key === 'End') && (!searchable || event.ctrlKey)) {
      event.preventDefault(); setKeyboardNavigation(true); setActiveValue((key === 'Home' ? enabled[0] : enabled.at(-1))?.value ?? null);
    } else if (key === 'Enter' || (key === ' ' && !searchable)) {
      event.preventDefault();
      if (event.repeat) return;
      if (!expanded) { show(); setKeyboardNavigation(true); } else if (active) choose(active);
    } else if (!searchable && key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const previous = now - typeAhead.current.time < 700 ? typeAhead.current.value : '';
      const text = previous === key ? key : previous + key;
      typeAhead.current = { value: text, time: now };
      if (!expanded) show();
      setKeyboardNavigation(true);
      const available = loading ? [] : options.filter(option => !option.disabled);
      const start = available.findIndex(option => option.value === active?.value);
      const rotated = [...available.slice(start + 1), ...available.slice(0, start + 1)];
      setActiveValue((text.length > 1 ? available : rotated).find(option => normalize(option.label).startsWith(normalize(text)))?.value ?? active?.value ?? null);
    }
  };

  return <div ref={root} className={clsx('rds-select', className)} dir={dir} data-control-size={controlSize} data-text-script={textScript}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close(); }}>
    {label != null ? <label className="rds-select__label" id={`${id}-label`} htmlFor={id}>{label}{required ? <span aria-hidden="true">*</span> : null}</label> : null}
    <div className="rds-select__field" data-open={expanded || undefined} data-invalid={hasError || undefined} data-disabled={disabled || undefined} data-readonly={readOnly || undefined}>
      <input ref={input} id={id} type="text" role="combobox" autoComplete="off" spellCheck={false}
        className={clsx('rds-select__control', controlClassName)} disabled={disabled} readOnly={!searchable || readOnly}
        aria-label={ariaLabel ?? (label == null ? placeholder : undefined)} aria-labelledby={!ariaLabel && label != null ? `${id}-label` : undefined}
        aria-expanded={expanded} aria-controls={expanded ? `${id}-list` : undefined} aria-haspopup="listbox"
        aria-autocomplete={searchable && !readOnly ? 'list' : 'none'} aria-activedescendant={expanded && active ? optionId(active.value) : undefined}
        aria-required={required || undefined} aria-readonly={readOnly || undefined} aria-invalid={hasError || undefined} aria-describedby={description} aria-busy={loading || undefined}
        value={expanded && searchable ? query : summary} placeholder={expanded && searchable ? summary || placeholder : placeholder}
        title={summary || undefined} onKeyDown={keyDown} onClick={() => { if (!expanded) show(); else if (!searchable) close(); }}
        onCompositionStart={() => { composing.current = true; }} onCompositionEnd={() => { composing.current = false; }}
        onChange={event => { if (!blocked && searchable) { setQuery(event.target.value); setActiveValue(null); setOpen(true); } }} />
      <span className="rds-select__icon" aria-hidden="true">{loading ? <LoaderCircle /> : <ChevronDown />}</span>
    </div>
    {hasHint ? <p className="rds-select__hint" id={`${id}-hint`}>{helperText}</p> : null}
    {hasError ? <p className="rds-select__error" id={`${id}-error`} role="alert"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v8M12 19h.01" /></svg>{error}</p> : null}
    <div ref={menu} popover="manual" className="rds-select__menu" data-control-size={controlSize}
      onMouseDown={event => event.preventDefault()}>
      <div id={`${id}-list`} role="listbox" aria-multiselectable={multiple || undefined}
        aria-labelledby={!ariaLabel && label != null ? `${id}-label` : undefined}
        aria-label={ariaLabel ?? (label == null ? placeholder : undefined)} aria-busy={loading || undefined}>
        {filtered.map(option => {
          const isActive = active?.value === option.value;
          return <div key={option.value} role="presentation" data-active={isActive && keyboardNavigation || undefined}
            onPointerMove={event => { if (event.pointerType === 'mouse') { setKeyboardNavigation(false); if (!option.disabled) setActiveValue(option.value); } }}>
            {multiple ? <Checkbox id={optionId(option.value)} role="option" tabIndex={-1} checked={values.has(option.value)} disabled={option.disabled || blocked}
              label={option.label} className="rds-select__option" onChange={() => choose(option)} /> :
              <button type="button" role="option" tabIndex={-1} id={optionId(option.value)} aria-selected={values.has(option.value)}
                disabled={option.disabled || blocked} aria-disabled={option.disabled || undefined} className="rds-select__option" onClick={() => choose(option)}>{option.label}</button>}
          </div>;
        })}
      </div>
      {!filtered.length ? <p className="rds-select__message" role="status">{loading ? loadingText : emptyText}</p> : null}
    </div>
    <select ref={native} className="rds-select__native" aria-hidden="true" tabIndex={-1} name={name} form={form} multiple={multiple}
      required={required && !readOnly} disabled={disabled} value={multiple ? selected.map(option => option.value) : selected[0]?.value ?? ''}
      onChange={() => {}} onInvalid={event => { event.preventDefault(); input.current?.focus(); }}>
      {!multiple ? <option value="" /> : null}
      {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  </div>;
}
