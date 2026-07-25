"use client"

import * as React from "react"

import {
  DashboardShell,
  DashboardShellHeader,
  DashboardShellBrand,
  DashboardShellActions,
  DashboardShellBody,
} from "@/components/dashboard-shell"
import {
  AppShellSidebar,
  AppShellSidebarTrigger,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
  AppShellMain,
} from "@/components/app-shell"
import { PageHeader, PageHeaderContent, PageHeaderTitle, PageHeaderDescription } from "@/components/page-header"
import { PageBody } from "@/components/page-body"
import { Muted } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { StatsBlock, type StatItem } from "@/components/blocks/stats-block"
import { ActivityFeedBlock, type ActivityItem } from "@/components/blocks/activity-feed-block"

/** A sidebar navigation entry for {@link DashboardTemplate}. */
export interface DashboardNavItem {
  label: React.ReactNode
  href: string
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
}

/** Props for {@link DashboardTemplate}. */
export interface DashboardTemplateProps {
  /** Brand/logo shown in the top bar. */
  brand?: React.ReactNode
  /** Sidebar navigation items. */
  navItems?: DashboardNavItem[]
  /** Right-aligned header actions (buttons, avatar, theme toggle). */
  actions?: React.ReactNode
  /** Footer node pinned to the bottom of the sidebar. */
  sidebarFooter?: React.ReactNode
  /** Page title shown above the content. */
  title?: React.ReactNode
  /** Supporting text under the title. */
  description?: React.ReactNode
  /** Stat cards for the metrics row. Rendered via StatsBlock. */
  stats?: StatItem[]
  /** Recent activity shown in the side column. Rendered via ActivityFeedBlock. */
  activity?: ActivityItem[]
  /**
   * Main content. When omitted, a default layout of the stats row beside the
   * activity feed is rendered, so the template is useful with data props alone.
   */
  children?: React.ReactNode
}

/**
 * A complete admin dashboard page: a full-width top bar over a collapsible
 * sidebar and main region, prewired with a stats row and an activity feed. Pass
 * data props for an instant dashboard, or `children` to own the content area.
 *
 * The sidebar collapses into a drawer under `md`, opened from the header
 * hamburger. Wrap the app in {@link LinkProvider} for client-side nav.
 *
 * @example
 * <DashboardTemplate
 *   brand="Acme"
 *   navItems={[{ label: "Overview", href: "/", icon: Home, active: true }]}
 *   stats={[{ title: "Revenue", value: "$48k", change: "+12%", changeType: "positive" }]}
 *   activity={[{ title: "New signup", time: "2m ago" }]}
 * />
 */
function DashboardTemplate({
  brand = "Dashboard",
  navItems = [],
  actions,
  sidebarFooter,
  title = "Overview",
  description,
  stats = [],
  activity = [],
  children,
}: DashboardTemplateProps) {
  return (
    <DashboardShell data-slot="dashboard-template">
      <DashboardShellHeader>
        <AppShellSidebarTrigger />
        <DashboardShellBrand>{brand}</DashboardShellBrand>
        {actions && <DashboardShellActions>{actions}</DashboardShellActions>}
      </DashboardShellHeader>
      <DashboardShellBody>
        <AppShellSidebar>
          <AppShellNav>
            {navItems.map((item, i) => (
              <AppShellNavItem key={i} icon={item.icon} href={item.href} active={item.active}>
                {item.label}
              </AppShellNavItem>
            ))}
          </AppShellNav>
          {sidebarFooter && <AppShellFooter>{sidebarFooter}</AppShellFooter>}
        </AppShellSidebar>
        <AppShellMain>
          <PageHeader>
            <PageHeaderContent>
              <PageHeaderTitle>{title}</PageHeaderTitle>
              {description && <PageHeaderDescription>{description}</PageHeaderDescription>}
            </PageHeaderContent>
          </PageHeader>
          <PageBody>
            {children ?? (
              <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <Stack gap="lg">
                  {stats.length > 0 ? (
                    <StatsBlock stats={stats} />
                  ) : (
                    <Muted>Pass a `stats` prop or `children` to fill the content area.</Muted>
                  )}
                </Stack>
                {activity.length > 0 && <ActivityFeedBlock items={activity} />}
              </div>
            )}
          </PageBody>
        </AppShellMain>
      </DashboardShellBody>
    </DashboardShell>
  )
}

export { DashboardTemplate }
