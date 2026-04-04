import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"
import { H3 } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Divider } from "@/components/ui/divider"
import { Cluster } from "@/components/ui/cluster"

function PlaceholderBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-16 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
      {children}
    </div>
  )
}

export default function DividerPage() {
  return (
    <DocPage
      title="Divider"
      description="A visual separator that creates clear boundaries between content sections. Supports horizontal rules, vertical lines, and labeled dividers for logical grouping."
    >
      <Stack gap="xl">
        {/* ── Horizontal Divider ──────────────────────────── */}
        <Stack gap="md">
          <H3>Horizontal Divider</H3>
          <ComponentPreview
            title="Between content blocks"
            code={`<Stack gap="md">
  <PlaceholderBox>Section A</PlaceholderBox>
  <Divider />
  <PlaceholderBox>Section B</PlaceholderBox>
  <Divider />
  <PlaceholderBox>Section C</PlaceholderBox>
</Stack>`}
          >
            <Stack gap="md" className="w-full">
              <PlaceholderBox>Section A</PlaceholderBox>
              <Divider />
              <PlaceholderBox>Section B</PlaceholderBox>
              <Divider />
              <PlaceholderBox>Section C</PlaceholderBox>
            </Stack>
          </ComponentPreview>
        </Stack>

        {/* ── Labeled Divider ─────────────────────────────── */}
        <Stack gap="md">
          <H3>Labeled Divider</H3>
          <ComponentPreview
            title="With centered label"
            code={`<Stack gap="md">
  <PlaceholderBox>Email Sign-In</PlaceholderBox>
  <Divider label="OR" />
  <PlaceholderBox>Social Sign-In</PlaceholderBox>
</Stack>`}
          >
            <Stack gap="md" className="w-full">
              <PlaceholderBox>Email Sign-In</PlaceholderBox>
              <Divider label="OR" />
              <PlaceholderBox>Social Sign-In</PlaceholderBox>
            </Stack>
          </ComponentPreview>
        </Stack>

        {/* ── Vertical Divider ────────────────────────────── */}
        <Stack gap="md">
          <H3>Vertical Divider</H3>
          <ComponentPreview
            title="In a flex row"
            code={`<Cluster gap="md" align="center">
  <div className="px-4 py-2 ...">Left</div>
  <Divider orientation="vertical" />
  <div className="px-4 py-2 ...">Center</div>
  <Divider orientation="vertical" />
  <div className="px-4 py-2 ...">Right</div>
</Cluster>`}
          >
            <Cluster gap="md" align="center" className="w-full h-16">
              <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono">
                Left
              </div>
              <Divider orientation="vertical" />
              <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono">
                Center
              </div>
              <Divider orientation="vertical" />
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
                name: "orientation",
                type: '"horizontal" | "vertical"',
                default: '"horizontal"',
                description:
                  "The direction of the divider line.",
              },
              {
                name: "label",
                type: "string",
                description:
                  "Optional centered text label within a horizontal divider (e.g. \"OR\").",
              },
              {
                name: "className",
                type: "string",
                description:
                  "Additional CSS classes to apply to the divider element.",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}
