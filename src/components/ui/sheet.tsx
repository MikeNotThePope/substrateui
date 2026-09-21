"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Sheet. All keys have English defaults. */
interface SheetLabels {
  close?: string
}

const defaultSheetLabels: Required<SheetLabels> = {
  close: "Close",
}

// ─── Class strings ──────────────────────────────────────────────────

/** The corner close button, drawer only: above the breakpoint there is
 *  nothing to close. */
const CLOSE_CLASS =
  "absolute end-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[open]:bg-secondary"

const TITLE_CLASS = "text-lg font-semibold text-foreground"

const DESCRIPTION_CLASS = "text-sm text-muted-foreground"

/**
 * The docked rail: a column in the page's own flow, not a layer over it.
 *
 * No `overflow` here. Whether the rail scrolls with the page or inside itself
 * depends on the layout it is dropped into, and a scroll container that is not
 * keyboard-reachable is an axe finding, so that call, and the `tabIndex={0}`
 * that has to come with it, belong to the page.
 */
const DOCK_RAIL_CLASS = "w-80 shrink-0 flex-col gap-4 bg-background p-6"

// ─── Docking ────────────────────────────────────────────────────────

/** The breakpoints `dockAt` accepts. Tailwind's own, no others. */
export type SheetDockBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

/** Tailwind v4's default min-widths, so the JS switch and the CSS switch
 *  cannot drift apart. */
const DOCK_MIN_WIDTH: Record<SheetDockBreakpoint, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
}

/**
 * Written out per breakpoint because Tailwind reads source text and
 * `` `${bp}:flex` `` is not source text.
 *
 * Two classes are all the layout needs, and neither of them is a variant
 * fighting another variant: the docked rail is `display: none` below the
 * breakpoint and the trigger is `display: none` at or above it. Everything
 * else the rail wears is unprefixed, because the rail is never on screen
 * below the breakpoint for an unprefixed utility to be wrong at, which is
 * also what lets a caller override its width with a plain `w-96`.
 */
const DOCK_CLASSES: Record<SheetDockBreakpoint, { rail: string; trigger: string }> = {
  sm: { rail: "hidden sm:flex", trigger: "sm:hidden" },
  md: { rail: "hidden md:flex", trigger: "md:hidden" },
  lg: { rail: "hidden lg:flex", trigger: "lg:hidden" },
  xl: { rail: "hidden xl:flex", trigger: "xl:hidden" },
  "2xl": { rail: "hidden 2xl:flex", trigger: "2xl:hidden" },
}

/**
 * `false` below the breakpoint, `true` at or above it, and `undefined` while
 * the answer is unknowable: on the server, and for the hydrating render that
 * has to match it.
 *
 * `useSyncExternalStore` is here for that third value rather than for the
 * subscription: React uses `getServerSnapshot` for the hydration pass too, so
 * the first client render agrees with the HTML by construction, and the real
 * width lands in the commit right after. `useMediaQuery` from `/hooks` cannot
 * stand in: it answers `false` before it has looked, and `false` here would
 * claim a dialog that may not exist.
 */
function useDocked(breakpoint: SheetDockBreakpoint): boolean | undefined {
  const query = `(min-width: ${DOCK_MIN_WIDTH[breakpoint]})`

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", onStoreChange)
      return () => list.removeEventListener("change", onStoreChange)
    },
    [query]
  )

  return React.useSyncExternalStore<boolean | undefined>(
    subscribe,
    () => window.matchMedia(query).matches,
    () => undefined
  )
}

/**
 * Base UI lets `className` and `render` be functions of the part's own state.
 * A docking Sheet renders its own elements above the breakpoint, so there is
 * no Base UI state to call them with, and calling them with an invented one
 * would hand back a class, or a whole element, for a state the component
 * was never in. Saying so beats quietly dropping it or quietly lying about
 * `transitionStatus`.
 */
function dockProp<T>(value: unknown, part: string, prop: "className" | "render"): T | undefined {
  if (typeof value === "function") {
    throw new Error(
      `${part} cannot take a function \`${prop}\` inside <Sheet dockAt>: that form is called with Base UI's state for the part, and a docked Sheet has none to give. Pass a ${prop === "className" ? "string" : "element"}, and select on \`data-docked\` for the rest.`
    )
  }
  return value as T | undefined
}

