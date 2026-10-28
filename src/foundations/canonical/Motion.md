# Rahino Design System — Motion & Interaction

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

**Status:** Phase one — visual motion testing in Figma completed (confirmed by the foundation owner). Qipper implementation testing remains pending.

## 1. Design Principle

Motion in Rahino must feel **natural, responsive, precise, and unobtrusive**.

Animation should provide feedback, clarify state changes, or preserve continuity not attract attention.

**Interaction always takes priority over animation.**

## 2. Motion Tokens

<!-- rds:generated:duration:start -->
| Token | Reference | Duration | Usage |
| --- | --- | --- | --- |
| `rds.motion.duration.dissolve` | `ref.motion.duration.150` | 150ms | Immediate state updates and navigation transitions when motion improves orientation |
| `rds.motion.duration.feedback` | `ref.motion.duration.150` | 150ms | Hover, pressed, color changes, toggles, and subtle elevation transitions |
| `rds.motion.duration.none` | `ref.motion.duration.0` | 0ms | No animated transition; the lower endpoint of the documented reduced-motion range (0–80ms) |
| `rds.motion.duration.overlay` | `ref.motion.duration.240` | 240ms | Entry timing for popovers, menus, and dialogs. |
| `rds.motion.duration.presentation` | `ref.motion.duration.480` | 480ms | Optional nonessential expressive motion, primarily in landing pages and presentation experiences. |
| `rds.motion.duration.reduced` | `ref.motion.duration.80` | 0–80ms | Upper bound for useful opacity feedback under reduced motion |
<!-- rds:generated:duration:end -->

Exits should generally take **75–85% of entry duration**. Adjust durations only when interaction scale or spatial distance justifies it.

## 3. Easing

<!-- rds:generated:easing:start -->
| Token | Reference | Value |
| --- | --- | --- |
| `rds.motion.easing.enter` | `ref.motion.easing.curve-02` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| `rds.motion.easing.exit` | `ref.motion.easing.curve-03` | `cubic-bezier(0.3, 0, 0.56, 1)` |
| `rds.motion.easing.linear` | `ref.motion.easing.linear` | `linear` |
| `rds.motion.easing.standard` | `ref.motion.easing.curve-01` | `cubic-bezier(0, 0, 0.58, 1)` |
<!-- rds:generated:easing:end -->

Avoid bounce, elastic, overshoot, and exaggerated spring effects in functional interfaces.

### Movement and scale tokens

<!-- rds:generated:motionGeometry:start -->
| Token | Reference | Value |
| --- | --- | --- |
| `rds.motion.scale.rest` | `ref.motion.scale.1` | 1 |
| `rds.motion.scale.subtle` | `ref.motion.scale.0-98` | 0.98 |
| `rds.motion.translation.dialog-max` | `ref.motion.distance.8` | 8px |
| `rds.motion.translation.popover-max` | `ref.motion.distance.4` | 4px |
| `rds.motion.translation.popover-subtle` | `ref.motion.distance.2` | 2px |
<!-- rds:generated:motionGeometry:end -->

## 4. Interaction Rules

- **Immediate feedback:** Never delay interaction for animation.
- **Buttons:** Use subtle color or elevation transitions. Press scaling is optional, with a minimum scale of 0.98.
- **Popovers and menus:** Use opacity with a maximum 2–4px translation.
- **Dialogs:** Use opacity with up to 8px translation or scale from 0.98. Avoid combining effects unnecessarily.
- **Navigation:** Animate only when it improves orientation. Keep persistent UI stable.
- **Tables and forms:** Prioritize stability. Avoid animated numbers, staggered rows, and unnecessary layout movement.
- **Loading:** Never introduce artificial delays. Use meaningful progress indicators or stable placeholders when necessary.

## 5. Motion Behavior

- Motion must reinforce spatial relationships and interaction direction, including RTL.
- Animations must be interruptible and reversible from their current state.
- Repeated interactions must not queue animations or cause visual jumps.
- Avoid unnecessary entrance animations, cascading reveals, parallax, and decorative movement.
- Do not animate elements simply because they appear on screen.

## 6. Accessibility & Performance

- Respect `prefers-reduced-motion`: remove nonessential movement and scaling; allow up to 80ms opacity feedback when useful.
- Never communicate essential information through motion alone.
- Prefer `transform` and `opacity` for movement.
- Avoid `transition: all`, expensive layout animations, and frequent blur effects.
- Target smooth 60fps interactions on representative devices without compromising input responsiveness.
- Use shared motion tokens consistently across components.

## 7. Brand Consistency

Rahino's motion language should feel **calm, confident, fluid, and purposeful**.

Expressive animations belong primarily in landing pages and presentation experiences, not everyday product workflows.

## 8. Validation

**Phase one — completed:** Visual motion testing in Figma. This status is based on the foundation owner's confirmation; it does not establish browser behavior, device performance or production accessibility.

**Implementation testing — pending:** Verify the motion in Qipper components, particularly buttons, menus, dialogs, navigation and data tables. Include rapid repeated interactions, interrupted transitions, RTL, keyboard navigation, reduced motion and lower-powered devices before release.

**Core rule: If motion doesn't improve usability, don't animate.**
