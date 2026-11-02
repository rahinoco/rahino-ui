# Button family foundation alignment

Date: 2026-10-30. Status: candidate; human state approval pending.

## Preserved definition

The family remains Button (action or link), IconButton (named icon action), and ToggleButton (persistent selection). Appearance remains `solid | soft | ghost`, intent remains `neutral | brand | danger`, and size remains `sm | md | lg`. Defaults remain soft, neutral, medium. Existing events, refs, icons, RTL mirroring, full width, native button types, loading guards, accessible names, and controlled/uncontrolled toggle behavior are preserved.

The sole new prop is `radius?: 'less' | 'more'`, shared by all three components. The owner selected 8px and 12px with 8px as default on 2026-10-30. This selection approves the radius values, not the completed components or states.

## Foundation mapping

As of 2026-11-01, the shared button shape uses 60% Figma-style corner smoothing. The radius foundation documents this as a button recipe; the 8px/12px values stay unchanged. A ResizeObserver updates equal-radius arc/Bezier geometry for labels, full width and touch dimensions. The decorative surface and neutral overlay follow the path; the native button is never clipped. A separate masked focus ring follows the smoothed outline. Elevation is derived from shadow.sm with CSS box-shadow blur converted to drop-shadow standard deviation. Forced colors use native system borders/focus, and ordinary rounded geometry remains the unmeasured/unsupported fallback. Small shapes limit smoothing to available space, matching Figma's geometric limit. Decorative geometry uses spans and data-URL masks, not additional icon SVGs.

Smoothing validation: the existing 540-case browser matrix passes in light/dark and standard/enhanced contrast, checking generated surface paths, unclipped native controls, focus masks, elevation and the single-icon limit. Resize and runtime radius-switch checks also pass. Existing keyboard, loading, reduced-motion, forced-color, mobile and touch-target checks remain passing. This implements the requested geometry and does not grant human state approval or resolve the existing foundation focus contrast finding.

| Concern | Component recipe |
| --- | --- |
| Less radius (default) | `--rds-radius-8` |
| More radius | `--rds-radius-12` |
| Solid brand | `color.action.primary.bg.default/hover/pressed`; enabled content uses `color.ink.on-brand` |
| Solid neutral | `color.surface.inverse` with `color.ink.inverse` |
| Soft neutral | `color.surface.subtle` with full-opacity `color.ink.primary`; canonical `color.interaction.neutral.hover/pressed` layers behind content |
| Soft brand | `color.brand.bg.default/hover` with `color.brand.fg` |
| Solid danger | Separate destructive recipe using `color.status.error.fill/on-fill` |
| Soft danger | Separate destructive recipe using `color.status.error.bg/fg` |
| Ghost | Transparent at rest, corresponding intent foreground; neutral interaction overlays retain their foundation alpha |
| Disabled/loading | Existing disabled fill/ink roles, blocked activation, no elevation; solid brand retains `action.primary.bg.disabled` |
| Selected | Branded selection plate and `aria-pressed`; retain the supplied icon, or show a checkmark for a text-only toggle. Never add a second icon. |
| Shadow | Solid and soft explicitly retain `shadow.sm`: light `0 3px 6px 0 rgb(0 0 0 / 0.04)`, dark `0 2px 6px 0 rgb(0 0 0 / 0.14)`; ghost and blocked controls have none |
| Feedback | `motion.duration.feedback` (150ms), `motion.easing.standard`, only color/opacity/shadow; no press scaling |
| Loading motion | One rotation is six feedback intervals (900ms) with `motion.easing.linear`; a component recipe, not an overlay timing or a new foundation token |
| Reduced motion | Spinner, button and state-layer animation/transitions stop; loading status remains announced |
| Focus | Independent `focus.ring.width` (2px), `color.focus.ring`, offset `space.50` (2px), follows either radius |
| Forced colors | System foreground/background, disabled/selection/focus cues; no shadows or alpha state layer |

Radius is independent of size, viewport, density, theme and intent. No pill shape, alternate palette, motion library, or new shared foundation value is introduced.

The foundation does not define every destructive/soft-brand/inverse/selected interaction color. Semantic-color mixes remain explicit candidate component recipes in `src/foundations/css.ts`; they are not approved foundation states. Replacing them with dedicated semantic roles would be a separate foundation decision. The former heavy soft-neutral mixes are replaced with the existing canonical neutral overlays.

