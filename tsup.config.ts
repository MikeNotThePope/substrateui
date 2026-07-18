import { defineConfig } from "tsup"

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
