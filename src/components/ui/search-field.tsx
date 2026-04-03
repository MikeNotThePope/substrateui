"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { InputGroup, InputGroupPrefix, InputGroupSuffix } from "./input-group"
import { Kbd } from "./kbd"

interface SearchFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  placeholder?: string
  shortcut?: string
  value: string
  onChange: (value: string) => void
  onClear?: () => void
}

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
      className={cn(className)}
      {...props}
    >
      <InputGroupPrefix>
        <Search className="size-4" />
      </InputGroupPrefix>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {value ? (
        <InputGroupSuffix>
          <X
            className="size-4 cursor-pointer hover:text-foreground transition-colors"
            onClick={() => {
              onChange("")
              onClear?.()
            }}
          />
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
