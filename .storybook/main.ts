import type { StorybookConfig } from "@storybook/react-vite"
import path from "node:path"
import { fileURLToPath } from "node:url"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  // Storybook auto-uses ../public as a static dir; we host Storybook under
  // /storybook, so that would recurse and bloat the output. Opt out.
  staticDirs: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {}
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      "@": path.resolve(dirname, "../src"),
    }
    // Vite's default publicDir is ../public, which would copy the entire
    // Next.js public folder (including our own storybook/ output) into the
    // build. Disable it — Storybook's own assets live in sb-common-assets.
    viteConfig.publicDir = false
    // We host this bundle under /storybook on the docs site, so all asset
    // URLs (sb-manager, sb-addons, assets/*) need that prefix.
    viteConfig.base = "/storybook/"
    return viteConfig
  },
}

export default config
