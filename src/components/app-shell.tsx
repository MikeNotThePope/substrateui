import * as React from "react"

import { cn } from "@/lib/utils"
import { Stack } from "@/components/ui/stack"

/** Full-height application shell container with horizontal flex layout.
 *
 * @example
 * <AppShell><AppShellSidebar>...</AppShellSidebar><AppShellMain>...</AppShellMain></AppShell>
 */
function AppShell({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="app-shell"
      className={cn("flex h-screen overflow-hidden bg-background", className)}
      {...props}
    />
  )
}

/** Fixed-width sidebar panel hidden on mobile, visible on md+ screens.
 *
 * @prop collapsed - Whether the sidebar is in collapsed state.
 */
function AppShellSidebar({
  collapsed = false,
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"aside"> & { collapsed?: boolean }) {
  return (
    <aside
      ref={ref}
      data-slot="app-shell-sidebar"
      className={cn(
        "flex-col w-64 shrink-0 border-r-2 bg-card",
        collapsed ? "hidden md:flex" : "hidden md:flex",
        className,
      )}
      {...props}
    />
  )
}

/** Logo area at the top of the sidebar with a bottom border. */
function AppShellLogo({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="app-shell-logo"
      className={cn(
        "flex items-center h-16 px-6 border-b-2 shrink-0",
        className,
      )}
      {...props}
    />
  )
}

/** Scrollable navigation region within the sidebar. */
function AppShellNav({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"nav">) {
  return (
    <nav
      ref={ref}
      data-slot="app-shell-nav"
      className={cn("flex-1 overflow-y-auto py-4 px-3", className)}
    >
      <Stack gap="xs" {...props} />
    </nav>
  )
}

/** Props for AppShellNavItem including optional icon and active state. */
interface AppShellNavItemProps extends React.ComponentPropsWithRef<"a"> {
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
}

/** Navigation link with optional leading icon and active highlight.
 *
 * @example
 * <AppShellNavItem icon={HomeIcon} active href="/">Home</AppShellNavItem>
 *
 * @prop icon - Optional icon component rendered before the label.
 * @prop active - Whether this item represents the current page.
 */
function AppShellNavItem({
  icon: Icon,
  active = false,
  className,
  children,
  ref,
  ...props
}: AppShellNavItemProps) {
  return (
    <a
      ref={ref}
      data-slot="app-shell-nav-item"
      data-active={active || undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors active:translate-y-[1.5px] transition-transform",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-surface-interactive hover:text-foreground",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </a>
  )
}

/** Footer area pinned to the bottom of the sidebar with a top border. */
function AppShellFooter({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="app-shell-footer"
      className={cn("shrink-0 border-t-2 p-4", className)}
      {...props}
    />
  )
}

/** Scrollable main content area that fills remaining horizontal space. */
function AppShellMain({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"main">) {
  return (
    <main
      ref={ref}
      data-slot="app-shell-main"
      className={cn("flex-1 overflow-y-auto", className)}
      {...props}
    />
  )
}

export {
  AppShell,
  AppShellSidebar,
  AppShellLogo,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
  AppShellMain,
  type AppShellNavItemProps,
}
