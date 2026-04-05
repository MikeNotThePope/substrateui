"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { InputGroup, InputGroupPrefix, InputGroupSuffix } from "./input-group"
import { Kbd } from "./kbd"

/** Props for the SearchField component. */
interface SearchFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: string
  shortcut?: string
  value: string
  onChange: (value: string) => void
  onClear?: () => void
}

/**
 * A search input with a search icon, clearable value, and optional keyboard shortcut hint.
 *
 * @example
 * <SearchField value={query} onChange={setQuery} shortcut="/" />
 *
 * @prop value - The current search string.
 * @prop onChange - Callback fired when the search value changes.
 * @prop shortcut - Optional keyboard shortcut label displayed when empty.
 * @prop onClear - Optional callback fired when the clear button is clicked.
 */
function SearchField({
  placeholder = "Search...",
  shortcut,
  value,
  onChange,
  onClear,
  className,
  ...props
}: SearchFieldProps) {
  return (
    <InputGroup
      data-slot="search-field"
      role="search"
      className={cn(className)}
      {...props}
    >
      <InputGroupPrefix>
        <Search className="size-4" aria-hidden="true" />
      </InputGroupPrefix>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {value ? (
        <InputGroupSuffix>
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              onChange("")
              onClear?.()
            }}
            className="inline-flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <X
              className="size-4 cursor-pointer hover:text-foreground transition-colors"
              aria-hidden="true"
            />
          </button>
        </InputGroupSuffix>
      ) : shortcut ? (
        <InputGroupSuffix>
          <Kbd>{shortcut}</Kbd>
        </InputGroupSuffix>
      ) : null}
    </InputGroup>
  )
}

export { SearchField }
