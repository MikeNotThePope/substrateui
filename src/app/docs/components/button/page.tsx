import { Plus, ArrowRight, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const buttonProps: PropDef[] = [
  {
    name: "variant",
    type: '"default" | "destructive" | "outline" | "secondary" | "amber" | "ghost" | "link"',
    default: '"default"',
    description:
      "The visual style of the button. Each variant has a distinct color scheme and border treatment.",
  },
  {
    name: "size",
    type: '"default" | "sm" | "lg" | "icon"',
    default: '"default"',
    description:
      "Controls the height, padding, and border-radius of the button.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description:
      "When true, the button merges its props onto its child element instead of rendering a <button> tag. Useful for rendering links styled as buttons.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the button element.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description:
      "When true, prevents interaction and reduces opacity. Inherited from the native button element.",
  },
]

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="A versatile button component for triggering actions and events. Features a satisfying press animation and multiple visual variants."
    >
      {/* Variants */}
      <Stack gap="md">
        <H3>Variants</H3>
        <ComponentPreview
          code={`<Button>Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="amber">Amber</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        >
          <Cluster gap="sm">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="amber">Amber</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* Sizes */}
      <Stack gap="md">
        <H3>Sizes</H3>
        <ComponentPreview
          code={`<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`}
        >
          <Cluster gap="sm" align="center">
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus />
            </Button>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* With Icons */}
      <Stack gap="md">
        <H3>With Icons</H3>
        <ComponentPreview
          code={`<Button><Plus /> Create New</Button>
<Button variant="outline">Continue <ArrowRight /></Button>
<Button variant="secondary"><Download /> Download</Button>`}
        >
          <Cluster gap="sm">
            <Button>
              <Plus /> Create New
            </Button>
            <Button variant="outline">
              Continue <ArrowRight />
            </Button>
            <Button variant="secondary">
              <Download /> Download
            </Button>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* Loading State */}
      <Stack gap="md">
        <H3>Loading State</H3>
        <ComponentPreview
          code={`<Button disabled>
  <Loader2 className="animate-spin" />
  Please wait
</Button>`}
        >
          <Button disabled>
            <Loader2 className="animate-spin" />
            Please wait
          </Button>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={buttonProps} />
      </Stack>
    </DocPage>
  )
}
