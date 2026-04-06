"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"
import { Input } from "./input"
import { InputGroup, InputGroupPrefix, InputGroupSuffix } from "./input-group"
import { Kbd } from "./kbd"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by SearchField. All keys have English defaults. */
interface SearchFieldLabels {
  placeholder?: string
  clearSearch?: string
}

const defaultSearchFieldLabels: Required<SearchFieldLabels> = {
  placeholder: "Search...",
  clearSearch: "Clear search",
}

/** Props for the SearchField component. */
interface SearchFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: string
  shortcut?: string
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  /** Accessible label for the clear button. @default "Clear search" */
  clearLabel?: string
  labels?: SearchFieldLabels
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
  placeholder,
  shortcut,
  value,
  onChange,
  onClear,
  clearLabel,
  labels: labelsProp,
  className,
  ...props
}: SearchFieldProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultSearchFieldLabels, ctx.searchField, labelsProp)
  const resolvedPlaceholder = placeholder ?? labels.placeholder
  const resolvedClearLabel = clearLabel ?? labels.clearSearch

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
        placeholder={resolvedPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={resolvedPlaceholder}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {value ? (
        <InputGroupSuffix>
          <button
            type="button"
            aria-label={resolvedClearLabel}
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

export { SearchField, type SearchFieldLabels }
