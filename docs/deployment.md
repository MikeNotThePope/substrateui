# Deployment

## Deploying the docs site to Vercel

This project uses `bun` as its package manager. Vercel supports bun natively.

### One-time setup (repo owner)

1. Go to https://vercel.com/new
2. Click **Import Git Repository** and authorize Vercel for the GitHub org/account if not already done.
3. Select the `substrateui` repo.
4. Framework preset: **Next.js** (Vercel auto-detects).
5. Root directory: leave as `./`.
6. Build command: `bun run build` (override the default).
7. Output directory: `.next` (default).
8. Install command: `bun install --frozen-lockfile` (override the default `npm install` to use bun with the committed `bun.lock`).
9. Node version: 22.x (set in Project Settings → General → Node.js Version —
   a dashboard setting, not something this repo pins). Next's own floor is
   `>=20.9.0`; 22 is what all four `ci.yml` jobs prove the build against.
10. Click **Deploy**.

### After the first deploy

- Production branch: `main` (Settings → Git → Production Branch).
- Preview deployments: enabled by default for all non-main branches and all PRs.
- The production URL goes in `README.md` under the Status block. It is
  <https://www.substrateui.dev/>.

### Environment variables

None required for the docs site. Add future env vars in Project Settings → Environment Variables, scoped to Production/Preview/Development as appropriate.

### Ignoring unnecessary builds (optional)

Default behavior — deploy on every commit — is fine for a small project. Only add a `vercel.json` `ignoreCommand` if build minutes become a problem. Example:

```json
{
  "ignoreCommand": "git diff --quiet HEAD^ HEAD -- ':!scripts' ':!src/lib' ':!README.md' ':!CHANGELOG.md' || exit 1"
}
```

Adjust the ignore paths based on what actually affects the docs site.

### Custom domain (optional)

If a custom domain is desired, add it under Settings → Domains and follow the DNS instructions.

## Publishing to npm

Releases are automated via [changesets](https://github.com/changesets/changesets) and the `release.yml` GitHub Actions workflow. Authentication uses **OIDC trusted publishing** — there is no long-lived `NPM_TOKEN` in repo secrets.

### One-time bootstrap: publish v0.1.0 manually — **done**

Kept because it is why the OIDC setup below was possible at all, not as a step
to take. OIDC cannot be configured until the package name exists on npm, and
nothing can publish it the first time but a human. That single publish was done
by hand from a maintainer's laptop:

```bash
bun run audit:contrast
bun run lint
bunx tsc --noEmit
bun run build:lib
npm login                  # passkey challenge
npm publish --access public
```

Verified at the time by:

1. Package appears at https://www.npmjs.com/package/@mikenotthepope/substrateui
2. `bun add @mikenotthepope/substrateui` in a throwaway project works
3. You can import and use a component

### One-time OIDC trusted publisher setup — **done**

Once the manual v0.1.0 was live:

1. Go to https://www.npmjs.com/package/@mikenotthepope/substrateui/access
2. Scroll to **Trusted Publishers**
3. Click **Add trusted publisher**
4. Select **GitHub Actions**
5. Fill in:
   - Organization or user: `MikeNotThePope`
   - Repository: `substrateui`
   - Workflow filename: `release.yml`
   - Environment: *(leave blank)*
6. Save

All future releases publish automatically from `.github/workflows/release.yml` with no stored credentials and with npm provenance attestation enabled.

### One-time `RELEASE_PAT` setup — **done**

Without this, every **Version Packages** PR needs an admin bypass to merge. The
steps are kept for the day the token expires and has to be re-minted.

GitHub will not let a workflow trigger a workflow: a PR opened with the
built-in `GITHUB_TOKEN` raises no `pull_request` event, so `verify` never runs
on it and branch protection blocks the merge on a check that can never arrive.
Giving `changesets/action` a real token makes that PR an ordinary one.

1. Go to https://github.com/settings/personal-access-tokens/new
2. Fine-grained token, **Resource owner** `MikeNotThePope`, **Repository access**
   → only `substrateui`
3. Repository permissions: **Contents** read/write, **Pull requests** read/write.
   Nothing else.
4. Expiry: whatever you will actually rotate. The release still works when it
   lapses — the workflow falls back to `GITHUB_TOKEN` — you just get the admin
   bypass back until you renew it.
5. Save the value as repo secret `RELEASE_PAT`
   (Settings → Secrets and variables → Actions).

This is only about who opens the release PR. Publishing stays on OIDC, with no
npm credential anywhere.

### Automated release flow

1. Merge feature PRs that include `.changeset/*.md` files to `main`.
2. `release.yml` opens a **Version Packages** PR that bumps the version and updates `CHANGELOG.md`.
3. Review and merge the Version Packages PR. `verify` and `check` run on it like
   any other, because `RELEASE_PAT` opens it (see above).
4. `release.yml` runs again and publishes to npm.

Multiple changesets can be stacked before merging the Version PR — they're consumed together into one release.

### changeset-bot (optional)

Install the [changeset-bot GitHub App](https://github.com/apps/changeset-bot) on the repo so every PR gets a comment confirming whether a changeset was included.
