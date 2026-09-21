import type { Meta, StoryObj } from "@storybook/react-vite"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  render: (args) => (
    <Tabs {...args} className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm">Account settings panel.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm">Password settings panel.</p>
      </TabsContent>
    </Tabs>
  ),
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = { args: { defaultValue: "account" } }

/**
 * Below `lg` this is the tabs pattern. At or above it there is no tablist at
 * all: each label is a heading and each pane a region named by it. Drag the
 * preview frame across 1024px to watch the pattern change, not just the
 * layout.
 */
export const Unstacking: Story = {
  args: { defaultValue: "resume" },
  render: () => (
    <Tabs defaultValue="resume" unstackAt="lg" headingLevel={4}>
      <TabsList>
        <TabsTrigger value="resume">Résumé</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <p className="text-sm">Eight years of back-end work, three of them on payments.</p>
      </TabsContent>
      <TabsContent value="notes">
        <p className="text-sm">Screening call went long in a good way.</p>
      </TabsContent>
    </Tabs>
  ),
}
