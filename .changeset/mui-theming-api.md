---
"@mikenotthepope/substrateui": minor
---

Add a first-class theming API — `createTheme`, `ThemeRegistry`, `useTheme`, `ThemeSelect` (steal from MUI).

The suite already had a token system and two hand-written palettes in the stylesheet, but no way for a consumer to *define* a named theme, register it, and swap to it. This ports MUI's `createTheme` / `ThemeProvider` / `useTheme` ergonomics onto the OKLCH token layer.

- `createTheme({ name, tokens, light, dark, extends })` builds a token map. `ThemeTokens` autocompletes every semantic token name but accepts any custom property, so raw palette steps work too. Theme names are validated so they can't break out of a CSS selector.
- `ThemeRegistry` owns the active theme: sets `data-theme`, persists to localStorage, and injects the themes' CSS so a new theme needs no stylesheet changes. `injectCss={false}` opts out when you ship it statically.
- `themeToCss(themes)` renders themes to CSS for build-time use; the dark block targets both a document-level and a scoped placement.
- `scoped` themes a subtree instead of the document — for preview panes and embedded widgets — and `themeInitScript()` returns an inline-script source that applies the stored theme before first paint.
- `useTheme()` returns `{ theme, setTheme, themes, resolvedTheme }`; `ThemeSelect` is a ready-made picker over the registered set. Unit-tested, with stories and docs.
