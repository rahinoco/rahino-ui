import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { masterDir, foundationDir, json, at, encode, encodedSourceValue, flatten, resolve, isAlias, leaves, renderReview } from './lib.mjs';
import { renderLayout } from './layout.mjs';
import { resolveContext } from './context.mjs';
import { resolveTypographyStyles } from './typography.mjs';
import { renderOutputs } from './build.mjs';
import { checkColorResolver } from './color-resolver-check.mjs';

const manifest = await json('manifest.json');
const auditAdoption = process.argv.includes('--audit-adoption');
const pending = await json(manifest.recipesFile);
const typography = await json(manifest.typographyFile);
const completeTextStyles = await resolveTypographyStyles();
const supplementary = await json(manifest.supplementaryFile);
const decisions = await json(manifest.decisionsFile);
const semanticColorMigration = manifest.semanticColorMigration ? await json(manifest.semanticColorMigration) : null;
const semanticPaths = new Map(semanticColorMigration?.renames.map(item => [item.from, item.to]) ?? []);
const stateNamingMigration = manifest.stateNamingMigration ? await json(manifest.stateNamingMigration) : null;
const statePaths = new Map(stateNamingMigration?.renames.map(item => [item.from, item.to]) ?? []);
const activePath = publicPath => { const p = semanticPaths.get(publicPath) ?? publicPath; return statePaths.get(p) ?? p; };
const issueIds = new Set(decisions.items.map(item => item.id));
const typographyPolicy = typography.policy;
assert.equal(typographyPolicy.representation, 'semantic-text-styles');
assert.equal(manifest.typographyRepresentation.policyFile, manifest.typographyFile);
assert.equal(typographyPolicy.letterSpacing, 'omit-preserve-existing-inheritance');
assert.equal(typographyPolicy.approval, manifest.typographyRepresentation.approval);
assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === typographyPolicy.approval));
assert.equal(issueIds.size, decisions.items.length, 'Duplicate decision IDs');
assert.equal(manifest.adopted, true, 'The canonical collection must be adopted.');
assert.equal(manifest.contextPolicy.applicationDefault, 'system');
const contextPolicy = await json(manifest.contextPolicy.policyFile);
assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === contextPolicy.approval));
assert.equal(resolveContext().appearance, 'light', 'Unavailable system preference needs a stable fallback');
assert.equal(resolveContext({}, { appearance: 'dark' }).appearance, 'dark');
assert.equal(resolveContext({ appearance: 'light' }, { appearance: 'dark' }).appearance, 'light', 'Explicit app choice must win');
assert.equal(resolveContext({ appearance: 'dark', contrast: 'standard' }, { contrast: 'more' }).contrast, 'standard');
assert.equal(resolveContext({}, { contrast: 'more' }).contrast, 'more');
assert.equal(resolveContext({ contrast: 'more' }, { forcedColors: true }).contrast, 'forced-colors');
assert.deepEqual(resolveContext({ contrast: 'more' }, { forcedColors: true }).overrides, {}, 'Forced colors must suppress custom overrides');
assert.equal(resolveContext({}, { forcedColors: true }).useSystemColors, true);
assert.equal(resolveContext({}, { locale: 'fa-IR' }).script, null, 'Do not infer the script from locale');
assert.equal(resolveContext({ script: 'fa', appearance: 'dark' }).script, 'fa');
assert.throws(() => resolveContext({ appearance: 'sepia' }), TypeError);
assert.throws(() => resolveContext({ contrast: 'maximum' }), TypeError);
assert.throws(() => resolveContext({ script: 'auto' }), TypeError);
const modules = {}, covered = new Map(), annotated = new Set();
const trackedSources = [...manifest.sources, ...(manifest.addedSources ?? [])];
for (const source of manifest.addedSources ?? []) {
  assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === source.approval), `Added source has no approved decision: ${source.file}`);
  assert(!manifest.sources.some(original => original.file === source.file), `Added source duplicates original: ${source.file}`);
}
const expectedHashes = new Map(trackedSources.map(source => [source.file, source.sha256]));
const expectedExports = structuredClone(manifest.sourceExports);
const amendedFiles = new Set();
for (const change of manifest.approvedSourceChanges ?? []) {
  assert(decisions.items.some(item => item.status === 'resolved'
    && (item.resolution?.approval === change.id || item.resolution?.approvalHistory?.includes(change.id))), `Source amendment has no recorded decision: ${change.id}`);
  for (const file of change.changedFiles) {
    assert.equal(file.beforeSha256, expectedHashes.get(file.file), `Broken amendment history: ${file.file}`);
    expectedHashes.set(file.file, file.afterSha256);
    amendedFiles.add(file.file);
  }
  Object.assign(expectedExports, change.sourceExportsAfter);
}
// Historical receipts stay immutable; only recorded, approved amendments may follow them.
const hashAfterApprovedChanges = (file, initialHash) => {
  let hash = initialHash;
  for (const change of manifest.approvedSourceChanges ?? []) {
    for (const amended of change.changedFiles) {
      if (amended.file === file && amended.beforeSha256 === hash) hash = amended.afterSha256;
    }
  }
  return hash;
};
const tokenChanges = manifest.approvedTokenChanges ?? [];
const retiredReferences = new Map((manifest.retiredReferences ?? []).map(item => [item.publicPath, item]));
for (const change of [...tokenChanges, ...retiredReferences.values()]) {
  assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === change.approval), 'Unapproved token amendment');
}
const amendedValue = (set, publicPath, initial, property) => {
  let value = initial;
  for (const change of tokenChanges.filter(item => item.set === set && item.publicPath === publicPath)) {
    assert.deepEqual(value, change[property === 'alias' ? 'beforeAlias' : 'beforeValue'], `Broken token amendment: ${publicPath}`);
    value = change[property === 'alias' ? 'afterAlias' : 'afterValue'];
  }
  return value;
};

for (const baseline of trackedSources) {
  const bytes = await readFile(path.join(foundationDir, baseline.file));
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (auditAdoption) assert.equal(hash, expectedHashes.get(baseline.file), `Changed since adoption: ${baseline.file}`);
  if (baseline.file.endsWith('.ts')) {
    modules[baseline.file] = await import(pathToFileURL(path.join(foundationDir, baseline.file)));
    assert.deepEqual(Object.keys(modules[baseline.file]).sort(), expectedExports[baseline.file], `Unrecorded export change: ${baseline.file}`);
    for (const match of bytes.toString('utf8').matchAll(/@token\s+([a-z0-9.-]+)/g)) annotated.add(`${baseline.file}:${match[1]}`);
  }
}

