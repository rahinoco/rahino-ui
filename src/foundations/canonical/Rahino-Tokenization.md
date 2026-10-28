# Rahino Design System — Tokenization Rules

**Principle:** A token records a reusable design decision, not every possible value. Keep one source of truth and add tokens only when they have a clear purpose.

## Token layers

| Layer | Prefix | Responsibility |
| --- | --- | --- |
| Reference | `ref` | Raw values and scales, without usage meaning |
| Shared | `rds` | Stable semantic roles and approved shared scales |
| Component-specific | `recipe` | Decisions genuinely unique to one component |

**Spacing contract:** `ref.space.*` is the raw reference layer; `rds.space.*` is the shared semantic layer. Shared tokens alias the reference values using Spectrum's global spacing indexes. No spacing prefix exception is used.

Components use shared tokens first. Following Spectrum's component-specific approach, introduce `recipe` tokens only where shared tokens cannot express a real component requirement. A component recipe (composition and behavior) is **not** itself a token; do not tokenize every CSS property.

## Naming and values

- Use lowercase English paths separated by dots; use kebab-case within a path segment. Names describe **roles**, not temporary values, products, or viewports.
- In state families, put the state in a separate final segment: `rds.color.action.primary.bg.default`, `.hover`, `.pressed`, `.disabled`. Use `.default` for the resting member of that family; keep meaningful compound terms such as `on-fill` intact.
- Keep reference names tied to their actual value where that convention is defined. Shared tokens may provide a named scale rather than a new semantic role for each use.
- **Spacing example:** `ref.space.16` stores `16px`; `rds.space.300` aliases `{ref.space.16}`. Likewise, `rds.space.25` aliases `{ref.space.1}`. Use the full Spectrum index mapping in [Spacing](Spacing.md); `rds.space.0` → `{ref.space.0}` preserves Rahino's existing zero reset. Do not create separate semantic tokens for every gap.
- Use `px` for physical dimensions (spacing, radius, borders, focus, blur and shadow geometry); `rem` for typography dimensions and breakpoints; `ms` for time; unitless numbers for ratios, alpha and scale.
- **Reading-paragraph recipe exception:** `rds.type.layout.gap.paragraph` retains the existing `1em` CSS behavior only between consecutive reading paragraphs. Record the proportional rule as a CSS recipe outside ordinary DTCG dimension tokens; `em` is not a supported DTCG dimension unit. Preserve its public export without converting it to a fixed 16px gap. General interface spacing continues to use the px-based shared spacing scale. See [Typography](Typography.md#reading-paragraph-spacing).
- A token's meaning remains distinct even when its value equals another token's value.

## Canonical format and publishing

- Maintain **one canonical typed token source** using DTCG `$type`, `$value`, `$description`, and project metadata under `$extensions.rahino` when needed.
- Represent dotted public paths as nested groups in DTCG files. Use typed aliases instead of repeating shared values.
- Keep theme/context selection in manifests and the [Resolver rules](Rahino-Resolver.md), not in token names or a custom `$modes` field.
- Generate CSS variables, TypeScript exports, Figma mappings and documentation *value tables* from the canonical source. Do not maintain parallel hand-edited values.
- Keep public mapping consistent (for example, `rds.color.ink.primary` → `--rds-color-ink-primary` → `rds/color/ink/primary`).

## Adding and changing tokens

1. **Reuse** an existing token first; then consider a component-specific token; add a new shared role only for a distinct, recurring need.
2. Record the token's purpose and usage constraints. Experimental raw values are allowed only with an explicit review plan.
3. Before changing a public token, check affected components, aliases, modes, documentation and exported APIs. A value change must preserve its role; otherwise introduce a new role.
4. For a rename, merge or removal, document the **old → new** mapping and update consumers. Keep temporary compatibility aliases only when needed, with an explicit removal plan. Flag breaking changes for release review.
5. Remove unused or obsolete tokens only after checking real references and confirming that a migration is safe.

## Validation and maintenance

- Reject duplicate public names, missing or cyclic aliases, incompatible types, invalid units, and unsupported context combinations during build.
- Keep token definitions, generated outputs and usage documentation synchronized; test affected consumers after changes.
- Review token usage periodically. Prefer retiring redundancy over expanding the core without evidence.
- Do not publish breaking token changes or alter established design decisions without review and approval.

**References:** [Spectrum design tokens](https://spectrum.adobe.com/foundations/design-data/design-tokens) · [DTCG format](https://www.designtokens.org/tr/2025.10/format/)

## Adopted master collection

The master JSON collection is the source of truth. Run `node master-tokens/scripts/build.mjs` after changes; run `node master-tokens/scripts/check.mjs` to verify the generated outputs. All existing foundation APIs are preserved.

The 2026-10-28 color update changes 15 reference values and three dark-theme references while preserving usage roles and public names. The build also refreshes documentation contrast tables and the [current contrast review](output/contrast-review/Contrast-Review.md). Current verification still reports the dark raised-surface focus failure; the review also records light sunken-surface tertiary-text and control-edge failures. See the [change report](output/color-value-update/Changes.md) for the applied values. Historical adoption and naming snapshots describe their original capture, so their values can differ from the current master.

Color references use stable hue-family steps; chart paths use `rds.color.data.*` and presentation backgrounds use `rds.color.presentation.gradient.*`. The 16 semantic text styles are defined in [typography.json](master-tokens/typography.json), with format details in [Typography](Typography.md#source-and-format). Component cues, number-profile implementation and presentation design remain deferred.
