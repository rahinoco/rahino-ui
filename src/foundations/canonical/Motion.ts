/**
 * Rahino Design System — Motion foundations
 * Generated from the canonical master collection. Do not edit values here.
 * Regenerate: node master-tokens/scripts/build.mjs
 * Guide: Motion.md.
 */

export const DURATION = {
  /** @token rds.motion.duration.none @alias ref.motion.duration.0 */
  "none": "0ms",
  /** @token rds.motion.duration.dissolve @alias ref.motion.duration.150 */
  "dissolve": "150ms",
  /** @token rds.motion.duration.feedback @alias ref.motion.duration.150 */
  "feedback": "150ms",
  /** @token rds.motion.duration.overlay @alias ref.motion.duration.240 */
  "overlay": "240ms",
  /** @token rds.motion.duration.reduced @alias ref.motion.duration.80 */
  "reduced": "80ms",
  /** @token rds.motion.duration.presentation @alias ref.motion.duration.480 */
  "presentation": "480ms",
} as const;

export const EASING = {
  /** @token rds.motion.easing.standard @alias ref.motion.easing.curve-01 */
  "standard": "cubic-bezier(0, 0, 0.58, 1)",
  /** @token rds.motion.easing.enter @alias ref.motion.easing.curve-02 */
  "enter": "cubic-bezier(0.2, 0.8, 0.2, 1)",
  /** @token rds.motion.easing.exit @alias ref.motion.easing.curve-03 */
  "exit": "cubic-bezier(0.3, 0, 0.56, 1)",
  /** @token rds.motion.easing.linear @alias ref.motion.easing.linear */
  "linear": "linear",
} as const;

export const TRANSLATION = {
  /** @token rds.motion.translation.popover-subtle @alias ref.motion.distance.2 */
  "popover-subtle": "2px",
  /** @token rds.motion.translation.popover-max @alias ref.motion.distance.4 */
  "popover-max": "4px",
  /** @token rds.motion.translation.dialog-max @alias ref.motion.distance.8 */
  "dialog-max": "8px",
} as const;

export const SCALE = {
  /** @token rds.motion.scale.subtle @alias ref.motion.scale.0-98 */
  "subtle": 0.98,
  /** @token rds.motion.scale.rest @alias ref.motion.scale.1 */
  "rest": 1,
} as const;

export type DurationName = keyof typeof DURATION;
export type EasingName = keyof typeof EASING;
export type TranslationName = keyof typeof TRANSLATION;
export type ScaleName = keyof typeof SCALE;
