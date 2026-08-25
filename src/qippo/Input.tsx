import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react';

import { cn } from '@/lib/cn';

export type QippoInputSize = 'sm' | 'md' | 'lg' | 'xl';

export interface QippoInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  size?: QippoInputSize;
  floatingLabel?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
}

/**
 * Qippo Text input — Figma Ui Kit / Other-Component / Text input (7130:57816).
 * Soft filled field + optional caption. Paint remapped to Qipper tokens for the lab.
 * NOT Rahino canonical.
 */
export const QippoInput = forwardRef<HTMLInputElement, QippoInputProps>(function QippoInput(
  {
    label,
    helperText,
    error,
    size = 'md',
    floatingLabel = false,
    leadingIcon,
    trailingIcon,
    className,
    disabled,
    id: idProp,
    placeholder,
    ...props
  },
  ref
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasError = Boolean(error);
  const caption = hasError ? error : helperText;

  return (
    <span className={cn('qippo inline-flex w-full min-w-0', className)}>
      <div className="qippo-input" data-size={size} data-floating={floatingLabel ? 'true' : undefined}>
        {label && !floatingLabel ? (
          <label htmlFor={id} className="qippo-input__label">
            {label}
          </label>
        ) : null}
        <div
          className="qippo-input__field"
          data-error={hasError ? 'true' : undefined}
          data-disabled={disabled ? 'true' : undefined}
        >
          {leadingIcon ? <span className="qippo-input__icon qippo-input__icon--leading">{leadingIcon}</span> : null}
          <div className="qippo-input__control-wrap">
            {floatingLabel && label ? (
              <label htmlFor={id} className="qippo-input__float">
                {label}
              </label>
            ) : null}
            <input
              id={id}
              ref={ref}
              className="qippo-input__control"
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={hasError || undefined}
              {...props}
            />
          </div>
          {trailingIcon ? <span className="qippo-input__icon qippo-input__icon--trailing">{trailingIcon}</span> : null}
        </div>
        {caption ? (
          <p className="qippo-input__hint" data-error={hasError ? 'true' : undefined}>
            {caption}
          </p>
        ) : null}
      </div>
    </span>
  );
});
