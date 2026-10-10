import { forwardRef, type ReactNode, type Ref } from 'react';

import {
  assignRef,
  buttonData,
  classNameOf,
  guardActivation,
  Spinner,
  useStableWidth,
  type ButtonOwnProps,
  type NativeButtonProps,
} from './buttonShared';

export interface IconButtonProps extends Omit<NativeButtonProps, 'children' | 'aria-label'>, Omit<ButtonOwnProps, 'iconStart' | 'iconEnd' | 'href'> {
  'aria-label': string;
  children: ReactNode;
  mirror?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    appearance = 'soft',
    intent = 'neutral',
    size = 'md',
    loading = false,
    loadingLabel = 'در حال انجام',
    fullWidth,
    mirror,
    children,
    className,
    disabled,
    type = 'button',
    onClick,
    style,
    ...props
  },
  ref,
) {
  const blocked = Boolean(disabled || loading);
  const { ref: widthRef, style: widthStyle } = useStableWidth<HTMLButtonElement>(loading);
  return (
    <button
      {...props}
      {...buttonData({ appearance, intent, size, fullWidth, loading, iconOnly: true })}
      className={classNameOf(className)}
      style={{ ...widthStyle, ...style }}
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={blocked || undefined}
      onClick={(event) => guardActivation(event, blocked, onClick)}
      onKeyDown={(event) => {
        if (blocked && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        props.onKeyDown?.(event);
      }}
      ref={(node) => {
        assignRef(widthRef, node);
        assignRef(ref as Ref<HTMLButtonElement>, node);
      }}
    >
      <span className="rds-button__icon" data-mirror={mirror ? 'true' : undefined} aria-hidden="true">
        {loading ? <Spinner /> : children}
      </span>
      <span className="rds-button__status" role="status">
        {loading ? loadingLabel : ''}
      </span>
    </button>
  );
});

export default IconButton;
