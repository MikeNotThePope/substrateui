import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const authShellProps: PropDef[] = [
  {
    name: "title",
    type: "React.ReactNode",
    default: undefined,
    description: "Heading shown at the top of the card.",
  },
  {
    name: "description",
    type: "React.ReactNode",
    default: undefined,
    description: "Optional supporting text rendered below the title.",
  },
  {
    name: "brand",
    type: "React.ReactNode",
    default: undefined,
    description: "Optional brand/logo node rendered above the title.",
  },
  {
    name: "footer",
    type: "React.ReactNode",
    default: undefined,
    description:
      'Optional footer content rendered below the body (e.g. a "Need an account? Sign up" link).',
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes applied to the outer centering container.",
  },
]

export default function AuthShellPage() {
  return (
    <DocPage
      title="Auth Shell"
      description="A centered single-column layout organism for authentication pages (sign in, sign up, password reset, email verification). Vertically and horizontally centers a narrow Card with slots for a brand/logo, title, description, body, and footer."
    >
      <Stack gap="md">
        <H3>Sign In</H3>
        <ComponentPreview
          code={`import { AuthShell } from "@/components/auth-shell"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

<AuthShell
  title="Sign in"
  description="Welcome back to Lavahire."
  footer={
    <span>
      Need an account? <a className="underline" href="/sign-up">Sign up</a>
    </span>
  }
>
  <Form>
    <Field id="email">
      <FieldLabel>Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
    </Field>
    <Field id="password">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput id="password" autoComplete="current-password" />
    </Field>
    <Button type="submit" className="w-full">Sign in</Button>
  </Form>
</AuthShell>`}
        >
          <AuthShell
            className="min-h-0"
            title="Sign in"
            description="Welcome back to Lavahire."
            footer={
              <span>
                Need an account?{" "}
                <a className="underline" href="#">
                  Sign up
                </a>
              </span>
            }
          >
            <Form>
              <Field id="email">
                <FieldLabel>Email</FieldLabel>
                <Input id="email" type="email" placeholder="you@example.com" />
              </Field>
              <Field id="password">
                <FieldLabel>Password</FieldLabel>
                <PasswordInput id="password" autoComplete="current-password" />
              </Field>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </Form>
          </AuthShell>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={authShellProps} />
      </Stack>
    </DocPage>
  )
}
