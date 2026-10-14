import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardRaised,
  CardTitle,
} from "./card"

const meta: Meta<typeof Card> = {
  title: "Data Display/Card",
  component: Card,
  argTypes: {
    interactive: { control: "boolean" },
  },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}
export const Interactive: Story = { args: { interactive: true } }

/** The title is the link and opens the card from anywhere; the address beside it selects. */
export const Linked: Story = {
  render: () => (
    <Card className="flex w-80 items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <CardLink href="#" className="font-medium">
          Maya Chen
        </CardLink>
        <CardRaised render={<p />} className="truncate text-sm text-muted-foreground">
          maya.chen@example.com
        </CardRaised>
      </div>
      <CardRaised render={<span />} className="text-sm text-muted-foreground">
        10/9/2026
      </CardRaised>
    </Card>
  ),
}
