"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { useDirection } from "@base-ui/react/direction-provider"

import { cn } from "@/lib/utils"

// ─── Class strings ───────────────────────────────────────────────────
//
// Split rather than inlined because `unstackAt` needs the resting look and
// the selected look to answer to different breakpoint ranges. See
// UNSTACK_CLASSES below for why the selected look is the only part that has
// to be range-scoped.

const LIST_CLASS =
  "inline-flex h-10 items-center justify-center rounded-lg bg-surface-sunken border-2 p-1 text-muted-foreground"

const TRIGGER_CLASS =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all active:translate-y-[1.5px] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

/** What a selected tab looks like: a raised pill out of the sunken track. */
const TRIGGER_SELECTED_CLASS =
  "data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow-sm"

const CONTENT_CLASS =
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

// ─── Unstacking ──────────────────────────────────────────────────────

/** The breakpoints `unstackAt` accepts. Tailwind's own, no others. */
export type TabsUnstackBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl"

/** Tailwind v4's default min-widths, so the JS switch and the CSS switch
 *  cannot drift apart. */
const UNSTACK_MIN_WIDTH: Record<TabsUnstackBreakpoint, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
}

/**
 * Every class the unstacked layout needs, written out per breakpoint because
 * Tailwind reads source text and `` `${bp}:grid` `` is not source text.
 *
 * The layout is one grid on the root. `list` is `display: contents`, so the
 * triggers become grid items of the root alongside the panes; `row-start-1`
 * on every trigger and `row-start-2` on every pane then hands the columns to
 * auto-placement, which fills each row in document order. That is why nothing
 * here counts the panes: the grid grows a column per item and
 * `auto-cols-fr` makes them equal. One grid, so a label sits over its own
 * pane without two grids being kept in step.
 *
 * `selected` is the one thing scoped to *below* the breakpoint rather than
 * above it. Every other override is a plain breakpoint variant beating an
 * unprefixed base utility, which Tailwind orders for us. `bg-transparent`
 * against `data-[active]:bg-background` is a variant against a variant, and
 * that is a cascade argument rather than an override — so the pill is only
 * ever emitted for the range that wants it.
 */
const UNSTACK_CLASSES: Record<
  TabsUnstackBreakpoint,
  { root: string; list: string; trigger: string; selected: string; content: string; hidden: string }
