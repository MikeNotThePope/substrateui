import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

const meta: Meta<typeof Sheet> = {
  title: "Overlays/Sheet",
  component: Sheet,
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {}
export const DefaultOpen: Story = { args: { defaultOpen: true } }
