# Numbers

<!-- rds:canonical-guide -->
Values in marked tables are generated from the [master collection](master-tokens/Master-Token-List.md). Edit the master and run `node master-tokens/scripts/build.mjs` to update them.

## Display & formatting

- Use **Persian digits** (`۰۱۲۳۴۵۶۷۸۹`) and symbols: thousands `٬`, decimal `٫`, percent `٪`, minus `−`—regardless of currency. Identifiers such as `INV-1042` remain unchanged.
- Isolate the numeric value with `<bdi dir="ltr">`; keep its unit separate. **Right-align financial values** without changing the direction of the whole table.
- Display dates in the **Solar Hijri calendar** when using the Persian date format. Timezone handling must preserve the intended calendar day.

<!-- rds:generated:numberExamples:start -->
| Type | Example |
| --- | --- |
| Negative amount | −۱۲٬۵۰۰ تومان |
| Foreign currency | ۱۲٬۵۰۰ دلار |
| Percentage | ۱۸٪ |
| Date | ۱۴۰۵/۰۷/۱۵ |
<!-- rds:generated:numberExamples:end -->

## Precision & data integrity

- Define decimal precision by profile: `money`, `quantity`, `rate`, `percent`, `metric`, `technical`. **Do not apply two decimal places globally.**
- The `percent` profile must explicitly specify whether its input is a **0–1 ratio** or an **already-scaled percentage**.
- **Qipper defaults to toman; Keeper Ledger defaults to rial.** Changing display units is not currency conversion; FX conversion is outside the formatter.
- Store monetary values precisely. Display rounding must never change the stored value, and ambiguous input must not be guessed.
- Distinguish **zero**, **missing data**, and **privacy-hidden values**. Show full amounts in financial reports (no compact notation).

## Typography

Reuse the existing [Typography](Typography.md) roles; do not create a separate numerical type scale.

<!-- rds:generated:numberType:start -->
| Context | Token |
| --- | --- |
| Table values | `rds.type.ui-sm` |
| Totals | `rds.type.title-sm` |
| Standard KPI | `rds.type.title-md` |
| Compact / narrow KPI | `rds.type.title-sm` |
| Secondary numeric metadata | `rds.type.caption-md` |
<!-- rds:generated:numberType:end -->

IRANYekanX has no Persian tabular figures (`tnum`). Do not assume equal-width digits; test alignment with real values. Do not use `display` for routine dashboard KPIs.
