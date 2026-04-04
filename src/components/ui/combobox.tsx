"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/** A single selectable option in the Combobox dropdown. */
export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxBaseProps {
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
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
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  disabled,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const isMultiple = props.multiple === true

  const selectedValues = isMultiple
    ? (props.value ?? [])
    : props.value
      ? [props.value]
      : []

  const handleSelect = (optionValue: string) => {
    if (isMultiple) {
      const current = props.value ?? []
      const next = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue]
      props.onValueChange?.(next)
    } else {
      const next = optionValue === props.value ? "" : optionValue
      props.onValueChange?.(next)
      setOpen(false)
    }
  }

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isMultiple) {
      const current = props.value ?? []
      props.onValueChange?.(current.filter((v) => v !== optionValue))
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
                  className="ml-1 rounded-full hover:bg-muted"
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

    return <span className="text-muted-foreground">{placeholder}</span>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          data-slot="combobox"
          className={cn(
            "border-2 rounded-md h-auto min-h-10 px-3 w-full justify-between font-normal",
            className
          )}
        >
          {displayLabel()}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.label]}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
