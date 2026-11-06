import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ElementType, type KeyboardEvent } from 'react';

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: ElementType;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Visible group label. Supply aria-label when the surrounding context supplies the visible label. */
  label?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  tone?: 'neutral' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  /** Use manual activation when a view/filter update involves a network request. */
  keyboardActivation?: 'automatic' | 'manual';
  dir?: 'rtl' | 'ltr';
  textScript?: 'fa' | 'latin';
  id?: string;
  className?: string;
}

/** Review candidate for local views and mutually exclusive filters. Not a form field or tabs. */
export function SegmentedControl({
  label, 'aria-label': ariaLabel, 'aria-describedby': describedBy, options,
  value, defaultValue, onChange, tone = 'neutral', size = 'md', fullWidth = false,
  disabled = false, keyboardActivation = 'automatic', dir, textScript, id, className,
}: SegmentedControlProps) {
  const generatedId = useId();
  const labelId = `${id ?? generatedId}-label`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const requested = value ?? internalValue;
  // A removed/invalid value falls back visually; no change callback runs during rendering.
  const selected = options.find(option => option.value === requested)
    ?? options.find(option => !option.disabled) ?? options[0];
  const [focusedValue, setFocusedValue] = useState<string>();
  const enabled = options.filter(option => !disabled && !option.disabled);
  const tabValue = enabled.find(option => option.value === focusedValue)?.value
    ?? enabled.find(option => option.value === selected?.value)?.value ?? enabled[0]?.value;
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const [plate, setPlate] = useState<{ x: number; y: number; width: number; height: number }>();
  const [animate, setAnimate] = useState(false);
  const withIcons = options.length > 0 && options.every(option => option.icon);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !selected) { setPlate(undefined); return; }
    const measure = () => {
      const button = buttons.current.get(selected.value);
      if (!button) return;
      const next = { x: button.offsetLeft, y: button.offsetTop, width: button.offsetWidth, height: button.offsetHeight };
      setPlate(previous => previous && Object.keys(next).every(key => previous[key as keyof typeof next] === next[key as keyof typeof next]) ? previous : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    for (const button of buttons.current.values()) observer.observe(button);
    return () => observer.disconnect();
  }, [selected?.value, options, size, fullWidth, dir, textScript]);

  useLayoutEffect(() => {
    if (!plate) return;
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [Boolean(plate)]);

  const revealOption = (value: string, behavior: ScrollBehavior = 'instant') => {
    const viewport = viewportRef.current;
    const button = buttons.current.get(value);
    if (!viewport || !button || viewport.scrollWidth <= viewport.clientWidth) return;

    const bounds = viewport.getBoundingClientRect();
    const item = button.getBoundingClientRect();
    const style = getComputedStyle(viewport);
    const leftPadding = parseFloat(style.scrollPaddingLeft) || 0;
    const rightPadding = parseFloat(style.scrollPaddingRight) || 0;
    const fitsWithPadding = item.width <= bounds.width - leftPadding - rightPadding;
    const left = item.left - bounds.left - (fitsWithPadding ? leftPadding : 0);
    const right = item.right - bounds.right + (fitsWithPadding ? rightPadding : 0);
    // Clamp to the nearest position that fits the item, or shows as much as possible if it is wider than the viewport.
    const offset = Math.min(Math.max(0, Math.min(left, right)), Math.max(left, right));
    // A new selection can interrupt a reveal already in progress.
    viewport.scrollTo({ left: viewport.scrollLeft + offset, behavior: offset ? behavior : 'instant' });
  };

  const select = (next: string, behavior?: ScrollBehavior) => {
    if (disabled || !enabled.some(option => option.value === next)) return;
    revealOption(next, behavior);
    if (next === selected?.value) return;
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, current: string) => {
    if (event.altKey || event.ctrlKey || event.metaKey || enabled.length === 0) return;
    const rtl = getComputedStyle(trackRef.current!).direction === 'rtl';
    const index = enabled.findIndex(option => option.value === current);
    let next: SegmentedControlOption | undefined;
    if (event.key === 'Home') next = enabled[0];
    else if (event.key === 'End') next = enabled[enabled.length - 1];
    else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const delta = (event.key === 'ArrowRight' ? 1 : -1) * (rtl ? -1 : 1);
      next = enabled[(index + delta + enabled.length) % enabled.length];
    }
    if (!next) return;
    event.preventDefault();
    setFocusedValue(next.value);
    const button = buttons.current.get(next.value);
    button?.focus({ preventScroll: true });
    if (keyboardActivation === 'automatic') select(next.value);
    else revealOption(next.value);
  };

  if (!options.length) return null;
  return <div className={['rds-segmented', className].filter(Boolean).join(' ')} id={id} dir={dir}
    data-rds-script={textScript} data-tone={tone} data-size={size} data-full-width={fullWidth || undefined} data-disabled={disabled || undefined}>
    {label && <span className="rds-segmented__label" id={labelId}>{label}</span>}
    <div className="rds-segmented__viewport" ref={viewportRef}>
      <div className="rds-segmented__track" ref={trackRef} role="group" aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : ariaLabel} aria-describedby={describedBy} aria-disabled={disabled || undefined}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedValue(undefined); }}>
        {plate && <span aria-hidden="true" className="rds-segmented__plate" data-animate={animate || undefined}
          data-disabled={disabled || selected?.disabled || undefined}
          style={{ transform: `translateX(${plate.x}px)`, top: plate.y, width: plate.width, height: plate.height } as CSSProperties} />}
        {options.map(option => {
          const Icon = option.icon;
          return <button key={option.value} ref={node => { if (node) buttons.current.set(option.value, node); else buttons.current.delete(option.value); }}
            type="button" className="rds-segmented__item" aria-pressed={selected?.value === option.value}
            disabled={disabled || option.disabled} tabIndex={tabValue === option.value ? 0 : -1}
            onFocus={() => setFocusedValue(option.value)} onKeyDown={event => onKeyDown(event, option.value)}
            onClick={event => {
              const animateScroll = event.detail > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              select(option.value, animateScroll ? 'smooth' : 'instant');
            }}>
            <span className="rds-segmented__content">{withIcons && Icon && <Icon aria-hidden="true" focusable="false" />}<span>{option.label}</span></span>
          </button>;
        })}
      </div>
    </div>
  </div>;
}