> = {
  sm: {
    root: "sm:grid sm:auto-cols-fr sm:items-start sm:gap-x-6 sm:gap-y-2",
    list: "sm:contents",
    trigger:
      "sm:row-start-1 sm:h-auto sm:justify-start sm:rounded-none sm:border-b-2 sm:bg-transparent sm:p-0 sm:pb-2 sm:text-base sm:font-semibold sm:text-foreground sm:shadow-none",
    selected: "max-sm:data-[active]:bg-background data-[active]:text-foreground max-sm:data-[active]:shadow-sm",
    content: "sm:row-start-2 sm:mt-0",
    hidden: "hidden sm:block",
  },
  md: {
    root: "md:grid md:auto-cols-fr md:items-start md:gap-x-6 md:gap-y-2",
    list: "md:contents",
    trigger:
      "md:row-start-1 md:h-auto md:justify-start md:rounded-none md:border-b-2 md:bg-transparent md:p-0 md:pb-2 md:text-base md:font-semibold md:text-foreground md:shadow-none",
    selected: "max-md:data-[active]:bg-background data-[active]:text-foreground max-md:data-[active]:shadow-sm",
    content: "md:row-start-2 md:mt-0",
    hidden: "hidden md:block",
  },
  lg: {
    root: "lg:grid lg:auto-cols-fr lg:items-start lg:gap-x-6 lg:gap-y-2",
    list: "lg:contents",
    trigger:
      "lg:row-start-1 lg:h-auto lg:justify-start lg:rounded-none lg:border-b-2 lg:bg-transparent lg:p-0 lg:pb-2 lg:text-base lg:font-semibold lg:text-foreground lg:shadow-none",
    selected: "max-lg:data-[active]:bg-background data-[active]:text-foreground max-lg:data-[active]:shadow-sm",
    content: "lg:row-start-2 lg:mt-0",
    hidden: "hidden lg:block",
  },
  xl: {
    root: "xl:grid xl:auto-cols-fr xl:items-start xl:gap-x-6 xl:gap-y-2",
    list: "xl:contents",
    trigger:
      "xl:row-start-1 xl:h-auto xl:justify-start xl:rounded-none xl:border-b-2 xl:bg-transparent xl:p-0 xl:pb-2 xl:text-base xl:font-semibold xl:text-foreground xl:shadow-none",
    selected: "max-xl:data-[active]:bg-background data-[active]:text-foreground max-xl:data-[active]:shadow-sm",
    content: "xl:row-start-2 xl:mt-0",
    hidden: "hidden xl:block",
  },
  "2xl": {
    root: "2xl:grid 2xl:auto-cols-fr 2xl:items-start 2xl:gap-x-6 2xl:gap-y-2",
    list: "2xl:contents",
    trigger:
      "2xl:row-start-1 2xl:h-auto 2xl:justify-start 2xl:rounded-none 2xl:border-b-2 2xl:bg-transparent 2xl:p-0 2xl:pb-2 2xl:text-base 2xl:font-semibold 2xl:text-foreground 2xl:shadow-none",
    selected:
      "max-2xl:data-[active]:bg-background data-[active]:text-foreground max-2xl:data-[active]:shadow-sm",
    content: "2xl:row-start-2 2xl:mt-0",
    hidden: "hidden 2xl:block",
  },
}

/**
 * `false` below the breakpoint, `true` at or above it, and `undefined` while
 * the answer is unknowable — on the server, and for the hydrating render that
 * has to match it.
 *
 * `useSyncExternalStore` is here for that third value rather than for the
 * subscription: React uses `getServerSnapshot` for the hydration pass too, so
 * the first client render agrees with the HTML by construction, and the real
 * width lands in the commit right after.
 */
