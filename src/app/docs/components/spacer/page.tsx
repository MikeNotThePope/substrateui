import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"
import { H3 } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Spacer } from "@/components/ui/spacer"
import { Cluster } from "@/components/ui/cluster"

function PlaceholderBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-16 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
      {children}
    </div>
  )
}

export default function SpacerPage() {
  return (
    <DocPage
      title="Spacer"
      description="A flexible whitespace element that adds fixed-size gaps or fills available flex space between siblings. Use Spacer for precise spacing control outside of gap-based layouts."
    >
      <Stack gap="xl">
        {/* ── Vertical Size Variants ──────────────────────── */}
        <Stack gap="md">
          <H3>Vertical Size Variants</H3>
          <Stack gap="lg">
            <ComponentPreview
              title="size=&quot;xs&quot; (4px)"
              code={`<div>
  <PlaceholderBox>Above</PlaceholderBox>
  <Spacer size="xs" />
  <PlaceholderBox>Below</PlaceholderBox>
</div>`}
            >
              <div className="w-full">
                <PlaceholderBox>Above</PlaceholderBox>
                <Spacer size="xs" />
                <PlaceholderBox>Below</PlaceholderBox>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="size=&quot;sm&quot; (8px)"
              code={`<div>
  <PlaceholderBox>Above</PlaceholderBox>
  <Spacer size="sm" />
  <PlaceholderBox>Below</PlaceholderBox>
</div>`}
            >
              <div className="w-full">
                <PlaceholderBox>Above</PlaceholderBox>
                <Spacer size="sm" />
                <PlaceholderBox>Below</PlaceholderBox>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="size=&quot;md&quot; (16px)"
              code={`<div>
  <PlaceholderBox>Above</PlaceholderBox>
  <Spacer size="md" />
  <PlaceholderBox>Below</PlaceholderBox>
</div>`}
            >
              <div className="w-full">
                <PlaceholderBox>Above</PlaceholderBox>
                <Spacer size="md" />
                <PlaceholderBox>Below</PlaceholderBox>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="size=&quot;lg&quot; (24px)"
              code={`<div>
  <PlaceholderBox>Above</PlaceholderBox>
  <Spacer size="lg" />
  <PlaceholderBox>Below</PlaceholderBox>
</div>`}
            >
              <div className="w-full">
                <PlaceholderBox>Above</PlaceholderBox>
                <Spacer size="lg" />
                <PlaceholderBox>Below</PlaceholderBox>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="size=&quot;xl&quot; (32px)"
              code={`<div>
  <PlaceholderBox>Above</PlaceholderBox>
  <Spacer size="xl" />
  <PlaceholderBox>Below</PlaceholderBox>
</div>`}
            >
              <div className="w-full">
                <PlaceholderBox>Above</PlaceholderBox>
                <Spacer size="xl" />
                <PlaceholderBox>Below</PlaceholderBox>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="size=&quot;2xl&quot; (48px)"
              code={`<div>
  <PlaceholderBox>Above</PlaceholderBox>
  <Spacer size="2xl" />
  <PlaceholderBox>Below</PlaceholderBox>
</div>`}
            >
              <div className="w-full">
                <PlaceholderBox>Above</PlaceholderBox>
                <Spacer size="2xl" />
                <PlaceholderBox>Below</PlaceholderBox>
              </div>
            </ComponentPreview>
          </Stack>
        </Stack>

        {/* ── Flex Spacer ─────────────────────────────────── */}
        <Stack gap="md">
          <H3>Flex Spacer</H3>
          <ComponentPreview
            title="No size — fills available space"
            code={`<Cluster gap="sm" className="w-full">
  <div className="px-4 py-2 ...">Logo</div>
  <Spacer />
  <div className="px-4 py-2 ...">Sign In</div>
</Cluster>`}
          >
            <Cluster gap="sm" wrap={false} className="w-full">
              <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono">
                Logo
              </div>
              <Spacer />
              <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono">
                Sign In
              </div>
            </Cluster>
          </ComponentPreview>
        </Stack>

        {/* ── Horizontal Spacer ───────────────────────────── */}
        <Stack gap="md">
          <H3>Horizontal Spacer</H3>
          <ComponentPreview
            title="axis=&quot;horizontal&quot; — fixed width gap"
            code={`<Cluster gap="none" wrap={false}>
  <div className="px-4 py-2 ...">Left</div>
  <Spacer size="xl" axis="horizontal" />
  <div className="px-4 py-2 ...">Right</div>
</Cluster>`}
          >
            <Cluster gap="none" wrap={false} className="w-full">
              <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono">
                Left
              </div>
              <Spacer size="xl" axis="horizontal" />
              <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono">
                Right
              </div>
            </Cluster>
          </ComponentPreview>
        </Stack>

        {/* ── API Reference ───────────────────────────────── */}
        <Stack gap="md">
          <H3>API Reference</H3>
          <PropsTable
            props={[
              {
                name: "size",
                type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
                description:
                  "Fixed spacing size. When omitted, the spacer fills available flex space (flex: 1).",
              },
              {
                name: "axis",
                type: '"horizontal" | "vertical"',
                default: '"vertical"',
                description:
                  "Whether the fixed spacing is applied as height (vertical) or width (horizontal).",
              },
              {
                name: "className",
                type: "string",
                description:
                  "Additional CSS classes to apply to the spacer element.",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}
