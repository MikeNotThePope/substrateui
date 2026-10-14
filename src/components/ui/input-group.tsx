"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Whether the group drops its suffix under the input below `sm`. Context
// rather than a class on the group reaching into its children: the suffix owns
// its own classes, as it does when the group is not stacked.
const InputGroupStackContext = React.createContext(false)

/** Props for the InputGroup component. */
interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Below `sm`, the suffix drops to its own line under the input, still inside
   * the border; from `sm` up it sits beside it. For a long fixed suffix, such
   * as an email domain, that would otherwise squeeze the input to a few
   * characters on a phone. @default false
   */
  stack?: boolean
}

/**
 * Container that visually groups an Input with prefix/suffix addons sharing a single border.
 *
 * @example
 * <InputGroup>
 *   <InputGroupPrefix>$</InputGroupPrefix>
 *   <Input placeholder="0.00" />
 *   <InputGroupSuffix>USD</InputGroupSuffix>
 * </InputGroup>
 *
 * @example
 * <InputGroup stack>
 *   <Input name="local" />
 *   <InputGroupSuffix>@example.com</InputGroupSuffix>
 * </InputGroup>
 */
function InputGroup({ stack = false, className, ...props }: InputGroupProps) {
  return (
    <InputGroupStackContext.Provider value={stack}>
      <div
        data-slot="input-group"
        data-stack={stack || undefined}
        className={cn(
          "flex items-center border-2 rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "[&_input]:border-0 [&_input]:focus-visible:ring-0 [&_input]:focus-visible:ring-offset-0",
          stack &&
            "flex-wrap sm:flex-nowrap [&_input]:min-w-0 sm:[&_input]:flex-1",
          className
        )}
        {...props}
      />
    </InputGroupStackContext.Provider>
  )
}

/** Left-side addon content (icon, text) within an InputGroup. */
function InputGroupPrefix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="input-group-prefix"
      className={cn("flex items-center ps-3 text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Right-side addon content (icon, text) within an InputGroup. In a stacked
 * group it takes a line of its own below `sm`, under a dashed rule, and breaks
 * anywhere rather than overflow; from `sm` up it never wraps.
 */
function InputGroupSuffix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const stack = React.useContext(InputGroupStackContext)
  return (
    <div
      data-slot="input-group-suffix"
      className={cn(
        "flex items-center pe-3 text-muted-foreground",
        stack &&
          "basis-full break-all border-t-2 border-dashed ps-3 py-2 text-sm sm:basis-auto sm:whitespace-nowrap sm:border-t-0 sm:ps-0 sm:py-0",
        className
      )}
      {...props}
    />
  )
}

/** Props for the InputGroupReadback component. */
interface InputGroupReadbackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** What the line calls the value, such as "New address". */
  label: React.ReactNode
  /** The fixed text after what is typed: the group's suffix, as a string. */
  suffix: string
  /** The input's own `defaultValue`, so the line is right before any typing. */
  defaultValue?: string
}

/**
 * Wraps an InputGroup and reads back, on a line under it, the whole value as
 * typed plus the fixed suffix: "New address: ana@example.com". The input and
 * its suffix are two elements, so no single drag copies both; one tap on this
 * line selects the whole string.
 *
 * It listens for the input's `input` events as they bubble, so the input
 * stays uncontrolled and posts with its form as before.
 *
 * @example
 * <InputGroupReadback label="New address" suffix="@example.com">
 *   <InputGroup stack>
 *     <Input name="local" />
 *     <InputGroupSuffix>@example.com</InputGroupSuffix>
 *   </InputGroup>
 * </InputGroupReadback>
 */
function InputGroupReadback({
  label,
  suffix,
  defaultValue = "",
  className,
  children,
  ...props
}: InputGroupReadbackProps) {
  const [value, setValue] = React.useState(defaultValue.trim())
  return (
    <div
      data-slot="input-group-readback"
      className={cn("flex flex-col gap-2", className)}
      onInput={(event) => {
        if (event.target instanceof HTMLInputElement) {
          setValue(event.target.value.trim())
        }
      }}
      {...props}
    >
      {children}
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {label}:{" "}
        {value ? (
          <span className="select-all font-mono text-foreground [overflow-wrap:anywhere]">
            {value}
            <wbr />
            {suffix}
          </span>
        ) : (
          <span className="font-mono [overflow-wrap:anywhere]">
            {"…"}
            {suffix}
          </span>
        )}
      </p>
    </div>
  )
}

export {
  InputGroup,
  InputGroupPrefix,
  InputGroupSuffix,
  InputGroupReadback,
  type InputGroupProps,
  type InputGroupReadbackProps,
}
