import * as React from "react"

import { cn } from "@/lib/utils"

/** Props accepted by the HoneypotField component. */
export interface HoneypotFieldProps
  extends Omit<React.ComponentPropsWithRef<"input">, "type" | "children"> {
  /** The field name the server reads. Anything non-empty is a bot. */
  name?: string
}

/**
 * A bait input no person can see or reach, for a form that takes public
 * submissions. A script fills every field it finds; a person fills the ones
 * they are shown. So a request that arrives with this one non-empty came from a
 * script, and the server drops it without a captcha, a cookie or a third party.
 *
 * Four details carry the whole component, and each is a trap a hand-written
 * copy falls into:
 *
 * - **Off-screen, not `display: none`.** Some scripts skip a hidden field,
 *   which would defeat the point. Pinned off the start edge, it takes no room
 *   and adds no horizontal scroll.
 * - **`aria-hidden`**, so a screen reader never announces it.
 * - **`tabIndex={-1}`**, so Tab skips it. Both jsx-a11y's
 *   `no-aria-hidden-on-focusable` and axe's `aria-hidden-focus` read an input as
 *   focusable unless its tabindex is negative, so without this the field fails
 *   the accessibility gates it was supposed to be invisible to.
 * - **`autoComplete="off"`**, so a browser never fills it for a real person.
 *
 * It carries no label on purpose: a label would give it a name for a screen
 * reader, and it is meant to have none.
 *
 * @example
 * <form action={submit}>
 *   <HoneypotField />
 *   <Input name="email" />
 * </form>
 *
 * @prop name - The field name the server reads (default "company_website").
 */
function HoneypotField({
  name = "company_website",
  className,
  ref,
  ...props
}: HoneypotFieldProps) {
  return (
    <input
      ref={ref}
      type="text"
      name={name}
      data-slot="honeypot-field"
      tabIndex={-1}
      aria-hidden="true"
      autoComplete="off"
      // `start-[-9999px]`, not `sr-only`: sr-only clips to a 1px box but leaves
      // the field in the layout's flow at its own position, and some scripts
      // treat a zero-size field the way they treat a hidden one.
      className={cn("absolute start-[-9999px] top-0 h-px w-px overflow-hidden", className)}
      {...props}
    />
  )
}

export { HoneypotField }
