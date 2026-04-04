import { defineConfig } from "tsup"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Resolves @/ path aliases to ./src/ for esbuild.
 * Components use @/lib/utils, @/components/ui/badge, etc.
 * This plugin ensures those resolve correctly during the library build.
 */
const aliasPlugin = {
  name: "resolve-at-alias",
  setup(build: any) {
    build.onResolve({ filter: /^@\// }, async (args: any) => {
      const stripped = args.path.replace(/^@\//, "")
      return build.resolve("./" + stripped, {
        resolveDir: path.resolve(__dirname, "src"),
        kind: args.kind,
      })
    })
  },
}

export default defineConfig({
  entry: {
    index: "src/components/ui/index.ts",
    organisms: "src/components/index.ts",
    utils: "src/lib/utils.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "next",
    "next/link",
    "next-themes",
  ],
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
  esbuildPlugins: [aliasPlugin],
})
