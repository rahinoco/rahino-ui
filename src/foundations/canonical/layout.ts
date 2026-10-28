/**
 * Rahino Design System — Layout foundations
 * Generated from master-tokens/shared.tokens.json. Do not edit values here.
 * Regenerate: node master-tokens/scripts/build.mjs
 * Guide: Layout.md.
 */
import { SPACING } from "./Spacing.ts";

export const BREAKPOINTS = {
  /** @token rds.layout.breakpoint.medium */
  medium: "48rem",
  /** @token rds.layout.breakpoint.wide */
  wide: "64rem",
} as const;

export const PAGE_GRID = {
  narrow: {
    /** @token rds.layout.grid.narrow.columns */
    columns: 4,
    /** @token rds.layout.grid.narrow.gutter @alias rds.space.300 */
    gutter: SPACING[300],
    /** @token rds.layout.grid.narrow.margin @alias rds.space.300 */
    margin: SPACING[300],
  },
  medium: {
    /** @token rds.layout.grid.medium.columns */
    columns: 8,
    /** @token rds.layout.grid.medium.gutter @alias rds.space.400 */
    gutter: SPACING[400],
    /** @token rds.layout.grid.medium.margin @alias rds.space.400 */
    margin: SPACING[400],
  },
  wide: {
    /** @token rds.layout.grid.wide.columns */
    columns: 12,
    /** @token rds.layout.grid.wide.gutter @alias rds.space.400 */
    gutter: SPACING[400],
    /** @token rds.layout.grid.wide.margin @alias rds.space.500 */
    margin: SPACING[500],
  },
} as const;

/** @token rds.layout.content.max */
export const PAGE_MAX_WIDTH = "1600px";
