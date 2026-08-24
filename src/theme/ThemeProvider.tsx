import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  applyDocumentTheme,
  persistAppearance,
  readPersistedAppearance,
  resolveTheme,
  type UiBrand,
  type UiProduct,
  type UiTheme,
  type UiThemeMode,
} from '@/theme/helpers';

export interface ThemeContextValue {
  themeMode: UiThemeMode;
  brand: UiBrand;
  product: UiProduct;
  resolvedTheme: UiTheme;
  setThemeMode: (mode: UiThemeMode) => void;
  setBrand: (brand: UiBrand) => void;
  setProduct: (product: UiProduct) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children?: ReactNode;
  defaultMode?: UiThemeMode;
  defaultBrand?: UiBrand;
  defaultProduct?: UiProduct;
  persist?: boolean;
}

export function ThemeProvider({
  children,
  defaultMode = 'system',
  defaultBrand = 'blue',
  defaultProduct = 'rahino',
  persist = true,
}: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<UiThemeMode>(defaultMode);
  const [brand, setBrandState] = useState<UiBrand>(defaultBrand);
  const [product, setProductState] = useState<UiProduct>(defaultProduct);

  useEffect(() => {
    if (!persist) {
      applyDocumentTheme(resolveTheme(themeMode), brand, product);
      return;
    }
    const stored = readPersistedAppearance();
    setThemeModeState(stored.themeMode);
    setBrandState(stored.brand);
    setProductState(stored.product);
    applyDocumentTheme(resolveTheme(stored.themeMode), stored.brand, stored.product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyDocumentTheme(resolveTheme(themeMode), brand, product);
    if (persist) persistAppearance(themeMode, brand, product);
  }, [themeMode, brand, product, persist]);

  useEffect(() => {
    if (themeMode !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyDocumentTheme(resolveTheme('system'), brand, product);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [themeMode, brand, product]);

  const setThemeMode = useCallback((mode: UiThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const setBrand = useCallback((next: UiBrand) => {
    setBrandState(next);
  }, []);

  const setProduct = useCallback((next: UiProduct) => {
    setProductState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => (resolveTheme(prev) === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      brand,
      product,
      resolvedTheme: resolveTheme(themeMode),
      setThemeMode,
      setBrand,
      setProduct,
      toggleTheme,
    }),
    [themeMode, brand, product, setThemeMode, setBrand, setProduct, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}

export function useOptionalTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

export type { UiBrand, UiProduct, UiTheme, UiThemeMode };
