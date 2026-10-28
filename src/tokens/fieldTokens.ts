/**
 * Field recipe — soft fill, existing height, canonical radius and independent keyboard focus.
 * Qipper-origin sizing remains a component recipe; shared visual values follow the adopted master.
 */
export const FIELD = {
  label:
    'flex items-center gap-1 h-[18px] mb-2 text-[11px] font-semibold text-fg-muted tracking-wide',
  control: 'h-11',
  controlClass:
    'rds-fa rds-weight-structure rds-focus w-full h-11 px-4 rounded-[var(--rds-radius-8)] border-0 text-[length:var(--rds-type-input-touch-font-size)] outline-none transition-all duration-200 shadow-none ring-0',
  controlOk:
    'bg-bg-muted text-fg placeholder:text-fg-subtle ' +
    'hover:bg-bg-muted ' +
    'focus:bg-bg-surface focus:shadow-none',
  controlError:
    'bg-error-50/90 text-error-900 placeholder:text-error-400/80 ' +
    'focus:bg-bg-surface focus:shadow-none',
  controlOpen:
    'bg-bg-surface shadow-none',
  errorSlot: 'min-h-[18px] mt-1.5',
  errorText: 'text-[10px] font-semibold text-error-500 leading-[18px]',
  popover:
    'bg-[var(--rds-color-surface-raised)] rounded-[var(--rds-radius-16)] border-0 shadow-[var(--rds-shadow-md)] ring-1 ring-border',
};
