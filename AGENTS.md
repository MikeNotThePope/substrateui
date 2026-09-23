<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual checks read the page, not a picture

There are no screenshots and no baselines. `tests/visual/visible.behavior.spec.ts` opens every component and layout docs page in light, dark, ltr and rtl, wears each named palette, and fails any part a person could not see: a graphic, a control's edge, a thumb on its track, or a spinner arc against its ring, under 3:1 (WCAG 2.2, 1.4.11). It also fails a page that throws while rendering, and a spinner that is not animating. Its header says what each rule reads and what it leaves out on purpose.

A red run names the part, the palette and the two colours. Fix the component or its tokens. `EXEMPT` is for what WCAG itself exempts, with the reason. `KNOWN` holds what the checks found on their first run, only shrinks, and fails once an entry is fixed.

The pixel suite this replaced blessed whatever it was first shown, and every change it flagged was approved without a look. A component whose size or spacing moved passes here. If that bites, add a check for that property.

# The home page's numbers are inventory

`src/app/page.tsx` states counts as fact — the docket table and the lead
paragraph both do — and nothing checks them. The component count read 75 for
long enough that nobody could say what it had ever counted.

Touching that page means re-deriving them first. Each is one command:

- **Components** — `ls -d src/app/docs/components/*/ src/app/docs/layouts/*/ | wc -l`.
  The caption says "atomic Button through organism App Shell", so the layouts
  count: App Shell is one of them. `bun run audit:docs` prints the first half too.
- **Themes** — `THEMES` in `scripts/audit-contrast.ts`, minus one. The docket
  counts *named* themes, and `default` is the absence of a name.
- **Audited pairs** — `pairings` in that same file.

`README.md` repeats the component count, and its **Component Categories** list is that same inventory broken out by the sidebar's own groups. Change one, change all three.

# Making code changes

`main` is protected — direct pushes are rejected for everyone, including admins. All changes land through a pull request. Never commit to `main` locally or attempt to push to it.

For every code change, follow this flow:

1. Branch off `main`: `git checkout -b <type>/<short-description>` (e.g. `fix/spinner-contrast`).
2. Make the change and commit.
3. Add a changeset: `bunx changeset` (pick patch/minor/major and write a summary). This is required — CI's `check` job blocks any PR without one. The package name in the changeset frontmatter must be the full scoped name, `@mikenotthepope/substrateui` (not `substrateui`, which fails with "not in the workspace"). For changes that should not trigger a release (docs, CI/infra, chores), apply the `skip-changeset` label to the PR instead. Verify locally with `bunx changeset status --since=origin/main`.
4. Run `bun run build` before pushing, on top of `lint`, `tsc --noEmit`, `test` and the audits. It is slower than all of those put together, and it is the only one that prerenders the docs site — which is where the server/client boundary is enforced *in source*. A `"use client"` module marks *every* export as a client reference, not just the component, so a server component calling an exported helper from one (a `cva` recipe, say) fails here and nowhere else. Lint, types, tests and the other audits pass clean on that bug.

   The same boundary in the *published* package is a separate question, and the docs site cannot answer it — it imports from `src/`, not `dist/`. `build:lib` runs `audit:boundary` after every build to answer it: which built file carries `"use client"` is decided from the real chunk graph (`scripts/client-boundary.ts`), and a recipe that never reaches `dist/variants.js` fails the build. A new `cva` recipe therefore needs a `*-variants.ts` module and a line in `src/variants.ts`, or the build says so.

5. Push the branch and open a PR: `git push -u origin <branch>`, then `gh pr create`. A session pushes a `claude/**` branch instead and never opens the pull request itself: `pr-open.yml` opens it as a draft, as the App, which is what lets Mike approve it (a session's API calls all arrive as his account, and GitHub does not let an author approve their own pull request). The session then rewrites the title and body.
6. A session marks its draft ready as its last step, once its own checks are green. That arms auto-merge (`self-merge.yml`), so the pull request merges itself when `verify` (CI: lint, tsc, tests, builds, audits, the rendered checks) and `check` (changeset present) are green. The session never merges by hand and never asks. The repository variable `MERGE_PAUSED` set to `1` is the stop; the workflow's header says what it does and does not undo.
7. A person's branch merges once green (0 approvals required). Squash-merge is fine.

lavahire is this package's only consumer, and its sessions are most of what lands here: a lavahire session that needs a component this package lacks builds it here first, then waits for the release to reach lavahire. The chain is lavahire's `docs/features/loops.md`.

Do not push commits straight to `main` — branch protection will reject them.

# How releases happen

Releases are driven by Changesets and `.github/workflows/release.yml`, which runs on every push to `main`. There is no manual gate: a change a session merges reaches npm with no hand of Mike's.

1. When PRs with changesets land on `main`, the release workflow opens (or updates) an auto-generated **"Version Packages"** PR. It consumes the pending `.changeset/*.md` files, bumps `package.json` (highest bump among them wins — three patches still make one patch), and writes `CHANGELOG.md`.
2. **The same run arms auto-merge on that PR, so it merges itself once `verify` and `check` are green.** Those two are still the gate; what went was the click after them, which followed the first merge by minutes every time and read nothing. The computed version and changelog are reviewed after the fact, on the Releases page. The repository variable `RELEASE_PAUSED` set to `1` is the stop: the step arms nothing, its log says so, and the PR waits for a hand, as it used to. Setting it back to `0` arms nothing by itself; the next push to `main`, or a re-run of the last release run, does (MikeNotThePope/lavahire#798).

   That step needs the `RELEASE_PAT` secret. Without it the release workflow opens and updates the PR as `github-actions[bot]`, which raises no `pull_request` event, so `verify` never runs and auto-merge would wait forever; the step fails red instead of arming it. `docs/deployment.md` says how to mint the token.
3. That merge leaves `main` with no pending changesets, so the same workflow takes its other branch and runs `changeset publish` automatically: `npm publish` (via OIDC trusted publishing — no token), git tag, and a GitHub Release.

4. That publish then fires a `repository_dispatch` at lavahire, which opens its own pull request moving its pin to the new version, with CI and a smoke run on it. lavahire pins a caret range, so the version was going to land there anyway, inside whatever unrelated pull request next reinstalled; on its own pull request a break in this package is seen as a red check that names the release. It needs the `LAVAHIRE_DISPATCH_TOKEN` secret, and fails red without it, after a publish that already succeeded. `docs/deployment.md` says how to mint it. MikeNotThePope/lavahire#800.

So: changeset in your PR → merge → Version Packages PR appears and merges itself → npm publish is automatic → lavahire opens its own bump PR, which merges itself when green. Do not bump `package.json` or tag releases by hand; Changesets owns that.

A release that turns lavahire's bump red never merges there, so lavahire's pin never moves and nothing ships. The session that caused it fixes forward: a fix here, a patch release, and a new bump that replaces the red one. When the fix is not obvious in one try, it reverts the change here as a release of its own. `RELEASE_PAUSED=1` here and `MERGE_PAUSED=1` in either repository are the stops.
