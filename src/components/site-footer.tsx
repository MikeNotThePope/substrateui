import Link from "next/link"

import { DirectionToggle } from "@/components/direction-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteFooter() {
  return (
    <footer className="border-t-2 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link
            href="/"
            className="font-bold text-foreground tracking-tight"
          >
            SubstrateUI
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/docs" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/docs/accessibility/direction"
            className="hover:text-foreground transition-colors"
          >
            Accessibility
          </Link>
        </div>

        {/* Site settings: theme, direction. Future: language dropdown. */}
        <div className="flex items-center gap-2 flex-wrap">
          <ThemeToggle />
          <DirectionToggle />
        </div>
      </div>
    </footer>
  )
}
