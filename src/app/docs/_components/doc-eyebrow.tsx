"use client"

import { usePathname } from "next/navigation"

import { Caps } from "@/components/caps"
import { RegMark } from "@/components/reg-mark"
import { navSections } from "@/components/docs-sidebar-nav"

/**
 * The slug line at the top of a docs page: which plate of the sheet you're
 * looking at. Read from the sidebar's own nav data rather than passed in as
 * a prop, so it can't drift from the navigation and so none of the 92 pages
 * has to repeat something the route already knows.
 *
 * Client-side because the section is derived from the pathname, which a
 * server component can't see.
 */
export function DocEyebrow() {
  const pathname = usePathname()
  const section = navSections.find((s) =>
    s.items.some((i) => i.href === pathname)
  )

  return (
    <div className="flex items-center gap-2">
      <RegMark className="h-4 w-4 shrink-0 text-primary" />
      <Caps className="text-muted-foreground">
        {section?.title ?? "Documentation"}
      </Caps>
    </div>
  )
}
