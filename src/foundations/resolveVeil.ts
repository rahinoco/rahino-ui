import { SURFACE } from './color.ts';
import { VEIL_FLOOR, VEIL_TIER, type LiftLevel, type VeilTier } from './metrics.ts';

export type VeilContent = 'decoration' | 'short' | 'long' | 'form' | 'modal';
export type VeilForeground = 'primary' | 'secondary' | 'tertiary';
export type VeilBackground = 'controlled' | 'unknown';
export type RenderPath = 'veil' | 'plain';

export interface VeilRequest {
  tier: VeilTier;
  content: VeilContent;
  foreground: VeilForeground;
  background: VeilBackground;
  lift: LiftLevel;
}

export interface VeilEnvironment {
  appearance: 'light' | 'dark';
  contrast: 'standard' | 'more';
  reduceTransparency: boolean;
  reduceMotion: boolean;
  forcedColors: boolean;
  backdropFilter: boolean;
}

export interface VeilReason {
  code: string;
  text: string;
}

export interface VeilResolution {
  requestedTier: VeilTier;
  resolvedTier: VeilTier;
  renderPath: RenderPath;
  baseAlpha: number;
  protectAlpha: number;
  effectiveAlpha: number;
  blur: string;
  saturation: number;
  film: string;
  foreground: VeilForeground;
  lift: LiftLevel;
  reasons: VeilReason[];
}

const ORDER: VeilTier[] = ['trace', 'air', 'core', 'shelter', 'opaque'];

function higher(a: VeilTier, b: VeilTier): VeilTier {
  return ORDER[Math.max(ORDER.indexOf(a), ORDER.indexOf(b))];
}

function ceil2(value: number) {
  return Math.ceil((value - 1e-9) * 100) / 100;
}

const ESSENTIAL: VeilContent[] = ['short', 'long', 'form', 'modal'];

export function resolveVeil(request: VeilRequest, environment: VeilEnvironment): VeilResolution {
  const reasons: VeilReason[] = [];
  let tier = request.tier;
  let foreground = request.foreground;
  const essential = ESSENTIAL.includes(request.content);

  if (environment.forcedColors) {
    reasons.push({ code: 'forced-colors', text: 'رنگ سیستم حفظ شد و افکت وابسته به رنگ پروژه خاموش است.' });
    return plain(request, environment, foreground, reasons);
  }

  const plainBecause =
    environment.contrast === 'more'
      ? { code: 'high-contrast', text: 'کنتراست بالا مسیر plain با سطح عادی را انتخاب کرد.' }
      : environment.reduceTransparency
        ? { code: 'reduce-transparency', text: 'کاهش شفافیت مسیر plain را انتخاب کرد.' }
        : !environment.backdropFilter
          ? { code: 'no-backdrop-filter', text: 'نبود backdrop-filter مسیر plain را انتخاب کرد.' }
          : null;

  if (plainBecause) {
    reasons.push(plainBecause);
    return plain(request, environment, foreground, reasons);
  }

  if (request.content === 'form' || request.content === 'modal' || request.content === 'long') {
    const next = higher(tier, 'shelter');
    if (next !== tier) {
      reasons.push({ code: 'role-minimum', text: 'فرم، دیالوگ یا متن طولانی حداقل shelter می‌خواهد.' });
      tier = next;
    }
  }

  if (essential && tier === 'trace') {
    reasons.push({ code: 'essential-trace', text: 'trace حامل متن ضروری به core ارتقا یافت.' });
    tier = higher(tier, 'core');
  }

  if (essential && request.background === 'unknown' && tier === 'air') {
    reasons.push({ code: 'unknown-air', text: 'air روی زمینهٔ ناشناخته با متن ضروری حداقل core است.' });
    tier = higher(tier, 'core');
  }

  if (essential && foreground === 'tertiary') {
    reasons.push({ code: 'tertiary-upgrade', text: 'tertiary ضروری روی زمینهٔ نیازمند محافظت به secondary ارتقا یافت.' });
    foreground = 'secondary';
  }

  const film = SURFACE.base[environment.appearance];
  const spec = VEIL_TIER[tier];
  let protectAlpha = 0;
  if (essential && request.background === 'unknown') {
    const required = VEIL_FLOOR[environment.appearance][foreground === 'primary' ? 'primary' : 'secondary'];
    if (spec.alpha >= required) {
      reasons.push({ code: 'base-sufficient', text: 'آلفای پایه از کف محافظ بالاتر است و کاهش پیدا نکرد.' });
    } else {
      protectAlpha = ceil2((required - spec.alpha) / (1 - spec.alpha));
      reasons.push({ code: 'protective-film', text: 'Film محافظ برای رسیدن به کف خوانایی زمینهٔ ناشناخته اضافه شد.' });
    }
  } else if (request.background === 'controlled') {
    reasons.push({ code: 'controlled-background', text: 'زمینهٔ کنترل‌شده از کف ناشناخته استفاده نمی‌کند.' });
  } else {
    reasons.push({ code: 'decoration', text: 'بدون متن ضروری، Film محافظ لازم نیست.' });
  }

  const effectiveAlpha = 1 - (1 - spec.alpha) * (1 - protectAlpha);
  return {
    requestedTier: request.tier,
    resolvedTier: tier,
    renderPath: 'veil',
    baseAlpha: spec.alpha,
    protectAlpha,
    effectiveAlpha,
    blur: spec.blur,
    saturation: spec.saturation,
    film,
    foreground,
    lift: request.lift,
    reasons,
  };
}

function plain(
  request: VeilRequest,
  environment: VeilEnvironment,
  foreground: VeilForeground,
  reasons: VeilReason[],
): VeilResolution {
  return {
    requestedTier: request.tier,
    resolvedTier: request.tier,
    renderPath: 'plain',
    baseAlpha: 1,
    protectAlpha: 0,
    effectiveAlpha: 1,
    blur: '0',
    saturation: 1,
    film: SURFACE.base[environment.appearance],
    foreground,
    lift: request.lift,
    reasons,
  };
}

export function readVeilEnvironment(root?: HTMLElement | null): VeilEnvironment {
  const el = root ?? (typeof document === 'undefined' ? null : document.documentElement);
  const appearance = el?.classList.contains('dark') ? 'dark' : 'light';
  const contrastAttr = el?.getAttribute('data-contrast');
  const systemMore = typeof matchMedia === 'function' && matchMedia('(prefers-contrast: more)').matches;
  const contrast = contrastAttr === 'more' || contrastAttr === 'standard' ? contrastAttr : systemMore ? 'more' : 'standard';
  const reduceTransparency =
    el?.getAttribute('data-reduce-transparency') === 'on' ||
    (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-transparency: reduce)').matches);
  const reduceMotion =
    el?.getAttribute('data-reduce-motion') === 'on' ||
    (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const forcedColors = typeof matchMedia === 'function' && matchMedia('(forced-colors: active)').matches;
  const backdropFilter = typeof CSS !== 'undefined' && CSS.supports('backdrop-filter', 'blur(1px)');
  return { appearance, contrast, reduceTransparency, reduceMotion, forcedColors, backdropFilter };
}
