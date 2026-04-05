# Visual regression tests

Playwright snapshots every component docs page in light and dark mode.
Baselines live in `components.spec.ts-snapshots/`.

## Running locally

```
bun run test:visual          # verify against baselines
bun run test:visual:update   # regenerate baselines
bun run test:visual:report   # open HTML report from last run
```

## Updating baselines

Baselines must be generated on Ubuntu to match CI. Use the Playwright
Docker image. The image ships with Node but not bun, so install bun
inside the container. Anonymous volumes shadow `node_modules` and
`.next` so the container&apos;s Linux binaries don&apos;t overwrite your
host machine&apos;s platform-specific ones:

```
docker run --rm --network host \
  -v "$(pwd):/work" \
  -v /work/node_modules \
  -v /work/.next \
  -w /work \
  mcr.microsoft.com/playwright:v1.59.1-jammy \
  bash -c "npm install -g bun && bun install --frozen-lockfile && bun run test:visual:update"
```

Commit the resulting `.png` files under
`tests/visual/components.spec.ts-snapshots/`.

## When tests fail in CI

Download the `playwright-report` artifact from the failed Actions run,
unzip, and open `index.html`. It shows side-by-side diffs for each
failed snapshot.