const mark = (source, declaredPath) => {
  assert(source && modules[source.file], `Unknown TypeScript source ${source?.file}`);
  assert(Number.isInteger(source.line) && source.line > 0, 'Missing source line');
  const current = at(modules[source.file], source.exportPath);
  for (const suffix of leaves(current)) {
    const key = JSON.stringify([source.file, ...source.exportPath, ...suffix]);
    covered.set(key, true);
  }
  if (declaredPath) annotated.delete(`${source.file}:${declaredPath}`);
  return current;
};
const validIssues = ids => {
  assert(Array.isArray(ids), 'Missing review issue list');
  for (const id of ids) assert(issueIds.has(id), `Unknown review issue: ${id}`);
};
const finite = value => typeof value === 'number' && Number.isFinite(value);
const validDimension = value => value && finite(value.value) && ['px', 'rem'].includes(value.unit);
const validColor = value => value && value.colorSpace === 'srgb'
  && Array.isArray(value.components) && value.components.length === 3
  && value.components.every(v => finite(v) && v >= 0 && v <= 1)
  && finite(value.alpha) && value.alpha >= 0 && value.alpha <= 1;
function checkShape(type, value, publicPath) {
  let ok = false;
  switch (type) {
    case 'dimension': ok = validDimension(value); break;
    case 'duration': ok = value && finite(value.value) && value.value >= 0 && value.unit === 'ms'; break;
    case 'color': ok = validColor(value); break;
    case 'number': ok = finite(value); break;
    case 'fontWeight': ok = finite(value) && value >= 1 && value <= 1000; break;
    case 'fontFamily': ok = Array.isArray(value) && value.length > 0 && value.every(v => typeof v === 'string' && v.length > 0); break;
    case 'cubicBezier': ok = Array.isArray(value) && value.length === 4 && value.every(finite)
      && value[0] >= 0 && value[0] <= 1 && value[2] >= 0 && value[2] <= 1; break;
    case 'shadow': ok = validColor(value?.color)
      && ['offsetX', 'offsetY', 'blur', 'spread'].every(key => validDimension(value[key]) && value[key].unit === 'px')
      && value.blur.value >= 0; break;
  }
  assert(ok, `Invalid ${type} shape at ${publicPath}`);
  if (type === 'dimension') {
    const expectedUnit = publicPath.startsWith('rds.type.layout.measure.') || publicPath.startsWith('rds.layout.breakpoint.') || publicPath.startsWith('ref.font.size.') ? 'rem' : 'px';
    assert.equal(value.unit, expectedUnit, `Unit mismatch at ${publicPath}`);
  }
}

const sets = {};
let setDefinitions = 0;
for (const [name, config] of Object.entries(manifest.sets)) {
  const document = await json(config.file);
  assert(!JSON.stringify(document).includes('"$modes"'), 'Custom $modes is not permitted.');
  sets[name] = flatten(document);
  setDefinitions += sets[name].size;
  for (const [publicPath, token] of sets[name]) {
    assert(/^(ref|rds|recipe)(?:\.[a-z0-9]+(?:-[a-z0-9]+)*)+$/.test(publicPath), `Invalid public name ${publicPath}`);
    assert(typeof token.$description === 'string' && token.$description.length > 0, `Missing description: ${publicPath}`);
    const meta = token.$extensions?.rahino;
    assert(meta && meta.status === 'adopted', `Missing adoption metadata: ${publicPath}`);
    validIssues(meta.reviewIssues);
    mark(meta.source, meta.originalBundlePath ?? publicPath);
    if (!isAlias(token.$value) && token.$type !== 'shadow') checkShape(token.$type, token.$value, publicPath);
  }
}

let checkedContexts = 0;
for (const [appearance, context] of Object.entries(manifest.capturedAppearances)) {
  const merged = new Map();
  for (const name of context.setsInOrder) {
    assert(sets[name], `Unknown set ${name}`);
    for (const [publicPath, token] of sets[name]) {
      assert(!merged.has(publicPath), `Unapproved override/duplicate path in ${appearance}: ${publicPath}`);
      merged.set(publicPath, token);
    }
  }
  for (const [publicPath, token] of merged) {
    const resolved = resolve(merged, publicPath);
    checkShape(resolved.$type, resolved.$value, publicPath);
    const source = token.$extensions.rahino.source;
    assert.deepEqual(resolved.$value, encodedSourceValue(token.$type, source, modules[source.file]), `Source value changed in ${appearance}: ${publicPath}`);
  }
  checkedContexts++;
}

