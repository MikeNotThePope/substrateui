import { cn } from "@/lib/utils"

/**
 * The sub-component tree of a compound component, drawn in box-drawing
 * characters in the data face — the same treatment as an OKLCH readout,
 * because this is a spec, not prose.
 *
 * Compound components only. A single-element component's "tree" is one line
 * repeating the heading, which is furniture with no information in it.
 */

export interface CompositionNode {
  name: string
  children?: CompositionNode[]
}

/**
 * Renders one level. `prefix` carries the ancestors' rails: a vertical bar
 * where an ancestor still has siblings below it, blank where the branch has
 * already ended.
 */
function lines(nodes: CompositionNode[], prefix = ""): string[] {
  return nodes.flatMap((node, i) => {
    const last = i === nodes.length - 1
    const line = `${prefix}${last ? "└──" : "├──"} ${node.name}`
    const childLines = node.children?.length
      ? lines(node.children, `${prefix}${last ? "    " : "│   "}`)
      : []
    return [line, ...childLines]
  })
}

interface CompositionTreeProps {
  /** The outermost component — the trunk the tree hangs from. */
  root: string
  /** Named `nodes`, not `children`: this is data to draw, not React children. */
  nodes: CompositionNode[]
  className?: string
}

export function CompositionTree({ root, nodes, className }: CompositionTreeProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border-2 bg-surface-page p-4 font-mono text-xs leading-relaxed",
        className
      )}
    >
      <code>{[root, ...lines(nodes)].join("\n")}</code>
    </pre>
  )
}
