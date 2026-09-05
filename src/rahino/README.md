# Final Rahino components (`src/rahino/`)

This folder is the home for **Phase-1 final Rahino** UI components — the chosen Rahino versions after lab comparison decisions (Qipper / Qippo / hybrid).

## Purpose

- Source of truth for finalized Rahino primitives (one component at a time).
- Parallel to `src/qippo/` (Qippo lab ports) and distinct from `src/components/` (current shared / Qipper-origin set).
- Do **not** invent components here until a lab decision lands a final version.

## Conventions

- **One component per file** (or folder for multi-file components).
- **PascalCase** filenames matching the export (e.g. `Button.tsx` → `RahinoButton` or `Button` as decided when adding).
- Re-export from this folder’s `index.ts`, then from the package root `src/index.ts` when ready for consumers.
- Keep implementations production-oriented; avoid lab-only scaffolding in this tree.

## Status

- `RahinoInput` / `RahinoSelect` — Qipper geometry + Material floating labels (lab final slot).
