import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root = fileURLToPath(new URL('..', import.meta.url));
const bundle = await build({ root, configFile: false, plugins: [react()], resolve: { alias: { '@': path.join(root, 'src') } }, define: { 'process.env.NODE_ENV': '"production"' }, build: { write: false, lib: { entry: path.join(root, 'scripts/foundation-audit-review-fixture.tsx'), formats: ['es'] } } });
const script = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(result => result.output).find(asset => asset.type === 'chunk').code;
const cssDirectory = path.join(root, '../rahino-ui-frontend/dist/assets');
const css = fs.readdirSync(cssDirectory).filter(name => name.endsWith('.css')).map(name => fs.readFileSync(path.join(cssDirectory, name), 'utf8')).join('\n');
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
try {
  const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, reducedMotion: 'reduce' });
  const errors = []; page.on('pageerror', error => errors.push(String(error)));
  await page.setContent('<!doctype html><html dir="rtl"><body><div id="root"></div></body></html>');
  await page.addStyleTag({ content: css }); await page.addScriptTag({ type: 'module', content: script });
  await page.locator('#helpers').waitFor();
  for (const theme of ['light', 'dark']) {
    await page.locator('main').evaluate((el, theme) => { el.setAttribute('data-rds-theme', theme); el.setAttribute('data-appearance', theme); }, theme);
    const actual = await page.locator('#helpers').evaluate(el => {
      const style = getComputedStyle(el), primary = style.getPropertyValue('--rds-color-ink-primary').trim(), secondary = style.getPropertyValue('--rds-color-ink-secondary').trim();
      const normalize = color => { const probe = document.createElement('span'); probe.style.color = color; el.append(probe); const result = getComputedStyle(probe).color; probe.remove(); return result; };
      return { primary: normalize(primary), secondary: normalize(secondary), money: Array.from(el.querySelectorAll('.rds-table__money'), node => getComputedStyle(node).color), idRadius: getComputedStyle(el.querySelector('.rds-table__id-prefix')).borderRadius, actionRadius: getComputedStyle(el.querySelector('button')).borderRadius };
    });
    assert.deepEqual(actual.money, [actual.secondary, actual.primary]); assert.equal(actual.idRadius, '8px'); assert.equal(actual.actionRadius, '8px');
    assert.equal(await page.locator('#helpers button svg').count(), 1);
  }
  await page.getByRole('button', { name: 'مشاهده', exact: true }).click(); assert.equal(await page.locator('#calls').textContent(), '1', 'Row action does not trigger parent activation');
  assert.equal(await page.locator('.rds-data-state__spinner').evaluate(el => getComputedStyle(el).animationName), 'none');
  assert.equal(await page.locator('.rds-data-state__spinner').evaluate(el => getComputedStyle(el).strokeWidth), '2.25px');
  await page.getByRole('button', { name: 'Open confirmation', exact: true }).click();
  const confirmation = page.getByRole('alertdialog'); await confirmation.waitFor();
  const confirm = confirmation.getByRole('button', { name: 'تأیید', exact: true }), cancel = confirmation.getByRole('button', { name: 'انصراف', exact: true });
  assert((await confirm.boundingBox()).x > (await cancel.boundingBox()).x, 'Primary at RTL right');
  assert(await confirm.evaluate((el, cancelText) => !!Array.from(el.parentElement.querySelectorAll('button')).find(node => node.textContent.includes(cancelText)) && el === el.parentElement.querySelector('button'), 'انصراف'), 'DOM order starts with confirm');
  assert.equal(await cancel.evaluate(el => el === document.activeElement), true, 'Initial focus is the safe action');
  await page.keyboard.press('Escape'); await confirmation.waitFor({ state: 'detached' });
  await page.getByRole('button', { name: 'Open pickers', exact: true }).click();
  const modal = page.getByRole('dialog', { name: 'Pickers' });
  const date = modal.getByPlaceholder('Pick a date');
  await date.click();
  const calendar = modal.locator('.qipper-pdp-popover');
  assert(await calendar.isVisible());
  const calendarDay = calendar.locator('button').last();
  assert(await calendarDay.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return el.contains(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2));
  }), 'Calendar is hit-testable above the modal scroller');
  await date.press('Escape'); assert(await modal.isVisible()); assert.equal(await calendar.count(), 0);
  const time = modal.getByRole('button', { name: 'Time', exact: true });
  await time.click(); assert(await modal.getByRole('button', { name: '09', exact: true }).isVisible());
  await time.press('Escape'); assert(await modal.isVisible());
  const close = modal.getByRole('button', { name: 'Close', exact: true }); await close.focus(); await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
  assert.equal(await close.evaluate(el => getComputedStyle(el).outlineWidth), '2px'); assert.equal(await close.locator('svg').count(), 1);
  await close.click(); await modal.waitFor({ state: 'detached' }); assert.deepEqual(errors, []);
  console.log('PASS: table helper semantic colors in both themes, native radius, one-icon row action and propagation, reduced-motion loading, RTL confirmation DOM/visual order and canonical modal close focus.');
} finally { await browser.close(); }
