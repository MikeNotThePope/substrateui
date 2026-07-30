"use client"

import { useState } from "react"
import { SearchField } from "@/components/ui/search-field"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
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

      <ImportLine names={["SearchField"]} />

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The clear button is an icon with no text, and the placeholder is the field&apos;s only visible hint. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>searchField</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "placeholder", type: "string", default: "\"Search...\"", description: "Placeholder text. Not a label — pair the field with a real one." },
          { name: "clearSearch", type: "string", default: "\"Clear search\"", description: "Accessible name for the clear button." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={searchFieldProps} />
      </Stack>
    </DocPage>
  )
}
