"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by MessageThread and MessageComposer. */
interface MessageThreadLabels {
  /** Accessible name for the thread when none is given. */
  thread?: string
  /** Accessible name for the composer's textarea when none is given. */
  message?: string
  /** The composer's submit button. */
  send?: string
}

const defaultMessageThreadLabels: Required<MessageThreadLabels> = {
  thread: "Messages",
  message: "Message",
  send: "Send",
}

// ─── Thread ──────────────────────────────────────────────────────────

/** The prefix a message's element id carries, so `#message-<id>` addresses it. */
const MESSAGE_ID_PREFIX = "message-"

/** Props for the MessageThread. */
export interface MessageThreadProps extends React.ComponentPropsWithRef<"div"> {
  labels?: MessageThreadLabels
}

/**
 * The scrolling half of a conversation: a `role="log"` that opens at its newest
 * message, scrolls to each new one, and honours a `#message-<id>` hash.
 *
 * Three copies of this shape lived in one application
 * (MikeNotThePope/substrateui#123). What they each had to work out:
 *
 * - **It opens at the bottom.** A thread that opens at the oldest message shows
 *   the reader the part they have already read.
 * - **Unless the URL says otherwise.** A link to `#message-42` is a link to one
 *   message; scrolling past it to the newest throws the link away. The named
 *   message is scrolled to *and focused*, so a keyboard lands on it too — which
 *   is why {@link MessageThreadItem} carries `tabIndex={-1}`.
 * - **It is a tab stop.** `role="log"` with `tabIndex={0}`: a scroll container
 *   nothing can focus is content a keyboard cannot scroll.
 *
 * `role="log"` rather than `region` on purpose — it is the role for a running
 * list of messages, and it announces additions without reading the backlog out
 * on arrival.
 *
 * @example
 * <MessageThread aria-label="Conversation">
 *   {messages.map((m) => (
 *     <MessageThreadItem key={m.id} messageId={m.id}>{m.body}</MessageThreadItem>
 *   ))}
 * </MessageThread>
 */
