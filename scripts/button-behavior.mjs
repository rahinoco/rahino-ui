import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({
  root: fileURLToPath(new URL('..', import.meta.url)),
  configFile: false,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src/', import.meta.url)),
    },
  },
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const { default: Button } = await server.ssrLoadModule(fileURLToPath(new URL('../src/components/Button.tsx', import.meta.url)));
const { default: IconButton } = await server.ssrLoadModule(fileURLToPath(new URL('../src/components/IconButton.tsx', import.meta.url)));
const { default: ToggleButton } = await server.ssrLoadModule(fileURLToPath(new URL('../src/components/ToggleButton.tsx', import.meta.url)));

const failures = [];
function check(name, ok) {
  if (!ok) failures.push(name);
  console.log(ok ? 'ok' : 'FAIL', name);
}

const plain = renderToStaticMarkup(createElement(Button, null, 'ادامه'));
check('default type button', plain.includes('type="button"'));
check('default soft', plain.includes('data-appearance="soft"'));
check('default neutral', plain.includes('data-intent="neutral"'));
check('default md', plain.includes('data-size="md"'));

const disabled = renderToStaticMarkup(createElement(Button, { disabled: true }, 'بسته'));
check('disabled attribute', disabled.includes(' disabled'));

const loading = renderToStaticMarkup(createElement(Button, { loading: true, loadingLabel: 'در حال ثبت' }, 'ثبت'));
check('loading keeps enabled', !/\sdisabled(=|>|\s)/.test(loading));
check('loading aria-busy', loading.includes('aria-busy="true"'));
check('loading aria-disabled', loading.includes('aria-disabled="true"'));
check('loading name', loading.includes('در حال ثبت'));

const link = renderToStaticMarkup(createElement(Button, { href: '/costs' }, 'هزینه‌ها'));
check('href is anchor', link.startsWith('<a ') && link.includes('href="/costs"'));
const blockedLink = renderToStaticMarkup(createElement(Button, { href: '/costs', loading: true }, 'هزینه‌ها'));
check('loading link drops href', !blockedLink.includes('href='));

const icon = renderToStaticMarkup(createElement(IconButton, { 'aria-label': 'حذف' }, 'x'));
check('icon name', icon.includes('aria-label="حذف"'));
check('icon square flag', icon.includes('data-icon-only="true"'));

const toggle = renderToStaticMarkup(createElement(ToggleButton, { defaultPressed: true }, 'نشان'));
check('aria-pressed', toggle.includes('aria-pressed="true"'));
const toggleOff = renderToStaticMarkup(createElement(ToggleButton, { pressed: false }, 'نشان'));
check('controlled off', toggleOff.includes('aria-pressed="false"'));

const submit = renderToStaticMarkup(createElement(Button, { type: 'submit' }, 'ارسال'));
check('explicit submit', submit.includes('type="submit"'));

const startIcon = createElement('svg', { 'data-example-icon': 'start' });
const endIcon = createElement('svg', { 'data-example-icon': 'end' });
const countIcons = markup => (markup.match(/<svg(?:\s|>)/g) || []).length;
for (const radius of ['less', 'more']) {
  const both = renderToStaticMarkup(createElement(Button, { radius, iconStart: startIcon, iconEnd: endIcon }, 'ثبت'));
  check(radius + ' button chooses one icon when both props are supplied', countIcons(both) === 1 && both.includes('data-example-icon="start"') && !both.includes('data-example-icon="end"'));
  const pending = renderToStaticMarkup(createElement(Button, { radius, iconStart: startIcon, iconEnd: endIcon, loading: true }, 'ثبت'));
  check(radius + ' loading replaces both action icons with one spinner', countIcons(pending) === 1 && pending.includes('rds-button__spinner') && !pending.includes('data-example-icon='));
  const trailing = renderToStaticMarkup(createElement(Button, { radius, iconEnd: endIcon, mirrorEnd: true, loading: true }, 'ثبت'));
  check(radius + ' trailing loading icon keeps its position without mirroring', countIcons(trailing) === 1 && trailing.indexOf('rds-button__label') < trailing.indexOf('rds-button__spinner') && !trailing.includes('data-mirror="true"'));
  for (const pressed of [false, true]) for (const loading of [false, true]) {
    const selectedWithIcon = renderToStaticMarkup(createElement(ToggleButton, { radius, pressed, loading, iconStart: startIcon, iconEnd: endIcon }, 'فهرست'));
    check(`${radius} toggle pressed=${pressed} loading=${loading} has one icon`, countIcons(selectedWithIcon) === 1 && (loading ? selectedWithIcon.includes('rds-button__spinner') : selectedWithIcon.includes('data-example-icon="start"')));
    const iconOnly = renderToStaticMarkup(createElement(ToggleButton, { radius, pressed, loading, iconEnd: endIcon, 'aria-label': 'فهرست' }));
    check(`${radius} icon-only toggle pressed=${pressed} loading=${loading} has one icon`, countIcons(iconOnly) === 1 && iconOnly.includes(`aria-pressed="${pressed}"`));
  }
  const selectedText = renderToStaticMarkup(createElement(ToggleButton, { radius, pressed: true }, 'انتخاب'));
  check(radius + ' text-only selected toggle has a single checkmark', countIcons(selectedText) === 1 && selectedText.includes('lucide-check'));
  const selectedPending = renderToStaticMarkup(createElement(ToggleButton, { radius, pressed: true, loading: true }, 'انتخاب'));
  check(radius + ' selected loading toggle has spinner without checkmark', countIcons(selectedPending) === 1 && selectedPending.includes('rds-button__spinner') && !selectedPending.includes('lucide-check'));
  const iconPending = renderToStaticMarkup(createElement(IconButton, { radius, loading: true, 'aria-label': 'افزودن' }, startIcon));
  check(radius + ' loading IconButton replaces the supplied icon', countIcons(iconPending) === 1 && iconPending.includes('rds-button__spinner') && !iconPending.includes('data-example-icon='));
  const mirroredPending = renderToStaticMarkup(createElement(IconButton, { radius, mirror: true, loading: true, 'aria-label': 'ادامه' }, startIcon));
  check(radius + ' loading IconButton never mirrors its spinner', !mirroredPending.includes('data-mirror="true"'));
}

await server.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
