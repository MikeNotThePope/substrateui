import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioGroupCard } from "@/components/ui/choice-card"
import { Label } from "@/components/ui/label"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Radio Group",
  description: "A set of mutually exclusive options. Built on Base UI primitives with keyboard navigation and focus management.",
  route: "/docs/components/radio-group",
})

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

      <ImportLine
        names={[
          "RadioGroup",
          "RadioGroupItem",
          "RadioGroupCard",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="RadioGroup"
          nodes={[
            { name: "RadioGroupItem" },
            { name: "RadioGroupCard" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>As cards</H3>
        <P>
          <Code>RadioGroupItem</Code> is the 18px circle, and the target is the circle.{" "}
          <Code>RadioGroupCard</Code> is the same control grown into the whole row: 44px on
          its short side, a label and a muted description, and a tap anywhere in it selects.
          It also renders a frozen answer read-only without looking disabled. See{" "}
          <Link href="/docs/components/choice-card">Choice Card</Link>.
        </P>
        <ComponentPreview
          code={`<RadioGroup defaultValue="two-weeks" aria-label="Notice period">
  <RadioGroupCard value="two-weeks" description="The usual arrangement">
    Two weeks
  </RadioGroupCard>
  <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
</RadioGroup>`}
        >
          <div className="w-full max-w-md">
            <RadioGroup defaultValue="two-weeks" aria-label="Notice period">
              <RadioGroupCard value="two-weeks" description="The usual arrangement">
                Two weeks
              </RadioGroupCard>
              <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
            </RadioGroup>
          </div>
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
