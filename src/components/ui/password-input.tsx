"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"
import { Input } from "./input"
import { InputGroup, InputGroupSuffix } from "./input-group"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by PasswordInput. All keys have English defaults. */
interface PasswordInputLabels {
  showPassword?: string
  hidePassword?: string
}

const defaultPasswordInputLabels: Required<PasswordInputLabels> = {
  showPassword: "Show password",
  hidePassword: "Hide password",
}

/** Props for the PasswordInput component. */
interface PasswordInputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  /** Extra classes applied to the bordered wrapper (not the inner input). */
  containerClassName?: string
  labels?: PasswordInputLabels
}

/**
 * Password text input with a show/hide visibility toggle.
 *
 * Drop-in replacement for `Input` for password fields: all props (`name`,
 * `required`, `minLength`, `autoComplete`, `id`, aria-*, etc.) are forwarded to
 * the underlying input. `className` styles the inner input; use
 * `containerClassName` to style the bordered wrapper.
 *
 * @example
 * <PasswordInput name="password" autoComplete="current-password" required />
 *
 * @prop containerClassName - Classes for the bordered wrapper element.
 * @prop labels - Translatable strings for the visibility toggle.
 */
function PasswordInput({
  className,
  containerClassName,
  labels: labelsProp,
  ref,
  ...props
}: PasswordInputProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultPasswordInputLabels, ctx.passwordInput, labelsProp)
  const [visible, setVisible] = React.useState(false)
  const toggleLabel = visible ? labels.hidePassword : labels.showPassword

  return (
    <InputGroup data-slot="password-input" className={cn(containerClassName)}>
      <Input
        type={visible ? "text" : "password"}
        ref={ref}
        className={cn("border-0 focus-visible:ring-0 focus-visible:ring-offset-0", className)}
        {...props}
      />
      <InputGroupSuffix className="pe-1">
        <button
          type="button"
          aria-label={toggleLabel}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="inline-flex size-8 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </InputGroupSuffix>
    </InputGroup>
  )
}

export { PasswordInput, type PasswordInputProps, type PasswordInputLabels }
