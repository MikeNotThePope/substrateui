import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"

/**
 * Composes any number of refs into a single callback ref, so both the slotted
 * child's ref and the slot's own ref receive the DOM node.
 */
function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref != null) {
        ;(ref as React.RefObject<T | null>).current = node
      }
    }
  }
}

function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
  return (element.props as { ref?: React.Ref<unknown> }).ref
}

const SLOTTABLE = Symbol("substrateui.slottable")

interface SlottableProps {
  children: React.ReactNode
}

/**
 * Marks where the slotted child should land when `Slot` renders siblings
 * around it (e.g. a trailing badge). The child element replaces this marker;
 * everything else stays inside the merged element.
 */
function Slottable({ children }: SlottableProps) {
  return <>{children}</>
}
Slottable.__substrateuiSlottable = SLOTTABLE

function isSlottable(
  child: React.ReactNode
): child is React.ReactElement<SlottableProps> {
  return (
    React.isValidElement(child) &&
    typeof child.type === "function" &&
    (child.type as { __substrateuiSlottable?: symbol }).__substrateuiSlottable ===
      SLOTTABLE
  )
}

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>
  children?: React.ReactNode
}

/**
 * Merges its props onto its single element child instead of rendering an
 * element of its own — the mechanism behind every `asChild` prop in this
 * library. Child props win over slot props; `className` is concatenated,
 * `style` objects are merged, and event handlers are chained.
 */
function Slot({ children, ref, ...slotProps }: SlotProps) {
  const childArray = React.Children.toArray(children)
  const slottable = childArray.find(isSlottable)

  if (slottable) {
    const slotted = slottable.props.children
    if (!React.isValidElement(slotted)) {
      return null
    }
    const newChildren = childArray.map((child) =>
      child === slottable
        ? (slotted.props as { children?: React.ReactNode }).children
        : child
    )
    return React.cloneElement(
      slotted,
      {
        ...mergeProps(slotProps, omitChildren(slotted.props as object)),
        ref: composeRefs(ref, getElementRef(slotted)),
      } as object,
      ...newChildren
    )
  }

  if (!React.isValidElement(children)) {
    return null
  }
  return React.cloneElement(children, {
    ...mergeProps(slotProps, omitChildren(children.props as object)),
    ref: composeRefs(ref, getElementRef(children)),
  } as object)
}

function omitChildren<T extends object>(props: T): Omit<T, "children" | "ref"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _children, ref: _ref, ...rest } = props as T & {
    children?: React.ReactNode
    ref?: React.Ref<unknown>
  }
  return rest
}

export { Slot, Slottable, composeRefs }
