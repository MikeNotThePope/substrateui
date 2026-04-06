#!/usr/bin/env bash
set -euo pipefail

# Regenerate visual baselines inside Docker (Linux), then upload to R2.
# Usage: bun run snapshots:regenerate

# Resolve the Playwright version from package.json so the Docker image
# always matches the installed version.
PW_VERSION=$(node -e "console.log(require('./node_modules/@playwright/test/package.json').version)")
IMAGE="mcr.microsoft.com/playwright:v${PW_VERSION}-jammy"

echo "Using Playwright Docker image: $IMAGE"
echo "Regenerating baselines..."

docker run --rm --network host \
  -v "$(pwd):/work" \
  -v /work/node_modules \
  -v /work/.next \
  -w /work \
  "$IMAGE" \
  bash -c "apt-get update -qq && apt-get install -yqq unzip >/dev/null 2>&1 && curl -fsSL https://bun.sh/install | bash >/dev/null 2>&1 && export PATH=\$HOME/.bun/bin:\$PATH && bun install --frozen-lockfile && bun run test:visual:update"

echo ""
echo "Baselines regenerated. Uploading to R2..."
bun run snapshots:upload

echo "Done."
