# Color value update — 2026-10-28

Applied the supplied reference and semantic exports: 15 raw color values and three dark-theme references changed, affecting 11 light-theme and 10 dark-theme semantic values. All 123 reference and 148 semantic export values match after normalizing sRGB to the master's byte-based representation and opacity to six decimal places.

Usage descriptions, annotations, token names, non-color tokens and public API shapes are preserved. Exported former brand/selection paths map to the existing current names. The primary foreground continues to reference on-brand ink, which resolves to the exported white value. Historical adoption and migration snapshots remain unchanged.

## Reference values

| Token | Before | After |
| --- | --- | --- |
| `ref.color.amber.50` | `#FBF2E2` | `#FEF3DF` |
| `ref.color.blue.50` | `#EAF1F9` | `#E2ECF8` |
| `ref.color.gray-warm.25` | `#F8F6F7` | `#FBF9FA` |
| `ref.color.gray-warm.75` | `#EFECED` | `#F3F1F2` |
| `ref.color.gray-warm.100` | `#ECE8EA` | `#E8E3E5` |
| `ref.color.gray.850` | `#2B292D` | `#333135` |
| `ref.color.gray.900` | `#232225` | `#2D2C30` |
| `ref.color.gray.925` | `#1A191B` | `#262429` |
| `ref.color.gray.950` | `#121113` | `#1A181B` |
| `ref.color.gray.975` | `#0E0D0F` | `#030203` |
| `ref.color.green.50` | `#EAF5EE` | `#DAFBE8` |
| `ref.color.plum.50` | `#F3ECF0` | `#F0E5EB` |
| `ref.color.plum.100` | `#EADCE4` | `#E8D9E1` |
| `ref.color.plum.375` | `#B28DA4` | `#DCC7D4` |
| `ref.color.red.50` | `#FBEAEC` | `#FCE9EB` |

## Dark-theme reference changes

| Token | Before | After |
| --- | --- | --- |
| `rds.color.brand.bg.default` | `{ref.color.plum.925}` | `{ref.color.plum.875}` |
| `rds.color.brand.bg.hover` | `{ref.color.plum.875}` | `{ref.color.plum.850}` |
| `rds.color.brand.fg` | `{ref.color.plum.300}` | `{ref.color.plum.200}` |

## Affected semantic values

| Theme | Token | Before | After |
| --- | --- | --- | --- |
| `light` | `rds.color.action.primary.bg.disabled` | `#B28DA4` | `#DCC7D4` |
| `light` | `rds.color.brand.bg.default` | `#F3ECF0` | `#F0E5EB` |
| `light` | `rds.color.brand.bg.hover` | `#EADCE4` | `#E8D9E1` |
| `light` | `rds.color.interaction.surface.selected` | `#F3ECF0` | `#F0E5EB` |
| `light` | `rds.color.status.error.bg` | `#FBEAEC` | `#FCE9EB` |
| `light` | `rds.color.status.info.bg` | `#EAF1F9` | `#E2ECF8` |
| `light` | `rds.color.status.success.bg` | `#EAF5EE` | `#DAFBE8` |
| `light` | `rds.color.status.warning.bg` | `#FBF2E2` | `#FEF3DF` |
| `light` | `rds.color.surface.subtle` | `#F8F6F7` | `#FBF9FA` |
| `light` | `rds.color.surface.canvas` | `#EFECED` | `#F3F1F2` |
| `light` | `rds.color.surface.sunken` | `#ECE8EA` | `#E8E3E5` |
| `dark` | `rds.color.brand.bg.default` | `#291823` | `#321A29` |
| `dark` | `rds.color.brand.bg.hover` | `#321A29` | `#4A0D33` |
| `dark` | `rds.color.brand.fg` | `#C7A4B6` | `#E7B6D0` |
| `dark` | `rds.color.interaction.surface.selected` | `#291823` | `#321A29` |
| `dark` | `rds.color.link.fg` | `#C7A4B6` | `#E7B6D0` |
| `dark` | `rds.color.surface.raised` | `#2B292D` | `#333135` |
| `dark` | `rds.color.surface.subtle` | `#232225` | `#2D2C30` |
| `dark` | `rds.color.surface.base` | `#1A191B` | `#262429` |
| `dark` | `rds.color.surface.canvas` | `#121113` | `#1A181B` |
| `dark` | `rds.color.surface.sunken` | `#0E0D0F` | `#030203` |

## Sources

- RDS _ Color Reference.zip: Value.tokens.json
- RDS _ Color Semantic.zip: Light.tokens.json and Dark.tokens.json

## Verification

At the token-value update, all 271 exported reference and semantic color values matched and all 23 then-generated outputs were current. Token usage descriptions, metadata, names, non-color tokens and historical receipts were unchanged. Resolver checks covered 72 contexts and 14184 color values. The two derived dark enhanced-contrast values were refreshed without changing their references.

The standard checker reports a contrast failure caused by the supplied palette. Colors were preserved as supplied; no checker or threshold was changed.

| Pair | Foreground | Background | Ratio | Minimum |
| --- | --- | --- | --- | --- |
| Dark focus ring on raised surface | `#A9638B` | `#333135` | 2.9694:1 | 3:1 |
| Light tertiary ink on sunken surface | `#6D656B` | `#E8E3E5` | 4.4442:1 | 4.5:1 |

## Documentation synchronization

The follow-up documentation update regenerates the foundation tables and master catalog, adds generated text and boundary contrast tables, and refreshes the [current contrast review](../contrast-review/Contrast-Review.md) and [pair inventory](../contrast-review/results.json) from the active master. The build now produces 25 outputs. Color, border, typography, resolver, tokenization and maintenance guidance point to these calculations. Color migration guides identify their captured values as historical; the earlier contrast proposals and browser results are kept in a labeled archive. Token values and usage mappings are unchanged by this documentation update.

The broader review adds a third new failing pair: the light control edge (`#7A8493`) against the sunken surface (`#E8E3E5`) is 2.9824:1 against its 3:1 target, in both standard and enhanced contrast. The current review also includes the existing dark focus findings on success, warning and info backgrounds.
