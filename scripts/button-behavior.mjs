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

await server.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
