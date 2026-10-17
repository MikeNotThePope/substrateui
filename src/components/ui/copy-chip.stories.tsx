import type { Meta, StoryObj } from "@storybook/react-vite"

import { CopyChip } from "./copy-chip"

const meta: Meta<typeof CopyChip> = {
  title: "Data Display/CopyChip",
  component: CopyChip,
  args: {
    value: "staging-admin@admin.staging.example.com",
    breakAfter: "@",
  },
  argTypes: {
    value: { control: "text" },
    breakAfter: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof CopyChip>

export const Default: Story = {}

export const InALabel: Story = {
  render: (args) => (
    <div className="max-w-[18rem]">
      <label htmlFor="copy-chip-story" className="block text-sm font-semibold leading-8">
        Type <CopyChip {...args} /> to confirm
      </label>
      <input
        id="copy-chip-story"
        type="email"
        className="mt-2 block w-full rounded-md border-2 border-input px-3 py-2"
      />
    </div>
  ),
}

export const NeverWraps: Story = { args: { breakAfter: undefined } }