/** `className`, checked. */
function dockClassName(className: unknown, part: string): string | undefined {
  return dockProp<string>(className, part, "className")
}

interface SheetDockContextValue {
  /** Whether the drawer is open. Read only below the breakpoint. */
  open: boolean
  setOpen: (next: boolean) => void
  /** `false` = a drawer, `true` = a docked column, `undefined` = not known yet. */
  docked: boolean | undefined
  /** `docked === false`: the one state in which any of this can be a dialog. */
  asDrawer: boolean
  /** `asDrawer && open`: the one state in which any of this *is* a dialog. */
  asDialog: boolean
  classes: (typeof DOCK_CLASSES)[SheetDockBreakpoint]
  headingLevel: 2 | 3 | 4 | 5 | 6
  railId: string
  titleId: string
  /**
   * A callback ref rather than the ref object itself. React's compiler rules
   * treat an object that carries a ref as a ref, and every read of it as a
   * read during render, which is what a context value full of ids and class
   * strings must not be.
   */
  setTrigger: (element: HTMLButtonElement | null) => void
  /** Where focus goes when the drawer closes: the trigger it came from. */
  finalFocus: () => HTMLButtonElement | null
}

const SheetDockContext = React.createContext<SheetDockContextValue | null>(null)

// ─── Root ───────────────────────────────────────────────────────────

/** Props `Sheet` takes when `dockAt` is set. */
export interface DockingSheetProps {
  /**
   * The breakpoint at or above which the sheet stops being a drawer and
   * becomes a column in the page. Below it, the overlay it has always been.
   * `SheetContent` must be `side="left"` or `side="right"`.
   */
  dockAt: SheetDockBreakpoint
  /** Whether the drawer is open. Pair with `onOpenChange`. Ignored at or above the breakpoint. */
  open?: boolean
  /** Whether the drawer starts open. Ignored at or above the breakpoint. */
  defaultOpen?: boolean
  /**
   * Called with the drawer's new open state. Fires below the breakpoint, and
   * once with `false` on the way up, when docking closes an open drawer.
   */
  onOpenChange?: (open: boolean) => void
  /**
   * The heading level `SheetTitle` renders at, at both widths. Defaults to the
   * `<h2>` Base UI's dialog title already used, so crossing the breakpoint
   * does not renumber the page's outline.
   * @default 2
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  children?: React.ReactNode
}

type SheetProps =
  | (React.ComponentProps<typeof SheetPrimitive.Root> & { dockAt?: never })
  | DockingSheetProps

/**
 * Root component that manages sheet open/closed state.
 *
 * With `dockAt`, it is two components rather than one: the overlay below that
 * breakpoint, and a column that is always on screen at or above it. See
 * `DockingSheet` for what changes and why.
 *
 * @example
 * <Sheet><SheetTrigger>Open</SheetTrigger><SheetContent>…</SheetContent></Sheet>
 *
 * @example
 * <Sheet dockAt="lg"><SheetTrigger>Job details</SheetTrigger><SheetContent>…</SheetContent></Sheet>
 */
function Sheet({ dockAt, ...rest }: SheetProps) {
  if (dockAt === undefined) {
    return <SheetPrimitive.Root {...(rest as React.ComponentProps<typeof SheetPrimitive.Root>)} />
  }
  return <DockingSheet {...(rest as DockingSheetProps)} dockAt={dockAt} />
}

/**
 * The `dockAt` implementation: a modal drawer below the breakpoint, and above
 * it a rail that is simply part of the page.
 *
 * **What it reports when docked.** Nothing about a dialog. There is no
 * overlay, so nothing is covered; no scrim, so nothing is dismissed by
 * pressing one; no focus trap, because focus has nowhere to be trapped out
 * of; and no Escape, because closing is not a thing the rail can do. What is
 * left is content beside other content, which is what an `<aside>` is: a
 * `complementary` landmark, named by the same title that named the dialog.
 * The trigger goes further than hiding: it is `hidden` and `inert`, and it
 * carries neither `aria-expanded` nor `aria-controls`, because a trigger that
 * controls nothing reporting that it is collapsed is a lie a screen reader
 * reads out.
 *
 * **Layout is CSS, semantics are JavaScript, and they are allowed to disagree
 * for one commit.** Between first paint and hydration the component does not
 * know the width, so it renders the rail: it is the weaker claim of the two,
 * and it is true at either size. Which of the two is on screen is a class, so
 * the layout is right in the first frame and nothing moves when the
 * JavaScript lands.
 */
function DockingSheet({
  dockAt,
  open: openProp,
  defaultOpen,
  onOpenChange,
  headingLevel = 2,
  children,
}: DockingSheetProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen ?? false)
  const docked = useDocked(dockAt)
  const baseId = React.useId()
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const setTrigger = React.useCallback((element: HTMLButtonElement | null) => {
    triggerRef.current = element
  }, [])
  // Returning `null` tells Base UI to fall back to its own default.
  const finalFocus = React.useCallback(() => triggerRef.current, [])

  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolled

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const asDrawer = docked === false
  const asDialog = asDrawer && open

