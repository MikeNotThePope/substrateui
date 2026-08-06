import { Descriptions, type DescriptionsItem } from "@/components/ui/descriptions"
import { Badge } from "@/components/ui/badge"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Descriptions",
  description: "A read-only grid of label/value fields — the detail view for records, settings, and summaries.",
  route: "/docs/components/descriptions",
})

const items: DescriptionsItem[] = [
  { label: "Customer", children: "Ada Lovelace" },
  { label: "Order", children: "#1024" },
  { label: "Status", children: <Badge>Shipped</Badge> },
  { label: "Email", children: "ada@analytical.engine" },
  { label: "Phone", children: "+44 20 7946 0000" },
  { label: "Shipping address", span: 3, children: "12 Analytical Way, London, UK" },
]

const props: PropDef[] = [
  { name: "items", type: "DescriptionsItem[]", default: undefined, description: "The fields to render. Each has label, children (value), optional span and key." },
  { name: "title", type: "React.ReactNode", default: undefined, description: "Heading shown above the grid." },
  { name: "extra", type: "React.ReactNode", default: undefined, description: "Content aligned opposite the title — actions, status, timestamps." },
  { name: "columns", type: "number", default: "3", description: "Columns per row on sm and up (mobile is always one column)." },
  { name: "bordered", type: "boolean", default: "false", description: "Draw grid lines and give labels a tinted cell." },
  { name: "layout", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Place the label beside the value (horizontal) or above it (vertical)." },
  { name: "size", type: '"sm" | "md"', default: '"md"', description: "Cell padding density." },
]

const itemProps: PropDef[] = [
  { name: "label", type: "React.ReactNode", default: undefined, description: "The field name." },
  { name: "children", type: "React.ReactNode", default: undefined, description: "The field value." },
  { name: "span", type: "number", default: "1", description: "How many columns the field spans (clamped to columns)." },
  { name: "key", type: "React.Key", default: undefined, description: "Stable key; falls back to the array index." },
]

export default function DescriptionsPage() {
  return (
    <DocPage
      title="Descriptions"
      description="A read-only grid of label/value fields — the detail view for records, settings, and summaries. Data-driven via items; each field can span multiple columns and the grid collapses to a single column on mobile."
    >
      <Stack gap="md">
        <H3>Bordered</H3>
        <P>
          Set <Code>bordered</Code> for the classic table look — grid lines and a
          tinted label cell.
        </P>
        <ComponentPreview
          code={`const items = [
  { label: "Customer", children: "Ada Lovelace" },
  { label: "Order", children: "#1024" },
  { label: "Status", children: <Badge>Shipped</Badge> },
  { label: "Email", children: "ada@analytical.engine" },
  { label: "Phone", children: "+44 20 7946 0000" },
  { label: "Shipping address", span: 3, children: "12 Analytical Way, London" },
]

<Descriptions title="Order #1024" bordered items={items} />`}
        >
          <div className="w-full max-w-3xl">
            <Descriptions title="Order #1024" bordered items={items} />
          </div>
        </ComponentPreview>
      </Stack>

      <ImportLine names={["Descriptions"]} />

      <Stack gap="md">
        <H3>Plain</H3>
        <P>
          Without <Code>bordered</Code>, fields sit in a borderless grid with muted
          labels — lighter for inline summaries.
        </P>
        <ComponentPreview code={`<Descriptions title="Account" items={items} />`}>
          <div className="w-full max-w-3xl">
            <Descriptions title="Account" items={items} />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Vertical layout</H3>
        <P>
          Use <Code>layout=&quot;vertical&quot;</Code> to stack each label above its
          value — handy for wider values and denser column counts.
        </P>
        <ComponentPreview
          code={`<Descriptions bordered layout="vertical" columns={4} items={items} />`}
        >
          <div className="w-full max-w-3xl">
            <Descriptions bordered layout="vertical" columns={4} items={items} />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Compact + extra</H3>
        <ComponentPreview
          code={`<Descriptions
  title="Server"
  extra="Updated 2m ago"
  bordered
  size="sm"
  columns={2}
  items={[
    { label: "Region", children: "us-east-1" },
    { label: "Status", children: <Badge>Healthy</Badge> },
    { label: "CPU", children: "34%" },
    { label: "Memory", children: "5.2 / 16 GB" },
  ]}
/>`}
        >
          <div className="w-full max-w-2xl">
            <Descriptions
              title="Server"
              extra="Updated 2m ago"
              bordered
              size="sm"
              columns={2}
              items={[
                { label: "Region", children: "us-east-1" },
                { label: "Status", children: <Badge>Healthy</Badge> },
                { label: "CPU", children: "34%" },
                { label: "Memory", children: "5.2 / 16 GB" },
              ]}
            />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          Descriptions renders a semantic <Code>&lt;dl&gt;</Code> with{" "}
          <Code>&lt;dt&gt;</Code>/<Code>&lt;dd&gt;</Code> pairs, so assistive tech
          announces each value with its label. It&apos;s read-only by design — put
          interactive controls in the <Code>extra</Code> slot or alongside the grid.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
        <P className="text-sm text-muted-foreground">DescriptionsItem</P>
        <PropsTable props={itemProps} />
      </Stack>
    </DocPage>
  )
}
