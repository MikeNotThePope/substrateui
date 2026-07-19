import { Plus, ArrowRight, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
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
    name: "render",
    type: "ReactElement",
    default: "—",
    description:
      "Render a different element instead of a <button> tag, merging the button's props onto it. Useful for rendering links styled as buttons: render={<a href=… />}.",
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
<Button size="icon" aria-label="Add"><Plus /></Button>`}
        >
          <Cluster gap="sm" align="center">
            <Button size="default">Default</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">
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

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Icon-only buttons (<Code>size=&quot;icon&quot;</Code>, or buttons
            with no visible text children) MUST provide an{" "}
            <Code>aria-label</Code> so assistive technology can announce what
            the control does.
          </P>
          <ComponentPreview
            code={`<Button size="icon" aria-label="Add item"><Plus /></Button>`}
          >
            <Button size="icon" aria-label="Add item">
              <Plus />
            </Button>
          </ComponentPreview>
          <P>
            The default button height is 40px. For mobile-primary contexts,
            prefer <Code>size=&quot;lg&quot;</Code> (44px) to meet WCAG 2.5.5
            touch target guidance.
          </P>
          <P>
            The press-down animation respects{" "}
            <Code>prefers-reduced-motion</Code> and is disabled for users who
            request reduced motion.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
