import { clsx } from 'clsx';
import { LoaderCircle } from 'lucide-react';
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';

export type ButtonAppearance = 'solid' | 'soft' | 'ghost';
export type ButtonIntent = 'neutral' | 'brand' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonOwnProps = {
  appearance?: ButtonAppearance;
  intent?: ButtonIntent;
  size?: ButtonSize;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  mirrorStart?: boolean;
  mirrorEnd?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
  href?: string;
};

export function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
}

export function Spinner() {
  return <LoaderCircle className="rds-button__spinner" aria-hidden="true" />;
}

export function useStableWidth<T extends HTMLElement>(loading: boolean) {
  const ref = useRef<T>(null);
  const idle = useRef<number | undefined>(undefined);
  useLayoutEffect(() => {
    if (!loading && ref.current) idle.current = ref.current.offsetWidth;
  });
  const style = loading && idle.current ? { minWidth: idle.current } : undefined;
  useEffect(() => {
    const node = ref.current;
    if (!loading || !(node instanceof HTMLButtonElement) || !node.form) return;
    const form = node.form;
    const block = (event: Event) => {
      if ((event as SubmitEvent).submitter === node) event.preventDefault();
    };
    form.addEventListener('submit', block);
    return () => form.removeEventListener('submit', block);
  }, [loading]);
  return { ref, style };
}

export function buttonData(props: ButtonOwnProps & { iconOnly?: boolean; pressed?: boolean }) {
  return {
    'data-appearance': props.appearance ?? 'soft',
    'data-intent': props.intent ?? 'neutral',
    'data-size': props.size ?? 'md',
    'data-full-width': props.fullWidth ? 'true' : undefined,
    'data-icon-only': props.iconOnly ? 'true' : undefined,
    'data-pressed': props.pressed ? 'true' : undefined,
    'data-loading': props.loading ? 'true' : undefined,
  } as const;
}

export function guardActivation<T extends HTMLElement>(
  event: MouseEvent<T>,
  blocked: boolean,
  onClick?: (event: MouseEvent<T>) => void,
) {
  if (blocked) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  onClick?.(event);
}

export function ButtonFace({
  iconStart,
  iconEnd,
  mirrorStart,
  mirrorEnd,
  loading,
  loadingLabel = 'در حال انجام',
  labelId,
  reserveMark,
  mark,
  children,
}: ButtonOwnProps & { children?: ReactNode; labelId?: string; reserveMark?: boolean; mark?: ReactNode }) {
  const start = loading ? <Spinner /> : iconStart;
  return (
    <>
      {reserveMark ? (
        <span className="rds-button__mark" aria-hidden="true">
          {mark}
        </span>
      ) : null}
      {start ? (
        <span className="rds-button__icon" data-mirror={mirrorStart ? 'true' : undefined} aria-hidden="true">
          {start}
        </span>
      ) : null}
      {children ? (
        <span id={labelId} className="rds-button__label">
          {children}
        </span>
      ) : null}
      {iconEnd ? (
        <span className="rds-button__icon" data-mirror={mirrorEnd ? 'true' : undefined} aria-hidden="true">
          {iconEnd}
        </span>
      ) : null}
      <span className="rds-button__status" role="status">
        {loading ? loadingLabel : ''}
      </span>
    </>
  );
}

export function classNameOf(className?: string) {
  return clsx('rds-button', className);
}

export type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export function usePressed(pressed: boolean | undefined, defaultPressed = false, onPressedChange?: (next: boolean) => void) {
  const [uncontrolled, setUncontrolled] = useState(defaultPressed);
  const value = pressed ?? uncontrolled;
  function set(next: boolean) {
    if (pressed === undefined) setUncontrolled(next);
    onPressedChange?.(next);
  }
  return [value, set] as const;
}
