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
docker run --rm --network host --ipc=host \
  -v "$(pwd):/work" \
  -v /work/node_modules \
  -v /work/.next \
  -w /work \
  mcr.microsoft.com/playwright:v<VERSION>-jammy \
  bash -c "apt-get update && apt-get install -y unzip && curl -fsSL https://bun.sh/install | bash && export PATH=\$HOME/.bun/bin:\$PATH && bun install --frozen-lockfile && bun run test:visual:update"
```

Keep `--ipc=host` — Chromium outgrows Docker's default 64MB `/dev/shm`
and crashes instead of degrading.

Then upload from your host machine:

```
bun run snapshots:upload
```

This uploads all local snapshots to R2 and deletes any stale images
that no longer exist locally (e.g. removed components).

Alternatively, trigger the **Update Visual Baselines** workflow from
the GitHub Actions tab — it regenerates and uploads in one step.

It refuses to run unless the branch's open pull request carries
Mike's approving review (`scripts/baselines-gate.ts`). There is one
baseline archive and every branch reads it, so overwriting it is the
one thing in this repository no later commit can undo. A session
whose `visual` job goes red therefore asks for the review on its pull
request rather than dispatching the workflow itself.

Its last step then re-runs the branch's CI for you. That matters
because there is one baseline archive in R2 and CI starts on push:
a `verify` that began before the upload downloaded the *old*
baselines, so it is guaranteed to fail on every snapshot the
regeneration just replaced. The workflow cancels that doomed run if
it is still going and re-runs it, which keeps the same `verify`
check — the one branch protection requires — rather than reporting a
detached second one. Nothing to sequence by hand.

## If a pull request merges with `visual` red

Recovering is not one button, so this is written down before the first
time. #134 came close: it merged with its `visual` red in CI, and the
only reason nothing had to be recovered is that the baselines had
already been regenerated from its branch beforehand. Merging a red `visual` puts pages on `main` that no baseline
matches, and the gate above means `main` cannot be the branch that fixes
it: a dispatch needs an *open* pull request whose head is the dispatched
branch, and `main` has none.

The Version Packages pull request cannot be it either. The release
workflow opens that one with `RELEASE_PAT`, which is Mike's own token,
so the pull request is authored by the account whose approval the gate
wants and GitHub does not let an author approve their own. Its
`verify` stays red, its auto-merge never fires, and the version sits
unpublished.

What works is a fresh `claude/**` branch off `main` carrying some real
change, however small. `pr-open.yml` opens its pull request as the App,
Mike can approve that, and a dispatch on that branch regenerates the one
archive — which is what every other branch, including the Version
Packages one, then reads. Re-run the failed jobs on those and they go
green without a push.

None of this has had to be done yet, so treat it as reasoning rather
than a tested recipe. The parts that are checked: the gate's four cases
have unit tests, and the Version Packages pull request really is
authored by Mike's account, because `RELEASE_PAT` is his.

## When tests fail in CI

Download the `playwright-report` artifact from the failed Actions run,
unzip, and open `index.html`. It shows side-by-side diffs for each
failed snapshot.
