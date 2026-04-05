import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./resizable"

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "Layout/Resizable",
  component: ResizablePanelGroup,
}

export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

export const Default: Story = {
  render: () => (
    <div className="h-48 w-96 rounded-lg border-2">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 font-mono text-xs">
            One
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 font-mono text-xs">
            Two
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="h-64 w-64 rounded-lg border-2">
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 font-mono text-xs">Top</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 font-mono text-xs">Bottom</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
}
