import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldError, FieldHint, FieldLabel } from "./field"
import { Input } from "./input"

const meta: Meta<typeof Field> = {
  title: "Forms/Field",
  component: Field,
  argTypes: {
    error: { control: "boolean" },
  },
  render: (args) => (
    <div className="w-80">
      <Field {...args}>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
        <FieldHint>We&apos;ll never share your email.</FieldHint>
        {args.error ? <FieldError>Please enter a valid email.</FieldError> : null}
      </Field>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Field>

export const Default: Story = { args: { error: false } }
export const WithError: Story = { args: { error: true } }
