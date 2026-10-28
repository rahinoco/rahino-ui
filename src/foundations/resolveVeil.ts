import { resolveColor, resolveColorContext } from './context.ts';
import { parseColor } from './contrast.ts';
import { VEIL, type LiftLevel, type LegacyLiftLevel, type VeilTier } from './metrics.ts';

export type VeilContent = 'decoration' | 'short' | 'long' | 'form' | 'modal';
export type VeilForeground = 'primary' | 'secondary' | 'tertiary';
export type VeilBackground = 'controlled' | 'unknown';
export type RenderPath = 'veil' | 'plain';
/** Compatibility at the component boundary only; new consumers request numbered levels. */
export type LegacyVeilTier = 'trace' | 'air' | 'core' | 'shelter' | 'opaque';
const LEGACY_LEVELS: Record<LegacyVeilTier, VeilTier> = { trace: '100', air: '200', core: '300', shelter: '400', opaque: '500' };

export interface VeilRequest {
  tier: VeilTier | LegacyVeilTier;
  content: VeilContent;
  foreground: VeilForeground;
  background: VeilBackground;
  lift: LiftLevel | LegacyLiftLevel;
}
export interface VeilEnvironment {
  appearance: 'light' | 'dark'; contrast: 'standard' | 'more';
  reduceTransparency: boolean; reduceMotion: boolean; forcedColors: boolean; backdropFilter: boolean;
}
export interface VeilReason { code: string; text: string; }
export interface VeilResolution {
  requestedTier: VeilRequest['tier']; resolvedTier: VeilTier; renderPath: RenderPath;
  baseAlpha: number; protectAlpha: number; effectiveAlpha: number;
  blur: string; saturation: number; film: string; foreground: VeilForeground;
  lift: VeilRequest['lift']; reasons: VeilReason[];
}

/** Veil colors already include opacity. Never synthesize a second protective-film palette. */
export function resolveVeil(request: VeilRequest, environment: VeilEnvironment): VeilResolution {
  const tier = request.tier in LEGACY_LEVELS ? LEGACY_LEVELS[request.tier as LegacyVeilTier] : request.tier as VeilTier;
  const treatment = VEIL[tier];
  if (!treatment) throw new TypeError('Unknown Veil level.');
  const reasons: VeilReason[] = [];
  const essential = request.content !== 'decoration';
  const fallback = environment.forcedColors
    ? { code: 'forced-colors', text: 'رنگ‌های بومی سیستم و سطح بدون شفافیت استفاده می‌شوند.' }
    : environment.contrast === 'more'
      ? { code: 'high-contrast', text: 'برای کنتراست بیشتر، سطح بدون شفافیت استفاده می‌شود.' }
      : environment.reduceTransparency
        ? { code: 'reduce-transparency', text: 'کاهش شفافیت، سطح بدون افکت را انتخاب کرد.' }
        : !environment.backdropFilter
          ? { code: 'no-backdrop-filter', text: 'بدون پشتیبانی blur، سطح بدون شفافیت استفاده می‌شود.' }
          : essential && request.background === 'unknown'
            ? { code: 'unvalidated-background', text: 'خوانایی روی زمینهٔ ناشناخته تضمین نیست؛ این recipe سطح بدون شفافیت را انتخاب می‌کند.' }
            : essential && (tier === '100' || tier === '200')
              ? { code: 'decorative-level', text: 'درجه‌های ۱۰۰ و ۲۰۰ برای تزئین‌اند؛ محتوای ضروری سطح بدون شفافیت می‌گیرد.' }
              : null;
  if (fallback) reasons.push(fallback);
  else reasons.push({ code: 'validate-contrast', text: 'رنگ و blur از مجموعهٔ اصلی‌اند؛ خوانایی باید روی زمینهٔ واقعی بررسی شود.' });
  const colorContext = resolveColorContext({ appearance: environment.appearance, contrast: environment.contrast }, { forcedColors: environment.forcedColors });
  const film = fallback ? resolveColor('rds.color.surface.raised', colorContext) : treatment.color[environment.appearance];
  const alpha = fallback ? 1 : parseColor(film)[3];
  return {
    requestedTier: request.tier, resolvedTier: tier, renderPath: fallback ? 'plain' : 'veil',
    baseAlpha: alpha, protectAlpha: 0, effectiveAlpha: alpha,
    blur: fallback ? '0px' : treatment.blur, saturation: 1, film,
    foreground: request.foreground, lift: request.lift, reasons,
  };
}

export function readVeilEnvironment(root?: HTMLElement | null): VeilEnvironment {
  const el = root ?? (typeof document === 'undefined' ? null : document.documentElement);
  const media = (query: string) => typeof matchMedia === 'function' && matchMedia(query).matches;
  const explicit = el?.getAttribute('data-rds-theme') ?? el?.getAttribute('data-appearance');
  const contrastAttr = el?.getAttribute('data-rds-contrast') ?? el?.getAttribute('data-contrast');
  const forcedColors = media('(forced-colors: active)');
  const selected = resolveColorContext({
    appearance: explicit === 'light' || explicit === 'dark' || explicit === 'system' ? explicit : el?.classList.contains('dark') ? 'dark' : 'system',
    contrast: contrastAttr === 'more' || contrastAttr === 'standard' ? contrastAttr : 'system',
  }, { appearance: media('(prefers-color-scheme: dark)') ? 'dark' : 'light', contrast: media('(prefers-contrast: more)') ? 'more' : 'standard', forcedColors });
  const appearance = selected.appearance;
  const contrast = selected.contrast === 'more' ? 'more' : 'standard';
  const preference = (attribute: string, query: string) => {
    const value = el?.getAttribute(attribute);
    return value === 'on' || (value !== 'off' && media(query));
  };
  return {
    appearance, contrast,
    reduceTransparency: preference('data-reduce-transparency', '(prefers-reduced-transparency: reduce)'),
    reduceMotion: preference('data-reduce-motion', '(prefers-reduced-motion: reduce)'),
    forcedColors,
    backdropFilter: typeof CSS !== 'undefined' && CSS.supports('backdrop-filter', 'blur(1px)'),
  };
}
