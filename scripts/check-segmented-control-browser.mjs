import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const root = fileURLToPath(new URL('..', import.meta.url));
const output = path.join(root, 'tmp-verify/segmented-control');
fs.mkdirSync(output, { recursive: true });
const bundle = await build({ root, configFile: false, plugins: [react()], define: { 'process.env.NODE_ENV': '"production"' }, build: { write: false, lib: { entry: path.join(root, 'scripts/segmented-control-review-fixture.tsx'), formats: ['es'], fileName: 'review' } } });
const assets = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(result => result.output);
const styles = assets.filter(asset => asset.type === 'asset' && asset.fileName.endsWith('.css')).map(asset => asset.source).join('\n');
const script = assets.find(asset => asset.type === 'chunk').code;
const browser = await playwright.chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [], findings = [];
let cases = 0;
const html = '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}main{padding:24px;min-height:100vh;box-sizing:border-box;background:var(--rds-color-surface-canvas);color:var(--rds-color-ink-primary);font-family:var(--rds-font-family-fa)}#subject{display:flex;margin-block:24px;width:fit-content}#subject[data-full-width=true]{width:100%}#changes{display:block;margin:24px}#independent,#uncontrolled{display:flex;margin-block:24px}</style></head><body><div id="root"></div></body></html>';
const mount = async page => { page.on('pageerror', error => errors.push(String(error))); await page.setContent(html); await page.addStyleTag({ content: styles }); await page.addScriptTag({ type: 'module', content: script }); await page.locator('#subject button').first().waitFor(); await page.evaluate(() => document.fonts.ready); };
const configure = async (page, patch) => { await page.evaluate(p => window.configureSegments(p), patch); await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); };
const state = async page => JSON.parse(await page.locator('#changes').textContent());
async function checkClippedSelection(page, dir, activate, reducedMotion = false) {
  await configure(page, { dir, size: 'sm' });
  const subject = page.locator('#subject');
  const option = subject.getByRole('button').nth(2);
  await subject.evaluate(el => {
    const button = el.querySelector('button');
    el.style.maxInlineSize = `${button.getBoundingClientRect().width * 2.5}px`;
  });
  const geometry = () => option.evaluate(el => {
    const viewport = el.closest('.rds-segmented__viewport');
    const bounds = viewport.getBoundingClientRect(), button = el.getBoundingClientRect();
    const left = Math.max(bounds.left, button.left), right = Math.min(bounds.right, button.right);
    return { x: (left + right) / 2, y: button.top + button.height / 2, visible: right - left, width: button.width, scroll: viewport.scrollLeft, pageX: window.scrollX, pageY: window.scrollY };
  });
  const before = await geometry();
  assert(before.visible > 0 && before.visible < before.width - 1, `${dir}: target starts partially visible`);
  await option.evaluate(el => {
    const viewport = el.closest('.rds-segmented__viewport');
    delete el.dataset.revealSettled;
    window.addEventListener('click', () => {
      el.dataset.scrollOnClick = String(viewport.scrollLeft);
    }, { once: true });
    viewport.addEventListener('scrollend', () => {
      el.dataset.revealSettled = 'true';
    }, { once: true });
  });
  // Use the visible slice directly so Playwright does not scroll the button into view for us.
  await activate(before.x, before.y);
  assert.equal((await state(page)).value, 'c', `${dir}: clipped option activates`);
  assert.equal(Number(await option.getAttribute('data-scroll-on-click')) !== before.scroll, reducedMotion, 'Only reduced motion scrolls during the click event');
  await subject.locator('[data-reveal-settled="true"]').waitFor();
  const after = await geometry();
  assert(after.visible >= after.width - 1, `${dir}: the selected option is fully visible`);
  assert.notEqual(after.scroll, before.scroll);
  assert.equal(after.pageX, before.pageX); assert.equal(after.pageY, before.pageY);
  const calls = (await state(page)).calls;
  await activate(after.x, after.y);
  assert.equal((await geometry()).scroll, after.scroll, 'A visible selection does not move');
  assert.equal((await state(page)).calls, calls, 'Repeating a selection does not emit a change');
  await subject.evaluate(el => { el.style.removeProperty('max-inline-size'); });
  await subject.getByRole('button').first().click();
}
function rgb(value) { return value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 0]; }
function over(top, bottom) { const a = top[3] ?? 1; return top.slice(0, 3).map((v, i) => v * a + bottom[i] * (1 - a)); }
function ratio(a, b) { const lum = color => color.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((v, n, i) => v + n * [.2126, .7152, .0722][i], 0); const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); }
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 850 } }); await mount(page);
  const items = page.locator('#subject button');
  await page.locator('#before').focus(); await page.keyboard.press('Tab'); assert(await items.nth(0).evaluate(el => el === document.activeElement));
  await page.keyboard.press('ArrowRight'); assert.equal((await state(page)).value, 'c', 'Skip disabled');
  await page.keyboard.press('ArrowRight'); assert.equal((await state(page)).value, 'd');
  await page.keyboard.press('ArrowRight'); assert.equal((await state(page)).value, 'a', 'Wrap');
  const calls = (await state(page)).calls; await items.nth(0).click(); assert.equal((await state(page)).calls, calls, 'No deselection or duplicate callback');
  await items.nth(1).evaluate(el => el.click()); assert.equal((await state(page)).calls, calls, 'Disabled cannot activate');
  await items.nth(0).press('End'); assert.equal((await state(page)).value, 'd');
  await items.nth(3).press('Home'); assert.equal((await state(page)).value, 'a');
  await configure(page, { dir: 'rtl' }); await items.nth(0).press('ArrowLeft'); assert.equal((await state(page)).value, 'c', 'RTL follows visual direction');
  await configure(page, { manual: true, dir: 'ltr' }); await items.nth(2).press('ArrowRight'); assert.equal((await state(page)).value, 'c', 'Manual arrows only focus');
  await page.keyboard.press('Space'); assert.equal((await state(page)).value, 'd');
  await items.nth(3).press('Home'); assert.equal((await state(page)).value, 'd'); await page.keyboard.press('Enter'); assert.equal((await state(page)).value, 'a');
  await items.nth(0).press('ArrowRight'); await page.keyboard.press('Tab'); assert(await page.locator('#after').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Shift+Tab'); assert(await items.nth(0).evaluate(el => el === document.activeElement), 'Reentry returns to selected');
  await configure(page, { selectedDisabled: true }); assert(await items.nth(0).isDisabled()); assert.equal(await items.nth(2).getAttribute('tabindex'), '0');
  await configure(page, { selectedDisabled: false, removed: true }); assert.equal(await items.nth(1).getAttribute('aria-pressed'), 'true', 'Removed value fallback');
  await configure(page, { removed: false, invalid: true }); assert.equal(await items.nth(0).getAttribute('aria-pressed'), 'true');
  await configure(page, { invalid: false, allDisabled: true }); assert.equal(await page.locator('#subject button[tabindex="0"]').count(), 0);
  await configure(page, { allDisabled: false, manual: false });
  assert.equal(await page.locator('#empty').count(), 0); assert.equal(await page.locator('#uncontrolled button[aria-pressed="true"]').textContent(), 'تابلو');
  await page.locator('#uncontrolled button').last().click(); assert.equal(await page.locator('#uncontrolled button[aria-pressed="true"]').textContent(), 'تقویم');
  assert.equal(await page.locator('#independent button[aria-pressed="true"]').textContent(), 'فهرست', 'Instances independent');
  for (const dir of ['ltr', 'rtl']) await checkClippedSelection(page, dir, (x, y) => page.mouse.click(x, y));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await checkClippedSelection(page, 'rtl', (x, y) => page.mouse.click(x, y), true);
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) for (const dir of ['rtl', 'ltr']) for (const tone of ['neutral', 'brand']) for (const size of ['sm', 'md', 'lg']) for (const icons of [false, true]) {
    await configure(page, { theme, contrast, dir, tone, size, icons, disabled: false });
    assert((await page.locator('main').evaluate(el => getComputedStyle(el).colorScheme)).includes(theme), 'Theme actually resolves on the fixture');
    const context = { theme, contrast, dir, tone, size, icons };
    for (const reviewState of ['rest', 'hover-unselected', 'press-unselected', 'hover-selected', 'press-selected', 'focus', 'disabled']) {
      await page.mouse.move(950, 800); await items.nth(0).evaluate(el => el.blur());
      const selectedIndex = 0, target = reviewState.includes('unselected') ? items.nth(2) : items.nth(selectedIndex);
      if (reviewState === 'disabled') await configure(page, { disabled: true });
      if (reviewState.includes('hover') || reviewState.includes('press')) await target.hover();
      if (reviewState.includes('press')) await page.mouse.down();
      if (reviewState === 'focus') { await page.locator('#before').focus(); await page.keyboard.press('Tab'); }
      // Finish paint transitions so contrast measurements use the actual end state.
      await page.waitForTimeout(165);
      const actual = await target.evaluate(el => {
        const style = getComputedStyle(el), track = el.closest('.rds-segmented__track');
        const plate = track.querySelector('.rds-segmented__plate');
        return { radius: style.borderRadius, trackHeight: track.getBoundingClientRect().height, plateHeight: plate.getBoundingClientRect().height, border: style.borderWidth, shadow: style.boxShadow, color: style.color, overlay: style.backgroundColor, selected: el.getAttribute('aria-pressed') === 'true', plate: getComputedStyle(plate).backgroundColor, track: getComputedStyle(el.closest('.rds-segmented__viewport')).backgroundColor, focus: style.outlineColor, focusWidth: style.outlineWidth, focusOffset: style.outlineOffset, icons: el.querySelectorAll('svg').length, mark: getComputedStyle(el, '::after').backgroundColor };
      });
      assert.equal(actual.radius, '8px'); assert.equal(actual.border, '0px'); assert.equal(actual.shadow, 'none'); assert.equal(actual.icons, icons ? 1 : 0);
      assert.equal(actual.trackHeight, { sm: 32, md: 40, lg: 48 }[size]);
      assert.equal(actual.plateHeight, actual.trackHeight - 8);
      assert.equal(await page.locator('#subject button[aria-pressed="true"]').count(), 1);
      if (reviewState === 'focus') { assert.equal(actual.focusWidth, '2px'); assert.equal(actual.focusOffset, '0px'); }
      if (reviewState !== 'disabled') {
        const bg = over(rgb(actual.overlay), actual.selected ? rgb(actual.plate) : rgb(actual.track));
        const textContrast = ratio(rgb(actual.color), bg);
        if (textContrast < 4.5) findings.push({ ...context, state: reviewState, role: 'text', ratio: Number(textContrast.toFixed(4)), target: 4.5 });
        if (reviewState === 'focus') { const focusContrast = ratio(rgb(actual.focus), bg); if (focusContrast < 3) findings.push({ ...context, state: reviewState, role: 'focus', ratio: Number(focusContrast.toFixed(4)), target: 3 }); }
      }
      if (reviewState.includes('press')) { await page.mouse.move(950, 800); await page.mouse.up(); }
      cases++;
    }
  }
  await configure(page, { disabled: false, dir: 'rtl', size: 'md', icons: true, contrast: 'standard', theme: 'light' });
  for (const tone of ['neutral', 'brand']) for (const theme of ['light', 'dark']) {
    await configure(page, { tone, theme }); await page.locator('#before').focus(); await page.keyboard.press('Tab');
    await page.screenshot({ path: path.join(output, `${tone}-${theme}.png`) });
  }
  // Rapid retargeting settles over the selected item without changing other instances.
  await configure(page, { dir: 'ltr', theme: 'light', tone: 'neutral' });
  await items.nth(0).focus(); await page.keyboard.press('End'); await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(190);
  const aligned = await page.locator('#subject').evaluate(el => { const a = el.querySelector('[aria-pressed=true]').getBoundingClientRect(), b = el.querySelector('.rds-segmented__plate').getBoundingClientRect(); return Math.abs(a.x - b.x) < 1 && Math.abs(a.width - b.width) < 1; }); assert(aligned);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.locator('#subject .rds-segmented__plate').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await items.nth(0).hover(); await page.mouse.down(); assert.equal(await items.nth(0).locator('.rds-segmented__content').evaluate(el => getComputedStyle(el).transform), 'none'); await page.mouse.move(950, 800); await page.mouse.up();
  await page.emulateMedia({ forcedColors: 'active' }); await page.locator('#before').focus(); await page.keyboard.press('Tab'); await page.screenshot({ path: path.join(output, 'forced-colors.png') });
  await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'no-preference' });
  await configure(page, { fullWidth: true, long: true, size: 'lg' }); await page.setViewportSize({ width: 320, height: 844 });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No page overflow at 320px');
  await items.nth(0).focus(); await items.nth(0).press('End');
  const visible = await items.last().evaluate(el => { const a = el.getBoundingClientRect(), b = el.closest('.rds-segmented__viewport').getBoundingClientRect(); return Math.min(a.right, b.right) - Math.max(a.left, b.left) >= Math.min(a.width, b.width) - 1; }); assert(visible, 'Focused overflowing item scrolled into view (a long label may exceed the viewport)');
  await page.screenshot({ path: path.join(output, 'mobile-overflow.png') });
  const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }); const touchPage = await touch.newPage(); await mount(touchPage); await configure(touchPage, { size: 'sm' });
  assert.equal((await touchPage.locator('#subject button').first().boundingBox()).height, 40);
  await checkClippedSelection(touchPage, 'rtl', (x, y) => touchPage.touchscreen.tap(x, y));
  await touch.close();
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ cases, findings, errors, approval: 'pending', testedEngine: 'Chrome', date: '2026-11-06' }, null, 2));
  console.log(`PASS: ${cases} state/context cases and keyboard, pointer, touch, dynamics, overflow, interruptible motion and reduced-motion checks. ${findings.length} contrast findings remain for review; human approval pending.`);
} finally { await browser.close(); }
