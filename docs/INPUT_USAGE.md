# Text input

Implementation updated on 3 November 2026 from the owner's reviewed preview. Repository adoption does not imply approval of every state for product use.

## Use cases

| Use | Recipe |
| --- | --- |
| Names and short text | Persistent visible label; no placeholder by default. |
| Persian full name | `autoComplete="name"` and `dir="rtl"` keep text entry right-to-left in either page direction. |
| Phone | `type="tel"`, `inputMode="tel"`, `autoComplete="tel-national"`, `dir="ltr"`; keep format instructions in `helperText`. Accept Persian, Arabic Indic and Latin digits in application validation. |
| Email and Latin identifiers | `type="email"` where appropriate, `dir="ltr"`, `textScript="latin"`; retain the Persian label direction. |
| Amount | `inputMode="numeric"`, explicit label with currency; optional persistent unit in `endAdornment`. Format and validate in the application. |
| Username | `autoComplete="username"` gives the input a left-to-right default. |
| Password | Use `type="password"` with `autoComplete="current-password"` for sign-in or `autoComplete="new-password"` for a new password. Keep autocomplete on the input when revealing its value so it stays left-to-right. Use a labeled visibility button. |
| Search | Persistent label; an optional placeholder can clarify the search scope. Decorative `icon` is at the reading start. |
| Decorative icon on either edge | `icon` with `iconPosition="start"` or `"end"`; not focusable or clickable, hidden from assistive technology. |
| Clickable icon that changes | Supply `iconAction` with a descriptive `label` and working `onClick`; update `icon`, action label and field state together, e.g. Eye/EyeOff and password/text for show/hide. |
| Clickable icon that stays the same | Keep `icon` unchanged after activation, e.g. Copy; perform the actual operation and announce success or failure in persistent status text. |
| Read-only reference | `readOnly`, selectable/copyable value and explanation. Do not use disabled for information users need to copy. |
| Pending validation | Native `aria-busy`, persistent status text; the application decides whether editing stays available. |

Use Textarea for multiple lines and Select for choosing options. Avoid placeholders unless they add nonessential information; essential examples and instructions belong outside the field. A placeholder never replaces an accessible name. `dense` visually hides a supplied label while preserving its association; use only when context makes the purpose clear. Without `label`, supply `aria-label` or `aria-labelledby`.

## Foundation recipe

| Part | Foundation |
| --- | --- |
| Normal / filled / focused fill | `rds.color.surface.sunken` |
| Preview parent | `rds.color.surface.canvas` |
| Read-only fill | `rds.color.surface.base` |
| Invalid fill | `rds.color.status.error.bg`; value remains `ink.primary`, message uses `status.error.fg` |
| Disabled fill / value | `surface.subtle` / `ink.disabled` |
| Hover | Editable fields retain `interaction.neutral.hover`; valid enabled read-only fields use the existing `ref.color.white-alpha-10` overlay for a lighter treatment. No new color or alpha value is introduced. |
| Radius | Native `rds.radius.12` in all sizes, themes and states |
| Focus | Independent `focus.ring.width` and `color.focus.ring` inset; no field enlargement |
| Text | `type.input-touch` size/weight/line height; inherited content font, with explicit `textScript` or existing `mono` override |
| Label | `type.label-sm`; `space.100` (8px) above the field; required asterisk separated by `space.50` (2px) |
| Helper / error | `type.caption-sm` (12px, regular, 1.8 line height); one message at a time, `space.75` (4px) after the field; `space.50` (2px) between error icon and message |
| Icons | `icon.size.md` (20px) for field adornments; `icon.size.sm` (16px) for the bare error exclamation; `icon.stroke.width` (2.25) on the 24 × 24 grid, rounded caps/joins and proportional scaling |
| Motion | `motion.duration.feedback` with `motion.easing.standard`; no transition with reduced motion |
| Border / elevation | None in normal, hover, focused or invalid states; forced-colors system inset cue only |

| `controlSize` | Use | Minimum height | Horizontal padding | Vertical padding |
| --- | --- | --- | --- | --- |
| `sm` | Compact filters and forms | 32px (`space.500`) | 12px | 1px |
| `md` (default) | Standard forms | 40px (`space.600`) | 16px | 4px |
| `lg` | Forms with more room | 48px (`space.700`) | 20px | 8px |

All sizes use 16px input text and 12px corners. Fields can grow with user font settings. The native HTML `size` prop retains its original meaning.

## Behavior and accessibility

Field icons are centered within their slots and vertically within the control. The error uses a bare outline exclamation without a surrounding border or container, centered vertically beside the message, including wrapped messages. All icons inherit semantic foreground colors; decorative icons stay hidden from assistive technology. Password visibility actions use the button family's canonical icon recipe.

