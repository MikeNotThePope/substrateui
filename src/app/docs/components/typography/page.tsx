import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Code, Mono } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const typographyProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the typography element.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The text content to render.",
  },
]

export default function TypographyPage() {
  return (
    <DocPage
      title="Typography"
      description="A complete set of semantic typography components for headings, body text, and inline elements. Each renders the correct HTML tag with consistent styling."
    >
      <Stack gap="md">
        <H3>Headings</H3>
        <ComponentPreview
          code={`<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>`}
        >
          <Stack gap="sm" className="w-full">
            <H1>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Body Text</H3>
        <ComponentPreview
          code={`<Lead>Lead paragraph for introductory copy.</Lead>
<P>Standard paragraph with relaxed leading for body text.</P>
<Large>Large semibold text for emphasis.</Large>
<Small>Small text with medium weight.</Small>
<Muted>Muted text for secondary information.</Muted>`}
        >
          <Stack gap="sm" className="w-full">
            <Lead>Lead paragraph for introductory copy.</Lead>
            <P>Standard paragraph with relaxed leading for body text.</P>
            <Large>Large semibold text for emphasis.</Large>
            <Small>Small text with medium weight.</Small>
            <Muted>Muted text for secondary information.</Muted>
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Inline Elements</H3>
        <ComponentPreview
          code={`<Code>npm install substrate-ui</Code>
<Mono>monospace text without background</Mono>`}
        >
          <Stack gap="sm">
            <div><Code>npm install substrate-ui</Code></div>
            <div><Mono>monospace text without background</Mono></div>
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={typographyProps} />
      </Stack>
    </DocPage>
  )
}
