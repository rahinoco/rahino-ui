/**
 * Appearance controls — theme + brand + product visual slot.
 * Product switch does not duplicate components; it only changes tokens.
 */

import { clsx } from 'clsx';
import { Monitor, Moon, Sun } from 'lucide-react';

import { type UiBrand, type UiProduct, type UiThemeMode, useTheme } from '@/theme';

const THEMES: { id: UiThemeMode; label: string; icon: typeof Sun }[] = [
  { id: 'system', label: 'سیستم', icon: Monitor },
  { id: 'light', label: 'روشن', icon: Sun },
  { id: 'dark', label: 'تیره', icon: Moon },
];

const BRANDS: { id: UiBrand; label: string; swatch: string }[] = [
  { id: 'blue', label: 'آبی', swatch: '#4179F0' },
  { id: 'purple', label: 'بنفش', swatch: '#5E3FCA' },
];

const PRODUCTS: { id: UiProduct; label: string; hint: string }[] = [
  { id: 'rahino', label: 'راهینو', hint: 'نامزد فعلی = استخراج کیپر' },
  { id: 'qipper', label: 'کیپر', hint: 'توکن‌های استخراج‌شده' },
  { id: 'qippo', label: 'کیپو', hint: 'منتظر فیگما' },
  { id: 'digix', label: 'دیجیکس', hint: 'فاز بعدی' },
];

export default function AppearanceControls({ className }: { className?: string }) {
  const { themeMode, brand, product, setThemeMode, setBrand, setProduct } = useTheme();

  return (
    <div className={clsx('flex flex-col gap-6', className)}>
      <fieldset className="space-y-3">
        <legend className="text-xs font-bold text-fg-muted">حالت نمایش</legend>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(({ id, label, icon: Icon }) => {
            const active = themeMode === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setThemeMode(id)}
                className={clsx(
                  'flex h-11 items-center justify-center gap-2 rounded-2xl text-sm font-bold transition-all',
                  active
                    ? 'bg-primary-500 text-white shadow-glow'
                    : 'bg-bg-muted text-fg-muted hover:bg-bg-elevated hover:text-fg'
                )}
              >
                <Icon size={16} strokeWidth={2.25} />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-bold text-fg-muted">رنگ برند</legend>
        <div className="grid grid-cols-2 gap-2">
          {BRANDS.map(({ id, label, swatch }) => {
            const active = brand === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setBrand(id)}
                className={clsx(
                  'flex h-11 items-center justify-center gap-2.5 rounded-2xl text-sm font-bold transition-all ring-2',
                  active
                    ? 'bg-bg-surface text-fg ring-primary-500'
                    : 'bg-bg-muted text-fg-muted ring-transparent hover:text-fg'
                )}
              >
                <span
                  className="h-4 w-4 rounded-full shadow-sm ring-2 ring-white/80"
                  style={{ backgroundColor: swatch }}
                  aria-hidden
                />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-bold text-fg-muted">پوسته محصول</legend>
        <div className="grid grid-cols-2 gap-2">
          {PRODUCTS.map(({ id, label, hint }) => {
            const active = product === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setProduct(id)}
                className={clsx(
                  'flex flex-col items-start justify-center gap-0.5 rounded-2xl px-3 py-2 text-start transition-all ring-2',
                  active
                    ? 'bg-bg-surface text-fg ring-primary-500'
                    : 'bg-bg-muted text-fg-muted ring-transparent hover:text-fg'
                )}
              >
                <span className="text-sm font-bold">{label}</span>
                <span className="text-[10px] font-medium text-fg-subtle">{hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
