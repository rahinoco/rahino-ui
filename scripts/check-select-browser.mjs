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
const output = path.join(root, 'tmp-verify/select');
fs.mkdirSync(output, { recursive: true });
const bundle = await build({ root, configFile: false, plugins: [react()], define: { 'process.env.NODE_ENV': '"production"' },
  build: { write: false, lib: { entry: path.join(root, 'scripts/select-review-fixture.tsx'), formats: ['es'], fileName: 'review' } } });
const assets = (Array.isArray(bundle) ? bundle : [bundle]).flatMap(result => result.output);
const styles = assets.filter(asset => asset.type === 'asset' && asset.fileName.endsWith('.css')).map(asset => asset.source).join('\n');
const script = assets.find(asset => asset.type === 'chunk').code;
const browser = await playwright.chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const errors = [];
const findings = [];
const html = '<!doctype html><html dir="rtl" data-rds-theme="light"><head><style>body{margin:24px;background:var(--rds-color-surface-canvas);color:var(--rds-color-ink-primary);font-family:var(--rds-font-family-fa)}main{max-width:1080px;margin:auto}.review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}section{margin-bottom:24px}.tools,form{margin-block:24px}button:not(.rds-select__option){min-height:44px}.clipped{width:280px;height:110px;overflow:hidden;transform:translateX(0);margin-block:24px}dialog{position:fixed;inset:30% auto auto 30%;width:320px;z-index:10;background:var(--rds-color-surface-base)}@media(max-width:600px){body{margin:12px}.review-grid{grid-template-columns:1fr}.clipped{max-width:100%}}</style></head><body><div id="root"></div></body></html>';
const mount = async page => { page.on('pageerror', error => errors.push(String(error))); await page.setContent(html); await page.addStyleTag({ content: styles }); await page.addScriptTag({ type: 'module', content: script }); await page.locator('#single').waitFor(); };
const state = page => page.locator('#changes').textContent().then(JSON.parse);
const activeLabel = (page, control) => control.getAttribute('aria-activedescendant').then(id => id ? page.locator(`[id="${id}"]`).textContent() : null);
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1100 } });
  await mount(page);
  const single = page.locator('#single'), multi = page.locator('#multi');
  const before = await single.boundingBox();
  assert.equal(before.height, 40, 'Select defaults to the 40px medium size');
  await single.focus(); assert.equal(await single.getAttribute('aria-expanded'), 'false', 'Tab focus alone does not open');
  await single.press('ArrowDown'); assert.equal(await activeLabel(page, single), 'Alpha');
  await single.press('ArrowDown'); assert.equal(await activeLabel(page, single), 'Charlie', 'Skip disabled option');
  assert.equal((await state(page)).single, 'a', 'Navigation does not commit');
  await single.press('Enter'); assert.equal((await state(page)).single, 'c'); assert.equal(await single.getAttribute('aria-expanded'), 'false');
  assert.deepEqual(await single.boundingBox(), before, 'Focus and opening do not resize trigger');
  await single.press('ArrowUp'); assert.equal(await activeLabel(page, single), 'Delta');
  await single.press('Home'); assert.equal(await activeLabel(page, single), 'Alpha');
  await single.press('End'); assert.equal(await activeLabel(page, single), 'Delta');
  await single.press('Escape'); assert.equal((await state(page)).single, 'c');
  await single.press('Space'); await single.press('d'); assert.equal(await activeLabel(page, single), 'Delta');
  assert.equal(await page.getByRole('option').locator('.rds-checkbox__box, svg').count(), 0, 'Single rows have no checkbox or check');
  await single.press('Enter'); assert.equal((await state(page)).single, 'd');
  await single.click(); await page.locator('#outside').click(); assert.equal(await single.getAttribute('aria-expanded'), 'false');
  await single.press('Enter'); await single.press('Tab'); assert.equal(await single.getAttribute('aria-expanded'), 'false');
  assert(await multi.evaluate(node => document.activeElement === node), 'One Tab stop per select');
  await multi.press('Enter'); assert.equal(await page.getByRole('listbox').getAttribute('aria-multiselectable'), 'true');
  assert.equal(await page.getByRole('option').count(), 4);
  assert.equal(await page.getByRole('checkbox').count(), 1, 'No nested checkbox role inside option');
  assert.equal(await page.getByRole('option').locator('.rds-checkbox__box').count(), 4, 'Uses real checkbox recipe');
  await multi.press('Space'); assert.deepEqual((await state(page)).multi, ['a', 'b']);
  await multi.press('ArrowDown'); await multi.press('Enter'); assert.deepEqual((await state(page)).multi, ['a', 'b', 'c']);
  await page.getByRole('option', { name: 'Alpha', exact: true }).click(); assert.deepEqual((await state(page)).multi, ['b', 'c']);
  assert.equal(await multi.getAttribute('aria-expanded'), 'true');
  await multi.press('Escape'); assert.deepEqual((await state(page)).multi, ['b', 'c']);
  const search = page.locator('#search');
  await search.fill('Cha'); assert.equal(await page.getByRole('option').count(), 1);
  await search.press('Enter'); assert.equal(await search.inputValue(), 'Charlie');
  await search.fill('No such option'); assert.equal(await page.getByRole('option').count(), 0); assert(await page.locator('.rds-select__message:visible').isVisible());
  await search.press('Enter'); await search.press('Escape'); assert.equal(await search.inputValue(), 'Charlie', 'Unmatched text is not committed');
  await search.fill('a'); await search.dispatchEvent('compositionstart'); await search.press('Enter'); assert.equal(await search.getAttribute('aria-expanded'), 'true');
  await search.dispatchEvent('compositionend'); await search.press('Escape');
  const multiSearch = page.locator('#multi-search'); await multiSearch.fill('Alpha'); await multiSearch.press('Enter');
  assert.equal(await multiSearch.getAttribute('aria-expanded'), 'true'); await multiSearch.press('Space'); assert((await multiSearch.inputValue()).includes(' '), 'Space preserved for text editing');
  await multiSearch.press('Escape');
  await page.locator('#persian').fill('كيف يك'); assert.equal(await page.getByRole('option').count(), 1, 'Arabic/Persian yeh and kaf normalize'); await page.locator('#persian').press('Escape');
  await page.locator('#duplicates').click(); assert.equal(await page.getByRole('option').count(), 2); await page.locator('#duplicates').press('Escape');
  await page.locator('#all-disabled').click(); assert.equal(await page.locator('#all-disabled').getAttribute('aria-activedescendant'), null); await page.locator('#all-disabled').press('Enter'); await page.locator('#all-disabled').press('Escape');
  assert.equal(await page.locator('#null').inputValue(), '');
  assert.equal(await page.getByRole('combobox', { name: 'Named filter' }).count(), 1);
  assert.equal(await page.locator('#hint').getAttribute('aria-describedby'), 'hint-hint');
  assert.equal(await page.locator('#error').getAttribute('aria-describedby'), 'error-error'); assert.equal(await page.locator('#error').getAttribute('aria-invalid'), 'true');
  // Prop changes while open: stale menu must not accept input.
  await single.click(); await page.getByRole('button', { name: 'Toggle disabled', exact: true }).evaluate(node => node.click());
  assert.equal(await single.getAttribute('aria-expanded'), 'false'); assert(await single.isDisabled());
  await page.getByRole('button', { name: 'Toggle disabled', exact: true }).click();
  await single.click(); await page.getByRole('button', { name: 'Toggle readonly', exact: true }).evaluate(node => node.click());
  assert.equal(await single.getAttribute('aria-expanded'), 'false'); await single.press('Enter'); assert.equal(await single.getAttribute('aria-expanded'), 'false');
  await page.getByRole('button', { name: 'Toggle readonly', exact: true }).click();
  await single.click(); await page.getByRole('button', { name: 'Toggle loading', exact: true }).evaluate(node => node.click());
  assert.equal(await page.getByRole('option').count(), 0); assert.equal(await single.getAttribute('aria-activedescendant'), null); await single.press('Enter'); assert.equal((await state(page)).single, 'd');
  await page.getByRole('button', { name: 'Toggle loading', exact: true }).evaluate(node => node.click()); assert.equal(await page.getByRole('option').count(), 4); await single.press('Escape');
  await single.click(); await page.getByRole('button', { name: 'Toggle options', exact: true }).evaluate(node => node.click()); assert.equal(await page.getByRole('option').count(), 0); assert.equal(await single.getAttribute('aria-activedescendant'), null);
  await single.press('Escape'); assert.equal(await single.inputValue(), ''); await page.getByRole('button', { name: 'Toggle options', exact: true }).click();
  // Native form serialization, constraint validation, reset, and external association.
  const formData = () => page.locator('#form').evaluate(form => [...new FormData(form).entries()]);
  assert.deepEqual(await formData(), [['single', 'a'], ['multi', 'a'], ['multi', 'b'], ['empty', ''], ['readonly', 'c'], ['external', 'd']]);
  await page.getByRole('button', { name: 'Submit', exact: true }).click(); assert(await page.locator('#form-empty').evaluate(node => document.activeElement === node));
  await page.locator('#form-empty').press('Enter'); await page.locator('#form-empty').press('Enter');
  assert(await page.locator('#form').evaluate(form => form.checkValidity()));
  await page.locator('#form-single').click(); await page.getByRole('option', { name: 'Charlie', exact: true }).click();
  await page.locator('#form-multi').click(); await page.getByRole('option', { name: 'Delta', exact: true }).click(); await page.locator('#form-multi').press('Escape');
  assert((await formData()).some(([key, value]) => key === 'single' && value === 'c'));
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  assert.equal(await page.locator('#form-single').inputValue(), 'Alpha'); assert.equal(await page.locator('#form-multi').inputValue(), 'Alpha، Beta');
  const resetData = await formData();
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  assert.deepEqual(await formData(), resetData, 'Repeated reset keeps native and visible values synchronized');
  // Escape remains local before reaching enclosing dialog.
  await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
  await page.locator('#dialog-select').click(); await page.locator('#dialog-select').press('Escape'); assert(await page.locator('dialog').isVisible());
  await page.locator('#dialog-select').press('Escape'); assert.equal(await page.locator('dialog').count(), 0);
  await page.getByRole('checkbox', { name: 'Checkbox regression' }).click(); assert.equal(await page.getByRole('checkbox', { name: 'Checkbox regression' }).getAttribute('aria-checked'), 'true');
  // Style matrix, including open menus, against all theme/direction combinations.
  const fieldHeights = { sm: 32, md: 40, lg: 48 };
  for (const theme of ['light', 'dark']) for (const contrast of ['standard', 'more']) for (const dir of ['rtl', 'ltr']) {
    await page.evaluate(context => { document.documentElement.dir = context.dir; Object.assign(document.documentElement.dataset, { rdsTheme: context.theme, rdsContrast: context.contrast }); }, { theme, contrast, dir });
    for (const wrapper of await page.locator('[data-case]').all()) {
      const key = await wrapper.getAttribute('data-case');
      const field = wrapper.locator('.rds-select__field'), control = wrapper.locator('input');
      const css = await field.evaluate(node => { const style = getComputedStyle(node); return { radius: style.borderRadius, border: style.borderTopWidth, height: node.getBoundingClientRect().height, bg: style.backgroundColor }; });
      const expectedHeight = fieldHeights[key.split('/')[1]];
      assert.equal(css.radius, '12px'); assert.equal(css.border, '0px');
      assert.equal(css.height, expectedHeight, `${key}: field height`);
      const stateName = key.split('/').at(-1);
      const role = stateName === 'disabled' ? 'surface-subtle' : stateName === 'readonly' ? 'surface-base' : stateName === 'error' ? 'status-error-bg' : 'surface-sunken';
      const expected = await field.evaluate((node, role) => { const probe = document.createElement('i'); probe.style.backgroundColor = `var(--rds-color-${role})`; node.append(probe); const value = getComputedStyle(probe).backgroundColor; probe.remove(); return value; }, role);
      assert.equal(css.bg, expected, `${key}: foundation surface`);
      if (stateName !== 'disabled') {
        await control.focus();
        const ring = await field.evaluate(node => { const style = getComputedStyle(node, '::after'); return { opacity: style.opacity, shadow: style.boxShadow, inset: style.inset }; });
        assert.equal(ring.opacity, '1'); assert(ring.shadow.includes('inset') && ring.shadow.includes('2px')); assert.equal(ring.inset, '0px');
      } else assert(await control.isDisabled());
      if (!['disabled', 'readonly'].includes(stateName)) {
        await control.click(); assert.equal(await control.getAttribute('aria-expanded'), 'true');
        const popup = wrapper.locator('.rds-select__menu');
        assert(await popup.evaluate(node => node.matches(':popover-open')));
        const menuStyle = await popup.evaluate(node => { const style = getComputedStyle(node); return { radius: style.borderRadius, shadow: style.boxShadow, bg: style.backgroundColor, rect: node.getBoundingClientRect().toJSON() }; });
        assert.equal(menuStyle.radius, '12px'); assert(menuStyle.shadow !== 'none');
        assert(menuStyle.rect.x >= 7 && menuStyle.rect.right <= 1193 && menuStyle.rect.bottom <= 1093 && menuStyle.rect.y >= 7, `${key}: menu within viewport`);
        for (const option of await popup.getByRole('option').all()) {
          assert((await option.boundingBox()).height >= Math.max(expectedHeight, 40), `${key}: option height`);
          const row = await option.evaluate(node => { const style = getComputedStyle(node); return { outline: style.outlineWidth, shadow: style.boxShadow, fill: style.backgroundColor }; });
          assert.equal(row.outline, '0px', `${key}: options never have a focus ring`);
          assert.equal(row.shadow, 'none');
          assert.equal(row.fill, 'rgba(0, 0, 0, 0)', `${key}: no persistent selected-row fill`);
        }
        assert.equal(await popup.locator('[data-active]').count(), 0, `${key}: pointer opening does not highlight the previous selection`);
        await control.press('Escape');
      }
      findings.push({ theme, contrast, dir, key, ...css });
    }
  }
  // Clipping, viewport edge flip, and scrolling the active descendant.
  await page.locator('#clipped').click(); const clippedMenu = page.locator('#clipped').locator('xpath=../..').locator('.rds-select__menu');
  const hit = await clippedMenu.getByRole('option').first().evaluate(node => { const rect = node.getBoundingClientRect(); return document.elementFromPoint(rect.x + 20, rect.y + 20)?.closest('[role="option"]') === node; });
  assert(hit, 'Top layer escapes a transformed overflow-hidden parent'); await page.locator('#clipped').press('Escape');
  await page.locator('#long').evaluate(node => { node.closest('.rds-select').style.cssText = 'position:fixed;bottom:16px;left:16px;width:280px;z-index:10'; });
  await page.locator('#long').click(); const longMenu = page.locator('#long').locator('xpath=../..').locator('.rds-select__menu');
  assert.equal(await longMenu.getAttribute('data-placement'), 'top');
  await page.locator('#long').press('End'); assert((await longMenu.evaluate(node => node.scrollTop)) > 0); await page.locator('#long').press('Escape');
  await page.locator('#long').evaluate(node => node.closest('.rds-select').style.cssText = '');
  // Visual evidence from real controls in both themes.
  await page.evaluate(() => { document.querySelector('#behavior').scrollIntoView(); document.documentElement.dir = 'rtl'; document.documentElement.dataset.rdsContrast = 'standard'; });
  for (const theme of ['light', 'dark']) {
    await page.evaluate(theme => document.documentElement.dataset.rdsTheme = theme, theme);
    await single.click(); await page.screenshot({ path: path.join(output, `${theme}-single.png`) }); await single.press('Escape');
    await multi.click(); await page.screenshot({ path: path.join(output, `${theme}-multiple.png`) }); await multi.press('Escape');
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await single.locator('xpath=..').evaluate(node => getComputedStyle(node, '::before').transitionDuration), '0s');
  await page.emulateMedia({ forcedColors: 'active' }); await multi.click();
  assert.equal(await multi.locator('xpath=..').evaluate(node => getComputedStyle(node).outlineWidth), '2px');
  await page.screenshot({ path: path.join(output, 'forced-colors.png') }); await multi.press('Escape');
  await page.emulateMedia({ forcedColors: 'none' });
  await page.setViewportSize({ width: 320, height: 844 }); await multi.click();
  const mobileMenu = await page.getByRole('listbox').locator('xpath=..').boundingBox(); assert(mobileMenu.x >= 7 && mobileMenu.x + mobileMenu.width <= 313);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow at 320px');
  await page.screenshot({ path: path.join(output, 'mobile.png') }); await multi.press('Escape');
  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true }); await mount(touch);
  await touch.locator('#multi').tap(); await touch.getByRole('option', { name: 'Alpha', exact: true }).tap();
  assert.deepEqual((await state(touch)).multi, ['a', 'b']); assert.equal(await touch.locator('#multi').getAttribute('aria-expanded'), 'true');
  await touch.locator('#outside').tap(); assert.equal(await touch.locator('#multi').getAttribute('aria-expanded'), 'false');
  await touch.close();
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({ styleCases: findings.length, findings, interactions: 'passed', browser: 'Chrome/Chromium', approval: 'pending', limitations: ['Manual screen-reader review pending', 'Inherited foundation field and unchecked checkbox contrast findings require review', 'Other browser engines not tested'] }, null, 2));
  console.log(`PASS: ${findings.length} style cases, keyboard, pointer, touch, forms/reset, dynamic options/states, composition, overflow, modal Escape and viewport placement. Human approval pending.`);
} finally { await browser.close(); }
