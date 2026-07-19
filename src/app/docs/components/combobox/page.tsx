"use client"

import { useState } from "react"
import { Combobox } from "@/components/ui/combobox"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
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
  labels={{
    placeholder: "Select a framework...",
    noResults: "No framework found.",
  }}
/>`}
        >
          <Combobox
            options={frameworks}
            value={value}
            onValueChange={setValue}
            labels={{
              placeholder: "Select a framework...",
              noResults: "No framework found.",
            }}
          />
        </ComponentPreview>
      </Stack>

      {/* Direction */}
      <Stack gap="md">
        <H3>Direction</H3>
        <P>
          The chevron indicator and selected-check icon placement flip
          automatically in RTL — the chevron sits on the start edge (right
          in RTL) alongside the label. The popover anchors to the trigger
          and mirrors open-direction, so filtered results still read in
          the expected order.
        </P>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={comboboxProps} />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Combobox follows the ARIA combobox pattern via Base UI Popover +
            CMDK Command. It supports full keyboard navigation: arrow keys
            to move through options, Enter to select, Escape to close the
            listbox.
          </P>
          <P>
            Always provide a label via Field + FieldLabel or an explicit{" "}
            <Code>aria-label</Code>. Without one, screen readers will
            announce the combobox without context.
          </P>
          <P>
            For multi-select, selected items are rendered as removable
            Badges. Each remove button has an <Code>aria-label</Code>{" "}
            identifying which item it removes.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
