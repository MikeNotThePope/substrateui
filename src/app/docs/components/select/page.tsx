import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const selectProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    default: undefined,
    description: "The controlled value of the select.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: undefined,
    description: "Callback fired when the selected value changes.",
  },
  {
    name: "defaultValue",
    type: "string",
    default: undefined,
    description: "The default value when uncontrolled.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, prevents interaction with the select.",
  },
  {
    name: "placeholder",
    type: "string",
    default: undefined,
    description: "Placeholder text displayed via SelectValue when no value is selected.",
  },
]

export default function SelectPage() {
  return (
    <DocPage
      title="Select"
      description="A dropdown select built on Base UI primitives. Provides a styled trigger, animated content panel, and accessible keyboard navigation."
    >
      {/* Basic */}
      <Stack gap="md">
        <H3>Basic</H3>
        <ComponentPreview
          code={`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Pick a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Pick a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </Stack>

      {/* Disabled */}
      <Stack gap="md">
        <H3>Disabled</H3>
        <ComponentPreview
          code={`<Select disabled>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>`}
        >
          <Select disabled>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={selectProps} />
      </Stack>
    </DocPage>
  )
}
