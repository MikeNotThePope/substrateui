"use client"

import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

/** Extracts the plain text of a React node, used to derive item values. */
function textContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textContent).join("")
  if (React.isValidElement(node)) {
    return textContent((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

function matches(text: string, query: string) {
  return text.toLowerCase().includes(query.trim().toLowerCase())
}

interface CommandContextValue {
  query: string
  matchCount: number
  register: (id: string, text: string) => () => void
}

/**
 * Items register their filter text here so the palette can filter statically
 * declared children (Base UI's Autocomplete only filters items passed via the
 * `items` prop) and CommandEmpty can know when nothing matches.
 */
const CommandContext = React.createContext<CommandContextValue | null>(null)

/**
 * Command palette container with built-in search and keyboard navigation.
 *
 * @example
 * <Command><CommandInput /><CommandList><CommandItem>Action</CommandItem></CommandList></Command>
 */
function Command({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const [query, setQuery] = React.useState("")
  const registry = React.useRef(new Map<string, string>())
  const [, bump] = React.useReducer((x: number) => x + 1, 0)

  const register = React.useCallback((id: string, text: string) => {
    registry.current.set(id, text)
    bump()
    return () => {
      registry.current.delete(id)
      bump()
    }
  }, [])

  const matchCount = query
    ? [...registry.current.values()].filter((t) => matches(t, query)).length
    : registry.current.size

  const context = React.useMemo(
    () => ({ query, matchCount, register }),
    [query, matchCount, register]
  )

  return (
    <CommandContext.Provider value={context}>
      <AutocompletePrimitive.Root
        open
        inline
        mode="none"
        autoHighlight="always"
        value={query}
        onValueChange={setQuery}
      >
        <div
          ref={ref}
          data-slot="command"
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-lg border-2 bg-popover text-popover-foreground shadow-hard",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AutocompletePrimitive.Root>
    </CommandContext.Provider>
  )
}

/** Command palette rendered inside a modal dialog. */
function CommandDialog({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-hard-lg">
        <Command className="[&_[data-slot=command-group-heading]]:px-2 [&_[data-slot=command-group-heading]]:font-medium [&_[data-slot=command-group-heading]]:text-muted-foreground [&_[data-slot=command-group]]:px-2 [&_[data-slot=command-input-wrapper]_svg]:h-5 [&_[data-slot=command-input-wrapper]_svg]:w-5 [&_[data-slot=command-input]]:h-12 [&_[data-slot=command-item]]:px-2 [&_[data-slot=command-item]]:py-3 [&_[data-slot=command-item]_svg]:h-5 [&_[data-slot=command-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

/** Search input field within a Command palette. */
function CommandInput({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AutocompletePrimitive.Input>) {
  return (
    <div
      className="flex items-center border-b-2 px-3"
      data-slot="command-input-wrapper"
    >
      <Search className="me-2 h-4 w-4 shrink-0 opacity-50" />
      <AutocompletePrimitive.Input
        ref={ref}
        data-slot="command-input"
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

/** Scrollable list container for command items and groups. */
function CommandList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AutocompletePrimitive.List>) {
  return (
    <AutocompletePrimitive.List
      ref={ref}
      data-slot="command-list"
      className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  )
}

/** Placeholder shown when no command items match the search query. */
function CommandEmpty({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const context = React.useContext(CommandContext)
  if (!context || !context.query || context.matchCount > 0) return null
  return (
    <div
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )
}

/** Labeled group of related command items. Hides itself when no items match. */
function CommandGroup({
  className,
  children,
  heading,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AutocompletePrimitive.Group> & {
  heading?: React.ReactNode
}) {
  return (
    <AutocompletePrimitive.Group
      ref={ref}
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground [&:not(:has([data-slot=command-item]))]:hidden",
        className
      )}
      {...props}
    >
      {heading != null && (
        <AutocompletePrimitive.GroupLabel
          data-slot="command-group-heading"
          className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
        >
          {heading}
        </AutocompletePrimitive.GroupLabel>
      )}
      {children}
    </AutocompletePrimitive.Group>
  )
}

/** Horizontal divider between command groups or items. Hidden while searching. */
function CommandSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const context = React.useContext(CommandContext)
  if (context?.query) return null
  return (
    <div
      ref={ref}
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Selectable action item within a CommandList. */
function CommandItem({
  className,
  value,
  keywords,
  onSelect,
  onClick,
  children,
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof AutocompletePrimitive.Item>,
  "value"
> & {
  /** Value used for filtering and selection; derived from text content when omitted. */
  value?: string
  /** Extra strings matched by the filter in addition to the value. */
  keywords?: string[]
  /** Called when the item is activated by click or Enter. */
  onSelect?: (value: string) => void
}) {
  const id = React.useId()
  const context = React.useContext(CommandContext)
  const derivedValue = value ?? textContent(children)
  const filterText = keywords?.length
    ? [derivedValue, ...keywords].join(" ")
    : derivedValue

  const register = context?.register
  React.useEffect(() => {
    return register?.(id, filterText)
  }, [register, id, filterText])

  if (context && context.query && !matches(filterText, context.query)) {
    return null
  }

  return (
    <AutocompletePrimitive.Item
      ref={ref}
      data-slot="command-item"
      value={derivedValue}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        onClick?.(event)
        onSelect?.(derivedValue)
      }}
      className={cn(
        "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-surface-interactive data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </AutocompletePrimitive.Item>
  )
}

/** Keyboard shortcut hint displayed alongside a CommandItem. */
function CommandShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
