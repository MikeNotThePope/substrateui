"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** A node in a {@link Tree}. */
export interface TreeNode {
  /** Unique id across the whole tree. */
  id: string
  label: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ComponentType<{ className?: string }>
  /** Child nodes; presence makes the node expandable. */
  children?: TreeNode[]
  /** Dim and skip in keyboard navigation / selection. */
  disabled?: boolean
}

/** A flattened, currently-visible node with positional metadata. */
interface FlatNode {
  node: TreeNode
  level: number
  parentId: string | null
  /** Index among its siblings (1-based, for aria-posinset). */
  posInSet: number
  setSize: number
}

function flattenVisible(
  nodes: TreeNode[],
  expanded: Set<string>,
  level = 1,
  parentId: string | null = null
): FlatNode[] {
  const out: FlatNode[] = []
  nodes.forEach((node, i) => {
    out.push({ node, level, parentId, posInSet: i + 1, setSize: nodes.length })
    if (node.children?.length && expanded.has(node.id)) {
      out.push(...flattenVisible(node.children, expanded, level + 1, node.id))
    }
  })
  return out
}

/** Minimal controlled/uncontrolled state helper. */
function useControlled<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const isControlled = controlled !== undefined
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const value = isControlled ? (controlled as T) : uncontrolled
  const set = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )
  return [value, set]
}

/** Props for the Tree component. */
export interface TreeProps extends Omit<React.ComponentPropsWithRef<"div">, "onSelect"> {
  /** The hierarchical data to render. */
  data: TreeNode[]
  /** Ids expanded by default (uncontrolled). */
  defaultExpandedIds?: string[]
  /** Controlled set of expanded ids. */
  expandedIds?: string[]
  /** Called when the expanded set changes. */
  onExpandedChange?: (ids: string[]) => void
  /** Selected id by default (uncontrolled). */
  defaultSelectedId?: string | null
  /** Controlled selected id. */
  selectedId?: string | null
  /** Called when the selection changes. */
  onSelect?: (id: string) => void
  /** Accessible label for the tree. */
  "aria-label"?: string
}

interface TreeContextValue {
  expanded: Set<string>
  selectedId: string | null
  focusedId: string | null
  toggleExpand: (id: string) => void
  select: (id: string) => void
  setFocusedId: (id: string) => void
}

const TreeContext = React.createContext<TreeContextValue | null>(null)

/**
 * A hierarchical tree view — file explorers, nested navigation, category
 * pickers. Expand/collapse, single selection, and full keyboard support
 * following the ARIA tree pattern. Expanded and selected state can be
 * controlled or left uncontrolled.
 *
 * Keyboard: ↑/↓ move, → expand or enter, ← collapse or go to parent,
 * Enter/Space select, Home/End jump.
 *
 * @example
 * <Tree
 *   aria-label="Files"
 *   data={[{ id: "src", label: "src", children: [{ id: "app", label: "app.tsx" }] }]}
 *   defaultExpandedIds={["src"]}
 *   onSelect={setActive}
 * />
 */
