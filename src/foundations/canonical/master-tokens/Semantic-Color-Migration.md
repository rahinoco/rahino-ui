# Semantic color naming migration

Chart colors and presentation backgrounds now live under the color category. The chart paths use `rds.color.data.*`; presentation recipes use `rds.color.presentation.gradient.*`. This changes names and documentation grouping only.

The naming migration preserved all light/dark values, chart slot order, gradient artwork and TypeScript exports at that time. Existing `DATA_*` arrays and named-slot exports remain available. Presentation recipes still await the previously deferred design work; these are not newly published single-color tokens.

The later 2026-10-28 [color-value update](../output/color-value-update/Changes.md) changes interface colors while keeping these names, chart values and gradient recipes unchanged. Read the [current master list](Master-Token-List.md#colors) for active values; the migration snapshots remain historical receipts.

Update public token paths using the mapping below. The canonical collection publishes the new paths. Historical baseline/inventory files retain their original names; the adoption audit applies this approved mapping and compares the [captured values](semantic-color-migration.json).

| Previous path | Current path |
| --- | --- |
| `rds.data.on-fill` | `rds.color.data.on-fill` |
| `rds.data.categorical.01` | `rds.color.data.categorical.01` |
| `rds.data.categorical.02` | `rds.color.data.categorical.02` |
| `rds.data.categorical.03` | `rds.color.data.categorical.03` |
| `rds.data.categorical.04` | `rds.color.data.categorical.04` |
| `rds.data.categorical.05` | `rds.color.data.categorical.05` |
| `rds.data.categorical.06` | `rds.color.data.categorical.06` |
| `rds.data.categorical.07` | `rds.color.data.categorical.07` |
| `rds.data.categorical.08` | `rds.color.data.categorical.08` |
| `rds.data.sequential.01` | `rds.color.data.sequential.01` |
| `rds.data.sequential.02` | `rds.color.data.sequential.02` |
| `rds.data.sequential.03` | `rds.color.data.sequential.03` |
| `rds.data.sequential.04` | `rds.color.data.sequential.04` |
| `rds.data.sequential.05` | `rds.color.data.sequential.05` |
| `rds.data.diverging.01` | `rds.color.data.diverging.01` |
| `rds.data.diverging.02` | `rds.color.data.diverging.02` |
| `rds.data.diverging.03` | `rds.color.data.diverging.03` |
| `rds.data.diverging.04` | `rds.color.data.diverging.04` |
| `rds.data.diverging.05` | `rds.color.data.diverging.05` |
| `rds.presentation.gradient.brand-dark` | `rds.color.presentation.gradient.brand-dark` |
| `rds.presentation.gradient.brand-light` | `rds.color.presentation.gradient.brand-light` |
| `rds.presentation.gradient.atmosphere` | `rds.color.presentation.gradient.atmosphere` |
