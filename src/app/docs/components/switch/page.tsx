import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Switch",
  description: "A toggle for a boolean. Built on Base UI, with the thumb animated between states and the label wired for screen readers.",
  route: "/docs/components/switch",
})

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
      description="A toggle for a boolean. Built on Base UI, with the thumb animated between states and the label wired for screen readers."
    >
      <ComponentPreview
        code={`<Switch />`}
      >
        <Switch />
      </ComponentPreview>

      <ImportLine names={["Switch"]} />

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
