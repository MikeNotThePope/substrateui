"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// ─── Mobile drawer context ──────────────────────────────────────────

/** Lets NavShellNavItem close the mobile drawer when a link is followed. */
const NavShellMobileContext = React.createContext<{ close: () => void }>({
  close: () => {},
})

/** Top-navigation application shell: a horizontal header bar over a
 * scrollable content area. The classic marketing / top-nav app layout.
 *
 * @example
 * <NavShell>
 *   <NavShellHeader>
 *     <NavShellBrand>Acme</NavShellBrand>
 *     <NavShellNav>
 *       <NavShellNavItem active href="/">Home</NavShellNavItem>
 *       <NavShellNavItem href="/pricing">Pricing</NavShellNavItem>
 *     </NavShellNav>
 *     <NavShellActions>
 *       <NavShellMobileNav>
 *         <NavShellNavItem active href="/">Home</NavShellNavItem>
 *         <NavShellNavItem href="/pricing">Pricing</NavShellNavItem>
 *       </NavShellMobileNav>
 *       <Button size="sm">Sign in</Button>
 *     </NavShellActions>
 *   </NavShellHeader>
 *   <NavShellMain>{children}</NavShellMain>
 * </NavShell>
 */
function NavShell({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="nav-shell"
      className={cn("flex min-h-screen flex-col bg-background", className)}
      {...props}
    />
  )
}

/** Sticky top bar. Lays brand, nav, and actions out in a spaced flex row. */
function NavShellHeader({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"header">) {
  return (
    <header
      ref={ref}
      data-slot="nav-shell-header"
      className={cn(
        "sticky top-0 z-40 h-14 shrink-0 border-b-2 bg-card/90 backdrop-blur",
        className,
      )}
    >
      <div
        className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        {...props}
      />
    </header>
  )
}

/** Brand / logo area at the start of the header. */
function NavShellBrand({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="nav-shell-brand"
      className={cn(
        "flex items-center gap-2 text-lg font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

/** Horizontal navigation region, shown inline on md+ and hidden on mobile
 * (use NavShellMobileNav for the mobile drawer). */
function NavShellNav({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"nav">) {
  return (
    <nav
      ref={ref}
      data-slot="nav-shell-nav"
      aria-label="Primary"
      className={cn("hidden items-center gap-1 md:flex", className)}
      {...props}
    />
  )
}

/** Props for NavShellNavItem including optional icon and active state. */
interface NavShellNavItemProps extends React.ComponentPropsWithRef<"a"> {
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
}

/** Navigation link styled to work both inline (header) and stacked (drawer).
 * Closes the mobile drawer on click when rendered inside NavShellMobileNav.
 *
 * @prop icon - Optional icon component rendered before the label.
 * @prop active - Whether this item represents the current page.
 */
function NavShellNavItem({
  icon: Icon,
  active = false,
  className,
  children,
  onClick,
  ref,
  ...props
}: NavShellNavItemProps) {
  const { close } = React.useContext(NavShellMobileContext)
  return (
    <a
      ref={ref}
      data-slot="nav-shell-nav-item"
      data-active={active || undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors active:translate-y-[1.5px] transition-transform",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-surface-interactive hover:text-foreground",
        className,
      )}
      onClick={(event) => {
        onClick?.(event)
        close()
      }}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </a>
  )
}

/** Right-aligned cluster for actions (buttons, avatar, mobile trigger). */
function NavShellActions({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="nav-shell-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/** Props for NavShellMobileNav. */
interface NavShellMobileNavProps extends React.ComponentPropsWithRef<"nav"> {
  /** Accessible title shown at the top of the drawer. */
  title?: string
  /** Accessible label for the hamburger trigger button. */
  triggerLabel?: string
}

/** Self-contained hamburger button + off-canvas drawer for mobile. Hidden on
 * md+. Pass the same NavShellNavItem links as children; they close the drawer
 * automatically when clicked.
 *
 * @prop title - Accessible title shown at the top of the drawer.
 * @prop triggerLabel - Accessible label for the hamburger trigger button.
 */
function NavShellMobileNav({
  title = "Navigation",
  triggerLabel = "Open navigation menu",
  className,
  children,
  ref,
  ...props
}: NavShellMobileNavProps) {
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={triggerLabel}
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side="left"
        data-slot="nav-shell-mobile"
        className="flex w-[280px] flex-col p-0 md:hidden"
      >
        <SheetTitle className="px-6 pt-6 text-lg font-bold tracking-tight">
          {title}
        </SheetTitle>
        <nav
          ref={ref}
          aria-label="Primary"
          className={cn("flex flex-col gap-1 px-3 py-6", className)}
          {...props}
        >
          <NavShellMobileContext.Provider value={{ close }}>
            {children}
          </NavShellMobileContext.Provider>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

/** Scrollable main content region below the header. */
function NavShellMain({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"main">) {
  return (
    <main
      ref={ref}
      data-slot="nav-shell-main"
      className={cn("flex-1", className)}
      {...props}
    />
  )
}

export {
  NavShell,
  NavShellHeader,
  NavShellBrand,
  NavShellNav,
  NavShellNavItem,
  NavShellActions,
  NavShellMobileNav,
  NavShellMain,
  type NavShellNavItemProps,
  type NavShellMobileNavProps,
}
