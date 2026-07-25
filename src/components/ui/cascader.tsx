"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronRight, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/** A node in a {@link Cascader}'s option tree. */
export interface CascaderOption {
  /** Unique among its siblings — a path is the list of values from root to node. */
  value: string
  label: React.ReactNode
  /** Child options; presence makes this option a branch rather than a leaf. */
  children?: CascaderOption[]
  /** Dim the option and block selecting it or drilling into it. */
  disabled?: boolean
}

/** Text overrides for a {@link Cascader}. */
export interface CascaderLabels {
  searchPlaceholder?: string
  empty?: string
  clear?: string
  /** Accessible name for the column at `depth` (0-based) when it has no parent. */
  level?: (depth: number) => string
}

const DEFAULT_LABELS: Required<CascaderLabels> = {
  searchPlaceholder: "Search...",
  empty: "No options",
  clear: "Clear selection",
  level: (depth) => `Level ${depth + 1}`,
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

/** Walks `path` down the option tree, returning the options it names. */
function findPath(
  options: CascaderOption[],
  path: string[]
): CascaderOption[] | null {
  const out: CascaderOption[] = []
  let level = options
  for (const value of path) {
    const found = level.find((option) => option.value === value)
    if (!found) return null
    out.push(found)
    level = found.children ?? []
  }
  return out
}

/** Best-effort plain text for a label, so search can match rendered nodes. */
function optionText(label: React.ReactNode): string {
  if (label == null || typeof label === "boolean") return ""
  if (typeof label === "string" || typeof label === "number") return String(label)
  if (Array.isArray(label)) return label.map(optionText).join(" ")
  if (React.isValidElement(label)) {
    return optionText((label.props as { children?: React.ReactNode }).children)
  }
  return ""
}

/** A complete root-to-node path, used for search results. */
interface FlatPath {
  values: string[]
  options: CascaderOption[]
}

/**
 * Every selectable path. Branches are included only when `includeBranches` is
 * set, mirroring how `changeOnSelect` widens what counts as a selection.
 */
function flattenPaths(
  options: CascaderOption[],
  includeBranches: boolean,
  prefixValues: string[] = [],
  prefixOptions: CascaderOption[] = []
): FlatPath[] {
  const out: FlatPath[] = []
  for (const option of options) {
    const values = [...prefixValues, option.value]
    const opts = [...prefixOptions, option]
    const isLeaf = !option.children?.length
    if (isLeaf || includeBranches) out.push({ values, options: opts })
    if (!isLeaf) {
      out.push(...flattenPaths(option.children!, includeBranches, values, opts))
    }
  }
  return out
}

function isRtl(element: HTMLElement) {
  return getComputedStyle(element).direction === "rtl"
}

/** Props for the Cascader component. */
export interface CascaderProps
  extends Omit<
    React.ComponentPropsWithRef<"button">,
    "onChange" | "value" | "defaultValue"
  > {
  /** The option tree to choose a path through. */
  options: CascaderOption[]
  /** Controlled selected path, root first. */
  value?: string[]
  /** Selected path on mount (uncontrolled). */
  defaultValue?: string[]
  /** Called with the new path and the options along it. */
  onChange?: (value: string[], options: CascaderOption[]) => void
  /** Shown when nothing is selected. */
  placeholder?: string
  /** Joins labels in the trigger and in search results. */
  separator?: string
  /** Let branches be selected too, not just leaves. */
  changeOnSelect?: boolean
  /** Add a filter box that searches whole paths. */
  showSearch?: boolean
  /** Show a button that resets the selection. */
  clearable?: boolean
  /** Replace the trigger's label rendering. */
  displayRender?: (
    labels: React.ReactNode[],
    options: CascaderOption[]
  ) => React.ReactNode
  /** Text overrides. */
  labels?: CascaderLabels
  /** Controlled popup open state. */
  open?: boolean
  /** Popup open state on mount (uncontrolled). */
  defaultOpen?: boolean
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Extra classes for the popup. */
  contentClassName?: string
}

/**
 * A nested-path select: drill through columns of options and commit the path
 * you land on. The standard control for category > subcategory > item pickers.
 *
 * @example
 * <Cascader
 *   options={regions}
 *   defaultValue={["asia", "jp"]}
 *   placeholder="Pick a city"
 *   showSearch
 * />
 */
function Cascader({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = "Select...",
  separator = " / ",
  changeOnSelect = false,
  showSearch = false,
  clearable = false,
  displayRender,
  labels,
  open: openProp,
  defaultOpen,
  onOpenChange,
  className,
  contentClassName,
  disabled,
  ref,
  ...props
}: CascaderProps) {
  const text = { ...DEFAULT_LABELS, ...labels }

  const [value, setValue] = useControlled<string[]>(valueProp, defaultValue ?? [])
  const [open, setOpen] = useControlled<boolean>(
    openProp,
    defaultOpen ?? false,
    onOpenChange
  )
  const [activePath, setActivePath] = React.useState<string[]>(value)
  const [query, setQuery] = React.useState("")
  const [pendingFocus, setPendingFocus] = React.useState<{
    col: number
    value?: string
  } | null>(null)

  const popupRef = React.useRef<HTMLDivElement>(null)
  const valueRef = React.useRef(value)

  // Declared first so the open effect below always reads the committed path
  // from the same commit, without making `value` a dependency of it.
  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  // Reopening should resume from the committed path, not wherever browsing
  // last left off.
  React.useEffect(() => {
    if (!open) {
      setQuery("")
      return
    }
    const path = valueRef.current
    setActivePath(path)
    setPendingFocus({ col: Math.max(0, path.length - 1), value: path.at(-1) })
  }, [open])

  const optionsIn = React.useCallback((col: number) => {
    const root = popupRef.current
    if (!root) return [] as HTMLButtonElement[]
    return Array.from(
      root.querySelectorAll<HTMLButtonElement>(
        `[data-cascader-col="${col}"] [data-slot="cascader-option"]`
      )
    )
  }, [])

  React.useEffect(() => {
    if (!pendingFocus) return
    const items = optionsIn(pendingFocus.col)
    const target = pendingFocus.value
      ? items.find((el) => el.dataset.cascaderValue === pendingFocus.value)
      : undefined
    ;(target ?? items[0])?.focus()
    setPendingFocus(null)
  }, [pendingFocus, optionsIn])

  const columns = React.useMemo(() => {
    const cols: Array<{ parent: CascaderOption | null; options: CascaderOption[] }> =
      [{ parent: null, options }]
    let level = options
    for (const value of activePath) {
      const found = level.find((option) => option.value === value)
      if (!found?.children?.length) break
      cols.push({ parent: found, options: found.children })
      level = found.children
    }
    return cols
  }, [options, activePath])

  const selectedOptions = React.useMemo(
    () => (value.length ? (findPath(options, value) ?? []) : []),
    [options, value]
  )

  const searching = showSearch && query.trim() !== ""
  const results = React.useMemo(() => {
    if (!searching) return [] as FlatPath[]
    const needle = query.trim().toLowerCase()
    return flattenPaths(options, changeOnSelect).filter((path) =>
      path.options
        .map((option) => optionText(option.label))
        .join(separator)
        .toLowerCase()
        .includes(needle)
    )
  }, [searching, query, options, changeOnSelect, separator])

  function commit(path: string[]) {
    setValue(path)
    onChange?.(path, findPath(options, path) ?? [])
  }

  function selectOption(col: number, option: CascaderOption) {
    if (option.disabled) return
    const path = [...activePath.slice(0, col), option.value]
    setActivePath(path)
    const isLeaf = !option.children?.length
    if (isLeaf || changeOnSelect) commit(path)
    if (isLeaf) setOpen(false)
    else setPendingFocus({ col: col + 1 })
  }

  function handleOptionKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    col: number,
    index: number,
    option: CascaderOption
  ) {
    const rtl = isRtl(event.currentTarget)
    const forward = rtl ? "ArrowLeft" : "ArrowRight"
    const back = rtl ? "ArrowRight" : "ArrowLeft"

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      const items = optionsIn(col)
      const step = event.key === "ArrowDown" ? 1 : -1
      items[(index + step + items.length) % items.length]?.focus()
      return
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault()
      const items = optionsIn(col)
      ;(event.key === "Home" ? items[0] : items.at(-1))?.focus()
      return
    }
    if (event.key === forward) {
      event.preventDefault()
      if (!option.disabled && option.children?.length) {
        setActivePath([...activePath.slice(0, col), option.value])
        setPendingFocus({ col: col + 1 })
      }
      return
    }
    if (event.key === back && col > 0) {
      event.preventDefault()
      setPendingFocus({ col: col - 1, value: activePath[col - 1] })
    }
  }

  const display = selectedOptions.length
    ? displayRender
      ? displayRender(
          selectedOptions.map((option) => option.label),
          selectedOptions
        )
      : selectedOptions.map((option, i) => (
          <React.Fragment key={option.value}>
            {i > 0 && <span className="text-muted-foreground">{separator}</span>}
            {option.label}
          </React.Fragment>
        ))
    : null

  const showClear = clearable && selectedOptions.length > 0 && !disabled

  return (
    <div data-slot="cascader" className={cn("relative w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={ref}
          data-slot="cascader-trigger"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border-2 border-input bg-background px-3 py-2 text-start text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            showClear && "pe-14"
          )}
          {...props}
        >
          <span className="line-clamp-1">
            {display ?? (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </PopoverTrigger>

        {showClear && (
          <button
            type="button"
            data-slot="cascader-clear"
            aria-label={text.clear}
            onClick={() => commit([])}
            className="absolute end-8 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <PopoverContent
          ref={popupRef}
          align="start"
          className={cn("w-auto p-0", contentClassName)}
        >
          {showSearch && (
            <div className="border-b-2 p-2">
              <Input
                data-slot="cascader-search"
                aria-label={text.searchPlaceholder}
                placeholder={text.searchPlaceholder}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-8"
              />
            </div>
          )}

          {searching ? (
            <div
              data-slot="cascader-results"
              data-cascader-col="0"
              role="listbox"
              aria-label={text.searchPlaceholder}
              className="max-h-64 min-w-56 overflow-y-auto p-1"
            >
              {results.length === 0 ? (
                <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                  {text.empty}
                </p>
              ) : (
                results.map((path) => {
                  const pathDisabled = path.options.some((o) => o.disabled)
                  const selected = path.values.join(" ") === value.join(" ")
                  return (
                    <button
                      key={path.values.join(" ")}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      disabled={pathDisabled}
                      data-slot="cascader-option"
                      data-cascader-value={path.values.at(-1)}
                      onClick={() => {
                        commit(path.values)
                        setOpen(false)
                      }}
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-sm hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <span className="flex-1">
                        {path.options.map((option, i) => (
                          <React.Fragment key={option.value}>
                            {i > 0 && (
                              <span className="text-muted-foreground">
                                {separator}
                              </span>
                            )}
                            {option.label}
                          </React.Fragment>
                        ))}
                      </span>
                      {selected && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  )
                })
              )}
            </div>
          ) : (
            <div data-slot="cascader-columns" className="flex items-stretch">
              {columns.map((column, col) => (
                <div
                  key={column.parent?.value ?? "__root__"}
                  data-slot="cascader-column"
                  data-cascader-col={col}
                  role="listbox"
                  aria-label={
                    column.parent
                      ? optionText(column.parent.label)
                      : text.level(col)
                  }
                  className="max-h-64 w-44 overflow-y-auto border-e-2 p-1 last:border-e-0"
                >
                  {column.options.length === 0 ? (
                    <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                      {text.empty}
                    </p>
                  ) : (
                    column.options.map((option, index) => {
                      const expanded = activePath[col] === option.value
                      const isLeaf = !option.children?.length
                      const selected =
                        value[col] === option.value && value.length === col + 1
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          aria-expanded={isLeaf ? undefined : expanded}
                          aria-haspopup={isLeaf ? undefined : "listbox"}
                          disabled={option.disabled}
                          data-slot="cascader-option"
                          data-cascader-value={option.value}
                          data-expanded={expanded || undefined}
                          onClick={() => selectOption(col, option)}
                          onKeyDown={(event) =>
                            handleOptionKeyDown(event, col, index, option)
                          }
                          className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-start text-sm data-[expanded]:bg-accent/60 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          <span className="flex-1 line-clamp-1">{option.label}</span>
                          {!isLeaf && (
                            <ChevronRight className="h-4 w-4 shrink-0 opacity-60 rtl:-scale-x-100" />
                          )}
                          {isLeaf && selected && <Check className="h-4 w-4 shrink-0" />}
                        </button>
                      )
                    })
                  )}
                </div>
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { Cascader }
