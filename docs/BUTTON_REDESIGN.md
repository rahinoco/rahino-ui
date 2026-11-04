# Button family foundation alignment

Date: 2026-10-30. Status: candidate; human state approval pending.

## Preserved definition

The family remains Button (action or link), IconButton (named icon action), and ToggleButton (persistent selection). Appearance remains `solid | soft | ghost`, intent remains `neutral | brand | danger`, and size remains `sm | md | lg`. Defaults remain soft, neutral, medium. Existing events, refs, icons, RTL mirroring, full width, native button types, loading guards, accessible names, and controlled/uncontrolled toggle behavior are preserved.

The sole new prop is `radius?: 'less' | 'more'`, shared by all three components. The owner selected 8px and 12px with 8px as default on 2026-10-30. This selection approves the radius values, not the completed components or states.

## Foundation mapping

Button, IconButton and ToggleButton use native CSS rounding. The less/more variants continue to consume radius.8 (default) and radius.12. Backgrounds, shadow.sm elevation and the independent 2px focus outline use native CSS. No measured paths, masks, filtered paint layers, ResizeObserver or MutationObserver are needed for the button shape.

The browser review covers both radii, all appearances/intents/sizes and family members, native geometry at fractional dimensions, focus, keyboard/loading behavior, forced colors, reduced motion and coarse-pointer targets. Passing checks does not grant human state approval.

| Concern | Component recipe |
| --- | --- |
| Less radius (default) | `--rds-radius-8` |
| More radius | `--rds-radius-12` |
| Solid brand | `color.action.primary.bg.default/hover/pressed`; enabled content uses `color.ink.on-brand` |
| Solid neutral | `color.action.neutral.bg.default/hover/pressed` with `color.ink.inverse` |
| Soft neutral | `color.action.neutral-subtle.bg.default/hover/pressed` with full-opacity `color.ink.primary`; opaque fills, no overlay |
| Soft brand | `color.brand.bg.default/hover/pressed` with `color.brand.fg` |
| Solid danger | `color.action.danger.bg.default/hover/pressed` with `color.status.error.on-fill` |
| Soft danger | `color.action.danger-subtle.bg.default/hover/pressed` with stable contrasting `color.action.danger-subtle.fg.default/hover/pressed` |
| Ghost | No background paint at rest (`none`); semantic intent fills and foregrounds on hover/press; no alpha overlay |
| Disabled/loading | Existing disabled fill/ink roles, blocked activation, no elevation; solid brand retains `action.primary.bg.disabled` |
| Selected | Branded selection plate and `aria-pressed`; retain the supplied icon, or show a checkmark for a text-only toggle. Never add a second icon. |
| Shadow | Solid and soft explicitly retain `shadow.sm`: light `0 3px 6px 0 rgb(0 0 0 / 0.04)`, dark `0 2px 6px 0 rgb(0 0 0 / 0.14)`; ghost and blocked controls have none |
| Feedback | Immediate semantic color switches; no opacity, color or shadow interpolation and no press scaling |
| Loading motion | One rotation is six feedback intervals (900ms) with `motion.easing.linear`; a component recipe, not an overlay timing or a new foundation token |
| Reduced motion | Spinner rotation stops and toggle slot changes are immediate; loading status remains announced |
| Focus | Independent `focus.ring.width` (2px), `color.focus.ring`, offset `space.50` (2px), follows either radius |
| Forced colors | System foreground/background, disabled/selection/focus cues; no shadows or alpha state layer |

Radius is independent of size, viewport, density, theme and intent. No pill shape, alternate reference palette or motion library is introduced. Reusable semantic action-state aliases were added on 2026-11-03.

On 2026-11-03 the owner selected reusable semantic action-state roles backed by existing references. After reviewing the initial foreground-only danger feedback, the owner requested consistency with the other soft buttons: semantic background changes with stable contrasting label/icon colors. All previous mixed recipes and the unused softened focus recipe are removed. Neutral soft/ghost states use opaque semantic fills rather than composited overlays. Color transitions and spinner fade-in are removed because their intermediate colors/alpha would be outside the selected tokens. Spinner rotation remains.

