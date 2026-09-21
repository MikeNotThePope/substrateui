import { defineConfig } from "tsup"

import { markClientBoundaries } from "./scripts/client-boundary"

export default defineConfig({
  entry: {
    index: "src/components/ui/index.ts",
    date: "src/components/ui/date.ts",
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
  // consumer that didn't happen to have it installed.
  //
  // Leaving the list bare does *not*, as this comment used to claim, make a
  // reintroduced framework import fail the build. tsup externalises
  // `dependencies` and `peerDependencies` on its own and bundles the rest, and
  // both packages are devDependencies — so such an import is quietly inlined
  // instead, publishing a second private copy of the package whose React
  // context nothing in the consumer's tree ever fills. `audit:boundary` reads
  // the metafile below and fails on exactly that
  // (MikeNotThePope/substrateui#123).
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
