"use client"

import * as React from "react"

import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Cluster } from "@/components/ui/cluster"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"
import { Separator } from "@/components/ui/separator"
import { Stack } from "@/components/ui/stack"

/** Props for {@link SignInBlock}. */
export interface SignInBlockProps {
  /** Heading at the top of the card. @default "Sign in" */
  title?: React.ReactNode
  /** Supporting text below the title. @default "Welcome back — enter your details." */
  description?: React.ReactNode
  /** Optional brand/logo node rendered above the title. */
  brand?: React.ReactNode
  /** Submit handler. Read values from the form via `FormData` or controlled inputs. */
  onSubmit?: React.ComponentProps<"form">["onSubmit"]
  /** Destination for the "Forgot password?" link. @default "#" */
  forgotPasswordHref?: string
  /** Destination for the sign-up link in the footer. @default "#" */
  signUpHref?: string
  /** Text on the submit button. @default "Sign in" */
  submitLabel?: string
  /** Optional social/OAuth buttons rendered above the credential form. */
  socialButtons?: React.ReactNode
  /** Whether the submit button shows a loading/disabled state. */
  loading?: boolean
}

/**
 * A complete, drop-in sign-in page: centered card with email + password fields,
 * a "remember me" toggle, forgot-password and sign-up links, and an optional
 * OAuth button row. Links route through {@link LinkProvider} when present.
 *
 * @example
 * <SignInBlock
 *   brand={<Logo />}
 *   onSubmit={handleSignIn}
 *   forgotPasswordHref="/forgot"
 *   signUpHref="/sign-up"
 *   socialButtons={<Button variant="outline" className="w-full">Continue with GitHub</Button>}
 * />
 */
function SignInBlock({
  title = "Sign in",
  description = "Welcome back — enter your details.",
  brand,
  onSubmit,
  forgotPasswordHref = "#",
  signUpHref = "#",
  submitLabel = "Sign in",
  socialButtons,
  loading = false,
}: SignInBlockProps) {
  return (
    <AuthShell
      title={title}
      description={description}
      brand={brand}
      footer={
        <span>
          Don&apos;t have an account?{" "}
          <Link href={signUpHref} className="font-semibold text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </span>
      }
    >
      <Stack gap="md" data-slot="sign-in-block">
        {socialButtons && (
          <>
            <Stack gap="sm">{socialButtons}</Stack>
            <Cluster gap="sm" align="center" className="text-xs text-muted-foreground">
              <Separator className="flex-1" />
              <span>or continue with email</span>
              <Separator className="flex-1" />
            </Cluster>
          </>
        )}

        <form onSubmit={onSubmit}>
          <Stack gap="md">
            <Field id="signin-email">
              <FieldLabel>Email</FieldLabel>
              <Input
                id="signin-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </Field>

            <Field id="signin-password">
              <Cluster justify="between" align="center">
                <FieldLabel>Password</FieldLabel>
                <Link
                  href={forgotPasswordHref}
                  className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </Cluster>
              <Input
                id="signin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </Field>

            <Cluster gap="sm" align="center">
              <Checkbox id="signin-remember" name="remember" />
              <Label htmlFor="signin-remember" className="text-sm font-normal">
                Remember me
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

export { SignInBlock }
