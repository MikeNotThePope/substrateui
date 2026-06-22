import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "@/components/docs-sidebar-nav"

// ─── Layout ───────────────────────────────────────────────────────────

export default function DocsLayout({ children }: { children: React.ReactNode }) {
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

      {/* Main content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
