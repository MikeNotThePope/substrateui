import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Groups multiple buttons into a single visual unit with shared borders.
 *
 * @example
 * <ButtonGroup><Button>Left</Button><Button>Right</Button></ButtonGroup>
 */
function ButtonGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const childArray = React.Children.toArray(children)

  return (
    <div
      data-slot="button-group"
      className={cn("flex -space-x-[2px]", className)}
      {...props}
    >
      {childArray.map((child, i) => {
        if (!React.isValidElement(child)) return child

        const isFirst = i === 0
        const isLast = i === childArray.length - 1

        return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
          className: cn(
            (child as React.ReactElement<{ className?: string }>).props.className,
            !isFirst && "rounded-l-none",
            !isLast && "rounded-r-none"
          ),
        })
      })}
    </div>
  )
}

export { ButtonGroup }
