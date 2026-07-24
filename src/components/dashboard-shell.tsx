"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { AppShellContext } from "@/components/app-shell"

/** Dashboard shell: a full-width top bar over a `[sidebar | main]` row — the
 * classic admin layout. Reuses the AppShell sidebar parts for the row, so the
 * sidebar collapses into a mobile drawer opened by AppShellSidebarTrigger
 * (placed in DashboardShellHeader).
 *
 * @example
 * <DashboardShell>
 *   <DashboardShellHeader>
 *     <AppShellSidebarTrigger />
 *     <DashboardShellBrand>Acme</DashboardShellBrand>
 *     <DashboardShellActions>
 *       <ThemeToggle />
 *     </DashboardShellActions>
 *   </DashboardShellHeader>
 *   <DashboardShellBody>
 *     <AppShellSidebar>
 *       <AppShellNav>
 *         <AppShellNavItem active href="/">Dashboard</AppShellNavItem>
 *       </AppShellNav>
 *     </AppShellSidebar>
 *     <AppShellMain>
 *       <PageHeader>...</PageHeader>
 *       <PageBody>...</PageBody>
 *     </AppShellMain>
 *   </DashboardShellBody>
 * </DashboardShell>
 */
function DashboardShell({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  return (
    <AppShellContext.Provider value={{ mobileOpen, setMobileOpen }}>
      <div
        ref={ref}
        data-slot="dashboard-shell"
        className={cn(
          "flex h-screen flex-col overflow-hidden bg-background",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  )
}

/** Full-width top bar spanning above the sidebar and main content. Hosts the
 * brand, actions, and (on mobile) the AppShellSidebarTrigger. */
function DashboardShellHeader({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"header">) {
  return (
    <header
      ref={ref}
      data-slot="dashboard-shell-header"
      className={cn(
        "flex h-14 shrink-0 items-center gap-3 border-b-2 bg-card px-4",
        className,
      )}
      {...props}
    />
  )
}

/** Brand / logo area in the header. */
function DashboardShellBrand({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="dashboard-shell-brand"
      className={cn(
        "flex items-center gap-2 text-lg font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

/** Right-aligned cluster for header actions. Pushes itself to the end. */
function DashboardShellActions({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="dashboard-shell-actions"
      className={cn("ms-auto flex items-center gap-2", className)}
      {...props}
    />
  )
}

/** Row wrapper below the header that lays the sidebar and main side by side.
 * Place an AppShellSidebar and AppShellMain inside. */
function DashboardShellBody({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="dashboard-shell-body"
      className={cn("flex flex-1 overflow-hidden", className)}
      {...props}
    />
  )
}

export {
  DashboardShell,
  DashboardShellHeader,
  DashboardShellBrand,
  DashboardShellActions,
  DashboardShellBody,
}
