"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

/** A single selectable option in the Combobox dropdown. */
export interface ComboboxOption {
  value: string
  label: string
}

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Combobox. All keys have English defaults. */
interface ComboboxLabels {
  placeholder?: string
  searchPlaceholder?: string
  noResults?: string
}

const defaultComboboxLabels: Required<ComboboxLabels> = {
  placeholder: "Select...",
  searchPlaceholder: "Search...",
  noResults: "No results found.",
}


interface ComboboxBaseProps {
  options: ComboboxOption[]
  /** @deprecated Use `labels.placeholder` instead. */
  placeholder?: string
  /** @deprecated Use `labels.searchPlaceholder` instead. */
  searchPlaceholder?: string
  /** @deprecated Use `labels.noResults` instead. */
  emptyMessage?: string
  labels?: ComboboxLabels
  className?: string
  disabled?: boolean
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
 * @prop options - Array of selectable options
 * @prop multiple - Enable multi-select mode when true
 * @prop placeholder - Text shown when no value is selected
 */
function Combobox({
  options,
  // These deprecated props are still accepted and forwarded into the labels
  // API below for backward compatibility (see ComboboxBaseProps).
  /* eslint-disable @typescript-eslint/no-deprecated */
  placeholder,
  searchPlaceholder,
  emptyMessage,
  /* eslint-enable @typescript-eslint/no-deprecated */
  labels: labelsProp,
  className,
  disabled,
  ...props
}: ComboboxProps) {
  const ctx = useLabels()
  const mergedProp: ComboboxLabels = {
    ...labelsProp,
    ...(placeholder != null && { placeholder }),
    ...(searchPlaceholder != null && { searchPlaceholder }),
    ...(emptyMessage != null && { noResults: emptyMessage }),
  }
  const labels = resolveLabels(defaultComboboxLabels, ctx.combobox, mergedProp)

  const isMultiple = props.multiple === true

  const selectedValues = isMultiple
    ? (props.value ?? [])
    : props.value
      ? [props.value]
      : []

  const selected = isMultiple
    ? options.filter((o) => selectedValues.includes(o.value))
    : (options.find((o) => o.value === props.value) ?? null)

  const handleValueChange = (next: ComboboxOption | ComboboxOption[] | null) => {
    if (isMultiple) {
      const arr = Array.isArray(next) ? next : next ? [next] : []
      ;(props.onValueChange as ((v: string[]) => void) | undefined)?.(
        arr.map((o) => o.value)
      )
    } else {
      const one = Array.isArray(next) ? next[0] : next
      ;(props.onValueChange as ((v: string) => void) | undefined)?.(
        one?.value ?? ""
      )
    }
  }

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isMultiple) {
      const current = props.value ?? []
      ;(props.onValueChange as ((v: string[]) => void) | undefined)?.(
        current.filter((v) => v !== optionValue)
      )
    }
  }

  const displayLabel = () => {
    if (isMultiple && selectedValues.length > 0) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedValues.map((v) => {
            const opt = options.find((o) => o.value === v)
            return (
              <Badge key={v} variant="secondary" className="text-xs px-1.5 py-0">
                {opt?.label ?? v}
                <button
                  type="button"
                  className="ms-1 rounded-full hover:bg-muted"
                  onClick={(e) => handleRemove(v, e)}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            )
          })}
        </div>
      )
    }

    if (!isMultiple && props.value) {
      const opt = options.find((o) => o.value === props.value)
      return <span>{opt?.label ?? props.value}</span>
    }

    return <span className="text-muted-foreground">{labels.placeholder}</span>
  }

  return (
    <ComboboxPrimitive.Root
      items={options}
      multiple={isMultiple}
      value={selected}
      onValueChange={handleValueChange}
      disabled={disabled}
      itemToStringLabel={(o: ComboboxOption) => o.label}
    >
      <ComboboxPrimitive.Trigger
        aria-expanded={undefined}
        data-slot="combobox"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "border-2 rounded-md h-auto min-h-10 px-3 w-full justify-between font-normal",
          className
        )}
      >
        {displayLabel()}
        <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-50" />
      </ComboboxPrimitive.Trigger>
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
            <ComboboxPrimitive.Empty className="py-6 text-center text-sm empty:hidden">
              {labels.noResults}
            </ComboboxPrimitive.Empty>
            <ComboboxPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1 empty:p-0">
              {(option: ComboboxOption) => (
                <ComboboxPrimitive.Item
                  key={option.value}
                  value={option}
                  className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-surface-interactive data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Check
                    className={cn(
                      "me-2 size-4",
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </ComboboxPrimitive.Item>
              )}
            </ComboboxPrimitive.List>
          </ComboboxPrimitive.Popup>
        </ComboboxPrimitive.Positioner>
      </ComboboxPrimitive.Portal>
    </ComboboxPrimitive.Root>
  )
}

export { Combobox, type ComboboxLabels }
