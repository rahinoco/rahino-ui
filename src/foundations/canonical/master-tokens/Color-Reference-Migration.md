# Color reference naming migration

Approved 2026-10-26 (naming-stage receipt). The 123 renamed references use color families and numbered steps; the naming operation preserved all 124 raw colors, semantic roles and light/dark values at that time. `ref.color.white` keeps its name.

The later 2026-10-28 [color-value update](../output/color-value-update/Changes.md) changes 15 current raw values without renaming their stable reference IDs. The former hex-based names below identify historical swatches; they do not specify current values. Use the [current reference catalog](Master-Token-List.md#color) for active values. Alpha variants retain their own values unless explicitly changed.

Lower steps are lighter and higher steps darker within each family. Steps are stable Rahino palette IDs, inspired by [Spectrum](https://spectrum.adobe.com/foundations/design-data/design-tokens); they do not imply identical Adobe colors or uniform color intervals. Raw references stay fixed across themes.

Transparent variants append `-alpha-N`, where N is opacity in percent: `white-alpha-4` means 4% opaque. A colored alpha variant keeps its family/step, such as `gray-warm.875-alpha-6`. Opaque tokens and alpha variants are sibling leaves, avoiding token/group path collisions.

Update aliases using the table below. Old names remain only in historical migration and inventory records; no raw-color compatibility aliases are published. Values and verification hashes captured during the naming migration are in [color-reference-migration.json](color-reference-migration.json).

Keep existing step IDs stable. Leave gaps for additions; do not fill every gap with a new color. Keep the current three shadow treatments and add raw values only for an actual requirement or a reviewed scale.

| Previous reference | Current reference |
| --- | --- |
| `ref.color.hex-fbf2e2` | `ref.color.amber.50` |
| `ref.color.hex-f0c86f` | `ref.color.amber.175` |
| `ref.color.hex-e8c98c` | `ref.color.amber.200` |
| `ref.color.hex-e5b567` | `ref.color.amber.225` |
| `ref.color.hex-be882e` | `ref.color.amber.400` |
| `ref.color.hex-9b7937` | `ref.color.amber.475` |
| `ref.color.hex-9e6a19` | `ref.color.amber.500` |
| `ref.color.hex-926119` | `ref.color.amber.550` |
| `ref.color.hex-8a5a12` | `ref.color.amber.575` |
| `ref.color.hex-40341d` | `ref.color.amber.775` |
| `ref.color.hex-1b1407` | `ref.color.amber.925` |
| `ref.color.black-a06` | `ref.color.black-alpha-6` |
| `ref.color.black-a10` | `ref.color.black-alpha-10` |
| `ref.color.black-a14` | `ref.color.black-alpha-14` |
| `ref.color.black-a20` | `ref.color.black-alpha-20` |
| `ref.color.black-a26` | `ref.color.black-alpha-26` |
| `ref.color.black-a72` | `ref.color.black-alpha-72` |
| `ref.color.hex-eaf1f9` | `ref.color.blue.50` |
| `ref.color.hex-b6cce6` | `ref.color.blue.200` |
| `ref.color.hex-86b9ee` | `ref.color.blue.275` |
| `ref.color.hex-85b7ed` | `ref.color.blue.300` |
| `ref.color.hex-5a83ae` | `ref.color.blue.475` |
| `ref.color.hex-4479b5` | `ref.color.blue.500` |
| `ref.color.hex-416fa8` | `ref.color.blue.550` |
| `ref.color.hex-386eaa` | `ref.color.blue.575` |
| `ref.color.hex-345e91` | `ref.color.blue.600` |
| `ref.color.hex-23354b` | `ref.color.blue.775` |
| `ref.color.hex-a4becd` | `ref.color.gray-cool.250` |
| `ref.color.hex-7a8493` | `ref.color.gray-cool.450` |
| `ref.color.hex-667085` | `ref.color.gray-cool.525` |
| `ref.color.hex-526c7b` | `ref.color.gray-cool.550` |
| `ref.color.hex-0f172a-a12` | `ref.color.gray-cool.925-alpha-12` |
| `ref.color.hex-f8f6f7` | `ref.color.gray-warm.25` |
| `ref.color.hex-efeced` | `ref.color.gray-warm.75` |
| `ref.color.hex-ece8ea` | `ref.color.gray-warm.100` |
| `ref.color.hex-cac2c7` | `ref.color.gray-warm.200` |
| `ref.color.hex-aaa3a7` | `ref.color.gray-warm.325` |
| `ref.color.hex-6d656b` | `ref.color.gray-warm.575` |
| `ref.color.hex-625b60` | `ref.color.gray-warm.600` |
| `ref.color.hex-5f585d` | `ref.color.gray-warm.625` |
| `ref.color.hex-5e585f` | `ref.color.gray-warm.650` |
| `ref.color.hex-2b2529-a52` | `ref.color.gray-warm.850-alpha-52` |
| `ref.color.hex-211d20` | `ref.color.gray-warm.875` |
| `ref.color.hex-211d20-a06` | `ref.color.gray-warm.875-alpha-6` |
| `ref.color.hex-211d20-a10` | `ref.color.gray-warm.875-alpha-10` |
| `ref.color.hex-1a1918-a56` | `ref.color.gray-warm.900-alpha-56` |
| `ref.color.hex-140c11-a52` | `ref.color.gray-warm.950-alpha-52` |
| `ref.color.hex-eeeef0` | `ref.color.gray.50` |
| `ref.color.hex-eeeef0-a08` | `ref.color.gray.50-alpha-8` |
| `ref.color.hex-eeeef0-a12` | `ref.color.gray.50-alpha-12` |
| `ref.color.hex-c0bdc6` | `ref.color.gray.225` |
| `ref.color.hex-b5b2bc` | `ref.color.gray.275` |
| `ref.color.hex-aaa6b0` | `ref.color.gray.325` |
| `ref.color.hex-625f69` | `ref.color.gray.600` |
| `ref.color.hex-2b2b2b-a04` | `ref.color.gray.825-alpha-4` |
| `ref.color.hex-2b292d` | `ref.color.gray.850` |
| `ref.color.hex-252525-a18` | `ref.color.gray.875-alpha-18` |
| `ref.color.hex-232225` | `ref.color.gray.900` |
| `ref.color.hex-1a191b` | `ref.color.gray.925` |
| `ref.color.hex-1a191b-a76` | `ref.color.gray.925-alpha-76` |
| `ref.color.hex-1a191b-a92` | `ref.color.gray.925-alpha-92` |
| `ref.color.hex-121113` | `ref.color.gray.950` |
| `ref.color.hex-0e0d0f` | `ref.color.gray.975` |
| `ref.color.hex-eaf5ee` | `ref.color.green.50` |
| `ref.color.hex-add7bc` | `ref.color.green.175` |
| `ref.color.hex-87dca4` | `ref.color.green.200` |
| `ref.color.hex-4f9166` | `ref.color.green.450` |
| `ref.color.hex-348556` | `ref.color.green.500` |
| `ref.color.hex-2f7d50` | `ref.color.green.525` |
| `ref.color.hex-216e43` | `ref.color.green.600` |
| `ref.color.hex-203b2a` | `ref.color.green.775` |
| `ref.color.hex-bfcb7a` | `ref.color.olive.200` |
| `ref.color.hex-637437` | `ref.color.olive.550` |
| `ref.color.hex-f3ecf0` | `ref.color.plum.50` |
| `ref.color.hex-eadce4` | `ref.color.plum.100` |
| `ref.color.hex-e7b6d0` | `ref.color.plum.200` |
| `ref.color.hex-d9a7c3` | `ref.color.plum.250` |
| `ref.color.hex-c7a4b6` | `ref.color.plum.300` |
| `ref.color.hex-c89cb6` | `ref.color.plum.325` |
| `ref.color.hex-e18fbd` | `ref.color.plum.350` |
| `ref.color.hex-b28da4` | `ref.color.plum.375` |
| `ref.color.hex-b48ba6` | `ref.color.plum.400` |
| `ref.color.hex-a7839b` | `ref.color.plum.425` |
| `ref.color.hex-a47891` | `ref.color.plum.450` |
| `ref.color.hex-a9638b` | `ref.color.plum.500` |
| `ref.color.hex-966883` | `ref.color.plum.525` |
| `ref.color.hex-9b5878` | `ref.color.plum.550` |
| `ref.color.hex-99507a` | `ref.color.plum.575` |
| `ref.color.hex-8c5776` | `ref.color.plum.600` |
| `ref.color.hex-824465` | `ref.color.plum.625` |
| `ref.color.hex-752c55` | `ref.color.plum.700` |
| `ref.color.hex-741a52` | `ref.color.plum.725` |
| `ref.color.hex-4a3742` | `ref.color.plum.750` |
| `ref.color.hex-631244` | `ref.color.plum.775` |
| `ref.color.hex-4a0d33` | `ref.color.plum.850` |
| `ref.color.hex-321a29` | `ref.color.plum.875` |
| `ref.color.hex-400c2c` | `ref.color.plum.900` |
| `ref.color.hex-291823` | `ref.color.plum.925` |
| `ref.color.hex-1e0515` | `ref.color.plum.950` |
| `ref.color.hex-b8a1e6` | `ref.color.purple.300` |
| `ref.color.hex-654d91` | `ref.color.purple.625` |
| `ref.color.hex-fbeaec` | `ref.color.red.50` |
| `ref.color.hex-edb3b8` | `ref.color.red.225` |
| `ref.color.hex-f4979f` | `ref.color.red.275` |
| `ref.color.hex-e9968d` | `ref.color.red.300` |
| `ref.color.hex-aa5963` | `ref.color.red.525` |
| `ref.color.hex-b94c57` | `ref.color.red.550` |
| `ref.color.hex-b54650` | `ref.color.red.575` |
| `ref.color.hex-9b4d48` | `ref.color.red.600` |
| `ref.color.hex-a33a43` | `ref.color.red.625` |
| `ref.color.hex-42262b` | `ref.color.red.800` |
| `ref.color.hex-8ad3bf` | `ref.color.teal.200` |
| `ref.color.hex-74ccb4` | `ref.color.teal.250` |
| `ref.color.hex-64988d` | `ref.color.teal.400` |
| `ref.color.hex-58968a` | `ref.color.teal.425` |
| `ref.color.hex-287569` | `ref.color.teal.550` |
| `ref.color.hex-246f67` | `ref.color.teal.575` |
| `ref.color.white-a04` | `ref.color.white-alpha-4` |
| `ref.color.white-a10` | `ref.color.white-alpha-10` |
| `ref.color.white-a18` | `ref.color.white-alpha-18` |
| `ref.color.white-a52` | `ref.color.white-alpha-52` |
| `ref.color.white-a72` | `ref.color.white-alpha-72` |
| `ref.color.white-a92` | `ref.color.white-alpha-92` |

## Subsequent approved boundary correction

The dark control boundary was later approved to reuse `ref.color.gray-cool.450`. Its former sole-use `ref.color.gray-cool.525` is retired rather than retained as an unused primitive. The current palette has 123 raw references; the naming-stage record still preserves the original 124 values. The explicit amendment and retirement are recorded in manifest.json; historical mappings are not rewritten.