function Tree({
  data,
  defaultExpandedIds = [],
  expandedIds,
  onExpandedChange,
  defaultSelectedId = null,
  selectedId: selectedIdProp,
  onSelect,
  className,
  ref,
  ...props
}: TreeProps) {
  const [expandedArr, setExpandedArr] = useControlled<string[]>(
    expandedIds,
    defaultExpandedIds,
    onExpandedChange
  )
  const expanded = React.useMemo(() => new Set(expandedArr), [expandedArr])

  const [selectedId, setSelectedId] = useControlled<string | null>(
    selectedIdProp,
    defaultSelectedId,
    (id) => id != null && onSelect?.(id)
  )

  const flat = React.useMemo(() => flattenVisible(data, expanded), [data, expanded])
  const firstId = flat[0]?.node.id ?? null
  const [focusedId, setFocusedId] = React.useState<string | null>(null)
  const activeFocusId = focusedId ?? selectedId ?? firstId

  const containerRef = React.useRef<HTMLDivElement>(null)
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const toggleExpand = React.useCallback(
    (id: string) => {
      const next = new Set(expanded)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      setExpandedArr([...next])
    },
    [expanded, setExpandedArr]
  )

  const focusId = React.useCallback((id: string) => {
    setFocusedId(id)
    const el = containerRef.current?.querySelector<HTMLElement>(`[data-tree-id="${CSS.escape(id)}"]`)
    el?.focus()
  }, [])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = activeFocusId
    if (!current) return
    const index = flat.findIndex((f) => f.node.id === current)
    if (index === -1) return
    const entry = flat[index]
    const { node } = entry
    const isExpandable = !!node.children?.length
    const isOpen = expanded.has(node.id)

    const moveTo = (i: number) => {
      const target = flat[i]
      if (target) focusId(target.node.id)
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        moveTo(Math.min(index + 1, flat.length - 1))
        break
      case "ArrowUp":
        event.preventDefault()
        moveTo(Math.max(index - 1, 0))
        break
      case "ArrowRight":
        event.preventDefault()
        if (isExpandable && !isOpen) toggleExpand(node.id)
        else if (isExpandable && isOpen) moveTo(index + 1)
        break
      case "ArrowLeft":
        event.preventDefault()
        if (isExpandable && isOpen) {
          toggleExpand(node.id)
        } else if (entry.parentId) {
          focusId(entry.parentId)
        }
        break
      case "Home":
        event.preventDefault()
        moveTo(0)
        break
      case "End":
        event.preventDefault()
        moveTo(flat.length - 1)
        break
      case "Enter":
      case " ":
        event.preventDefault()
        if (!node.disabled) setSelectedId(node.id)
        if (isExpandable) toggleExpand(node.id)
        break
      default:
        break
    }
  }

  const ctx = React.useMemo<TreeContextValue>(
    () => ({
      expanded,
      selectedId,
      focusedId: activeFocusId,
      toggleExpand,
      select: (id) => setSelectedId(id),
      setFocusedId: focusId,
    }),
    [expanded, selectedId, activeFocusId, toggleExpand, setSelectedId, focusId]
  )

  return (
    <TreeContext.Provider value={ctx}>
      <div
        ref={mergedRef}
        role="tree"
        data-slot="tree"
        className={cn("text-sm", className)}
        onKeyDown={onKeyDown}
        {...props}
      >
        {data.map((node, i) => (
          <TreeItem key={node.id} node={node} level={1} posInSet={i + 1} setSize={data.length} />
        ))}
      </div>
    </TreeContext.Provider>
  )
}

interface TreeItemProps {
  node: TreeNode
  level: number
  posInSet: number
  setSize: number
}

function TreeItem({ node, level, posInSet, setSize }: TreeItemProps) {
  const ctx = React.useContext(TreeContext)
  if (!ctx) throw new Error("TreeItem must be used within a Tree")

  const isExpandable = !!node.children?.length
  const isOpen = ctx.expanded.has(node.id)
  const isSelected = ctx.selectedId === node.id
  const isFocusTarget = ctx.focusedId === node.id
  const Icon = node.icon

  return (
    <div role="treeitem" aria-expanded={isExpandable ? isOpen : undefined} aria-selected={isSelected} aria-level={level} aria-posinset={posInSet} aria-setsize={setSize} aria-disabled={node.disabled || undefined}>
      <div
        data-tree-id={node.id}
        data-slot="tree-item"
        data-selected={isSelected ? "" : undefined}
        tabIndex={isFocusTarget ? 0 : -1}
        style={{ paddingInlineStart: (level - 1) * 20 + 8 }}
        onClick={() => {
          if (node.disabled) return
          ctx.setFocusedId(node.id)
          ctx.select(node.id)
          if (isExpandable) ctx.toggleExpand(node.id)
        }}
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 pe-2 outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          "hover:bg-accent hover:text-accent-foreground",
          isSelected && "bg-accent font-medium text-accent-foreground",
          node.disabled && "pointer-events-none opacity-50"
        )}
      >
        <span
          aria-hidden
          className="flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4"
        >
          {isExpandable && (
            <ChevronRight
              className={cn(
                "transition-transform motion-reduce:transition-none rtl:-scale-x-100",
                isOpen && "rotate-90"
              )}
            />
          )}
        </span>
        {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
        <span className="truncate">{node.label}</span>
      </div>

      {isExpandable && isOpen && (
        <div role="group">
          {node.children!.map((child, i) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              posInSet={i + 1}
              setSize={node.children!.length}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { Tree }
