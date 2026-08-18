import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { Overline } from "@/components/ui/overline"
import { Badge } from "@/components/ui/badge"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Overline",
  description:
    "A short monospace label set above the thing it names. Uppercase, letter-spaced, and the treatment six components in this system were each writing by hand.",
  route: "/docs/components/overline",
})

const props: PropDef[] = [
  {
    name: "size",
    type: '"2xs" | "xs" | "sm"',
    default: '"xs"',
    description: "11px, 12px or 14px. Each carries its own line-height.",
  },
  {
    name: "render",
    type: "ReactElement",
    default: "—",
    description: "Render a different element, keeping the styling.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Merged over the variant classes, so colour and weight can be retuned.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: undefined,
    description: "The label text.",
  },
]

export default function OverlinePage() {
  return (
    <DocPage
      title="Overline"
      description="A short monospace label set above or beside the thing it names — a section caption, a table header, a status eyebrow. Uppercase, letter-spaced and muted."
    >
      <ComponentPreview
        code={`import { Overline } from "@mikenotthepope/substrateui"

<Overline>Section label</Overline>
<Overline size="2xs">Draft</Overline>
<Overline render={<h3 />}>Resources</Overline>`}
      >
        <Stack gap="md">
          <Overline size="2xs">Two extra small — 11px</Overline>
          <Overline>Extra small — 12px, the default</Overline>
          <Overline size="sm">Small — 14px</Overline>
        </Stack>
      </ComponentPreview>

      <ImportLine names={["Overline"]} />

      <Stack gap="md">
        <H3>It carries no semantics</H3>
        <P>
          An overline is a typographic treatment, not a role. It renders a <Code>span</Code> by
          default; use <Code>render</Code> to make it whatever the surrounding document actually
          needs — an <Code>h3</Code> when it genuinely heads a section, a <Code>p</Code> inside a
          card, a <Code>dt</Code> in a description list.
        </P>
        <P>
          Reaching for it as a heading substitute is the mistake to avoid. If it looks like a
          section title, it probably belongs in the document outline, and a styled{" "}
          <Code>span</Code> is invisible to anyone navigating by heading.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Sizes</H3>
        <P>
          <Code>2xs</Code> is 11px, one step below where Tailwind&apos;s scale stops. It exists
          because <Badge>Badge</Badge> wanted that size and had been carrying a raw{" "}
          <Code>text-[11px]</Code> to get it. Each size pairs its own line-height, so leading
          arrives with the size rather than being inherited from whatever the label happens to
          sit inside — which is the difference between this step and the arbitrary value, and
          why Badge has not moved onto it yet.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Where it already is</H3>
        <P>
          <Code>Divider</Code>, <Code>Timeline</Code>, <Code>Table</Code>, <Code>StatCard</Code>,{" "}
          <Code>FooterBlock</Code> and <Code>Badge</Code> all use this treatment. Before it had a
          name they used four different sizes and three different weights between them — so a
          table header and a timeline label, which are the same thing on the page, were not the
          same thing in the code.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
