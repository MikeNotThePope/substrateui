import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxCard } from "@/components/ui/choice-card"
import { Fieldset } from "@/components/ui/fieldset"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Checkbox",
  description: "A toggle control for boolean values. Built on Base UI primitives with accessible keyboard support and animated check indicator.",
  route: "/docs/components/checkbox",
})

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
      description="A toggle control for boolean values. Built on Base UI primitives with accessible keyboard support and animated check indicator."
    >
      <ComponentPreview
        code={`<Checkbox />`}
      >
        <Checkbox />
      </ComponentPreview>

      <ImportLine names={["Checkbox", "CheckboxCard"]} />

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

      <Stack gap="md">
        <H3>As cards</H3>
        <P>
          <Code>Checkbox</Code> is the 18px box, and the target is the box.{" "}
          <Code>CheckboxCard</Code> is the same control grown into the whole row — 56px
          tall, a label and a muted description — and a tap anywhere in it toggles. It also
          renders a submitted answer read-only, and a staff preview with no control in it at
          all, neither of them dimmed. See{" "}
          <Link href="/docs/components/choice-card">Choice Card</Link>.
        </P>
        <ComponentPreview
          code={`<Fieldset legend="Which shifts can you cover?">
  <CheckboxCard name="shift" value="mornings" description="06:00 – 14:00">
    Mornings
  </CheckboxCard>
  <CheckboxCard name="shift" value="nights" description="22:00 – 06:00">
    Nights
  </CheckboxCard>
</Fieldset>`}
        >
          <div className="w-full max-w-md">
            <Fieldset legend="Which shifts can you cover?">
              <CheckboxCard name="shift" value="mornings" description="06:00 – 14:00">
                Mornings
              </CheckboxCard>
              <CheckboxCard name="shift" value="nights" description="22:00 – 06:00">
                Nights
              </CheckboxCard>
            </Fieldset>
          </div>
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
