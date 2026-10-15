---
"@mikenotthepope/substrateui": minor
---

Add the `caldera` theme: magma on a brown-black ground in dark and a warm ash in light, with nothing white. Enable it with `data-theme="caldera"`. Unlike the other themes it also changes geometry and type, by rules scoped to the theme: 1px borders instead of 2px, no hard shadows, a card drawn as a rule above, sentence-case labels, status badges with a dot, and Red Hat Text, Display and Mono (load them under `--font-red-hat-text`, `--font-red-hat-display` and `--font-red-hat-mono`, or by family name). A new `--primary-text` token gives orange text its own darker step, which `text-primary` reads under Caldera. Every other theme is unchanged.