let referenceBaselineDefinitions = 0;
let newReferencesChecked = 0;
let colorReferencesRenamed = 0;
if (auditAdoption && manifest.referenceLayer) {
  const config = manifest.referenceLayer;
  const baseline = await json(config.baselineFile);
  const inventory = await json(config.inventoryFile);
  const colorMigration = config.colorNamingMigration ? await json(config.colorNamingMigration) : null;
  const colorPaths = new Map(colorMigration?.mappings.map(item => [item.from, item.to]) ?? []);
  const currentPath = publicPath => colorPaths.get(publicPath) ?? publicPath;
  const currentValue = value => {
    if (isAlias(value)) return `{${activePath(currentPath(value.slice(1, -1)))}}`;
    if (Array.isArray(value)) return value.map(currentValue);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, currentValue(child)]));
    return value;
  };
  assert.equal(config.status, 'foundation-outputs-synchronized');
  assert.equal(config.approval, baseline.approval);
  assert.equal(config.approval, inventory.approval);
  assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === config.approval));
  if (config.foundationFilesUnchanged) {
    for (const source of baseline.foundationFiles) {
      assert.equal(createHash('sha256').update(await readFile(path.join(foundationDir, source.file))).digest('hex'), hashAfterApprovedChanges(source.file, source.sha256), `Unapproved change since reference-layer stage: ${source.file}`);
    }
  }
  for (const [name, snapshot] of Object.entries(baseline.sets)) {
    const merged = new Map([...sets.shared, ...sets[name]]);
    for (const [publicPath, expected] of Object.entries(snapshot)) {
      const actual = resolve(merged, activePath(publicPath));
      assert.equal(actual.$type, expected.$type);
      assert.deepEqual(actual.$value, amendedValue(name, publicPath, expected.$value, 'value'), `Unapproved value change: ${name}:${publicPath}`);
      referenceBaselineDefinitions++;
    }
    assert.deepEqual([...sets[name].keys()].filter(key => key.startsWith('rds.')).sort(), Object.keys(snapshot).filter(key => key.startsWith('rds.')).map(activePath).sort(), `Unapproved semantic path change: ${name}`);
  }
  const newPaths = [...sets.shared.keys()].filter(key => key.startsWith('ref.') && !Object.hasOwn(baseline.sets.shared, key));
  assert.deepEqual(newPaths.sort(), inventory.newReferencePaths.map(currentPath).filter(p => !retiredReferences.has(p)).sort());
  for (const publicPath of newPaths) {
    const token = sets.shared.get(publicPath);
    assert.equal(token.$extensions.rahino.layer, 'reference');
    assert.equal(token.$extensions.rahino.approval, config.approval);
    assert(!isAlias(token.$value), `Raw references must hold their own value: ${publicPath}`);
    assert(token.$extensions.rahino.localTokenConsumers.length > 0, `Unused reference: ${publicPath}`);
    newReferencesChecked++;
  }
  for (const change of inventory.updatedDefinitions) assert.deepEqual(sets[change.set].get(activePath(change.publicPath)).$value, amendedValue(change.set, change.publicPath, currentValue(change.$value), 'alias'), `Unapproved reference mapping: ${change.publicPath}`);
  assert.equal(referenceBaselineDefinitions, inventory.existingTypedDefinitionsPreserved);
  assert.equal(sets.shared.get('rds.border.width.strong').$value, '{ref.stroke.width.2}');
  assert.equal(sets.shared.get('rds.focus.ring.width').$value, '{ref.stroke.width.2}');
  assert.equal(sets.shared.get('rds.radius.8').$value, '{ref.radius.8}');
  assert.equal(sets.shared.get('rds.motion.duration.dissolve').$value, '{ref.motion.duration.150}');
  assert.equal(sets.shared.get('rds.motion.duration.feedback').$value, '{ref.motion.duration.150}');
  assert.equal(sets.shared.get('rds.type.line-height.display').$value, '{ref.font.line-height.1-6}');
  assert.equal(sets.shared.get('rds.type.line-height.fixed').$value, '{ref.font.line-height.1-6}');
  assert.equal(sets.shared.get('rds.type.layout.gap.title-description').$value, '{rds.space.100}');
  assert.equal(sets.shared.get('rds.type.layout.gap.section-content').$value, '{rds.space.300}');
  const rawColors = [...sets.shared].filter(([key]) => key.startsWith('ref.color.'));
  assert.equal(new Set(rawColors.map(([, token]) => JSON.stringify(token.$value))).size, rawColors.length, 'Duplicated raw palette value.');
  if (colorMigration) {
    assert.equal(colorMigration.status, 'approved-applied');
    assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === colorMigration.approval
      && item.resolution.migrationFile === config.colorNamingMigration), 'Missing color naming approval');
    assert.equal(colorPaths.size, colorMigration.mappings.length, 'Duplicate previous color name');
    assert.equal(new Set(colorPaths.values()).size, colorPaths.size, 'Color rename merges distinct references');
    assert.deepEqual([...colorPaths.keys()].sort(), inventory.newReferencePaths.filter(p => p.startsWith('ref.color.')).sort(), 'Color migration must cover the historical palette');
    assert.deepEqual([...colorPaths.values()].filter(p => !retiredReferences.has(p)).sort(), rawColors.map(([p]) => p).sort(), 'Color migration and approved retirements must cover the current palette');
    assert.equal(colorMigration.preservedReferenceCount, rawColors.length + retiredReferences.size);
    const bases = new Map();
    const colorLuminance = hex => hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255)
      .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
    for (const base of colorMigration.palette) {
      assert(/^[a-z]+(?:-[a-z]+)*$/.test(base.family), `Invalid color family: ${base.family}`);
      assert(Number.isInteger(base.step) && base.step >= 25 && base.step <= 1000 && base.step % 25 === 0, `Invalid color step: ${base.step}`);
      assert(/^#[0-9A-F]{6}$/.test(base.hex), `Invalid palette base: ${base.hex}`);
      assert(!bases.has(base.hex), `Duplicate palette base: ${base.hex}`);
      bases.set(base.hex, base);
    }
    for (const family of new Set(colorMigration.palette.map(base => base.family))) {
      const ordered = colorMigration.palette.filter(base => base.family === family).sort((a, b) => a.step - b.step);
      for (let i = 1; i < ordered.length; i++) {
        assert(ordered[i - 1].step < ordered[i].step && colorLuminance(ordered[i - 1].hex) > colorLuminance(ordered[i].hex), `Color steps must run light to dark: ${family}`);
      }
    }
    for (const entry of colorMigration.mappings) {
      const retired = retiredReferences.get(entry.to);
      if (retired) {
        assert(!sets.shared.has(entry.to), `Retired reference remains published: ${entry.to}`);
        assert(sets.shared.has(retired.replacement), `Missing retirement replacement: ${entry.to}`);
        assert.deepEqual(retired.token.$extensions.rahino.localTokenConsumers, [{ set: 'dark', publicPath: 'rds.color.edge.control' }]);
      }
      const token = retired?.token ?? sets.shared.get(entry.to);
      assert.equal(token.$type, entry.$type);
      assert.deepEqual(token.$value, entry.$value, `Color rename changed a value: ${entry.from}`);
      assert.equal(token.$extensions.rahino.namingApproval, colorMigration.approval);
      const hex = '#' + token.$value.components.map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
      const base = bases.get(hex);
      const expected = hex === '#FFFFFF' ? 'ref.color.white' : hex === '#000000' ? 'ref.color.black'
        : base ? `ref.color.${base.family}.${base.step}` : null;
      assert(expected, `Missing family/step for ${entry.to}`);
      const alpha = token.$value.alpha;
      assert.equal(entry.to, expected + (alpha === 1 ? '' : `-alpha-${Math.round(alpha * 100)}`), `Color name or opacity mismatch: ${entry.to}`);
      if (entry.from !== entry.to) {
        assert(!sets.shared.has(entry.from), `Old color path is still published: ${entry.from}`);
        colorReferencesRenamed++;
      }
    }
    assert.equal(colorReferencesRenamed, colorMigration.renamedReferenceCount);
    for (const [file, hash] of Object.entries(colorMigration.foundationHashes)) {
      assert.equal(createHash('sha256').update(await readFile(path.join(foundationDir, file))).digest('hex'), hashAfterApprovedChanges(file, hash), `Unapproved change since color naming: ${file}`);
    }
    for (const document of [pending, ...Object.values(sets).map(tokens => [...tokens])]) {
      const aliases = JSON.stringify(document).match(/\{ref\.color\.[^{}]+\}/g) ?? [];
      for (const alias of aliases) assert(sets.shared.has(alias.slice(1, -1)), `Stale color alias: ${alias}`);
    }
  }
  for (const name of ['light', 'dark']) {
    assert(![...sets[name].keys()].some(key => key.startsWith('ref.')), 'Raw palette must be shared rather than theme-specific.');
    for (const [publicPath, token] of sets[name]) {
      if (token.$type === 'color') assert(isAlias(token.$value), `Color role still repeats a literal: ${publicPath}`);
      if (token.$type === 'shadow') for (const field of ['color', 'offsetX', 'offsetY', 'blur', 'spread']) assert(isAlias(token.$value[field]), `Shadow part not referenced: ${publicPath}.${field}`);
    }
  }
  const failures = new Map([...sets.shared, ...sets.light]);
  failures.set('ref.validation.a', { $type: 'number', $value: '{ref.validation.b}' });
  failures.set('ref.validation.b', { $type: 'number', $value: '{ref.validation.a}' });
  assert.throws(() => resolve(failures, 'ref.validation.a'), /Cyclic alias/);
  failures.set('ref.validation.missing-alias', { $type: 'number', $value: '{ref.validation.absent}' });
  assert.throws(() => resolve(failures, 'ref.validation.missing-alias'), /Missing token/);
  const shadow = sets.light.get('rds.shadow.sm');
  failures.set('rds.validation.shadow', { ...shadow, $value: { ...shadow.$value, color: '{ref.motion.duration.150}' } });
  assert.throws(() => resolve(failures, 'rds.validation.shadow'), /Alias type mismatch/);
  failures.set('rds.validation.shadow', { ...shadow, $value: { ...shadow.$value, blur: '{ref.validation.absent}' } });
  assert.throws(() => resolve(failures, 'rds.validation.shadow'), /Missing token/);
}

