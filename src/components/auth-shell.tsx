import * as React from "react"

import { cn } from "@/lib/utils"
import { Center } from "@/components/ui/center"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** Props for the AuthShell organism. */
interface AuthShellProps extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Heading shown at the top of the card. */
  title: React.ReactNode
  /** Optional supporting text below the title. */
  description?: React.ReactNode
  /** Optional brand/logo node rendered above the title. */
  brand?: React.ReactNode
  /** Optional footer content (e.g. a "Need an account? Sign up" link). */
  footer?: React.ReactNode
  /** Form/body content rendered inside the card. */
  children?: React.ReactNode
}

/**
 * Centered single-column layout for authentication pages (sign in, sign up,
 * password reset, email verification). Vertically and horizontally centers a
 * narrow Card with slots for a brand/logo, title, description, body, and footer.
 *
 * @example
 * <AuthShell
 *   title="Sign in"
 *   description="Welcome back"
 *   footer={<p>Need an account? <a href="/sign-up">Sign up</a></p>}
 * >
 *   <form>…</form>
 * </AuthShell>
 *
 * @prop title - Heading shown at the top of the card.
 * @prop description - Optional supporting text below the title.
 * @prop brand - Optional brand/logo node rendered above the title.
 * @prop footer - Optional footer content rendered below the body.
 */
function AuthShell({
  title,
  description,
  brand,
  footer,
  children,
  className,
  ref,
  ...props
}: AuthShellProps) {
  return (
    <div
      ref={ref}
      data-slot="auth-shell"
      className={cn("flex min-h-screen flex-col justify-center py-12", className)}
      {...props}
    >
      <Center max="sm">
        <Card>
          <CardHeader>
            {brand && <div data-slot="auth-shell-brand" className="mb-2">{brand}</div>}
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>{children}</CardContent>
          {footer && (
            <CardFooter className="justify-center text-sm text-muted-foreground">
              {footer}
            </CardFooter>
          )}
        </Card>
      </Center>
    </div>
  )
}

export { AuthShell, type AuthShellProps }
