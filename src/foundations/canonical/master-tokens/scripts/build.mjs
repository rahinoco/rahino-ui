import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { foundationDir, json, save, renderReview, at } from './lib.mjs';
import { loadModel, renderFoundationFiles, rawOutputFile, cssName, contrastRatio, roundRatio } from './foundations.mjs';
import { renderDocuments } from './docs.mjs';
import { renderCss } from './css.mjs';
import { renderColorResolver } from './color-resolver.mjs';
import { renderColorReview } from './color-review.mjs';

export async function renderOutputs() {
  const model = await loadModel();
  const code = await renderFoundationFiles(model);
  const docs = await renderDocuments(model);
  const colorReview = await renderColorReview(model);
  const map = [...new Set(Object.values(model.sets).flatMap(tokens => [...tokens.keys()]))].map(p => ({
    path: p, css: cssName(p), designName: p.replaceAll('.', '/'),
    ...Object.fromEntries(['light', 'dark'].map(appearance => { const t = model.token(p, appearance); return [appearance, { type: t.$type, value: t.$value }]; })),
  }));
  return { ...code, ...docs.outputs, ...await renderColorResolver(model),
    'output/contrast-review/Contrast-Review.md': colorReview.markdown,
    'output/contrast-review/results.json': JSON.stringify(colorReview.data, null, 2) + '\n',
    'master-tokens/generated/tokens.css': await renderCss(model),
    'master-tokens/generated/design-map.json': JSON.stringify({ purpose: 'Design-tool handoff names and typed values; preserve units when importing. Not a Figma API payload.', tokens: map }, null, 2) + '\n',
  };
}
export async function build() {
  const outputs = await renderOutputs();
  for (const [file, text] of Object.entries(outputs)) {
    const target = path.join(foundationDir, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, text, 'utf8');
  }
  // Current output locations are separate from immutable capture provenance.
  const manifest = await json('manifest.json');
  for (const name of ['shared', 'light', 'dark']) {
    const document = await json(manifest.sets[name].file);
    const visit = (node, keys = []) => {
      if (node && typeof node === 'object' && Object.hasOwn(node, '$value')) {
        const p = keys.join('.'), meta = node.$extensions.rahino;
        meta.capturedSource ??= structuredClone(meta.source);
        if (p.startsWith('ref.')) meta.source = { file: rawOutputFile, exportPath: ['REFERENCE', p], line: 1 };
        const text = outputs[meta.source.file];
        if (text) {
          const marker = `@token ${p}`;
          const index = text.indexOf(marker);
          const fallback = text.indexOf('export const ' + meta.source.exportPath[0]);
          meta.source.line = text.slice(0, index >= 0 ? index : Math.max(0, fallback)).split('\n').length;
        }
        return;
      }
      for (const [key, child] of Object.entries(node)) if (!key.startsWith('$')) visit(child, [...keys, key]);
    };
    visit(document);
    await save(manifest.sets[name].file, document);
  }
  const pending = await json(manifest.recipesFile);
  const currentModel = await loadModel();
  const typography = await json(manifest.typographyFile);
  for (const entry of [...pending.entries, ...typography.entries]) {
    entry.capturedSource ??= structuredClone(entry.source);
    const text = outputs[entry.source.file];
    const index = text?.indexOf('@token ' + entry.publicPath);
    if (text) entry.source.line = text.slice(0, index >= 0 ? index : text.indexOf('export const ' + entry.source.exportPath[0])).split('\n').length;
  }
  await save(manifest.recipesFile, pending);
  await save(manifest.typographyFile, typography);
  // Recompute derived records; historical adoption snapshots remain separate.
  const supplementary = await json(manifest.supplementaryFile);
  const docs = await renderDocuments(currentModel);
  for (const entry of supplementary.entries) {
    let derived;
    if (entry.id === 'layout-grid') derived = docs.grid;
    if (entry.id === 'layout-content-width') derived = docs.caps;
    if (entry.id === 'contrast-reference-snapshot') derived = currentModel.textContrast;
    if (['dark-focus-contrast-validation', 'dark-control-contrast-validation'].includes(entry.id)) {
      const foreground = entry.id === 'dark-focus-contrast-validation' ? currentModel.value('rds.color.focus.ring', 'dark') : currentModel.value('rds.color.edge.control', 'dark');
      derived = { minimum: entry.value.minimum, ratios: Object.fromEntries(Object.keys(currentModel.api['Color.ts'].SURFACE).map(surface => [surface, roundRatio(contrastRatio(foreground, currentModel.value(`rds.color.surface.${surface}`, 'dark')))])) };
    }
    if (derived) {
      entry.capturedValue ??= structuredClone(entry.value);
      entry.value = derived;
    }
    if (entry.source.exportPath && Object.hasOwn(entry, 'sourceValue')) {
      entry.capturedSourceValue ??= structuredClone(entry.sourceValue);
      entry.sourceValue = at(currentModel.api[entry.source.file], entry.source.exportPath);
    }
  }
  await save(manifest.supplementaryFile, supplementary);
  await writeFile(path.join(foundationDir, 'master-tokens/Master-Token-List.md'), await renderReview(), 'utf8');
  return Object.keys(outputs);
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(JSON.stringify({ generated: await build() }, null, 2));
}
