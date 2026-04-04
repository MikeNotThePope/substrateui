"use client"

import { useState } from "react"
import { SearchField } from "@/components/ui/search-field"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const searchFieldProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    required: true,
    description: "The controlled value of the search field.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    required: true,
    description: "Callback fired when the input value changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Search..."',
    description: "Placeholder text shown when the field is empty.",
  },
  {
    name: "shortcut",
    type: "string",
    description: "Optional keyboard shortcut label displayed when empty.",
  },
  {
    name: "onClear",
    type: "() => void",
    description: "Optional callback fired when the clear button is clicked.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
  },
]

export default function SearchFieldPage() {
  const [query, setQuery] = useState("")

  return (
    <DocPage
      title="Search Field"
      description="A text input with a search icon, clearable value, and optional keyboard shortcut hint."
    >
      <Stack gap="md">
        <H3>Basic</H3>
        <ComponentPreview
          code={`<SearchField
  value={query}
  onChange={setQuery}
  placeholder="Search components..."
  shortcut="/"
/>`}
        >
          <div className="w-full max-w-sm">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Search components..."
              shortcut="/"
            />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={searchFieldProps} />
      </Stack>
    </DocPage>
  )
}
