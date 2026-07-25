import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import { Tree, type TreeNode } from "@/components/ui/tree"

const data: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "a", label: "a.tsx" },
      { id: "b", label: "b.tsx" },
    ],
  },
  { id: "readme", label: "README.md" },
]

describe("Tree", () => {
  it("renders roots and hides collapsed children", () => {
    render(<Tree aria-label="Files" data={data} />)
    expect(screen.getByText("src")).toBeInTheDocument()
    expect(screen.getByText("README.md")).toBeInTheDocument()
    expect(screen.queryByText("a.tsx")).not.toBeInTheDocument()
  })

  it("exposes the ARIA tree structure", () => {
    render(<Tree aria-label="Files" data={data} defaultExpandedIds={["src"]} />)
    expect(screen.getByRole("tree", { name: "Files" })).toBeInTheDocument()
    const src = screen.getByText("src").closest('[role="treeitem"]')
    expect(src).toHaveAttribute("aria-expanded", "true")
    expect(src).toHaveAttribute("aria-level", "1")
  })

  it("expands and collapses on click", () => {
    render(<Tree aria-label="Files" data={data} />)
    fireEvent.click(screen.getByText("src"))
    expect(screen.getByText("a.tsx")).toBeInTheDocument()
    fireEvent.click(screen.getByText("src"))
    expect(screen.queryByText("a.tsx")).not.toBeInTheDocument()
  })

  it("fires onSelect with the clicked node id", () => {
    const onSelect = vi.fn()
    render(<Tree aria-label="Files" data={data} onSelect={onSelect} />)
    fireEvent.click(screen.getByText("README.md"))
    expect(onSelect).toHaveBeenCalledWith("readme")
  })

  it("does not select a disabled node", () => {
    const onSelect = vi.fn()
    const withDisabled: TreeNode[] = [{ id: "x", label: "x", disabled: true }]
    render(<Tree aria-label="Files" data={withDisabled} onSelect={onSelect} />)
    fireEvent.click(screen.getByText("x"))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it("expands a collapsed node with ArrowRight", () => {
    render(<Tree aria-label="Files" data={data} />)
    const src = screen.getByText("src").closest('[data-tree-id="src"]') as HTMLElement
    src.focus()
    fireEvent.keyDown(src, { key: "ArrowRight" })
    expect(screen.getByText("a.tsx")).toBeInTheDocument()
  })
})
