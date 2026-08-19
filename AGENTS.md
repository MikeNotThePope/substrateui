<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual regression baselines

Snapshots are stored in Cloudflare R2, not in the git repo. Run `bun run snapshots:download` to fetch baselines before running visual tests. To update baselines, regenerate them in Docker (see `tests/visual/README.md` for the `docker run` command) then run `bun run snapshots:upload`. Do not run `bun run test:visual:update` on macOS — it produces `-darwin.png` files CI won't use.

On a branch, prefer the **Update Visual Baselines** workflow: `gh workflow run "Update Visual Baselines" --ref <branch>`. It regenerates, uploads, and then re-runs the branch's CI itself. Don't sequence that by hand — there is a single baseline archive and CI starts on push, so any `verify` that began before the upload is reading the old baselines and will fail on exactly the snapshots you just replaced.

# Making code changes

`main` is protected — direct pushes are rejected for everyone, including admins. All changes land through a pull request. Never commit to `main` locally or attempt to push to it.

For every code change, follow this flow:

1. Branch off `main`: `git checkout -b <type>/<short-description>` (e.g. `fix/spinner-contrast`).
2. Make the change and commit.
3. Add a changeset: `bunx changeset` (pick patch/minor/major and write a summary). This is required — CI's `check` job blocks any PR without one. The package name in the changeset frontmatter must be the full scoped name, `@mikenotthepope/substrateui` (not `substrateui`, which fails with "not in the workspace"). For changes that should not trigger a release (docs, CI/infra, chores), apply the `skip-changeset` label to the PR instead. Verify locally with `bunx changeset status --since=origin/main`.
4. Run `bun run build` before pushing, on top of `lint`, `tsc --noEmit`, `test` and the audits. It is slower than all of those put together, and it is the only one that prerenders the docs site — which is where the server/client boundary is enforced *in source*. A `"use client"` module marks *every* export as a client reference, not just the component, so a server component calling an exported helper from one (a `cva` recipe, say) fails here and nowhere else. Lint, types, tests and the other audits pass clean on that bug.

   The same boundary in the *published* package is a separate question, and the docs site cannot answer it — it imports from `src/`, not `dist/`. `build:lib` runs `audit:boundary` after every build to answer it: which built file carries `"use client"` is decided from the real chunk graph (`scripts/client-boundary.ts`), and a recipe that never reaches `dist/variants.js` fails the build. A new `cva` recipe therefore needs a `*-variants.ts` module and a line in `src/variants.ts`, or the build says so.

5. Push the branch and open a PR: `git push -u origin <branch>` then `gh pr create`.
6. Wait for the required checks to pass: `verify` (CI: lint, tsc, tests, builds, audits, visual regression) and `check` (changeset present).
7. Merge once green (0 approvals required on this solo repo). Squash-merge is fine.

Do not push commits straight to `main` — branch protection will reject them.

# How releases happen

Releases are driven by Changesets and `.github/workflows/release.yml`, which runs on every push to `main`. The npm publish is automated; there is exactly one manual gate.

1. When PRs with changesets land on `main`, the release workflow opens (or updates) an auto-generated **"Version Packages"** PR. It consumes the pending `.changeset/*.md` files, bumps `package.json` (highest bump among them wins — three patches still make one patch), and writes `CHANGELOG.md`.
2. **Merging the Version Packages PR is the only manual step** — the "yes, cut this release" checkpoint. Review the computed version and changelog before merging.
3. That merge leaves `main` with no pending changesets, so the same workflow takes its other branch and runs `changeset publish` automatically: `npm publish` (via OIDC trusted publishing — no token), git tag, and a GitHub Release.

So: changeset in your PR → merge → Version Packages PR appears → you merge it → npm publish is automatic. Do not bump `package.json` or tag releases by hand; Changesets owns that.
