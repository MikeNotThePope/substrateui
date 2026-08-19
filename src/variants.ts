/**
 * The class recipes, published without a `"use client"` boundary.
 *
 * Every `cva` recipe in this package is also exported from the root barrel, and
 * that export is unusable from a server component. `"use client"` marks every
 * export of a module, `dist/index.js` bundles 50 client components, and a
 * re-export through a client module is still a client reference — so calling
 * `buttonVariants()` while rendering on the server throws
 *
 *   Attempted to call buttonVariants() from the server but buttonVariants is
 *   on the client.
 *
 * at request time. No build, `tsc` or lint run sees it.
 *
 * This entrypoint exists to give the recipes a boundary of their own. Because
 * nothing it imports carries the directive, esbuild's splitting puts these
 * modules in a chunk no client component shares, and the build leaves that
 * chunk unmarked (scripts/client-boundary.ts). Import from here in any code
 * that might render on the server:
 *
 *   import { buttonVariants } from "@mikenotthepope/substrateui/variants"
 *
 * The root barrel keeps exporting them, unchanged, for client callers.
 */

export * from "./components/ui/badge-variants"
export * from "./components/ui/banner-variants"
export * from "./components/ui/button-variants"
export * from "./components/ui/native-select-variants"
export * from "./components/ui/overline-variants"
export * from "./components/ui/sidebar-menu-button-variants"
export * from "./components/ui/spinner-variants"
export * from "./components/ui/toggle-variants"