  // Docking closes the drawer. Everything that was inside it is on screen, so
  // there is nothing left for `open` to mean; and leaving it set would reopen
  // a modal on the way back down, taking focus from wherever the reader had
  // got to for a reason nothing on screen gave. A controlled caller hears
  // about it, or its `open` and this one would disagree from here on.
  //
  // Focus was inside the drawer, because the drawer was modal. The rail is
  // already mounted by the time this runs, so focus moves there rather than
  // onto the body.
  const railId = `${baseId}-rail`
  const wasDocked = React.useRef(docked)
  React.useLayoutEffect(() => {
    const previous = wasDocked.current
    wasDocked.current = docked
    if (previous !== false || docked !== true || !open) return
    setOpen(false)
    const active = document.activeElement
    if (active && active !== document.body) return
    // By id rather than by ref: the rail is already mounted in the commit
    // this runs after, the id is the one `aria-controls` already names, and
    // a ref for it would have to travel through the context, where React's
    // compiler rules, rightly, treat it as a ref read on every render.
    const rail = document.getElementById(railId)
    if (rail instanceof HTMLElement) rail.focus({ preventScroll: true })
  }, [docked, open, setOpen, railId])

  const context = React.useMemo<SheetDockContextValue>(
    () => ({
      open,
      setOpen,
      docked,
      asDrawer,
      asDialog,
      classes: DOCK_CLASSES[dockAt],
      headingLevel,
      railId,
      titleId: `${baseId}-title`,
      setTrigger,
      finalFocus,
    }),
    [open, setOpen, docked, asDrawer, asDialog, dockAt, headingLevel, baseId, railId, setTrigger, finalFocus]
  )

  return (
    <SheetDockContext.Provider value={context}>
      {/* Base UI's root is here at every width so the drawer half keeps its
          focus trap, its Escape and its scroll lock. `open` is false unless
          the width is known to be below the breakpoint, so a docked rail is
          never a closed dialog: it is not a dialog at all. */}
      <SheetPrimitive.Root open={asDialog} onOpenChange={(next) => setOpen(next)}>
        {children}
      </SheetPrimitive.Root>
    </SheetDockContext.Provider>
  )
}

// ─── Trigger ────────────────────────────────────────────────────────

/** A button or element that opens the sheet when clicked. */
function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  const dock = React.useContext(SheetDockContext)

  if (dock) {
    return (
      <DockingSheetTrigger
        {...(props as DockingSheetTriggerProps)}
        className={dockClassName(props.className, "SheetTrigger")}
        render={dockProp<React.ReactElement>(props.render, "SheetTrigger", "render")}
        dock={dock}
      />
    )
  }

  return <SheetPrimitive.Trigger {...props} />
}

type DockingSheetTriggerProps = Omit<
  React.ComponentProps<typeof SheetPrimitive.Trigger>,
  "className" | "render"
> & { className?: string; render?: React.ReactElement }

/**
 * The trigger below the breakpoint, and nothing at all above it: `hidden`,
 * `inert`, and stripped of the two attributes that would be false.
 *
 * The class is what takes it off the screen, so the layout does not wait for
 * hydration; the attributes are what take it out of the accessibility tree,
 * because a control kept away from a screen reader only by a stylesheet is a
 * control that comes back the day the stylesheet does not load.
 */
