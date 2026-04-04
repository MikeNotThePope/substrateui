"use client"

import { useState } from "react"
import { Combobox } from "@/components/ui/combobox"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const comboboxProps: PropDef[] = [
  {
    name: "options",
    type: "{ value: string; label: string }[]",
    default: "[]",
    description: "The list of selectable options.",
  },
  {
    name: "value",
    type: "string",
    default: '""',
    description: "The controlled selected value.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: undefined,
    description: "Callback fired when the selected value changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Select..."',
    description: "Placeholder text when no value is selected.",
  },
  {
    name: "emptyMessage",
    type: "string",
    default: '"No results found."',
    description: "Text displayed when no options match the search query.",
  },
]

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
]

export default function ComboboxPage() {
  const [value, setValue] = useState("")

  return (
    <DocPage
      title="Combobox"
      description="A searchable dropdown that combines a text input with a listbox. Useful for long option lists where filtering is beneficial."
    >
      {/* Basic */}
      <Stack gap="md">
        <H3>Basic</H3>
        <ComponentPreview
          code={`const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
]

<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  placeholder="Select a framework..."
  emptyMessage="No framework found."
/>`}
        >
          <Combobox
            options={frameworks}
            value={value}
            onValueChange={setValue}
            placeholder="Select a framework..."
            emptyMessage="No framework found."
          />
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={comboboxProps} />
      </Stack>
    </DocPage>
  )
}