function MessageThread({
  className,
  children,
  labels: labelsProp,
  ref,
  ...props
}: MessageThreadProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultMessageThreadLabels, ctx.messageThread, labelsProp)

  const innerRef = React.useRef<HTMLDivElement>(null)
  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const count = React.Children.count(children)
  const previousCount = React.useRef(count)
  // Whether the deep link has been honoured. It is a first-paint decision: a
  // message arriving later must not yank the reader back to the anchor.
  const settled = React.useRef(false)

  React.useLayoutEffect(() => {
    const container = innerRef.current
    if (!container) return

    if (!settled.current) {
      settled.current = true
      const hash = typeof window === "undefined" ? "" : window.location.hash
      if (hash.startsWith(`#${MESSAGE_ID_PREFIX}`)) {
        const target = container.querySelector<HTMLElement>(
          `[id="${CSS.escape(hash.slice(1))}"]`
        )
        if (target) {
          target.scrollIntoView({ block: "center" })
          target.focus()
          previousCount.current = count
          return
        }
      }
      container.scrollTop = container.scrollHeight
      previousCount.current = count
      return
    }

    // Afterwards, only a message that was not there before moves the thread.
    if (count > previousCount.current) {
      container.scrollTop = container.scrollHeight
    }
    previousCount.current = count
  }, [count])

  return (
    <div
      ref={setRefs}
      data-slot="message-thread"
      role="log"
      tabIndex={0}
      aria-label={props["aria-label"] ?? (props["aria-labelledby"] ? undefined : labels.thread)}
      className={cn(
        "flex flex-1 flex-col gap-3 overflow-y-auto p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Props for the MessageThreadItem. */
export interface MessageThreadItemProps extends React.ComponentPropsWithRef<"div"> {
  /**
   * The message's own id. Becomes the element id `message-<id>`, which is what
   * a `#message-<id>` link addresses.
   */
  messageId: string
  /** Rendered above the body — a name, a timestamp. */
  meta?: React.ReactNode
}

/**
 * One message. Addressable by `#message-<messageId>` and focusable through it.
 *
 * `tabIndex={-1}` is the half of a deep link that is easy to miss: without it
 * the anchor scrolls into view and focus stays wherever it was, so a screen
 * reader is still reading the page the link came from.
 */
function MessageThreadItem({
  messageId,
  meta,
  className,
  children,
  ref,
  ...props
}: MessageThreadItemProps) {
  return (
    <div
      ref={ref}
      id={`${MESSAGE_ID_PREFIX}${messageId}`}
      data-slot="message-thread-item"
      tabIndex={-1}
      className={cn(
        "rounded-lg border-2 border-border bg-surface-raised p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {meta ? (
        <div
          data-slot="message-thread-item-meta"
          className="mb-1 flex items-center gap-2 text-xs text-muted-foreground"
        >
          {meta}
        </div>
      ) : null}
      {children}
    </div>
  )
}

// ─── Composer ────────────────────────────────────────────────────────

/** Props for the MessageComposer. */
export interface MessageComposerProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit" | "defaultValue"> {
  /** The textarea's accessible name. Rendered as an `sr-only` label. */
  label?: React.ReactNode
  /** Shown in the empty textarea. */
  placeholder?: string
  /** Controlled value. Pair with `onValueChange`. */
  value?: string
  /** Starting value when uncontrolled. */
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Called with the trimmed text on submit. */
  onSend?: (value: string) => void
  /** The message under the textarea. Truthy also sets `aria-invalid`. */
  error?: React.ReactNode
  /** Announced through the `role="status"` note — "Reply sent". */
  status?: React.ReactNode
  /** The submit button's text. */
  submitLabel?: React.ReactNode
  /** A send is in flight: the button is disabled and submit does nothing. */
  pending?: boolean
  /** Rows on the textarea. */
  rows?: number
  /** Clear the textarea after a send. Ignored while `value` is controlled. */
  clearOnSend?: boolean
  labels?: MessageThreadLabels
}

/**
 * The writing half of a conversation: a form around the real
 * {@link Textarea}, an `aria-describedby` error line, and a `role="status"`
 * note for what happened.
 *
 * The three copies this replaces each pasted `Textarea`'s class string onto a
 * bare `<textarea>`, so each one drifted from the input it was imitating and
 * none of them picked up a fix to it. This renders the component.
 *
 * The status note is **always in the document**, empty until there is something
 * to say. A live region inserted at the same moment as its text is a live
 * region nothing announces, which is the detail a hand-rolled copy gets wrong
 * and never finds out about.
 *
 * An empty message cannot be sent: the button is disabled until the text has
 * something other than whitespace in it.
 *
 * @example
 * <MessageComposer
 *   label="Reply"
 *   placeholder="Write a reply…"
 *   error={error}
 *   status={sent ? "Reply sent" : null}
 *   onSend={(text) => send(text)}
 * />
 *
 * @prop label - The textarea's accessible name.
 * @prop error - The message under the textarea; truthy also sets aria-invalid.
 * @prop status - Announced through the role="status" note.
 * @prop pending - A send is in flight.
 * @prop clearOnSend - Clear after a send (default true, uncontrolled only).
 */
function MessageComposer({
  label,
  placeholder,
  value,
  defaultValue = "",
  onValueChange,
  onSend,
  error,
  status,
  submitLabel,
  pending = false,
  rows = 3,
  clearOnSend = true,
  labels: labelsProp,
  className,
  children,
  ref,
  ...props
}: MessageComposerProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultMessageThreadLabels, ctx.messageThread, labelsProp)

  const reactId = React.useId()
  const textareaId = `${reactId}-message`
  const errorId = `${reactId}-error`

  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const text = isControlled ? value : uncontrolled

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const hasError = Boolean(error)
  const canSend = text.trim().length > 0 && !pending

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || pending) return
    onSend?.(trimmed)
    if (!isControlled && clearOnSend) setUncontrolled("")
    // Back to the textarea: the next message is written in the same place, and
    // after a click the focus is on a button that may now be disabled.
    textareaRef.current?.focus()
  }

  return (
    <form
      ref={ref}
      data-slot="message-composer"
      className={cn("flex flex-col gap-2", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <Label htmlFor={textareaId} className="sr-only">
        {label ?? labels.message}
      </Label>
      <Textarea
        ref={textareaRef}
        id={textareaId}
        rows={rows}
        placeholder={placeholder}
        value={text}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        onChange={(event) => {
          if (!isControlled) setUncontrolled(event.target.value)
          onValueChange?.(event.target.value)
        }}
      />
      {hasError ? (
        <p
          id={errorId}
          data-slot="message-composer-error"
          className="text-sm font-medium text-status-error-text"
        >
          {error}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-2">
        {/* Always mounted, empty until there is news. See the note above. */}
        <p
          role="status"
          data-slot="message-composer-status"
          className="text-sm text-muted-foreground"
        >
          {status}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          {children}
          <Button type="submit" size="sm" disabled={!canSend}>
            {submitLabel ?? labels.send}
          </Button>
        </div>
      </div>
    </form>
  )
}

export {
  MessageComposer,
  MessageThread,
  MessageThreadItem,
  type MessageThreadLabels,
}
