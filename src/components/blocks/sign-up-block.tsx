"use client"

import * as React from "react"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Cluster } from "@/components/ui/cluster"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"

/** Props for {@link SignUpBlock}. */
export interface SignUpBlockProps {
  /** Heading at the top of the card. @default "Create your account" */
  title?: React.ReactNode
  /** Supporting text below the title. @default "Start building in minutes." */
  description?: React.ReactNode
  /** Optional brand/logo node rendered above the title. */
  brand?: React.ReactNode
  /** Submit handler. Read values from the form via `FormData` or controlled inputs. */
  onSubmit?: React.ComponentProps<"form">["onSubmit"]
  /** Destination for the sign-in link in the footer. @default "#" */
  signInHref?: string
  /** Destination for the terms-of-service link. @default "#" */
  termsHref?: string
  /** Text on the submit button. @default "Create account" */
  submitLabel?: string
  /** Optional social/OAuth buttons rendered above the credential form. */
  socialButtons?: React.ReactNode
  /** Whether the submit button shows a loading/disabled state. */
  loading?: boolean
}

/**
 * A complete, drop-in sign-up page: name, email, and password fields with a
 * terms-of-service acknowledgement and a link back to sign in. Links route
 * through {@link LinkProvider} when present.
 *
 * @example
 * <SignUpBlock brand={<Logo />} onSubmit={handleSignUp} signInHref="/sign-in" termsHref="/terms" />
 */
function SignUpBlock({
  title = "Create your account",
  description = "Start building in minutes.",
  brand,
  onSubmit,
  signInHref = "#",
  termsHref = "#",
  submitLabel = "Create account",
  socialButtons,
  loading = false,
}: SignUpBlockProps) {
  return (
    <AuthShell
      title={title}
      description={description}
      brand={brand}
      footer={
        <span>
          Already have an account?{" "}
          <Link href={signInHref} className="font-semibold text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </span>
      }
    >
      <Stack gap="md" data-slot="sign-up-block">
        {socialButtons && <Stack gap="sm">{socialButtons}</Stack>}

        <form onSubmit={onSubmit}>
          <Stack gap="md">
            <Field id="signup-name">
              <FieldLabel>Name</FieldLabel>
              <Input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ada Lovelace"
                required
              />
            </Field>

            <Field id="signup-email">
              <FieldLabel>Email</FieldLabel>
              <Input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </Field>

            <Field id="signup-password">
              <FieldLabel>Password</FieldLabel>
              <Input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
              />
              <FieldHint>At least 8 characters.</FieldHint>
            </Field>

            <Cluster gap="sm" align="start" wrap={false}>
              <Checkbox id="signup-terms" name="terms" required className="mt-0.5" />
              <Label htmlFor="signup-terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link href={termsHref} className="text-primary underline-offset-4 hover:underline">
                  Terms of Service
                </Link>
              </Label>
            </Cluster>

            <Button type="submit" className="w-full" disabled={loading}>
              {submitLabel}
            </Button>
          </Stack>
        </form>
      </Stack>
    </AuthShell>
  )
}

export { SignUpBlock }