const pendingIds = new Set();
if (auditAdoption && semanticColorMigration) {
  assert.equal(semanticColorMigration.status, 'approved-applied');
  assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === semanticColorMigration.approval
    && item.resolution.migrationFile === manifest.semanticColorMigration), 'Semantic color rename needs approval');
  assert.equal(semanticPaths.size, 22);
  assert.equal(new Set(semanticPaths.values()).size, semanticPaths.size, 'Semantic color names must not collide');
  assert.equal(semanticColorMigration.typedSnapshots.length, 38);
  assert.equal(semanticColorMigration.recipeSnapshots.length, 3);
  for (const snapshot of semanticColorMigration.typedSnapshots) {
    assert.equal(activePath(snapshot.from), snapshot.to);
    assert(snapshot.to.startsWith('rds.color.data.'));
    for (const set of Object.values(sets)) assert(!set.has(snapshot.from), `Old chart path remains active: ${snapshot.from}`);
    const token = sets[snapshot.set].get(snapshot.to);
    assert.equal(token.$type, snapshot.$type);
    assert.deepEqual(token.$value, snapshot.$value, `Chart reference changed: ${snapshot.to}`);
    assert.deepEqual(resolve(new Map([...sets.shared, ...sets[snapshot.set]]), snapshot.to).$value, snapshot.resolvedValue);
    assert.equal(token.$extensions.rahino.publicPathNamingApproval, semanticColorMigration.approval);
  }
  for (const snapshot of semanticColorMigration.recipeSnapshots) {
    assert.equal(activePath(snapshot.from), snapshot.to);
    assert(snapshot.to.startsWith('rds.color.presentation.gradient.'));
    assert(!pending.entries.some(entry => entry.publicPath === snapshot.from), `Old background path remains active: ${snapshot.from}`);
    const entry = pending.entries.find(entry => entry.publicPath === snapshot.to);
    assert.deepEqual(entry.value, snapshot.value, `Background artwork changed: ${snapshot.to}`);
    assert.deepEqual(entry.capturedSource ?? entry.source, snapshot.source);
    assert.equal(entry.status, snapshot.status);
    assert.deepEqual(entry.themeBinding ?? null, snapshot.themeBinding, 'Background theme behavior changed');
    assert.equal(entry.publicPathNamingApproval, semanticColorMigration.approval);
  }
  for (const tokens of Object.values(sets)) {
    assert(!/rds\.(?:data|presentation)\./.test(JSON.stringify([...tokens])), 'Stale semantic color path in current metadata');
  }
}
const pendingPaths = new Set();
for (const entry of [...pending.entries, ...typography.entries]) {
  assert(!pendingIds.has(entry.id), `Duplicate definition ID ${entry.id}`);
  pendingIds.add(entry.id);
  validIssues(entry.reviewIssues);
  const original = mark(entry.source, entry.publicPath);
  const isStyle = entry.kind === 'semantic-text-style';
  const expected = isStyle ? { ...completeTextStyles.fa[entry.publicPath.slice('rds.type.'.length)] } : entry.value;
  if (isStyle && !entry.fontOverride) delete expected.fontFamily;
  assert.deepEqual(expected, original, `Generated definition changed: ${entry.id}`);
  if (entry.valueReference) {
    assert(isAlias(entry.valueReference), `Invalid pending reference: ${entry.id}`);
    const reference = resolve(sets.shared, entry.valueReference.slice(1, -1));
    assert.equal(reference.$type, entry.valueType);
    assert.deepEqual(reference.$value, encode(entry.valueType, entry.value), `Pending reference changed value: ${entry.id}`);
    if (entry.kind === 'enhanced-contrast-field') {
      const [, appearance] = entry.label.split('.');
      assert.equal(entry.status, 'approved-context-override');
      assert.equal(entry.contextApproval, contextPolicy.approval);
      assert.equal(contextPolicy.contrast.enhancedOverrides[appearance][entry.targetPath], entry.valueReference);
      const target = sets[appearance].get(entry.targetPath);
      assert.equal(target?.$type, entry.valueType);
    }
  }
  if (isStyle) {
    assert.equal(entry.status, 'approved-semantic-text-style');
    assert.equal(entry.representationApproval, typographyPolicy.approval);
    assert(!Object.hasOwn(entry.properties, 'letterSpacing'), 'Preserve existing letter-spacing inheritance');
    const types = { fontSize: 'dimension', fontWeight: 'fontWeight', lineHeight: 'number' };
    for (const [property, alias] of Object.entries(entry.properties)) {
      if (property === 'fontSize' && !isAlias(alias)) {
        assert.match(alias, /^clamp\(.+\)$/, `Unsupported fluid font size: ${entry.id}`);
        assert.equal(alias, original.fontSize);
        continue;
      }
      assert(types[property] && isAlias(alias), `Unsupported typography binding: ${entry.id}.${property}`);
      const reference = resolve(sets.shared, alias.slice(1, -1));
      assert.equal(reference.$type, types[property]);
      assert.deepEqual(reference.$value, encode(types[property], original[property]), `Typography binding changed: ${entry.id}.${property}`);
    }
    assert.deepEqual(Object.keys(entry.properties).sort(), ['fontSize', 'fontWeight', 'lineHeight'].sort());
    if (entry.fontOverride) for (const script of ['fa', 'latin']) assert.equal(entry.fontFamilyBinding[script], entry.fontOverride);
  }
  if (entry.publicPath) {
    assert(!pendingPaths.has(entry.publicPath), `Duplicate definition path ${entry.publicPath}`);
    pendingPaths.add(entry.publicPath);
    for (const set of Object.values(sets)) assert(!set.has(entry.publicPath), `Definition also published as a typed token: ${entry.publicPath}`);
  }
}
for (const entry of supplementary.entries) {
  if (entry.reviewIssues) validIssues(entry.reviewIssues);
  if (entry.source.exportPath) {
    const original = mark(entry.source, null);
    assert.deepEqual(entry.sourceValue ?? entry.value, original, `Supplementary source value changed: ${entry.id}`);
  } else {
    const sourceText = await readFile(path.join(foundationDir, entry.source.file), 'utf8');
    assert(sourceText.split('\n').length >= entry.source.line, `Bad document source location: ${entry.id}`);
  }
}
for (const projection of manifest.derivedExports ?? []) {
  const module = modules[projection.file];
  assert(module, `Unknown projection source ${projection.file}`);
  const named = module[projection.sourceExport];
  assert.deepEqual(Object.keys(named), projection.sourceOrder, `Changed public chart slot order: ${projection.sourceExport}`);
  assert.deepEqual(module[projection.exportName], projection.sourceOrder.map(slot => named[slot]), `Changed derived export: ${projection.exportName}`);
  const sourceText = await readFile(path.join(foundationDir, projection.file), 'utf8');
  mark({ file: projection.file, exportPath: [projection.exportName],
    line: sourceText.slice(0, sourceText.indexOf('export const ' + projection.exportName + ':')).split('\n').length }, null);
}
for (const projection of manifest.derivedTypographyExports ?? []) {
  const module = modules[projection.file];
  assert(module, `Unknown typography projection: ${projection.file}`);
  assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === projection.approval), 'Typography projection needs an approved decision.');
  const base = module[projection.sourceExport];
  const complete = module[projection.exportName];
  const assembled = await resolveTypographyStyles();
  assert.deepEqual(assembled, complete, 'Semantic text styles must preserve all existing complete typography styles');
  assert.deepEqual(projection.scripts, ['fa', 'latin']);
  assert.deepEqual(Object.keys(complete), projection.scripts);
  for (const script of projection.scripts) {
    assert.deepEqual(Object.keys(complete[script]), Object.keys(base), `Incomplete typography roles: ${script}`);
    for (const [role, definition] of Object.entries(base)) {
      assert.deepEqual(complete[script][role], {
        ...definition,
        fontFamily: definition.fontFamily ?? module[projection.fontFamilyExport][script],
      }, `Changed typography metrics or font override: ${script}.${role}`);
      const entry = typography.entries.find(entry => entry.publicPath === `rds.type.${role}`);
      assert.equal(entry.fontBindingApproval, projection.approval);
      const alias = entry.fontFamilyBinding[script];
      assert(isAlias(alias), `Font binding must reference a font-family token: ${role}`);
      const family = resolve(sets.shared, alias.slice(1, -1));
      assert.equal(family.$type, 'fontFamily');
      assert.deepEqual(family.$value, encode('fontFamily', complete[script][role].fontFamily), `Master font binding mismatch: ${script}.${role}`);
      assert.deepEqual(entry.resolvedExports[script], [projection.exportName, script, role]);
    }
  }
  const sourceText = await readFile(path.join(foundationDir, projection.file), 'utf8');
  const declaration = sourceText.indexOf('export const ' + projection.exportName + ' =');
  assert(declaration >= 0, 'Missing complete typography export declaration.');
  mark({ file: projection.file, exportPath: [projection.exportName], line: sourceText.slice(0, declaration).split('\n').length }, null);
}
// SPACE is the preserved compatibility projection of the canonical raw module.
mark({ file: 'Spacing.ts', exportPath: ['SPACE'], line: 1 }, null);
assert.equal(annotated.size, 0, `Uncaptured @token annotations: ${[...annotated].join(', ')}`);

