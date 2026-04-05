# Contributing to SubstrateUI

This document describes how to propose, build, and ship changes to
SubstrateUI. It exists so that the system stays coherent as it grows —
coherent in its API surface, its visual language, and its accessibility
posture — without the maintainers having to rediscover the rules every
time something new lands.

It is written for future contributors, including future you.

## Proposing a New Component

Open an issue with the proposal before writing code. A proposal should
answer three questions:

1. **Does it solve a problem not already solved?** If an existing
   component can be composed to meet the need, compose it. The system
   gets worse when it grows wider without a reason.
2. **Is it generic enough for the system?** A primitive that only fits
   one screen belongs in that application, not in the library.
3. **Has it been needed in multiple places?** New components earn their
   spot by being demanded by the work, not by being speculatively useful.

## Building a Component

- **File location.** Primitives live in `src/components/ui/`. Patterns
  that combine primitives into application-level pieces live in
  `src/components/` (for example, the organisms exported from
  `substrateui/organisms`).
- **Naming.** Components use `PascalCase`. Files use `kebab-case`. The
  export name and file name should obviously relate.
- **Use Radix primitives where applicable.** They give you focus
  management, ARIA, and keyboard navigation for free. Don&apos;t
  reimplement overlays, menus, or tabs from scratch.
- **Use existing tokens, not raw palette values.** Reach for
  `bg-primary`, `text-muted-foreground`, `border-border` — not
  `--raw-plum-600`. The one documented exception is the amber button
  pattern, which maps to specific raw tokens for CVD-safe pairing.
- **Prefer logical CSS properties where practical.** `ps-4` / `pe-4`
  over `pl-4` / `pr-4` where it doesn&apos;t fight Tailwind. This keeps
  the door open for RTL support later.

## Accessibility Checklist

Every new component MUST pass this checklist before merging:

- [ ] Keyboard operable — all interactive states reachable via keyboard
- [ ] Visible focus indicator (`focus-visible:ring-2`)
- [ ] Semantic HTML — use `<button>`, `<nav>`, `<fieldset>`, etc. where
  appropriate, not `<div>` with handlers
- [ ] ARIA attributes present where needed (`aria-label`, `role`,
  `aria-describedby`)
- [ ] Icon-only interactive elements have accessible names
- [ ] Status / state not communicated by color alone
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Component passes contrast audit (`bun run audit:contrast`)
- [ ] Component has JSDoc documentation on its public API
- [ ] Component has a documentation page with live examples and a
  props table
- [ ] Component is added to the barrel export

## Making Changes to Existing Components

- **Breaking changes** require a major version bump and a deprecation
  path. Do not silently change the shape of public props.
- **Visual changes** require review against the system&apos;s
  personality — chunky borders, press-down feedback, OKLCH color
  relationships. A component that feels foreign to the rest of the
  library is a problem even if it is individually fine.
- **API changes** should prefer composition over adding new props. If
  you find yourself adding a fifth boolean flag to a component,
  reconsider the shape of the API.

## Versioning

SubstrateUI follows semantic versioning.

- **Major** — renamed or removed exports, removed props, changed prop
  types, changed visual defaults in a way that consumers would see.
- **Minor** — new components, new variants, new props with safe
  defaults.
- **Patch** — bug fixes, performance improvements, documentation fixes.

## Releasing

1. Update `CHANGELOG.md` with the changes in this release.
2. Run `bun run audit:contrast` and ensure it passes. (The build runs
   this as a prebuild step, but running it up front keeps the feedback
   loop tight.)
3. Run `bun run build:lib` and verify the `dist/` output looks right.
4. Tag the release and publish.

Always use `bun` for installs and scripts in this repository — never
`npm` or `npx`, even when upstream docs suggest otherwise.
