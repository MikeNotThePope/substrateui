<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visual regression baselines

Snapshots are stored in Cloudflare R2, not in the git repo. Run `bun run snapshots:download` to fetch baselines before running visual tests. To update baselines, regenerate them in Docker (see `tests/visual/README.md` for the `docker run` command) then run `bun run snapshots:upload`. Do not run `bun run test:visual:update` on macOS — it produces `-darwin.png` files CI won't use.
