import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"
import { H3 } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Center } from "@/components/ui/center"

export default function CenterPage() {
  return (
    <DocPage
      title="Center"
      description="A centering layout component that constrains content to a maximum width and centers it horizontally with optional responsive padding. Use Center to create readable content columns and page-width containers."
    >
      <Stack gap="xl">
        {/* ── Max-Width Variants ──────────────────────────── */}
        <Stack gap="md">
          <H3>Max-Width Variants</H3>
          <Stack gap="lg">
            <ComponentPreview
              title="max=&quot;sm&quot;"
              code={`<Center max="sm">
  <div className="p-4 bg-surface-sunken rounded-lg border border-border">
    Constrained to screen-sm
  </div>
</Center>`}
            >
              <div className="w-full bg-surface-sunken/30 rounded-lg py-4">
                <Center max="sm">
                  <div className="p-4 bg-surface-sunken rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-mono text-center">
                    max=&quot;sm&quot; (640px)
                  </div>
                </Center>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="max=&quot;md&quot;"
              code={`<Center max="md">
  <div className="p-4 bg-surface-sunken rounded-lg border border-border">
    Constrained to screen-md
  </div>
</Center>`}
            >
              <div className="w-full bg-surface-sunken/30 rounded-lg py-4">
                <Center max="md">
                  <div className="p-4 bg-surface-sunken rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-mono text-center">
                    max=&quot;md&quot; (768px)
                  </div>
                </Center>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="max=&quot;lg&quot;"
              code={`<Center max="lg">
  <div className="p-4 bg-surface-sunken rounded-lg border border-border">
    Constrained to screen-lg
  </div>
</Center>`}
            >
              <div className="w-full bg-surface-sunken/30 rounded-lg py-4">
                <Center max="lg">
                  <div className="p-4 bg-surface-sunken rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-mono text-center">
                    max=&quot;lg&quot; (1024px)
                  </div>
                </Center>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="max=&quot;xl&quot;"
              code={`<Center max="xl">
  <div className="p-4 bg-surface-sunken rounded-lg border border-border">
    Constrained to screen-xl
  </div>
</Center>`}
            >
              <div className="w-full bg-surface-sunken/30 rounded-lg py-4">
                <Center max="xl">
                  <div className="p-4 bg-surface-sunken rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-mono text-center">
                    max=&quot;xl&quot; (1280px)
                  </div>
                </Center>
              </div>
            </ComponentPreview>
          </Stack>
        </Stack>

        {/* ── Padding Control ─────────────────────────────── */}
        <Stack gap="md">
          <H3>Padding Control</H3>
          <Stack gap="lg">
            <ComponentPreview
              title="padding={true} (default)"
              code={`<Center max="md" padding>
  <div className="p-4 bg-surface-sunken ...">
    With responsive horizontal padding
  </div>
</Center>`}
            >
              <div className="w-full bg-surface-sunken/30 rounded-lg py-4">
                <Center max="md" padding>
                  <div className="p-4 bg-surface-sunken rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-mono text-center">
                    With responsive padding (px-4 sm:px-6 lg:px-8)
                  </div>
                </Center>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="padding={false}"
              code={`<Center max="md" padding={false}>
  <div className="p-4 bg-surface-sunken ...">
    No horizontal padding
  </div>
</Center>`}
            >
              <div className="w-full bg-surface-sunken/30 rounded-lg py-4">
                <Center max="md" padding={false}>
                  <div className="p-4 bg-surface-sunken rounded-lg border-2 border-dashed border-border text-muted-foreground text-sm font-mono text-center">
                    No padding — content touches edges
                  </div>
                </Center>
              </div>
            </ComponentPreview>
          </Stack>
        </Stack>

        {/* ── API Reference ───────────────────────────────── */}
        <Stack gap="md">
          <H3>API Reference</H3>
          <PropsTable
            props={[
              {
                name: "max",
                type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
                default: '"2xl"',
                description:
                  "Maximum width constraint applied to the container.",
              },
              {
                name: "padding",
                type: "boolean",
                default: "true",
                description:
                  "Adds responsive horizontal padding (px-4 sm:px-6 lg:px-8) when true.",
              },
              {
                name: "asChild",
                type: "boolean",
                default: "false",
                description:
                  "When true, merges props onto the child element via Base UI Slot instead of rendering a wrapping div.",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}