function DockingSheetTrigger({
  className,
  render,
  onClick,
  dock,
  ...props
}: DockingSheetTriggerProps & { dock: SheetDockContextValue }) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        type: "button",
        "data-slot": "sheet-trigger",
        ref: dock.setTrigger,
        className: cn(dock.classes.trigger, className),
        hidden: dock.docked === true,
        inert: dock.docked === true,
        // Three claims that are only true below the breakpoint, and are
        // therefore made only once the width is known to be below it.
        "aria-haspopup": dock.asDrawer ? "dialog" : undefined,
        "aria-expanded": dock.asDrawer ? dock.open : undefined,
        "aria-controls": dock.asDrawer ? dock.railId : undefined,
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event as never)
          if (event.defaultPrevented) return
          dock.setOpen(true)
        },
      } as useRender.ElementProps<"button">,
      props as useRender.ElementProps<"button">
    ),
  })
}

// ─── Close ──────────────────────────────────────────────────────────

/** A button or element that closes the sheet when clicked. */
function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  const dock = React.useContext(SheetDockContext)

  // Not hidden, absent. Its whole job is to close the drawer, and above the
  // breakpoint there is no drawer for it to have a job in.
  if (dock && !dock.asDialog) return null

  return <SheetPrimitive.Close {...props} />
}

/** Portals sheet content into the document body. */
const SheetPortal = SheetPrimitive.Portal

/** A semi-transparent backdrop displayed behind the sheet content. */
function SheetOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SheetPrimitive.Backdrop>) {
  return (
    <SheetPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0",
        className
      )}
      {...props}
      ref={ref}
      data-slot="sheet-overlay"
    />
  )
}

/** Sheet position variants for top/bottom/left/right sides. Use with cn(sheetVariants({...})) for non-sheet elements. */
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[open]:animate-in data-[closed]:animate-out data-[closed]:duration-300 data-[open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b-2 data-[closed]:slide-out-to-top data-[open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t-2 data-[closed]:slide-out-to-bottom data-[open]:slide-in-from-bottom",
        left: "inset-y-0 start-0 h-full w-3/4 border-e-2 data-[closed]:slide-out-to-left data-[open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 end-0 h-full w-3/4 border-s-2 data-[closed]:slide-out-to-right data-[open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithRef<typeof SheetPrimitive.Popup>,
    VariantProps<typeof sheetVariants> {}

/**
 * The sliding panel content of the sheet, rendered from a specified side.
 *
 * @example
 * <Sheet>
 *   <SheetTrigger>Open</SheetTrigger>
 *   <SheetContent side="right">Content here</SheetContent>
 * </Sheet>
 *
 * @prop side - Which edge the sheet slides in from (top, bottom, left, right).
 */
function SheetContent({
  side = "right",
  className,
  children,
  labels: labelsProp,
  ref,
  ...props
}: SheetContentProps & { labels?: SheetLabels }) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultSheetLabels, ctx.sheet, labelsProp)
  const dock = React.useContext(SheetDockContext)

  if (dock) {
    return (
      <DockingSheetContent
        {...props}
        side={side}
        className={dockClassName(className, "SheetContent")}
        closeLabel={labels.close}
        dock={dock}
      >
        {children}
      </DockingSheetContent>
    )
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        ref={ref}
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className={CLOSE_CLASS}>
          <X className="h-4 w-4" />
          <span className="sr-only">{labels.close}</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

/**
 * One panel with two forms. They are not the same element and cannot be: the
 * drawer is a dialog in a portal, over a scrim, with the rest of the document
 * inert; the rail is a column in the flow, beside the content it belongs to.
 * That is two places in the tree, so crossing the breakpoint remounts what is
 * inside, the one thing this gives up that `Tabs unstackAt` did not.
 *
 * The rail is rendered whenever the drawer is not: at every width before the
 * width is known, and below the breakpoint while the drawer is closed. Which
 * means `aria-controls` on the trigger points at an element that is really in
 * the document, which it could not while the panel only existed once opened.
 * While it is closed, `hidden` and `inert` say so in the document rather than
 * only in the stylesheet.
 */
function DockingSheetContent({
  side,
  className,
  children,
  closeLabel,
  dock,
  ...props
}: Omit<SheetContentProps, "className" | "labels"> & {
  className?: string
  closeLabel: string
  dock: SheetDockContextValue
}) {
  if (side !== "left" && side !== "right") {
    throw new Error(
      `<Sheet dockAt> needs <SheetContent side="left"> or side="right", not side="${side}". Docking turns the sheet into a column beside the page's content; a top or bottom sheet has no column to become.`
    )
  }

  if (dock.asDialog) {
    return (
      <SheetPortal>
        {/* The wash the rail earned in lavahire: `bg-background/80` fades the
            page rather than dimming it to black, which is what a rail that is
            a column one breakpoint up should do to the column it covers. */}
        <SheetOverlay className="bg-background/80" />
        <SheetPrimitive.Popup
          id={dock.railId}
          data-slot="sheet-content"
          data-docked="false"
          className={cn(sheetVariants({ side }), className)}
          finalFocus={dock.finalFocus}
          {...props}
        >
          {children}
          <SheetPrimitive.Close className={CLOSE_CLASS}>
            <X className="h-4 w-4" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        </SheetPrimitive.Popup>
      </SheetPortal>
    )
  }

  return (
    <aside
      id={dock.railId}
      data-slot="sheet-content"
      data-docked={dock.docked === undefined ? "unknown" : String(dock.docked)}
      // Named by its title, which is what keeps it a `complementary` landmark
      // even when the page nests it inside another sectioning element.
      aria-labelledby={dock.titleId}
      // Focusable but not in the tab order, so focus has somewhere to land
      // when the drawer it was in docks.
      tabIndex={-1}
      hidden={dock.docked === false}
      inert={dock.docked === false}
      className={cn(DOCK_RAIL_CLASS, side === "left" ? "border-e-2" : "border-s-2", dock.classes.rail, className)}
      {...(props as React.ComponentPropsWithRef<"aside">)}
    >
      {children}
    </aside>
  )
}

/** A layout container for the sheet's title and description at the top. */
function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-start",
        className
      )}
      {...props}
    />
  )
}

