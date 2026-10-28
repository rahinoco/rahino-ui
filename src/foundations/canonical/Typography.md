# Typography

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

Rahino uses one semantic typography scale across desktop, tablet, and mobile. Choose a **role based on content and available space**, not on the device. A role includes size, weight, and line-height; select the complete style for that role.

## Fonts

<!-- rds:generated:fonts:start -->
| Content | Semantic token | Reference | Font |
| --- | --- | --- | --- |
| Persian | `rds.font.family.fa` | `ref.font.family.iranyekanx` | IRANYekanX, sans-serif |
| English | `rds.font.family.latin` | `ref.font.family.roboto-condensed` | "Roboto Condensed", sans-serif |
| Technical text | `rds.font.family.code` | `ref.font.family.system-monospace` | ui-monospace, SFMono-Regular, Consolas, monospace |
<!-- rds:generated:fonts:end -->

**Available fonts:** IRANYekanX supports weights 400–800 (600 = DemiBold); Roboto Condensed is variable (100–900). Use real font weights, not browser-synthesized bold.

## Typography tokens

All line-heights are unitless multipliers, identical for Persian and English. For Figma, multiply by 100 (`1.8` = `180%`). Token names use the `rds.type` prefix.

<!-- rds:generated:typography:start -->
| Role | Font size / reference | Weight / reference | Line height / reference | Use | Avoid |
| --- | --- | --- | --- | --- | --- |
| `rds.type.caption-sm` | 0.75rem<br>`ref.font.size.rem-0-75` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Optional timestamps, update notes and minor chart metadata. | Essential information, errors and interactive actions. |
| `rds.type.caption-md` | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Secondary metadata, card bylines, dates and status details. | Main content and interactive labels. |
| `rds.type.ui-sm` | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Compact lists, table cells, filter values and short secondary UI text. | Paragraphs and primary mobile actions. |
| `rds.type.ui-md` | 1rem<br>`ref.font.size.rem-1` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Main navigation, menu items, list content and selection values. | Headings and long-form paragraphs. |
| `rds.type.label-sm` | 0.875rem<br>`ref.font.size.rem-0-875` | 500<br>`rds.font.weight.medium` → `ref.font.weight.500` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Compact buttons, chips, column labels and small/medium controls. | Long descriptions and prominent mobile calls to action. |
| `rds.type.label-md` | 1rem<br>`ref.font.size.rem-1` | 500<br>`rds.font.weight.medium` → `ref.font.weight.500` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Form labels, primary buttons, tabs and prominent touch controls. | Paragraphs and decorative headings. |
| `rds.type.body-sm` | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.95<br>`rds.type.line-height.reading` → `ref.font.line-height.1-95` | Multi-line help, validation explanations and supporting descriptions. | Short table values and control labels. |
| `rds.type.body-md` | 1rem<br>`ref.font.size.rem-1` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.95<br>`rds.type.line-height.reading` → `ref.font.line-height.1-95` | Default paragraphs, guides, reports and dialog explanations. | Dense rows, menu labels and button text. |
| `rds.type.body-lg` | 1.125rem<br>`ref.font.size.rem-1-125` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.95<br>`rds.type.line-height.reading` → `ref.font.line-height.1-95` | Short introductions, onboarding leads and prominent explanations. | Long mobile paragraphs and compact cards. |
| `rds.type.title-sm` | 1rem<br>`ref.font.size.rem-1` | 600<br>`rds.font.weight.semibold` → `ref.font.weight.600` | 1.7<br>`rds.type.line-height.heading` → `ref.font.line-height.1-7` | Task/card titles, list-item names and compact mobile group headings. | The main page title. |
| `rds.type.title-md` | 1.25rem<br>`ref.font.size.rem-1-25` | 600<br>`rds.font.weight.semibold` → `ref.font.weight.600` | 1.7<br>`rds.type.line-height.heading` → `ref.font.line-height.1-7` | Dialogs, sheets, panels, large cards and roomy KPI values. | Repeated dense rows and narrow KPI columns. |
| `rds.type.heading-section` | 1.5rem<br>`ref.font.size.rem-1-5` | 600<br>`rds.font.weight.semibold` → `ref.font.weight.600` | 1.7<br>`rds.type.line-height.heading` → `ref.font.line-height.1-7` | Major page sections and substantial report sections. | Small cards, mobile dialogs and minor subsections; use title-md for compact section headers. |
| `rds.type.heading-page` | clamp(1.5rem, calc(1.357143rem + 0.714286vw), 2rem)<br>CSS expression | 700<br>`rds.font.weight.bold` → `ref.font.weight.700` | 1.7<br>`rds.type.line-height.heading` → `ref.font.line-height.1-7` | Primary page heading, normally once per page. Fluid 24–32px at a 16px root; allow wrapping on small screens. | Card, sheet and nested-section titles. |
| `rds.type.display` | clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem)<br>CSS expression | 700<br>`rds.font.weight.bold` → `ref.font.weight.700` | 1.6<br>`rds.type.line-height.display` → `ref.font.line-height.1-6` | Marketing heroes, welcome screens and expressive moments. Fluid 32–64px at a 16px root. | Everyday dashboards, forms and routine app pages. |
| `rds.type.input-touch` | 1rem<br>`ref.font.size.rem-1` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.8<br>`rds.type.line-height.ui` → `ref.font.line-height.1-8` | Editable field values and placeholders on touch devices; remains 16px across screen sizes. | Input labels, helper text and buttons. |
| `rds.type.code` | 0.875rem<br>`ref.font.size.rem-0-875` | 400<br>`rds.font.weight.regular` → `ref.font.weight.400` | 1.6<br>`rds.type.line-height.fixed` → `ref.font.line-height.1-6` | Standalone code snippets, commands and technical literals in LTR. | General copy. Inline code inherits parent line-height. |
<!-- rds:generated:typography:end -->

