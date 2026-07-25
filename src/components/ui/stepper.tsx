import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/** A single step in a {@link Stepper}. */
export interface StepperStep {
  /** Short label for the step. */
  label: React.ReactNode
  /** Optional secondary description. */
  description?: React.ReactNode
}

/** Props for the Stepper component. */
export interface StepperProps extends React.ComponentPropsWithRef<"ol"> {
  /** The ordered steps. */
  steps: StepperStep[]
  /** Zero-based index of the current step. Earlier steps render as completed. */
  activeStep: number
  /** Layout direction. @default "horizontal" */
  orientation?: "horizontal" | "vertical"
}

/**
 * A numbered progress indicator for multi-step flows (checkout, onboarding,
 * form wizards). Completed steps show a check, the active step is highlighted,
 * and upcoming steps are muted.
 *
 * @example
 * <Stepper activeStep={1} steps={[{ label: "Account" }, { label: "Shipping" }, { label: "Payment" }]} />
 *
 * @prop steps - Ordered list of `{ label, description? }`.
 * @prop activeStep - Zero-based index of the current step.
 * @prop orientation - "horizontal" | "vertical".
 */
function Stepper({
  steps,
  activeStep,
  orientation = "horizontal",
  className,
  ref,
  ...props
}: StepperProps) {
  const vertical = orientation === "vertical"

  return (
    <ol
      ref={ref}
      data-slot="stepper"
      className={cn(
        "flex w-full",
        vertical ? "flex-col gap-0" : "items-start",
        className
      )}
      {...props}
    >
      {steps.map((step, i) => {
        const state = i < activeStep ? "complete" : i === activeStep ? "active" : "upcoming"
        const isLast = i === steps.length - 1
        return (
          <li
            key={i}
            data-slot="stepper-step"
            data-state={state}
            aria-current={state === "active" ? "step" : undefined}
            className={cn(
              "flex",
              vertical ? "gap-4" : "flex-1 flex-col items-center text-center",
              !vertical && isLast && "flex-none"
            )}
          >
            <div className={cn("flex items-center", vertical ? "flex-col" : "w-full")}>
              {/* Marker */}
              <span
                className={cn(
                  "z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold [&_svg]:size-4",
                  state === "complete" && "border-primary-border bg-primary text-primary-foreground",
                  state === "active" && "border-primary bg-background text-primary",
                  state === "upcoming" && "border-border bg-muted text-muted-foreground"
                )}
              >
                {state === "complete" ? <Check aria-hidden /> : i + 1}
              </span>

              {/* Connector */}
              {!isLast && (
                <span
                  aria-hidden
                  className={cn(
                    vertical ? "my-1 w-0.5 flex-1 self-center" : "mx-2 h-0.5 flex-1",
                    i < activeStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className={cn(vertical ? "pb-8 pt-1" : "mt-2 px-1")}>
              <div
                className={cn(
                  "text-sm font-semibold",
                  state === "upcoming" ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {step.label}
              </div>
              {step.description && (
                <div className="mt-0.5 text-xs text-muted-foreground">{step.description}</div>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
