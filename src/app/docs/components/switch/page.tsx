import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const switchProps: PropDef[] = [
  {
    name: "checked",
    type: "boolean",
    default: "false",
    description: "The controlled checked state of the switch.",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    default: undefined,
    description: "Callback fired when the switch is toggled.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, prevents interaction with the switch.",
  },
]

export default function SwitchPage() {
  return (
    <DocPage
      title="Switch"
      description="A toggle switch for on/off states. Built on Base UI primitives with smooth thumb animation and accessible labeling."
    >
      {/* Standalone */}
      <Stack gap="md">
        <H3>Standalone</H3>
        <ComponentPreview
          code={`<Switch />`}
        >
          <Switch />
        </ComponentPreview>
      </Stack>

      {/* With Label */}
      <Stack gap="md">
        <H3>With Label</H3>
        <ComponentPreview
          code={`<Cluster gap="sm" align="center">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</Cluster>`}
        >
          <Cluster gap="sm" align="center">
            <Switch id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={switchProps} />
      </Stack>
    </DocPage>
  )
}
