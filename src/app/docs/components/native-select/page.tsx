import { NativeSelect } from "@/components/ui/native-select"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const nativeSelectProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the select element.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, prevents interaction with the select.",
  },
]

export default function NativeSelectPage() {
  return (
    <DocPage
      title="Native Select"
      description="A styled wrapper around the browser's own select element. The picker is the operating system's, which is what makes it the right control on mobile."
    >
      <ComponentPreview
        code={`<NativeSelect>
  <option value="">Choose a color</option>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</NativeSelect>`}
      >
        <NativeSelect>
          <option value="">Choose a color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </NativeSelect>
      </ComponentPreview>

      <ImportLine names={["NativeSelect"]} />

      {/* Disabled */}
      <Stack gap="md">
        <H3>Disabled</H3>
        <ComponentPreview
          code={`<NativeSelect disabled>
  <option value="">Disabled</option>
</NativeSelect>`}
        >
          <NativeSelect disabled>
            <option value="">Disabled</option>
          </NativeSelect>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={nativeSelectProps} />
      </Stack>
    </DocPage>
  )
}
