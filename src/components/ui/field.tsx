"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface FieldContextValue {
  id: string
  hintId: string
  errorId: string
  error: boolean
  /** Which of hintId / errorId are actually rendered right now. */
  described: { hint: boolean; error: boolean }
  setDescribed: (part: "hint" | "error", present: boolean) => void
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

/** Hook that returns the current Field context (id, error state, aria IDs). */
function useFieldContext() {
  return React.useContext(FieldContext)
}

/**
 * Props a form control spreads to join its parent Field. Returns nothing
 * outside one, so controls still work standalone.
 *
 * `aria-describedby` names only ids that are actually on the page. `FieldHint`
 * and `FieldError` register themselves when they render — `error` alone isn't
 * enough, since a field can be in error with no message rendered, and pointing
 * at a missing id fails axe's aria-valid-attr-value.
 *
 * @example
 * <input {...useFieldControl()} {...props} />
 */
function useFieldControl(): React.AriaAttributes & { id?: string } {
  const ctx = useFieldContext()
  if (!ctx) return {}

  const describedBy = [
    ctx.described.hint && ctx.hintId,
    ctx.described.error && ctx.errorId,
  ]
    .filter(Boolean)
    .join(" ")

  return {
    id: ctx.id,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": ctx.error || undefined,
  }
}

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean
  id?: string
}

/**
 * Form field wrapper that provides shared context for label, hint, and error linking.
 *
 * @example
 * <Field error={!!errors.name}>
 *   <FieldLabel>Name</FieldLabel>
 *   <Input />
 *   <FieldError>{errors.name}</FieldError>
 * </Field>
 *
 * @prop error - Whether the field is in an error state
 */
function Field({ className, error = false, id: idProp, children, ...props }: FieldProps) {
  const generatedId = React.useId()
  const id = idProp ?? generatedId
  const [described, setDescribedState] = React.useState({
    hint: false,
    error: false,
  })

  const setDescribed = React.useCallback(
    (part: "hint" | "error", present: boolean) =>
      setDescribedState((prev) =>
        prev[part] === present ? prev : { ...prev, [part]: present }
      ),
    []
  )

  const ctx = React.useMemo<FieldContextValue>(
    () => ({
      id,
      hintId: `${id}-hint`,
      errorId: `${id}-error`,
      error,
      described,
      setDescribed,
    }),
    [id, error, described, setDescribed]
  )

  return (
    <FieldContext.Provider value={ctx}>
      <div
        data-slot="field"
        className={cn(
          "space-y-2",
          error &&
            "[&_input]:border-status-error [&_textarea]:border-status-error",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  )
}

/** Label automatically linked to the parent Field's input via htmlFor. */
function FieldLabel({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Label>) {
  const ctx = useFieldContext()

  return (
    <Label
      data-slot="field-label"
      htmlFor={ctx?.id}
      className={cn(
        "text-sm font-semibold",
        ctx?.error && "text-status-error-text",
        className
      )}
      {...props}
    />
  )
}

/** Muted helper text displayed below a field input. */
function FieldHint({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const ctx = useFieldContext()
  const setDescribed = ctx?.setDescribed

  React.useEffect(() => {
    setDescribed?.("hint", true)
    return () => setDescribed?.("hint", false)
  }, [setDescribed])

  return (
    <p
      data-slot="field-hint"
      id={ctx?.hintId}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Error message that renders only when children are provided, with role="alert". */
function FieldError({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const ctx = useFieldContext()
  const setDescribed = ctx?.setDescribed
  const present = Boolean(children)

  // Registered before the early return, so the hook order stays stable when
  // an error message appears or clears.
  React.useEffect(() => {
    setDescribed?.("error", present)
    return () => setDescribed?.("error", false)
  }, [setDescribed, present])

  if (!present) return null

  return (
    <p
      data-slot="field-error"
      id={ctx?.errorId}
      role="alert"
      className={cn(
        "text-xs text-status-error-text font-medium",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  useFieldContext,
  useFieldControl,
}
