const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); }
catch {
  const bundled = path.join(process.env.USERPROFILE || process.env.HOME || '', '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  playwright = require(process.env.RAHINO_PLAYWRIGHT_PATH || bundled);
}
const { chromium } = playwright;
const checkBrowserColorResolver = require('./color-resolver-browser-check.cjs');
const channels = value => value.match(/[\d.]+/g).map(Number);
const luminance = rgb => rgb.slice(0, 3).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrastRatio = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);

(async () => {
  const css = fs.readFileSync('master-tokens/generated/tokens.css', 'utf8');
  const executablePath = process.env.RAHINO_CHROME_PATH || [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  ].find(file => fs.existsSync(file));
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}), timeout: 20000 });
  try {
    const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
    await page.setContent('<!doctype html><html><head><style>' + css + '</style></head><body><div data-rds-script="latin" style="letter-spacing:2px"><p id="body" class="rds-type-body-md">A test</p><h1 id="heading" class="rds-type-heading-page">A title</h1><div data-rds-script="fa"><p id="persian" class="rds-type-body-md">متن</p><code id="code" class="rds-type-code">123</code></div></div><div id="probe" style="background:var(--rds-color-surface-base);color:var(--rds-color-ink-secondary);box-shadow:var(--rds-shadow-sm)">Probe</div></body></html>');
    const probe = () => page.locator('#probe').evaluate(el => { const s = getComputedStyle(el); return { background: s.backgroundColor, color: s.color, shadow: s.boxShadow }; });
    const settings = async (theme, contrast) => page.evaluate(([theme, contrast]) => { document.documentElement.dataset.rdsTheme = theme; document.documentElement.dataset.rdsContrast = contrast; }, [theme, contrast]);
    const stateMigration = JSON.parse(fs.readFileSync('master-tokens/state-name-migration.json', 'utf8'));
    const stateAliases = async () => {
      for (const alias of stateMigration.cssCompatibility) {
        const values = await page.evaluate(({ from, to }) => {
          const style = getComputedStyle(document.documentElement);
          return [style.getPropertyValue(from).trim(), style.getPropertyValue(to).trim()];
        }, alias);
        assert(values[0] && values[1], `Missing state CSS variable: ${alias.from}`);
        assert.equal(values[0], values[1], `Broken state CSS compatibility: ${alias.from}`);
      }
    };
    for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) {
      await settings(theme, contrast);
      await stateAliases();
    }
    await page.emulateMedia({ forcedColors: 'active' });
    await stateAliases();
    await page.evaluate(() => {
      const brand = document.createElement('button');
      brand.id = 'brand-contrast';
      brand.textContent = 'Brand action';
      brand.style.color = 'var(--rds-color-brand-fg)';
      document.body.append(brand);
      const primary = document.createElement('button');
      primary.id = 'primary-on-brand';
      primary.textContent = 'Primary action';
      primary.style.color = 'var(--rds-color-ink-on-brand)';
      document.body.append(primary);
      const row = document.createElement('div');
      row.id = 'interactive-contrast';
      row.style.position = 'relative';
      row.innerHTML = '<div id="state-overlay" style="position:absolute;inset:0"></div><span id="secondary-ink" style="position:relative;color:var(--rds-color-ink-secondary)">Secondary</span><span id="primary-ink" style="position:relative;color:var(--rds-color-ink-primary)">Primary</span>';
      document.body.append(row);
    });
    let minimumPrimaryOnBrandContrast = Infinity;
    for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more', 'forced-colors']) {
      await settings(theme, contrast === 'forced-colors' ? 'more' : contrast);
      await page.emulateMedia({ colorScheme: theme, forcedColors: contrast === 'forced-colors' ? 'active' : 'none' });
      for (const state of ['default', 'hover', 'pressed']) {
        const colors = await page.locator('#primary-on-brand').evaluate((el, state) => {
          el.style.backgroundColor = `var(--rds-color-action-primary-bg-${state})`;
          const style = getComputedStyle(el), root = getComputedStyle(document.documentElement);
          return { foreground: style.color, background: style.backgroundColor,
            onBrand: root.getPropertyValue('--rds-color-ink-on-brand').trim(), alias: root.getPropertyValue('--rds-color-action-primary-fg').trim() };
        }, state);
        assert.equal(colors.alias, colors.onBrand, `Primary foreground differs from on-brand: ${theme}/${contrast}`);
        const ratio = contrastRatio(channels(colors.foreground), channels(colors.background));
        assert(ratio >= 4.5, `On-brand text contrast fails: ${theme}/${contrast}/${state}`);
        minimumPrimaryOnBrandContrast = Math.min(minimumPrimaryOnBrandContrast, ratio);
      }
    }
    for (const theme of ['light', 'dark']) {
      await settings(theme, 'more');
      await page.emulateMedia({ colorScheme: theme, forcedColors: 'active' });
      for (const state of ['default', 'hover']) {
        const colors = await page.locator('#brand-contrast').evaluate((el, state) => {
          el.style.backgroundColor = `var(--rds-color-brand-bg-${state})`;
          const style = getComputedStyle(el);
          return { foreground: style.color, background: style.backgroundColor };
        }, state);
        assert(contrastRatio(channels(colors.foreground), channels(colors.background)) >= 4.5, `Forced-color brand text disappears: ${theme}/${state}`);
      }
    }
    await page.emulateMedia({ forcedColors: 'none', contrast: 'no-preference' });
    let minimumInteractiveTextContrast = Infinity;
    for (const theme of ['light', 'dark']) {
      await settings(theme, 'standard');
      for (const surface of ['canvas', 'base', 'subtle', 'raised', 'sunken']) for (const state of ['hover', 'pressed']) {
        const colors = await page.evaluate(({ surface, state }) => {
          const row = document.getElementById('interactive-contrast');
          const overlay = document.getElementById('state-overlay');
          row.style.backgroundColor = `var(--rds-color-surface-${surface})`;
          overlay.style.backgroundColor = `var(--rds-color-interaction-neutral-${state})`;
          return { parent: getComputedStyle(row).backgroundColor, overlay: getComputedStyle(overlay).backgroundColor,
            inks: ['primary', 'secondary'].map(ink => getComputedStyle(document.getElementById(ink + '-ink')).color) };
        }, { surface, state });
        const parent = channels(colors.parent), overlay = channels(colors.overlay), alpha = overlay[3] ?? 1;
        const background = overlay.slice(0, 3).map((v, i) => v * alpha + parent[i] * (1 - alpha));
        for (const ink of colors.inks) {
          const ratio = contrastRatio(channels(ink), background);
          assert(ratio >= 4.5, `Interactive text contrast below 4.5:1: ${theme}/${surface}/${state}`);
          minimumInteractiveTextContrast = Math.min(minimumInteractiveTextContrast, ratio);
        }
      }
    }
    await settings('system', 'system');
    await page.emulateMedia({ colorScheme: 'light', contrast: 'no-preference', forcedColors: 'none' });
    assert.equal((await probe()).background, 'rgb(255, 255, 255)');
    await page.emulateMedia({ colorScheme: 'dark' });
    assert.equal((await probe()).background, 'rgb(26, 25, 27)', 'Follow system dark mode');
    await settings('light', 'system');
    assert.equal((await probe()).background, 'rgb(255, 255, 255)', 'Explicit light overrides system dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await settings('dark', 'standard');
    assert.equal((await probe()).background, 'rgb(26, 25, 27)', 'Explicit dark overrides system light');
    await settings('dark', 'more');
    assert.equal((await probe()).background, 'rgb(18, 17, 19)');
    assert.equal((await probe()).color, 'rgb(238, 238, 240)');
    await settings('system', 'system');
    await page.emulateMedia({ colorScheme: 'light', contrast: 'more' });
    assert.equal((await probe()).color, 'rgb(33, 29, 32)', 'System enhanced contrast selects the approved override');
    await settings('system', 'standard');
    assert.equal((await probe()).color, 'rgb(95, 88, 93)', 'Explicit standard suppresses system enhanced contrast');
    await settings('dark', 'more');
    await page.emulateMedia({ forcedColors: 'active' });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--rds-color-surface-base').trim()), 'Canvas');
    assert.equal((await probe()).shadow, 'none', 'Native colors take precedence over custom shadows');
    await page.emulateMedia({ forcedColors: 'none', contrast: 'no-preference' });
    const styles = await page.locator('#body').evaluate(el => { const s = getComputedStyle(el); return { size: s.fontSize, weight: s.fontWeight, lineHeight: s.lineHeight, letterSpacing: s.letterSpacing, family: s.fontFamily }; });
    assert.equal(styles.size, '16px');
    assert.equal(styles.weight, '400');
    assert.equal(styles.lineHeight, '31.2px');
    assert.equal(styles.letterSpacing, '2px', 'Typography preserves inherited letter spacing');
    assert(styles.family.includes('Roboto Condensed'));
    assert((await page.locator('#persian').evaluate(el => getComputedStyle(el).fontFamily)).includes('IRANYekanX'), 'Nested script overrides must be local');
    assert((await page.locator('#code').evaluate(el => getComputedStyle(el).fontFamily)).includes('ui-monospace'));
    const narrow = await page.locator('#heading').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    await page.setViewportSize({ width: 1440, height: 900 });
    const wide = await page.locator('#heading').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    assert(narrow >= 24 && narrow <= 32 && wide === 32 && wide > narrow, 'Fluid heading must retain its size bounds');
    assert(!css.includes('--rds-color-presentation-gradient'), 'Deferred artwork must not be published as CSS tokens');
    const colorResolver = await checkBrowserColorResolver(page);
    console.log(JSON.stringify({ browserCssChecks: 'PASS', colorResolver, minimumPrimaryOnBrandContrast: Number(minimumPrimaryOnBrandContrast.toFixed(3)), brandedForcedColorContrast: true, minimumInteractiveTextContrast: Number(minimumInteractiveTextContrast.toFixed(3)), stateNameCompatibility: true, systemAndAppThemes: true, enhancedAndForcedContrast: true, typographyAndScriptScopes: true, inheritedLetterSpacing: true, fluidHeading: { narrow, wide }, deferredArtworkPreserved: true }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
