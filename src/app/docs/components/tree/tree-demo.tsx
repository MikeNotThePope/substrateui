"use client"

import * as React from "react"
import { File, FileCode, Folder, Image } from "lucide-react"

import { Tree, type TreeNode } from "@/components/ui/tree"

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
          { id: "button", label: "button.tsx", icon: FileCode },
          { id: "tree", label: "tree.tsx", icon: FileCode },
        ],
      },
      { id: "index", label: "index.ts", icon: FileCode },
    ],
  },
  {
    id: "assets",
    label: "assets",
    icon: Folder,
    children: [{ id: "logo", label: "logo.svg", icon: Image }],
  },
  { id: "readme", label: "README.md", icon: File },
]

export function TreeDemo() {
  const [selected, setSelected] = React.useState<string | null>("tree")
  return (
    <div className="w-full max-w-xs space-y-3">
      <Tree
        aria-label="Project files"
        data={files}
        defaultExpandedIds={["src", "components"]}
        selectedId={selected}
        onSelect={setSelected}
      />
      <p className="font-mono text-xs text-muted-foreground">selected: {selected ?? "none"}</p>
    </div>
  )
}
