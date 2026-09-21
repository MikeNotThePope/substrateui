import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Inbox, MessageCircle, RefreshCw } from "lucide-react"

import {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelFooter,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
} from "./corner-panel"
import { Button } from "./button"
import { Stack } from "./stack"
import { Textarea } from "./textarea"

const meta: Meta<typeof CornerPanel> = {
  title: "Overlays/CornerPanel",
  component: CornerPanel,
}

export default meta
type Story = StoryObj<typeof CornerPanel>

const messages = [
  "Thanks for getting in touch — someone will be with you shortly.",
  "In the meantime, the status page has the current incident list.",
  "Is there anything else you can tell us about what you were doing?",
]

/**
 * The launcher sits in the bottom end corner of the viewport. Open it, then
 * press Escape, or Tab past the last control and watch focus come back around.
 */
export const Default: Story = {
  render: () => (
    <div className="h-80">
      <CornerPanel>
        <CornerPanelTrigger aria-label="Open chat">
          <MessageCircle />
        </CornerPanelTrigger>
        <CornerPanelContent>
          <CornerPanelHeader actions={<CornerPanelClose />}>
            <CornerPanelTitle>Chat</CornerPanelTitle>
          </CornerPanelHeader>
          <CornerPanelBody>
            <Stack gap="sm">
              {messages.map((message) => (
                <p key={message} className="text-sm">
                  {message}
                </p>
              ))}
            </Stack>
          </CornerPanelBody>
          <CornerPanelFooter>
            <Stack gap="sm">
              <Textarea rows={2} aria-label="Message" placeholder="Write a reply…" />
              <Button size="sm" className="self-end">
                Send
              </Button>
            </Stack>
          </CornerPanelFooter>
        </CornerPanelContent>
      </CornerPanel>
    </div>
  ),
}

/** `actions` takes whatever belongs beside the title — Refresh, then Close. */
export const WithHeaderActions: Story = {
  render: () => (
    <div className="h-80">
      <CornerPanel defaultOpen>
        <CornerPanelTrigger aria-label="Open inbox">
          <Inbox />
        </CornerPanelTrigger>
        <CornerPanelContent>
          <CornerPanelHeader
            actions={
              <>
                <Button variant="ghost" size="icon-sm" aria-label="Refresh">
                  <RefreshCw />
                </Button>
                <CornerPanelClose />
              </>
            }
          >
            <CornerPanelTitle>Inbox</CornerPanelTitle>
          </CornerPanelHeader>
          <CornerPanelBody>
            <Stack gap="sm">
              {Array.from({ length: 12 }, (_, i) => (
                <p key={i} className="text-sm">
                  Message {i + 1}
                </p>
              ))}
            </Stack>
          </CornerPanelBody>
        </CornerPanelContent>
      </CornerPanel>
    </div>
  ),
}

function ControlledDemo() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="h-80">
      <Stack gap="md">
        <Button variant="outline" onClick={() => setOpen((o) => !o)}>
          {open ? "Close the panel from out here" : "Open the panel from out here"}
        </Button>
        <CornerPanel open={open} onOpenChange={setOpen}>
          <CornerPanelTrigger aria-label="Open chat">
            <MessageCircle />
          </CornerPanelTrigger>
          <CornerPanelContent>
            <CornerPanelHeader actions={<CornerPanelClose />}>
              <CornerPanelTitle>Chat</CornerPanelTitle>
            </CornerPanelHeader>
            <CornerPanelBody>
              <p className="text-sm">Open state lives outside the panel.</p>
            </CornerPanelBody>
          </CornerPanelContent>
        </CornerPanel>
      </Stack>
    </div>
  )
}

/** Drive it from anywhere — a route change, a notification, a menu item. */
export const Controlled: Story = {
  render: () => <ControlledDemo />,
}
