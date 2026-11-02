import { useLayoutEffect, useRef } from 'react';

// Equal-radius geometry adapted from phamfoo/figma-squircle (MIT).
// See docs/THIRD_PARTY_NOTICES.md. Figma's arc + Bezier construction is described at
// https://www.figma.com/blog/desperately-seeking-squircles/.
// Smoothing is a component shape rule; radius still comes from foundation CSS.
export function buttonPath(width: number, height: number, radius: number, smoothing = 0.6) {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  if (!r) return `M 0 0 H ${width} V ${height} H 0 Z`;
  const s = Math.max(0, Math.min(smoothing, Math.min(width, height) / (2 * r) - 1));
  const p = (1 + s) * r;
  const arc = 90 * (1 - s);
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const k = Math.sin(radians(arc / 2)) * r * Math.SQRT2;
  const distance = r * Math.tan(radians((90 - arc) / 4));
  const c = distance * Math.cos(radians(45 * s));
  const d = c * Math.tan(radians(45 * s));
  const b = (p - k - c - d) / 3;
  const a = 2 * b;
  const round = (value: number) => Number(value.toFixed(4));
  const corners = [0, 1, 2, 3].map(turn => {
    const point = (x: number, y: number) => {
      const [dx, dy] = turn === 0 ? [x, y] : turn === 1 ? [-y, x] : turn === 2 ? [-x, -y] : [y, -x];
      return `${round(dx)} ${round(dy)}`;
    };
    return `c ${point(a, 0)} ${point(a + b, 0)} ${point(a + b + c, d)} a ${r} ${r} 0 0 1 ${point(k, k)} c ${point(d, c)} ${point(d, b + c)} ${point(d, a + b + c)}`;
  });
  return `M ${width - p} 0 ${corners[0]} L ${width} ${height - p} ${corners[1]} L ${p} ${height} ${corners[2]} L 0 ${p} ${corners[3]} Z`;
}

export function ButtonShape() {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const node = ref.current?.parentElement;
    if (!node || !('ResizeObserver' in window) || !CSS.supports('clip-path', 'path("M 0 0 H 1 V 1 Z")') || !CSS.supports('mask-image', 'url("data:image/svg+xml,<svg/>")')) return;
    function update() {
      if (!node) return;
      const css = getComputedStyle(node);
      const width = node.offsetWidth, height = node.offsetHeight;
      if (!width || !height) return;
      const radius = parseFloat(css.borderTopLeftRadius);
      const ring = parseFloat(css.getPropertyValue('--rds-focus-ring-width'));
      const gap = parseFloat(css.getPropertyValue('--rds-space-50'));
      const inset = gap + ring;
      node.style.setProperty('--rds-button-path', `path("${buttonPath(width, height, radius)}")`);
      const outline = buttonPath(width + inset * 2 - ring, height + inset * 2 - ring, radius + inset - ring / 2);
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width + inset * 2}" height="${height + inset * 2}"><path transform="translate(${ring / 2} ${ring / 2})" d="${outline}" fill="none" stroke="black" stroke-width="${ring}"/></svg>`;
      node.style.setProperty('--rds-button-focus-mask', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
      // CSS box-shadow blur is twice the standard deviation used by drop-shadow.
      const shadow = css.getPropertyValue('--rds-shadow-sm').trim();
      const lengths = [...shadow.matchAll(/(-?[\d.]+)px/g)].map(match => Number(match[1]));
      const color = shadow.match(/rgba?\([^)]*\)/)?.[0];
      if (lengths.length >= 3 && color) node.style.setProperty('--rds-button-drop-shadow', `${lengths[0]}px ${lengths[1]}px ${lengths[2] / 2}px ${color}`);
      node.dataset.smoothed = 'true';
    }
    update();
    const resize = new ResizeObserver(update);
    resize.observe(node);
    // Theme/radius/density switches can change paint or radius without resizing.
    const mutations = new MutationObserver(update);
    for (let ancestor: HTMLElement | null = node; ancestor; ancestor = ancestor.parentElement) {
      mutations.observe(ancestor, { attributes: true, attributeFilter: ['class', 'data-radius', 'data-rds-theme', 'data-appearance', 'data-rds-contrast', 'data-contrast', 'data-density', 'dir'] });
    }
    const scheme = matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', update);
    return () => { resize.disconnect(); mutations.disconnect(); scheme.removeEventListener('change', update); };
  }, []);
  return <span ref={ref} className="rds-button__elevation" aria-hidden="true"><span className="rds-button__surface" /></span>;
}
