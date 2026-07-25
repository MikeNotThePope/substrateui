"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useFocusTrap } from "@/hooks/use-focus-trap"

/** Props for the FocusTrap component. */
export interface FocusTrapProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Whether focus is trapped inside (default true). */
  active?: boolean
  /** Return focus to the previously focused element on deactivate (default true). */
  restoreFocus?: boolean
}

/**
 * Traps keyboard focus within its children while `active`. A declarative wrapper
 * around {@link useFocusTrap} for custom overlays, menus, and dialogs that
 * aren't built on a primitive that already manages focus.
 *
 * @example
 * <FocusTrap active={open}>
 *   <div role="dialog">
 *     <button>Confirm</button>
 *     <button onClick={close}>Cancel</button>
 *   </div>
 * </FocusTrap>
 *
 * @prop active - Engage the trap (default true).
 * @prop restoreFocus - Restore prior focus on deactivate (default true).
 */
function FocusTrap({ active = true, restoreFocus = true, className, children, ...props }: FocusTrapProps) {
  const ref = useFocusTrap<HTMLDivElement>(active, { restoreFocus })
  return (
    <div ref={ref} data-slot="focus-trap" className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export { FocusTrap }
