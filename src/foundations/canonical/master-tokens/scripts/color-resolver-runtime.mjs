// Serialized into the generated module; keep this factory dependency-free.
export function createColorResolver(data, selectContext) {
  const controllers = new WeakMap();
  const validatePreferences = preferences => {
    if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) throw new TypeError('Color preferences must be an object.');
    for (const key of Object.keys(preferences)) if (!['appearance', 'contrast'].includes(key)) throw new TypeError(`Unknown color preference: ${key}`);
  };
  const resolveColorContext = (preferences = {}, environment = {}) => {
    validatePreferences(preferences);
    const { appearance, contrast } = selectContext(data.policy, preferences, environment);
    return Object.freeze({ appearance, contrast });
  };
  const resolveColor = (tokenName, context = resolveColorContext()) => {
    if (typeof tokenName !== 'string') throw new TypeError('A color token name must be a string.');
    if (!context || !['light', 'dark'].includes(context.appearance) || !['standard', 'more', 'forced-colors'].includes(context.contrast)) throw new TypeError('Use a resolved color context with light/dark appearance and standard/more/forced-colors contrast.');
    if (Object.hasOwn(data.shared, tokenName)) return data.shared[tokenName];
    const palette = data.palettes[context.appearance];
    if (!Object.hasOwn(palette.standard, tokenName)) throw new RangeError(`Unknown color token: ${tokenName}`);
    if (context.contrast === 'forced-colors') return data.forced[tokenName];
    return context.contrast === 'more' && Object.hasOwn(palette.more, tokenName) ? palette.more[tokenName] : palette.standard[tokenName];
  };
  const applyColorPreferences = (preferences = {}, options = {}) => {
    validatePreferences(preferences);
    const root = options.root ?? globalThis.document?.documentElement;
    if (!root || root !== root.ownerDocument?.documentElement || !root.ownerDocument.defaultView) throw new TypeError('Color preferences require the document root of a browser window.');
    const existing = controllers.get(root);
    if (existing) { existing.setPreferences(preferences); return existing; }
    const win = root.ownerDocument.defaultView;
    const queries = typeof win.matchMedia === 'function' ? {
      appearance: win.matchMedia('(prefers-color-scheme: dark)'),
      contrast: win.matchMedia('(prefers-contrast: more)'),
      forcedColors: win.matchMedia('(forced-colors: active)'),
    } : {};
    const environment = () => ({ appearance: queries.appearance?.matches ? 'dark' : 'light',
      contrast: queries.contrast?.matches ? 'more' : 'standard', forcedColors: queries.forcedColors?.matches === true });
    let selected = {
      appearance: root.getAttribute('data-rds-theme') ?? data.policy.appearance.default,
      contrast: root.getAttribute('data-rds-contrast') ?? data.policy.contrast.default,
      ...preferences,
    };
    selected = Object.freeze({ appearance: selected.appearance ?? data.policy.appearance.default,
      contrast: selected.contrast ?? data.policy.contrast.default });
    let current = resolveColorContext(selected, environment()), disposed = false;
    const listeners = new Set(), removers = [];
    const ensureActive = () => { if (disposed) throw new Error('This color preference controller has been disposed.'); };
    const refresh = () => {
      const next = resolveColorContext(selected, environment());
      if (next.appearance === current.appearance && next.contrast === current.contrast) return;
      current = next;
      for (const listener of listeners) listener(current);
    };
    const writeAttributes = () => {
      root.setAttribute('data-rds-theme', selected.appearance);
      root.setAttribute('data-rds-contrast', selected.contrast);
    };
    const controller = Object.freeze({
      getContext: () => current,
      getPreferences: () => selected,
      setPreferences(patch) {
        ensureActive();
        validatePreferences(patch);
        const next = { appearance: patch.appearance ?? selected.appearance, contrast: patch.contrast ?? selected.contrast };
        resolveColorContext(next, environment());
        selected = Object.freeze(next);
        writeAttributes();
        refresh();
      },
      subscribe(listener) {
        ensureActive();
        if (typeof listener !== 'function') throw new TypeError('A color-context listener must be a function.');
        listeners.add(listener);
        listener(current);
        return () => listeners.delete(listener);
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        for (const remove of removers) remove();
        listeners.clear();
        controllers.delete(root);
      },
    });
    writeAttributes();
    for (const query of Object.values(queries)) {
      if (typeof query.addEventListener === 'function') {
        query.addEventListener('change', refresh);
        removers.push(() => query.removeEventListener('change', refresh));
      } else if (typeof query.addListener === 'function') {
        query.addListener(refresh);
        removers.push(() => query.removeListener(refresh));
      }
    }
    controllers.set(root, controller);
    return controller;
  };
  return { resolveColorContext, resolveColor, applyColorPreferences };
}
