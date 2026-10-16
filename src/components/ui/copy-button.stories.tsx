import type { Meta, StoryObj } from "@storybook/react-vite"

import { CopyButton } from "./copy-button"

const meta: Meta<typeof CopyButton> = {
  title: "Data Display/CopyButton",
  component: CopyButton,
  args: {
    value: "https://example.com/companies/acme",
    label: "Copy company page link",
  },
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {}

export const AfterALink: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <a href="https://example.com/companies/acme" className="text-sm underline underline-offset-2">
        example.com/companies/acme
      </a>
      <CopyButton {...args} />
    </div>
  ),
}

export const Small: Story = { args: { size: "icon-sm" } }

export const NothingToCopy: Story = { args: { value: null } }