Browser review found contrast failures in the previous recipes. Soft danger now mixes 8% of error.fill into error.bg for hover and 12% for pressed, retaining error.fg; selected danger shares these states. Solid danger still uses the existing 18%/32% shade recipe, with `light-dark(ink.primary, ink.inverse)` choosing dark ink in both schemes instead of lightening the dark-mode fill. Neutral toggles now follow the same canonical branded selection plate/hover/pressed recipe as brand toggles. None of these changes edits the master palette. `light-dark()` follows the foundation's existing `color-scheme`; this recipe targets modern browsers ([CSS documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark)).

## Use cases

The [button usage guide](BUTTON_USAGE.md) defines all nine appearance/intent recipes, the three behavior types, Persian content, size/state guidance and evidence. The owner confirmed primary-right RTL placement and risk-based destructive actions on 2026-11-01; component state approval remains separate.

| Component | Use cases | Usage rules |
| --- | --- | --- |
| Button | Save an expense, submit a form, cancel, continue, confirm deletion, navigate to details | One primary action per action group; use explicit `type="submit"` in forms; use `href` for navigation; loading blocks repeated activation. Solid/brand is the primary action, ghost is subordinate, danger identifies a destructive action with explicit wording. |
| IconButton | Add an item, delete a table row, reveal a password, open an action | Supply a meaningful `aria-label`; use when the icon is recognizable in context; expose persistent selection through ToggleButton instead. |
| ToggleButton | Choose list/grid view, bookmark an item, enable a persistent toolbar option | Keep the label and supplied icon stable; expose selection with `aria-pressed` and the selected treatment. A text-only toggle may use one checkmark. Coordinate mutually exclusive choices in the consuming application. |

Use `less` for the existing regular control treatment, particularly dense forms and tables. Use `more` for a deliberately softer control group or product context. Keep related actions consistent; radius does not communicate intent, selection or priority.

## Single-icon rule

The owner requires every button to display at most one icon, including checkmarks and spinners. Use either `iconStart` or `iconEnd`, with one icon in that slot. If legacy callers pass both, only `iconStart` renders. Loading replaces the icon in its current slot and suppresses any selection checkmark; spinners are not direction-mirrored. A toggle with a supplied icon keeps that icon when selected, with no extra checkmark. A text-only toggle reserves one slot for its checkmark or spinner to keep its label stable. IconButton children must contain one icon, and button labels must not embed additional icons.

## Review and approval

Both radius sets appear in the documentation at `/components/button`, in its interactive playground, and in the Storybook RadiusVariants story. The browser fixture covers all combinations of two radii, three appearances, three intents, three sizes and three family members, including disabled/loading and selected toggles.

Required checks: default, hover, active, focus-visible, disabled, loading, and selected; light/dark and enhanced contrast; real keyboard activation and retained loading focus; repeated activation guards; RTL/LTR and narrow screens; reduced motion; native forced colors.

Run `npm run typecheck`, `node scripts/button-behavior.mjs`, `node scripts/check-button-browser.mjs`, and `npm run tokens:check-generated` in the library. Run `npm run typecheck` and `npm run build` in the documentation project. Browser evidence is written under `tmp-verify/button-foundations/` and does not constitute human approval.

Known foundation contrast failures remain in `src/foundations/canonical/output/contrast-review/`. The normal token/release gate must remain active. Browser rendering checks do not certify all contrast pairs, assistive technology behavior, physical touch devices or production performance.

Verification on 2026-10-30: both project typechecks passed, the documentation production build passed, existing button behavior checks passed, generated outputs were current, and foundation behavior passed across 288 contexts. The browser fixture passed 540 rendered cases in four theme/contrast contexts with default, hover, active and focus-visible inspection (8,640 inspections), plus keyboard/loading/link/toggle interactions, reduced motion, forced colors, mobile RTL/LTR and coarse-pointer target checks. After correcting the component mixes, no measured enabled foreground/background pair in this fixture fell below 4.5:1. Measurements use the fixture's opaque base background, including neutral alpha state layers; they do not certify focus adjacency or arbitrary product backdrops. At that review, `npm run tokens:check` failed on the pre-existing dark focus contrast against the raised surface (2.9694:1 versus 3:1). After integrating the upstream CI policy on 2026-11-02, the check passes with known diagnostic exceptions registered separately; the contrast finding and pending human state approval remain.

Before product usage, record the human reviewer, date, component/version, radius sets, reviewed states, contexts and any accepted exceptions. No state is marked approved by this change.

## Rollback

Omitting `radius` preserves the existing 8px default. To roll back the redesign, revert only the component, API, recipe, generated CSS and documentation changes for this task, then regenerate foundation output. Do not reset unrelated edits or change the canonical master values.
