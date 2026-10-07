function channel(value: number) {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function parseColor(input: string): [number, number, number, number] {
  const hex = input.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const h = hex[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1];
  }
  const rgb = input.trim().match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([0-9.]+))?\s*\)$/i);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), rgb[4] == null ? 1 : Number(rgb[4])];
  throw new Error(`Unsupported color: ${input}`);
}

export function luminance(input: string) {
  const [r, g, b] = parseColor(input);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground: string, background: string) {
  const a = luminance(foreground);
  const b = luminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

export function compositeOver(film: string, alpha: number, background: string) {
  const [fr, fg, fb] = parseColor(film);
  const [br, bg, bb] = parseColor(background);
  const mix = (c: number, d: number) => Math.round(c * alpha + d * (1 - alpha));
  const r = mix(fr, br);
  const g = mix(fg, bg);
  const b = mix(fb, bb);
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}
