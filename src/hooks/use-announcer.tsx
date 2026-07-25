"use client"

import * as React from "react"

/** How urgently a screen reader should interrupt to read the message. */
export type Assertiveness = "assertive" | "polite"

// Standard visually-hidden styling — the live region must be in the
// accessibility tree but never painted or take layout space.
const VISUALLY_HIDDEN: Partial<CSSStyleDeclaration> = {
  border: "0",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
}

interface Announcer {
  node: HTMLElement
  assertive: HTMLElement
  polite: HTMLElement
}

let instance: Announcer | null = null

function createLog(assertiveness: Assertiveness): HTMLElement {
  const log = document.createElement("div")
  log.setAttribute("role", "log")
  log.setAttribute("aria-live", assertiveness)
  // Only announce nodes we add, not the whole (empty) region.
  log.setAttribute("aria-relevant", "additions")
  return log
}

/**
 * Lazily create the shared, document-level live region. Returns `null` during
 * SSR (no `document`), which makes every public function a safe no-op there.
 */
function ensureAnnouncer(): Announcer | null {
  if (typeof document === "undefined") return null
  if (instance && document.body.contains(instance.node)) return instance

  const node = document.createElement("div")
  node.dataset.substrateuiAnnouncer = "true"
  Object.assign(node.style, VISUALLY_HIDDEN)

  const assertive = createLog("assertive")
  const polite = createLog("polite")
  node.append(assertive, polite)
  document.body.prepend(node)

  instance = { node, assertive, polite }
  return instance
}

/**
 * Announce a message to assistive technology, imperatively — for async or
 * off-screen feedback a screen reader would otherwise miss ("5 results loaded",
 * "Copied to clipboard", "Item removed"). Works from anywhere, no element
 * required.
 *
 * @param message - Text to read. An empty string clears the region without
 *   announcing.
 * @param assertiveness - `"assertive"` interrupts the user immediately;
 *   `"polite"` (default) waits for a pause. Prefer `"polite"` for anything
 *   non-critical.
 * @param timeout - How long (ms) the message stays in the DOM before it is
 *   removed. Default `7000`.
 *
 * @example
 * announce(`${results.length} results loaded`, "polite")
 */
export function announce(
  message: string,
  assertiveness: Assertiveness = "polite",
  timeout = 7000,
): void {
  const announcer = ensureAnnouncer()
  if (!announcer) return

  const region = assertiveness === "assertive" ? announcer.assertive : announcer.polite

  // A fresh node per call guarantees repeat/identical messages re-announce.
  const messageNode = document.createElement("div")
  messageNode.textContent = message
  region.appendChild(messageNode)

  if (message !== "") {
    window.setTimeout(() => {
      messageNode.remove()
    }, timeout)
  }
}

/**
 * Clear pending messages from the live region(s). Pass an assertiveness to clear
 * only that region; omit it to clear both.
 */
export function clearAnnouncer(assertiveness?: Assertiveness): void {
  if (!instance) return
  if (!assertiveness || assertiveness === "assertive") instance.assertive.replaceChildren()
  if (!assertiveness || assertiveness === "polite") instance.polite.replaceChildren()
}

/**
 * Remove the live region from the document entirely. Rarely needed — the region
 * is empty and inert when idle — but available for teardown in tests or
 * single-page-app unmount.
 */
export function destroyAnnouncer(): void {
  if (!instance) return
  instance.node.remove()
  instance = null
}

/** The stable API returned by {@link useAnnouncer}. */
export interface UseAnnouncerReturn {
  /** Announce a message to assistive technology. */
  announce: typeof announce
  /** Clear pending messages from the live region(s). */
  clear: typeof clearAnnouncer
}

/**
 * React wrapper over {@link announce} — returns a stable `{ announce, clear }`
 * pair you can call from effects and event handlers. The underlying live region
 * is shared across the whole app, so mounting the hook many times is cheap.
 *
 * @example
 * const { announce } = useAnnouncer()
 * useEffect(() => { announce(`${count} unread`, "polite") }, [count, announce])
 */
export function useAnnouncer(): UseAnnouncerReturn {
  return React.useMemo(() => ({ announce, clear: clearAnnouncer }), [])
}
