/**
 * Rahino Design System — Shadow foundations
 * Generated from the canonical master collection. Do not edit values here.
 * Regenerate: node master-tokens/scripts/build.mjs
 * Guide: Veil & Shadow.md.
 */

export type AppearanceName = "light" | "dark";
export interface Pair { light: string; dark: string; }
const pair = (light: string, dark: string): Pair => ({ light, dark });

export const SHADOW = {
  /** @token rds.shadow.sm */
  "sm": pair("0 2px 6px 0 rgba(0, 0, 0, 0.06)", "0 2px 6px 0 rgba(0, 0, 0, 0.14)"),
  /** @token rds.shadow.md */
  "md": pair("0 8px 20px 0 rgba(0, 0, 0, 0.10)", "0 8px 20px 0 rgba(0, 0, 0, 0.20)"),
  /** @token rds.shadow.lg */
  "lg": pair("0 16px 36px 0 rgba(0, 0, 0, 0.14)", "0 16px 36px 0 rgba(0, 0, 0, 0.26)"),
} as const;
