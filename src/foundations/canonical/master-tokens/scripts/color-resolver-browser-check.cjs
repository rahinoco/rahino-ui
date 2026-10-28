const assert = require('node:assert/strict');
const fs = require('node:fs');

module.exports = async function checkBrowserColorResolver(page) {
  const moduleText = fs.readFileSync('master-tokens/generated/color-resolver.mjs', 'utf8');
  const map = JSON.parse(fs.readFileSync('master-tokens/generated/design-map.json', 'utf8'));
  const names = map.tokens.filter(t => t.light.type === 'color').map(t => t.path);
  await page.addScriptTag({ type: 'module', content: moduleText + '\nwindow.rahinoColorResolver = { resolveColor, resolveColorContext, applyColorPreferences };' });
  await page.waitForFunction(() => window.rahinoColorResolver);
  await page.evaluate(() => {
    document.documentElement.dataset.rdsTheme = 'system';
    document.documentElement.dataset.rdsContrast = 'system';
    window.rahinoColorController = window.rahinoColorResolver.applyColorPreferences();
    window.rahinoNotifications = [];
    window.rahinoUnsubscribe = window.rahinoColorController.subscribe(c => window.rahinoNotifications.push(c));
    window.rahinoOriginal = { style: document.documentElement.getAttribute('style'), script: document.documentElement.getAttribute('data-rds-script'), dir: document.documentElement.getAttribute('dir') };
    const type = getComputedStyle(document.getElementById('body'));
    window.rahinoOriginal.typography = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].map(p => type[p]);
  });
  let checked = 0;
  for (const colorScheme of ['light', 'dark']) for (const contrast of ['no-preference', 'more']) for (const forcedColors of ['none', 'active']) {
    await page.emulateMedia({ colorScheme, contrast, forcedColors });
    for (const appearance of ['system', 'light', 'dark']) for (const choice of ['system', 'standard', 'more']) {
      const preferences = { appearance, contrast: choice };
      await page.evaluate(p => window.rahinoColorController.setPreferences(p), preferences);
      const expected = { appearance: appearance === 'system' ? colorScheme : appearance,
        contrast: forcedColors === 'active' ? 'forced-colors' : choice === 'more' || (choice === 'system' && contrast === 'more') ? 'more' : 'standard' };
      await page.waitForFunction(e => { const c = window.rahinoColorController.getContext(); return c.appearance === e.appearance && c.contrast === e.contrast; }, expected);
      const result = await page.evaluate(names => {
        const root = getComputedStyle(document.documentElement), normalizer = document.createElement('span').style;
        const context = window.rahinoColorController.getContext();
        const normalize = value => { normalizer.color = ''; normalizer.color = value.trim(); return normalizer.color; };
        return names.flatMap(name => {
          const css = root.getPropertyValue('--' + name.replaceAll('.', '-'));
          const js = window.rahinoColorResolver.resolveColor(name, context);
          return !normalize(css) || normalize(css) !== normalize(js) ? [{ name, css, js }] : [];
        });
      }, names);
      assert.deepEqual(result, [], `CSS/JavaScript color mismatch: ${JSON.stringify(preferences)}/${colorScheme}/${contrast}/${forcedColors}`);
      checked++;
    }
  }
  // A pure system-preference change must update JS subscribers without a settings call.
  await page.emulateMedia({ colorScheme: 'light', contrast: 'no-preference', forcedColors: 'none' });
  await page.evaluate(() => window.rahinoColorController.setPreferences({ appearance: 'system', contrast: 'system' }));
  await page.waitForFunction(() => window.rahinoColorController.getContext().appearance === 'light' && window.rahinoColorController.getContext().contrast === 'standard');
  const before = await page.evaluate(() => window.rahinoNotifications.length);
  await page.emulateMedia({ colorScheme: 'dark', contrast: 'more' });
  await page.waitForFunction(() => window.rahinoColorController.getContext().appearance === 'dark' && window.rahinoColorController.getContext().contrast === 'more');
  assert(await page.evaluate(n => window.rahinoNotifications.length > n, before), 'System changes did not notify color subscribers');
  const safety = await page.evaluate(() => {
    const api = window.rahinoColorResolver, controller = window.rahinoColorController, root = document.documentElement;
    const same = api.applyColorPreferences({ appearance: 'dark' }) === controller;
    let rejected = false;
    const old = JSON.stringify(controller.getPreferences());
    try { controller.setPreferences({ contrast: 'invalid' }); } catch { rejected = true; }
    const atomic = old === JSON.stringify(controller.getPreferences()) && root.dataset.rdsContrast === 'system';
    const type = getComputedStyle(document.getElementById('body'));
    const typography = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].map(p => type[p]);
    const unrelated = window.rahinoOriginal.style === root.getAttribute('style') && window.rahinoOriginal.script === root.getAttribute('data-rds-script') && window.rahinoOriginal.dir === root.getAttribute('dir') && JSON.stringify(typography) === JSON.stringify(window.rahinoOriginal.typography);
    window.rahinoUnsubscribe();
    controller.dispose();
    controller.dispose();
    let disposed = false;
    try { controller.setPreferences({ appearance: 'light' }); } catch { disposed = true; }
    window.rahinoAfterDispose = window.rahinoNotifications.length;
    window.rahinoDisposedContext = controller.getContext();
    return { same, rejected, atomic, unrelated, disposed };
  });
  assert.deepEqual(safety, { same: true, rejected: true, atomic: true, unrelated: true, disposed: true });
  await page.emulateMedia({ colorScheme: 'light', contrast: 'no-preference', forcedColors: 'none' });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert(await page.evaluate(() => window.rahinoNotifications.length === window.rahinoAfterDispose && window.rahinoColorController.getContext() === window.rahinoDisposedContext), 'Disposed preference listeners are still active');
  return { contexts: checked, colorTokens: names.length, cssMatchesJavaScript: true, systemChanges: true, lifecycleAndIsolation: true };
};
