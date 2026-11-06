import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { flatten } from '../src/foundations/canonical/master-tokens/scripts/lib.mjs';
const require = createRequire(import.meta.url);
const postcss = require('postcss');
const root = fileURLToPath(new URL('..', import.meta.url));
const workspace = path.dirname(root);
const read = file => fs.readFileSync(path.join(workspace, file), 'utf8');
const cssFiles = [
  ...['button', 'checkbox', 'input', 'select', 'segmented-control', 'data-state', 'DataTable/data-table'].map(name => `rahino-ui/src/components/${name}.css`),
  ...['input-page', 'select-page', 'segmented-control-page', 'data-table-page'].map(name => `rahino-ui-frontend/src/site/components/${name}.css`),
];
const tsFiles = ['Button', 'IconButton', 'ToggleButton', 'buttonShared', 'Checkbox', 'Input', 'Select', 'SegmentedControl', 'DataState', 'Modal', 'ConfirmationModal', 'Card', 'DataTable/DataTable', 'DataTable/DataTableMobileCard', 'DataTable/DataTablePagination', 'DataTable/cells/PrimarySecondaryCell', 'DataTable/cells/TypeBadgeCell', 'DataTable/cells/MoneyCell', 'DataTable/cells/MonoIdCell', 'DataTable/cells/RowActionCell'].map(name => `rahino-ui/src/components/${name}.tsx`);
const master = 'rahino-ui/src/foundations/canonical/master-tokens';
const canonical = new Map();
for (const set of ['shared', 'light', 'dark']) for (const [name, token] of flatten(JSON.parse(read(`${master}/${set}.tokens.json`)))) canonical.set('--' + name.replaceAll('.', '-'), { path: name, type: token.$type });
const styles = JSON.parse(read(`${master}/typography.json`)).entries;
const styleVariables = new Set(styles.flatMap(entry => ['font-size', 'font-weight', 'line-height'].map(prop => '--' + entry.publicPath.replaceAll('.', '-') + '-' + prop)));
const definitions = new Map();
const refs = value => [...value.matchAll(/var\(\s*(--[\w-]+)/g)].map(match => match[1]);
function parse(file) {
  const ast = postcss.parse(read(file), { from: file });
  ast.walkDecls(decl => { if (!decl.prop.startsWith('--')) return; const entries = definitions.get(decl.prop) ?? []; entries.push({ file, line: decl.source.start.line, value: decl.value }); definitions.set(decl.prop, entries); });
  return ast;
}
parse('rahino-ui/src/styles/rds-foundations.css');
const trees = new Map(cssFiles.map(file => [file, parse(file)]));
const runtime = new Set(['--rds-font-family-content', '--rds-table-grid-md', '--rds-table-grid-lg', '--rds-table-grid-xl']);
for (const name of ['--rds-table-grid-md', '--rds-table-grid-lg', '--rds-table-grid-xl']) {
  if (!read('rahino-ui/src/components/DataTable/DataTable.tsx').includes(`'${name}':`)) throw new Error(`Missing runtime assignment ${name}`);
}
const undefinedVariables = [], usages = new Map(), rawValues = [], ruleFindings = [], literalRecipeValues = [];
const isForced = node => { for (let p = node.parent; p; p = p.parent) if (p.type === 'atrule' && /forced-colors/.test(p.params)) return true; return false; };
for (const [file, ast] of trees) ast.walkDecls(decl => {
  for (const name of refs(decl.value)) { const places = usages.get(name) ?? []; places.push({ file, line: decl.source.start.line }); usages.set(name, places); }
  if (decl.prop.startsWith('--')) {
    if (/\b\d+(?:\.\d+)?(?:px|rem|ms)\b/.test(decl.value) && !/var\(/.test(decl.value)) literalRecipeValues.push({ file, line: decl.source.start.line, property: decl.prop, value: decl.value });
    return;
  }
  if (/color-mix\(|#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i.test(decl.value) || decl.prop === 'opacity' && !['0', '1'].includes(decl.value)) ruleFindings.push({ file, line: decl.source.start.line, property: decl.prop, value: decl.value, reason: 'Manufactured color/alpha needs review' });
  if (!isForced(decl) && /--rds-shadow-lg/.test(decl.value)) ruleFindings.push({ file, line: decl.source.start.line, reason: 'Modal-only shadow in non-modal stylesheet' });
  if (/\b\d+(?:\.\d+)?(?:px|rem|ms)\b/.test(decl.value) && !/var\(/.test(decl.value)) rawValues.push({ file, line: decl.source.start.line, property: decl.prop, value: decl.value });
});
for (const file of tsFiles) for (const match of read(file).matchAll(/var\(\s*(--[\w-]+)/g)) { const name = match[1], places = usages.get(name) ?? []; places.push({ file, line: read(file).slice(0, match.index).split('\n').length }); usages.set(name, places); }
const visited = new Set(), missingSeen = new Set();
function visit(name, chain = []) {
  if (runtime.has(name)) return;
  if (!definitions.has(name)) { const key = name + ':' + chain.join('>'); if (!missingSeen.has(key)) { missingSeen.add(key); undefinedVariables.push({ name, chain, usages: usages.get(chain[0] ?? name) }); } return; }
  if (chain.includes(name) || visited.has(name)) return;
  visited.add(name);
  for (const definition of definitions.get(name)) for (const dependency of refs(definition.value)) visit(dependency, [...chain, name]);
}
for (const name of usages.keys()) visit(name);
const compatibility = [], directReferences = [], localRecipes = [];
for (const [name, places] of usages) {
  if (canonical.has(name) || styleVariables.has(name) || runtime.has(name)) { if (name.startsWith('--ref-')) directReferences.push({ name, canonical: canonical.get(name), usages: places }); continue; }
  const defs = definitions.get(name) ?? [];
  if (defs.some(def => def.file === 'rahino-ui/src/styles/rds-foundations.css')) compatibility.push({ name, definitions: defs.slice(0, 1), usages: places });
  else localRecipes.push({ name, definitions: defs, usages: places });
}
const rawCompatibility = compatibility.filter(entry => entry.definitions.some(def => !refs(def.value).length));
const report = { scope: { cssFiles, tsFiles }, counts: { cssFiles: cssFiles.length, tsFiles: tsFiles.length, referencedVariables: usages.size, canonicalVariables: canonical.size, traversedDefinitions: visited.size, undefinedVariables: undefinedVariables.length }, undefinedVariables, ruleFindings, directReferences, compatibility, rawCompatibility, localRecipes, literalRecipeValues, rawValues, limitations: ['Static dependency inventory does not prove CSS selector scope or computed behavior; targeted browser checks and human policy review are separate.', 'Compatibility CSS definitions are reported separately from canonical DTCG tokens and semantic typography styles.', 'Legacy child cells and Modal are manually reviewed; utilities in TSX require a separate palette/semantic assessment.'] };
const directory = path.join(root, 'tmp-verify/component-foundation-audit'); fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(path.join(directory, 'results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ counts: report.counts, undefinedVariables, ruleFindings, directReferences: directReferences.map(({ name }) => name), rawCompatibility: rawCompatibility.map(({ name, definitions }) => ({ name, value: definitions[0].value })), literalRecipeValues }, null, 2));
if (undefinedVariables.length || ruleFindings.length) process.exitCode = 1;