function useUnstacked(breakpoint: TabsUnstackBreakpoint): boolean | undefined {
  const query = `(min-width: ${UNSTACK_MIN_WIDTH[breakpoint]})`

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
 * Turns a tab value into an id fragment. Injective: every character outside
 * `[A-Za-z0-9]` — the `-` it escapes with included — becomes `-<code36>-`, so
 * two different values cannot land on the same id and hand two panes the same
 * name.
 */
function idFragment(value: string): string {
  return value.replace(/[^A-Za-z0-9]/g, (char) => `-${char.charCodeAt(0).toString(36)}-`)
}

/**
 * Base UI lets `className` be a function of the part's own state. An
 * unstacking Tabs renders its own elements, so there is no Base UI state to
 * call it with, and calling it with an invented one would hand back classes
 * for a state the component was never in. Saying so beats quietly dropping
 * the class or quietly lying about `transitionStatus`.
 */
function unstackClassName(className: unknown, part: string): string | undefined {
  if (typeof className === "function") {
    throw new Error(
      `${part} cannot take a function \`className\` inside <Tabs unstackAt>: that form is called with Base UI's state for the part, and an unstacking Tabs has none to give. Pass a string, and select on \`data-active\` or \`data-unstacked\` for the rest.`
    )
  }
  return className as string | undefined
}

interface TabsUnstackContextValue {
  value: string
  select: (next: string) => void
  /** `false` = the tabs pattern, `true` = separate regions, `undefined` = not known yet. */
  unstacked: boolean | undefined
  /** `unstacked === false`: the one state in which any of this is a tablist. */
  asTabs: boolean
  classes: (typeof UNSTACK_CLASSES)[TabsUnstackBreakpoint]
  headingLevel: 2 | 3 | 4 | 5 | 6
  baseId: string
}

const TabsUnstackContext = React.createContext<TabsUnstackContextValue | null>(null)

// ─── Root ────────────────────────────────────────────────────────────

/** Props `Tabs` takes when `unstackAt` is set. */
export interface UnstackingTabsProps {
  /**
   * The breakpoint at or above which the panes stop being tabs and become
   * side-by-side regions. Below it, the APG tabs pattern.
   */
  unstackAt: TabsUnstackBreakpoint
  /** The active pane's value. Pair with `onValueChange`. */
  value?: string
  /** The pane to open on. Required unless `value` is given. */
  defaultValue?: string
  /** Called with the value of the pane that was picked. Only fires below the breakpoint. */
  onValueChange?: (value: string) => void
  /**
   * The heading level each label becomes above the breakpoint. Only the page
   * knows its own outline, so this has no safe default beyond a guess.
   * @default 3
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  className?: string
  children?: React.ReactNode
}

type TabsProps =
  | (React.ComponentPropsWithRef<typeof TabsPrimitive.Root> & { unstackAt?: never })
  | UnstackingTabsProps

/**
 * Root container for a tabbed interface built on Base UI Tabs.
 *
 * With `unstackAt`, it is two components rather than one: the tabs pattern
 * below that breakpoint, and a set of side-by-side regions at or above it.
 * See `UnstackingTabs` for what changes and why it cannot be done in CSS.
 *
 * @example
 * <Tabs defaultValue="tab1"><TabsList><TabsTrigger value="tab1">Tab</TabsTrigger></TabsList><TabsContent value="tab1">Content</TabsContent></Tabs>
 *
 * @example
 * <Tabs defaultValue="resume" unstackAt="lg">…</Tabs>
 */
function Tabs({ unstackAt, ...rest }: TabsProps) {
  if (unstackAt === undefined) {
    return (
      <TabsPrimitive.Root
        data-slot="tabs"
        {...(rest as React.ComponentPropsWithRef<typeof TabsPrimitive.Root>)}
      />
    )
  }
  return <UnstackingTabs {...(rest as UnstackingTabsProps)} unstackAt={unstackAt} />
}

/**
 * The `unstackAt` implementation: an APG tablist below the breakpoint, and
 * above it a set of regions with no tablist at all.
 *
 * **Why the switch is in JavaScript.** The issue that asked for this
 * (MikeNotThePope/substrateui#123) names `TabsPanel`'s `hidden` attribute as
 * the blocker. It is not the blocker: the UA rule behind `hidden` is
 * `[hidden] { display: none }`, and any author class outranks it by origin —
 * Base UI's own Tailwind demo relies on that, which is why its panel carries
 * `[[hidden]]:hidden` to put the hiding back. Two things below it are the
 * real blocker. Base UI marks a closed panel `inert`, which no class undoes;
 * and one level up from either, `role` is not a property, so no breakpoint
 * can change what an element claims to be.
 *
 * **What it claims above the breakpoint.** Nothing about tabs. A `tablist`
 * whose panels are all on screen describes a control that is not there: there
 * is no selection to announce, no `aria-selected` that means anything, and
 * `aria-controls` points at something already visible. So above the
 * breakpoint the tablist is gone from the DOM, each label is a heading, and
 * each pane is a `region` named by that heading — the same element that named
 * it as a `tabpanel`, by the same `aria-labelledby`. That is the honest
 * reading of two panes side by side: two pieces of content, each with a name.
 *
 * **Layout is CSS, semantics are JavaScript, and they are allowed to
 * disagree for one commit.** Between first paint and hydration the component
 * does not know the width, so it renders the regions markup: it is the weaker
 * claim of the two, and it is true at either size. Below the breakpoint that
 * leaves headings naming panes CSS has not revealed yet, for the same window
 * in which no tab would have responded to a click either. The layout never
 * waits, so nothing moves.
 */
function UnstackingTabs({
  unstackAt,
  value,
  defaultValue,
  onValueChange,
  headingLevel = 3,
  className,
  children,
}: UnstackingTabsProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? "")
  const unstacked = useUnstacked(unstackAt)
  const baseId = React.useId()

  const isControlled = value !== undefined
  const activeValue = isControlled ? value : uncontrolled

  const select = React.useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const asTabs = unstacked === false

  const context = React.useMemo<TabsUnstackContextValue>(
    () => ({
      value: activeValue,
      select,
      unstacked,
      asTabs,
      classes: UNSTACK_CLASSES[unstackAt],
      headingLevel,
      baseId,
    }),
    [activeValue, select, unstacked, asTabs, unstackAt, headingLevel, baseId]
  )

  if (value === undefined && defaultValue === undefined) {
    throw new Error(
      "<Tabs unstackAt> needs a `value` or a `defaultValue`. Above the breakpoint every pane is shown, so nothing on screen would say which one was meant to open below it."
    )
  }

  return (
    <TabsUnstackContext.Provider value={context}>
      <div
        data-slot="tabs"
        data-unstacked={unstacked === undefined ? "unknown" : String(unstacked)}
        className={cn(UNSTACK_CLASSES[unstackAt].root, className)}
      >
        {children}
      </div>
    </TabsUnstackContext.Provider>
  )
}

// ─── List ────────────────────────────────────────────────────────────

/** Horizontal container for tab triggers with a sunken background. */
function TabsList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.List>) {
  const context = React.useContext(TabsUnstackContext)

  if (context) {
    return (
      <UnstackingTabsList
        className={unstackClassName(className, "TabsList")}
        context={context}
        {...props}
      />
    )
  }

  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(LIST_CLASS, className)}
      {...props}
    />
  )
}

