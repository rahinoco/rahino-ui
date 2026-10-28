/**
 * Rahino Design System — Veil foundations
 * Generated from the canonical master collection. Do not edit values here.
 * Regenerate: node master-tokens/scripts/build.mjs
 * Guide: Veil & Shadow.md.
 */

export type AppearanceName = "light" | "dark";
export interface Pair { light: string; dark: string; }
export interface VeilTreatment { color: Pair; blur: string; }
const pair = (light: string, dark: string): Pair => ({ light, dark });

export const VEIL = {
  "100": {
      /** @token rds.veil.100.color @lightAlias ref.color.white-alpha-4 @darkAlias ref.color.gray.825-alpha-4 */
      "color": pair("rgb(255 255 255 / 0.04)", "rgb(43 43 43 / 0.04)"),
      /** @token rds.veil.100.blur @alias ref.blur.64 */
      "blur": "64px",
    },
  "200": {
      /** @token rds.veil.200.color @lightAlias ref.color.white-alpha-18 @darkAlias ref.color.gray.875-alpha-18 */
      "color": pair("rgb(255 255 255 / 0.18)", "rgb(37 37 37 / 0.18)"),
      /** @token rds.veil.200.blur @alias ref.blur.48 */
      "blur": "48px",
    },
  "300": {
      /** @token rds.veil.300.color @lightAlias ref.color.white-alpha-52 @darkAlias ref.color.gray-warm.900-alpha-56 */
      "color": pair("rgb(255 255 255 / 0.52)", "rgb(26 25 24 / 0.56)"),
      /** @token rds.veil.300.blur @alias ref.blur.36 */
      "blur": "36px",
    },
  "400": {
      /** @token rds.veil.400.color @lightAlias ref.color.white-alpha-72 @darkAlias ref.color.gray.925-alpha-76 */
      "color": pair("rgb(255 255 255 / 0.72)", "rgb(26 25 27 / 0.76)"),
      /** @token rds.veil.400.blur @alias ref.blur.24 */
      "blur": "24px",
    },
  "500": {
      /** @token rds.veil.500.color @lightAlias ref.color.white-alpha-92 @darkAlias ref.color.gray.925-alpha-92 */
      "color": pair("rgb(255 255 255 / 0.92)", "rgb(26 25 27 / 0.92)"),
      /** @token rds.veil.500.blur @alias ref.blur.16 */
      "blur": "16px",
    },
  "scrim": {
      /** @token rds.veil.scrim.color @lightAlias ref.color.gray-warm.950-alpha-52 @darkAlias ref.color.gray-warm.850-alpha-52 */
      "color": pair("rgb(20 12 17 / 0.52)", "rgb(43 37 41 / 0.52)"),
      /** @token rds.veil.scrim.blur @alias ref.blur.24 */
      "blur": "24px",
    },
} as const;
