/**
 * Theme helpers — document class / brand / product attribute sync.
 * Phase 1 candidate extracted from Qipper `shared/lib/theme.ts`.
 *
 * Products share component behavior; visual treatment is token-driven via
 * `data-product`. Qippo and Digix tokens are placeholders until those phases.
 */

export type UiThemeMode = 'light' | 'dark' | 'system';
export type UiTheme = 'light' | 'dark';
export type UiBrand = 'blue' | 'purple';
/** Product visual theme. Behavior stays shared. */
export type UiProduct = 'rahino' | 'qipper' | 'qippo' | 'digix';

export const UI_STORAGE_KEY = 'rahino-ui-storage';
export const UI_PRODUCTS: UiProduct[] = ['rahino', 'qipper', 'qippo', 'digix'];

export function getSystemTheme(): UiTheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(mode: UiThemeMode): UiTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function applyDocumentTheme(
  theme: UiTheme,
  brand: UiBrand,
  product: UiProduct = 'rahino'
) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.brand = brand;
  root.dataset.product = product;
  root.style.colorScheme = theme;
}

export interface PersistedAppearance {
  themeMode: UiThemeMode;
  brand: UiBrand;
  product: UiProduct;
}

function normalizeProduct(value: string | undefined): UiProduct {
  if (value === 'qipper' || value === 'qippo' || value === 'digix' || value === 'rahino') {
    return value;
  }
  return 'rahino';
}

export function readPersistedAppearance(): PersistedAppearance {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEY);
    if (!raw) return { themeMode: 'system', brand: 'blue', product: 'rahino' };
    const parsed = JSON.parse(raw) as {
      themeMode?: string;
      brand?: string;
      product?: string;
    };
    const brand = parsed.brand === 'purple' ? 'purple' : 'blue';
    const modeRaw = parsed.themeMode;
    const themeMode: UiThemeMode =
      modeRaw === 'dark' || modeRaw === 'light' || modeRaw === 'system' ? modeRaw : 'system';
    return { themeMode, brand, product: normalizeProduct(parsed.product) };
  } catch {
    return { themeMode: 'system', brand: 'blue', product: 'rahino' };
  }
}

export function persistAppearance(
  themeMode: UiThemeMode,
  brand: UiBrand,
  product: UiProduct
) {
  try {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({ themeMode, brand, product }));
  } catch {
    /* ignore */
  }
}
