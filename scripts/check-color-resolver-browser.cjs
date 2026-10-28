const fs = require('node:fs');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(process.env.RAHINO_PLAYWRIGHT_PATH || path.join(process.env.USERPROFILE || process.env.HOME, '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
(async () => {
  process.chdir(path.resolve(__dirname, '../src/foundations/canonical'));
  const check = require(path.resolve('master-tokens/scripts/color-resolver-browser-check.cjs'));
  const css = fs.readFileSync('master-tokens/generated/tokens.css', 'utf8');
  const executablePath = process.env.RAHINO_CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(file => fs.existsSync(file));
  const browser = await playwright.chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.setContent('<!doctype html><html dir="rtl" data-rds-script="fa"><head><style>' + css + '</style></head><body><div data-rds-script="latin" style="letter-spacing:2px"><p id="body" class="rds-type-body-md">Resolver integration</p></div></body></html>');
    console.log(JSON.stringify({ validation: 'PASS', colorResolver: await check(page) }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
