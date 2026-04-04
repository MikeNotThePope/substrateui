import * as React from "react"

import { cn } from "@/lib/utils"
import { Center } from "@/components/ui/center"

/** Props for PageBody including optional full-width mode and padding control. */
interface PageBodyProps extends React.ComponentPropsWithRef<"div"> {
  fullWidth?: boolean
  padding?: "default" | "none"
}

/** Main page content area with optional max-width centering and padding.
 *
 * @example
 * <PageBody fullWidth>{children}</PageBody>
 *
 * @prop fullWidth - Skip the max-width Center wrapper when true.
 * @prop padding - Use "none" to remove default padding.
 */
function PageBody({
  fullWidth = false,
  padding = "default",
  className,
  children,
  ref,
  ...props
}: PageBodyProps) {
  return (
    <div
      ref={ref}
      data-slot="page-body"
      className={cn(padding === "default" && "px-6 py-6", className)}
      {...props}
    >
      {fullWidth ? children : <Center max="2xl">{children}</Center>}
    </div>
  )
}

export { PageBody, type PageBodyProps }
