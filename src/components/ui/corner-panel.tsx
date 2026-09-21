"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FocusTrap } from "@/components/ui/focus-trap"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by CornerPanel. All keys have English defaults. */
interface CornerPanelLabels {
  close?: string
}

const defaultCornerPanelLabels: Required<CornerPanelLabels> = {
  close: "Close",
}

// ─── Context ─────────────────────────────────────────────────────────

interface CornerPanelContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  /** Ties the panel, and the scrolling body, to the title. */
  titleId: string
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const CornerPanelContext = React.createContext<CornerPanelContextValue | null>(null)

function useCornerPanel(part: string): CornerPanelContextValue {
  const context = React.useContext(CornerPanelContext)
  if (!context) {
    throw new Error(`${part} must be used within a <CornerPanel>.`)
  }
  return context
}

// ─── Root ────────────────────────────────────────────────────────────

/** Props for the CornerPanel root. */
export interface CornerPanelProps {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean
  /** Open state for the first render when uncontrolled. */
  defaultOpen?: boolean
  /** Called with the state the panel wants to be in. */
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

/**
 * A round launcher pinned to the bottom corner that swaps for a panel: a
 * full-width bottom sheet on a phone, a 380px card in the corner from `md` up.
 * The shape behind a chat widget, an inbox, an account switcher — three
 * hand-rolled copies of it in one application
 * (MikeNotThePope/substrateui#123).
 *
 * The behaviour it exists to stop people re-earning:
 *
 * - **Escape closes it from anywhere inside**, because the panel listens on
 *   itself rather than on the one control that happened to have focus.
 * - **Focus moves in and comes back.** The launcher is unmounted while the
 *   panel is open — that is the swap — so nothing can return focus to it until
 *   React has put it back. The copies reached for `flushSync` to force that
 *   ordering; here an effect does it, which is what effects are for.
 * - **Focus is trapped while open.** None of the three copies trapped it. A
 *   panel a Tab can wander out of, leaving a dialog open behind it, is a
 *   keyboard user stranded.
 * - **The scrolling body is a named, focusable region**, so a keyboard can
 *   scroll it. A scroll container nothing can focus is content a keyboard
 *   cannot read, which is the axe finding the copies each fixed separately.
 *
 * It is deliberately **not** modal: nothing behind it is inert and there is no
 * backdrop. A support widget that blanks the page it is meant to help with is
 * the wrong trade. Reach for `Dialog` or `Sheet` when the rest of the page
 * genuinely must wait.
 *
 * @example
 * <CornerPanel>
 *   <CornerPanelTrigger aria-label="Open chat"><MessageCircle /></CornerPanelTrigger>
 *   <CornerPanelContent>
 *     <CornerPanelHeader actions={<CornerPanelClose />}>
 *       <CornerPanelTitle>Chat</CornerPanelTitle>
 *     </CornerPanelHeader>
 *     <CornerPanelBody>{messages}</CornerPanelBody>
 *     <CornerPanelFooter>{composer}</CornerPanelFooter>
 *   </CornerPanelContent>
 * </CornerPanel>
 *
 * @prop open - Controlled open state.
 * @prop defaultOpen - Open state for the first render when uncontrolled.
 * @prop onOpenChange - Called with the state the panel wants to be in.
 */
function CornerPanel({ open, defaultOpen = false, onOpenChange, children }: CornerPanelProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolled

  const titleId = React.useId()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  // Return focus to the launcher once it is back in the document. FocusTrap's
  // own `restoreFocus` cannot do it: its cleanup runs while the launcher is
  // still unmounted, so it would be focusing a detached node. This effect runs
  // after the commit that remounts it, which is the ordering the copies bought
  // with `flushSync`.
  const wasOpen = React.useRef(isOpen)
  React.useEffect(() => {
    if (wasOpen.current && !isOpen) triggerRef.current?.focus()
    wasOpen.current = isOpen
  }, [isOpen])

  const value = React.useMemo<CornerPanelContextValue>(
    () => ({ open: isOpen, setOpen, titleId, triggerRef }),
    [isOpen, setOpen, titleId]
  )

  return <CornerPanelContext.Provider value={value}>{children}</CornerPanelContext.Provider>
}

// ─── Trigger ─────────────────────────────────────────────────────────

/** Props for the CornerPanelTrigger. */
export type CornerPanelTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof Button>,
  "size"
>

/**
 * The round launcher. Fixed to the bottom end corner, and rendered only while
 * the panel is closed — the swap is the whole idea.
 *
 * It is icon-only, so give it an `aria-label`.
 *
 * @example
 * <CornerPanelTrigger aria-label="Open chat"><MessageCircle /></CornerPanelTrigger>
 */
function CornerPanelTrigger({
  className,
  onClick,
  ref,
  ...props
}: CornerPanelTriggerProps) {
  const { open, setOpen, triggerRef } = useCornerPanel("CornerPanelTrigger")

  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref, triggerRef]
  )

  if (open) return null

  return (
    <Button
      ref={setRefs}
      type="button"
      size="icon"
      data-slot="corner-panel-trigger"
      className={cn(
        "fixed bottom-5 end-5 z-50 h-14 w-14 rounded-full [&_svg]:size-6",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(true)
      }}
      {...props}
    />
  )
}