/**
 * The tab strip below the breakpoint; `display: contents` above it, where its
 * children become the headings of the grid's first row and the box itself —
 * the sunken track — stops existing.
 */
function UnstackingTabsList({
  className,
  context,
  activateOnFocus = false,
  loopFocus = true,
  onKeyDown,
  ...props
}: {
  className?: string
  context: TabsUnstackContextValue
} & Omit<React.ComponentPropsWithRef<typeof TabsPrimitive.List>, "className">) {
  const direction = useDirection()

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event as never)
    if (!context.asTabs || event.defaultPrevented) return
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    )
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement)
    if (tabs.length === 0 || current === -1) return

    // ArrowRight means "the next one along", which is leftwards in RTL. The
    // key's name is physical; the movement is not.
    const forward = event.key === (direction === "rtl" ? "ArrowLeft" : "ArrowRight")

    let next: number
    if (event.key === "Home") {
      next = 0
    } else if (event.key === "End") {
      next = tabs.length - 1
    } else {
      next = current + (forward ? 1 : -1)
      if (next < 0) next = loopFocus ? tabs.length - 1 : 0
      if (next > tabs.length - 1) next = loopFocus ? 0 : tabs.length - 1
    }

    event.preventDefault()
    tabs[next].focus()
    if (activateOnFocus) {
      const nextValue = tabs[next].dataset.value
      if (nextValue !== undefined) context.select(nextValue)
    }
  }

  return (
    <div
      data-slot="tabs-list"
      // A tablist with every panel on screen is a control that isn't there.
      role={context.asTabs ? "tablist" : undefined}
      className={cn(LIST_CLASS, context.classes.list, className)}
      onKeyDown={handleKeyDown}
      {...(props as React.ComponentPropsWithRef<"div">)}
    />
  )
}

// ─── Trigger ─────────────────────────────────────────────────────────

/** Individual tab button that activates its associated content panel. */
function TabsTrigger({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Tab>) {
  const context = React.useContext(TabsUnstackContext)

  if (context) {
    return (
      <UnstackingTabsTrigger
        className={unstackClassName(className, "TabsTrigger")}
        context={context}
        {...props}
      />
    )
  }

  return (
    <TabsPrimitive.Tab
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(TRIGGER_CLASS, TRIGGER_SELECTED_CLASS, className)}
      {...props}
    />
  )
}

