// Shared by the existing context selector, generated resolver and CSS generator.
export function selectContext(policy, settings = {}, environment = {}) {
  const appearanceChoice = settings.appearance ?? policy.appearance.default;
  const contrastChoice = settings.contrast ?? policy.contrast.default;
  if (!['system', 'light', 'dark'].includes(appearanceChoice)) throw new TypeError('Appearance must be system, light or dark.');
  if (!['system', 'standard', 'more'].includes(contrastChoice)) throw new TypeError('Contrast must be system, standard or more.');
  if (settings.script !== undefined && !policy.language.supportedScripts.includes(settings.script)) throw new TypeError('Script must be explicitly fa or latin.');
  const appearance = appearanceChoice !== 'system' ? appearanceChoice
    : ['light', 'dark'].includes(environment.appearance) ? environment.appearance : policy.appearance.fallback;
  const useSystemColors = environment.forcedColors === true;
  const enhanced = contrastChoice === 'more' || (contrastChoice === 'system' && environment.contrast === 'more');
  const contrast = useSystemColors ? 'forced-colors' : enhanced ? 'more' : 'standard';
  return { appearance, contrast, script: settings.script ?? null, setsInOrder: ['shared', appearance],
    overrides: contrast === 'more' ? { ...policy.contrast.enhancedOverrides[appearance] } : {}, useSystemColors };
}

export function forcedColorFor(p) {
  if (p === 'rds.color.focus.ring') return 'Highlight';
  if (p === 'rds.color.link.fg') return 'LinkText';
  if (p.endsWith('.disabled')) return 'GrayText';
  if (p.startsWith('rds.color.action.') && p.includes('.bg.')) return 'ButtonFace';
  if (p === 'rds.color.ink.on-brand' || (p.startsWith('rds.color.action.') && p.endsWith('.fg'))) return 'ButtonText';
  if (p === 'rds.color.interaction.surface.selected') return 'Highlight';
  if (p.endsWith('.on-fill')) return 'Canvas';
  if (p.endsWith('.fill')) return 'CanvasText';
  if (p.startsWith('rds.color.surface.') || p.endsWith('.bg') || p.includes('.bg.') || p.startsWith('rds.veil.') || p.includes('.scrim.')) return 'Canvas';
  if (p.includes('.edge.')) return 'ButtonBorder';
  return 'CanvasText';
}
