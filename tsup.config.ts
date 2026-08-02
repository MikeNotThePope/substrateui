import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/components/ui/index.ts",
    organisms: "src/components/index.ts",
    blocks: "src/components/blocks/index.ts",
    templates: "src/components/templates/index.ts",
    hooks: "src/hooks/index.ts",
    utils: "src/lib/utils.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  // No Next externals: nothing under the published entrypoints imports `next`,
  // `next/link`, or `next-themes`. Listing them here is what let a stray
  // top-level `next-themes` import survive into dist/index.js and break every
  // consumer that didn't happen to have it installed. Leaving the list bare
  // means a reintroduced framework import fails the build here instead.
  external: ["react", "react-dom", "react/jsx-runtime"],
  // Not banner: {js}: treeshake's rollup pass strips module-level directives,
  // so "use client" must be prepended after the build instead.
  onSuccess: async () => {
    const { readdir, readFile, writeFile } = await import("fs/promises")
    const files = await readdir("dist")
    for (const file of files) {
      if (file.endsWith(".js")) {
        const content = await readFile(`dist/${file}`, "utf-8")
        await writeFile(`dist/${file}`, `"use client";\n${content}`)
      }
    }
  },
  outDir: "dist",
  clean: true,
  tsconfig: "./tsconfig.build.json",
})
