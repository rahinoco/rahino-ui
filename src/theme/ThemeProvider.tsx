import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { applyColorPreferences, type ColorPreferenceController } from '@/foundations/context';
import { syncDocumentAppearance, persistAppearance, readPersistedAppearance, resolveTheme, type UiBrand, type UiProduct, type UiTheme, type UiThemeMode } from '@/theme/helpers';

export interface ThemeContextValue {
  themeMode: UiThemeMode; brand: UiBrand; product: UiProduct; resolvedTheme: UiTheme;
  setThemeMode: (mode: UiThemeMode) => void; setBrand: (brand: UiBrand) => void;
  setProduct: (product: UiProduct) => void; toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);
export interface ThemeProviderProps {
  children?: ReactNode; defaultMode?: UiThemeMode; defaultBrand?: UiBrand; defaultProduct?: UiProduct; persist?: boolean;
}

export function ThemeProvider({ children, defaultMode = 'system', defaultBrand = 'blue', defaultProduct = 'rahino', persist = true }: ThemeProviderProps) {
  const [initial] = useState(() => persist ? readPersistedAppearance() : { themeMode: defaultMode, brand: defaultBrand, product: defaultProduct });
  const [themeMode, setThemeModeState] = useState<UiThemeMode>(initial.themeMode);
  const [brand, setBrandState] = useState<UiBrand>(initial.brand);
  const [product, setProductState] = useState<UiProduct>(initial.product);
  const [resolvedTheme, setResolvedTheme] = useState<UiTheme>(() => resolveTheme(initial.themeMode));
  const colors = useRef<ColorPreferenceController | null>(null);

  useEffect(() => {
    const controller = applyColorPreferences({ appearance: initial.themeMode });
    colors.current = controller;
    const unsubscribe = controller.subscribe(context => setResolvedTheme(context.appearance));
    return () => { unsubscribe(); controller.dispose(); colors.current = null; };
  }, [initial]);

  useEffect(() => { colors.current?.setPreferences({ appearance: themeMode }); }, [themeMode]);
  useEffect(() => { syncDocumentAppearance(resolvedTheme, brand, product); }, [resolvedTheme, brand, product]);
  useEffect(() => { if (persist) persistAppearance(themeMode, brand, product); }, [themeMode, brand, product, persist]);

  const setThemeMode = useCallback((mode: UiThemeMode) => setThemeModeState(mode), []);
  const setBrand = useCallback((next: UiBrand) => setBrandState(next), []);
  const setProduct = useCallback((next: UiProduct) => setProductState(next), []);
  const toggleTheme = useCallback(() => setThemeModeState(resolveTheme(themeMode) === 'dark' ? 'light' : 'dark'), [themeMode]);
  const value = useMemo<ThemeContextValue>(() => ({ themeMode, brand, product, resolvedTheme, setThemeMode, setBrand, setProduct, toggleTheme }),
    [themeMode, brand, product, resolvedTheme, setThemeMode, setBrand, setProduct, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
export function useOptionalTheme(): ThemeContextValue | null { return useContext(ThemeContext); }
export type { UiBrand, UiProduct, UiTheme, UiThemeMode };
