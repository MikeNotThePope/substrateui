import type { Meta, StoryObj } from "@storybook/react-vite"

import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  args: {
    placeholder: "Type your message here.",
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: "Hello, world!" } }
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } }

/** Grows with its text to 18 lines, then scrolls. Type past the end to see the cap. */
export const GrowsWithText: Story = {
  args: {
    defaultValue: Array.from(
      { length: 8 },
      (_, i) =>
        `Line ${String(i + 1)}: a long answer reads whole while it is short enough, and scrolls once it passes the cap.`
    ).join("\n"),
  },
}
