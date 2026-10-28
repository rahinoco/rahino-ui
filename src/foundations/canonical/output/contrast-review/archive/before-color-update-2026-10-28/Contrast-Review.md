# Borderless color contrast review

**Historical snapshot before the 2026-10-28 color update.** Values, ratios, proposal status and browser observations below describe that earlier palette. See the [current review](../../Contrast-Review.md) for the active master calculations.

**Proposal only — canonical tokens, generated runtime files and consuming repositories have not been changed.**

**Superseded proposals:** the inverted field pair below was rejected as a default treatment. The dark-button proposal with black labels is also not approved: primary fills must use `rds.color.ink.on-brand`. These calculations remain historical alternatives, not implementation instructions.

The review checks four branded contexts: light/dark × standard/enhanced contrast. It covers the five structural neutral surfaces and, for fields and focus, the two soft brand backgrounds plus four status backgrounds. Ratios are checked before rounding. Decorative surface differences are not treated as mandatory control boundaries.

## Recommendation

Reuse existing raw colors. Add one shared field background/foreground pair for inputs, selects and textareas; preserve general page surfaces. Use a lighter primary-action pair in dark mode if its fill is required to identify the button. Lighten the dark focus color to cover focus rings on tinted status containers too. No static edges are needed.

| Role | Light | Dark | Existing references |
| --- | --- | --- | --- |
| Field background | #6D656B | #7A8493 | ref.color.gray-warm.575 / ref.color.gray-cool.450 |
| Field foreground, including placeholders/icons | #FFFFFF | #000000 | ref.color.white / ref.color.black |
| Focus ring | Keep #99507A | #A47891 (from #A9638B) | ref.color.plum.450 for dark |
| Primary action default | Keep #631244 | #A7839B | ref.color.plum.425 for dark |
| Primary action hover | Keep #400C2C | #B48BA6 | ref.color.plum.400 for dark |
| Primary action pressed | Keep #1E0515 | #A47891 | ref.color.plum.450 for dark |
| Primary action foreground | Keep #FFFFFF | #000000 | ref.color.black for dark |

All candidate hex values already exist in the reference palette. This changes semantic assignments and component bindings, not the raw palette. The brand identity seed remains #631244. The proposed dark button treatment would replace the earlier decision to use the same primary fill in both appearances; it needs design approval.

The proposed field pair is deliberately much stronger than surface.sunken. In light mode, borderless fields would be medium-dark gray with white text; in dark mode, medium-light gray with black text. Keep their text, placeholders and icons at full opacity. Neutral hover/pressed overlays remain behind the field content.

## Calculated proposed field contrast

| Context | Minimum text | Minimum fill vs parent | Cases |
| --- | --- | --- | --- |
| light / standard | 5.64:1 | 4.26:1 | 33 |
| light / more | 5.64:1 | 4.26:1 | 33 |
| dark / standard | 5.55:1 | 3.21:1 | 33 |
| dark / more | 5.55:1 | 3.21:1 | 33 |

These 132 cases cover default, hover and pressed states on all 11 parent backgrounds in all four contexts. Text is at least 4.5:1 and the field fill is at least 3:1. A correctly assigned field foreground is essential; the ordinary page ink colors cannot be assumed to work inside these fills.

## Existing text pairs to preserve

| Pair family | Current minimum | Disposition |
| --- | --- | --- |
| Ordinary ink on neutral resting surfaces | 4.64:1 | Preserve. |
| Primary button labels across enabled states | 10.44:1 | Preserve in light; dark optional fill change includes a matching label change. |
| Status text on matching soft backgrounds | 5.32:1 | Preserve. |
| Status text on matching solid fills | 4.52:1 | Preserve text pairs; visibility of a fill used as a state cue is a separate check. |
| Brand text on matching soft brand backgrounds | 7.16:1 | Preserve. |

