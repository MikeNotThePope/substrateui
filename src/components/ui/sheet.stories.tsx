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

/**
 * Below `lg` this is the drawer it has always been. At or above it there is no
 * dialog at all: the rail is an `<aside>` beside the content, the scrim and
 * the close button are gone, and the trigger is `hidden` and `inert` with
 * nothing left to claim. Drag the preview frame across 1024px to watch the
 * pattern change, not just the layout.
 */
export const Docking: Story = {
  render: () => (
    <Sheet dockAt="lg">
      <div className="flex items-start gap-6">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-sm">
            Senior Platform Engineer, and the twelve people who applied.
          </p>
          <SheetTrigger render={<Button variant="outline" />}>Job details</SheetTrigger>
        </div>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Job details</SheetTitle>
            <SheetDescription>Pay, location and the hiring team.</SheetDescription>
          </SheetHeader>
          <p className="text-sm text-muted-foreground">
            Remote, or the Leeds office two days a week.
          </p>
        </SheetContent>
      </div>
    </Sheet>
  ),
}
