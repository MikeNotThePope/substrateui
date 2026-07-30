"use client"

import { ArrowUpRight } from "lucide-react"
import { usePathname } from "next/navigation"

import { Caps } from "@/components/caps"

/**
 * The source line: which file on GitHub this page documents.
 *
 * Derived from the pathname rather than passed in as a prop, for the reason
 * DocEyebrow already documents — none of the 92 pages should have to repeat
 * something the route already knows, and a prop on 92 pages is 92 chances to
 * point at the wrong file.
 *
 * Labelled SOURCE, not PLATE. "Plate" is the press metaphor — a plate is what
 * prints a sheet — and it sits well in the internal vocabulary beside slug lines
 * and registration marks. As a user-facing label it failed the direction's own
 * voice test: say what the thing *is*, in words that can be checked. A reader
 * who has to ask what a plate is has been charged for the metaphor without being
 * given the answer.
 *
 * The link always navigates to GitHub, in dev as well as production. An earlier
 * version intercepted the click in dev to open the file in the local editor via
 * Next's launch-editor endpoint. It worked — and it was wrong: the trailing ↗
 * promises navigation, so a click that silently pokes an editor somewhere behind
 * the browser reads as a dead link. Don't reclaim the primary click of something
 * that looks like a link.
 *
 * No reg mark here. The direction allows one beside a slug line, but DocEyebrow
 * sets one four lines above; two crosshairs that close together read as noise
 * rather than as registration.
 */

/**
 * Where a source path resolves. Overridable so a fork, or a preview deploy built
 * from a branch, can point at its own tree instead of at main here.
 */
const REPO =
  process.env.NEXT_PUBLIC_SOURCE_BASE_URL ??
  "https://github.com/MikeNotThePope/substrateui"

/**
 * Which tree the paths resolve against.
 *
 * Not `main`. A page describes the code it was built from, and `main` moves on
 * without it — a link to a line that has since been renamed away sends the
 * reader somewhere the page never described. Vercel exposes the built commit as
 * `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA`, which is frozen into the bundle at
 * `next build` and so stays pinned to exactly the tree the page documents.
 *
 * `||` rather than `??`: an env var that is declared but empty is unset here,
 * and Vercel hands over `""` when the system variables are switched off.
 * Failing to `main` in that case is the old behaviour, which is wrong-ish but
 * never broken.
 */
const REF =
  process.env.NEXT_PUBLIC_SOURCE_REF ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  "main"

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

export function hrefFor(path: string): string {
  const isDir = path.endsWith("/")
  return `${REPO}/${isDir ? "tree" : "blob"}/${REF}/${isDir ? path.slice(0, -1) : path}`
}

export function SourceLine() {
  const pathname = usePathname()
  const sources = sourcesFor(pathname)

  if (sources.length === 0) return null

  // With one source the full path is worth the room — it tells you where the
  // component lives. With several it would wrap, so they collapse to basenames.
  const terse = sources.length > 1

  return (
    <div className="mt-3 flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
      <Caps className="text-muted-foreground">Source</Caps>
      {sources.map((path) => (
        <a
          key={path}
          href={hrefFor(path)}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${path} on GitHub`}
          className="inline-flex items-center gap-1 rounded-sm font-mono text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {terse ? path.split("/").filter(Boolean).pop() : path}
          <ArrowUpRight aria-hidden className="h-3 w-3 shrink-0" />
        </a>
      ))}
    </div>
  )
}
