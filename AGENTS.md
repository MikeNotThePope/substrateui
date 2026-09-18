<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual regression baselines

Snapshots are stored in Cloudflare R2, not in the git repo. Run `bun run snapshots:download` to fetch baselines before running visual tests. Do not run `bun run test:visual:update` on macOS — it produces `-darwin.png` files CI won't use.

There is one baseline archive, `main` and every branch read it, and regenerating overwrites it. So a session never dispatches **Update Visual Baselines** itself. When the `visual` job goes red on a branch, the session ends with a comment on its pull request naming the failing snapshots (the `playwright-report` artifact lists them) and asking Mike for his approving review. The workflow refuses to run without that review on the branch's open pull request (`scripts/baselines-gate.ts`), and it is Mike who dispatches it, from the Actions tab or with `gh workflow run "Update Visual Baselines" --ref <branch>`. It regenerates, uploads, and then re-runs the branch's CI itself — a `verify` that began before the upload read the old baselines and would fail on exactly the snapshots just replaced, so nothing is sequenced by hand. For that review to be possible the pull request has to be opened by the App, not by Mike's account: push a `claude/**` branch and `pr-open.yml` opens it (MikeNotThePope/lavahire#797).

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

5. Push the branch and open a PR: `git push -u origin <branch>`, then `gh pr create`. A session pushes a `claude/**` branch instead and never opens the pull request itself: `pr-open.yml` opens it as the App, which is what lets Mike approve it (a session's API calls all arrive as his account, and GitHub does not let an author approve their own pull request). The session then rewrites the title and body.
6. Wait for the required checks to pass: `verify` (CI: lint, tsc, tests, builds, audits, visual regression) and `check` (changeset present).
7. Merge once green (0 approvals required on this solo repo). Squash-merge is fine.

Do not push commits straight to `main` — branch protection will reject them.

# How releases happen

Releases are driven by Changesets and `.github/workflows/release.yml`, which runs on every push to `main`. The npm publish is automated; there is exactly one manual gate.

1. When PRs with changesets land on `main`, the release workflow opens (or updates) an auto-generated **"Version Packages"** PR. It consumes the pending `.changeset/*.md` files, bumps `package.json` (highest bump among them wins — three patches still make one patch), and writes `CHANGELOG.md`.
2. **Merging the Version Packages PR is the only manual step** — the "yes, cut this release" checkpoint. Review the computed version and changelog before merging.

   That PR needs the `RELEASE_PAT` secret to be mergeable without an admin bypass. Without it the release workflow opens the PR as `github-actions[bot]`, which raises no `pull_request` event, so `verify` never runs and branch protection waits on a check that cannot arrive. `docs/deployment.md` says how to mint the token.
3. That merge leaves `main` with no pending changesets, so the same workflow takes its other branch and runs `changeset publish` automatically: `npm publish` (via OIDC trusted publishing — no token), git tag, and a GitHub Release.

So: changeset in your PR → merge → Version Packages PR appears → you merge it → npm publish is automatic. Do not bump `package.json` or tag releases by hand; Changesets owns that.
