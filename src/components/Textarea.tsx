/**
 * Textarea — Category-aligned multiline control (matches Input tokens).
 */

import { clsx } from 'clsx';
import { forwardRef, type ReactNode, type TextareaHTMLAttributes, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import FormField from '@/components/FormField';
import { FIELD } from '@/tokens/fieldTokens';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label?: ReactNode;
  error?: ReactNode;
  className?: string;
  textareaClassName?: string;
  required?: boolean;
  dense?: boolean;
  id?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      className,
      textareaClassName,
      required,
      dense = false,
      rows = 4,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp || autoId;

    return (
      <FormField
        label={label}
        required={required}
        error={error}
        htmlFor={id}
        className={className}
        dense={dense}
      >
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={twMerge(
            clsx(
              FIELD.controlClass,
              'min-h-[5.5rem] py-3 resize-none',
              error ? FIELD.controlError : FIELD.controlOk,
              textareaClassName
            )
          )}
          {...props}
        />
      </FormField>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
