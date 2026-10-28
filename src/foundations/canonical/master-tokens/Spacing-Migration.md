# Rahino — Spacing naming migration

**Status:** approved naming correction, 2026-10-23. Physical spacing values are unchanged.

Reference tokens use `ref.space.<px>`; shared tokens use `rds.space.<global index>`. Positive indexes match [Adobe Spectrum](https://spectrum.adobe.com/foundations/layout-and-structure/spacing/layout-spacing). The zero pair preserves Rahino's existing reset and is not a published Spectrum mapping.

| Previous raw token | Reference token | Shared semantic token | Value | Index source |
| --- | --- | --- | ---: | --- |
| `rds.space.0` | `ref.space.0` | `rds.space.0` | 0px | Rahino reset extension |
| `rds.space.1` | `ref.space.1` | `rds.space.25` | 1px | Adobe Spectrum |
| `rds.space.2` | `ref.space.2` | `rds.space.50` | 2px | Adobe Spectrum |
| `rds.space.4` | `ref.space.4` | `rds.space.75` | 4px | Adobe Spectrum |
| `rds.space.6` | `ref.space.6` | `rds.space.85` | 6px | Adobe Spectrum |
| `rds.space.8` | `ref.space.8` | `rds.space.100` | 8px | Adobe Spectrum |
| `rds.space.12` | `ref.space.12` | `rds.space.200` | 12px | Adobe Spectrum |
| `rds.space.16` | `ref.space.16` | `rds.space.300` | 16px | Adobe Spectrum |
| `rds.space.20` | `ref.space.20` | `rds.space.350` | 20px | Adobe Spectrum |
| `rds.space.24` | `ref.space.24` | `rds.space.400` | 24px | Adobe Spectrum |
| `rds.space.32` | `ref.space.32` | `rds.space.500` | 32px | Adobe Spectrum |
| `rds.space.40` | `ref.space.40` | `rds.space.600` | 40px | Adobe Spectrum |
| `rds.space.48` | `ref.space.48` | `rds.space.700` | 48px | Adobe Spectrum |
| `rds.space.56` | `ref.space.56` | `rds.space.750` | 56px | Adobe Spectrum |
| `rds.space.64` | `ref.space.64` | `rds.space.800` | 64px | Adobe Spectrum |
| `rds.space.80` | `ref.space.80` | `rds.space.900` | 80px | Adobe Spectrum |
| `rds.space.96` | `ref.space.96` | `rds.space.1000` | 96px | Adobe Spectrum |

The earlier shared alias `rds.spacing.300` becomes `rds.space.300`, which references `{ref.space.16}`. The earlier prefix exception is superseded. Old names appear only as migration/history records, not as active token definitions.

CSS reference variables become `--ref-space-<px>`; shared variables become `--rds-space-<index>`. Update consumers by the mapping above; do not mechanically preserve the old numeric suffix, since index labels and pixel values differ.

The TypeScript export `SPACE` continues to hold the raw values keyed by pixels; `SPACING` holds all 17 shared aliases keyed by index. For example, `SPACE[16]` and `SPACING[300]` both resolve to `16px`. Existing TypeScript export names are preserved. External consumers have not been supplied or checked; these public token/CSS renames need release review before publishing.
