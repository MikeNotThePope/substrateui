# Visual regression tests

Playwright snapshots every component docs page across four projects:
`light`, `dark`, `light-rtl`, and `dark-rtl`. Each project seeds
`localStorage` with the matching theme and `substrateui-direction`
values, so every baseline captures a theme × direction combination.

Baselines are stored in Cloudflare R2 (not in the git repo) and
downloaded before tests run. The snapshot directory
`components.spec.ts-snapshots/` is gitignored.

## Environment variables

Set these for any snapshot download or upload operation:

```
R2_ACCOUNT_ID=<your Cloudflare account ID>
R2_ACCESS_KEY_ID=<R2 API token access key>
R2_SECRET_ACCESS_KEY=<R2 API token secret key>
R2_BUCKET=substrateui-snapshots
```

In CI these are injected from GitHub Actions secrets. Locally, export
them in your shell or add them to `.env.local` and source the file.

## Running locally

```
bun run snapshots:download    # fetch baselines from R2
bun run test:visual           # verify against baselines
bun run test:visual:report    # open HTML report from last run
```

## Updating baselines

Baselines must be generated on Ubuntu to match CI. The easiest way is
the all-in-one command that runs Docker + uploads to R2:

```
bun run snapshots:regenerate
```

This resolves the Playwright version from your local install, runs
`test:visual:update` inside the matching Docker image, then uploads
the new baselines to R2.

If you need to run the steps separately, the Docker command is:

```
docker run --rm --network host \
  -v "$(pwd):/work" \
  -v /work/node_modules \
  -v /work/.next \
  -w /work \
  mcr.microsoft.com/playwright:v<VERSION>-jammy \
  bash -c "apt-get update && apt-get install -y unzip && curl -fsSL https://bun.sh/install | bash && export PATH=\$HOME/.bun/bin:\$PATH && bun install --frozen-lockfile && bun run test:visual:update"
```

Then upload from your host machine:

```
bun run snapshots:upload
```

This uploads all local snapshots to R2 and deletes any stale images
that no longer exist locally (e.g. removed components).

Alternatively, trigger the **Update Visual Baselines** workflow from
the GitHub Actions tab — it regenerates and uploads in one step.

## When tests fail in CI

Download the `playwright-report` artifact from the failed Actions run,
unzip, and open `index.html`. It shows side-by-side diffs for each
failed snapshot.
