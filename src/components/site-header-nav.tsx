"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by SiteHeaderNav. All keys have English defaults. */
interface SiteHeaderNavLabels {
  primaryNav?: string
  openNavigationMenu?: string
  navigation?: string
}

const defaultSiteHeaderNavLabels: Required<SiteHeaderNavLabels> = {
  primaryNav: "Primary",
  openNavigationMenu: "Open navigation menu",
  navigation: "Navigation",
}

type NavLink = {
  label: string
  href: string
  match: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { label: "Docs", href: "/docs", match: "/docs" },
  {
    label: "Components",
    href: "/docs/components/button",
    match: "/docs/components",
  },
  { label: "Design System", href: "/design-system", match: "/design-system" },
  {
    label: "Storybook",
    href: "/storybook/",
    match: "/storybook",
    external: true,
  },
]

function matches(pathname: string, match: string) {
  return pathname === match || pathname.startsWith(match + "/")
}

function findActiveMatch(pathname: string): string | null {
  // Longest match wins so that /docs/components/* highlights "Components"
  // rather than "Docs".
  return (
    navLinks
      .map((l) => l.match)
      .filter((m) => matches(pathname, m))
      .sort((a, b) => b.length - a.length)[0] ?? null
  )
}

export function SiteHeaderNav({ labels: labelsProp }: { labels?: SiteHeaderNavLabels } = {}) {
  const pathname = usePathname()
  const activeMatch = findActiveMatch(pathname)
  const ctx = useLabels()
  const labels = resolveLabels(defaultSiteHeaderNavLabels, ctx.siteHeaderNav, labelsProp)

  return (
    <nav aria-label={labels.primaryNav} className="hidden md:flex items-center gap-6">
      {navLinks.map((link) => {
        const active = link.match === activeMatch
        const className = cn(
          "text-sm transition-colors",
          active
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        )
        if (link.external) {
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {link.label}
            </a>
          )
        }
        return (
          <Link key={link.href} href={link.href} className={className}>
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function SiteHeaderMobileNav({ labels: labelsProp }: { labels?: SiteHeaderNavLabels } = {}) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const activeMatch = findActiveMatch(pathname)
  const ctx = useLabels()
  const labels = resolveLabels(defaultSiteHeaderNavLabels, ctx.siteHeaderNav, labelsProp)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={labels.openNavigationMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-6">
        <SheetTitle className="font-bold text-lg tracking-tight mb-6">
          {labels.navigation}
        </SheetTitle>
        <nav aria-label={labels.primaryNav} className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = link.match === activeMatch
            const className = cn(
              "px-3 py-2 rounded-md text-sm transition-colors",
              active
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )
            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {link.label}
                </a>
              )
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={className}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export type { SiteHeaderNavLabels }
