---
"@mikenotthepope/substrateui": patch
---

Finish promoting the lava palette

#91 moved LavaHire's palette overrides upstream and skipped the ones whose delta
looked like rounding noise. That filter was too coarse. Running the app's smoke
suite before and after the migration and diffing all twelve screenshots pixel by
pixel showed several of the skipped values were plainly visible — the primary
button, the active sidebar item and the success badge all shifted.

Five values, all of them the ones a person would notice:

- `--raw-magma-500` 0.68 → 0.70 lightness. It is lava dark's accent fill:
  `--primary`, `--sidebar-primary` and `--accent-fill` all resolve to it, so one
  step brings the whole accent back.
- `--raw-olivine` 0.58 → 0.55. Used once, for `--status-success` in lava light.
  Darker, so the 3:1 its comment pins is cleared with more room, not less.
- `--sidebar-accent` in light is a translucent wash over the sidebar rather than
  an opaque magma-100 fill, which is what the active nav item was drawn with.
- `--sidebar-accent` and `--status-success` in dark, plus the success surface's
  alpha, follow the same brighter accent.

Two deltas are deliberately left alone: `--primary-foreground` (0.16 vs 0.14) and
`--sidebar-accent-foreground` (0.42 vs 0.40) are near-black and near-white text
sitting on saturated fills, where two points of lightness are not visible, and
both are ramp steps rather than one-off literals.

The border correction from #91 stands — `--border` and `--input` stay at
basalt-500 rather than returning to the value that measured 2.08:1 against the
page. That one was the point of the exercise.
