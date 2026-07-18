---
"@mikenotthepope/substrateui": patch
---

Darken status border colors to meet WCAG 3:1 non-text contrast in light mode: success and warning in the default theme (amber-500 → amber-600), and success, warning (sulfur-500 → sulfur-700), and info in the Lava theme. The contrast audit now checks every status border against its surface and the page background, so regressions fail the build.
