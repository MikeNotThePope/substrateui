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
