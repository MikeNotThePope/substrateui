import { Kbd } from "@/components/ui/kbd"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const kbdProps: PropDef[] = [
  {
    name: "keys",
    type: "string | string[]",
    default: undefined,
    description:
      "A single key string or array of key strings to render as a key combination with + separators.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description:
      "Content to display inside a single key indicator. Used when keys prop is not provided.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the kbd element.",
  },
]

export default function KbdPage() {
  return (
    <DocPage
      title="Kbd"
      description="Displays a keyboard key or key combination. Renders with a sunken border style to mimic physical keyboard keys."
    >
      <Stack gap="md">
        <H3>Single Keys</H3>
        <ComponentPreview
          code={`<Kbd>Enter</Kbd>
<Kbd>Esc</Kbd>
<Kbd>Tab</Kbd>`}
        >
          <Cluster gap="sm" align="center">
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Modifier Combinations</H3>
        <ComponentPreview
          code={`<Kbd keys={["Ctrl", "S"]} />
<Kbd keys={["Cmd", "Shift", "P"]} />
<Kbd keys={["Alt", "F4"]} />`}
        >
          <Cluster gap="md" align="center">
            <Kbd keys={["Ctrl", "S"]} />
            <Kbd keys={["Cmd", "Shift", "P"]} />
            <Kbd keys={["Alt", "F4"]} />
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={kbdProps} />
      </Stack>
    </DocPage>
  )
}
