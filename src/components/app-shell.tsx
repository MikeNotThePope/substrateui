"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

// ─── Mobile drawer context ──────────────────────────────────────────

/** Shared open-state for the sidebar's mobile drawer. */
interface AppShellContextValue {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

/** Context wiring the mobile hamburger trigger to the sidebar drawer.
 *
 * Exported so sibling shells (e.g. DashboardShell) can provide their own
 * state while reusing AppShellSidebar / AppShellSidebarTrigger. Falls back to
 * a no-op so the parts still render (desktop-only) outside a provider.
 */
const AppShellContext = React.createContext<AppShellContextValue>({
  mobileOpen: false,
  setMobileOpen: () => {},
})

/** Read the AppShell mobile-drawer context. */
function useAppShellContext() {
  return React.useContext(AppShellContext)
}

/** Full-height application shell container with horizontal flex layout.
 *
 * Provides the mobile-drawer context consumed by AppShellSidebar and
 * AppShellSidebarTrigger. Desktop layout is unchanged from a plain flex row.
 *
 * @example
 * <AppShell><AppShellSidebar>...</AppShellSidebar><AppShellMain>...</AppShellMain></AppShell>
 */
function AppShell({
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
        data-slot="app-shell"
        className={cn("flex h-screen overflow-hidden bg-background", className)}
        {...props}
      >
        {children}
      </div>
    </AppShellContext.Provider>
  )
}

/** Props for AppShellSidebar. */
interface AppShellSidebarProps extends React.ComponentPropsWithRef<"aside"> {
  /** Whether the sidebar is in collapsed state. */
  collapsed?: boolean
  /** Accessible title for the mobile drawer (screen-reader only). */
  mobileTitle?: string
}

/** Sidebar panel: a fixed-width column on md+ screens, and an off-canvas
 * drawer on mobile.
 *
 * On mobile the sidebar is hidden and its contents are mirrored into a Sheet
 * drawer opened by AppShellSidebarTrigger. Render the trigger somewhere always
 * visible on mobile (e.g. inside your PageHeader).
 *
 * @prop collapsed - Whether the sidebar is in collapsed state.
 * @prop mobileTitle - Accessible title for the mobile drawer (screen-reader only).
 */
function AppShellSidebar({
  collapsed = false,
  mobileTitle = "Navigation",
  className,
  children,
  ref,
  ...props
}: AppShellSidebarProps) {
  const { mobileOpen, setMobileOpen } = useAppShellContext()
  void collapsed
  return (
    <>
      <aside
        ref={ref}
        data-slot="app-shell-sidebar"
        className={cn(
          "hidden md:flex flex-col w-64 shrink-0 border-e-2 bg-card",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          data-slot="app-shell-sidebar-mobile"
          className="flex w-64 flex-col p-0 md:hidden"
        >
          <SheetTitle className="sr-only">{mobileTitle}</SheetTitle>
          {children}
        </SheetContent>
      </Sheet>
    </>
  )
}

/** Hamburger button that opens the sidebar drawer on mobile. Hidden on md+.
 *
 * @example
 * <PageHeader><AppShellSidebarTrigger /><PageHeaderTitle>...</PageHeaderTitle></PageHeader>
 */
function AppShellSidebarTrigger({
  className,
  onClick,
  children,
  ref,
  ...props
}: ButtonProps) {
  const { setMobileOpen } = useAppShellContext()
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      data-slot="app-shell-sidebar-trigger"
      aria-label="Open navigation menu"
      className={cn("md:hidden", className)}
      onClick={(event) => {
        onClick?.(event)
        setMobileOpen(true)
      }}
      {...props}
    >
      {children ?? <Menu className="h-5 w-5" />}
    </Button>
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
  AppShellContext,
  useAppShellContext,
  AppShellSidebar,
  AppShellSidebarTrigger,
  AppShellLogo,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
  AppShellMain,
  type AppShellContextValue,
  type AppShellSidebarProps,
  type AppShellNavItemProps,
}
