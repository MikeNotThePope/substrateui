import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ref,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Input }
