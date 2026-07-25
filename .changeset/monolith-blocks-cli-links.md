---
"@mikenotthepope/substrateui": minor
---

Make SubstrateUI a one-stop-shop: blocks, a framework-agnostic Link adapter, an init CLI, and a theme generator.

- Add a **framework-agnostic Link adapter** — `LinkProvider`, `useLinkComponent`, and a `Link` component exported from the main entry. Wrap your app once with your router's link (Next, React Router, Remix, TanStack) and every suite link — including blocks — routes through client-side navigation, falling back to a plain `<a>` with no provider.
- Add a **blocks library** at `@mikenotthepope/substrateui/blocks` — full, paste-in compositions: `SignInBlock`, `SignUpBlock`, `StatsBlock`, `HeroBlock`, and `FeatureGridBlock`, built from existing primitives and routed through `LinkProvider`.
- Add a **zero-dependency `substrateui` CLI** (`npx substrateui init`) that wires the required CSS imports into your global stylesheet in the correct order and prints the font, dark-mode, and router setup. It never copies component source into your repo — upgrades stay a version bump.
- Add a **Theme Generator** docs tool: dial in a primary hue and chroma, watch components recolor live in light and dark, and copy a drop-in OKLCH token override that preserves the audited contrast relationships.