The [semantic action color mapping](BUTTON_COLOR_MAPPING.md) records each added role, use case and light/dark reference mapping. Theme previews preserve reference aliases, including enhanced-contrast overrides. Ghost rest uses background `none` to express absence of paint; it does not create an alpha-zero reference. Forced-colors mode retains native system-color cues. Human component/state approval remains pending.

## Use cases

The [button usage guide](BUTTON_USAGE.md) defines all nine appearance/intent recipes, the three behavior types, Persian content, size/state guidance and evidence. The owner confirmed primary-right RTL placement and risk-based destructive actions on 2026-11-01; component state approval remains separate.

| Component | Use cases | Usage rules |
| --- | --- | --- |
| Button | Save an expense, submit a form, cancel, continue, confirm deletion, navigate to details | One primary action per action group; use explicit `type="submit"` in forms; use `href` for navigation; loading blocks repeated activation. Solid/brand is the primary action, ghost is subordinate, danger identifies a destructive action with explicit wording. |
| IconButton | Add an item, delete a table row, reveal a password, open an action | Supply a meaningful `aria-label`; use when the icon is recognizable in context; expose persistent selection through ToggleButton instead. |
| ToggleButton | Choose list/grid view, bookmark an item, enable a persistent toolbar option | Keep the label and supplied icon stable; expose selection with `aria-pressed` and the selected treatment. A text-only toggle may use one checkmark. Coordinate mutually exclusive choices in the consuming application. |

Use `less` for the existing regular control treatment, particularly dense forms and tables. Use `more` for a deliberately softer control group or product context. Keep related actions consistent; radius does not communicate intent, selection or priority.

## Single-icon rule

On 2026-11-03 the owner requested migration to the adopted [icon foundation](../src/foundations/canonical/Icons.md). All button-family icons, spinners and checkmarks now use `rds.icon.size.sm/md/lg` and `rds.icon.stroke.width`: 16/20/24px with stroke 2.25 on the 24 × 24 SVG grid (visible strokes 1.5/1.875/2.25px). Outlines retain round caps/joins, scale proportionally and inherit the button's semantic foreground; state changes never change their weight. Direction-dependent action icons mirror only in RTL, while loading spinners never mirror. Other component icon bindings remain outside this migration. State approval remains pending.

The owner requires every button to display at most one icon, including checkmarks and spinners. Use either `iconStart` or `iconEnd`, with one icon in that slot. If legacy callers pass both, only `iconStart` renders. Loading replaces the icon in its current slot and suppresses any selection checkmark; spinners are not direction-mirrored. A toggle with a supplied icon keeps that icon when selected, with no extra checkmark. A text-only toggle has no icon space in default or hover. Selection reveals one checkmark and its logical leading gap together, using `motion.duration.feedback` (150ms) and `motion.easing.enter`; deselection reverses the same transition. The fixed-size icon is clipped by the expanding slot, without color/opacity interpolation or shape scaling. Reduced motion switches the slot immediately. Loading uses the same slot for its spinner. No foundation addition is needed. IconButton children must contain one icon, and button labels must not embed additional icons.

## Review and approval

Both radius sets appear in the documentation at `/components/button`, in its interactive playground, and in the Storybook RadiusVariants story. The browser fixture covers all combinations of two radii, three appearances, three intents, three sizes and three family members, including disabled/loading and selected toggles.

Required checks: default, hover, active, focus-visible, disabled, loading, and selected; light/dark and enhanced contrast; real keyboard activation and retained loading focus; repeated activation guards; RTL/LTR and narrow screens; reduced motion; native forced colors.

Run `npm run typecheck`, `node scripts/button-behavior.mjs`, `node scripts/check-button-browser.mjs`, and `npm run tokens:check-generated` in the library. Run `npm run typecheck` and `npm run build` in the documentation project. Browser evidence is written under `tmp-verify/button-foundations/` and does not constitute human approval.

