/**
 * Field geometry — borderless soft fill · h-11 · rounded-2xl · glow focus.
 * Copied from Qipper `src/shared/ui/fieldTokens.ts`. CSS vars stay `--qipper-*`.
 */
export const FIELD = {
  label:
    'flex items-center gap-1 h-[18px] mb-2 text-[11px] font-semibold text-fg-muted tracking-wide',
  control: 'h-11',
  controlClass:
    'rds-fa rds-weight-structure w-full h-11 px-4 rounded-2xl border-0 text-sm outline-none transition-all duration-200 shadow-none ring-0',
  controlOk:
    'bg-bg-muted text-fg placeholder:text-fg-subtle ' +
    'hover:bg-bg-muted ' +
    'focus:bg-bg-surface focus:shadow-[0_8px_28px_color-mix(in_srgb,var(--qipper-fg)_7%,transparent),0_0_0_3px_color-mix(in_srgb,var(--qipper-brand-500)_14%,transparent)]',
  controlError:
    'bg-error-50/90 text-error-900 placeholder:text-error-400/80 ' +
    'focus:bg-bg-surface focus:shadow-[0_8px_28px_rgba(239,68,68,0.08),0_0_0_3px_rgba(239,68,68,0.14)]',
  controlOpen:
    'bg-bg-surface shadow-[0_8px_28px_color-mix(in_srgb,var(--qipper-fg)_7%,transparent),0_0_0_3px_color-mix(in_srgb,var(--qipper-brand-500)_14%,transparent)]',
  errorSlot: 'min-h-[18px] mt-1.5',
  errorText: 'text-[10px] font-semibold text-error-500 leading-[18px]',
  popover:
    'bg-bg-elevated/95 backdrop-blur-xl rounded-2xl border-0 shadow-heavy ring-1 ring-border',
};