Tertiary ink has six failing normal-contrast hover/pressed combinations, plus one in light enhanced contrast. The existing guidance already avoids these pairs: use secondary/primary ink in neutral interactive content. Changing tertiary globally is unnecessary.

## Focus

Current focus colors pass on all five neutral structural surfaces. The current dark focus color falls below 3:1 on dark success/warning/info container backgrounds (minimum 2.81:1). Reusing #A47891 raises the minimum on all 11 dark parents to 3.29:1. The unchanged light focus color stays above 4.19:1 on all 11 light parents.

Keep focus indicators separated from filled controls so their relevant adjacent background is the parent. A focus color is not guaranteed to contrast with every control fill when drawn directly against it. Keyboard focus remains necessary; the no-edges design refers to resting component borders.

## Optional stronger dark primary actions

| State | Proposed fill | Black label contrast | Fill contrast vs worst neutral parent |
| --- | --- | --- | --- |
| default | #A7839B | 6.36:1 | 4.36:1 |
| hover | #B48BA6 | 7.18:1 | 4.93:1 |
| pressed | #A47891 | 5.67:1 | 3.89:1 |

Current dark primary fills are as low as 1.04:1 against some dark structural surfaces. Their white labels already pass, so this is not automatically a WCAG failure. If the design target requires the filled button itself to stand out at 3:1 without edges, the lighter fills above pass and retain distinct default/hover/pressed tones. Their perceptual state distinction still needs a visual component review.

## Browser verification of the candidates

Installed Chrome composited the existing generated CSS overlays over the candidate fills. For each context, 33 field cases and 33 button cases cover all 11 parents and three states. Focus was tested against each parent, with the separated-ring adjacency described above.

| Context | Field text minimum | Field fill minimum | Button text minimum | Button fill minimum | Focus vs parent minimum |
| --- | --- | --- | --- | --- | --- |
| Light / standard | 5.64:1 | 4.26:1 | 12.35:1 | 9.32:1 | 4.19:1 |
| Light / enhanced | 5.64:1 | 4.26:1 | 12.35:1 | 9.32:1 | 4.19:1 |
| Dark / standard | 5.55:1 | 3.21:1 | 5.67:1 | 3.29:1 | 3.29:1 |
| Dark / enhanced | 5.55:1 | 3.21:1 | 5.67:1 | 3.29:1 | 3.29:1 |

These are candidate-color checks, not a certification of consuming applications. No application code was changed.

## Selected states and feedback

Soft selection/background tints are not reliable standalone state cues. Use a visible check/icon/marker in the existing brand foreground, plus programmatic selected/checked state. Brand foreground is at least 6.46:1 against dark neutral surfaces and 10.17:1 against light neutral surfaces; no edge or new palette value is required.

Soft status-panel backgrounds can remain subtle when readable text conveys the message. Their text pairs already pass. Do not turn all status backgrounds into 3:1 fills merely to make decorative containers stronger. If a solid dark error fill alone carries an essential state cue on surface.raised, its current 2.90:1 separation needs a separately validated treatment; its readable label does not fail.

## Limits and independent contexts

- Charts remain deferred as requested. This is not a chart palette certification.
- Glass still requires testing against the actual allowed backdrop; no fixed palette guarantees every translucent composite.
- Native forced colors use OS colors, not these hex values. A borderless field implementation must choose a system-color foreground/background treatment that remains identifiable; the current generic background-to-Canvas mapping would need a dedicated field mapping for the new roles.
- Do not change surface.sunken globally into the stronger field fill: it is also used as a structural surface, where existing supporting text would lose contrast.
- A numeric pass does not establish discoverability, state differentiation or legibility at every font size; review the rendered form after applying the chosen proposal.

## Sources

- [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): ordinary text target 4.5:1.
- [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): required identifying visual cues target 3:1; labeled controls do not automatically require a contrasting fill boundary.
- Source values: current canonical shared/light/dark token JSON and context-policy.json.
- Complete calculated values and pair inventory: [results.json](results.json).
