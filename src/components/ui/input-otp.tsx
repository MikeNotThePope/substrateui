"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * One-time password input supporting configurable length and pattern validation.
 *
 * @example
 * <InputOTP maxLength={6}>
 *   <InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /></InputOTPGroup>
 *   <InputOTPSeparator />
 *   <InputOTPGroup><InputOTPSlot index={2} /><InputOTPSlot index={3} /></InputOTPGroup>
 * </InputOTP>
 */
function InputOTP({
  className,
  containerClassName,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof OTPInput>) {
  return (
    <OTPInput
      ref={ref}
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

/** Groups adjacent OTP slots together visually. */
function InputOTPGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div ref={ref} data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
  )
}

/**
 * Individual character slot within an OTP input displaying a single digit.
 *
 * @prop index - Zero-based position of this slot in the OTP sequence
 */
function InputOTPSlot({
  index,
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      data-slot="input-otp-slot"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-2 rounded-md border-input text-sm transition-all",
        isActive && "z-10 border-ring ring-2 ring-ring ring-offset-background",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

/** Dot separator rendered between OTP slot groups. */
function InputOTPSeparator({
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div ref={ref} role="separator" data-slot="input-otp-separator" {...props}>
      <Dot />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
