# Rahino shadow migration

Approved on 2026-10-24: remove the fourth shadow level and use the existing large shadow for modals.

| Removed reference | Replacement |
| --- | --- |
| `rds.shadow.xlg` | `rds.shadow.lg` |
| `--rds-shadow-xlg` | `--rds-shadow-lg` |
| `SHADOW.xlg` | `SHADOW.lg` |

The active scale contains only `sm`, `md` and `lg`. No compatibility alias retains the removed name.

The remaining shadow values are unchanged. Modals now use the existing `lg` geometry: Y 16px, blur 36px, X/spread 0, black at 14% in light appearance and 26% in dark appearance. The removed value used Y 24px, blur 56px and 18%/34% opacity. This migration intentionally changes the appearance of any former fourth-level consumer.

The owner confirmed that the approved foundation sources are in the current folder. All local references were checked and active definitions synchronized. Historical entries in the amendment/decision records preserve the removed definition for traceability; they are not active tokens.
