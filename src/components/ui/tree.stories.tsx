import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { File, Folder, Image, Settings } from "lucide-react"

import { Tree, type TreeNode } from "./tree"

const meta: Meta<typeof Tree> = {
  title: "Data Display/Tree",
  component: Tree,
}

export default meta
type Story = StoryObj<typeof Tree>

const files: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: Folder,
    children: [
      {
        id: "components",
        label: "components",
        icon: Folder,
        children: [
          { id: "button", label: "button.tsx", icon: File },
          { id: "tree", label: "tree.tsx", icon: File },
        ],
      },
      { id: "index", label: "index.ts", icon: File },
    ],
  },
  {
    id: "assets",
    label: "assets",
    icon: Folder,
    children: [{ id: "logo", label: "logo.svg", icon: Image }],
  },
  { id: "config", label: "config.ts", icon: Settings, disabled: true },
]

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <Tree aria-label="Files" data={files} defaultExpandedIds={["src", "components"]} />
    </div>
  ),
}

function ControlledTree() {
  const [selected, setSelected] = React.useState<string | null>("button")
  return (
    <div className="w-72 space-y-3">
      <Tree
        aria-label="Files"
        data={files}
        defaultExpandedIds={["src", "components"]}
        selectedId={selected}
        onSelect={setSelected}
      />
      <p className="font-mono text-xs text-muted-foreground">selected: {selected ?? "none"}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTree />,
}