let exportLeaves = 0;
for (const [file, module] of Object.entries(modules)) {
  for (const exportName of expectedExports[file]) {
    for (const keys of leaves(module[exportName])) {
      const key = JSON.stringify([file, exportName, ...keys]);
      assert(covered.has(key), `Uncaptured exported value: ${file} ${exportName}.${keys.join('.')}`);
      exportLeaves++;
    }
  }
}

// Historical acceptance values belong to the optional adoption audit.
if (auditAdoption) {
// Focused checks on the highest-risk transcription cases and existing aliases.
assert.equal(resolve(sets.shared, 'rds.motion.duration.dissolve').$value.value, 150);
assert.equal(resolve(sets.shared, 'rds.motion.duration.feedback').$value.value, 150);
assert(sets.shared.has('rds.motion.duration.dissolve') && sets.shared.has('rds.motion.duration.feedback'), 'Equal-duration roles must remain distinct.');
assert.deepEqual(resolve(sets.shared, 'rds.motion.easing.linear').$value, [0, 0, 1, 1]);
// Independent acceptance values from the Spectrum source; zero is Rahino's existing reset.
const spacingScale = [[0,0],[25,1],[50,2],[75,4],[85,6],[100,8],[200,12],[300,16],[350,20],[400,24],[500,32],[600,40],[700,48],[750,56],[800,64],[900,80],[1000,96]];
assert.equal([...sets.shared.keys()].filter(key => key.startsWith('ref.space.')).length, 17);
assert.equal([...sets.shared.keys()].filter(key => key.startsWith('rds.space.')).length, 17);
assert(![...sets.shared.keys()].some(key => key.startsWith('rds.spacing.')), 'Superseded spacing family must not remain active.');
for (const [index, px] of spacingScale) {
  const reference = sets.shared.get(`ref.space.${px}`), shared = sets.shared.get(`rds.space.${index}`);
  assert(reference && shared, `Incomplete spacing pair: ${index} -> ${px}`);
  assert.deepEqual(reference.$value, { value: px, unit: 'px' });
  assert.equal(reference.$extensions.rahino.layer, 'reference');
  assert.equal(shared.$extensions.rahino.layer, 'shared');
  assert.equal(shared.$value, `{ref.space.${px}}`);
  assert.equal(modules['Spacing.ts'].SPACE[px], `${px}px`);
  assert.equal(modules['Spacing.ts'].SPACING[index], `${px}px`);
}
assert.equal(modules['Spacing.ts'].SPACING[300], modules['Spacing.ts'].SPACE[16]);
const readingPath = 'rds.type.layout.measure.reading';
const widePath = 'rds.type.layout.measure.wide';
assert.deepEqual(sets.shared.get(readingPath).$value, { value: 42, unit: 'rem' });
assert.equal(sets.shared.get(widePath).$value, `{${readingPath}}`);
assert.equal(typeof sets.shared.get(widePath).$deprecated, 'string');
assert.equal(modules['Typography.ts'].TEXT_LAYOUT.measure.reading, '42rem');
assert.equal(modules['Typography.ts'].TEXT_LAYOUT.measure.wide, '42rem');
const layoutSpec = await readFile(path.join(foundationDir, 'Layout.md'), 'utf8');
const typographySpec = await readFile(path.join(foundationDir, 'Typography.md'), 'utf8');
const colorSource = await readFile(path.join(foundationDir, 'Color.ts'), 'utf8');
const motionSource = await readFile(path.join(foundationDir, 'Motion.ts'), 'utf8');
const motionSpec = await readFile(path.join(foundationDir, 'Motion.md'), 'utf8');
for (const stale of ['rahino-ui', 'Light/Dark.tokens.json', 'css.ts', 'newer comparison table', '@alias rds.color.edge.focus']) {
  assert(!colorSource.includes(stale), `Obsolete Color reference: ${stale}`);
}
for (const local of ['Color.md']) {
  assert(colorSource.includes(local), `Missing local Color reference: ${local}`);
  await readFile(path.join(foundationDir, local));
}
assert(motionSource.includes('Guide: Motion.md.'));
assert(motionSpec.includes('Phase one — visual motion testing in Figma completed'));
assert(motionSpec.includes('Qipper implementation testing remains pending'));
assert(!motionSource.includes('tested in qipper'));
assert.match(layoutSpec, /\| Reading \| 42rem \|/);
assert(layoutSpec.includes(readingPath));
assert(typographySpec.includes(readingPath));
assert(!typographySpec.includes('up to `48rem` for wider layouts'), 'Retired wider reading allowance remains active.');
assert.equal(supplementary.entries.find(entry => entry.id === 'layout-content-width').value.find(row => row[0] === 'Reading')[1], '42rem');
const layoutModule = modules['layout.ts'];
assert.deepEqual(layoutModule.BREAKPOINTS, { medium: '48rem', wide: '64rem' });
const expectedGrid = {
  narrow: { columns: 4, gutter: '16px', margin: '16px' },
  medium: { columns: 8, gutter: '24px', margin: '24px' },
  wide: { columns: 12, gutter: '24px', margin: '32px' },
};
assert.deepEqual(layoutModule.PAGE_GRID, expectedGrid);
assert.equal(layoutModule.PAGE_MAX_WIDTH, '1600px');
assert.equal(await readFile(path.join(foundationDir, 'layout.ts'), 'utf8'), await renderLayout(), 'Generated layout.ts is stale.');
assert.equal([...sets.shared.keys()].filter(key => key.startsWith('rds.layout.')).length, 12);
for (const [range, indexes] of Object.entries({ narrow: [300, 300], medium: [400, 400], wide: [400, 500] })) {
  for (const [key, index] of [['gutter', indexes[0]], ['margin', indexes[1]]]) {
    assert.equal(sets.shared.get(`rds.layout.grid.${range}.${key}`).$value, `{rds.space.${index}}`);
  }
  const row = supplementary.entries.find(entry => entry.id === 'layout-grid').value.find(row => row[0].toLowerCase() === range);
  assert.deepEqual(row.slice(2), [String(expectedGrid[range].columns), expectedGrid[range].gutter, expectedGrid[range].margin]);
  assert(layoutSpec.includes(`| ${row.join(' | ')} |`), `Layout grid table mismatch: ${range}`);
}
for (const label of ['Marketing page', 'Dashboard']) assert(layoutSpec.includes(`| ${label} | 1600px |`));
for (const appearance of ['light', 'dark']) {
  assert.equal(sets[appearance].get('rds.color.link.fg').$value, '{rds.color.brand.fg}');
  assert.equal(sets[appearance].get('rds.color.interaction.surface.selected').$value, '{rds.color.brand.bg.default}');
  assert(!sets[appearance].has('rds.color.edge.focus'), 'The source comment must not invent an executable alias.');
  assert(!sets[appearance].has('rds.shadow.xlg'), 'The removed shadow must not remain active.');
  assert.equal([...sets[appearance].keys()].filter(key => key.startsWith('rds.shadow.')).length, 3);
}
assert.deepEqual(Object.keys(modules['Shadow.ts'].SHADOW), ['sm', 'md', 'lg']);
const veilAndShadowSpec = await readFile(path.join(foundationDir, 'Veil & Shadow.md'), 'utf8');
const shadowSource = await readFile(path.join(foundationDir, 'Shadow.ts'), 'utf8');
assert(!veilAndShadowSpec.includes('xlg'));
assert(!shadowSource.includes('xlg'));
assert(veilAndShadowSpec.includes('Use `lg` for modal and confirmation dialogs'));
assert(!layoutSpec.includes('add Lift'));
assert(!sets.shared.has('rds.radius.full'), 'Full rounding is a recipe.');
const paragraphRecipe = pending.entries.find(entry => entry.id === 'paragraph-gap');
assert.equal(paragraphRecipe.value, '1em');
assert.equal(paragraphRecipe.kind, 'approved-css-recipe');
assert.equal(paragraphRecipe.status, 'approved-css-recipe');
assert.equal(paragraphRecipe.recipe.basis, 'paragraph-font-size');
assert.equal(paragraphRecipe.recipe.value, modules['Typography.ts'].TEXT_LAYOUT.gap.paragraph);
assert(!Object.values(sets).some(set => set.has(paragraphRecipe.publicPath)), 'Relative paragraph recipe must not become a DTCG dimension.');
assert.match(typographySpec, /only between consecutive paragraphs in reading content/);
assert.match(typographySpec, /not a requirement to set the default gap to `2em`/);
assert.equal(decisions.items.find(item => item.id === 'relative-spacing').status, 'resolved');
assert.equal(decisions.items.find(item => item.id === 'presentation-representation').disposition, 'deferred-to-design');
assert.equal(manifest.contextPolicy.presentationBrand.selection, 'active-appearance');
assert.equal(manifest.contextPolicy.presentationBrand.implementation, 'deferred-to-design');
for (const appearance of ['light', 'dark']) {
  const brand = pending.entries.find(entry => entry.id === `presentation-brand-${appearance}`);
  assert.equal(brand.themeBinding.selection, 'active-appearance');
  assert.equal(brand.themeBinding.appearance, appearance);
  assert.equal(brand.themeBinding.logicalRole, 'brand-background');
}
assert.equal(typography.entries.filter(entry => entry.kind === 'semantic-text-style').length, 16);
assert(!pending.entries.some(entry => entry.kind === 'typography-bundle' || entry.kind === 'semantic-text-style'));
assert.equal(pending.entries.filter(entry => entry.kind === 'chart-palette-slot').length, 0);
assert.equal(pending.entries.filter(entry => entry.kind === 'enhanced-contrast-field').length, 10);
assert.equal(pending.entries.filter(entry => entry.kind === 'presentation-recipe').length, 3);
for (const appearance of ['light', 'dark']) {
  for (const [family, count] of [['categorical',8],['sequential',5],['diverging',5]]) {
    const paths = [...sets[appearance].keys()].filter(key => key.startsWith(`rds.color.data.${family}.`));
    assert.equal(paths.length, count);
    for (let slot = 1; slot <= count; slot++) assert(sets[appearance].has(`rds.color.data.${family}.${String(slot).padStart(2,'0')}`));
  }
}
}
for (const key of Object.keys(modules['Veil.ts'].VEIL)) {
  const group = `rds.veil.${key}`;
  assert(!sets.shared.has(group), `Veil group must not be a token: ${group}`);
  assert(sets.shared.has(`${group}.blur`));
  for (const appearance of ['light','dark']) assert(sets[appearance].has(`${group}.color`));
}
const fileReview = await readFile(path.join(masterDir, manifest.reviewFile), 'utf8');
assert.equal(fileReview, await renderReview(), 'Generated review is stale. Run node master-tokens/scripts/render.mjs');
const generatedOutputs = await renderOutputs();
for (const [file, expected] of Object.entries(generatedOutputs)) {
  assert.equal(await readFile(path.join(foundationDir, file), 'utf8'), expected, `Generated output is stale: ${file}`);
}
if (stateNamingMigration) {
  assert.equal(stateNamingMigration.status, 'approved-applied');
  assert(decisions.items.some(item => item.status === 'resolved' && item.resolution?.approval === stateNamingMigration.approval));
  assert.equal(statePaths.size, stateNamingMigration.renames.length, 'Duplicate old state names');
  assert.equal(new Set(statePaths.values()).size, statePaths.size, 'State rename collision');
  for (const appearance of ['light', 'dark']) {
    for (const [from, to] of statePaths) {
      assert(!sets[appearance].has(from), `Old state token remains active: ${from}`);
      assert(sets[appearance].has(to), `Missing state token: ${to}`);
      assert.equal(sets[appearance].get(to).$extensions.rahino.stateNamingApproval, stateNamingMigration.approval);
    }
    for (const p of sets[appearance].keys()) if (p.startsWith('rds.color.')) {
      assert(!/-(?:default|hover|pressed|disabled|selected|focus)(?:\.|$)/.test(p), `State must use a separate segment: ${p}`);
      assert(!p.split('.').slice(0, -1).some(part => ['default', 'hover', 'pressed', 'disabled', 'selected'].includes(part)), `State must be the final segment: ${p}`);
    }
  }
  const css = generatedOutputs['master-tokens/generated/tokens.css'];
  for (const alias of stateNamingMigration.cssCompatibility) {
    assert(css.includes(`${alias.from}: var(${alias.to});`), `Missing CSS compatibility alias: ${alias.from}`);
  }
  if (auditAdoption) for (const entry of stateNamingMigration.typedSnapshots) {
    const t = sets[entry.set].get(entry.to);
    assert.equal(t.$type, entry.$type);
    const expectedAlias = isAlias(entry.$value) ? `{${activePath(entry.$value.slice(1, -1))}}` : entry.$value;
    assert.deepEqual(t.$value, expectedAlias, `State rename changed a reference: ${entry.to}`);
    assert.deepEqual(resolve(new Map([...sets.shared, ...sets[entry.set]]), entry.to).$value, entry.resolvedValue, `State rename changed a value: ${entry.to}`);
  }
}
if (auditAdoption) {
  const adoptionBaseline = await json(manifest.adoption.baselineFile);
  for (const [file, expected] of Object.entries(adoptionBaseline.exports)) {
    assert.deepEqual(Object.fromEntries(Object.entries(modules[file])), expected, `Changed since adoption: ${file}`);
  }
}
const colorSection = fileReview.split('### Colors\n\n')[1]?.split('\n### ')[0];
assert(colorSection?.includes('#### Interface colors'));
assert(colorSection?.includes('#### Chart palettes'));
assert(colorSection?.includes('#### Presentation backgrounds'));
assert(colorSection?.includes('#### Enhanced contrast'));
for (const currentPath of semanticPaths.values()) assert(colorSection.includes(currentPath), `Color is outside the Colors section: ${currentPath}`);
assert(!/rds\.(?:data|presentation)\./.test(fileReview), 'Generated review must use the current color names');

