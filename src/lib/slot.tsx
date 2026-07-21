import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"

type AnyProps = Record<string, unknown>

/** Props accepted by Slot. */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}

/**
 * Marks which child of a Slot receives the merged props when the Slot has
 * multiple children (e.g. a trailing badge that must stay outside the link).
 */
function Slottable({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function isSlottable(
  child: React.ReactNode
): child is React.ReactElement<{ children: React.ReactNode }> {
  return React.isValidElement(child) && child.type === Slottable
}

function composeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> | undefined {
  const filtered = refs.filter((ref) => ref != null)
  if (filtered.length === 0) return undefined
  return (node: T | null) => {
    for (const ref of filtered) {
      if (typeof ref === "function") ref(node)
      else (ref as React.RefObject<T | null>).current = node
    }
  }
}

function buildProps(
  child: React.ReactElement,
  slotProps: AnyProps,
  ref: React.Ref<HTMLElement> | undefined
): AnyProps {
  const childProps = child.props as AnyProps
  // Child props win over slot props; className/style are joined and event
  // handlers chained (child handler first), matching Radix Slot semantics.
  const merged = mergeProps(slotProps, childProps) as AnyProps
  merged.ref = composeRefs(
    ref,
    (childProps.ref ?? (child as { ref?: React.Ref<HTMLElement> }).ref) as
      | React.Ref<HTMLElement>
      | undefined
  )
  return merged
}

/**
 * Merges its props onto its immediate child element instead of rendering a
 * DOM node of its own — the primitive behind every `asChild` prop in this
 * library. Drop-in replacement for `@radix-ui/react-slot`, built on Base UI's
 * `mergeProps`.
 */
function Slot({ children, ref, ...slotProps }: SlotProps) {
  const childrenArray = React.Children.toArray(children)
  const slottable = childrenArray.find(isSlottable)

  if (slottable) {
    const target = slottable.props.children
    if (!React.isValidElement(target)) return null
    const targetChildren = (target.props as AnyProps)
      .children as React.ReactNode
    const newChildren = childrenArray.map((child) =>
      child === slottable ? targetChildren : child
    )
    return React.cloneElement(
      target,
      buildProps(target, slotProps as AnyProps, ref),
      ...newChildren
    )
  }

  const child = React.Children.only(children)
  if (!React.isValidElement(child)) return null
  return React.cloneElement(child, buildProps(child, slotProps as AnyProps, ref))
}

/** Props added by {@link withAsChild}. */
export interface AsChildProps {
  /** Merge props onto the child element instead of rendering the default element. */
  asChild?: boolean
}

/**
 * Adds Radix-style `asChild` support to a Base UI part by translating
 * `asChild` + `children` into Base UI's `render` prop.
 */
function withAsChild<P extends { render?: unknown; children?: React.ReactNode }>(
  Component: React.ComponentType<P>
) {
  function ComponentWithAsChild({
    asChild,
    children,
    ...props
  }: P & AsChildProps) {
    if (asChild && React.isValidElement(children)) {
      return <Component {...(props as P)} render={children} />
    }
    return <Component {...(props as P)}>{children}</Component>
  }
  return ComponentWithAsChild
}

export { Slot, Slottable, withAsChild }
