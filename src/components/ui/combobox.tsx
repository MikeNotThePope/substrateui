"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

/** A single selectable option in the Combobox dropdown. */
export interface ComboboxOption {
  value: string
  label: string
}

/** An option plus the flag marking the synthetic "create" row in free-solo mode. */
interface InternalOption extends ComboboxOption {
  create?: boolean
}

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Combobox. All keys have English defaults. */
interface ComboboxLabels {
  placeholder?: string
  searchPlaceholder?: string
  noResults?: string
  loading?: string
  clear?: string
  /** Label for the free-solo row that adds the typed value. */
  create?: (query: string) => string
  /** Label for the badge standing in for chips hidden by `limitTags`. */
  more?: (count: number) => string
  /** Accessible name for a chip's remove button. */
  remove?: (label: string) => string
}

const defaultComboboxLabels: Required<ComboboxLabels> = {
  placeholder: "Select...",
  searchPlaceholder: "Search...",
  noResults: "No results found.",
  loading: "Loading...",
  clear: "Clear selection",
  create: (query) => `Add "${query}"`,
  more: (count) => `+${count}`,
  remove: (label) => `Remove ${label}`,
}


interface ComboboxBaseProps {
  options: ComboboxOption[]
  labels?: ComboboxLabels
  className?: string
  disabled?: boolean
  /** Show a loading row in place of results — for options fetched on demand. */
  loading?: boolean
  /** Called as the search query changes. Pair with `manualFilter` to search server-side. */
  onInputChange?: (query: string) => void
  /** Skip the built-in filtering and render `options` exactly as given. */
  manualFilter?: boolean
  /** Accept values that are not in `options` by offering to add what was typed. */
  freeSolo?: boolean
  /** Group options under headings. Returns the heading for an option. */
  groupBy?: (option: ComboboxOption) => string
  /** Collapse chips past this many into a single count badge. Multi-select only. */
  limitTags?: number
  /** Show a button that clears the selection. */
  clearable?: boolean
}

interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false
  value?: string
  onValueChange?: (value: string) => void
}

interface ComboboxMultipleProps extends ComboboxBaseProps {
  multiple: true
  value?: string[]
  onValueChange?: (value: string[]) => void
}

type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

/**
 * Searchable select dropdown supporting single or multi-select modes.
 * Built on Base UI's Combobox with the search input inside the popup.
 *
 * @example
 * <Combobox options={[{ value: "a", label: "Alpha" }]} value={val} onValueChange={setVal} />
 *
 * @example
 * // Fetched on demand: you filter, the component just renders.
 * <Combobox options={results} loading={loading} manualFilter onInputChange={search} />
 *
 * @prop options - Array of selectable options
 * @prop multiple - Enable multi-select mode when true
 * @prop freeSolo - Offer to add a typed value that matches no option
 * @prop groupBy - Group options under headings
 */
