---
"@mikenotthepope/substrateui": minor
---

Add a `Countdown` component and `useCountdown` hook, stealing the live half of Ant Design's `Statistic`.

`StatCard` already covered the static metric — a title, a value, a change indicator. What it could not do was count down, so anything time-bound (a sale ending, a token expiring, doors opening) needed a hand-rolled timer. Ant Design's `Statistic.Countdown` is the missing piece; its static `Statistic` sibling is not, and was deliberately skipped rather than duplicated.

- **`<Countdown deadline={...} />`** ticks once a second and stops at zero. `onFinish` fires exactly once per deadline, not on every subsequent render.
- **No format-string DSL.** The default output comes from `Intl.DurationFormat`, so it follows the locale and drops units that are still zero — `04:05`, then `3:04:05`, then `2 days, 3:04:05`. Where Ant takes `format="HH:mm:ss"`, this takes a render prop: `children` receives `{ total, days, hours, minutes, seconds, formatted, finished, ready }` and you lay it out yourself.
- **`useCountdown(deadline, options?)`** is the same logic without the markup, exported from `@mikenotthepope/substrateui/hooks`.
- **Accessibility**: renders as `role="timer"`, whose implicit `aria-live` is off — a polite live region would read the clock aloud once a second. The timer carries an accessible name instead (`"Time remaining"`, overridable via `labels.remaining`).
- **SSR**: reports `ready: false` and an empty string until measured in the browser, so hydration cannot mismatch on a value that is different by the time it reaches the client.

`StatCard`'s `value` prop widens from `string` to `React.ReactNode`, so a countdown drops straight into a metric card without a third component in between. Existing string values are unaffected.
