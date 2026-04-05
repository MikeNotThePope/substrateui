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
