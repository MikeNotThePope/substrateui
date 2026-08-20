"use client"

import { House, Settings } from "lucide-react"

import {
  AppShell,
  AppShellSidebar,
  AppShellSidebarTrigger,
  AppShellLogo,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
} from "@/components/app-shell"
import { PageHeader, PageHeaderTitle } from "@/components/page-header"
import { PageBody } from "@/components/page-body"
import { Muted } from "@/components/ui/typography"

/**
 * The specimen on the App Shell page, assembled from the shipped components
 * rather than drawn from `div`s — see the prose beside it for why.
 *
 * It is a client component because `AppShellNavItem`'s `icon` takes a component
 * type, and a component type is not serialisable across the server boundary.
 * The docs page has to stay a server component to export `metadata`, so the
 * specimen moves here instead.
 */
export function ShellDemo() {
  return (
    // `h-72` for `h-screen` is the one thing shortened here — a specimen cannot
    // be a viewport tall. Everything else is the shipped component, so this
    // shell is laid out by the same CSS the consumer gets.
    <AppShell className="h-72 w-full overflow-hidden rounded-lg border-2">
      <AppShellSidebar>
        <AppShellLogo>Acme Inc</AppShellLogo>
        <AppShellNav>
          <AppShellNavItem icon={House} active href="/">
            Dashboard
          </AppShellNavItem>
          <AppShellNavItem icon={Settings} href="/settings">
            Settings
          </AppShellNavItem>
        </AppShellNav>
        <AppShellFooter>
          <Muted>v1.0.0</Muted>
        </AppShellFooter>
      </AppShellSidebar>
      {/* Stands in for AppShellMain, which renders a `<main>` — and this page
          is already inside the docs layout's one. Same classes, so the shell
          lays out identically. */}
      <div className="flex-1 overflow-y-auto">
        <PageHeader size="sm">
          <AppShellSidebarTrigger />
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
        </PageHeader>
        <PageBody>
          <Muted>PageBody content goes here.</Muted>
        </PageBody>
      </div>
    </AppShell>
  )
}
