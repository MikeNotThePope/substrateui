import { Slider } from "@/components/ui/slider"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const sliderProps: PropDef[] = [
  {
    name: "defaultValue",
    type: "number[]",
    default: "[0]",
    description: "The default value of the slider when uncontrolled.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    description: "The minimum allowed value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "The maximum allowed value.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    description: "The stepping interval between values.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, prevents interaction with the slider.",
  },
]

export default function SliderPage() {
  return (
    <DocPage
      title="Slider"
      description="A draggable range input for selecting numeric values. Built on Base UI primitives with smooth thumb interaction and track fill."
    >
      {/* Default */}
      <Stack gap="md">
        <H3>Default</H3>
        <ComponentPreview
          code={`<Slider defaultValue={[50]} max={100} step={1} />`}
        >
          <div className="w-full max-w-sm">
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </ComponentPreview>
      </Stack>

      {/* Custom Range */}
      <Stack gap="md">
        <H3>Custom Range</H3>
        <ComponentPreview
          code={`<Slider defaultValue={[25, 75]} max={100} step={5} />`}
        >
          <div className="w-full max-w-sm">
            <Slider defaultValue={[25, 75]} max={100} step={5} />
          </div>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={sliderProps} />
      </Stack>
    </DocPage>
  )
}
