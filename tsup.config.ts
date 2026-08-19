import { defineConfig } from "tsup"

import { markClientBoundaries } from "./scripts/client-boundary"

export default defineConfig({
  entry: {
    index: "src/components/ui/index.ts",
    organisms: "src/components/index.ts",
    blocks: "src/components/blocks/index.ts",
    templates: "src/components/templates/index.ts",
    hooks: "src/hooks/index.ts",
    utils: "src/lib/utils.ts",
    variants: "src/variants.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  splitting: true,
  // Read by `markClientBoundaries` and by `audit:boundary`: which source
  // modules ended up in which built file is the only way to tell a client
  // chunk from a server-safe one.
  metafile: true,
  treeshake: true,
  // No Next externals: nothing under the published entrypoints imports `next`,
  // `next/link`, or `next-themes`. Listing them here is what let a stray
  // top-level `next-themes` import survive into dist/index.js and break every
  // consumer that didn't happen to have it installed. Leaving the list bare
  // means a reintroduced framework import fails the build here instead.
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Not banner: {js}: treeshake's rollup pass strips module-level directives,
  // so "use client" must be prepended after the build instead. Which files get
  // it is decided from the metafile — see scripts/client-boundary.ts.
  onSuccess: async () => {
    await markClientBoundaries("dist")
  },
  outDir: "dist",
  clean: true,
  tsconfig: "./tsconfig.build.json",
})
