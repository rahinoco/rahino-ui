import type { CSSProperties, ReactNode } from 'react';

import { VEIL_EDGE, liftShadow } from './metrics.ts';
import { resolveVeil, type VeilEnvironment, type VeilRequest, type VeilResolution } from './resolveVeil.ts';

function withAlpha(color: string, alpha: number) {
  const hex = color.trim().match(/^#([0-9a-f]{6})$/i);
  if (!hex) return color;
  const h = hex[1];
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export function VeilPanel({
  request,
  environment,
  children,
  className,
  edge = false,
  style,
}: {
  request: VeilRequest;
  environment: VeilEnvironment;
  children?: ReactNode;
  className?: string;
  edge?: boolean;
  style?: CSSProperties;
}) {
  const resolved: VeilResolution = resolveVeil(request, environment);
  const forced = resolved.reasons.some((reason) => reason.code === 'forced-colors');
  const sheet: CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 'inherit',
    background: forced ? 'Canvas' : resolved.renderPath === 'plain' ? 'var(--rds-color-surface-base)' : 'transparent',
    color: forced ? 'CanvasText' : `var(--rds-color-ink-${resolved.foreground})`,
    boxShadow: edge && !forced ? `inset 0 0 0 1px ${VEIL_EDGE[environment.appearance]}` : undefined,
  };
  const film: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: withAlpha(resolved.film, resolved.baseAlpha),
    backdropFilter: `blur(${resolved.blur}) saturate(${resolved.saturation})`,
    WebkitBackdropFilter: `blur(${resolved.blur}) saturate(${resolved.saturation})`,
  };
  const protect: CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: withAlpha(resolved.film, resolved.protectAlpha),
  };

  return (
    <div
      className={className}
      data-render-path={resolved.renderPath}
      data-resolved-tier={resolved.resolvedTier}
      style={{
        position: 'relative',
        borderRadius: 'var(--rds-radius-panel)',
        boxShadow: forced ? undefined : liftShadow(resolved.lift, environment.appearance),
        opacity: 1,
        ...style,
      }}
    >
      <div style={sheet}>
        {resolved.renderPath === 'veil' ? <div aria-hidden="true" style={film} /> : null}
        {resolved.renderPath === 'veil' && resolved.protectAlpha > 0 ? <div aria-hidden="true" style={protect} /> : null}
        <div style={{ position: 'relative' }}>{children}</div>
      </div>
    </div>
  );
}
