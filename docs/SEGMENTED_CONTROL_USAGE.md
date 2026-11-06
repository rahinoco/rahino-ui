# Segmented control — design and review contract

Status: **review candidate; neither tone nor any component state is approved for product use**. Owner choices recorded 2026-11-04: view switching and mutually exclusive filters; form values remain RadioGroup; text and icon-with-text variants; compare neutral and branded selection treatments. No new motion tokens.

Spacing/focus revision, 2026-11-04: the track inset and inter-segment gap increased to 4px. Segment inline padding changed to 6/8/12px and block padding to 0/2/4px for sm/md/lg. The independent 2px focus outline has zero offset and follows the native 8px segment edge. The 12px track corner and 4px inset give consistent nested geometry. In forced colors, use ButtonText for the outside focus outline against Canvas.

Validation of the 2026-11-04 spacing/focus revision: the frontend production build and targeted documentation-browser checks passed. Light/dark focused screenshots were visually inspected.

Earlier visual revision, 2026-11-04: removed the selected underline in both tones and moved sm/md/lg to 32/36/44px minimum segment heights. The initial compact recipe used a 2px group inset/gap and 6px icon-text spacing. Keep existing typography and radii, and at least 44px touch targets. The updated frontend build and documentation-browser checks passed, including exact rendered heights for all three sizes, absence of the underline, light/dark appearance, keyboard focus, 320px layout, reduced motion, forced colors and coarse-pointer target sizes. The 672-case report below records the earlier recipe, not a new full-matrix run for these visual revisions.

## Use cases

| Use | Product context | Behavior |
| --- | --- | --- |
| List / grid / board | Qipper task management or inventory | Change presentation of the same records immediately. Keep selected filters. |
| All / active / complete | Task list or project dashboard | Apply one filter. All restores the complete record set. Clicking the current option never clears selection. |
| Daily / weekly / monthly | Finance reporting | Change one period on the same report. Use manual keyboard activation for network-backed changes. |
| Text | Status or report period | Short, explicit labels visible in every segment. |
| Icon with text | Familiar layouts | One leading icon per segment; all options supply icons or none render. No added checkmark, spinner, or selection icon. |
| Neutral tone | Repeated controls, dense local tools | Quiet neutral selected surface. |
| Brand tone | A locally prominent view/filter control | Existing soft branded selection surface with branded foreground. |

Use 2–5 related options. Do not use for page/section navigation (Tabs), saved form values (RadioGroup/Select), actions (Button), multiple simultaneous filters (Checkbox or multi-select), or loading/progress feedback. No icon-only variant, error state, multiselect, vertical variant, or deselection. The host supplies loading, error and async result announcements outside the group without replacing segment icons.

## Visual recipe

| Part | Existing foundation mapping |
| --- | --- |
| Track | `rds.color.surface.sunken`, `rds.radius.12` |
| Track inset / segment gap | `rds.space.75` (4px); consistent outer clearance around the selected plate |
| Segment | Native `rds.radius.8`, no border or shadow |
| Neutral selection plate | `rds.color.surface.base`, foreground `rds.color.ink.primary` |
| Brand selection plate | `rds.color.interaction.surface.selected`, foreground `rds.color.brand.fg` |
| Selection cue | Selected surface plate and programmatic `aria-pressed`; no underline or added icon |
| Unselected text | `rds.color.ink.secondary` |
| Hover / press | Existing `interaction.neutral.hover/pressed` layers; unselected pressed text uses `ink.primary` for contrast; selected brand uses `brand.bg.hover/pressed` |
| Disabled | `ink.disabled`; selected plate uses `surface.subtle`; no opacity reduction |
| Focus | Independent `focus.ring.width` (2px), `color.focus.ring`, **zero outline offset**; follows the native segment edge without an inner white gap; does not resize or scale |
| Label | Existing script-aware label typography and control weight |
| Small / medium / large | 32 / 40 / 48px minimum outer track heights, giving 24 / 32 / 40px segments and selection plates at standard text sizes. Inline padding is 6 / 8 / 12px, block padding is 0 / 2 / 4px, and icons are 16 / 16 / 20px. |
| Label gap / icon-text gap | `rds.space.85` (6px) |
| Touch | Segments use the existing `size.touch.min` (44px), giving a minimum 52px outer track with both insets. |

The 2026-11-06 size decision applies to the outer track. The grid stretches the segment to fill the space inside its 4px insets and allows the track to grow under text zoom. The small track uses `ref.size.32`. The specified 40px and 48px heights are local recipe values. The [reusable control-height foundation proposal](COMPONENT_FOUNDATION_AUDIT_2026-11-04.md) should cover the 32/40/48px outer heights if adopted.

Small segment text uses the existing unitless `ref.font.line-height.1-7` so the 14px label fits within 24px and scales with text zoom. The visible group label and larger segments keep the standard UI line height. If other compact controls need this treatment, consider a shared line-height role for compact, single-line labels.