// ─── Content ─────────────────────────────────────────────────────────

/** Props for the CornerPanelContent. */
export type CornerPanelContentProps = React.ComponentPropsWithoutRef<"div">

/**
 * The panel itself: a `role="dialog"` that fills the bottom of a phone screen
 * and sits as a card in the corner from `md` up. Owns the focus trap and the
 * Escape handler.
 *
 * Named by {@link CornerPanelTitle}, so render one — or pass an `aria-label` of
 * your own.
 */
function CornerPanelContent({
  className,
  children,
  onKeyDown,
  ...props
}: CornerPanelContentProps) {
  const { open, setOpen, titleId } = useCornerPanel("CornerPanelContent")

  if (!open) return null

  return (
    // `restoreFocus={false}`: the root's own effect returns focus to the
    // launcher, which does not exist at the moment this trap tears down.
    <FocusTrap
      restoreFocus={false}
      data-slot="corner-panel"
      role="dialog"
      aria-modal={false}
      aria-labelledby={props["aria-label"] ? undefined : titleId}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col overflow-hidden rounded-t-lg border-2 border-border bg-background shadow-hard",
        "md:inset-x-auto md:bottom-5 md:end-5 md:h-[600px] md:max-h-[calc(100vh-2.5rem)] md:w-[380px] md:rounded-lg",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4",
        className
      )}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key !== "Escape") return
        // Anywhere inside: the event bubbles here from whatever had focus.
        event.stopPropagation()
        setOpen(false)
      }}
      {...props}
    >
      {children}
    </FocusTrap>
  )
}

// ─── Header ──────────────────────────────────────────────────────────

/** Props for the CornerPanelHeader. */
export interface CornerPanelHeaderProps extends React.ComponentPropsWithRef<"div"> {
  /** Controls pinned to the end of the row — Refresh, {@link CornerPanelClose}. */
  actions?: React.ReactNode
}

/** The title row: the title at the start, `actions` at the end. */
function CornerPanelHeader({
  className,
  children,
  actions,
  ref,
  ...props
}: CornerPanelHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="corner-panel-header"
      className={cn(
        "flex shrink-0 items-center justify-between gap-2 border-b-2 border-border bg-surface-raised px-4 py-3",
        className
      )}
      {...props}
    >
      {children}
      {actions ? <div className="flex shrink-0 items-center gap-1">{actions}</div> : null}
    </div>
  )
}

/** Props for the CornerPanelTitle. */
export type CornerPanelTitleProps = React.ComponentPropsWithRef<"h2">

/** Names the panel, and the scrolling body with it. */
function CornerPanelTitle({ className, ref, ...props }: CornerPanelTitleProps) {
  const { titleId } = useCornerPanel("CornerPanelTitle")
  return (
    <h2
      ref={ref}
      id={titleId}
      data-slot="corner-panel-title"
      className={cn("truncate text-sm font-semibold", className)}
      {...props}
    />
  )
}

/** Props for the CornerPanelClose. */
export interface CornerPanelCloseProps
  extends React.ComponentPropsWithRef<typeof Button> {
  labels?: CornerPanelLabels
}

/** An icon button that closes the panel. Labelled, because it is icon-only. */
function CornerPanelClose({
  className,
  children,
  labels: labelsProp,
  onClick,
  ref,
  ...props
}: CornerPanelCloseProps) {
  const { setOpen } = useCornerPanel("CornerPanelClose")
  const ctx = useLabels()
  const labels = resolveLabels(defaultCornerPanelLabels, ctx.cornerPanel, labelsProp)

  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon-sm"
      data-slot="corner-panel-close"
      aria-label={labels.close}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(false)
      }}
      {...props}
    >
      {children ?? <X aria-hidden />}
    </Button>
  )
}

// ─── Body and footer ─────────────────────────────────────────────────

/** Props for the CornerPanelBody. */
export type CornerPanelBodyProps = React.ComponentPropsWithRef<"div">

/**
 * The scrolling middle of the panel.
 *
 * `role="region"` with `tabIndex={0}`, named by the panel's title: a scroll
 * container nothing can focus is content a keyboard cannot read.
 */
function CornerPanelBody({ className, ref, ...props }: CornerPanelBodyProps) {
  const { titleId } = useCornerPanel("CornerPanelBody")
  return (
    <div
      ref={ref}
      data-slot="corner-panel-body"
      role="region"
      tabIndex={0}
      aria-labelledby={props["aria-label"] || props["aria-labelledby"] ? undefined : titleId}
      className={cn(
        "flex-1 overflow-y-auto p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        className
      )}
      {...props}
    />
  )
}

/** Props for the CornerPanelFooter. */
export type CornerPanelFooterProps = React.ComponentPropsWithRef<"div">

/** The pinned bottom of the panel — a composer, a pair of buttons. */
function CornerPanelFooter({ className, ref, ...props }: CornerPanelFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="corner-panel-footer"
      className={cn("shrink-0 border-t-2 border-border p-3", className)}
      {...props}
    />
  )
}

export {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelFooter,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
  type CornerPanelLabels,
}
