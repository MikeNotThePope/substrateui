import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const checkboxProps: PropDef[] = [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "The controlled checked state of the checkbox.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: undefined,
    description: "Callback fired when the checked state changes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, prevents interaction with the checkbox.",
  },
  {
    name: "id",
    type: "string",
    default: undefined,
    description: "The id attribute, useful for associating with a label.",
  },
]

export default function CheckboxPage() {
  return (
    <DocPage
      title="Checkbox"
      description="A toggle control for boolean values. Built on Radix primitives with accessible keyboard support and animated check indicator."
    >
      {/* Standalone */}
      <Stack gap="md">
        <H3>Standalone</H3>
        <ComponentPreview
          code={`<Checkbox />`}
        >
          <Checkbox />
        </ComponentPreview>
      </Stack>

      {/* With Label */}
      <Stack gap="md">
        <H3>With Label</H3>
        <ComponentPreview
          code={`<Cluster gap="sm" align="center">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</Cluster>`}
        >
          <Cluster gap="sm" align="center">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={checkboxProps} />
      </Stack>
    </DocPage>
  )
}