function Combobox({
  options,
  labels: labelsProp,
  className,
  disabled,
  loading = false,
  onInputChange,
  manualFilter = false,
  freeSolo = false,
  groupBy,
  limitTags,
  clearable = false,
  ...props
}: ComboboxProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultComboboxLabels, ctx.combobox, labelsProp)

  const isMultiple = props.multiple === true
  const [query, setQuery] = React.useState("")

  const selectedValues = React.useMemo(
    () =>
      isMultiple
        ? (props.value ?? [])
        : props.value
          ? [props.value as string]
          : [],
    [isMultiple, props.value]
  )

  // Free-solo values are not in `options`, so keep a lookup that includes them
  // — otherwise the trigger and the check marks lose track of them.
  const knownOptions = React.useMemo<ComboboxOption[]>(() => {
    const extra = selectedValues
      .filter((v) => !options.some((o) => o.value === v))
      .map((v) => ({ value: v, label: v }))
    return extra.length ? [...options, ...extra] : options
  }, [options, selectedValues])

  const trimmedQuery = query.trim()
  const createOption = React.useMemo<InternalOption | null>(() => {
    if (!freeSolo || trimmedQuery === "") return null
    const exists = options.some(
      (o) => o.label.toLowerCase() === trimmedQuery.toLowerCase()
    )
    return exists
      ? null
      : { value: trimmedQuery, label: trimmedQuery, create: true }
  }, [freeSolo, trimmedQuery, options])

  const listOptions = React.useMemo<InternalOption[]>(
    () => (createOption ? [...options, createOption] : options),
    [options, createOption]
  )

  // Base UI takes grouped items as `[{ value: heading, items: [...] }]`. The
  // create row gets an unlabelled group of its own so `groupBy` is never
  // handed a synthetic option.
  const groupedOptions = React.useMemo(() => {
    if (!groupBy) return null
    const map = new Map<string, InternalOption[]>()
    for (const option of options) {
      const heading = groupBy(option)
      const bucket = map.get(heading)
      if (bucket) bucket.push(option)
      else map.set(heading, [option])
    }
    const groups = Array.from(map, ([value, items]) => ({ value, items }))
    if (createOption) groups.push({ value: "", items: [createOption] })
    return groups
  }, [groupBy, options, createOption])

  const items = groupedOptions ?? listOptions

  const selected = isMultiple
    ? knownOptions.filter((o) => selectedValues.includes(o.value))
    : (knownOptions.find((o) => o.value === props.value) ?? null)

  const emit = (next: string[]) => {
    if (isMultiple) {
      ;(props.onValueChange as ((v: string[]) => void) | undefined)?.(next)
    } else {
      ;(props.onValueChange as ((v: string) => void) | undefined)?.(next[0] ?? "")
    }
  }

  const handleValueChange = (next: ComboboxOption | ComboboxOption[] | null) => {
    const arr = Array.isArray(next) ? next : next ? [next] : []
    emit(arr.map((o) => o.value))
  }

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isMultiple) {
      emit(selectedValues.filter((v) => v !== optionValue))
    }
  }

  const labelFor = (v: string) => knownOptions.find((o) => o.value === v)?.label ?? v

  // Chips carry their own remove buttons, so they cannot render inside the
  // trigger — a <button> may not contain another <button>. Invalid nesting
  // throws a hydration error and leaves the remove control unreachable by
  // keyboard, because the trigger swallows the interaction. They are rendered
  // as a sibling laid over the trigger instead (see `chipsOverlay` below).
  const showChips = isMultiple && selectedValues.length > 0

  const shownValues = showChips
    ? limitTags != null && limitTags >= 0
      ? selectedValues.slice(0, limitTags)
      : selectedValues
    : []
  const hiddenCount = selectedValues.length - shownValues.length

  const chipsOverlay = showChips ? (
    // Same grid cell as the trigger, so wrapping chips still drive its height
    // the way they did when they were inside it. Pointer events pass through
    // to the trigger everywhere except the remove buttons themselves.
    <div
      data-slot="combobox-chips"
      className="pointer-events-none z-10 flex min-h-10 flex-wrap items-center gap-1 px-3 py-2 [grid-area:1/1]"
    >
      {shownValues.map((v) => (
        <Badge key={v} variant="secondary" className="text-xs px-1.5 py-0">
          {labelFor(v)}
          <button
            type="button"
            aria-label={labels.remove(labelFor(v))}
            className="pointer-events-auto ms-1 rounded-full hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(e) => handleRemove(v, e)}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      {hiddenCount > 0 && (
        <Badge variant="outline" className="text-xs px-1.5 py-0">
          {labels.more(hiddenCount)}
        </Badge>
      )}
    </div>
  ) : null

  const displayLabel = () => {
    // With chips overlaid, the trigger keeps only its placeholder slot so it
    // still reserves the right height; the chips sit on top of it.
    if (showChips) return <span className="sr-only">{selectedValues.map(labelFor).join(", ")}</span>

    if (!isMultiple && props.value) {
      const opt = knownOptions.find((o) => o.value === props.value)
      return <span>{opt?.label ?? props.value}</span>
    }

    return <span className="text-muted-foreground">{labels.placeholder}</span>
  }

  const renderItem = (option: InternalOption) => (
    <ComboboxPrimitive.Item
      key={option.create ? `__create__${option.value}` : option.value}
      value={option}
      className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-surface-interactive data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    >
      {option.create ? (
        <Plus className="me-2 size-4" />
      ) : (
        <Check
          className={cn(
            "me-2 size-4",
            selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      {option.create ? labels.create(option.value) : option.label}
    </ComboboxPrimitive.Item>
  )

  const hasSelection = selectedValues.length > 0

  const trigger = (
    <ComboboxPrimitive.Trigger
      aria-expanded={undefined}
      data-slot="combobox"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "border-2 rounded-md h-auto min-h-10 px-3 w-full justify-between font-normal",
        clearable && hasSelection && "pe-16",
        // Chips overlay this cell; the trigger stretches to whatever height
        // they need rather than sizing itself.
        showChips && "[grid-area:1/1] items-start",
        className
      )}
    >
      {displayLabel()}
      {/* ms-auto, not justify-between: with chips the label slot is sr-only and
          therefore out of flow, leaving the chevron as the only in-flow child.
          justify-between would park it at the start, behind the chips. The gap
          comes from buttonVariants' own gap-2. */}
      <ChevronsUpDown className="ms-auto size-4 shrink-0 self-center opacity-50" />
    </ComboboxPrimitive.Trigger>
  )

  return (
    <ComboboxPrimitive.Root
      items={items}
      multiple={isMultiple}
      value={selected}
      onValueChange={handleValueChange}
      onInputValueChange={(next) => {
        setQuery(next)
        onInputChange?.(next)
      }}
      filter={manualFilter ? null : undefined}
      disabled={disabled}
      itemToStringLabel={(o: ComboboxOption) => o.label}
      isItemEqualToValue={(a: ComboboxOption, b: ComboboxOption) =>
        a?.value === b?.value
      }
    >
      {clearable || showChips ? (
        <div
          data-slot="combobox-field"
          className={cn("relative w-full", showChips && "grid")}
        >
          {trigger}
          {chipsOverlay}
          {clearable && hasSelection && !disabled && (
            <button
              type="button"
              data-slot="combobox-clear"
              aria-label={labels.clear}
              onClick={() => emit([])}
              className="absolute end-9 top-1/2 z-20 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      ) : (
        trigger
      )}
      <ComboboxPrimitive.Portal>
        <ComboboxPrimitive.Positioner align="start" sideOffset={4} className="z-50">
          <ComboboxPrimitive.Popup
            className="w-(--anchor-width) rounded-lg border-2 bg-popover text-popover-foreground shadow-hard outline-none data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 origin-(--transform-origin) overflow-hidden"
          >
            <div className="flex items-center border-b-2 px-3">
              <ComboboxPrimitive.Input
                placeholder={labels.searchPlaceholder}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {loading ? (
              <div
                data-slot="combobox-loading"
                className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground"
              >
                <Spinner size="sm" />
                {labels.loading}
              </div>
            ) : (
              <>
                <ComboboxPrimitive.Empty className="py-6 text-center text-sm empty:hidden">
                  {labels.noResults}
                </ComboboxPrimitive.Empty>
                <ComboboxPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1 empty:p-0">
                  {groupedOptions
                    ? (group: { value: string; items: InternalOption[] }) => (
                        <ComboboxPrimitive.Group
                          key={group.value || "__create__"}
                          items={group.items}
                          className="[&:not(:first-child)]:mt-1"
                        >
                          {group.value && (
                            <ComboboxPrimitive.GroupLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                              {group.value}
                            </ComboboxPrimitive.GroupLabel>
                          )}
                          <ComboboxPrimitive.Collection>
                            {(option: InternalOption) => renderItem(option)}
                          </ComboboxPrimitive.Collection>
                        </ComboboxPrimitive.Group>
                      )
                    : (option: InternalOption) => renderItem(option)}
                </ComboboxPrimitive.List>
              </>
            )}
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  )
}

export { Combobox, type ComboboxLabels }
