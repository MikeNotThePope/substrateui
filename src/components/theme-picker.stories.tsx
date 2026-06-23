import type { Meta, StoryObj } from "@storybook/react-vite"

import { SiteThemeProvider, ThemePicker } from "./theme-picker"

const meta: Meta<typeof ThemePicker> = {
  title: "Forms/ThemePicker",
  component: ThemePicker,
  decorators: [
    (Story) => (
      <SiteThemeProvider>
        <div className="w-64">
          <Story />
        </div>
      </SiteThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ThemePicker>

export const Default: Story = {}

export const WithCustomLabel: Story = {
  args: { labels: { theme: "Appearance" } },
}
