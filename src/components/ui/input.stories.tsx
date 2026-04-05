import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  args: {
    placeholder: "you@example.com",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url", "file"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithValue: Story = { args: { defaultValue: "hello@substrate.ui" } }
export const Email: Story = { args: { type: "email" } }
export const Password: Story = { args: { type: "password", placeholder: "••••••••" } }
export const Search: Story = { args: { type: "search", placeholder: "Search…" } }
export const File: Story = { args: { type: "file" } }
export const Disabled: Story = { args: { disabled: true, defaultValue: "disabled" } }
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: "read only" } }

export const Playground: Story = {
  args: { type: "text", placeholder: "Type here…", disabled: false, readOnly: false },
}