Known foundation contrast failures remain in `src/foundations/canonical/output/contrast-review/`. The normal token/release gate must remain active. Browser rendering checks do not certify all contrast pairs, assistive technology behavior, physical touch devices or production performance.

Historical verification on 2026-10-30 (before the 2026-11-03 color rewrite): both project typechecks passed, the documentation production build passed, existing button behavior checks passed, generated outputs were current, and foundation behavior passed across 288 contexts. The browser fixture passed 540 rendered cases in four theme/contrast contexts with default, hover, active and focus-visible inspection (8,640 inspections), plus keyboard/loading/link/toggle interactions, reduced motion, forced colors, mobile RTL/LTR and coarse-pointer target checks. After correcting the component mixes, no measured enabled foreground/background pair in this fixture fell below 4.5:1. Measurements use the fixture's opaque base background, including neutral alpha state layers; they do not certify focus adjacency or arbitrary product backdrops. At that review, `npm run tokens:check` failed on the pre-existing dark focus contrast against the raised surface (2.9694:1 versus 3:1). After integrating the upstream CI policy on 2026-11-02, the check passes with known diagnostic exceptions registered separately; the contrast finding and pending human state approval remain.

Verification on 2026-11-03 after the semantic-only color rewrite: the normal token gate passed, including current generated outputs and resolver checks; both project typechecks, the documentation production build, button behavior and foundation behavior passed. Browser review passed all 540 rendered cases across two themes, two contrast modes and four inspected states (8,640 inspections), with zero enabled foreground/background pairs below 4.5:1. Checks also verified semantic state fill/foreground selection, absence of color interpolation/opacity overlays, preview aliases in all four theme/contrast contexts with the opposite root theme, keyboard/loading/link/toggle behavior, reduced motion, native forced colors, RTL/LTR layout and coarse-pointer targets. Evidence: `tmp-verify/button-foundations/report.json` and screenshots in the same directory. Existing foundation focus diagnostics remain separate. Component/state approval remains pending.

Follow-up consistency review on 2026-11-03: soft danger now changes its semantic fill across default/hover/pressed with one stable foreground, matching soft neutral and soft brand. All 8,640 browser inspections passed with zero enabled text contrast failures; new assertions verify three distinct fills and one foreground for each soft intent in both themes and contrast modes. The token gate and library typecheck passed. Review image: `tmp-verify/button-foundations/soft-state-consistency.png`. Visual state approval remains pending.

Icon migration verification on 2026-11-03: token checks and both project typechecks passed. All 8,640 browser state inspections passed with checks for canonical 16/20/24px size, the original 24 × 24 viewBox, proportional visible stroke, round outlines, inherited semantic/system foreground, decorative accessibility, single-icon rendering and RTL direction behavior. Button behavior checks passed, including the loading IconButton mirroring regression. Browser review retains zero enabled text contrast failures. Human state approval remains pending.

Toggle sizing verification on 2026-11-04: default and hover widths match an equivalent text-only Button at all three sizes in RTL and LTR. Browser checks sample the slot transition halfway, verify the final width adds exactly the icon plus foundation gap, reverse an in-progress transition, and confirm deselection restores the original width. Reduced-motion checks verify immediate slot changes. All 8,640 existing theme/contrast/state inspections, button behavior, generated-output checks, both project typechecks and the documentation production build passed. Visual evidence: `tmp-verify/button-foundations/toggle-states.png`; animation measurements: `report.json` in the same directory. Human state approval remains pending.

Before product usage, record the human reviewer, date, component/version, radius sets, reviewed states, contexts and any accepted exceptions. No state is marked approved by this change.

## Rollback

Omitting `radius` preserves the existing 8px default. To roll back the redesign, revert only the component, API, recipe, generated CSS and documentation changes for this task, then regenerate foundation output. Do not reset unrelated edits or change the canonical master values.
