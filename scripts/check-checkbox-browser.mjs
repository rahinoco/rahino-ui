import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { SCALE } from '../src/foundations/canonical/Motion.ts';
import { REFERENCE } from '../src/foundations/canonical/master-tokens/generated/reference.ts';
import { ICONOGRAPHY } from '../src/foundations/canonical/Icons.ts';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(process.env.RAHINO_PLAYWRIGHT_PATH || path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const root = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(root, 'tmp-verify/checkbox-foundations');
const pressScale = SCALE.pressed;
const motionTokens = JSON.parse(fs.readFileSync(path.join(root, 'src/foundations/canonical/master-tokens/shared.tokens.json'), 'utf8'));
assert.equal(motionTokens.rds.motion.scale.pressed.$value, '{ref.motion.scale.0-923}');
assert.equal(pressScale, REFERENCE['ref.motion.scale.0-923']);
assert.equal(pressScale, 0.923);
assert.equal(SCALE.subtle, 0.98, 'Generic subtle scale remains unchanged');
fs.mkdirSync(output, { recursive: true });
const bundle = await build({ root, configFile: false, plugins: [react()], define: { 'process.env.NODE_ENV': '"production"' },
  build: { write: false, lib: { entry: path.join(root, 'scripts/checkbox-review-fixture.tsx'), formats: ['es'], fileName: 'review' } } });
const assets = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(result => result.output);
const script = assets.find(item => item.type === 'chunk').code;
const styles = assets.filter(item => item.type === 'asset' && item.fileName.endsWith('.css')).map(item => item.source).join('\n');
const executablePath = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(file => fs.existsSync(file));
const browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.setContent('<!doctype html><html dir="rtl" data-rds-theme="light" data-rds-script="fa"><head><style>body{margin:24px;background:var(--rds-color-surface-base);color:var(--rds-color-ink-primary);font-family:var(--rds-font-family-fa)}.review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}h2{margin-top:24px}#behavior{display:flex;gap:12px;align-items:center}section p{font-size:12px}@media(max-width:600px){.review-grid{grid-template-columns:1fr}#behavior{flex-wrap:wrap}}</style></head><body><div id="root"></div></body></html>');
  await page.addStyleTag({ content: styles });
  await page.addScriptTag({ type: 'module', content: script });
  await page.locator('[data-case]').first().waitFor();
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root: doc } = await cdp.send('DOM.getDocument');
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: doc.nodeId, selector: '[data-case] .rds-checkbox' });
  const findings = [];
  const disabledColors = [];
  const contrastFindings = [];
  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) for (const dir of ['rtl', 'ltr']) {
    await page.evaluate(({ theme, contrast, dir }) => { Object.assign(document.documentElement.dataset, { rdsTheme: theme, rdsContrast: contrast }); document.documentElement.dir = dir; }, { theme, contrast, dir });
    for (const state of ['default', 'hover', 'active', 'focus-visible']) {
      await Promise.all(nodeIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: state === 'default' ? [] : [state] })));
      await page.locator('[data-case] .rds-checkbox').evaluateAll((nodes, active) => nodes.forEach(node => {
        if (active && !node.disabled) node.dataset.pressed = 'true'; else delete node.dataset.pressed;
      }), state === 'active');
      await page.evaluate(async () => { await new Promise(requestAnimationFrame); await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))); });
      const samples = await page.locator('[data-case] .rds-checkbox').evaluateAll(nodes => {
        const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        const rgba = color => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); const p = [...ctx.getImageData(0, 0, 1, 1).data]; return [...p.slice(0, 3), p[3] / 255]; };
        const over = (front, back) => [...front.slice(0, 3).map((value, i) => value * front[3] + back[i] * (1 - front[3])), 1];
        const lum = color => color.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
        const ratio = (a, b) => (Math.max(lum(a), lum(b)) + .05) / (Math.min(lum(a), lum(b)) + .05);
        const base = rgba(getComputedStyle(document.body).backgroundColor);
        return nodes.map(node => {
        const css = getComputedStyle(node), box = getComputedStyle(node.querySelector('.rds-checkbox__box'));
        const text = node.querySelector('.rds-checkbox__label'), description = node.querySelector('.rds-checkbox__description');
        const rect = node.getBoundingClientRect(), mark = node.querySelector('svg');
        const markCss = mark ? getComputedStyle(mark) : null, markRect = mark?.getBoundingClientRect();
        const boxRect = node.querySelector('.rds-checkbox__box').getBoundingClientRect();
        const labelRect = text.getBoundingClientRect(), descriptionRect = description?.getBoundingClientRect();
        const container = over(rgba(css.backgroundColor), base);
        let fill = over(rgba(box.backgroundColor), container);
        const overlay = getComputedStyle(node.querySelector('.rds-checkbox__box'), '::before');
        if (overlay.content !== 'none' && Number(overlay.opacity) > 0) { const layer = rgba(overlay.backgroundColor); layer[3] *= Number(overlay.opacity); fill = over(layer, fill); }
        return { id: node.parentElement.dataset.case, role: node.getAttribute('role'), checked: node.getAttribute('aria-checked'), disabled: node.disabled,
          width: rect.width, height: rect.height, border: box.borderTopWidth, shadow: box.boxShadow, fill: box.backgroundColor, markColor: box.color, boxSize: box.width, radius: box.borderTopLeftRadius,
          focus: css.outlineWidth, duration: box.transitionDuration, scale: new DOMMatrix(box.transform).a, marks: node.querySelectorAll('svg').length, markSize: mark ? getComputedStyle(mark).width : null,
          icon: mark ? { grid: mark.getAttribute('viewBox'), stroke: parseFloat(markCss.strokeWidth), cap: markCss.strokeLinecap, join: markCss.strokeLinejoin, vectorEffect: markCss.vectorEffect,
            centered: Math.abs(markRect.x + markRect.width / 2 - boxRect.x - boxRect.width / 2) < 0.5 && Math.abs(markRect.y + markRect.height / 2 - boxRect.y - boxRect.height / 2) < 0.5 } : null,
          rowCentered: node.dataset.type === 'item' ? Math.abs(boxRect.y + boxRect.height / 2 - labelRect.y - labelRect.height / 2) < 0.5 && Math.abs(boxRect.y + boxRect.height / 2 - rect.y - rect.height / 2) < 0.5 : null,
          named: node.getAttribute('aria-labelledby') === text?.id, described: description ? node.getAttribute('aria-describedby') === description.id : !node.hasAttribute('aria-describedby'),
          labelRatio: ratio(over(rgba(css.color), container), container), controlRatio: mark ? ratio(over(rgba(box.color), fill), fill) : ratio(fill, container),
          descriptionLayout: descriptionRect ? {
            fullWidth: Math.abs(descriptionRect.width - (rect.width - parseFloat(css.paddingLeft) - parseFloat(css.paddingRight))) < 1,
            alignedToContent: Math.abs(descriptionRect.left - rect.left - parseFloat(css.paddingLeft)) < 1,
            belowHeading: descriptionRect.top >= labelRect.bottom + parseFloat(css.rowGap) - 1,
            boxOnFirstLine: Math.abs(boxRect.y + boxRect.height / 2 - labelRect.y - parseFloat(css.lineHeight) / 2) < 1
          } : null,
          boxX: node.querySelector('.rds-checkbox__box').getBoundingClientRect().x, textX: text.getBoundingClientRect().x };
        });
      });
      assert.equal(samples.length, 18);
      for (const sample of samples) {
        const selection = sample.id.split('/')[1];
        assert.equal(sample.role, 'checkbox');
        assert.equal(sample.checked, selection === 'mixed' ? 'mixed' : String(selection === 'checked'));
        assert.equal(sample.border, '0px', sample.id + ' no stroke'); assert.equal(sample.shadow, 'none');
        assert.equal(sample.boxSize, '20px'); assert.equal(sample.radius, '4px');
        assert(sample.width >= 40 && sample.height >= 40, sample.id + ' minimum hit area');
        assert.notEqual(sample.fill, 'rgba(0, 0, 0, 0)'); assert(sample.named && sample.described);
        if (sample.descriptionLayout) assert(Object.values(sample.descriptionLayout).every(Boolean), sample.id + ' full-width explanation below aligned checkbox/name row: ' + JSON.stringify(sample.descriptionLayout));
        assert.equal(sample.marks, selection === 'unchecked' ? 0 : 1); if (sample.marks) assert.equal(sample.markSize, '16px');
        if (sample.icon) {
          assert.equal(sample.markSize, ICONOGRAPHY.size.sm);
          assert.equal(sample.icon.grid, `0 0 ${ICONOGRAPHY.grid.size} ${ICONOGRAPHY.grid.size}`);
          assert.equal(sample.icon.stroke, ICONOGRAPHY.stroke.width);
          assert.equal(sample.icon.cap, 'round'); assert.equal(sample.icon.join, 'round');
          assert.equal(sample.icon.vectorEffect, 'none'); assert(sample.icon.centered, sample.id + ' mark centered inside box');
        }
        if (sample.rowCentered !== null) assert(sample.rowCentered, sample.id + ' box and label centered within row');
        if (state === 'focus-visible') assert.equal(sample.focus, '2px');
        assert(sample.duration.includes('0.15s'));
        assert.equal(sample.scale, state === 'active' && !sample.disabled ? pressScale : 1, sample.id + ' token press scale');
        if (!sample.disabled) {
          assert(sample.labelRatio >= 4.5, sample.id + ' label contrast ' + sample.labelRatio);
          if (selection === 'unchecked' && sample.controlRatio < 3) {
            contrastFindings.push({ theme, contrast, dir, state, id: sample.id, ratio: sample.controlRatio, threshold: 3, status: 'review-required', reason: 'User-selected sunken default fill' });
          } else assert(sample.controlRatio >= 3, sample.id + ' box/mark contrast ' + sample.controlRatio);
        }
        if (sample.disabled && sample.marks) assert(sample.controlRatio >= 3, sample.id + ' retained disabled mark remains readable ' + sample.controlRatio);
        if (sample.disabled && state === 'default' && dir === 'rtl') disabledColors.push({ theme, contrast, id: sample.id, fill: sample.fill, mark: sample.marks ? sample.markColor : null, contrastRatio: sample.controlRatio });
        assert(dir === 'rtl' ? sample.boxX > sample.textX : sample.boxX < sample.textX, sample.id + ' logical order');
      }
      findings.push({ theme, contrast, dir, state, checked: samples.length });
    }
    await Promise.all(nodeIds.map(nodeId => cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] })));
    await page.locator('[data-case] .rds-checkbox').evaluateAll(nodes => nodes.forEach(node => delete node.dataset.pressed));
    if (contrast === 'standard' && dir === 'rtl') await page.screenshot({ path: path.join(output, `${theme}.png`), fullPage: true });
  }
  const delivery = page.getByRole('checkbox', { name: 'Delivery updates', exact: true });
  await delivery.focus(); await page.keyboard.press('Space');
  assert.equal(await delivery.getAttribute('aria-checked'), 'true');
  assert.equal(await page.locator('output').textContent(), '1');
  await page.keyboard.press('Enter'); assert.equal(await delivery.getAttribute('aria-checked'), 'false');
  await delivery.locator('.rds-checkbox__description').click(); assert.equal(await delivery.getAttribute('aria-checked'), 'true');
  const mixed = page.getByRole('checkbox', { name: 'Select all', exact: true });
  assert.equal(await mixed.getAttribute('aria-checked'), 'mixed'); await mixed.click();
  assert.equal(await mixed.getAttribute('aria-checked'), 'true'); assert.equal(await delivery.getAttribute('aria-checked'), 'true');
  await mixed.click(); assert.equal(await mixed.getAttribute('aria-checked'), 'false');
  const disabled = page.getByRole('checkbox', { name: 'Unavailable', exact: true });
  const before = await page.locator('output').textContent(); await disabled.click({ force: true });
  assert.equal(await page.locator('output').textContent(), before);
  await mixed.focus(); await page.keyboard.press('Tab'); assert(await page.getByRole('checkbox', { name: 'Standalone', exact: true }).evaluate(node => document.activeElement === node));
  assert.equal(await delivery.getAttribute('aria-describedby') !== null, true);
  const box = delivery.locator('.rds-checkbox__box');
  const settle = () => page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
  });
  const scale = () => box.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a);
  const targetBefore = await delivery.boundingBox();
  const pressAt = await box.boundingBox();
  await page.mouse.move(pressAt.x + pressAt.width / 2, pressAt.y + pressAt.height / 2);
  const valueBeforePress = await delivery.getAttribute('aria-checked');
  await page.mouse.down(); await settle();
  assert.equal(await scale(), pressScale);
  assert.equal(await delivery.getAttribute('aria-checked'), valueBeforePress, 'Pointer down does not select early');
  assert.deepEqual(await delivery.boundingBox(), targetBefore, 'Press leaves the hit target fixed');
  await page.evaluate(() => document.documentElement.style.setProperty('--rds-motion-scale-pressed', '0.9'));
  await settle(); assert.equal(await scale(), 0.9, 'Recipe consumes its semantic token');
  await page.evaluate(() => {
    document.documentElement.style.removeProperty('--rds-motion-scale-pressed');
    document.documentElement.style.setProperty('--ref-motion-scale-0-923', '0.91');
  });
  await settle(); assert.equal(await scale(), 0.91, 'Semantic token resolves through the raw reference');
  await page.evaluate(() => document.documentElement.style.removeProperty('--ref-motion-scale-0-923'));
  await settle(); assert.equal(await scale(), pressScale);
  await delivery.evaluate(node => node.style.setProperty('--rds-checkbox-scale-pressed', '0.88'));
  await settle(); assert.equal(await scale(), 0.88, 'Component-specific recipe token can select its motion');
  await delivery.evaluate(node => node.style.removeProperty('--rds-checkbox-scale-pressed'));
  await settle(); assert.equal(await scale(), pressScale, 'Recipe defaults to the generic pressed semantic');
  await page.mouse.up();
  assert.notEqual(await delivery.getAttribute('aria-checked'), valueBeforePress, 'Selection is immediate on release');
  await settle(); assert.equal(await scale(), 1);
  await page.mouse.down(); await settle();
  await page.mouse.move(0, 0); await settle(); assert.equal(await scale(), 1, 'Leaving cancels compression');
  await page.mouse.move(pressAt.x + pressAt.width / 2, pressAt.y + pressAt.height / 2);
  await settle(); assert.equal(await scale(), pressScale, 'Reentering resumes a held press');
  await page.mouse.move(0, 0); await page.mouse.up(); await settle();
  assert.equal(await scale(), 1);
  for (const key of ['Space', 'Enter']) {
    await delivery.focus(); await page.keyboard.down(key); await settle();
    assert.equal(await scale(), pressScale, key + ' held compression');
    await page.keyboard.up(key); await settle(); assert.equal(await scale(), 1);
  }
  await delivery.focus(); await page.keyboard.down('Space'); await settle();
  await mixed.focus(); await page.keyboard.up('Space'); await settle();
  assert.equal(await scale(), 1, 'Blur clears keyboard press');
  await delivery.dispatchEvent('pointerdown', { pointerId: 12, isPrimary: true, button: 0 });
  await delivery.dispatchEvent('pointercancel', { pointerId: 12 }); await settle();
  assert.equal(await scale(), 1, 'Pointer cancellation clears press');
  const rapidBefore = Number(await page.locator('output').textContent());
  for (let i = 0; i < 6; i++) await delivery.click({ delay: 10 });
  await settle(); assert.equal(await scale(), 1);
  assert.equal(Number(await page.locator('output').textContent()), rapidBefore + 6, 'Rapid clicks are not delayed or dropped');
  assert.equal(await box.evaluate(node => node.getAnimations().length), 0, 'No queued animations after release');
  const disabledPosition = await disabled.boundingBox();
  await page.mouse.move(disabledPosition.x + 10, disabledPosition.y + 10); await page.mouse.down(); await settle();
  assert.equal(await disabled.getAttribute('data-pressed'), null);
  assert.equal(await disabled.locator('.rds-checkbox__box').evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), 1);
  await page.mouse.up();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await delivery.locator('.rds-checkbox__box').evaluate(node => getComputedStyle(node).transitionDuration), '0s');
  await delivery.focus(); await page.keyboard.down('Space');
  assert.equal(await box.evaluate(node => getComputedStyle(node).transform), 'none', 'Reduced motion removes held scaling');
  await page.keyboard.up('Space');
  await page.emulateMedia({ forcedColors: 'active' });
  assert.equal(await delivery.locator('.rds-checkbox__box').evaluate(node => getComputedStyle(node).borderTopWidth), '1px');
  await page.screenshot({ path: path.join(output, 'forced-colors.png'), fullPage: true });
  await page.emulateMedia({ forcedColors: 'none' });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.evaluate(() => { document.documentElement.dir = 'rtl'; document.documentElement.dataset.rdsTheme = 'light'; });
  assert(await page.locator('[data-case] .rds-checkbox').evaluateAll(nodes => nodes.every(node => node.getBoundingClientRect().height >= 40)));
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow at 320px');
  await page.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true });
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  await touch.setContent('<!doctype html><html dir="rtl" data-rds-theme="light"><body><div id="root"></div></body></html>');
  await touch.addStyleTag({ content: styles }); await touch.addScriptTag({ type: 'module', content: script });
  await touch.locator('[data-case]').first().waitFor();
  assert(await touch.evaluate(() => matchMedia('(pointer: coarse)').matches));
  assert(await touch.locator('.rds-checkbox').evaluateAll(nodes => nodes.every(node => node.getBoundingClientRect().width >= 40 && node.getBoundingClientRect().height >= 40)));
  const touchControl = touch.getByRole('checkbox', { name: 'Delivery updates', exact: true });
  const touchBox = touchControl.locator('.rds-checkbox__box');
  const touchRect = await touchControl.boundingBox();
  const touchSession = await touch.context().newCDPSession(touch);
  const touchPoint = { x: touchRect.x + 10, y: touchRect.y + 10 };
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touchPoint] });
  await touch.evaluate(async () => { await new Promise(requestAnimationFrame); await Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))); });
  assert.equal(await touchBox.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).a), pressScale);
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await touchControl.getAttribute('aria-checked').then(value => assert.equal(value, 'true'));
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touchPoint] });
  await touchSession.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
  assert.equal(await touchControl.getAttribute('data-pressed'), null, 'Touch cancellation clears press');
  assert.equal(await touchControl.getAttribute('aria-checked'), 'true', 'Cancelled touch does not select');
  await touch.close();
  assert.deepEqual(errors, []);
  // Side-by-side visual evidence for the disabled recipe decision, built from real component nodes.
  await page.setViewportSize({ width: 1140, height: 1100 });
  await page.evaluate(() => {
    const review = document.createElement('section'); review.id = 'disabled-color-comparison'; review.dir = 'rtl';
    review.style.cssText = 'padding:24px;background:var(--rds-color-surface-base);color:var(--rds-color-ink-primary)';
    const title = document.createElement('h1'); title.textContent = 'مقایسه رنگ چک‌باکس غیرفعال'; review.append(title);
    const grid = document.createElement('div'); grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px';
    for (const option of ['previous', 'subtle', 'recommended']) {
      const column = document.createElement('div');
      const heading = document.createElement('h2'); heading.textContent = { previous:'قبلی', subtle:'زمینه ملایم', recommended:'پیشنهاد جدید' }[option]; column.append(heading);
      for (const type of ['simple', 'item-desc']) for (const state of ['unchecked', 'checked', 'mixed']) {
        const original = document.querySelector(`[data-case="${type}/${state}/disabled"] .rds-checkbox`);
        const clone = original.cloneNode(true); clone.removeAttribute('aria-labelledby'); clone.removeAttribute('aria-describedby');
        clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        clone.style.marginBlockEnd = '12px';
        clone.style.display = type === 'item-desc' ? 'grid' : 'flex'; clone.style.inlineSize = '100%'; clone.style.justifyContent = 'flex-start';
        if (state === 'unchecked' && option !== 'recommended') clone.style.setProperty('--rds-checkbox-fill', option === 'previous' ? 'var(--rds-color-surface-sunken)' : 'var(--rds-color-surface-subtle)');
        if (state !== 'unchecked' && option === 'previous') clone.style.setProperty('--rds-checkbox-mark', 'var(--rds-color-ink-primary)');
        column.append(clone);
      }
      grid.append(column);
    }
    review.append(grid); document.body.append(review);
    document.querySelector('#root').style.display = 'none';
  });
  for (const theme of ['light', 'dark']) {
    await page.evaluate(theme => { document.documentElement.dataset.rdsTheme = theme; document.documentElement.dataset.rdsContrast = 'standard'; }, theme);
    await page.locator('#disabled-color-comparison').screenshot({ path: path.join(output, `disabled-comparison-${theme}.png`) });
  }
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ motionRecipe: { reference: 'ref.motion.scale.0-923', semantic: 'rds.motion.scale.pressed', scale: pressScale, overrideChecks: 'passed' }, findings, disabledColors, contrastFindings, interactions: 'passed', visualContrast: contrastFindings.length ? 'review-required' : 'passed', approval: 'pending' }, null, 2));
  console.log(`Checked ${findings.length * 18} style cases and interactions. ${contrastFindings.length} unchecked-fill contrast findings require review; this is not an overall accessibility pass. Human approval pending.`);
} finally { await browser.close(); }
