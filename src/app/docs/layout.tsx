import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { DocsSearch } from "@/components/docs-search"
import { SidebarNav } from "@/components/docs-sidebar-nav"
import { docsIndex } from "@/lib/docs-index"

// ─── Layout ───────────────────────────────────────────────────────────

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  // Read at build time — this layout is statically prerendered — so the
  // palette opens with the index already in hand and no request to wait on.
  const entries = docsIndex()

  return (
    <div className="flex">
      {/* Desktop sidebar — sticky beneath the global SiteHeader.
          On mobile, this navigation is folded into the header's drawer
          (see SiteHeaderMobileNav) so there's only a single hamburger. */}
      <aside className="hidden md:flex md:w-[280px] md:flex-col md:shrink-0 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:self-start border-e-2 border-sidebar-border bg-sidebar text-sidebar-foreground">
        <ScrollArea className="flex-1 py-4 px-2">
          <SidebarNav />
        </ScrollArea>
      </aside>

      {/* Main content. The sidebar stays outside this element so it is
          exposed as its own landmark rather than buried inside main —
          which is also what makes the skip link worth having here. */}
      <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 outline-none">
        {/* Deliberately one instance, in the column that exists at every
            breakpoint. Putting a copy in the desktop-only sidebar would mount
            two Cmd+K handlers and serialise the index into the payload twice,
            and leave mobile — where the sidebar is hidden — with no search. */}
        <div className="border-b-2 border-border px-4 py-3 md:px-8">
          <DocsSearch entries={entries} className="md:max-w-sm" />
        </div>
        {children}
      </main>
    </div>
  )
}
