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

## RTL and logical properties

This library supports right-to-left rendering via `DirectionProvider`. All components must use Tailwind&apos;s **logical direction** utilities instead of physical ones:

| Don&apos;t use | Use instead |
|---|---|
| pl-*, pr-* | ps-*, pe-* |
| ml-*, mr-* | ms-*, me-* |
| left-*, right-* | start-*, end-* |
| border-l, border-r | border-s, border-e |
| rounded-l-*, rounded-r-* | rounded-s-*, rounded-e-* |
| text-left, text-right | text-start, text-end |

The CI pipeline runs `bun run audit:direction` on every PR and fails if physical utilities appear in component files. Run it locally before committing.

If a physical property is genuinely required (e.g., an icon whose visual position should NOT flip in RTL, or physical centering like `left-1/2 -translate-x-1/2`), add an inline comment explaining why — and consider if an ESLint-disable comment is appropriate.

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
- [ ] If the component&apos;s appearance changes, update visual
  snapshots (`bun run test:visual:update`) and commit the new baselines

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

## Writing component tests

Every component with documented behavior should have a test file at
`tests/unit/components/ui/<name>.test.tsx` (or wherever the component
lives).

**The rule:** every behavior in the component&apos;s docs page is a test.

Write tests from the user&apos;s perspective:

- What do they see? (`screen.getByRole`, `screen.getByLabelText`)
- What can they do? (`userEvent.click`, `userEvent.type`, `userEvent.tab`)
- What do they get back? (visible changes, fired handlers, updated
  ARIA state)

**Avoid:**

- Testing implementation details (internal state, private methods,
  exact class-name lists beyond a characteristic marker).
- Testing behaviors that Radix already tests (focus trap, portal
  rendering, etc.) — only test the behavior **you** add on top of Radix.
- Snapshot tests for markup — visual regression in
  `tests/visual/` handles that.

Run `bun run test:watch` during development. Run `bun run test` to match
CI.

## Versioning

SubstrateUI follows semantic versioning.

- **Major** — renamed or removed exports, removed props, changed prop
  types, changed visual defaults in a way that consumers would see.
- **Minor** — new components, new variants, new props with safe
  defaults.
- **Patch** — bug fixes, performance improvements, documentation fixes.

## Creating a changeset

Every PR that ships a user-facing change must include a changeset. This
is how we track what's in each release.

After making your changes, run:

```
bunx changeset
```

You'll be prompted to:

1. Select which packages changed (just `substrateui` for now)
2. Select the bump type — patch (bug fix), minor (new feature), major
   (breaking change)
3. Write a short summary of the change

This creates a markdown file in `.changeset/`. Commit it with your PR.

**When to skip a changeset:** docs-only changes, internal refactors,
test updates, CI changes. Anything that doesn't affect what ships to
consumers.

A bot will comment on your PR confirming the changeset is present. If
it's not, add one before merging.

## Releasing

Releases are automated via changesets and GitHub Actions. The flow is:

1. You merge a PR to `main` that contains one or more `.changeset/*.md`
   files.
2. The `release` workflow opens (or updates) a **Version Packages** PR
   that consumes the changesets, bumps `package.json`, and updates
   `CHANGELOG.md`.
3. Review the Version Packages PR. Merge it when the version bump and
   changelog read correctly.
4. The `release` workflow runs again on that merge, detects the version
   is already bumped, and publishes to npm via OIDC trusted publishing
   (no stored tokens).

See `docs/deployment.md` for the one-time npm OIDC setup.

Always use `bun` for installs and scripts in this repository — never
`npm` or `npx`, even when upstream docs suggest otherwise.

## Branch protection (repo owner setup)

The `main` branch should require the CI check to pass before merge.
One-time setup:

1. Go to repo Settings → Branches → Add branch protection rule
2. Branch name pattern: `main`
3. Enable: **Require a pull request before merging**
4. Enable: **Require status checks to pass before merging**
5. Search for and select the `verify` check (it will appear after the
   first CI run)
6. Enable: **Require branches to be up to date before merging**
7. Save

This enforces that no PR can merge to main if the contrast audit, lint,
typecheck, or builds fail.

## Adding a new theme

SubstrateUI's token architecture supports multiple brand themes that
layer orthogonally on top of light/dark mode. The default theme lives
in `:root` / `.dark`; alternative themes attach via
`[data-theme="..."]` on `<html>`. See
[/docs/foundations/themes](./src/app/docs/foundations/themes/page.tsx)
for the end-user-facing explanation.

To add a theme:

1. **Add your raw palette** to `src/styles/tokens.css` in the palette
   section. Use OKLCH, with a 50–950 lightness ramp. Keep chroma
   consistent across stops so the palette reads as one family.
2. **Add `[data-theme="your-name"]` and `[data-theme="your-name"].dark`
   selectors** below the existing `:root` and `.dark` declarations.
3. **Mirror every semantic token.** Every custom property declared in
   `:root` must be declared in `[data-theme="your-name"]`, and every
   one in `.dark` must be declared in `[data-theme="your-name"].dark`.
   Missing mappings fall through to the default theme, creating
   subtle cross-theme bugs.
4. **Add your theme to the contrast audit rotation** in
   `scripts/audit-contrast.ts` (the `THEMES` array).
5. **Run `bun run audit:contrast`.** If any pairing fails, adjust
   OKLCH lightness values in 0.05 increments until all pass. Every
   theme must independently pass WCAG AA in both modes.
6. **Add the theme to the docs `ThemePicker`** component for in-docs
   testing.
7. **If this is a public theme, add scoped visual regression coverage**
   for it — landing page, contrast matrix, and two representative
   component pages. Don't snapshot every component in every theme.

A theme should ONLY vary color tokens. Spacing, typography, radii, and
shadows stay constant across themes — they're structural, not brand.
If you find yourself needing per-theme spacing or typography, rethink
the abstraction before forking it.
