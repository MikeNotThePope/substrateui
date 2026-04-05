import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Field, FieldLabel } from "./field"
import { Form } from "./form"
import { Input } from "./input"

const meta: Meta<typeof Form> = {
  title: "Forms/Form",
  component: Form,
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
  render: (args) => (
    <div className="w-80">
      <Form {...args}>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input type="email" placeholder="you@example.com" />
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input type="password" />
        </Field>
        <Button type="submit">Sign in</Button>
      </Form>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = { args: { gap: "xl" } }
export const GapMd: Story = { args: { gap: "md" } }
