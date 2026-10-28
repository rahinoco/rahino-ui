# Rahino — Master Token List

**Canonical foundation. Values and outputs are generated from this collection.**

152 shared and theme-dependent typed tokens, 16 semantic text styles, 192 raw references, and 14 supporting definitions.

## How to read this list

- `ref.*` stores raw values; `rds.*` gives them shared names and purposes. Tables show references alongside resolved values. An arrow follows the alias chain; `—` means a directly defined value.
- Edit definitions in [shared](shared.tokens.json), [light](light.tokens.json), [dark](dark.tokens.json) or [typography](typography.json) JSON.
- Token names link to generated TypeScript outputs; capture provenance is retained separately.
- Component accessibility, application integration and external consumer migration still require product testing.

Generated from the master JSON. Edit the JSON, then run `node master-tokens/scripts/build.mjs` to synchronize this list, foundation guides and contrast review.

## Token catalog

### Borders

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.border.width.default`](../Border.ts#L9) | `ref.stroke.width.1` | 1px | Optional table/section separator or necessary control outline. |
| [`rds.border.width.strong`](../Border.ts#L11) | `ref.stroke.width.2` | 2px | Selection and drop-target attention rings when the component defines a distinct state color and non-color state cue. |

### Colors

Current resolved colors appear below. See the [color-value changes](../output/color-value-update/Changes.md), [text contrast table](../Color.md#neutral-resting-text-contrast) and [current contrast review](../output/contrast-review/Contrast-Review.md) for calculation results and unresolved findings.

#### Interface colors

| Token | Light value / reference | Dark value / reference | Use / review |
| --- | --- | --- | --- |
| [`rds.color.action.primary.bg.default`](../Color.ts#L63) | #631244<br>`ref.color.plum.775` | #631244<br>`ref.color.plum.775` | Primary high-priority button/action background in its rest state. |
| [`rds.color.action.primary.bg.disabled`](../Color.ts#L69) | #DCC7D4<br>`ref.color.plum.375` | #4A3742<br>`ref.color.plum.750` | Inactive solid primary control fill; interaction must be disabled too. |
| [`rds.color.action.primary.bg.hover`](../Color.ts#L65) | #400C2C<br>`ref.color.plum.900` | #741A52<br>`ref.color.plum.725` | Pointer-hover state on a currently enabled primary action. |
| [`rds.color.action.primary.bg.pressed`](../Color.ts#L67) | #1E0515<br>`ref.color.plum.950` | #4A0D33<br>`ref.color.plum.850` | Temporary active/pressed feedback for enabled primary actions. |
| [`rds.color.action.primary.fg`](../Color.ts#L73) | #FFFFFF<br>`rds.color.ink.on-brand` → `ref.color.white` | #FFFFFF<br>`rds.color.ink.on-brand` → `ref.color.white` | Primary-action foreground alias of rds.color.ink.on-brand across enabled default, hover and pressed states. |
| [`rds.color.brand.bg.default`](../Color.ts#L51) | #F0E5EB<br>`ref.color.plum.50` | #321A29<br>`ref.color.plum.875` | Selected/highlighted branded container, low-intensity emphasis panel, or soft brand control at rest. |
| [`rds.color.brand.bg.hover`](../Color.ts#L53) | #E8D9E1<br>`ref.color.plum.100` | #4A0D33<br>`ref.color.plum.850` | Pointer-hover state ONLY for an interactive brand.bg.default surface. |
| [`rds.color.brand.fg`](../Color.ts#L55) | #631244<br>`ref.color.plum.775` | #E7B6D0<br>`ref.color.plum.200` | Branded text/icon emphasis on appropriate light/dark backgrounds, especially on brand.bg.default, soft brand controls and toned badges. |
| [`rds.color.brand.seed`](../Color.ts#L49) | #631244<br>`ref.color.plum.775` | #631244<br>`ref.color.plum.775` | Immutable corporate identity reference, brand signatures and recipes that explicitly require the original brand seed in either appearance. |
| [`rds.color.edge.control`](../Color.ts#L92) | #7A8493<br>`ref.color.gray-cool.450` | #7A8493<br>`ref.color.gray-cool.450` | 1px boundary for enabled inputs, selects, or secondary controls only when their filled treatment needs a clearer affordance. |
| [`rds.color.edge.subtle`](../Color.ts#L90) | rgb(15 23 42 / 0.12)<br>`ref.color.gray-cool.925-alpha-12` | rgb(255 255 255 / 0.1)<br>`ref.color.white-alpha-10` | Optional 1px separators in dense tables or between adjacent panels when spacing and surface contrast are insufficient. |
| [`rds.color.focus.ring`](../Color.ts#L76) | #99507A<br>`ref.color.plum.575` | #A9638B<br>`ref.color.plum.500` | Visible keyboard focus ring, generally via :focus-visible and focus geometry tokens (width) defined elsewhere. |
| [`rds.color.ink.disabled`](../Color.ts#L40) | #AAA3A7<br>`ref.color.gray-warm.325` | #625F69<br>`ref.color.gray.600` | Text/labels of genuinely disabled, noninteractive controls. |
| [`rds.color.ink.inverse`](../Color.ts#L44) | #EEEEF0<br>`ref.color.gray.50` | #211D20<br>`ref.color.gray-warm.875` | Text/icons only on intentionally inverse neutral-solid controls. |
| [`rds.color.ink.on-brand`](../Color.ts#L42) | #FFFFFF<br>`ref.color.white` | #FFFFFF<br>`ref.color.white` | Text and icons on enabled solid primary fills across default, hover and pressed states. |
| [`rds.color.ink.primary`](../Color.ts#L34) | #211D20<br>`ref.color.gray-warm.875` | #EEEEF0<br>`ref.color.gray.50` | Main text, values and labels on neutral surfaces; solid primary fills use rds.color.ink.on-brand. |
| [`rds.color.ink.secondary`](../Color.ts#L36) | #5F585D<br>`ref.color.gray-warm.625` | #C0BDC6<br>`ref.color.gray.225` | Readable supporting text, including descriptions, helper text, notification content, and meaningful metadata |
| [`rds.color.ink.tertiary`](../Color.ts#L38) | #6D656B<br>`ref.color.gray-warm.575` | #AAA6B0<br>`ref.color.gray.325` | Low-emphasis text at full opacity on approved resting opaque surfaces; use secondary or primary ink on neutral hover/pressed overlays unless the complete treatment is separately validated. |
| [`rds.color.interaction.neutral.hover`](../Color.ts#L80) | rgb(33 29 32 / 0.06)<br>`ref.color.gray-warm.875-alpha-6` | rgb(238 238 240 / 0.08)<br>`ref.color.gray.50-alpha-8` | Pointer-hover overlay behind neutral interactive content; use secondary or primary ink at full opacity and validate the final composite. |
| [`rds.color.interaction.neutral.pressed`](../Color.ts#L82) | rgb(33 29 32 / 0.1)<br>`ref.color.gray-warm.875-alpha-10` | rgb(238 238 240 / 0.12)<br>`ref.color.gray.50-alpha-12` | Pressed overlay behind neutral interactive content; use secondary or primary ink at full opacity and validate the final composite. |
| [`rds.color.interaction.surface.selected`](../Color.ts#L86) | #F0E5EB<br>`rds.color.brand.bg.default` → `ref.color.plum.50` | #321A29<br>`rds.color.brand.bg.default` → `ref.color.plum.875` | Persistent BRANDED selection plate (e.g. active segmented option or selected category) when the component recipe specifies branded tone. |
| [`rds.color.link.fg`](../Color.ts#L59) | #631244<br>`rds.color.brand.fg` → `ref.color.plum.775` | #E7B6D0<br>`rds.color.brand.fg` → `ref.color.plum.200` | Link-colored text where an actual interactive hyperlink is present. |
| [`rds.color.scrim.modal`](../Color.ts#L29) | rgb(20 12 17 / 0.52)<br>`ref.color.gray-warm.950-alpha-52` | rgb(0 0 0 / 0.72)<br>`ref.color.black-alpha-72` | Backdrop dimming behind a modal/dialog that blocks the underlying UI. |
| [`rds.color.status.error.bg`](../Color.ts#L122) | #FCE9EB<br>`ref.color.red.50` | #42262B<br>`ref.color.red.800` | Error callout/validation container background. |
| [`rds.color.status.error.edge`](../Color.ts#L124) | #EDB3B8<br>`ref.color.red.225` | #AA5963<br>`ref.color.red.525` | Invalid field or error alert border. |
| [`rds.color.status.error.fg`](../Color.ts#L126) | #A33A43<br>`ref.color.red.625` | #F4979F<br>`ref.color.red.275` | Validation error text/icon; don't signal error with color alone. |
| [`rds.color.status.error.fill`](../Color.ts#L128) | #B54650<br>`ref.color.red.575` | #B94C57<br>`ref.color.red.550` | Solid error badge; destructive button through a separate recipe. |
| [`rds.color.status.error.on-fill`](../Color.ts#L130) | #FFFFFF<br>`ref.color.white` | #FFFFFF<br>`ref.color.white` | Text/icons on error.fill. |
| [`rds.color.status.info.bg`](../Color.ts#L134) | #E2ECF8<br>`ref.color.blue.50` | #23354B<br>`ref.color.blue.775` | Nonurgent informational banner/panel fill. |
| [`rds.color.status.info.edge`](../Color.ts#L136) | #B6CCE6<br>`ref.color.blue.200` | #5A83AE<br>`ref.color.blue.475` | Info border around a feedback block. |
| [`rds.color.status.info.fg`](../Color.ts#L138) | #345E91<br>`ref.color.blue.600` | #86B9EE<br>`ref.color.blue.275` | Information label/icon; link styling also needs link affordance. |
| [`rds.color.status.info.fill`](../Color.ts#L140) | #416FA8<br>`ref.color.blue.550` | #4479B5<br>`ref.color.blue.500` | Solid informational badge/indicator. |
| [`rds.color.status.info.on-fill`](../Color.ts#L142) | #FFFFFF<br>`ref.color.white` | #FFFFFF<br>`ref.color.white` | Text/icons on info.fill. |
| [`rds.color.status.success.bg`](../Color.ts#L98) | #DAFBE8<br>`ref.color.green.50` | #203B2A<br>`ref.color.green.775` | Positive alert/validation panel fill; not a primary action. |
| [`rds.color.status.success.edge`](../Color.ts#L100) | #ADD7BC<br>`ref.color.green.175` | #4F9166<br>`ref.color.green.450` | Border of positive feedback panel or field-success indication. |
| [`rds.color.status.success.fg`](../Color.ts#L102) | #216E43<br>`ref.color.green.600` | #87DCA4<br>`ref.color.green.200` | Success message, icon or state label on validated surfaces. |
| [`rds.color.status.success.fill`](../Color.ts#L104) | #2F7D50<br>`ref.color.green.525` | #348556<br>`ref.color.green.500` | Solid positive badge/indicator or success-specific action recipe. |
| [`rds.color.status.success.on-fill`](../Color.ts#L106) | #FFFFFF<br>`ref.color.white` | #FFFFFF<br>`ref.color.white` | Text/icons only on status.success.fill. |
| [`rds.color.status.warning.bg`](../Color.ts#L110) | #FEF3DF<br>`ref.color.amber.50` | #40341D<br>`ref.color.amber.775` | Warning callout/banner background. |
| [`rds.color.status.warning.edge`](../Color.ts#L112) | #E8C98C<br>`ref.color.amber.200` | #9B7937<br>`ref.color.amber.475` | Warning field/alert border. |
| [`rds.color.status.warning.fg`](../Color.ts#L114) | #8A5A12<br>`ref.color.amber.575` | #F0C86F<br>`ref.color.amber.175` | Warning text/icon; reserve for caution, not generic emphasis. |
| [`rds.color.status.warning.fill`](../Color.ts#L116) | #9E6A19<br>`ref.color.amber.500` | #BE882E<br>`ref.color.amber.400` | Solid warning pill/badge or alert marker. |
| [`rds.color.status.warning.on-fill`](../Color.ts#L118) | #FFFFFF<br>`ref.color.white` | #1B1407<br>`ref.color.amber.925` | Text/icons on warning.fill; light/dark inks differ intentionally. |
| [`rds.color.surface.base`](../Color.ts#L16) | #FFFFFF<br>`ref.color.white` | #262429<br>`ref.color.gray.925` | Default content surface for cards, panels, and sections within the page |
| [`rds.color.surface.canvas`](../Color.ts#L14) | #F3F1F2<br>`ref.color.gray-warm.75` | #1A181B<br>`ref.color.gray.950` | Root application/page background |
| [`rds.color.surface.inverse`](../Color.ts#L24) | #211D20<br>`ref.color.gray-warm.875` | #EEEEF0<br>`ref.color.gray.50` | Intentionally high-contrast, solid neutral controls only, such as an explicitly emphasized neutral button. |
| [`rds.color.surface.raised`](../Color.ts#L20) | #FFFFFF<br>`ref.color.white` | #333135<br>`ref.color.gray.850` | Default opaque surface for dialogs, menus, popovers and floating toolbars; glass requires an explicit component choice and validated backdrop. |
| [`rds.color.surface.subtle`](../Color.ts#L18) | #FBF9FA<br>`ref.color.gray-warm.25` | #2D2C30<br>`ref.color.gray.900` | Low-emphasis grouping within content surfaces, including alternate sections, section headers, list tracks, and secondary containers. |
| [`rds.color.surface.sunken`](../Color.ts#L22) | #E8E3E5<br>`ref.color.gray-warm.100` | #030203<br>`ref.color.gray.975` | Recessed surfaces within a parent container, including unfocused text fields, selects, textareas, editable regions, inset controls, and progress track s |

#### Chart palettes

Chart slots start at 01; existing array index 0 maps to slot 01. Series order is preserved.

| Token | Light value / reference | Dark value / reference | Use / review |
| --- | --- | --- | --- |
| [`rds.color.data.categorical.01`](../Color.ts#L214) | #631244<br>`ref.color.plum.775` | #E18FBD<br>`ref.color.plum.350` | categorical chart slot 01; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.02`](../Color.ts#L216) | #287569<br>`ref.color.teal.550` | #74CCB4<br>`ref.color.teal.250` | categorical chart slot 02; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.03`](../Color.ts#L218) | #386EAA<br>`ref.color.blue.575` | #85B7ED<br>`ref.color.blue.300` | categorical chart slot 03; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.04`](../Color.ts#L220) | #926119<br>`ref.color.amber.550` | #E5B567<br>`ref.color.amber.225` | categorical chart slot 04; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.05`](../Color.ts#L222) | #654D91<br>`ref.color.purple.625` | #B8A1E6<br>`ref.color.purple.300` | categorical chart slot 05; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.06`](../Color.ts#L224) | #9B4D48<br>`ref.color.red.600` | #E9968D<br>`ref.color.red.300` | categorical chart slot 06; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.07`](../Color.ts#L226) | #526C7B<br>`ref.color.gray-cool.550` | #A4BECD<br>`ref.color.gray-cool.250` | categorical chart slot 07; retain the existing series order and family usage constraints. |
| [`rds.color.data.categorical.08`](../Color.ts#L228) | #637437<br>`ref.color.olive.550` | #BFCB7A<br>`ref.color.olive.200` | categorical chart slot 08; retain the existing series order and family usage constraints. |
| [`rds.color.data.diverging.01`](../Color.ts#L250) | #246F67<br>`ref.color.teal.575` | #8AD3BF<br>`ref.color.teal.200` | diverging chart slot 01; retain the existing series order and family usage constraints. |
| [`rds.color.data.diverging.02`](../Color.ts#L252) | #64988D<br>`ref.color.teal.400` | #58968A<br>`ref.color.teal.425` | diverging chart slot 02; retain the existing series order and family usage constraints. |
| [`rds.color.data.diverging.03`](../Color.ts#L254) | #CAC2C7<br>`ref.color.gray-warm.200` | #5E585F<br>`ref.color.gray-warm.650` | diverging chart slot 03; retain the existing series order and family usage constraints. |
| [`rds.color.data.diverging.04`](../Color.ts#L256) | #9B5878<br>`ref.color.plum.550` | #A47891<br>`ref.color.plum.450` | diverging chart slot 04; retain the existing series order and family usage constraints. |
| [`rds.color.data.diverging.05`](../Color.ts#L258) | #631244<br>`ref.color.plum.775` | #E18FBD<br>`ref.color.plum.350` | diverging chart slot 05; retain the existing series order and family usage constraints. |
| [`rds.color.data.on-fill`](../Color.ts#L264) | #FFFFFF<br>`ref.color.white` | #211D20<br>`ref.color.gray-warm.875` | Foreground for text/icons inside solid categorical chart marks only, after contrast validation against the selected series color. |
| [`rds.color.data.sequential.01`](../Color.ts#L235) | #966883<br>`ref.color.plum.525` | #A7839B<br>`ref.color.plum.425` | sequential chart slot 01; retain the existing series order and family usage constraints. |
| [`rds.color.data.sequential.02`](../Color.ts#L237) | #8C5776<br>`ref.color.plum.600` | #B48BA6<br>`ref.color.plum.400` | sequential chart slot 02; retain the existing series order and family usage constraints. |
| [`rds.color.data.sequential.03`](../Color.ts#L239) | #824465<br>`ref.color.plum.625` | #C89CB6<br>`ref.color.plum.325` | sequential chart slot 03; retain the existing series order and family usage constraints. |
| [`rds.color.data.sequential.04`](../Color.ts#L241) | #752C55<br>`ref.color.plum.700` | #D9A7C3<br>`ref.color.plum.250` | sequential chart slot 04; retain the existing series order and family usage constraints. |
| [`rds.color.data.sequential.05`](../Color.ts#L243) | #631244<br>`ref.color.plum.775` | #E7B6D0<br>`ref.color.plum.200` | sequential chart slot 05; retain the existing series order and family usage constraints. |

#### Presentation backgrounds

Full gradient recipes. Brand light/dark follow the active theme; atmosphere remains separate. Final representation and automatic switching remain deferred to design.

| Recipe | CSS value |
| --- | --- |
| [`rds.color.presentation.gradient.brand-dark`](../Color.ts#L268) | linear-gradient(135deg, #121113 0%, #291823 65%, #631244 100%) |
| [`rds.color.presentation.gradient.brand-light`](../Color.ts#L270) | linear-gradient(135deg, #FFFFFF 0%, #F3ECF0 65%, #EADCE4 100%) |
| [`rds.color.presentation.gradient.atmosphere`](../Color.ts#L272) | radial-gradient(ellipse at 30% 20%, rgb(99 18 68 / 0.16), transparent 65%) |

#### Enhanced contrast

Five overrides per theme have approved semantic targets. Native forced colors use system colors. See [context selection](../Rahino-Resolver.md).

| Existing field | Value |
| --- | --- |
| [HIGH_CONTRAST.light.canvas](../Color.ts#L147) | #FFFFFF |
| [HIGH_CONTRAST.light.base](../Color.ts#L147) | #FFFFFF |
| [HIGH_CONTRAST.light.primary](../Color.ts#L147) | #211D20 |
| [HIGH_CONTRAST.light.secondary](../Color.ts#L147) | #211D20 |
| [HIGH_CONTRAST.light.tertiary](../Color.ts#L147) | #625B60 |
| [HIGH_CONTRAST.dark.canvas](../Color.ts#L147) | #030203 |
| [HIGH_CONTRAST.dark.base](../Color.ts#L147) | #1A181B |
| [HIGH_CONTRAST.dark.primary](../Color.ts#L147) | #FFFFFF |
| [HIGH_CONTRAST.dark.secondary](../Color.ts#L147) | #EEEEF0 |
| [HIGH_CONTRAST.dark.tertiary](../Color.ts#L147) | #B5B2BC |

### Focus

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.focus.ring.width`](../Border.ts#L16) | `ref.stroke.width.2` | 2px | 2px visible keyboard-focus outline (:focus-visible). |

### Fonts

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.font.family.code`](../Typography.ts#L21) | `ref.font.family.system-monospace` | ui-monospace, SFMono-Regular, Consolas, monospace | Standalone code, commands and technical literals only. |
| [`rds.font.family.fa`](../Typography.ts#L17) | `ref.font.family.iranyekanx` | IRANYekanX, sans-serif | Persian interface text, paragraphs and headings. |
| [`rds.font.family.latin`](../Typography.ts#L19) | `ref.font.family.roboto-condensed` | Roboto Condensed, sans-serif | English text, with the same role metrics as Persian. |
| [`rds.font.weight.bold`](../Typography.ts#L32) | `ref.font.weight.700` | 700 | Page headings and display text. |
| [`rds.font.weight.medium`](../Typography.ts#L28) | `ref.font.weight.500` | 500 | Labels and control text. |
| [`rds.font.weight.regular`](../Typography.ts#L26) | `ref.font.weight.400` | 400 | Body, UI text and captions. |
| [`rds.font.weight.semibold`](../Typography.ts#L30) | `ref.font.weight.600` | 600 | Titles and section headings. |

### Layout

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.layout.breakpoint.medium`](../layout.ts#L10) | — | 48rem | Inclusive lower bound of the medium page-grid range. |
| [`rds.layout.breakpoint.wide`](../layout.ts#L12) | — | 64rem | Inclusive lower bound of the wide page-grid range. |
| [`rds.layout.content.max`](../layout.ts#L43) | — | 1600px | Maximum marketing-page and dashboard content width, excluding page margins and app navigation. |
| [`rds.layout.grid.medium.columns`](../layout.ts#L26) | — | 8 | Page-grid column count in the medium range; not the number of cards or fields. |
| [`rds.layout.grid.medium.gutter`](../layout.ts#L28) | `rds.space.400` → `ref.space.24` | 24px | Page-grid gutter in the medium range, reusing shared spacing. |
| [`rds.layout.grid.medium.margin`](../layout.ts#L30) | `rds.space.400` → `ref.space.24` | 24px | Minimum main-content page margin per side in the medium range; excludes app chrome. |
| [`rds.layout.grid.narrow.columns`](../layout.ts#L18) | — | 4 | Page-grid column count in the narrow range; not the number of cards or fields. |
| [`rds.layout.grid.narrow.gutter`](../layout.ts#L20) | `rds.space.300` → `ref.space.16` | 16px | Page-grid gutter in the narrow range, reusing shared spacing. |
| [`rds.layout.grid.narrow.margin`](../layout.ts#L22) | `rds.space.300` → `ref.space.16` | 16px | Minimum main-content page margin per side in the narrow range; excludes app chrome. |
| [`rds.layout.grid.wide.columns`](../layout.ts#L34) | — | 12 | Page-grid column count in the wide range; not the number of cards or fields. |
| [`rds.layout.grid.wide.gutter`](../layout.ts#L36) | `rds.space.400` → `ref.space.24` | 24px | Page-grid gutter in the wide range, reusing shared spacing. |
| [`rds.layout.grid.wide.margin`](../layout.ts#L38) | `rds.space.500` → `ref.space.32` | 32px | Minimum main-content page margin per side in the wide range; excludes app chrome. |

### Motion

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.motion.duration.dissolve`](../Motion.ts#L11) | `ref.motion.duration.150` | 150ms | Immediate state updates and navigation transitions when motion improves orientation |
| [`rds.motion.duration.feedback`](../Motion.ts#L13) | `ref.motion.duration.150` | 150ms | Hover, pressed, color changes, toggles, and subtle elevation transitions |
| [`rds.motion.duration.none`](../Motion.ts#L9) | `ref.motion.duration.0` | 0ms | No animated transition; the lower endpoint of the documented reduced-motion range (0–80ms) |
| [`rds.motion.duration.overlay`](../Motion.ts#L15) | `ref.motion.duration.240` | 240ms | Entry timing for popovers, menus, and dialogs. |
| [`rds.motion.duration.presentation`](../Motion.ts#L19) | `ref.motion.duration.480` | 480ms | Optional nonessential expressive motion, primarily in landing pages and presentation experiences. |
| [`rds.motion.duration.reduced`](../Motion.ts#L17) | `ref.motion.duration.80` | 80ms | Upper bound for useful opacity feedback under reduced motion |
| [`rds.motion.easing.enter`](../Motion.ts#L26) | `ref.motion.easing.curve-02` | cubic-bezier(0.2, 0.8, 0.2, 1) | Elements entering a view or overlay becoming visible. |
| [`rds.motion.easing.exit`](../Motion.ts#L28) | `ref.motion.easing.curve-03` | cubic-bezier(0.3, 0, 0.56, 1) | Elements leaving a view or overlay being dismissed. |
| [`rds.motion.easing.linear`](../Motion.ts#L30) | `ref.motion.easing.linear` | cubic-bezier(0, 0, 1, 1) | Constant-rate animation when constant progression is intended. |
| [`rds.motion.easing.standard`](../Motion.ts#L24) | `ref.motion.easing.curve-01` | cubic-bezier(0, 0, 0.58, 1) | Standard easing for state transitions and interaction feedback. |
| [`rds.motion.scale.rest`](../Motion.ts#L46) | `ref.motion.scale.1` | 1 | Unscaled rest state and endpoint of optional subtle scaling. |
| [`rds.motion.scale.subtle`](../Motion.ts#L44) | `ref.motion.scale.0-98` | 0.98 | Opt-in press feedback for selected controls, or a dialog's starting scale when subtle scaling improves the interaction. |
| [`rds.motion.translation.dialog-max`](../Motion.ts#L39) | `ref.motion.distance.8` | 8px | Maximum optional dialog translation, paired with opacity. |
| [`rds.motion.translation.popover-max`](../Motion.ts#L37) | `ref.motion.distance.4` | 4px | Maximum optional translation for popovers and menus. |
| [`rds.motion.translation.popover-subtle`](../Motion.ts#L35) | `ref.motion.distance.2` | 2px | Optional 2px translation with opacity for popovers and menus. |

### Corner radius

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.radius.0`](../Radius.ts#L9) | `ref.radius.0` | 0px | Sharp corners, viewport-attached edges, adjoining surfaces, and precision-oriented elements where rounding is inappropriate. |
| [`rds.radius.4`](../Radius.ts#L11) | `ref.radius.4` | 4px | Checkboxes and very small controls needing restrained rounding. |
| [`rds.radius.8`](../Radius.ts#L13) | `ref.radius.8` | 8px | Default buttons, inputs, and regular interactive controls. |
| [`rds.radius.12`](../Radius.ts#L15) | `ref.radius.12` | 12px | Grouped controls, compact cards, and smaller nested surfaces. |
| [`rds.radius.16`](../Radius.ts#L17) | `ref.radius.16` | 16px | Panels, popovers, and larger cards; pair floating surfaces with their appropriate surface and elevation roles. |
| [`rds.radius.24`](../Radius.ts#L19) | `ref.radius.24` | 24px | Dialogs and sheets where geometry permits rounded outer corners. |

### Shadows

| Token | Light value / reference | Dark value / reference | Use / review |
| --- | --- | --- | --- |
| [`rds.shadow.lg`](../Shadow.ts#L17) | 0px 16px 36px 0px rgb(0 0 0 / 0.14)<br>color: `ref.color.black-alpha-14`<br>offsetX: `ref.shadow.offset.0`<br>offsetY: `ref.shadow.offset.16`<br>blur: `ref.shadow.blur.36`<br>spread: `ref.shadow.spread.0` | 0px 16px 36px 0px rgb(0 0 0 / 0.26)<br>color: `ref.color.black-alpha-26`<br>offsetX: `ref.shadow.offset.0`<br>offsetY: `ref.shadow.offset.16`<br>blur: `ref.shadow.blur.36`<br>spread: `ref.shadow.spread.0` | Modal elevation |
| [`rds.shadow.md`](../Shadow.ts#L15) | 0px 8px 20px 0px rgb(0 0 0 / 0.1)<br>color: `ref.color.black-alpha-10`<br>offsetX: `ref.shadow.offset.0`<br>offsetY: `ref.shadow.offset.8`<br>blur: `ref.shadow.blur.20`<br>spread: `ref.shadow.spread.0` | 0px 8px 20px 0px rgb(0 0 0 / 0.2)<br>color: `ref.color.black-alpha-20`<br>offsetX: `ref.shadow.offset.0`<br>offsetY: `ref.shadow.offset.8`<br>blur: `ref.shadow.blur.20`<br>spread: `ref.shadow.spread.0` | Contextual floating surfaces |
| [`rds.shadow.sm`](../Shadow.ts#L13) | 0px 2px 6px 0px rgb(0 0 0 / 0.06)<br>color: `ref.color.black-alpha-6`<br>offsetX: `ref.shadow.offset.0`<br>offsetY: `ref.shadow.offset.2`<br>blur: `ref.shadow.blur.6`<br>spread: `ref.shadow.spread.0` | 0px 2px 6px 0px rgb(0 0 0 / 0.14)<br>color: `ref.color.black-alpha-14`<br>offsetX: `ref.shadow.offset.0`<br>offsetY: `ref.shadow.offset.2`<br>blur: `ref.shadow.blur.6`<br>spread: `ref.shadow.spread.0` | Subtle elevation |

### Spacing

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.space.0`](../Spacing.ts#L29) | `ref.space.0` | 0px | Remove spacing. |
| [`rds.space.25`](../Spacing.ts#L31) | `ref.space.1` | 1px | Exceptional optical adjustments. |
| [`rds.space.50`](../Spacing.ts#L33) | `ref.space.2` | 2px | Very small internal adjustments. |
| [`rds.space.75`](../Spacing.ts#L35) | `ref.space.4` | 4px | Tight label relationships. |
| [`rds.space.85`](../Spacing.ts#L37) | `ref.space.6` | 6px | Fine component spacing. |
| [`rds.space.100`](../Spacing.ts#L39) | `ref.space.8` | 8px | Icon-label gaps, related elements. |
| [`rds.space.200`](../Spacing.ts#L41) | `ref.space.12` | 12px | Small component and group gaps. |
| [`rds.space.300`](../Spacing.ts#L43) | `ref.space.16` | 16px | Fields, small containers. |
| [`rds.space.350`](../Spacing.ts#L45) | `ref.space.20` | 20px | Intermediate padding. |
| [`rds.space.400`](../Spacing.ts#L47) | `ref.space.24` | 24px | Standard containers, content groups. |
| [`rds.space.500`](../Spacing.ts#L49) | `ref.space.32` | 32px | Spacious containers, major groups. |
| [`rds.space.600`](../Spacing.ts#L51) | `ref.space.40` | 40px | Larger layout separation. |
| [`rds.space.700`](../Spacing.ts#L53) | `ref.space.48` | 48px | Page sections. |
| [`rds.space.750`](../Spacing.ts#L55) | `ref.space.56` | 56px | Larger section separation. |
| [`rds.space.800`](../Spacing.ts#L57) | `ref.space.64` | 64px | Major layout regions. |
| [`rds.space.900`](../Spacing.ts#L59) | `ref.space.80` | 80px | Large-scale composition. |
| [`rds.space.1000`](../Spacing.ts#L61) | `ref.space.96` | 96px | Exceptional large layouts. |

### Typography

#### Text styles

Semantic text styles are defined in [typography.json](typography.json). See [Typography](../Typography.md) for font selection, usage and format exceptions.

| Role | Font size | Weight | Line height |
| --- | --- | --- | --- |
| [`rds.type.caption-sm`](../Typography.ts#L50) | 0.75rem<br>`ref.font.size.rem-0-75` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.caption-md`](../Typography.ts#L57) | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.ui-sm`](../Typography.ts#L64) | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.ui-md`](../Typography.ts#L71) | 1rem<br>`ref.font.size.rem-1` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.label-sm`](../Typography.ts#L78) | 0.875rem<br>`ref.font.size.rem-0-875` | 500<br>`rds.font.weight.medium → ref.font.weight.500` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.label-md`](../Typography.ts#L85) | 1rem<br>`ref.font.size.rem-1` | 500<br>`rds.font.weight.medium → ref.font.weight.500` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.body-sm`](../Typography.ts#L92) | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.95<br>`rds.type.line-height.reading → ref.font.line-height.1-95` |
| [`rds.type.body-md`](../Typography.ts#L99) | 1rem<br>`ref.font.size.rem-1` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.95<br>`rds.type.line-height.reading → ref.font.line-height.1-95` |
| [`rds.type.body-lg`](../Typography.ts#L106) | 1.125rem<br>`ref.font.size.rem-1-125` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.95<br>`rds.type.line-height.reading → ref.font.line-height.1-95` |
| [`rds.type.title-sm`](../Typography.ts#L113) | 1rem<br>`ref.font.size.rem-1` | 600<br>`rds.font.weight.semibold → ref.font.weight.600` | 1.7<br>`rds.type.line-height.heading → ref.font.line-height.1-7` |
| [`rds.type.title-md`](../Typography.ts#L120) | 1.25rem<br>`ref.font.size.rem-1-25` | 600<br>`rds.font.weight.semibold → ref.font.weight.600` | 1.7<br>`rds.type.line-height.heading → ref.font.line-height.1-7` |
| [`rds.type.heading-section`](../Typography.ts#L127) | 1.5rem<br>`ref.font.size.rem-1-5` | 600<br>`rds.font.weight.semibold → ref.font.weight.600` | 1.7<br>`rds.type.line-height.heading → ref.font.line-height.1-7` |
| [`rds.type.heading-page`](../Typography.ts#L134) | clamp(1.5rem, calc(1.357143rem + 0.714286vw), 2rem) | 700<br>`rds.font.weight.bold → ref.font.weight.700` | 1.7<br>`rds.type.line-height.heading → ref.font.line-height.1-7` |
| [`rds.type.display`](../Typography.ts#L141) | clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem) | 700<br>`rds.font.weight.bold → ref.font.weight.700` | 1.6<br>`rds.type.line-height.display → ref.font.line-height.1-6` |
| [`rds.type.input-touch`](../Typography.ts#L148) | 1rem<br>`ref.font.size.rem-1` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui → ref.font.line-height.1-8` |
| [`rds.type.code`](../Typography.ts#L155) | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular → ref.font.weight.400` | 1.6<br>`rds.type.line-height.fixed → ref.font.line-height.1-6` |

#### Text layout and line height

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.type.layout.gap.section-content`](../Typography.ts#L179) | `rds.space.300` → `ref.space.16` | 16px | Section title to its content. |
| [`rds.type.layout.gap.title-description`](../Typography.ts#L177) | `rds.space.100` → `ref.space.8` | 8px | Title to description. |
| [`rds.type.layout.measure.reading`](../Typography.ts#L169) | — | 42rem | Single maximum for long-form text; shrink to available width. |
| [`rds.type.layout.measure.wide`](../Typography.ts#L171) | `rds.type.layout.measure.reading` | 42rem | Compatibility alias only; not a separate wider reading preset. **[Deprecated alias]** |
| [`rds.type.line-height.display`](../Typography.ts#L43) | `ref.font.line-height.1-6` | 1.6 | Expressive large text. |
| [`rds.type.line-height.fixed`](../Typography.ts#L45) | `ref.font.line-height.1-6` | 1.6 | Standalone code only. |
| [`rds.type.line-height.heading`](../Typography.ts#L41) | `ref.font.line-height.1-7` | 1.7 | Structural headings and titles. |
| [`rds.type.line-height.reading`](../Typography.ts#L39) | `ref.font.line-height.1-95` | 1.95 | Multi-line reading content. |
| [`rds.type.line-height.ui`](../Typography.ts#L37) | `ref.font.line-height.1-8` | 1.8 | Short interface text and controls. |

### Veils

| Token | Reference | Value (both themes) | Use / review |
| --- | --- | --- | --- |
| [`rds.veil.100.blur`](../Veil.ts#L17) | `ref.blur.64` | 64px | Decorative glass, subtle background effects, non-interactive layers. |
| [`rds.veil.200.blur`](../Veil.ts#L23) | `ref.blur.48` | 48px | Background overlays and atmospheric floating layers. |
| [`rds.veil.300.blur`](../Veil.ts#L29) | `ref.blur.36` | 36px | Opt-in glass for short labels and simple overlays on controlled backdrops; validate final contrast and provide an opaque fallback. |
| [`rds.veil.400.blur`](../Veil.ts#L35) | `ref.blur.24` | 24px | Opt-in glass for toolbars, navigation flyouts, dropdowns and popovers on controlled backdrops; opaque raised surfaces remain the default. |
| [`rds.veil.500.blur`](../Veil.ts#L41) | `ref.blur.16` | 16px | Opt-in glass for content-rich panels, expanded navigation and modals on controlled backdrops; opaque raised surfaces remain the default. |
| [`rds.veil.scrim.blur`](../Veil.ts#L47) | `ref.blur.24` | 24px | Blurred background overlay behind floating modals. |

| Token | Light value / reference | Dark value / reference | Use / review |
| --- | --- | --- | --- |
| [`rds.veil.100.color`](../Veil.ts#L15) | rgb(255 255 255 / 0.04)<br>`ref.color.white-alpha-4` | rgb(43 43 43 / 0.04)<br>`ref.color.gray.825-alpha-4` | Decorative glass, subtle background effects, non-interactive layers. |
| [`rds.veil.200.color`](../Veil.ts#L21) | rgb(255 255 255 / 0.18)<br>`ref.color.white-alpha-18` | rgb(37 37 37 / 0.18)<br>`ref.color.gray.875-alpha-18` | Background overlays and atmospheric floating layers. |
| [`rds.veil.300.color`](../Veil.ts#L27) | rgb(255 255 255 / 0.52)<br>`ref.color.white-alpha-52` | rgb(26 25 24 / 0.56)<br>`ref.color.gray-warm.900-alpha-56` | Opt-in glass for short labels and simple overlays on controlled backdrops; validate final contrast and provide an opaque fallback. |
| [`rds.veil.400.color`](../Veil.ts#L33) | rgb(255 255 255 / 0.72)<br>`ref.color.white-alpha-72` | rgb(26 25 27 / 0.76)<br>`ref.color.gray.925-alpha-76` | Opt-in glass for toolbars, navigation flyouts, dropdowns and popovers on controlled backdrops; opaque raised surfaces remain the default. |
| [`rds.veil.500.color`](../Veil.ts#L39) | rgb(255 255 255 / 0.92)<br>`ref.color.white-alpha-92` | rgb(26 25 27 / 0.92)<br>`ref.color.gray.925-alpha-92` | Opt-in glass for content-rich panels, expanded navigation and modals on controlled backdrops; opaque raised surfaces remain the default. |
| [`rds.veil.scrim.color`](../Veil.ts#L45) | rgb(20 12 17 / 0.52)<br>`ref.color.gray-warm.950-alpha-52` | rgb(43 37 41 / 0.52)<br>`ref.color.gray-warm.850-alpha-52` | Blurred background overlay behind floating modals. |

## Other preserved definitions

These definitions sit outside the typed token sets. Full recipes and bindings are in [recipes.json](recipes.json).

[`rds.type.layout.gap.paragraph`](../Typography.ts#L175): **1em** between consecutive reading paragraphs, relative to paragraph font size. See [paragraph-spacing guidance](../Typography.md#reading-paragraph-spacing).

## Usage guides

Detailed rules stay in their foundation documents:

| Topic | Read |
| --- | --- |
| Circular and pill rounding | [Radius](../Radius.md#rounding-rules) |
| Responsive grid, content widths and app margins | [Layout](../Layout.md) |
| Number formatting and precision | [Numbers](../Numbers.md) |
| Theme, contrast and script selection | [Context selection](../Rahino-Resolver.md) |
| Text, dark focus-ring and control contrast calculations | [Contrast records](supplementary-decisions.json) |
| Token renames and removals | [Semantic colors](Semantic-Color-Migration.md), [Color references](Color-Reference-Migration.md), [Spacing](Spacing-Migration.md), [Shadows](Shadow-Migration.md) |

## Open decisions

0 open items. Full evidence and 26 resolved decisions are retained in [decisions.json](decisions.json).

| ID | Issue | Needed next |
| --- | --- | --- |

### Later work

| Topic | When |
| --- | --- |
| Presentation artwork representation | Presentation backgrounds are designed or revised. |
| Number profile configuration contract | Product number-formatting behavior is implemented. |
| Chart mark visibility guidance | Chart components and plot backgrounds are designed or reviewed. |

## Raw references

These are the reusable values behind the catalog. Color names use hue families and stable steps, from light to dark; `-alpha-4` means 4% opacity. Steps identify Rahino swatches, not Adobe color matches or contrast guarantees. Decimal names use hyphens (`rem-0-875` = `0.875rem`). Numbered motion curves keep stable IDs.

### blur

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.blur.16`](../master-tokens/generated/reference.ts#L115) | dimension | 16px |
| [`ref.blur.24`](../master-tokens/generated/reference.ts#L117) | dimension | 24px |
| [`ref.blur.36`](../master-tokens/generated/reference.ts#L119) | dimension | 36px |
| [`ref.blur.48`](../master-tokens/generated/reference.ts#L121) | dimension | 48px |
| [`ref.blur.64`](../master-tokens/generated/reference.ts#L123) | dimension | 64px |

### color

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.color.amber.50`](../master-tokens/generated/reference.ts#L265) | color | #FEF3DF |
| [`ref.color.amber.175`](../master-tokens/generated/reference.ts#L267) | color | #F0C86F |
| [`ref.color.amber.200`](../master-tokens/generated/reference.ts#L269) | color | #E8C98C |
| [`ref.color.amber.225`](../master-tokens/generated/reference.ts#L271) | color | #E5B567 |
| [`ref.color.amber.400`](../master-tokens/generated/reference.ts#L273) | color | #BE882E |
| [`ref.color.amber.475`](../master-tokens/generated/reference.ts#L275) | color | #9B7937 |
| [`ref.color.amber.500`](../master-tokens/generated/reference.ts#L277) | color | #9E6A19 |
| [`ref.color.amber.550`](../master-tokens/generated/reference.ts#L279) | color | #926119 |
| [`ref.color.amber.575`](../master-tokens/generated/reference.ts#L281) | color | #8A5A12 |
| [`ref.color.amber.775`](../master-tokens/generated/reference.ts#L283) | color | #40341D |
| [`ref.color.amber.925`](../master-tokens/generated/reference.ts#L285) | color | #1B1407 |
| [`ref.color.black-alpha-6`](../master-tokens/generated/reference.ts#L357) | color | rgb(0 0 0 / 0.06) |
| [`ref.color.black-alpha-10`](../master-tokens/generated/reference.ts#L359) | color | rgb(0 0 0 / 0.1) |
| [`ref.color.black-alpha-14`](../master-tokens/generated/reference.ts#L361) | color | rgb(0 0 0 / 0.14) |
| [`ref.color.black-alpha-20`](../master-tokens/generated/reference.ts#L367) | color | rgb(0 0 0 / 0.2) |
| [`ref.color.black-alpha-26`](../master-tokens/generated/reference.ts#L369) | color | rgb(0 0 0 / 0.26) |
| [`ref.color.black-alpha-72`](../master-tokens/generated/reference.ts#L363) | color | rgb(0 0 0 / 0.72) |
| [`ref.color.blue.50`](../master-tokens/generated/reference.ts#L307) | color | #E2ECF8 |
| [`ref.color.blue.200`](../master-tokens/generated/reference.ts#L309) | color | #B6CCE6 |
| [`ref.color.blue.275`](../master-tokens/generated/reference.ts#L311) | color | #86B9EE |
| [`ref.color.blue.300`](../master-tokens/generated/reference.ts#L313) | color | #85B7ED |
| [`ref.color.blue.475`](../master-tokens/generated/reference.ts#L315) | color | #5A83AE |
| [`ref.color.blue.500`](../master-tokens/generated/reference.ts#L317) | color | #4479B5 |
| [`ref.color.blue.550`](../master-tokens/generated/reference.ts#L319) | color | #416FA8 |
| [`ref.color.blue.575`](../master-tokens/generated/reference.ts#L321) | color | #386EAA |
| [`ref.color.blue.600`](../master-tokens/generated/reference.ts#L323) | color | #345E91 |
| [`ref.color.blue.775`](../master-tokens/generated/reference.ts#L325) | color | #23354B |
| [`ref.color.gray-cool.250`](../master-tokens/generated/reference.ts#L241) | color | #A4BECD |
| [`ref.color.gray-cool.450`](../master-tokens/generated/reference.ts#L243) | color | #7A8493 |
| [`ref.color.gray-cool.550`](../master-tokens/generated/reference.ts#L245) | color | #526C7B |
| [`ref.color.gray-cool.925-alpha-12`](../master-tokens/generated/reference.ts#L247) | color | rgb(15 23 42 / 0.12) |
| [`ref.color.gray-warm.25`](../master-tokens/generated/reference.ts#L125) | color | #FBF9FA |
| [`ref.color.gray-warm.75`](../master-tokens/generated/reference.ts#L127) | color | #F3F1F2 |
| [`ref.color.gray-warm.100`](../master-tokens/generated/reference.ts#L129) | color | #E8E3E5 |
| [`ref.color.gray-warm.200`](../master-tokens/generated/reference.ts#L131) | color | #CAC2C7 |
| [`ref.color.gray-warm.325`](../master-tokens/generated/reference.ts#L133) | color | #AAA3A7 |
| [`ref.color.gray-warm.575`](../master-tokens/generated/reference.ts#L135) | color | #6D656B |
| [`ref.color.gray-warm.600`](../master-tokens/generated/reference.ts#L137) | color | #625B60 |
| [`ref.color.gray-warm.625`](../master-tokens/generated/reference.ts#L139) | color | #5F585D |
| [`ref.color.gray-warm.650`](../master-tokens/generated/reference.ts#L141) | color | #5E585F |
| [`ref.color.gray-warm.850-alpha-52`](../master-tokens/generated/reference.ts#L153) | color | rgb(43 37 41 / 0.52) |
| [`ref.color.gray-warm.875`](../master-tokens/generated/reference.ts#L143) | color | #211D20 |
| [`ref.color.gray-warm.875-alpha-6`](../master-tokens/generated/reference.ts#L147) | color | rgb(33 29 32 / 0.06) |
| [`ref.color.gray-warm.875-alpha-10`](../master-tokens/generated/reference.ts#L149) | color | rgb(33 29 32 / 0.1) |
| [`ref.color.gray-warm.900-alpha-56`](../master-tokens/generated/reference.ts#L151) | color | rgb(26 25 24 / 0.56) |
| [`ref.color.gray-warm.950-alpha-52`](../master-tokens/generated/reference.ts#L145) | color | rgb(20 12 17 / 0.52) |
| [`ref.color.gray.50`](../master-tokens/generated/reference.ts#L157) | color | #EEEEF0 |
| [`ref.color.gray.50-alpha-8`](../master-tokens/generated/reference.ts#L177) | color | rgb(238 238 240 / 0.08) |
| [`ref.color.gray.50-alpha-12`](../master-tokens/generated/reference.ts#L179) | color | rgb(238 238 240 / 0.12) |
| [`ref.color.gray.225`](../master-tokens/generated/reference.ts#L159) | color | #C0BDC6 |
| [`ref.color.gray.275`](../master-tokens/generated/reference.ts#L161) | color | #B5B2BC |
| [`ref.color.gray.325`](../master-tokens/generated/reference.ts#L163) | color | #AAA6B0 |
| [`ref.color.gray.600`](../master-tokens/generated/reference.ts#L165) | color | #625F69 |
| [`ref.color.gray.825-alpha-4`](../master-tokens/generated/reference.ts#L181) | color | rgb(43 43 43 / 0.04) |
| [`ref.color.gray.850`](../master-tokens/generated/reference.ts#L167) | color | #333135 |
| [`ref.color.gray.875-alpha-18`](../master-tokens/generated/reference.ts#L183) | color | rgb(37 37 37 / 0.18) |
| [`ref.color.gray.900`](../master-tokens/generated/reference.ts#L169) | color | #2D2C30 |
| [`ref.color.gray.925`](../master-tokens/generated/reference.ts#L171) | color | #262429 |
| [`ref.color.gray.925-alpha-76`](../master-tokens/generated/reference.ts#L185) | color | rgb(26 25 27 / 0.76) |
| [`ref.color.gray.925-alpha-92`](../master-tokens/generated/reference.ts#L187) | color | rgb(26 25 27 / 0.92) |
| [`ref.color.gray.950`](../master-tokens/generated/reference.ts#L173) | color | #1A181B |
| [`ref.color.gray.975`](../master-tokens/generated/reference.ts#L175) | color | #030203 |
| [`ref.color.green.50`](../master-tokens/generated/reference.ts#L249) | color | #DAFBE8 |
| [`ref.color.green.175`](../master-tokens/generated/reference.ts#L251) | color | #ADD7BC |
| [`ref.color.green.200`](../master-tokens/generated/reference.ts#L253) | color | #87DCA4 |
| [`ref.color.green.450`](../master-tokens/generated/reference.ts#L255) | color | #4F9166 |
| [`ref.color.green.500`](../master-tokens/generated/reference.ts#L257) | color | #348556 |
| [`ref.color.green.525`](../master-tokens/generated/reference.ts#L259) | color | #2F7D50 |
| [`ref.color.green.600`](../master-tokens/generated/reference.ts#L261) | color | #216E43 |
| [`ref.color.green.775`](../master-tokens/generated/reference.ts#L263) | color | #203B2A |
| [`ref.color.olive.200`](../master-tokens/generated/reference.ts#L343) | color | #BFCB7A |
| [`ref.color.olive.550`](../master-tokens/generated/reference.ts#L345) | color | #637437 |
| [`ref.color.plum.50`](../master-tokens/generated/reference.ts#L189) | color | #F0E5EB |
| [`ref.color.plum.100`](../master-tokens/generated/reference.ts#L191) | color | #E8D9E1 |
| [`ref.color.plum.200`](../master-tokens/generated/reference.ts#L193) | color | #E7B6D0 |
| [`ref.color.plum.250`](../master-tokens/generated/reference.ts#L195) | color | #D9A7C3 |
| [`ref.color.plum.300`](../master-tokens/generated/reference.ts#L197) | color | #C7A4B6 |
| [`ref.color.plum.325`](../master-tokens/generated/reference.ts#L199) | color | #C89CB6 |
| [`ref.color.plum.350`](../master-tokens/generated/reference.ts#L201) | color | #E18FBD |
| [`ref.color.plum.375`](../master-tokens/generated/reference.ts#L203) | color | #DCC7D4 |
| [`ref.color.plum.400`](../master-tokens/generated/reference.ts#L205) | color | #B48BA6 |
| [`ref.color.plum.425`](../master-tokens/generated/reference.ts#L207) | color | #A7839B |
| [`ref.color.plum.450`](../master-tokens/generated/reference.ts#L209) | color | #A47891 |
| [`ref.color.plum.500`](../master-tokens/generated/reference.ts#L211) | color | #A9638B |
| [`ref.color.plum.525`](../master-tokens/generated/reference.ts#L213) | color | #966883 |
| [`ref.color.plum.550`](../master-tokens/generated/reference.ts#L215) | color | #9B5878 |
| [`ref.color.plum.575`](../master-tokens/generated/reference.ts#L217) | color | #99507A |
| [`ref.color.plum.600`](../master-tokens/generated/reference.ts#L219) | color | #8C5776 |
| [`ref.color.plum.625`](../master-tokens/generated/reference.ts#L221) | color | #824465 |
| [`ref.color.plum.700`](../master-tokens/generated/reference.ts#L223) | color | #752C55 |
| [`ref.color.plum.725`](../master-tokens/generated/reference.ts#L225) | color | #741A52 |
| [`ref.color.plum.750`](../master-tokens/generated/reference.ts#L227) | color | #4A3742 |
| [`ref.color.plum.775`](../master-tokens/generated/reference.ts#L229) | color | #631244 |
| [`ref.color.plum.850`](../master-tokens/generated/reference.ts#L231) | color | #4A0D33 |
| [`ref.color.plum.875`](../master-tokens/generated/reference.ts#L233) | color | #321A29 |
| [`ref.color.plum.900`](../master-tokens/generated/reference.ts#L235) | color | #400C2C |
| [`ref.color.plum.925`](../master-tokens/generated/reference.ts#L237) | color | #291823 |
| [`ref.color.plum.950`](../master-tokens/generated/reference.ts#L239) | color | #1E0515 |
| [`ref.color.purple.300`](../master-tokens/generated/reference.ts#L339) | color | #B8A1E6 |
| [`ref.color.purple.625`](../master-tokens/generated/reference.ts#L341) | color | #654D91 |
| [`ref.color.red.50`](../master-tokens/generated/reference.ts#L287) | color | #FCE9EB |
| [`ref.color.red.225`](../master-tokens/generated/reference.ts#L289) | color | #EDB3B8 |
| [`ref.color.red.275`](../master-tokens/generated/reference.ts#L291) | color | #F4979F |
| [`ref.color.red.300`](../master-tokens/generated/reference.ts#L293) | color | #E9968D |
| [`ref.color.red.525`](../master-tokens/generated/reference.ts#L295) | color | #AA5963 |
| [`ref.color.red.550`](../master-tokens/generated/reference.ts#L297) | color | #B94C57 |
| [`ref.color.red.575`](../master-tokens/generated/reference.ts#L299) | color | #B54650 |
| [`ref.color.red.600`](../master-tokens/generated/reference.ts#L301) | color | #9B4D48 |
| [`ref.color.red.625`](../master-tokens/generated/reference.ts#L303) | color | #A33A43 |
| [`ref.color.red.800`](../master-tokens/generated/reference.ts#L305) | color | #42262B |
| [`ref.color.teal.200`](../master-tokens/generated/reference.ts#L327) | color | #8AD3BF |
| [`ref.color.teal.250`](../master-tokens/generated/reference.ts#L329) | color | #74CCB4 |
| [`ref.color.teal.400`](../master-tokens/generated/reference.ts#L331) | color | #64988D |
| [`ref.color.teal.425`](../master-tokens/generated/reference.ts#L333) | color | #58968A |
| [`ref.color.teal.550`](../master-tokens/generated/reference.ts#L335) | color | #287569 |
| [`ref.color.teal.575`](../master-tokens/generated/reference.ts#L337) | color | #246F67 |
| [`ref.color.white`](../master-tokens/generated/reference.ts#L155) | color | #FFFFFF |
| [`ref.color.white-alpha-4`](../master-tokens/generated/reference.ts#L347) | color | rgb(255 255 255 / 0.04) |
| [`ref.color.white-alpha-10`](../master-tokens/generated/reference.ts#L365) | color | rgb(255 255 255 / 0.1) |
| [`ref.color.white-alpha-18`](../master-tokens/generated/reference.ts#L349) | color | rgb(255 255 255 / 0.18) |
| [`ref.color.white-alpha-52`](../master-tokens/generated/reference.ts#L351) | color | rgb(255 255 255 / 0.52) |
| [`ref.color.white-alpha-72`](../master-tokens/generated/reference.ts#L353) | color | rgb(255 255 255 / 0.72) |
| [`ref.color.white-alpha-92`](../master-tokens/generated/reference.ts#L355) | color | rgb(255 255 255 / 0.92) |

### font

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.font.family.iranyekanx`](../master-tokens/generated/reference.ts#L81) | fontFamily | IRANYekanX, sans-serif |
| [`ref.font.family.roboto-condensed`](../master-tokens/generated/reference.ts#L83) | fontFamily | Roboto Condensed, sans-serif |
| [`ref.font.family.system-monospace`](../master-tokens/generated/reference.ts#L85) | fontFamily | ui-monospace, SFMono-Regular, Consolas, monospace |
| [`ref.font.line-height.1-6`](../master-tokens/generated/reference.ts#L101) | number | 1.6 |
| [`ref.font.line-height.1-7`](../master-tokens/generated/reference.ts#L99) | number | 1.7 |
| [`ref.font.line-height.1-8`](../master-tokens/generated/reference.ts#L95) | number | 1.8 |
| [`ref.font.line-height.1-95`](../master-tokens/generated/reference.ts#L97) | number | 1.95 |
| [`ref.font.size.rem-0-75`](../master-tokens/generated/reference.ts#L103) | dimension | 0.75rem |
| [`ref.font.size.rem-0-875`](../master-tokens/generated/reference.ts#L105) | dimension | 0.875rem |
| [`ref.font.size.rem-1`](../master-tokens/generated/reference.ts#L107) | dimension | 1rem |
| [`ref.font.size.rem-1-5`](../master-tokens/generated/reference.ts#L113) | dimension | 1.5rem |
| [`ref.font.size.rem-1-25`](../master-tokens/generated/reference.ts#L111) | dimension | 1.25rem |
| [`ref.font.size.rem-1-125`](../master-tokens/generated/reference.ts#L109) | dimension | 1.125rem |
| [`ref.font.weight.400`](../master-tokens/generated/reference.ts#L87) | fontWeight | 400 |
| [`ref.font.weight.500`](../master-tokens/generated/reference.ts#L89) | fontWeight | 500 |
| [`ref.font.weight.600`](../master-tokens/generated/reference.ts#L91) | fontWeight | 600 |
| [`ref.font.weight.700`](../master-tokens/generated/reference.ts#L93) | fontWeight | 700 |

### motion

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.motion.distance.2`](../master-tokens/generated/reference.ts#L71) | dimension | 2px |
| [`ref.motion.distance.4`](../master-tokens/generated/reference.ts#L73) | dimension | 4px |
| [`ref.motion.distance.8`](../master-tokens/generated/reference.ts#L75) | dimension | 8px |
| [`ref.motion.duration.0`](../master-tokens/generated/reference.ts#L53) | duration | 0ms |
| [`ref.motion.duration.80`](../master-tokens/generated/reference.ts#L55) | duration | 80ms |
| [`ref.motion.duration.150`](../master-tokens/generated/reference.ts#L57) | duration | 150ms |
| [`ref.motion.duration.240`](../master-tokens/generated/reference.ts#L59) | duration | 240ms |
| [`ref.motion.duration.480`](../master-tokens/generated/reference.ts#L61) | duration | 480ms |
| [`ref.motion.easing.curve-01`](../master-tokens/generated/reference.ts#L63) | cubicBezier | cubic-bezier(0, 0, 0.58, 1) |
| [`ref.motion.easing.curve-02`](../master-tokens/generated/reference.ts#L65) | cubicBezier | cubic-bezier(0.2, 0.8, 0.2, 1) |
| [`ref.motion.easing.curve-03`](../master-tokens/generated/reference.ts#L67) | cubicBezier | cubic-bezier(0.3, 0, 0.56, 1) |
| [`ref.motion.easing.linear`](../master-tokens/generated/reference.ts#L69) | cubicBezier | cubic-bezier(0, 0, 1, 1) |
| [`ref.motion.scale.0-98`](../master-tokens/generated/reference.ts#L79) | number | 0.98 |
| [`ref.motion.scale.1`](../master-tokens/generated/reference.ts#L77) | number | 1 |

### radius

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.radius.0`](../master-tokens/generated/reference.ts#L37) | dimension | 0px |
| [`ref.radius.4`](../master-tokens/generated/reference.ts#L39) | dimension | 4px |
| [`ref.radius.8`](../master-tokens/generated/reference.ts#L41) | dimension | 8px |
| [`ref.radius.12`](../master-tokens/generated/reference.ts#L43) | dimension | 12px |
| [`ref.radius.16`](../master-tokens/generated/reference.ts#L45) | dimension | 16px |
| [`ref.radius.24`](../master-tokens/generated/reference.ts#L47) | dimension | 24px |

### shadow

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.shadow.blur.6`](../master-tokens/generated/reference.ts#L379) | dimension | 6px |
| [`ref.shadow.blur.20`](../master-tokens/generated/reference.ts#L381) | dimension | 20px |
| [`ref.shadow.blur.36`](../master-tokens/generated/reference.ts#L383) | dimension | 36px |
| [`ref.shadow.offset.0`](../master-tokens/generated/reference.ts#L371) | dimension | 0px |
| [`ref.shadow.offset.2`](../master-tokens/generated/reference.ts#L373) | dimension | 2px |
| [`ref.shadow.offset.8`](../master-tokens/generated/reference.ts#L375) | dimension | 8px |
| [`ref.shadow.offset.16`](../master-tokens/generated/reference.ts#L377) | dimension | 16px |
| [`ref.shadow.spread.0`](../master-tokens/generated/reference.ts#L385) | dimension | 0px |

### space

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.space.0`](../master-tokens/generated/reference.ts#L3) | dimension | 0px |
| [`ref.space.1`](../master-tokens/generated/reference.ts#L5) | dimension | 1px |
| [`ref.space.2`](../master-tokens/generated/reference.ts#L7) | dimension | 2px |
| [`ref.space.4`](../master-tokens/generated/reference.ts#L9) | dimension | 4px |
| [`ref.space.6`](../master-tokens/generated/reference.ts#L11) | dimension | 6px |
| [`ref.space.8`](../master-tokens/generated/reference.ts#L13) | dimension | 8px |
| [`ref.space.12`](../master-tokens/generated/reference.ts#L15) | dimension | 12px |
| [`ref.space.16`](../master-tokens/generated/reference.ts#L17) | dimension | 16px |
| [`ref.space.20`](../master-tokens/generated/reference.ts#L19) | dimension | 20px |
| [`ref.space.24`](../master-tokens/generated/reference.ts#L21) | dimension | 24px |
| [`ref.space.32`](../master-tokens/generated/reference.ts#L23) | dimension | 32px |
| [`ref.space.40`](../master-tokens/generated/reference.ts#L25) | dimension | 40px |
| [`ref.space.48`](../master-tokens/generated/reference.ts#L27) | dimension | 48px |
| [`ref.space.56`](../master-tokens/generated/reference.ts#L29) | dimension | 56px |
| [`ref.space.64`](../master-tokens/generated/reference.ts#L31) | dimension | 64px |
| [`ref.space.80`](../master-tokens/generated/reference.ts#L33) | dimension | 80px |
| [`ref.space.96`](../master-tokens/generated/reference.ts#L35) | dimension | 96px |

### stroke

| Reference | Type | Value |
| --- | --- | --- |
| [`ref.stroke.width.1`](../master-tokens/generated/reference.ts#L49) | dimension | 1px |
| [`ref.stroke.width.2`](../master-tokens/generated/reference.ts#L51) | dimension | 2px |

## Validation

`node master-tokens/scripts/check.mjs` checks the current master, supported token shapes, alias resolution, export coverage, contrast calculations and output freshness. Add `--audit-adoption` only when comparing with the historical adoption snapshot.

Current color-pair findings and their targets are generated from the master in the [contrast review](../output/contrast-review/Contrast-Review.md). Build success and fresh documentation do not establish a contrast pass. Historical naming and adoption receipts retain their original values.

Release still requires compiler, full format-conformance, component accessibility and consumer-migration checks. See the [maintenance guide](README.md) for the workflow and implementation history.
