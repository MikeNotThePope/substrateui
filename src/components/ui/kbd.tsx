import * as React from "react"

import { cn } from "@/lib/utils"

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string | string[]
}

/**
 * Renders a keyboard key indicator, supporting single keys or key combinations.
 *
 * @example
 * <Kbd keys={["Ctrl", "S"]} />
 * <Kbd>Enter</Kbd>
 *
 * @prop keys - A single key string or array of key strings to display as a combination.
 */
function Kbd({ className, keys, children, ...props }: KbdProps) {
  const kbdClasses = cn(
    "border-2 bg-surface-sunken font-mono text-[10px] rounded px-1.5 py-0.5 text-muted-foreground",
    className
  )

  if (keys) {
    const keyArray = Array.isArray(keys) ? keys : [keys]

    return (
      <span data-slot="kbd-group" className="inline-flex items-center gap-1">
        {keyArray.map((key, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span className="text-[10px] text-muted-foreground">+</span>
            )}
            <kbd className={kbdClasses} {...props}>
              {key}
            </kbd>
          </React.Fragment>
        ))}
      </span>
    )
  }

  return (
    <kbd data-slot="kbd" className={kbdClasses} {...props}>
      {children}
    </kbd>
  )
}

export { Kbd }