`label` is associated with the native input. The currently rendered `helperText` or `error` has a stable ID merged with any caller-provided `aria-describedby`. An error sets `aria-invalid`, replaces the helper message and is announced as an alert. Clearing the error restores the helper and its description ID. Error copy must include corrective guidance and any essential formatting instructions it replaces. Native props, handlers, controlled and uncontrolled values, refs, autocomplete, required, disabled and readOnly remain supported.

The shared component does not validate on every keystroke or normalize entered text. The documentation form validates on submission and updates visible errors as users correct them. It accepts all three digit scripts without changing the displayed digits. Native form reset works for uncontrolled inputs; applications reset their controlled values.

`iconPosition` chooses the logical `start` (default) or `end` edge. In RTL these are right and left; in LTR they are left and right. Without `iconAction`, `icon` is decorative and excluded from keyboard navigation. `endAdornment` stays at the reading end. Set `dir` for the data; `dir="auto"` determines the input text independently of surrounding adornment order. Direction does not choose the font.

The input defaults to LTR for `type="password"` and for username and password autocomplete tokens. Labels, supporting text and adornment order follow the surrounding layout. An explicit `dir` takes precedence.

`iconAction={{ label, onClick }}` creates a named native IconButton. Click, Enter and Space activate it; it does not submit a form. The action is disabled when the field or `iconAction.disabled` is disabled. Read-only values remain selectable and their independent icon actions remain available. Each button shows only the supplied icon.

Clickable icons have two behaviors on either edge: **changing artwork**, such as Eye/EyeOff for show/hide, and **unchanged artwork**, such as Copy. The caller controls the current `icon`, action `label` and field state. A visibility action names what the next click will do; it does not use a persistent selected plate or selection checkmark. Copy retains its icon and reports the operation's actual outcome with `role="status"`; announce success only after the clipboard write succeeds and provide a failure message otherwise. These are click actions, not selection controls, so `iconAction` has no `pressed` prop.

Interactive icons on either edge have a minimum width of 44px. On touch devices their target is also at least 44px tall, so `sm` and `md` fields with embedded buttons grow to fit. Their fill is inset by `space.75` (4px) so hover and press paint stay clear of the field corners and focus ring. Colors and native rounding come from the button recipe. Focus anywhere inside the field shows the same inset indicator. Forced-colors mode keeps the button's system boundary instead of the inset fill.

```tsx
<Input label="Search" icon={<Search />} iconPosition="end" />
<Input label="Username" autoComplete="username" />
<Input label="Password" type={visible ? 'text' : 'password'} autoComplete="current-password"
  icon={visible ? <EyeOff /> : <Eye />} iconPosition="end"
  iconAction={{ label: visible ? 'Hide password' : 'Show password', onClick: () => setVisible(!visible) }} />
<Input label="Reference" value={reference} readOnly icon={<Copy />} iconPosition="start"
  iconAction={{ label: 'Copy reference', onClick: copyReference }}
  helperText={<span role="status">{copyStatus}</span>} />
```

`copyReference` must write the current value with `navigator.clipboard.writeText(reference)` and update `copyStatus` only after success or failure. The frontend's live examples and Storybook share the working implementation of both behaviors, on both edges.

The shared Input has its own recipe. Legacy Select, DatePicker, TimePicker, Textarea, Qippo reference and Rahino floating-label comparison components retain their separate recipes; this change does not approve or redesign them.

## Review status

Check empty, filled, hovered, focused, invalid, invalid+focused, disabled, read-only, pending and adornment interactions in all three sizes, both directions, themes and contrast modes. Check keyboard, forced colors, reduced motion, long text and mobile layout. Automated checks establish behavior, not human approval.

The requested sunken fill has less than 3:1 contrast with the canvas parent when treated as the sole identifying control cue. Record and review that foundation/discoverability limitation before product approval. Do not add a local border or manufacture a darker color to hide it.

## Research behind the content policy

Persistent labels and optional-only placeholders follow [GOV.UK](https://design-system.service.gov.uk/components/text-input/), [Carbon](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines), [Fluent](https://fluent2.microsoft.design/components/web/react/core/field/usage/) and the Iranian [Sonnat text field](https://www.sonnat.design/components/textfield). A limited interface audit of Snapp, Digikala and Divar found mixed placeholder patterns. It does not establish a representative preference among Iranian users. Accessible naming and forgiving validation also follow the [WAI labels](https://www.w3.org/WAI/tutorials/forms/labels/) and [validation](https://www.w3.org/WAI/tutorials/forms/validation/) guidance.
