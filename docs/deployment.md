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
9. Node version: 20.x (set in Project Settings → General → Node.js Version).
10. Click **Deploy**.

### After the first deploy

- Production branch: `main` (Settings → Git → Production Branch).
- Preview deployments: enabled by default for all non-main branches and all PRs.
- Copy the production URL into `README.md` under the Status block.

### Environment variables

None required for the docs site as of v0.1.0. Add future env vars in Project Settings → Environment Variables, scoped to Production/Preview/Development as appropriate.

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

### One-time bootstrap: publish v0.1.0 manually

Before OIDC can be configured, the package name must exist on npm. This single publish is done by hand from a maintainer's laptop:

```bash
bun run audit:contrast
bun run lint
bunx tsc --noEmit
bun run build:lib
npm login                  # passkey challenge
npm publish --access public
```

Verify:

1. Package appears at https://www.npmjs.com/package/substrateui
2. `bun add substrateui` in a throwaway project works
3. You can import and use a component

### One-time OIDC trusted publisher setup

After the manual v0.1.0 is live:

1. Go to https://www.npmjs.com/package/substrateui/access
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

### Automated release flow

1. Merge feature PRs that include `.changeset/*.md` files to `main`.
2. `release.yml` opens a **Version Packages** PR that bumps the version and updates `CHANGELOG.md`.
3. Review and merge the Version Packages PR.
4. `release.yml` runs again and publishes to npm.

Multiple changesets can be stacked before merging the Version PR — they're consumed together into one release.

### changeset-bot (optional)

Install the [changeset-bot GitHub App](https://github.com/apps/changeset-bot) on the repo so every PR gets a comment confirming whether a changeset was included.
