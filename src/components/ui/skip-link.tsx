import * as React from "react"

import { cn } from "@/lib/utils"

/** Props for the SkipLink component. */
export interface SkipLinkProps extends React.ComponentPropsWithRef<"a"> {
  /** Fragment id of the element to jump to (default "#main-content"). */
  href?: string
}

/**
 * A bypass link that lets keyboard and screen-reader users jump straight to the
 * main content, past the header and navigation. Hidden until focused, so it
 * costs nothing visually and is the first thing Tab reaches.
 *
 * Render it as the first focusable element in the document — immediately inside
 * `<body>`, before the header — and give the target element a matching `id` and
 * `tabIndex={-1}` so focus actually lands there.
 *
 * Satisfies WCAG 2.4.1 Bypass Blocks (Level A).
 *
 * @example
 * <SkipLink />
 * <SiteHeader />
 * <main id="main-content" tabIndex={-1}>…</main>
 *
 * @prop href - Fragment id of the target (default "#main-content").
 */
function SkipLink({
  href = "#main-content",
  className,
  children = "Skip to content",
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={href}
      data-slot="skip-link"
      className={cn(
        // sr-only until focused, then a real, visible control pinned to the
        // top-start corner. `focus:` rather than `focus-visible:` on purpose:
        // this element is only ever reached by keyboard, and Safari does not
        // match :focus-visible on anchors it has moved focus to.
        "sr-only rounded-md border-2 border-primary-border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        "focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50",
        // `focus:`, not `focus-visible:`, and it is the only ring in the package
        // that should be — which is why it says so here. The link is `sr-only`
        // until focused and reveals itself on the line above; a ring on a
        // different condition from the reveal would draw on a link nobody can
        // see. Reaching it at all requires Tab, so there is no mouse-click case
        // for `focus-visible:` to suppress.
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export { SkipLink }
