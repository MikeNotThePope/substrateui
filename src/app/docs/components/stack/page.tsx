import { Stack } from "@/components/ui/stack"
import { Grid } from "@/components/ui/grid"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"

function PlaceholderBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-16 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
      {children}
    </div>
  )
}

export default function StackPage() {
  return (
    <DocPage
      title="Stack"
      description="A vertical flex layout component that distributes children along the block axis with configurable gap and alignment. Use Stack to compose consistent vertical spacing throughout your interface."
    >
      <Stack gap="xl">
        {/* ── Gap Variants ────────────────────────────────── */}
        <Stack gap="md">
          <H3>Gap Variants</H3>
          <Grid columns={2} gap="lg">
            <ComponentPreview
              title="gap=&quot;sm&quot;"
              code={`<Stack gap="sm">
  <PlaceholderBox>Item 1</PlaceholderBox>
  <PlaceholderBox>Item 2</PlaceholderBox>
  <PlaceholderBox>Item 3</PlaceholderBox>
</Stack>`}
            >
              <Stack gap="sm" className="w-full">
                <PlaceholderBox>Item 1</PlaceholderBox>
                <PlaceholderBox>Item 2</PlaceholderBox>
                <PlaceholderBox>Item 3</PlaceholderBox>
              </Stack>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;md&quot;"
              code={`<Stack gap="md">
  <PlaceholderBox>Item 1</PlaceholderBox>
  <PlaceholderBox>Item 2</PlaceholderBox>
  <PlaceholderBox>Item 3</PlaceholderBox>
</Stack>`}
            >
              <Stack gap="md" className="w-full">
                <PlaceholderBox>Item 1</PlaceholderBox>
                <PlaceholderBox>Item 2</PlaceholderBox>
                <PlaceholderBox>Item 3</PlaceholderBox>
              </Stack>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;lg&quot;"
              code={`<Stack gap="lg">
  <PlaceholderBox>Item 1</PlaceholderBox>
  <PlaceholderBox>Item 2</PlaceholderBox>
  <PlaceholderBox>Item 3</PlaceholderBox>
</Stack>`}
            >
              <Stack gap="lg" className="w-full">
                <PlaceholderBox>Item 1</PlaceholderBox>
                <PlaceholderBox>Item 2</PlaceholderBox>
                <PlaceholderBox>Item 3</PlaceholderBox>
              </Stack>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;xl&quot;"
              code={`<Stack gap="xl">
  <PlaceholderBox>Item 1</PlaceholderBox>
  <PlaceholderBox>Item 2</PlaceholderBox>
  <PlaceholderBox>Item 3</PlaceholderBox>
</Stack>`}
            >
              <Stack gap="xl" className="w-full">
                <PlaceholderBox>Item 1</PlaceholderBox>
                <PlaceholderBox>Item 2</PlaceholderBox>
                <PlaceholderBox>Item 3</PlaceholderBox>
              </Stack>
            </ComponentPreview>
          </Grid>
        </Stack>

        {/* ── Alignment ───────────────────────────────────── */}
        <Stack gap="md">
          <H3>Alignment</H3>
          <Grid columns={2} gap="lg">
            <ComponentPreview
              title="align=&quot;start&quot;"
              code={`<Stack align="start">
  <div className="w-24 ...">Start</div>
  <div className="w-32 ...">Aligned</div>
  <div className="w-20 ...">Items</div>
</Stack>`}
            >
              <Stack align="start" gap="sm" className="w-full">
                <div className="w-24 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Start
                </div>
                <div className="w-32 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Aligned
                </div>
                <div className="w-20 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Items
                </div>
              </Stack>
            </ComponentPreview>

            <ComponentPreview
              title="align=&quot;center&quot;"
              code={`<Stack align="center">
  <div className="w-24 ...">Center</div>
  <div className="w-32 ...">Aligned</div>
  <div className="w-20 ...">Items</div>
</Stack>`}
            >
              <Stack align="center" gap="sm" className="w-full">
                <div className="w-24 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Center
                </div>
                <div className="w-32 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Aligned
                </div>
                <div className="w-20 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Items
                </div>
              </Stack>
            </ComponentPreview>

            <ComponentPreview
              title="align=&quot;end&quot;"
              code={`<Stack align="end">
  <div className="w-24 ...">End</div>
  <div className="w-32 ...">Aligned</div>
  <div className="w-20 ...">Items</div>
</Stack>`}
            >
              <Stack align="end" gap="sm" className="w-full">
                <div className="w-24 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  End
                </div>
                <div className="w-32 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Aligned
                </div>
                <div className="w-20 h-12 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                  Items
                </div>
              </Stack>
            </ComponentPreview>

            <ComponentPreview
              title="align=&quot;stretch&quot;"
              code={`<Stack align="stretch">
  <PlaceholderBox>Stretch</PlaceholderBox>
  <PlaceholderBox>Full Width</PlaceholderBox>
  <PlaceholderBox>Items</PlaceholderBox>
</Stack>`}
            >
              <Stack align="stretch" gap="sm" className="w-full">
                <PlaceholderBox>Stretch</PlaceholderBox>
                <PlaceholderBox>Full Width</PlaceholderBox>
                <PlaceholderBox>Items</PlaceholderBox>
              </Stack>
            </ComponentPreview>
          </Grid>
        </Stack>

        {/* ── Nested Stacks ───────────────────────────────── */}
        <Stack gap="md">
          <H3>Nested Stacks</H3>
          <ComponentPreview
            code={`<Stack gap="lg">
  <PlaceholderBox>Outer Item</PlaceholderBox>
  <Stack gap="sm" className="pl-6 border-l-2 border-border">
    <PlaceholderBox>Nested Item 1</PlaceholderBox>
    <PlaceholderBox>Nested Item 2</PlaceholderBox>
    <PlaceholderBox>Nested Item 3</PlaceholderBox>
  </Stack>
  <PlaceholderBox>Outer Item</PlaceholderBox>
</Stack>`}
          >
            <Stack gap="lg" className="w-full">
              <PlaceholderBox>Outer Item</PlaceholderBox>
              <Stack gap="sm" className="pl-6 border-l-2 border-border">
                <PlaceholderBox>Nested Item 1</PlaceholderBox>
                <PlaceholderBox>Nested Item 2</PlaceholderBox>
                <PlaceholderBox>Nested Item 3</PlaceholderBox>
              </Stack>
              <PlaceholderBox>Outer Item</PlaceholderBox>
            </Stack>
          </ComponentPreview>
        </Stack>

        {/* ── API Reference ───────────────────────────────── */}
        <Stack gap="md">
          <H3>API Reference</H3>
          <PropsTable
            props={[
              {
                name: "gap",
                type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
                default: '"md"',
                description:
                  "Controls the vertical spacing between child elements.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end" | "stretch"',
                default: '"stretch"',
                description:
                  "Cross-axis alignment of children within the stack.",
              },
              {
                name: "asChild",
                type: "boolean",
                default: "false",
                description:
                  "When true, merges props onto the child element via Radix Slot instead of rendering a wrapping div.",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}
