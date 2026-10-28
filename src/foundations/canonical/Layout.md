# Rahino Design System — Layout & Responsiveness

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

**Status:** Final foundation decisions.

Change the layout structure as space changes. Keep the current task clear and preserve necessary information and actions.

## Token references

<!-- rds:generated:layoutBindings:start -->
| Token | Reference chain | Value |
| --- | --- | --- |
| `rds.layout.breakpoint.medium` | — | 48rem |
| `rds.layout.breakpoint.wide` | — | 64rem |
| `rds.layout.content.max` | — | 1600px |
| `rds.layout.grid.medium.columns` | — | 8 |
| `rds.layout.grid.medium.gutter` | `rds.space.400` → `ref.space.24` | 24px |
| `rds.layout.grid.medium.margin` | `rds.space.400` → `ref.space.24` | 24px |
| `rds.layout.grid.narrow.columns` | — | 4 |
| `rds.layout.grid.narrow.gutter` | `rds.space.300` → `ref.space.16` | 16px |
| `rds.layout.grid.narrow.margin` | `rds.space.300` → `ref.space.16` | 16px |
| `rds.layout.grid.wide.columns` | — | 12 |
| `rds.layout.grid.wide.gutter` | `rds.space.400` → `ref.space.24` | 24px |
| `rds.layout.grid.wide.margin` | `rds.space.500` → `ref.space.32` | 32px |
<!-- rds:generated:layoutBindings:end -->

## 1. Units

| Property | Unit |
| --- | --- |
| Breakpoints, typography sizes and reading measure | `rem` |
| Spacing, gutters, margins and fixed dimensions | `px` |
| Line-height | Unitless |
| Flexible dimensions | `%`, `fr`, `auto`, `minmax()` |

Keep the root font size at `100%`. Use existing spacing and typography tokens.

## 2. Page grid

<!-- rds:generated:grid:start -->
| Range | Width | Columns | Gutter | Minimum page margin per side |
| --- | --- | --- | --- | --- |
| Narrow | Below `48rem` | 4 | 16px | 16px |
| Medium | `48rem` to below `64rem` | 8 | 24px | 24px |
| Wide | `64rem` and above | 12 | 24px | 32px |
<!-- rds:generated:grid:end -->

At a 16px browser default, the breakpoints equal **768px** and **1024px**.

**Page margin** is the space between content and the edges of its available area. **Gutter** is the space between columns. Margins may grow when content reaches its maximum width.

Columns guide alignment; they do not determine the number of cards or fields.

Page margins apply to main content. The **sidebar, header and footer have 0px outer margin**. Their internal padding is defined separately.

## 3. Content width

<!-- rds:generated:caps:start -->
| Content | Maximum width |
| --- | --- |
| Reading | 42rem |
| Marketing page | 1600px |
| Dashboard | 1600px |
| Tables and editors needing more space | Available width |
| Forms | Defined by the form recipe; no universal cap |
<!-- rds:generated:caps:end -->

Content fills available space up to its cap. Caps exclude page margins and app navigation. Reading text keeps its own cap inside wider layouts.

**Reading measure:** Use `rds.type.layout.measure.reading` as the single maximum for long-form text: `42rem`, equivalent to 672px when the root font size is 16px. Reading content fills its available width up to this cap and can shrink below it; never force a 42rem-wide column on a narrow container. The rem cap follows changes to the browser's default font size. A wider page, dashboard or marketing container does not increase the reading-text cap. There is no separate 48rem reading preset.

## 4. Essential rules

| Area | Decision |
| --- | --- |
| Hierarchy | Primary task → supporting information → readable secondary metadata. One dominant action per task region. |
| Grouping | Use spacing, headings and surface contrast first; add shadows or borders only when needed. |
| Nested layouts | Fit the container. Use only the columns and internal padding needed. |
| Responsive structure | Stack columns and supporting panels when space is insufficient. Keep actions and navigation accessible. |
| Queries | Viewport queries for the app shell; container queries for reusable components. No universal component thresholds. |
| Spacing and density | Switch between existing spacing tokens. Regular is default; Spacious is optional. Width does not select density. |
| Typography | Keep approved typography sizes; only designated headings are viewport-fluid. Allow text and controls to grow. |
| Direction | Support RTL and LTR with reading order and alignment appropriate to the content. |
| Reflow | Remain usable at 320px, 200% text resizing and 400% browser zoom. Wide tables may scroll locally. |

Exact navigation behavior, form layouts and component breakpoints belong in their recipes.

**References:** [Spectrum spacing](https://spectrum.adobe.com/foundations/layout-and-structure/spacing/layout-spacing) · [Spectrum containers](https://spectrum.adobe.com/foundations/layout-and-structure/containers) · [USWDS typography](https://designsystem.digital.gov/components/typography/) · [WCAG reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)

These references inform the principles; the numeric defaults above are RDS decisions.


**Reading-width rationale:** The 42rem value preserves Rahino's existing 672px baseline at a 16px root while following the typography unit policy. Relative reading measures are used by [USWDS](https://designsystem.digital.gov/design-tokens/typesetting/measure/); [WCAG visual-presentation guidance](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) emphasizes manageable line lengths and resizable columns. Neither source mandates 42rem. Check actual Persian, English and mixed-script line lengths using the approved fonts; this cap alone does not guarantee a particular character count.

## 5. Shared layout tokens

The approved values above are exported from [layout.ts](layout.ts). That file is generated from the master token collection; update the master and regenerate rather than editing exported values separately.

| Public token family | TypeScript export | Purpose |
| --- | --- | --- |
| `rds.layout.breakpoint.*` | `BREAKPOINTS` | Medium and wide inclusive lower bounds |
| `rds.layout.grid.*` | `PAGE_GRID` | Columns, gutters and minimum page margins for each range |
| `rds.layout.content.max` | `PAGE_MAX_WIDTH` | Shared marketing-page and dashboard cap |

All 12 token definitions and their values appear in the generated [master list](master-tokens/Master-Token-List.md).

The medium and wide breakpoint values are inclusive lower bounds: narrow is below 48rem, medium is 48rem to below 64rem, and wide starts at 64rem. These names identify the existing page-grid ranges, not device categories. In media queries, use the generated literal breakpoint values; CSS custom properties cannot be substituted into media-query conditions.

Gutter and margin values alias existing shared spacing. Reading width continues to use `rds.type.layout.measure.reading` through `TEXT_LAYOUT.measure.reading` in Typography.ts; no duplicate layout reading token is introduced. Available-width behavior, form recipes, zero outer margins on app chrome, and responsive composition remain documented rules.