/**
 * A `tab` below the breakpoint and a heading above it. The element changes
 * because what it does changes: there is nothing left to press once its pane
 * is already on screen. Its `id` does not change, so the pane it names keeps
 * the same `aria-labelledby` either way.
 */
function UnstackingTabsTrigger({
  className,
  context,
  value,
  disabled,
  children,
  onClick,
  ...props
}: {
  className?: string
  context: TabsUnstackContextValue
} & Omit<React.ComponentPropsWithRef<typeof TabsPrimitive.Tab>, "className" | "value"> & {
    value: string
  }) {
  const isActive = context.value === value
  const tabId = `${context.baseId}-tab-${idFragment(value)}`
  const panelId = `${context.baseId}-panel-${idFragment(value)}`

  const shared = {
    id: tabId,
    "data-slot": "tabs-trigger",
    "data-value": value,
    "data-active": isActive ? "" : undefined,
    className: cn(TRIGGER_CLASS, context.classes.selected, context.classes.trigger, className),
  }

  if (!context.asTabs) {
    const Heading = `h${context.headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6"
    return <Heading {...shared}>{children}</Heading>
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={panelId}
      // Roving: one tab stop for the whole strip, arrows for the rest.
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event as never)
        if (event.defaultPrevented) return
        context.select(value)
      }}
      {...shared}
      {...(props as React.ComponentPropsWithRef<"button">)}
    >
      {children}
    </button>
  )
}

// ─── Content ─────────────────────────────────────────────────────────

/** Content panel displayed when its matching tab trigger is active. */
function TabsContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Panel>) {
  const context = React.useContext(TabsUnstackContext)

  if (context) {
    return (
      <UnstackingTabsContent
        className={unstackClassName(className, "TabsContent")}
        context={context}
        {...props}
      />
    )
  }

  return (
    <TabsPrimitive.Panel
      ref={ref}
      data-slot="tabs-content"
      className={cn(CONTENT_CLASS, className)}
      {...props}
    />
  )
}

/**
 * One `<div>` in both states, so crossing the breakpoint changes attributes
 * rather than remounting: whatever is inside a pane — a half-typed note, a
 * scroll position — survives a rotation.
 *
 * Every pane stays mounted at every width, and an inactive one is hidden
 * twice over. The class is the part that answers to the breakpoint, so the
 * layout is right from first paint without waiting for JavaScript. `hidden`
 * and `inert` are the part that only goes on once the width is known to be
 * below the breakpoint: a pane kept out of the accessibility tree by a
 * stylesheet is a pane that comes back the moment the stylesheet does not
 * load, and `display: none` is not a claim a document should have to make in
 * CSS to be true.
 */
function UnstackingTabsContent({
  className,
  context,
  value,
  children,
  ...props
}: {
  className?: string
  context: TabsUnstackContextValue
} & Omit<React.ComponentPropsWithRef<typeof TabsPrimitive.Panel>, "className" | "value"> & {
    value: string
  }) {
  const isActive = context.value === value
  const tabId = `${context.baseId}-tab-${idFragment(value)}`
  const panelId = `${context.baseId}-panel-${idFragment(value)}`

  return (
    <div
      id={panelId}
      data-slot="tabs-content"
      role={context.asTabs ? "tabpanel" : "region"}
      aria-labelledby={tabId}
      tabIndex={context.asTabs ? (isActive ? 0 : -1) : undefined}
      hidden={context.asTabs && !isActive}
      inert={context.asTabs && !isActive}
      className={cn(
        CONTENT_CLASS,
        context.classes.content,
        !isActive && context.classes.hidden,
        className
      )}
      {...(props as React.ComponentPropsWithRef<"div">)}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
