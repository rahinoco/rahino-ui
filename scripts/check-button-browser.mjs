import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(process.env.RAHINO_PLAYWRIGHT_PATH || path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const root = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(root, 'tmp-verify/button-foundations');
fs.mkdirSync(output, { recursive: true });
const bundle = await build({
  root, configFile: false, plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  resolve: { alias: { '@': path.join(root, 'src') } },
  build: {
    write: false,
    lib: { entry: path.join(root, 'scripts/button-review-fixture.tsx'), formats: ['es'], fileName: 'review' },
  },
});
const assets = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(result => result.output);
const script = assets.find(item => item.type === 'chunk').code;
const styles = assets.filter(item => item.type === 'asset' && item.fileName.endsWith('.css')).map(item => item.source).join('\n');
const executablePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(file => fs.existsSync(file));
let browser;
try {
  browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => { errors.push(String(error)); console.error(String(error)); });
  await page.setContent('<!doctype html><html dir="rtl" data-rds-theme="light" data-rds-script="fa"><head><style>body{margin:24px;background:var(--rds-color-surface-base);color:var(--rds-color-ink-primary);font-family:var(--rds-font-family-fa)}.review-row{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-block:20px}.review-row h3{width:100%}#behavior{display:flex;gap:12px}section{margin-block:32px}</style></head><body><div id="root"></div></body></html>');
  await page.addStyleTag({ content: styles });
  await page.addScriptTag({ type: 'module', content: script });
  await page.locator('[data-case]').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  const resizable = page.locator('[data-case="less-solid-brand-md-Button-default"] .rds-button');
  const originalPath = await resizable.evaluate(node => getComputedStyle(node.querySelector('.rds-button__surface')).clipPath);
  await resizable.evaluate(node => { node.style.width = (node.offsetWidth + 37) + 'px'; });
  await page.waitForFunction(original => getComputedStyle(document.querySelector('[data-case="less-solid-brand-md-Button-default"] .rds-button__surface')).clipPath !== original, originalPath);
  await resizable.evaluate(node => { node.style.removeProperty('width'); node.dataset.radius = 'more'; });
  await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-case="less-solid-brand-md-Button-default"] .rds-button__surface')).clipPath.includes('12 12'));
  await resizable.evaluate(node => { node.dataset.radius = 'less'; });
  await page.waitForFunction(() => getComputedStyle(document.querySelector('[data-case="less-solid-brand-md-Button-default"] .rds-button__surface')).clipPath.includes('8 8'));
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root: doc } = await cdp.send('DOM.getDocument');
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: doc.nodeId, selector: '[data-state="default"] .rds-button, [data-state="selected"] .rds-button' });
  const findings = [];
  const contrastFindings = new Map();
  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) {
    await page.evaluate(({ theme, contrast }) => {
      document.documentElement.dataset.rdsTheme = theme;
      document.documentElement.dataset.rdsContrast = contrast;
    }, { theme, contrast });
    for (const state of ['default', 'hover', 'active', 'focus-visible']) {
      await Promise.all(nodeIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: state === 'default' ? [] : [state] })));
      await page.evaluate(async () => {
        await new Promise(requestAnimationFrame);
        await Promise.all(document.getAnimations().filter(animation => animation.effect.getTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
      });
      const snapshots = await page.locator('[data-case] .rds-button').evaluateAll((nodes, state) => {
        const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        function rgba(color) {
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, 1, 1);
          const pixel = [...ctx.getImageData(0, 0, 1, 1).data];
          return [...pixel.slice(0, 3), pixel[3] / 255];
        }
        const composite = (front, back) => front.slice(0, 3).map((value, i) => value * front[3] + back[i] * (1 - front[3]));
        const luminance = color => color.slice(0, 3).map(value => value / 255).map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4).reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0);
        const base = rgba(getComputedStyle(document.body).backgroundColor);
        return nodes.map(node => {
        const css = getComputedStyle(node);
        const overlay = getComputedStyle(node, '::before');
        const surface = getComputedStyle(node.querySelector('.rds-button__surface'));
        const elevation = getComputedStyle(node.querySelector('.rds-button__elevation'));
        const paint = node.dataset.smoothed === 'true' ? surface : css;
        const parent = node.parentElement;
        const disabled = parent.dataset.state === 'disabled' || parent.dataset.state === 'loading';
        let background = composite(rgba(paint.backgroundColor), base);
        if (overlay.content !== 'none' && Number(overlay.opacity) > 0) {
          const layer = rgba(overlay.backgroundColor);
          layer[3] *= Number(overlay.opacity);
          background = composite(layer, background);
        }
        const foreground = composite(rgba(css.color), background);
        const a = luminance(foreground), b = luminance(background);
        return { id: parent.dataset.case, radius: css.borderTopLeftRadius, bg: paint.backgroundColor, fg: css.color, shadow: elevation.filter, smoothed: node.dataset.smoothed, path: surface.clipPath, controlClip: css.clipPath, focusMask: getComputedStyle(node, '::after').maskImage, focusWidth: css.outlineWidth, focusColor: css.outlineColor, disabled, transition: css.transitionDuration, overlay: overlay.backgroundColor, overlayOpacity: overlay.opacity, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), state };
        });
      }, state);
      assert.equal(snapshots.length, 540);
      for (const sample of snapshots) {
        if (!sample.disabled && sample.ratio < 4.5) {
          const key = [theme, contrast, state, ...sample.id.split('-').slice(1, 3), sample.id.endsWith('-selected') ? 'selected' : 'unselected'].join('/');
          contrastFindings.set(key, { context: key, example: sample.id, ratio: sample.ratio, target: 4.5 });
        }
        assert.equal(sample.smoothed, 'true', sample.id + ' smoothing');
        assert(sample.path.startsWith('path(') && !sample.path.includes('NaN'), sample.id + ' path');
        assert.equal(sample.controlClip, 'none', sample.id + ' unclipped native control');
        if (state === 'focus-visible' && !sample.disabled) assert(sample.focusMask.includes('data:image/svg+xml'), sample.id + ' smoothed focus ring');
        assert.equal(sample.radius, sample.id.startsWith('less-') ? '8px' : '12px', sample.id);
        assert.notEqual(sample.bg, '', sample.id + ' missing background');
        assert.notEqual(sample.fg, '', sample.id + ' missing foreground');
        assert.equal(sample.shadow === 'none', sample.disabled || sample.id.includes('-ghost-'), sample.id + ' shadow');
        if (state === 'focus-visible' && !sample.disabled) assert.equal(sample.focusWidth, '2px', sample.id + ' focus');
        if (!sample.disabled) assert(sample.transition.includes('0.15s'), sample.id + ' feedback timing');
      }
      assert(await page.locator('.rds-button').evaluateAll(nodes => nodes.every(node => node.querySelectorAll('svg').length <= 1)), 'A button must never show multiple icons');
      const neutral = snapshots.find(sample => sample.id === 'less-soft-neutral-md-Button-default');
      if (state === 'hover' || state === 'active') {
        assert.equal(neutral.overlayOpacity, '1');
        assert(neutral.overlay.includes(theme === 'light' ? (state === 'hover' ? '0.06' : '0.1') : (state === 'hover' ? '0.08' : '0.12')), JSON.stringify(neutral));
      }
      findings.push({ theme, contrast, state, checked: snapshots.length });
    }
    await Promise.all(nodeIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] })));
    await page.screenshot({ path: path.join(output, `${theme}-${contrast}.png`) });
    console.log(`ok ${theme}/${contrast}: all styles, intents, sizes, radii and family members`);
  }
  const save = page.locator('#behavior .rds-button').nth(0);
  await save.focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#behavior output').textContent === '1');
  assert.equal(await save.evaluate(node => document.activeElement === node), true);
  await page.keyboard.press('Enter');
  await save.click({ force: true });
  assert.equal(await page.locator('#behavior output').textContent(), '1');
  await page.getByRole('button', { name: 'Finish', exact: true }).click();
  const toggle = page.getByRole('button', { name: 'Toggle', exact: true });
  await toggle.focus();
  await page.keyboard.press('Space');
  assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
  assert.equal(await toggle.locator('svg').count(), 1);
  assert.equal(await toggle.locator('[data-example-icon="toggle"]').count(), 1);
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(await toggle.locator('svg').count(), 1);
  assert.equal(await page.locator('#behavior a').nth(1).getAttribute('href'), null);
  await page.getByRole('link', { name: 'Navigate', exact: true }).click();
  assert(page.url().endsWith('#destination'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('[data-state="loading"] .rds-button__spinner').first().evaluate(node => getComputedStyle(node).animationName), 'none');
  assert.equal(await save.evaluate(node => getComputedStyle(node).transitionDuration), '0s');
  await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'active' });
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().filter(animation => animation.effect.getTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
  });
  const forced = await page.locator('[data-case] .rds-button').evaluateAll(nodes => nodes.map(node => ({ id: node.parentElement.dataset.case, bg: getComputedStyle(node).backgroundColor, fg: getComputedStyle(node).color, shadow: getComputedStyle(node).boxShadow })));
  assert.equal(new Set(forced.map(sample => sample.bg)).size, 1, 'Forced-color backgrounds must use system colors for every variant');
  assert(forced.every(sample => sample.shadow === 'none'));
  await page.screenshot({ path: path.join(output, 'forced-colors.png') });
  await page.emulateMedia({ forcedColors: 'none' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.querySelector('#behavior').style.flexWrap = 'wrap'; });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: path.join(output, 'mobile-rtl.png') });
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await touch.setContent('<!doctype html><html dir="rtl" data-rds-theme="light"><body><div id="root"></div></body></html>');
  await touch.addStyleTag({ content: styles });
  await touch.addScriptTag({ type: 'module', content: script });
  await touch.locator('[data-case]').first().waitFor();
  const targets = await touch.locator('[data-case] .rds-button').evaluateAll(nodes => nodes.map(node => ({ id: node.parentElement.dataset.case, height: node.getBoundingClientRect().height, width: node.getBoundingClientRect().width })));
  assert(targets.every(target => target.height >= 44 && target.width >= 44), 'Touch targets must be at least 44 CSS pixels');
  await touch.close();
  await page.evaluate(() => { document.documentElement.dir = 'ltr'; });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.deepEqual(errors, []);
  await page.setViewportSize({ width: 1100, height: 1000 });
  await page.evaluate(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.dataset.rdsTheme = 'light';
    document.documentElement.dataset.rdsContrast = 'standard';
  });
  await page.addStyleTag({ content: '#behavior,#destination,[data-state]:not([data-state="default"]),[data-kind]:not([data-kind="Button"]),[data-case]:not([data-case*="-md-"]){display:none}section{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}section>h2{grid-column:1/-1}.review-row{margin:0;gap:8px}.review-row h3{margin:0;font-size:14px}body{margin:32px}' });
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().filter(animation => animation.effect.getTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
  });
  await page.screenshot({ path: path.join(output, 'radius-comparison.png'), fullPage: true });
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ findings, contrastFindings: [...contrastFindings.values()], interactions: 'keyboard, loading activation guard, retained focus, toggling, links, reduced motion, forced colors, mobile RTL/LTR, 44px coarse-pointer touch targets', approval: 'pending human review' }, null, 2));
  console.log(`Contrast review: ${contrastFindings.size} distinct context/state/recipe pairs below 4.5:1; see report.json.`);
  assert.equal(contrastFindings.size, 0, 'Foreground contrast failures remain in the component recipes');
  console.log(`ok interactions, reduced motion, forced colors and mobile RTL/LTR; evidence: ${output}`);
} finally {
  if (browser) await browser.close();
}
