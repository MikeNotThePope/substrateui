import * as React from "react"

interface AsChildOutput {
  render?: React.ReactElement<Record<string, unknown>>
  children?: React.ReactNode
  nativeButton?: boolean
}

/**
 * Translates this library's public `asChild` prop into Base UI's `render`
 * prop. With `asChild`, the single element child becomes the rendered element
 * (keeping its own children, with the part's props merged onto it) — the same
 * contract as the old Radix Slot-based `asChild`.
 *
 * Pass `{ button: true }` for button-like parts (triggers, close buttons) so
 * Base UI's `nativeButton` prop is set when the slotted element is a
 * non-button tag like `<a>`.
 */
export function asChildRender(
  asChild: boolean | undefined,
  children: React.ReactNode,
  options?: { button?: boolean }
): AsChildOutput {
  if (asChild && React.isValidElement(children)) {
    const out: AsChildOutput = {
      render: children as React.ReactElement<Record<string, unknown>>,
    }
    if (options?.button) {
      const type = (children as React.ReactElement).type
      out.nativeButton = typeof type === "string" ? type === "button" : true
    }
    return out
  }
  return { children }
}
