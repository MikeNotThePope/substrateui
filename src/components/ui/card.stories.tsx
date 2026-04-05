import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
