import * as React from "react"

import { cn } from "@/lib/utils"

interface FieldsetProps extends React.ComponentPropsWithRef<"fieldset"> {
  legend: string
}

/**
 * Accessible fieldset wrapper with a visible legend label.
 *
 * @example
 * <Fieldset legend="Personal Info"><Input /><Input /></Fieldset>
 *
 * @prop legend - Text displayed as the fieldset legend
 */
function Fieldset({
  legend,
  className,
  children,
  ref,
  ...props
}: FieldsetProps) {
  return (
    <fieldset
      data-slot="fieldset"
      className={cn("border-0 p-0 m-0 space-y-2", className)}
      ref={ref}
      {...props}
    >
      <legend className="text-sm font-semibold mb-2">{legend}</legend>
      {children}
    </fieldset>
  )
}

export { Fieldset }
