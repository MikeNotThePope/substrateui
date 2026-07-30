"use client"

import { ArrowUpRight } from "lucide-react"
import { usePathname } from "next/navigation"

import { Caps } from "@/components/caps"

/**
 * Where a source path resolves in the built site. Overridable so a fork, or a
 * preview deploy built from a branch, can point the plate line at its own tree
 * instead of at main here.
 */
const REPO =
  process.env.NEXT_PUBLIC_SOURCE_BASE_URL ??
  "https://github.com/MikeNotThePope/substrateui"

const IS_DEV = process.env.NODE_ENV === "development"

/**
 * The plate line: which file on GitHub prints this page's specimens.
 *
 * Derived from the pathname rather than passed in as a prop, for the reason
 * DocEyebrow already documents — none of the 92 pages should have to repeat
 * something the route already knows, and a prop on 92 pages is 92 chances to
 * point at the wrong file.
 *
 * No reg mark here. The direction allows one beside a slug line, but
 * DocEyebrow sets one four lines above; two crosshairs that close together
 * read as noise rather than as registration.
 */

/**
 * Routes whose source is not `src/components/ui/<slug>.tsx`. Every
 * /docs/components/* page derives from its slug, so only the rest are listed.
 *
 * Absences are deliberate: /docs, the section overviews, and /docs/patterns/forms
 * document how to compose several components rather than one file, and naming an
 * arbitrary member of that set as "the source" would be a lie. Those render nothing.
 *
 * A trailing slash marks a directory and links to the tree view instead of blob.
 */
const SOURCES: Record<string, string[]> = {
  "/docs/accessibility/announcer": ["src/hooks/use-announcer.tsx"],
  "/docs/accessibility/contrast": ["scripts/audit-contrast.ts"],
  "/docs/accessibility/direction": ["src/components/ui/direction.tsx"],
  "/docs/blocks": ["src/components/blocks/"],
  "/docs/foundations/ai-prompt": ["src/app/docs/foundations/ai-prompt/prompt.ts"],
  "/docs/foundations/cli": ["bin/substrateui.mjs"],
  "/docs/foundations/theme-generator": ["src/components/ui/theme.tsx"],
  "/docs/foundations/theming": ["src/components/ui/theme.tsx"],
  "/docs/foundations/themes": ["src/styles/tokens.css"],
  "/docs/foundations/textures": ["src/styles/tokens.css"],
  "/docs/hooks": ["src/hooks/"],
  "/docs/layouts/app-shell": ["src/components/app-shell.tsx"],
  "/docs/layouts/auth-shell": ["src/components/auth-shell.tsx"],
  "/docs/layouts/dashboard-shell": ["src/components/dashboard-shell.tsx"],
  "/docs/layouts/nav-shell": ["src/components/nav-shell.tsx"],
  "/docs/layouts/page-layout": [
    "src/components/page-header.tsx",
    "src/components/page-body.tsx",
    "src/components/page-tabs.tsx",
  ],
  "/docs/templates": ["src/components/templates/"],
  "/docs/tokens": ["src/styles/tokens.css"],
  "/docs/tokens/spacing": ["src/styles/tokens.css"],
  "/docs/tokens/typography": ["src/styles/tokens.css"],
}

const COMPONENTS_PREFIX = "/docs/components/"

export function sourcesFor(pathname: string): string[] {
  if (pathname.startsWith(COMPONENTS_PREFIX)) {
    const slug = pathname.slice(COMPONENTS_PREFIX.length).replace(/\/$/, "")
    // Nested routes under a component page have no source file of their own.
    if (slug && !slug.includes("/")) return [`src/components/ui/${slug}.tsx`]
  }
  return SOURCES[pathname.replace(/\/$/, "")] ?? []
}

function hrefFor(path: string): string {
  const isDir = path.endsWith("/")
  return `${REPO}/${isDir ? "tree" : "blob"}/main/${isDir ? path.slice(0, -1) : path}`
}

/**
 * The path is the real content of this link; the host is an environment.
 * In production that host is GitHub. Running locally, the file is right there
 * on disk, and the useful destination is the editor rather than a web view of
 * a possibly-stale main — so a plain left-click opens it via Next's dev
 * endpoint (GET /__nextjs_launch-editor, which 204s and launches).
 *
 * href stays the GitHub URL in both environments, so copy-link and
 * modified-clicks still give the canonical shareable address. Only an
 * unmodified primary click on a file is intercepted; directories have no
 * editor equivalent and always go to the tree view.
 */
function editorLaunchHandler(path: string) {
  if (!IS_DEV || path.endsWith("/")) return undefined

  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const params = new URLSearchParams({ file: path, line1: "1", column1: "1" })
    void fetch(`/__nextjs_launch-editor?${params}`)
  }
}

export function PlateLine() {
  const pathname = usePathname()
  const sources = sourcesFor(pathname)

  if (sources.length === 0) return null

  // With one source the full path is worth the room — it tells you where the
  // component lives. With several it would wrap, so they collapse to basenames.
  const terse = sources.length > 1

  return (
    <div className="mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
      <Caps className="text-muted-foreground">Plate</Caps>
      {sources.map((path) => {
        const launch = editorLaunchHandler(path)
        return (
          <a
            key={path}
            href={hrefFor(path)}
            target="_blank"
            rel="noreferrer"
            onClick={launch}
            aria-label={
              launch ? `Open ${path} in your editor` : `View ${path} on GitHub`
            }
            title={launch ? "Opens in your editor — ⌘-click for GitHub" : undefined}
            className="inline-flex items-center gap-1 rounded-sm font-mono text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {terse ? path.split("/").filter(Boolean).pop() : path}
            <ArrowUpRight aria-hidden className="h-3 w-3 shrink-0" />
          </a>
        )
      })}
    </div>
  )
}
