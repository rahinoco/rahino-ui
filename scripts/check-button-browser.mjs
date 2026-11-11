import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { loadModel } from '../src/foundations/canonical/master-tokens/scripts/foundations.mjs';
import { resolveColor } from '../src/foundations/canonical/master-tokens/generated/color-resolver.mjs';
import { ICONOGRAPHY } from '../src/foundations/canonical/Icons.ts';

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
  const sizeGeometry = await page.locator('[data-case] .rds-button').evaluateAll(nodes => nodes.map(node => ({
    id: node.parentElement.dataset.case,
    size: node.dataset.size,
    iconOnly: node.dataset.iconOnly === 'true',
    height: node.getBoundingClientRect().height,
    width: node.getBoundingClientRect().width,
  })));
  for (const button of sizeGeometry) {
    const expected = { sm: 32, md: 40, lg: 48 }[button.size];
    assert.equal(button.height, expected, `${button.id}: button height`);
    if (button.iconOnly) assert.equal(button.width, expected, `${button.id}: square icon button`);
  }
  const fractional = page.locator('[data-geometry-case] .rds-button');
  const geometry = await fractional.evaluate(node => ({ width: getComputedStyle(node).width, height: getComputedStyle(node).height, radius: getComputedStyle(node).borderRadius, clip: getComputedStyle(node).clipPath, filter: getComputedStyle(node).filter }));
  assert.equal(geometry.width, '123.375px');
  assert.equal(geometry.height, '44.625px');
  assert.equal(geometry.radius, '8px');
  assert.equal(geometry.clip, 'none');
  assert.equal(geometry.filter, 'none');
  assert.equal(await page.locator('.rds-button__surface, .rds-button__elevation, .rds-button__shadow-surface').count(), 0, 'No custom shape layers');
  const resizable = page.locator('[data-case="less-solid-brand-md-Button-default"] .rds-button');
  const initialWidth = await resizable.evaluate(node => parseFloat(getComputedStyle(node).width));
  await resizable.evaluate((node, width) => { node.style.width = `${width + 37}px`; }, initialWidth);
  assert(Math.abs(await resizable.evaluate(node => parseFloat(getComputedStyle(node).width)) - initialWidth - 37) < .02);
  await resizable.evaluate(node => { node.style.removeProperty('width'); node.dataset.radius = 'more'; });
  assert.equal(await resizable.evaluate(node => getComputedStyle(node).borderRadius), '12px');
  await resizable.evaluate(node => { node.dataset.radius = 'less'; });
  assert.equal(await resizable.evaluate(node => getComputedStyle(node).borderRadius), '8px');
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  const { root: doc } = await cdp.send('DOM.getDocument');
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: doc.nodeId, selector: '[data-state="default"] .rds-button, [data-state="selected"] .rds-button' });
  const findings = [];
  const softFeedback = [];
  const contrastFindings = new Map();
  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) {
    await page.evaluate(({ theme, contrast }) => {
      document.documentElement.dataset.rdsTheme = theme;
      document.documentElement.dataset.rdsContrast = contrast;
    }, { theme, contrast });
    for (const state of ['default', 'hover', 'active', 'focus-visible']) {
      const forcedPseudoClasses = state === 'active' ? ['hover', 'active'] : state === 'default' ? [] : [state];
      await Promise.all(nodeIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses })));
      await page.evaluate(async () => {
        await new Promise(requestAnimationFrame);
        await Promise.all(document.getAnimations().filter(animation => animation.effect.getTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
      });
      const snapshots = await page.locator('[data-case] .rds-button').evaluateAll((nodes, { state, iconography }) => {
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
        const paint = getComputedStyle(node.querySelector('.rds-button__face'));
        const scale = paint.transform === 'none' ? 1 : new DOMMatrix(paint.transform).a;
        const parent = node.parentElement;
        const disabled = parent.dataset.state === 'disabled' || parent.dataset.state === 'loading';
        const selected = node.dataset.pressed === 'true' && !disabled;
        const feedback = state === 'hover' || state === 'active' ? '-hover' : '';
        const solidBrand = node.dataset.appearance === 'solid' && node.dataset.intent === 'brand';
        const bgRole = disabled ? (solidBrand ? '--rds-button-solid-brand-bg-disabled' : '--rds-button-bg-disabled')
          : selected ? '--rds-button-selected-bg' + feedback : '--rds-button-bg' + feedback;
        const fgRole = disabled ? (solidBrand ? '--rds-color-ink-primary' : '--rds-button-fg-disabled') : '--rds-button-fg' + feedback;
        const disabledGhost = parent.dataset.state === 'disabled' && node.dataset.appearance === 'ghost';
        const expectedBg = disabledGhost ? 'none' : css.getPropertyValue(bgRole).trim();
        const expectedFg = css.getPropertyValue(fgRole).trim();
        if (expectedBg !== 'none' && JSON.stringify(rgba(paint.backgroundColor)) !== JSON.stringify(rgba(expectedBg))) throw new Error(parent.dataset.case + '/' + state + ': incorrect state fill');
        if (expectedBg === 'none' && rgba(paint.backgroundColor)[3] !== 0) throw new Error(parent.dataset.case + '/' + state + ': ghost button must have no fill in this state');
        if (JSON.stringify(rgba(css.color)) !== JSON.stringify(rgba(expectedFg))) throw new Error(parent.dataset.case + '/' + state + ': incorrect state foreground');
        if (!disabled && !selected && node.dataset.appearance === 'ghost' && node.dataset.intent === 'danger') {
          const red = css.getPropertyValue('--rds-color-status-error-fg').trim();
          if (JSON.stringify(rgba(css.color)) !== JSON.stringify(rgba(red))) throw new Error(parent.dataset.case + '/' + state + ': ghost danger must retain its resting red foreground');
        }
        if (!disabled && !selected && state === 'hover' && node.dataset.appearance === 'ghost' && node.dataset.intent === 'neutral') {
          const hover = css.getPropertyValue('--rds-color-interaction-neutral-hover').trim();
          if (JSON.stringify(rgba(paint.backgroundColor)) !== JSON.stringify(rgba(hover))) throw new Error(parent.dataset.case + ': ghost neutral hover must use the interaction hover fill');
        }
        if (css.opacity !== '1' || overlay.content !== 'none') throw new Error(parent.dataset.case + ': opacity or overlay modifies semantic colors');
        if ([...node.querySelectorAll('svg')].some(svg => getComputedStyle(svg).opacity !== '1')) throw new Error(parent.dataset.case + ': icon/spinner opacity modifies foreground');
        for (const svg of node.querySelectorAll('.rds-button__icon svg')) {
          const iconCss = getComputedStyle(svg);
          const size = parseFloat(iconography.size[node.dataset.size]);
          const matrix = svg.getScreenCTM();
          const visibleStroke = parseFloat(iconCss.strokeWidth) * Math.hypot(matrix.a, matrix.b);
          const expectedStroke = iconography.stroke.width * size / iconography.grid.size * scale;
          if (parseFloat(iconCss.width) !== size || parseFloat(iconCss.height) !== size) throw new Error(parent.dataset.case + ': incorrect icon size');
          if (svg.getAttribute('viewBox') !== `0 0 ${iconography.grid.size} ${iconography.grid.size}`) throw new Error(parent.dataset.case + ': incorrect SVG reference grid');
          if (parseFloat(iconCss.strokeWidth) !== iconography.stroke.width || Math.abs(visibleStroke - expectedStroke) > .001) throw new Error(parent.dataset.case + ': stroke must scale with the icon grid');
          if (iconCss.vectorEffect !== 'none' || iconCss.strokeLinecap !== 'round' || iconCss.strokeLinejoin !== 'round' || iconCss.fill !== 'none') throw new Error(parent.dataset.case + ': icons must use proportional rounded outlines');
          if (iconCss.stroke !== css.color || iconCss.color !== css.color) throw new Error(parent.dataset.case + ': icon must inherit the button foreground');
          if (svg.closest('.rds-button__icon').getAttribute('aria-hidden') !== 'true') throw new Error(parent.dataset.case + ': decorative icon must be hidden from assistive technology');
        }
        let background = composite(rgba(paint.backgroundColor), base);
        if (overlay.content !== 'none' && overlay.display !== 'none' && Number(overlay.opacity) > 0) {
          const layer = rgba(overlay.backgroundColor);
          layer[3] *= Number(overlay.opacity);
          background = composite(layer, background);
        }
        const foreground = composite(rgba(css.color), background);
        const a = luminance(foreground), b = luminance(background);
        return { id: parent.dataset.case, radius: paint.borderTopLeftRadius, bg: paint.backgroundColor, fg: css.color, shadow: paint.boxShadow, smoothed: node.dataset.smoothed, controlClip: css.clipPath, focusMask: getComputedStyle(node, '::after').maskImage, focusWidth: css.outlineWidth, focusColor: css.outlineColor, disabled, transition: paint.transitionProperty, scale, controlTransform: css.transform, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), state };
        });
      }, { state, iconography: ICONOGRAPHY });
      assert.equal(snapshots.length, 540);
      for (const sample of snapshots) {
        if (!sample.disabled && sample.ratio < 4.5) {
          const key = [theme, contrast, state, ...sample.id.split('-').slice(1, 3), sample.id.endsWith('-selected') ? 'selected' : 'unselected'].join('/');
          contrastFindings.set(key, { context: key, example: sample.id, ratio: sample.ratio, target: 4.5 });
        }
        assert.equal(sample.smoothed, undefined, sample.id + ' native rounding');
        assert.equal(sample.focusMask, 'none', sample.id + ' no shape mask');
        assert.equal(sample.controlClip, 'none', sample.id + ' unclipped native control');
        if (state === 'focus-visible' && !sample.disabled) assert.notEqual(sample.focusColor, 'rgba(0, 0, 0, 0)', sample.id + ' native focus ring');
        assert.equal(sample.radius, sample.id.startsWith('less-') ? '8px' : '12px', sample.id);
        assert.notEqual(sample.bg, '', sample.id + ' missing background');
        assert.notEqual(sample.fg, '', sample.id + ' missing foreground');
        assert.equal(sample.shadow === 'none', sample.disabled || sample.id.includes('-ghost-'), sample.id + ' shadow');
        if (state === 'focus-visible' && !sample.disabled) assert.equal(sample.focusWidth, '2px', sample.id + ' focus');
        assert.equal(sample.transition, sample.disabled ? 'none' : 'transform', sample.id + ' only an enabled face transform may transition');
        assert.equal(sample.scale, state === 'active' && !sample.disabled ? 0.98 : 1, sample.id + '/' + state + ' face scale');
        assert.equal(sample.controlTransform, 'none', sample.id + ' target and focus geometry must stay fixed');
      }
      assert(await page.locator('.rds-button').evaluateAll(nodes => nodes.every(node => node.querySelectorAll('svg').length <= 1)), 'A button must never show multiple icons');
      if (['default', 'hover', 'active'].includes(state)) for (const intent of ['neutral', 'brand', 'danger']) {
        const sample = snapshots.find(item => item.id === `less-soft-${intent}-md-Button-default`);
        softFeedback.push({ theme, contrast, intent, state, bg: sample.bg, fg: sample.fg });
      }
      findings.push({ theme, contrast, state, checked: snapshots.length });
    }
    await Promise.all(nodeIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] })));
    await page.screenshot({ path: path.join(output, `${theme}-${contrast}.png`) });
    console.log(`ok ${theme}/${contrast}: all styles, intents, sizes, radii and family members`);
  }
  for (const direction of ['rtl', 'ltr']) {
    await page.evaluate(direction => { document.documentElement.dir = direction; }, direction);
    const transforms = await page.locator('#icon-direction-review .rds-button__icon').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).transform));
    assert.deepEqual(transforms, direction === 'rtl' ? ['matrix(-1, 0, 0, 1, 0, 0)', 'none', 'matrix(-1, 0, 0, 1, 0, 0)', 'none'] : ['none', 'none', 'none', 'none'], 'Only direction-dependent action icons mirror; loading never mirrors');
  }
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
  const toggleMotion = [];
  for (const direction of ['rtl', 'ltr']) {
    await page.evaluate(direction => { document.documentElement.dir = direction; }, direction);
    for (const size of ['sm', 'md', 'lg']) {
      const pair = page.locator(`[data-toggle-size="${size}"]`);
      const regular = pair.locator('button').nth(0);
      const textToggle = pair.locator('button').nth(1);
      const width = node => node.getBoundingClientRect().width;
      const normalWidth = await regular.evaluate(width);
      assert.equal(await textToggle.evaluate(width), normalWidth, `${direction}/${size}: no idle icon space`);
      await textToggle.hover();
      assert.equal(await textToggle.evaluate(width), normalWidth, `${direction}/${size}: no hover icon space`);
      const expandedBy = await textToggle.evaluate(node => {
        const css = getComputedStyle(node);
        return parseFloat(css.getPropertyValue('--rds-button-icon')) + parseFloat(css.getPropertyValue('--rds-space-icon-gap'));
      });
      const sample = await textToggle.evaluate(async node => {
        const slot = node.querySelector('.rds-button__mark');
        // Observe React's commit so frame scheduling cannot skip a short transition.
        await new Promise(resolve => {
          const observer = new MutationObserver(() => {
            if (slot.dataset.visible !== 'true') return;
            observer.disconnect(); resolve();
          });
          observer.observe(slot, { attributes: true });
          node.click();
        });
        const animations = slot.getAnimations();
        if (animations.length !== 2) throw new Error('Slot width and gap must animate together');
        for (const animation of animations) { animation.pause(); animation.currentTime = animation.effect.getTiming().duration / 2; }
        const middle = node.getBoundingClientRect().width;
        for (const animation of animations) animation.finish();
        const end = node.getBoundingClientRect().width;
        const mark = node.querySelector('.rds-button__mark').getBoundingClientRect();
        const label = node.querySelector('.rds-button__label').getBoundingClientRect();
        return { middle, end, markX: mark.x, labelX: label.x };
      });
      assert(sample.middle > normalWidth && sample.middle < sample.end, `${direction}/${size}: expansion is continuous`);
      assert(Math.abs(sample.end - normalWidth - expandedBy) < .05, `${direction}/${size}: only icon and gap are added`);
      assert.equal(sample.markX > sample.labelX, direction === 'rtl', 'Mark follows reading direction');
      // Reverse during collapse, without waiting for pointer stability.
      await textToggle.evaluate(node => node.click());
      await textToggle.evaluate(async node => {
        await new Promise(requestAnimationFrame);
        for (const animation of node.querySelector('.rds-button__mark').getAnimations()) {
          animation.pause(); animation.currentTime = animation.effect.getTiming().duration / 2;
        }
        node.click();
        await new Promise(requestAnimationFrame);
        for (const animation of node.querySelector('.rds-button__mark').getAnimations()) animation.finish();
      });
      assert(Math.abs(await textToggle.evaluate(width) - sample.end) < .05, 'Rapid reversal returns to selected width');
      await textToggle.evaluate(node => node.click());
      await textToggle.evaluate(async node => {
        await new Promise(requestAnimationFrame);
        await Promise.all(node.querySelector('.rds-button__mark').getAnimations().map(animation => animation.finished));
      });
      assert.equal(await textToggle.evaluate(width), normalWidth, 'Deselection restores normal width');
      toggleMotion.push({ direction, size, normalWidth, ...sample });
    }
  }
  // Compact visual evidence of the three states shown in the owner's reference.
  await page.evaluate(() => {
    const review = document.createElement('div');
    review.id = 'toggle-state-preview';
    review.dir = 'ltr';
    review.style.cssText = 'position:fixed;inset:0 auto auto 0;width:540px;padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;background:var(--rds-color-surface-base);z-index:100';
    for (const title of ['Default', 'Hover', 'Selected']) {
      const heading = document.createElement('span'); heading.textContent = title; review.append(heading);
    }
    for (const intent of ['brand', 'neutral', 'danger']) for (const state of ['default', 'hover', 'selected']) {
      const original = document.querySelector(`[data-case="less-soft-${intent}-md-ToggleButton-${state === 'selected' ? 'selected' : 'default'}"] button`);
      const node = original.cloneNode(true);
      node.dir = 'rtl'; node.dataset.reviewToggleState = state;
      node.style.justifySelf = 'center';
      node.querySelector('.rds-button__label').textContent = 'دنبال کردن';
      review.append(node);
    }
    document.body.append(review);
  });
  const { nodeIds: hoverToggleIds } = await cdp.send('DOM.querySelectorAll', { nodeId: doc.nodeId, selector: '#toggle-state-preview [data-review-toggle-state="hover"]' });
  await Promise.all(hoverToggleIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: ['hover'] })));
  await page.locator('#toggle-state-preview').screenshot({ path: path.join(output, 'toggle-states.png') });
  await page.evaluate(() => document.querySelector('#toggle-state-preview').remove());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reducedToggle = page.locator('[data-toggle-size="md"] button').nth(1);
  await reducedToggle.evaluate(node => node.click());
  assert.equal(await reducedToggle.locator('.rds-button__mark').evaluate(node => getComputedStyle(node).transitionDuration), '0s');
  assert.equal(await reducedToggle.locator('.rds-button__mark').evaluate(node => node.getAnimations().length), 0);
  await reducedToggle.evaluate(node => node.click());
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; });
  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) for (const intent of ['neutral', 'brand', 'danger']) {
    const states = softFeedback.filter(item => item.theme === theme && item.contrast === contrast && item.intent === intent);
    assert.equal(new Set(states.map(item => item.bg)).size, 2, `${theme}/${contrast}/${intent}: only hover changes the fill`);
    assert.equal(states.find(item => item.state === 'active').bg, states.find(item => item.state === 'hover').bg);
    assert.equal(new Set(states.map(item => item.fg)).size, 1, `${theme}/${contrast}/${intent}: soft feedback must keep the foreground stable`);
  }
  await page.evaluate(() => {
    document.querySelector('#root').style.display = 'none';
    const preview = document.createElement('div');
    preview.id = 'soft-feedback-review';
    preview.style.cssText = 'width:900px;direction:ltr;display:grid;grid-template-columns:1fr 1fr;gap:16px';
    for (const theme of ['light', 'dark']) {
      const section = document.createElement('div');
      section.className = 'rds-stage';
      section.dataset.appearance = theme;
      section.dataset.contrast = 'standard';
      section.style.cssText = 'padding:24px;background:var(--rds-color-surface-base);color:var(--rds-color-ink-primary);border-radius:var(--rds-radius-12);font:14px sans-serif';
      const title = document.createElement('h2');
      title.textContent = theme === 'light' ? 'Light' : 'Dark';
      section.append(title);
      const grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:60px repeat(3,1fr);align-items:center;gap:20px 12px';
      for (const heading of ['', 'Default', 'Hover', 'Pressed']) {
        const cell = document.createElement('span'); cell.textContent = heading; grid.append(cell);
      }
      for (const [intent, label] of [['neutral', 'خنثی'], ['brand', 'نشان'], ['danger', 'خطر']]) {
        const heading = document.createElement('span'); heading.textContent = intent; grid.append(heading);
        for (const state of ['default', 'hover', 'active']) {
          const node = document.querySelector(`[data-case="less-soft-${intent}-md-Button-default"] .rds-button`).cloneNode(true);
          node.querySelector('.rds-button__label').textContent = label;
          node.removeAttribute('aria-labelledby');
          node.querySelectorAll('[id]').forEach(child => child.removeAttribute('id'));
          node.dataset.reviewState = state;
          node.dir = 'rtl';
          grid.append(node);
        }
      }
      section.append(grid); preview.append(section);
    }
    document.body.append(preview);
  });
  for (const state of ['hover', 'active']) {
    const { nodeIds: previewIds } = await cdp.send('DOM.querySelectorAll', { nodeId: doc.nodeId, selector: `#soft-feedback-review [data-review-state="${state}"]` });
    await Promise.all(previewIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: state === 'active' ? ['hover', 'active'] : ['hover'] })));
  }
  await page.locator('#soft-feedback-review').screenshot({ path: path.join(output, 'soft-state-consistency.png') });
  await page.evaluate(() => { document.querySelector('#soft-feedback-review').remove(); document.querySelector('#root').style.removeProperty('display'); });
  const save = page.locator('#behavior .rds-button').nth(0);
  const pointerButton = page.locator('[data-case="less-soft-brand-md-Button-default"] .rds-button');
  await pointerButton.hover();
  const pointerTarget = await pointerButton.boundingBox();
  const pointerFace = pointerButton.locator('.rds-button__face');
  await page.mouse.down();
  await pointerFace.evaluate(async node => {
    getComputedStyle(node).transform;
    await Promise.all(node.getAnimations().map(animation => animation.finished));
  });
  assert.equal(await pointerFace.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), 0.98);
  assert.deepEqual(await pointerButton.boundingBox(), pointerTarget);
  await page.mouse.move(0, 0);
  await pointerFace.evaluate(async node => {
    getComputedStyle(node).transform;
    await Promise.all(node.getAnimations().map(animation => animation.finished));
  });
  assert.equal(await pointerFace.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), 1);
  await page.mouse.up();
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
  const toggleFace = toggle.locator('.rds-button__face');
  await page.keyboard.down('Space');
  await toggleFace.evaluate(async node => {
    getComputedStyle(node).transform;
    await Promise.all(node.getAnimations().map(animation => animation.finished));
  });
  assert.equal(await toggleFace.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), 0.98);
  assert.equal(await toggle.getAttribute('aria-pressed'), 'false');
  await page.keyboard.up('Space');
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
  assert.equal(await save.locator('.rds-button__face').evaluate(node => getComputedStyle(node).transitionDuration), '0s');
  await toggle.focus();
  await page.keyboard.down('Space');
  assert.deepEqual(await toggleFace.evaluate(node => {
    const css = getComputedStyle(node);
    return { scale: new DOMMatrix(css.transform).a, cue: css.outlineStyle, inset: css.outlineOffset };
  }), { scale: 1, cue: 'solid', inset: '-1px' });
  await page.keyboard.up('Space');
  await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'active' });
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().filter(animation => animation.effect.getTiming().iterations !== Infinity).map(animation => animation.finished.catch(() => {})));
  });
  const forced = await page.locator('[data-case] .rds-button__face').evaluateAll(nodes => nodes.map(node => {
    const css = getComputedStyle(node);
    return { bg: css.backgroundColor, shadow: css.boxShadow };
  }));
  assert.equal(new Set(forced.map(sample => sample.bg)).size, 1, 'Forced-color backgrounds must use system colors for every variant');
  assert(forced.every(sample => sample.shadow === 'none'));
  assert(await page.locator('.rds-button').evaluateAll(nodes => nodes.every(node => [...node.querySelectorAll('svg')].every(svg => getComputedStyle(svg).stroke === getComputedStyle(node).color))), 'Icons must inherit system foregrounds in forced colors');
  await toggle.focus();
  await page.keyboard.down('Space');
  assert.equal(await toggleFace.evaluate(node => getComputedStyle(node).outlineStyle), 'solid');
  assert.equal(await toggleFace.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), 1);
  await page.keyboard.up('Space');
  await page.screenshot({ path: path.join(output, 'forced-colors.png') });
  await page.emulateMedia({ forcedColors: 'none' });
  const model = await loadModel();
  const additions = model.manifest.approvedSemanticAdditions.find(item => item.approval === 'semantic-action-states-2026-11-03');
  const retiredPaths = new Set((model.manifest.approvedSemanticRemovals ?? []).flatMap(item => Object.keys(item.replacements)));
  const currentAdditionPaths = additions.paths.filter(p => !retiredPaths.has(p));
  await page.evaluate(() => {
    const stage = document.createElement('div');
    stage.id = 'color-review-stage';
    stage.className = 'rds-stage';
    document.body.append(stage);
    stage.append(document.querySelector('#root'));
  });
  for (const appearance of ['light', 'dark']) for (const contrast of ['standard', 'more']) {
    await page.evaluate(({ appearance, contrast }) => {
      document.documentElement.dataset.rdsTheme = appearance === 'light' ? 'dark' : 'light';
      const stage = document.querySelector('#color-review-stage');
      stage.dataset.appearance = appearance;
      stage.dataset.contrast = contrast;
    }, { appearance, contrast });
    const expected = Object.fromEntries([...currentAdditionPaths, 'rds.color.surface.subtle', 'rds.color.interaction.neutral.hover', 'rds.color.interaction.neutral.pressed', 'rds.color.ink.primary', 'rds.color.surface.base'].map(p => ['--' + p.replaceAll('.', '-'), resolveColor(p, { appearance, contrast })]));
    const colors = await page.locator('#color-review-stage').evaluate((stage, expected) => {
      // CSS minification may serialize the same alpha as .1 or 0.10.
      const normalize = value => { const probe = document.createElement('span'); probe.style.color = value; return probe.style.color; };
      return {
        actual: Object.fromEntries(Object.keys(expected).map(p => [p, normalize(getComputedStyle(stage).getPropertyValue(p).trim())])),
        expected: Object.fromEntries(Object.entries(expected).map(([p, value]) => [p, normalize(value)])),
      };
    }, expected);
    assert.deepEqual(colors.actual, colors.expected, appearance + '/' + contrast + ' preview aliases must resolve independently of the root theme');
  }
  await page.evaluate(() => {
    const stage = document.querySelector('#color-review-stage');
    document.body.append(document.querySelector('#root'));
    stage.remove();
  });
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
  assert(targets.every(target => target.height >= 40 && target.width >= 40), 'Touch targets must be at least 40 CSS pixels');
  const touchButton = touch.locator('[data-case="less-ghost-neutral-sm-IconButton-default"] .rds-button');
  assert.equal((await touchButton.boundingBox()).width, 40);
  assert.equal((await touchButton.boundingBox()).height, 40);
  await touchButton.scrollIntoViewIfNeeded();
  const touchTarget = await touchButton.boundingBox();
  const touchCdp = await touch.context().newCDPSession(touch);
  await touchCdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: touchTarget.x + touchTarget.width / 2, y: touchTarget.y + touchTarget.height / 2 }] });
  const touchFace = touchButton.locator('.rds-button__face');
  await touch.waitForFunction(() => {
    const face = document.querySelector('[data-case="less-ghost-neutral-sm-IconButton-default"] .rds-button__face');
    return new DOMMatrix(getComputedStyle(face).transform).a === 0.98;
  }, undefined, { timeout: 2500 });
  assert.deepEqual(await touchButton.boundingBox(), touchTarget);
  await touchCdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  await touchFace.evaluate(async node => {
    getComputedStyle(node).transform;
    await Promise.all(node.getAnimations().map(animation => animation.finished));
  });
  assert.equal(await touchFace.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), 1);
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
  fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify({ findings, toggleMotion, contrastFindings: [...contrastFindings.values()], interactions: 'keyboard, loading activation guard, retained focus, toggling, links, reduced motion, forced colors, mobile RTL/LTR, 40px coarse-pointer touch targets', approval: 'pending human review' }, null, 2));
  console.log(`Contrast review: ${contrastFindings.size} distinct context/state/recipe pairs below 4.5:1; see report.json.`);
  assert.equal(contrastFindings.size, 0, 'Foreground contrast failures remain in the component recipes');
  console.log(`ok interactions, reduced motion, forced colors and mobile RTL/LTR; evidence: ${output}`);
} finally {
  if (browser) await browser.close();
}