const luminance = hex => hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
  .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
const C = modules['Color.ts'];
const staleSnapshot = [];
for (const [appearance, inks] of Object.entries(C.CONTRAST_REFERENCE)) {
  for (const [ink, surfaces] of Object.entries(inks)) {
    for (const [surface, stored] of Object.entries(surfaces)) {
      const actual = ratio(C.INK[ink][appearance], C.SURFACE[surface][appearance]);
      if (Number(actual.toFixed(2)) !== stored) staleSnapshot.push({ appearance, ink, surface, stored, actual: Number(actual.toFixed(6)) });
    }
  }
}
assert.equal(staleSnapshot.length, 0, 'Calculated text contrast references are stale.');
if (auditAdoption) {
  assert.equal(C.FOCUS_RING.light, '#99507A');
  assert.equal(C.FOCUS_RING.dark, '#A9638B');
}
const focusValidation = supplementary.entries.find(entry => entry.id === 'dark-focus-contrast-validation');
assert.deepEqual(Object.keys(focusValidation.value.ratios), Object.keys(C.SURFACE));
for (const [surface, colors] of Object.entries(C.SURFACE)) {
  const actual = ratio(C.FOCUS_RING.dark, colors.dark);
  assert(actual >= 3, `Dark focus contrast below 3:1 on ${surface}`);
  assert.equal(focusValidation.value.ratios[surface], actual, `Stale focus contrast in master: ${surface}`);
}
const diagnostics = {
  darkFocusOnSubtle: ratio(C.FOCUS_RING.dark, C.SURFACE.subtle.dark),
  darkFocusOnRaised: ratio(C.FOCUS_RING.dark, C.SURFACE.raised.dark),
  darkControlOnRaised: ratio(C.EDGE.control.dark, C.SURFACE.raised.dark),
};
const controlValidation = supplementary.entries.find(entry => entry.id === 'dark-control-contrast-validation');
if (auditAdoption) assert.equal(C.EDGE.control.dark, '#7A8493');
assert.deepEqual(Object.keys(controlValidation.value.ratios), Object.keys(C.SURFACE));
for (const [surface, colors] of Object.entries(C.SURFACE)) {
  const actual = ratio(C.EDGE.control.dark, colors.dark);
  assert(actual >= 3, `Dark control contrast below 3:1 on ${surface}`);
  assert.equal(controlValidation.value.ratios[surface], actual, `Stale control contrast: ${surface}`);
}
for (const appearance of ['light', 'dark']) {
  const selected = resolveContext({ appearance, contrast: 'more' });
  assert.equal(Object.keys(selected.overrides).length, 5);
  const merged = new Map([...sets.shared, ...sets[appearance]]);
  for (const [publicPath, alias] of Object.entries(selected.overrides)) {
    merged.set(publicPath, { ...merged.get(publicPath), $value: alias });
    assert.equal(resolve(merged, publicPath).$type, 'color');
  }
  assert.deepEqual(resolveContext({ appearance, contrast: 'standard' }).overrides, {});
}
for (const appearance of ['light', 'dark']) {
  assert.equal(sets[appearance].get('rds.color.action.primary.fg').$value, '{rds.color.ink.on-brand}', 'Primary fills must use on-brand ink');
  for (const state of ['default', 'hover', 'pressed']) {
    assert(ratio(C.INK['on-brand'][appearance], C.ACTION_PRIMARY_BG[state][appearance]) >= 4.5, `On-brand text contrast fails: ${appearance}/${state}`);
  }
}
assert.strictEqual(C.ACTION_PRIMARY_FG, C.INK['on-brand'], 'The existing primary foreground export must reuse on-brand ink');
const distinct = new Set(Object.values(sets).flatMap(tokens => [...tokens.keys()]));
const colorResolverChecks = await checkColorResolver();
console.log(JSON.stringify({
  validation: 'PASS', adoptionAuditPerformed: auditAdoption, originalBaselineFilesTracked: manifest.sources.length,
  approvedAddedFilesTracked: (manifest.addedSources ?? []).length,
  originalFilesUnchanged: manifest.sources.filter(source => !amendedFiles.has(source.file)).length,
  filesWithApprovedAmendments: manifest.sources.filter(source => amendedFiles.has(source.file)).length,
  typeScriptModulesLoaded: Object.keys(modules).length, exportedPrimitiveValuesCovered: exportLeaves,
  distinctTypedPublicPaths: distinct.size, typedDefinitionsAcrossSets: setDefinitions,
  capturedAppearancesChecked: checkedContexts, supportingDefinitionsChecked: pending.entries.length, semanticTextStylesChecked: typography.entries.length,
  newReferencesChecked, referenceBaselineDefinitionsPreserved: referenceBaselineDefinitions,
  colorReferencesRenamed,
  approvedTokenChanges: tokenChanges.length, retiredReferences: retiredReferences.size,
  generatedReviewCurrent: true, generatedOutputsChecked: Object.keys(generatedOutputs).length,
  colorResolverChecks,
  adopted: manifest.adopted, compilerTypeCheckPerformed: false, externalPublicationPerformed: false,
  openDecisions: decisions.items.filter(item => item.status === 'open').length,
  deferredDecisions: decisions.items.filter(item => item.status === 'deferred').length,
  scheduledDecisions: decisions.items.filter(item => item.status === 'scheduled').length,
  explicitlyResolvedDecisions: decisions.items.filter(item => item.status === 'resolved').length,
  knownContrastDiagnostics: Object.fromEntries(Object.entries(diagnostics).map(([key, value]) => [key, Number(value.toFixed(6))])),
  staleContrastSnapshotEntries: staleSnapshot,
}, null, 2));
