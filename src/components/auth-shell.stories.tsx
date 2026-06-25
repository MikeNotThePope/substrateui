import type { Meta, StoryObj } from "@storybook/react-vite"

import { AuthShell } from "./auth-shell"
import { Button } from "./ui/button"
import { Field, FieldLabel } from "./ui/field"
import { Form } from "./ui/form"
import { Input } from "./ui/input"
import { PasswordInput } from "./ui/password-input"

const meta: Meta<typeof AuthShell> = {
  title: "Organisms/AuthShell",
  component: AuthShell,
}

export default meta
type Story = StoryObj<typeof AuthShell>

export const SignIn: Story = {
  args: {
    title: "Sign in",
    description: "Welcome back to Lavahire.",
    footer: (
      <span>
        Need an account? <a className="underline" href="#">Sign up</a>
      </span>
    ),
    children: (
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
    ),
  },
}
