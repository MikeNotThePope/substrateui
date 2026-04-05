<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual regression baselines

Snapshots under `tests/visual/components.spec.ts-snapshots/` are Linux PNGs and must be regenerated in Docker to match CI. See `tests/visual/README.md` for the exact `docker run` command. Do not run `bun run test:visual:update` on macOS — it produces `-darwin.png` files CI won't use.
