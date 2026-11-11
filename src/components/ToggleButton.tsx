import { Check } from 'lucide-react';
import { forwardRef, useId, type ReactNode, type Ref } from 'react';

import {
  assignRef,
  buttonData,
  ButtonFace,
  classNameOf,
  useButtonPressFeedback,
  usePressed,
  useStableWidth,
  type ButtonOwnProps,
  type NativeButtonProps,
} from './buttonShared';

export interface ToggleButtonProps extends NativeButtonProps, ButtonOwnProps {
  children?: ReactNode;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton(
  {
    appearance = 'soft',
    intent = 'neutral',
    size = 'md',
    radius = 'less',
    iconStart,
    iconEnd,
    mirrorStart,
    mirrorEnd,
    loading = false,
    loadingLabel,
    fullWidth,
    pressed,
    defaultPressed = false,
    onPressedChange,
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
  const [value, setValue] = usePressed(pressed, defaultPressed, onPressedChange);
  const blocked = Boolean(disabled || loading);
  const pressFeedback = useButtonPressFeedback(blocked, props);
  const { ref: widthRef, style: widthStyle } = useStableWidth<HTMLButtonElement>(loading);
  return (
    <button
      {...props}
      {...buttonData({ appearance, intent, size, radius, fullWidth, loading, pressed: value, iconOnly: !children })}
      {...pressFeedback}
      data-selection-mark={children && !iconStart && !iconEnd ? 'true' : undefined}
      className={classNameOf(className)}
      style={{ ...widthStyle, ...style }}
      type={type}
      disabled={disabled}
      aria-labelledby={children ? labelId : undefined}
      aria-pressed={value}
      aria-busy={loading || undefined}
      aria-disabled={blocked || undefined}
      onClick={(event) => {
        if (blocked) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        setValue(!value);
        onClick?.(event);
      }}
      ref={(node) => {
        assignRef(widthRef, node);
        assignRef(ref as Ref<HTMLButtonElement>, node);
      }}
    >
      <ButtonFace
        iconStart={iconStart}
        iconEnd={iconEnd}
        mirrorStart={mirrorStart}
        mirrorEnd={mirrorEnd}
        loading={loading}
        loadingLabel={loadingLabel}
        labelId={labelId}
        animateMark={Boolean(children) && !iconStart && !iconEnd}
        markVisible={value}
        mark={<Check />}
      >
        {children}
      </ButtonFace>
    </button>
  );
});

export default ToggleButton;
