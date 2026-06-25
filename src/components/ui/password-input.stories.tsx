import type { Meta, StoryObj } from "@storybook/react-vite"

import { PasswordInput } from "./password-input"
import { Field, FieldLabel } from "./field"

const meta: Meta<typeof PasswordInput> = {
  title: "Atoms/PasswordInput",
  component: PasswordInput,
  args: {
    placeholder: "••••••••",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {}

export const WithValue: Story = { args: { defaultValue: "hunter2" } }

export const Disabled: Story = { args: { disabled: true, defaultValue: "hunter2" } }

export const InField: Story = {
  render: (args) => (
    <Field id="pw" className="w-80">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput id="pw" autoComplete="current-password" {...args} />
    </Field>
  ),
}
