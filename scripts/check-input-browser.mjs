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
catch { playwright = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const root = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(root, 'tmp-verify/input-foundations');
fs.mkdirSync(output, { recursive: true });
const bundle = await build({ root, configFile: false, plugins: [react()], define: { 'process.env.NODE_ENV': '"production"' },
  build: { write: false, lib: { entry: path.join(root, 'scripts/input-review-fixture.tsx'), formats: ['es'], fileName: 'review' } } });
const assets = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(result => result.output);
const sizes = { sm: { height: 32, padding: '12px' }, md: { height: 40, padding: '16px' }, lg: { height: 48, padding: '20px' } };
const browser = await playwright.chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1100 } });
  const errors = []; page.on('pageerror', error => errors.push(String(error)));
  await page.setContent('<!doctype html><html dir="rtl" data-rds-theme="light"><head><style>body{margin:24px;background:var(--rds-color-surface-canvas);font-family:var(--rds-font-family-fa)}.review-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}#behavior{display:grid;gap:16px;margin-bottom:24px}button{min-width:44px;min-height:44px}button svg{width:20px;height:20px}@media(max-width:600px){.review-grid{grid-template-columns:1fr}}</style></head><body><div id="root"></div></body></html>');
  await page.addStyleTag({ content: assets.filter(asset => asset.type === 'asset' && asset.fileName.endsWith('.css')).map(asset => asset.source).join('\n') });
  await page.addScriptTag({ type: 'module', content: assets.find(asset => asset.type === 'chunk').code });
  await page.locator('#controlled').waitFor();
  const settle = () => page.evaluate(async () => { await new Promise(requestAnimationFrame); await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
  const samples = [];
  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) for (const dir of ['rtl', 'ltr']) {
    await page.evaluate(context => { Object.assign(document.documentElement.dataset, { rdsTheme: context.theme, rdsContrast: context.contrast }); document.documentElement.dir = context.dir; }, { theme, contrast, dir });
    await page.locator('#focus').focus(); await settle();
    const readings = await page.locator('[data-case]').evaluateAll(cases => cases.map(wrapper => {
      const field = wrapper.querySelector('.rds-input__field'), input = wrapper.querySelector('input');
      const css = getComputedStyle(field), text = getComputedStyle(input), hint = wrapper.querySelector('.rds-input__helper');
      const label = wrapper.querySelector('.rds-input__label'), error = wrapper.querySelector('.rds-input__error');
      const support = error || hint;
      const mark = error?.querySelector('svg'), markBox = mark?.getBoundingClientRect(), errorBox = error?.getBoundingClientRect();
      const key = wrapper.dataset.case, state = key.split('/')[1];
      const role = state === 'disabled' ? 'surface-subtle' : ['readonly', 'pending'].includes(state) ? 'surface-base' : state === 'error' ? 'status-error-bg' : 'surface-sunken';
      const probe = document.createElement('span'); probe.style.background = `var(--rds-color-${role})`; field.append(probe); const expected = getComputedStyle(probe).backgroundColor; probe.remove();
      return { key, height: field.getBoundingClientRect().height, radius: css.borderRadius, border: css.borderTopWidth, shadow: css.boxShadow,
        bg: css.backgroundColor, expected, outline: text.outlineWidth, textBorder: text.borderTopWidth, fontSize: text.fontSize, weight: text.fontWeight,
        padding: css.paddingInlineStart, duration: css.transitionDuration, described: input.getAttribute('aria-describedby')?.split(' ').includes(support.id),
        name: input.labels[0]?.textContent, invalid: input.getAttribute('aria-invalid'),
        helperSize: getComputedStyle(support).fontSize, helperLineHeight: getComputedStyle(support).lineHeight,
        helperVisible: Boolean(hint), supportingGap: support.getBoundingClientRect().top - field.getBoundingClientRect().bottom,
        labelGap: field.getBoundingClientRect().top - label.getBoundingClientRect().bottom,
        requiredGap: getComputedStyle(label).gap,
        error: mark ? { tag: mark.tagName.toLowerCase(), size: getComputedStyle(mark).width, stroke: getComputedStyle(mark).strokeWidth,
          border: getComputedStyle(mark).borderTopWidth, viewBox: mark.getAttribute('viewBox'),
          linecap: getComputedStyle(mark).strokeLinecap, linejoin: getComputedStyle(mark).strokeLinejoin, vectorEffect: getComputedStyle(mark).vectorEffect,
          fontSize: getComputedStyle(error).fontSize, gap: getComputedStyle(error).gap, centered: Math.abs(markBox.top + markBox.height / 2 - errorBox.top - errorBox.height / 2) < 0.1 } : null };
    }));
    assert.equal(readings.length, 21);
    for (const sample of readings) {
      const [size, state] = sample.key.split('/');
      assert.equal(sample.height, sizes[size].height); assert.equal(sample.padding, sizes[size].padding);
      assert.equal(sample.radius, '12px'); assert.equal(sample.border, '0px'); assert.equal(sample.textBorder, '0px'); assert.equal(sample.outline, '0px', JSON.stringify({theme, contrast, dir, ...sample}));
      assert.equal(sample.shadow, 'none'); assert.equal(sample.bg, sample.expected); assert.equal(sample.fontSize, '16px'); assert.equal(sample.weight, '400');
      assert(sample.described && sample.name); assert.equal(sample.invalid, state === 'error' ? 'true' : null); assert.equal(sample.duration, '0.15s');
      assert.equal(sample.helperSize, '12px'); assert.equal(sample.helperLineHeight, '21.6px');
      assert.equal(sample.supportingGap, 4); assert.equal(sample.labelGap, 8); assert.equal(sample.requiredGap, '2px');
      assert.equal(sample.helperVisible, state !== 'error');
      if (state === 'error') assert.deepEqual(sample.error, { tag: 'svg', size: '16px', stroke: '2.25px', border: '0px', viewBox: '0 0 24 24', linecap: 'round', linejoin: 'round', vectorEffect: 'none', fontSize: '12px', gap: '2px', centered: true });
      samples.push({ theme, contrast, dir, ...sample });
    }
    const fields = page.locator('[data-case] input:not(:disabled)');
    for (let i = 0; i < await fields.count(); i++) {
      await fields.nth(i).focus();
      const focus = await fields.nth(i).evaluate(input => {
        const field = input.parentElement, css = getComputedStyle(field, '::after');
        return { ring: css.boxShadow, inset: css.inset, opacity: css.opacity, height: field.getBoundingClientRect().height, outline: getComputedStyle(input).outlineWidth };
      });
      assert(focus.ring.includes('2px inset')); assert.equal(focus.inset, '0px'); assert.equal(focus.opacity, '1'); assert.equal(focus.outline, '0px');
    }
    const icon = page.locator('[data-case="md/icon"] .rds-input__icon');
    for (const size of Object.keys(sizes)) {
      const geometry = await page.locator(`[data-case="${size}/icon"] .rds-input__icon svg`).evaluate(svg => {
        const rect = svg.getBoundingClientRect(), field = svg.closest('.rds-input__field').getBoundingClientRect(), css = getComputedStyle(svg);
        return { size: css.width, height: css.height, stroke: css.strokeWidth, linecap: css.strokeLinecap, linejoin: css.strokeLinejoin,
          vectorEffect: css.vectorEffect, centered: Math.abs(rect.top + rect.height / 2 - field.top - field.height / 2) < 0.1 };
      });
      assert.deepEqual(geometry, { size: '20px', height: '20px', stroke: '2.25px', linecap: 'round', linejoin: 'round', vectorEffect: 'none', centered: true });
    }
    await page.locator('[data-case="md/icon"] .rds-input__field').hover(); await settle();
    assert.equal(await icon.evaluate(node => getComputedStyle(node.parentElement, '::before').opacity), '1');
    const order = await page.locator('#both').evaluate(input => ({ input: input.getBoundingClientRect().x, icon: input.parentElement.querySelector('.rds-input__icon').getBoundingClientRect().x }));
    assert.equal(order.icon > order.input, dir === 'rtl');
    const readonly = page.locator('[data-case="md/readonly"] .rds-input__field');
    await readonly.hover(); await settle();
    assert.equal(await readonly.evaluate(node => getComputedStyle(node, '::before').backgroundColor), 'rgba(255, 255, 255, 0.1)');
    if (contrast === 'standard' && dir === 'rtl') await readonly.screenshot({ path: path.join(output, `readonly-hover-${theme}.png`) });
    for (const size of Object.keys(sizes)) for (const position of ['start', 'end']) for (const kind of ['decorative', 'action', 'changing', 'disabled', 'readonly']) {
      const id = `icon-${size}-${position}-${kind}`, input = page.locator(`#${id}`), wrapper = input.locator('..');
      const button = wrapper.locator('button');
      assert.equal(await button.count(), kind === 'decorative' ? 0 : 1);
      const svg = wrapper.locator('svg');
      const geometry = await svg.evaluate(svg => {
        const icon = svg.getBoundingClientRect(), field = svg.closest('.rds-input__field').getBoundingClientRect(), input = svg.closest('.rds-input__field').querySelector('input').getBoundingClientRect();
        return { right: icon.x > input.x, centered: Math.abs(icon.top + icon.height / 2 - field.top - field.height / 2) < 0.1, width: icon.width, stroke: getComputedStyle(svg).strokeWidth };
      });
      assert.equal(geometry.right, (dir === 'rtl') === (position === 'start')); assert(geometry.centered); assert.equal(geometry.width, 20); assert.equal(geometry.stroke, '2.25px');
      if (kind === 'decorative') { assert.equal(await wrapper.locator('.rds-input__icon').getAttribute('aria-hidden'), 'true'); continue; }
      const box = await button.boundingBox();
      assert(box.width >= 44); assert.equal(box.height, sizes[size].height);
      assert.equal((await wrapper.boundingBox()).height, sizes[size].height);
      if (kind === 'disabled') { assert(await button.isDisabled()); continue; }
      const count = Number(await page.locator('#icon-actions').textContent());
      const initialArtwork = await svg.evaluate(node => node.innerHTML);
      await button.focus(); await page.keyboard.press('Enter');
      assert.equal(Number(await page.locator('#icon-actions').textContent()), count + 1);
      assert.equal(await wrapper.evaluate(node => getComputedStyle(node, '::after').opacity), '1');
      assert.equal(await button.getAttribute('aria-pressed'), null); assert.equal(await button.getAttribute('data-pressed'), null);
      if (kind === 'changing') {
        assert.equal(await input.getAttribute('type'), 'text'); assert.notEqual(await svg.evaluate(node => node.innerHTML), initialArtwork);
        assert.equal(await input.getAttribute('dir'), 'ltr');
        await page.keyboard.press('Space'); assert.equal(await input.getAttribute('type'), 'password');
        assert.equal(await svg.evaluate(node => node.innerHTML), initialArtwork);
        assert.equal(await button.locator('svg').count(), 1);
      } else {
        await button.click(); assert.equal(Number(await page.locator('#icon-actions').textContent()), count + 2);
        assert.equal(await svg.evaluate(node => node.innerHTML), initialArtwork);
      }
    }
    for (const id of ['password', 'password-large']) {
      const action = page.locator(`#${id} + .rds-input__end button`);
      await action.focus(); await action.hover(); await settle();
      const adornment = await action.evaluate(button => {
        const field = button.closest('.rds-input__field'), rect = field.getBoundingClientRect(), target = button.getBoundingClientRect();
        const focus = getComputedStyle(field, '::after'), fill = getComputedStyle(button, '::before');
        return { radius: getComputedStyle(field).borderRadius, height: rect.height, targetWidth: target.width, targetHeight: target.height,
          inside: target.left >= rect.left && target.right <= rect.right && target.top >= rect.top && target.bottom <= rect.bottom,
          fillInset: fill.inset, fillRadius: fill.borderRadius, fillBackground: fill.backgroundColor, targetBackground: getComputedStyle(button).backgroundColor,
          ring: focus.boxShadow, inset: focus.inset, focusVisible: focus.opacity, focusLayer: focus.zIndex };
      });
      assert.equal(adornment.radius, '12px'); assert.equal(adornment.height, id === 'password' ? 40 : 48);
      assert(adornment.targetWidth >= 44); assert.equal(adornment.targetHeight, adornment.height); assert(adornment.inside);
      assert.equal(adornment.fillInset, '4px'); assert.equal(adornment.fillRadius, '8px');
      assert.notEqual(adornment.fillBackground, 'rgba(0, 0, 0, 0)'); assert.equal(adornment.targetBackground, 'rgba(0, 0, 0, 0)');
      assert(adornment.ring.includes('2px inset')); assert.equal(adornment.inset, '0px'); assert.equal(adornment.focusVisible, '1'); assert.equal(adornment.focusLayer, '2');
      if (theme === 'dark' && contrast === 'standard' && dir === 'ltr' && id === 'password') {
        await action.locator('..').locator('..').screenshot({ path: path.join(output, 'password-focus-hover.png') });
      }
    }
  }
  await page.locator('#controlled').fill('bad');
  assert.equal(await page.locator('#controlled').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#controlled').getAttribute('aria-describedby'), 'external controlled-error');
  assert.equal(await page.locator('#controlled-hint').count(), 0);
  await page.locator('#controlled').fill('سارا'); assert.equal(await page.locator('#value').textContent(), 'سارا');
  assert.equal(await page.locator('#controlled').getAttribute('aria-describedby'), 'external controlled-hint');
  assert(await page.locator('#controlled-hint').isVisible());
  await page.locator('#focus').click(); assert(await page.locator('#controlled').evaluate(input => input === document.activeElement));
  assert.equal(await page.locator('#dense').getAttribute('aria-describedby'), 'dense-hint'); assert.equal(await page.locator('#dense').evaluate(input => input.labels[0].textContent), 'برچسب پنهان');
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
  for (const id of ['username', 'password', 'password-native', 'password-new']) {
    const directions = await page.locator(`#${id}`).evaluate(input => ({
      input: getComputedStyle(input).direction,
      field: getComputedStyle(input.parentElement).direction,
      label: getComputedStyle(input.labels[0]).direction,
    }));
    assert.deepEqual(directions, { input: 'ltr', field: 'rtl', label: 'rtl' });
  }
  assert.equal(await page.locator('#password-large').getAttribute('dir'), 'rtl');
  assert.equal(await page.locator('#controlled').getAttribute('dir'), null);
  await page.locator('#password + .rds-input__end button').click(); assert.equal(await page.locator('#password').getAttribute('type'), 'text');
  assert.equal(await page.locator('#password').getAttribute('dir'), 'ltr');
  assert.equal(await page.locator('#password').evaluate(input => getComputedStyle(input.parentElement, '::after').opacity), '1');
  await page.locator('#uncontrolled').fill('changed'); await page.locator('#native-form button').click(); assert.equal(await page.locator('#uncontrolled').inputValue(), 'RH-1');
  await page.emulateMedia({ reducedMotion: 'reduce' }); assert.equal(await page.locator('.rds-input__field').first().evaluate(node => getComputedStyle(node).transitionDuration), '0s');
  await page.emulateMedia({ forcedColors: 'active' }); await page.locator('#controlled').focus();
  assert.deepEqual(await page.locator('.rds-input__field').first().evaluate(node => ({ width: getComputedStyle(node).outlineWidth, offset: getComputedStyle(node).outlineOffset })), { width: '2px', offset: '-2px' });
  await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'no-preference' });
  await page.evaluate(() => { document.documentElement.dataset.rdsTheme = 'light'; document.documentElement.dir = 'rtl'; }); await settle();
  await page.screenshot({ path: path.join(output, 'light.png'), fullPage: true });
  await page.evaluate(() => document.documentElement.dataset.rdsTheme = 'dark'); await settle(); await page.screenshot({ path: path.join(output, 'dark.png'), fullPage: true });
  await page.setViewportSize({ width: 320, height: 850 }); assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  const touch = await browser.newPage({ hasTouch: true, isMobile: true });
  await touch.setContent('<!doctype html><html data-rds-theme="light"><body><div id="root"></div></body></html>');
  await touch.addStyleTag({ content: assets.filter(asset => asset.type === 'asset' && asset.fileName.endsWith('.css')).map(asset => asset.source).join('\n') });
  await touch.addScriptTag({ type: 'module', content: assets.find(asset => asset.type === 'chunk').code });
  assert(await touch.evaluate(() => matchMedia('(pointer: coarse)').matches));
  for (const size of Object.keys(sizes)) {
    const field = touch.locator(`#icon-${size}-end-action`).locator('..');
    assert.equal((await field.boundingBox()).height, Math.max(sizes[size].height, 44));
    assert.equal((await field.locator('button').boundingBox()).height, Math.max(sizes[size].height, 44));
  }
  await touch.close();
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ samples, status: 'behavior-checked; human state approval pending', boundaryContrast: 'sunken/canvas remains an explicit review limitation' }, null, 2));
  console.log(`PASS: ${samples.length} input size/state/theme/contrast/direction combinations, inset focus, hover, native behavior, accessible descriptions, adornments, reduced motion, forced colors and 320px layout.`);
} finally { await browser.close(); }