/** A layout container for action buttons at the bottom of the sheet. */
function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

/** The accessible title heading for the sheet. */
function SheetTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SheetPrimitive.Title>) {
  const dock = React.useContext(SheetDockContext)

  if (dock) {
    const Heading = `h${dock.headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6"
    const shared = {
      id: dock.titleId,
      "data-slot": "sheet-title",
      className: cn(TITLE_CLASS, dockClassName(className, "SheetTitle")),
    }

    // In the drawer it is still Base UI's title, so the dialog is named the
    // way Base UI names dialogs. `render` is what keeps the element the same
    // heading at both widths: a title that is an `<h2>` in the drawer and an
    // `<h3>` in the rail renumbers the page's outline at a breakpoint.
    if (dock.asDialog) {
      return (
        <SheetPrimitive.Title
          ref={ref}
          render={<Heading />}
          {...shared}
          {...(props as React.ComponentPropsWithRef<typeof SheetPrimitive.Title>)}
        />
      )
    }

    return <Heading {...shared} {...(props as React.ComponentPropsWithRef<"h2">)} />
  }

  return (
    <SheetPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn(TITLE_CLASS, className)}
      {...props}
    />
  )
}

/** An accessible description for the sheet content. */
function SheetDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SheetPrimitive.Description>) {
  const dock = React.useContext(SheetDockContext)

  // A dialog is announced with its description when it opens. A landmark is
  // not announced at all, so the docked rail does not claim one: the text is
  // simply the first thing in the rail, and is read where it sits.
  if (dock && !dock.asDialog) {
    return (
      <p
        data-slot="sheet-description"
        className={cn(DESCRIPTION_CLASS, dockClassName(className, "SheetDescription"))}
        {...(props as React.ComponentPropsWithRef<"p">)}
      />
    )
  }

  return (
    <SheetPrimitive.Description
      ref={ref}
      data-slot="sheet-description"
      className={cn(DESCRIPTION_CLASS, className)}
      {...props}
    />
  )
}

export {
  type SheetLabels,
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
