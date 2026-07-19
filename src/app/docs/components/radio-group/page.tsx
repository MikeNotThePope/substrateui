import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const radioGroupProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    default: undefined,
    description: "The controlled value of the selected radio item.",
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
    description: "When true, disables all radio items in the group.",
  },
]

export default function RadioGroupPage() {
  return (
    <DocPage
      title="Radio Group"
      description="A set of mutually exclusive options. Built on Base UI primitives with keyboard navigation and focus management."
    >
      {/* Basic */}
      <Stack gap="md">
        <H3>Basic</H3>
        <ComponentPreview
          code={`<RadioGroup defaultValue="medium">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="small" id="small" />
    <Label htmlFor="small">Small</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="medium" id="medium" />
    <Label htmlFor="medium">Medium</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="large" id="large" />
    <Label htmlFor="large">Large</Label>
  </div>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="medium">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="small" id="small" />
              <Label htmlFor="small">Small</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="large" id="large" />
              <Label htmlFor="large">Large</Label>
            </div>
          </RadioGroup>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={radioGroupProps} />
      </Stack>
    </DocPage>
  )
}
