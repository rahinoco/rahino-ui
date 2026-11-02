# Rahino shadow migration

## Current subtle-shadow and usage update — 2026-11-02

Light `sm` is now `0 3px 6px 0 rgba(0, 0, 0, 0.04)`. Dark `sm` stays `0 2px 6px 0 rgba(0, 0, 0, 0.14)`. The preceding light `md`/`lg` update remains in effect.

In both themes, `lg` is exclusively for modal surfaces, including modal confirmations. Never use `lg` for cards, card hover, buttons or non-modal floating surfaces. Non-modal legacy `raise` aliases now resolve to `md`; modal aliases continue to resolve to `lg`. Card hover uses `sm` when needed, and contextual floating surfaces use `md`. The decision is recorded as `light-sm-and-modal-only-lg-2026-11-02`; earlier historical usage descriptions below are superseded by this rule.

## Earlier md/lg value update — 2026-11-02

The owner requested this change only in light appearance. `md` is now `0 6px 10px 0 rgba(0, 0, 0, 0.06)`. `lg` takes the previous light `md`: `0 8px 20px 0 rgba(0, 0, 0, 0.10)`. Light `sm` is unchanged. Dark shadows remain exactly as before: `sm` is 0/2/6/0 at 14%, `md` is 0/8/20/0 at 20%, and `lg` is 0/16/36/0 at 26% black opacity. Active tables show light and dark geometry separately.

This changes the shadow values, not their usage roles: contextual floating surfaces still use `md`, and modal/confirmation surfaces still use `lg`. The owner decision is recorded as `light-shadow-update-2026-11-02`. Historical baseline and archived review records retain their original values for traceability.

## Earlier scale migration — 2026-10-24

Approved on 2026-10-24: remove the fourth shadow level and use the existing large shadow for modals.

| Removed reference | Replacement |
| --- | --- |
| `rds.shadow.xlg` | `rds.shadow.lg` |
| `--rds-shadow-xlg` | `--rds-shadow-lg` |
| `SHADOW.xlg` | `SHADOW.lg` |

The active scale contains only `sm`, `md` and `lg`. No compatibility alias retains the removed name.

At the time of this earlier migration, the remaining shadow values were unchanged. Modals used the then-current `lg` geometry: Y 16px, blur 36px, X/spread 0, black at 14% in light appearance and 26% in dark appearance. The removed value used Y 24px, blur 56px and 18%/34% opacity. The light values were subsequently replaced by the 2026-11-02 update above.

The owner confirmed that the approved foundation sources are in the current folder. All local references were checked and active definitions synchronized. Historical entries in the amendment/decision records preserve the removed definition for traceability; they are not active tokens.
