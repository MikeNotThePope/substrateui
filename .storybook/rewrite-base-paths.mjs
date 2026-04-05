#!/usr/bin/env node
// After `storybook build`, the generated HTML references assets with
// relative paths (`./sb-manager/...`, `./assets/...`). That only resolves
// correctly if the browser URL has a trailing slash — but Next.js normalizes
// `/storybook/` to `/storybook`, dropping it. Rewriting the two HTML files
// to use absolute `/storybook/…` paths makes Storybook robust to either URL.

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(dirname, "../public/storybook")

const BASE = "/storybook/"

const rewrite = (relPath) => {
  const filePath = path.join(outDir, relPath)
  const src = readFileSync(filePath, "utf8")
  let out = src
    // href="./foo" or src="./foo" → href="/storybook/foo"
    .replaceAll('href="./', `href="${BASE}`)
    .replaceAll('src="./', `src="${BASE}`)
    // ES module imports: import './sb-manager/runtime.js' → '/storybook/sb-manager/runtime.js'
    .replaceAll("import './", `import '${BASE}`)
    .replaceAll('import "./', `import "${BASE}`)
    // CSS @font-face url('./…')
    .replaceAll("url('./", `url('${BASE}`)
    .replaceAll('url("./', `url("${BASE}`)

  // Inject a <base> tag at the top of <head> so runtime code that fetches
  // relative URLs (e.g. `./index.json` inside minified bundles) also resolves
  // against /storybook/. Next.js normalizes away the trailing slash in the
  // browser URL, which breaks default relative resolution otherwise.
  const baseTag = `<base href="${BASE}" />`
  if (!out.includes(baseTag)) {
    out = out.replace("<head>", `<head>\n    ${baseTag}`)
  }

  writeFileSync(filePath, out)
  console.log(`  rewrote ${relPath}`)
}

console.log(`Rewriting relative paths in ${outDir} to absolute ${BASE} …`)
rewrite("index.html")
rewrite("iframe.html")
console.log("Done.")
