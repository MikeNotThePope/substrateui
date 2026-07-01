import type { Meta, StoryObj } from "@storybook/react-vite"

import { NavTabs, NavTabsLink } from "./nav-tabs"

const meta: Meta<typeof NavTabs> = {
  title: "Navigation/NavTabs",
  component: NavTabs,
  render: () => (
    <NavTabs className="w-96">
      <NavTabsLink href="#applications" active>
        Applications
      </NavTabsLink>
      <NavTabsLink href="#questionnaire" badge={2}>
        Questionnaire
      </NavTabsLink>
      <NavTabsLink href="#faq" disabled>
        FAQ
      </NavTabsLink>
    </NavTabs>
  ),
}

export default meta
type Story = StoryObj<typeof NavTabs>

export const Default: Story = {}
