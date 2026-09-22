import type { Meta, StoryObj } from "@storybook/react-vite"
import { MessageCircle, Plus, Wrench } from "lucide-react"

import { FloatingAction } from "./floating-action"
import {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
} from "./corner-panel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { P } from "./typography"

const meta: Meta<typeof FloatingAction> = {
  title: "Overlays/FloatingAction",
  component: FloatingAction,
}

export default meta
type Story = StoryObj<typeof FloatingAction>

/**
 * On its own it is a button in the corner. Everything else on this page is
 * about what it is handed to.
 */
export const Default: Story = {
  render: () => (
    <div className="h-80">
      <FloatingAction aria-label="New message">
        <Plus />
      </FloatingAction>
    </div>
  ),
}

/**
 * The menu is `DropdownMenu`'s, not this component's. Arrow up and down to see
 * the highlight wrap, press Escape to close, or Tab past the last item and
 * watch it close behind you.
 */
export const WithAMenu: Story = {
  render: () => (
    <div className="h-80">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <FloatingAction aria-label="Test tools">
              <Wrench />
            </FloatingAction>
          }
        />
        <DropdownMenuContent positionMethod="fixed" side="top" align="end" className="w-52">
          <DropdownMenuItem>Accounts</DropdownMenuItem>
          <DropdownMenuItem>Inbox</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Load test data</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

/**
 * The corner holds one launcher. A second one lifts clear of the first with
 * `lift`, rather than each caller re-deriving the same 92 pixels.
 */
export const SharingTheCorner: Story = {
  render: () => (
    <div className="h-80">
      <P className="text-sm text-muted-foreground">
        The chat launcher keeps the corner; the tools launcher sits one above it.
      </P>
      <CornerPanel>
        <CornerPanelTrigger aria-label="Open chat">
          <MessageCircle />
        </CornerPanelTrigger>
        <CornerPanelContent>
          <CornerPanelHeader actions={<CornerPanelClose />}>
            <CornerPanelTitle>Chat</CornerPanelTitle>
          </CornerPanelHeader>
          <CornerPanelBody>
            <P className="text-sm">Someone will be with you shortly.</P>
          </CornerPanelBody>
        </CornerPanelContent>
      </CornerPanel>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <FloatingAction aria-label="Test tools" lift={1}>
              <Wrench />
            </FloatingAction>
          }
        />
        <DropdownMenuContent positionMethod="fixed" side="top" align="end" className="w-52">
          <DropdownMenuItem>Accounts</DropdownMenuItem>
          <DropdownMenuItem>Inbox</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
