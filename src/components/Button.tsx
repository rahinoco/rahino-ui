import { forwardRef, useId, type AnchorHTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode, type Ref } from 'react';

import {
  assignRef,
  buttonData,
  ButtonFace,
  classNameOf,
  guardActivation,
  useStableWidth,
  type ButtonOwnProps,
  type NativeButtonProps,
} from './buttonShared';

export type { ButtonAppearance, ButtonIntent, ButtonSize } from './buttonShared';

export interface ButtonProps extends NativeButtonProps, ButtonOwnProps {
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  {
    appearance = 'soft',
    intent = 'neutral',
    size = 'md',
    iconStart,
    iconEnd,
    mirrorStart,
    mirrorEnd,
    loading = false,
    loadingLabel,
    fullWidth,
    href,
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
  const labelId = useId();
  const blocked = Boolean(disabled || loading);
  const { ref: widthRef, style: widthStyle } = useStableWidth<HTMLButtonElement | HTMLAnchorElement>(loading);
  const face = (
    <ButtonFace
      iconStart={iconStart}
      iconEnd={iconEnd}
      mirrorStart={mirrorStart}
      mirrorEnd={mirrorEnd}
      loading={loading}
      loadingLabel={loadingLabel}
      labelId={labelId}
    >
      {children}
    </ButtonFace>
  );
  const shared = {
    ...buttonData({ appearance, intent, size, fullWidth, loading }),
    className: classNameOf(className),
    style: { ...widthStyle, ...style },
    'aria-busy': loading || undefined,
    'aria-disabled': blocked || undefined,
    'aria-labelledby': children ? labelId : undefined,
  };
  function blockKeys(event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>) {
    if (blocked && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...anchorProps}
        {...shared}
        href={blocked ? undefined : href}
        onClick={(event) => guardActivation(event, blocked, onClick as ((event: MouseEvent<HTMLAnchorElement>) => void) | undefined)}
        onKeyDown={(event) => {
          blockKeys(event);
          props.onKeyDown?.(event as unknown as KeyboardEvent<HTMLButtonElement>);
        }}
        ref={(node) => {
          assignRef(widthRef, node);
          assignRef(ref as Ref<HTMLAnchorElement>, node);
        }}
      >
        {face}
      </a>
    );
  }

  return (
    <button
      {...props}
      {...shared}
      type={type}
      disabled={disabled}
      onClick={(event) => guardActivation(event, blocked, onClick)}
      onKeyDown={(event) => {
        blockKeys(event);
        props.onKeyDown?.(event);
      }}
      ref={(node) => {
        assignRef(widthRef, node);
        assignRef(ref as Ref<HTMLButtonElement>, node);
      }}
    >
      {face}
    </button>
  );
});

export default Button;
