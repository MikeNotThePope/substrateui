import type { Meta, StoryObj } from "@storybook/react-vite"

import { Banner } from "./banner"

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "info", "warning"] },
  },
}

export default meta
type Story = StoryObj<typeof Banner>

export const Default: Story = {
  render: (args) => (
    <Banner {...args}>
      <p>
        SubstrateUI v1.3 is out.{" "}
        <a href="#" className="font-semibold underline underline-offset-4">
          See what&apos;s new
        </a>
        .
      </p>
    </Banner>
  ),
}

export const Primary: Story = { ...Default, args: { variant: "primary" } }
export const Info: Story = { ...Default, args: { variant: "info" } }
export const Warning: Story = { ...Default, args: { variant: "warning" } }

export const NotDismissible: Story = {
  ...Default,
  args: { dismissible: false, variant: "info" },
}
