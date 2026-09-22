import * as React from "react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

/**
 * Where the launcher sits, by how many launchers already hold the corner.
 *
 * A literal map rather than a template string, for the reason `Tabs` and
 * `Sheet` keep one: Tailwind reads source text, and `` `bottom-${n}` `` is not
 * source text.
 *
 * The arithmetic is the launcher plus the air around it: 56px of button and
 * 16px of gap, so each step up is 72px on top of the corner's own 20px.
 */
const LIFT = {
  0: "bottom-5",
  1: "bottom-23",
  2: "bottom-41",
} as const

/** Props accepted by the FloatingAction component. */
export interface FloatingActionProps extends Omit<ButtonProps, "size"> {
  /**
   * How many launchers already hold the corner. `0` is the corner itself,
   * `1` sits one launcher above it, `2` two.
   */
  lift?: keyof typeof LIFT
}

/**
 * The round launcher pinned to the bottom corner of the viewport, on its own.
 *
 * `CornerPanel` already parks one of these in that corner to open a panel;
 * this is the same 56px object when what it opens is a menu, a dialog, or
 * nothing at all. It is a `Button` and nothing more, with no popup, no state
 * and no context of its own, so whatever it opens is the component that owns
 * that job:
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger
 *     render={<FloatingAction aria-label="Test tools"><Wrench /></FloatingAction>}
 *   />
 *   <DropdownMenuContent positionMethod="fixed" side="top" align="end">
 *     <DropdownMenuItem>Accounts</DropdownMenuItem>
 *     <DropdownMenuItem>Inbox</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * `positionMethod="fixed"` is not decoration: a launcher pinned with
 * `position: fixed` is anchored in viewport coordinates, and a popup placed
 * `absolute` is measured in document ones. The two agree only while the page
 * is scrolled to the top.
 *
 * The corner is a single resource, and this library now puts two things in it.
 * `lift` is how a second one gets out of the first one's way, rather than each
 * caller re-deriving the same 92 pixels:
 *
 * @example
 * <CornerPanelTrigger aria-label="Open chat"><MessageCircle /></CornerPanelTrigger>
 * <FloatingAction aria-label="Test tools" lift={1}><Wrench /></FloatingAction>
 *
 * It is icon-only, so give it an `aria-label`.
 *
 * @prop lift - How many launchers already hold the corner: 0, 1 or 2.
 * @prop render - Render a different element instead of a button.
 */
function FloatingAction({
  className,
  lift = 0,
  type = "button",
  ...props
}: FloatingActionProps) {
  return (
    <Button
      type={type}
      size="icon"
      data-slot="floating-action"
      className={cn(
        "fixed end-5 z-50 h-14 w-14 rounded-full [&_svg]:size-6",
        LIFT[lift],
        className
      )}
      {...props}
    />
  )
}

export { FloatingAction }
