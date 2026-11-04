# Icon usage — source audit

Recorded 2026-11-03. The usage guide now lives in the canonical [icon foundation](../src/foundations/canonical/Icons.md).

## Existing implementation

- The legacy shared sizing rules define 16, 20, 24 and 32px icons, with a stroke value of 2. Buttons now bind directly to canonical 16/20/24px sizes and the proportional 2.25 stroke on the 24 × 24 grid. Checkbox marks bind to canonical 16px and 2.25 stroke tokens as well. Text inputs use canonical 20px field icons and a 16px borderless error exclamation with the same proportional stroke and centered alignment.
- Lucide is used in the current Rahino/Qipper implementation. The Qippo reference inventory records Magicoon regular and filled sets, so the source material is not yet one icon family.
- Usage varies: older components use sizes such as 14, 18, 22 and 28px and strokes of 2.25, 2.5 or 3. One brandbook demo uses 1.75. The brandbook asks for simple, consistent line icons but does not specify numeric sizes or stroke widths in its copy.

Evidence: [shared metrics](../src/foundations/metrics.ts), [button sizing](BUTTON_USAGE.md), [Qippo inventory](../src/qippo/catalog.ts), [older components](../src/components/), and the frontend brandbook's `experience/content.ts` and `demos/ExperienceDemos.tsx`.

## Adopted foundation

The owner selected stroke 2.25 on the 24 × 24 reference grid and requested foundation adoption without frontend integration. The canonical guide and token sources now define this rule, the existing size scale and proportional scaling. Generated token tables are maintained by the foundation build.

The owner subsequently requested button, checkbox and text-input icon migration. Button, IconButton and ToggleButton consume the canonical sizes and proportional 2.25 stroke, including spinners and checkmarks; Checkbox uses the canonical 16px mark size and the same proportional stroke. Input uses canonical 20px field icons and a 16px bare error exclamation, centered and without an enclosing border. Legacy compatibility bindings remain at 2 for other components. Foundation adoption and implementation do not approve component states.
