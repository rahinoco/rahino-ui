import { resolveColor, resolveColorContext } from './context.ts';
import type { CSSProperties, ReactNode } from 'react';
import { liftShadow } from './metrics.ts';
import { resolveVeil, type VeilEnvironment, type VeilRequest } from './resolveVeil.ts';

export interface VeilPanelProps {
  request: VeilRequest; environment: VeilEnvironment; children?: ReactNode;
  className?: string; edge?: boolean; style?: CSSProperties;
}
export function VeilPanel({ request, environment, children, className, edge = false, style }: VeilPanelProps) {
  const resolved = resolveVeil(request, environment);
  const forced = resolved.reasons.some(reason => reason.code === 'forced-colors');
  const context = resolveColorContext({ appearance: environment.appearance, contrast: environment.contrast }, { forcedColors: environment.forcedColors });
  const film: CSSProperties = {
    position: 'absolute', inset: 0, pointerEvents: 'none', background: resolved.film,
    backdropFilter: resolved.renderPath === 'veil' ? 'blur(' + resolved.blur + ')' : undefined,
    WebkitBackdropFilter: resolved.renderPath === 'veil' ? 'blur(' + resolved.blur + ')' : undefined,
  };
  return (
    <div className={className} data-render-path={resolved.renderPath} data-resolved-tier={resolved.resolvedTier}
      style={{ position: 'relative', borderRadius: 'var(--rds-radius-16)', boxShadow: forced ? 'none' : liftShadow(resolved.lift, environment.appearance), ...style }}>
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 'inherit',
        background: forced ? 'Canvas' : resolved.renderPath === 'plain' ? resolved.film : 'transparent',
        color: resolveColor(`rds.color.ink.${resolved.foreground}`, context),
        outline: edge ? 'var(--rds-border-width-default) solid ' + (forced ? 'ButtonBorder' : 'var(--rds-color-edge-control)') : undefined,
      }}>
        {resolved.renderPath === 'veil' ? <div aria-hidden="true" style={film} /> : null}
        <div style={{ position: 'relative' }}>{children}</div>
      </div>
    </div>
  );
}