**Profiles:** `UI` = short interface text and controls · `Reading` = multi-line prose · `Heading` = structural titles · `Display` = expressive large text · `Fixed` = code only.

## Source and format

Edit semantic text styles in [typography.json](master-tokens/typography.json). Each property references an existing token; the tables show the chain through to its raw reference and resolved value.

Two format exceptions preserve existing behavior: letter spacing stays unspecified and the two fluid sizes retain their CSS `clamp()` expressions. The styles use a project-specific structure because the [DTCG typography composite](https://www.designtokens.org/tr/2025.10/format/#typography) requires explicit letter spacing and dimension-based font sizes. They remain semantic typography styles.

## Shared typography properties

<!-- rds:generated:typeProperties:start -->
| Token | Reference | Value |
| --- | --- | --- |
| `rds.font.weight.bold` | `ref.font.weight.700` | 700 |
| `rds.font.weight.medium` | `ref.font.weight.500` | 500 |
| `rds.font.weight.regular` | `ref.font.weight.400` | 400 |
| `rds.font.weight.semibold` | `ref.font.weight.600` | 600 |
| `rds.type.line-height.display` | `ref.font.line-height.1-6` | 1.6 |
| `rds.type.line-height.fixed` | `ref.font.line-height.1-6` | 1.6 |
| `rds.type.line-height.heading` | `ref.font.line-height.1-7` | 1.7 |
| `rds.type.line-height.reading` | `ref.font.line-height.1-95` | 1.95 |
| `rds.type.line-height.ui` | `ref.font.line-height.1-8` | 1.8 |
| `rds.type.layout.gap.section-content` | `rds.space.300` → `ref.space.16` | 16px |
| `rds.type.layout.gap.title-description` | `rds.space.100` → `ref.space.8` | 8px |
| `rds.type.layout.measure.reading` | — | 42rem |
| `rds.type.layout.measure.wide` | `rds.type.layout.measure.reading` | 42rem |
<!-- rds:generated:typeProperties:end -->

## Applying the approved fonts

The base `TYPOGRAPHY` export keeps the shared role metrics. Use `TYPOGRAPHY_BY_SCRIPT` from Typography.ts when a complete style with an explicit font family is needed:

| Content | Complete-style selection | Font binding |
| --- | --- | --- |
| Persian | `TYPOGRAPHY_BY_SCRIPT.fa[role]` | `rds.font.family.fa` |
| English | `TYPOGRAPHY_BY_SCRIPT.latin[role]` | `rds.font.family.latin` |
| Standalone code in either context | `TYPOGRAPHY_BY_SCRIPT.fa.code` or `TYPOGRAPHY_BY_SCRIPT.latin.code` | `rds.font.family.code` |

All 16 roles are available in both selections. These styles are derived from the existing role definitions and font tokens, so font size, weight, line-height, profile and fluid-heading formulas stay the same. The existing explicit code-font override takes precedence over the surrounding language.

Choose the content-script selection explicitly; these exports do not inspect text or choose RTL/LTR direction. For mixed text, apply the appropriate font to each language run while preserving its parent role metrics. Inline code continues to inherit its parent size and line-height; the standalone code role is not an inline-code reset. Font assets must still be loaded by the consuming application.

## Direction and mixed-language text

Persian and RTL are the default. Use logical `start`/`end` for placement and keep DOM, reading and keyboard order consistent. **Font selection follows the script, not text direction.**

| Content            | Rule                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Persian            | RTL; align to `start`. No justification, manual Kashida or decorative letter spacing.                                     |
| Standalone English | LTR; use Roboto Condensed.                                                                                                |
| Mixed text         | Follow the main language's direction; isolate numbers, URLs, emails and technical identifiers where needed.               |
| User input         | Use the appropriate direction (such as `dir="auto"`); preserve what the user typed.                                       |
| Numbers and tables | Display Persian digits except in technical literals. Right-align amount columns without switching the whole table to LTR. |
| Icons and charts   | Mirror only direction-dependent icons; do not automatically flip logos, media controls or time axes.                      |

## Responsive behavior

The **same tokens** apply at all widths. Only page and display headings change size fluidly; layout, wrapping, and role selection handle smaller screens.

| Token          | CSS size                                              | Range   |
| -------------- | ----------------------------------------------------- | ------- |
| `heading-page` | `clamp(1.5rem, calc(1.357143rem + 0.714286vw), 2rem)` | 24–32px |
| `display`      | `clamp(2rem, calc(1.428571rem + 2.857143vw), 4rem)`   | 32–64px |

| Mobile situation                 | Recommended choice                                                             |
| -------------------------------- | ------------------------------------------------------------------------------ |
| Task or list card                | `title-sm` + `ui-sm`; `caption-md` for secondary metadata                      |
| Form or bottom sheet             | `title-md` + `label-md` + `input-touch`; `body-sm` for help/error explanations |
| Primary page header              | `heading-page`; allow wrapping and shorten the title where possible            |
| Sections inside compact screens  | Prefer `title-md`; reserve `heading-section` for major sections                |
| Two-column KPI with long numbers | Use `title-sm` or move to one column; do not shrink text arbitrarily           |
| Long-form content                | `body-md` on every screen, with flexible text containers                       |
| Marketing or onboarding          | `display` only where its height will not obstruct the main action              |

## Usage rules

Text colors come from the [semantic color roles](Color.md), independently of the typography metrics. Check the [current text contrast table](Color.md#neutral-resting-text-contrast) for the actual surface and contrast context. After the 2026-10-28 palette update, light `rds.color.ink.tertiary` on `rds.color.surface.sunken` is 4.4442:1, below the existing 4.5:1 ordinary-text target. The typography scale and color-role usage mappings are unchanged.

- **Hierarchy:** Use the defined typography roles. Make text bold only when it needs emphasis. `caption-md` is for metadata; `ui-sm` is for short interface text.
- **Legibility:** Keep essential UI text at **14px or larger**. Reserve 12px for optional metadata. Touch inputs remain 16px; touch-target size is controlled by the component, not the font size.
- **Text behavior:** Wrap important text and allow components to grow. Never reduce font size to force a label into one line or clip required content inside a fixed-height control.
- **Mixed-script typography:** Inline English inherits its parent size and line-height; code uses LTR direction.
- **Reading width:** Use `rds.type.layout.measure.reading`, a maximum of `42rem` (672px at a 16px root). Let the text column fill available space and shrink below the cap on narrow containers. Wider page layouts use the same reading cap. The previous 48rem allowance is retired. The legacy `rds.type.layout.measure.wide` name temporarily aliases `reading`; it is not a separate wider preset.
- **Reading paragraphs:** Use `1em` only between consecutive paragraphs in reading content, such as articles, reports and multi-paragraph help text. The gap follows the paragraph font size: 16px text gets a 16px gap; 18px text gets an 18px gap. This is paragraph separation, not line-height or a general interface-gap rule.
- **Interface spacing:** Fields, cards, labels and sections use the existing shared spacing scale. Keep the approved text-layout relationships: `8px` (`rds.space.100`) between a title and its description, and `16px` (`rds.space.300`) between a section heading and its content. Apply spacing through the layout/text recipe, not implicit margins in every typography role.
- **Accessibility:** Text must stay visible when the screen is narrow (320px), the text is doubled in size (200%), or users increase text spacing. Allow wrapping and growth; never clip or overlap content. Use heading levels (`h1`–`h6`) in the correct order.

### Reading paragraph spacing

Keep `rds.type.layout.gap.paragraph` / `TEXT_LAYOUT.gap.paragraph` as the existing `1em` CSS recipe. Apply the separation once between adjacent reading paragraphs, in the paragraphs' font-size context. A wrapper's `gap: 1em` follows the wrapper font size, so it represents this rule only when that matches the paragraphs. Do not add the gap automatically after every text element, use it for interface-element gaps, or replace it with a fixed 16px value.

This is an explicit text-relative recipe exception to the px spacing-scale policy. Store its proportional rule outside ordinary DTCG dimension tokens; preserve the existing export name and CSS behavior. [USWDS typography guidance](https://designsystem.digital.gov/components/typography/#whitespace) supports em-based paragraph separation. Check the result with the approved Persian and English fonts; the unit alone does not establish readability.

Allow users to override paragraph spacing to at least twice the font size without losing content or functionality. This is an adaptability check, not a requirement to set the default gap to `2em`. See [WCAG Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing).

## Responsive layout check

A browser-based fixture tested task cards, financial KPIs, a form, reading content and headings with the current values. Fonts were **substitutes**, not the production IRANYekanX/Roboto Condensed, so this verifies layout behavior only—not final glyph rendering or readability with real users.

| Test                      | Observation                                                                                     | Design implication                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 320px viewport            | Sample task card ~211px high; long section heading 3 lines; narrow KPI value wraps              | Avoid large headings within compact cards; adapt KPI columns          |
| 360–390px                 | Same task card ~158px; KPI fits one line in the tested fixture                                  | Reflow and component width matter as much as token choice             |
| 200% text-size simulation | No document-level horizontal overflow in flexible fixtures; content became substantially taller | Do not use fixed-height text containers; validate each real component |

**Experimental comparison (not adopted):** Changing UI line-height from `1.8` to `1.65` and heading from `1.7` to `1.5` reduced the sample 320px task card from ~211px to ~193px. This is a geometry result only; test the actual fonts and reading comfort before considering any value change.

**Status:** The token roles and mobile usage guidance above are recommended. This is not a production-app audit or a human readability study. Before release, check real fonts at 320/360/390px in Persian, English and mixed text, including forms, tables, dialogs and text enlargement.

## References

- [Adobe Spectrum — Typography](https://spectrum.adobe.com/foundations/typography/typography-system)
- [Atlassian — Applying typography](https://atlassian.design/foundations/typography/applying-typography)
- [Material 3 — Type scale](https://developer.android.com/develop/ui/compose/designsystems/material3)
- [WCAG — Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow) and [Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)
