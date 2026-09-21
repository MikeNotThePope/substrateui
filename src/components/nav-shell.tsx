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

// ─── Brand-strip context ────────────────────────────────────────────

/**
 * `true` anywhere inside a NavShellBrandStrip. Read only by the two parts
 * that would make a `navigation` landmark, so they can refuse rather than
 * make one in a banner whose whole claim is that it holds none.
 *
 * Context rather than inspecting children: a caller's own `<SiteNav />`
 * wrapper, a fragment, a map — none of those are visible to
 * `React.Children`, and all of them are visible to this.
 */
const NavShellStripContext = React.createContext(false)

/** Top-navigation application shell: a horizontal header bar over a
 * scrollable content area. The classic marketing / top-nav app layout.
 *
 * The shell is a header over a main and nothing more — the nav lives in
 * `NavShellNav`, a part you render or don't. Two header parts fill that
 * slot: `NavShellHeader`, a sticky centred band built around a nav column,
 * and `NavShellBrandStrip`, a full-bleed strip with a flush mark and no
 * navigation at all.
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

/**
 * The other header: a full-bleed brand strip with no navigation in it.
 *
 * `NavShellHeader` is not "a header" — it is a header *with a nav column*.
 * Its two elements exist for that: an outer `<header>` for the sticky band,
 * and an inner `mx-auto max-w-6xl` box so brand, nav and actions share one
 * centred measure. A brand strip wants the opposite of that inner box. The
 * mark is meant to touch the viewport edge, and nothing reaches an edge from
 * inside a centred column — so this part is one element, not two, which is
 * why it is a part and not a `variant` prop. A prop that deletes an element
 * is two components wearing one name.
 *
 * **What it is.** A `banner`: `<header>` holding the site mark and the
 * site-wide controls. HTML-AAM maps `<header>` to `banner` unless it is
 * inside an `article`, `aside`, `main`, `nav` or `section`; `NavShell` is a
 * `<div>`, so the mapping holds here exactly as it does for
 * `NavShellHeader`.
 *
 * **What it is not.** A `navigation` landmark. There is no `<nav>` and no
 * `aria-label="Primary"`, because a navigation landmark promises a list of
 * destinations and this strip has a mark and a few controls. That is not a
 * note in the docs: `NavShellNav` and `NavShellMobileNav` throw inside it.
 * Nor is it a `toolbar` — the actions are an ordinary cluster, so a sign-out
 * form and a theme toggle stay separate tab stops instead of sharing one
 * behind a roving `tabIndex`.
 *
 * **What it does not excuse.** The skip link. WCAG 2.4.1 is about repeated
 * blocks, and the actions repeat on every page; with no nav the block is
 * shorter, not absent. Render `SkipLink` as the first child of `NavShell`
 * and `NavShellMain` is already the target it looks for.
 *
 * It does not stick. A sticky bar earns its height by keeping destinations
 * within reach, and this one has no destinations, so it scrolls away with
 * the page — which is also why it can be opaque instead of a translucent
 * blur over content sliding under it.
 *
 * @example
 * <NavShell>
 *   <SkipLink />
 *   <NavShellBrandStrip>
 *     <NavShellBrand>Acme</NavShellBrand>
 *     <NavShellActions>
 *       <Button variant="ghost" size="sm">Account</Button>
 *     </NavShellActions>
 *   </NavShellBrandStrip>
 *   <NavShellMain>{children}</NavShellMain>
 * </NavShell>
 */
function NavShellBrandStrip({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"header">) {
  return (
    <NavShellStripContext.Provider value={true}>
      <header
        ref={ref}
        data-slot="nav-shell-brand-strip"
        className={cn(
          // No start padding at all: the flush mark is the point, and it is
          // the strip declining to pad rather than the brand learning a prop.
          // `pe-10` and not the header's `px-4 sm:px-6` because the actions
          // are ghost buttons whose own padding already insets their glyphs,
          // so the optical gutter is smaller than the declared one.
          "flex h-15 shrink-0 items-center justify-between gap-4 border-b-2 bg-background pe-10",
          className,
        )}
        {...props}
      />
    </NavShellStripContext.Provider>
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
  if (React.useContext(NavShellStripContext)) {
    throw new Error(
      "<NavShellNav> cannot be rendered inside <NavShellBrandStrip>. The strip is a banner that holds no navigation — that is the whole of what it claims — and a `navigation` landmark inside it would make the claim false. Use <NavShellHeader> for a header with a nav.",
    )
  }
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
  // Every hook before the throw, so the throw is not a conditional call.
  const inStrip = React.useContext(NavShellStripContext)
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])

  if (inStrip) {
    throw new Error(
      "<NavShellMobileNav> cannot be rendered inside <NavShellBrandStrip>. A hamburger that opens a drawer titled Navigation, with nothing in it to navigate to, is worse than no hamburger. Use <NavShellHeader> for a header with a nav.",
    )
  }

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

/**
 * Scrollable main content region below the header, and the target `SkipLink`
 * is looking for.
 *
 * `id="main-content"` and `tabIndex={-1}` are defaults rather than something
 * every page types out, because the pair is what makes a skip link skip.
 * Without the `tabIndex` the browser scrolls to the anchor and leaves focus
 * where it was, so the next Tab lands back in the header the reader just
 * asked to bypass — a bypass link that bypasses nothing. `-1` keeps it
 * programmatically focusable without adding a tab stop of its own, and
 * `outline-none` is because focus only ever arrives here programmatically:
 * a ring drawn around the whole page would say nothing a reader who just
 * pressed the link does not already know.
 *
 * Both are ordinary props, so a page with a different target says so:
 * `<NavShellMain id="report">` with `<SkipLink href="#report" />`.
 *
 * The `SkipLink` itself is the caller's to place, not this shell's. It has to
 * be the first focusable element in the *document*, which is a fact about the
 * document and not about the shell — this repository's own root layout
 * already renders one, and a shell that inserted a second would put two skip
 * links on every page of it.
 */
function NavShellMain({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"main">) {
  return (
    <main
      ref={ref}
      data-slot="nav-shell-main"
      id="main-content"
      tabIndex={-1}
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export {
  NavShell,
  NavShellHeader,
  NavShellBrandStrip,
  NavShellBrand,
  NavShellNav,
  NavShellNavItem,
  NavShellActions,
  NavShellMobileNav,
  NavShellMain,
  type NavShellNavItemProps,
  type NavShellMobileNavProps,
}