All colors resolve through existing semantic aliases to `ref.color.*`. Component aliases are local recipe variables only. The branded `interaction.surface.selected` role is never repurposed for neutral selection. Neutral selection explicitly uses a base surface recipe. The owner removed the supplemental selection line; visual selection now relies on the existing filled plate. Selected-surface distinction remains part of human state review; text/focus contrast checks do not establish approval of that distinction. No reference/semantic token or foundation source is changed. Forced-colors mode uses system colors and an inset track cue.

## Interaction and accessibility

The control is an accessible named `group` of native `button type=button` elements with `aria-pressed`. It does not claim tabs/tabpanel semantics and does not serialize form values. A visible group label is preferred; otherwise provide `aria-label` from a clear visible surrounding context. Optional `aria-describedby` connects essential visible explanation.

Exactly one valid option is selected. Initial selection defaults to the first enabled option (or the first option when all are disabled). Re-selecting never emits another change. Disabled options cannot activate. A currently selected option that becomes disabled retains selection; focus enters on an enabled option. If the value disappears or is invalid, the visible fallback is the first enabled option; no callback is fired during rendering. Controlled consumers must reconcile their source value when options change. The empty collection renders nothing; values must be unique and labels nonempty.

Tab/Shift+Tab use one entry point, the selected enabled item. Horizontal arrows follow visual direction, skip disabled items and wrap. Home/End follow DOM content order. Automatic activation immediately updates local views/filters on arrow movement. Manual activation moves focus without selection; Enter/Space activates through native button behavior. Leaving and re-entering the group returns to its selected enabled item. All-disabled groups have no Tab stop. Toolbar embedding needs a separate reviewed keyboard contract and is outside this candidate.

DOM order is content order; `dir=rtl` places the first option at the right without CSS order reversal. Buttons remain evenly sized. When the track overflows, activating a partially visible option or navigating to it by keyboard scrolls the track just far enough to reveal it. An option wider than the viewport reveals as much as fits. At text zoom, height can grow. Prefer Select if the context cannot accommodate the complete set.

## Motion

Reference: [Spectrum SegmentedControl source](https://github.com/adobe/react-spectrum/blob/main/packages/@react-spectrum/s2/src/SegmentedControl.tsx). Spectrum translates/resizes its selection plate and applies press feedback to content. This recipe adapts those ideas rather than importing Spectrum colors, geometry, press perspective, or its 200ms duration.

Use existing `motion.duration.feedback` (150ms) and `motion.easing.standard` for plate translation/width and state feedback. Content-only press feedback uses existing `motion.scale.subtle` (0.98) and returns to `motion.scale.rest`. The button, hit target, focus indicator and track remain fixed. Selection and host updates never wait for motion. Native CSS transitions retarget from their current interpolated position; repeated actions do not queue animations. Initial layout does not slide in. ResizeObserver keeps geometry aligned after label/font/size/layout changes. There is no shared layout identifier across instances.

Clicking or tapping a clipped option uses the browser's smooth scroll to reveal it. Keyboard navigation and reduced-motion reveals scroll immediately so the focused option is visible right away. Reduced motion also removes plate translation transitions and content scaling. No new reference, semantic or recipe motion tokens are added.

[Spectrum usage guidance](https://spectrum.adobe.com/fragments/components/segmented-control/usage-guidelines) restricts its component to view switching. Exclusive filtering is an explicit Rahino owner decision and a documented difference.

## Review and approval

The documentation route `/components/segmented-control` compares both tones using the same state and real task results. `/components/segmented-pills` also opens this review; historical exports are unchanged. Storybook: `Components/SegmentedControl`.

Browser evidence: run `node scripts/check-segmented-control-browser.mjs` in `rahino-ui`. Output goes to `tmp-verify/segmented-control/`. Checks cover both tones, both content variants, three sizes, themes, contrast contexts, directions, pointer hover/press, keyboard focus, disabled and selected-disabled states, automatic/manual activation, touch, reduced motion, forced colors, dynamic options and rapid interrupted transitions. The script reports contrast findings separately from interaction checks.

Human review must cover unselected/selected × rest/hover/press/focus; disabled selected/unselected; light/dark; standard/more contrast; RTL/LTR; small/medium/large; text and icon-with-text; touch; overflow/zoom; reduced motion and forced colors. Record reviewer, version, date, approved tones and states, and any exceptions before product adoption. Passing checks do not grant approval. Manual screen-reader and Firefox/Safari checks remain pending.

Validation recorded 2026-11-04: both project type checks and production builds passed; canonical foundation validation passed with no foundation-source changes. Chrome passed 672 state/context cases plus interaction checks and reported **zero contrast findings in the measured component pairs**. The first contrast review found a 4.3275:1 pressed-unselected label pair; mapping that state's foreground to existing `ink.primary` resolved it without new colors or tokens. This does not clear unrelated foundation diagnostics. The actual documentation bundle passed shared comparison state, working view/filter results, icon count, theme, inset keyboard focus, sizes, RTL/LTR, 320px page layout, reduced motion and component-hub discovery. Screenshots were visually inspected in light/dark and narrow layouts; human state approval remains pending.
