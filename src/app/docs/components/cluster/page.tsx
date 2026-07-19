import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"
import { H3 } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { Grid } from "@/components/ui/grid"

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-surface-sunken border-2 border-dashed border-border text-muted-foreground text-sm font-mono whitespace-nowrap">
      {children}
    </div>
  )
}

export default function ClusterPage() {
  return (
    <DocPage
      title="Cluster"
      description="A horizontal flex layout component that distributes children along the inline axis with configurable gap, alignment, justification, and wrapping. Use Cluster to compose inline groups like tag lists, button rows, and navigation items."
    >
      <Stack gap="xl">
        {/* ── Gap Variants ────────────────────────────────── */}
        <Stack gap="md">
          <H3>Gap Variants</H3>
          <Grid gap="lg" className="sm:grid-cols-2">
            <ComponentPreview
              title="gap=&quot;xs&quot;"
              code={`<Cluster gap="xs">
  <Tag>Alpha</Tag>
  <Tag>Beta</Tag>
  <Tag>Gamma</Tag>
</Cluster>`}
            >
              <Cluster gap="xs" className="w-full">
                <Tag>Alpha</Tag>
                <Tag>Beta</Tag>
                <Tag>Gamma</Tag>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;sm&quot;"
              code={`<Cluster gap="sm">
  <Tag>Alpha</Tag>
  <Tag>Beta</Tag>
  <Tag>Gamma</Tag>
</Cluster>`}
            >
              <Cluster gap="sm" className="w-full">
                <Tag>Alpha</Tag>
                <Tag>Beta</Tag>
                <Tag>Gamma</Tag>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;md&quot;"
              code={`<Cluster gap="md">
  <Tag>Alpha</Tag>
  <Tag>Beta</Tag>
  <Tag>Gamma</Tag>
</Cluster>`}
            >
              <Cluster gap="md" className="w-full">
                <Tag>Alpha</Tag>
                <Tag>Beta</Tag>
                <Tag>Gamma</Tag>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="gap=&quot;xl&quot;"
              code={`<Cluster gap="xl">
  <Tag>Alpha</Tag>
  <Tag>Beta</Tag>
  <Tag>Gamma</Tag>
</Cluster>`}
            >
              <Cluster gap="xl" className="w-full">
                <Tag>Alpha</Tag>
                <Tag>Beta</Tag>
                <Tag>Gamma</Tag>
              </Cluster>
            </ComponentPreview>
          </Grid>
        </Stack>

        {/* ── Wrapping Behavior ───────────────────────────── */}
        <Stack gap="md">
          <H3>Wrapping Behavior</H3>
          <ComponentPreview
            title="Many items wrap naturally"
            code={`<Cluster gap="sm">
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind CSS</Tag>
  <Tag>Next.js</Tag>
  <Tag>Base UI</Tag>
  <Tag>Node.js</Tag>
  <Tag>PostgreSQL</Tag>
  <Tag>GraphQL</Tag>
  <Tag>Docker</Tag>
  <Tag>Vercel</Tag>
  <Tag>Figma</Tag>
  <Tag>Git</Tag>
</Cluster>`}
          >
            <Cluster gap="sm" className="w-full">
              <Tag>React</Tag>
              <Tag>TypeScript</Tag>
              <Tag>Tailwind CSS</Tag>
              <Tag>Next.js</Tag>
              <Tag>Base UI</Tag>
              <Tag>Node.js</Tag>
              <Tag>PostgreSQL</Tag>
              <Tag>GraphQL</Tag>
              <Tag>Docker</Tag>
              <Tag>Vercel</Tag>
              <Tag>Figma</Tag>
              <Tag>Git</Tag>
            </Cluster>
          </ComponentPreview>

          <ComponentPreview
            title="wrap={false} — no wrapping"
            code={`<Cluster gap="sm" wrap={false}>
  <Tag>React</Tag>
  <Tag>TypeScript</Tag>
  <Tag>Tailwind CSS</Tag>
  <Tag>Next.js</Tag>
  <Tag>Base UI</Tag>
</Cluster>`}
          >
            <Cluster gap="sm" wrap={false} className="w-full overflow-x-auto">
              <Tag>React</Tag>
              <Tag>TypeScript</Tag>
              <Tag>Tailwind CSS</Tag>
              <Tag>Next.js</Tag>
              <Tag>Base UI</Tag>
            </Cluster>
          </ComponentPreview>
        </Stack>

        {/* ── Justify Variations ──────────────────────────── */}
        <Stack gap="md">
          <H3>Justify Variations</H3>
          <Grid gap="lg" className="sm:grid-cols-2">
            <ComponentPreview
              title="justify=&quot;start&quot;"
              code={`<Cluster justify="start">
  <Tag>A</Tag>
  <Tag>B</Tag>
  <Tag>C</Tag>
</Cluster>`}
            >
              <Cluster justify="start" gap="sm" className="w-full">
                <Tag>A</Tag>
                <Tag>B</Tag>
                <Tag>C</Tag>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="justify=&quot;center&quot;"
              code={`<Cluster justify="center">
  <Tag>A</Tag>
  <Tag>B</Tag>
  <Tag>C</Tag>
</Cluster>`}
            >
              <Cluster justify="center" gap="sm" className="w-full">
                <Tag>A</Tag>
                <Tag>B</Tag>
                <Tag>C</Tag>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="justify=&quot;end&quot;"
              code={`<Cluster justify="end">
  <Tag>A</Tag>
  <Tag>B</Tag>
  <Tag>C</Tag>
</Cluster>`}
            >
              <Cluster justify="end" gap="sm" className="w-full">
                <Tag>A</Tag>
                <Tag>B</Tag>
                <Tag>C</Tag>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="justify=&quot;between&quot;"
              code={`<Cluster justify="between">
  <Tag>A</Tag>
  <Tag>B</Tag>
  <Tag>C</Tag>
</Cluster>`}
            >
              <Cluster justify="between" gap="sm" className="w-full">
                <Tag>A</Tag>
                <Tag>B</Tag>
                <Tag>C</Tag>
              </Cluster>
            </ComponentPreview>
          </Grid>
        </Stack>

        {/* ── Align Variations ────────────────────────────── */}
        <Stack gap="md">
          <H3>Align Variations</H3>
          <Grid gap="lg" className="sm:grid-cols-2">
            <ComponentPreview
              title="align=&quot;start&quot;"
              code={`<Cluster align="start">
  <div className="h-8 ...">Short</div>
  <div className="h-16 ...">Tall</div>
  <div className="h-12 ...">Medium</div>
</Cluster>`}
            >
              <Cluster align="start" gap="sm" className="w-full">
                <div className="h-8 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Short</div>
                <div className="h-16 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Tall</div>
                <div className="h-12 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Medium</div>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="align=&quot;center&quot;"
              code={`<Cluster align="center">
  <div className="h-8 ...">Short</div>
  <div className="h-16 ...">Tall</div>
  <div className="h-12 ...">Medium</div>
</Cluster>`}
            >
              <Cluster align="center" gap="sm" className="w-full">
                <div className="h-8 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Short</div>
                <div className="h-16 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Tall</div>
                <div className="h-12 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Medium</div>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="align=&quot;end&quot;"
              code={`<Cluster align="end">
  <div className="h-8 ...">Short</div>
  <div className="h-16 ...">Tall</div>
  <div className="h-12 ...">Medium</div>
</Cluster>`}
            >
              <Cluster align="end" gap="sm" className="w-full">
                <div className="h-8 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Short</div>
                <div className="h-16 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Tall</div>
                <div className="h-12 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Medium</div>
              </Cluster>
            </ComponentPreview>

            <ComponentPreview
              title="align=&quot;baseline&quot;"
              code={`<Cluster align="baseline">
  <div className="h-8 ...">Short</div>
  <div className="h-16 ...">Tall</div>
  <div className="h-12 ...">Medium</div>
</Cluster>`}
            >
              <Cluster align="baseline" gap="sm" className="w-full">
                <div className="h-8 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Short</div>
                <div className="h-16 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Tall</div>
                <div className="h-12 px-4 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center text-muted-foreground text-sm font-mono">Medium</div>
              </Cluster>
            </ComponentPreview>
          </Grid>
        </Stack>

        {/* ── API Reference ───────────────────────────────── */}
        <Stack gap="md">
          <H3>API Reference</H3>
          <PropsTable
            props={[
              {
                name: "gap",
                type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
                default: '"sm"',
                description:
                  "Controls the horizontal spacing between child elements.",
              },
              {
                name: "align",
                type: '"start" | "center" | "end" | "baseline"',
                default: '"center"',
                description:
                  "Cross-axis alignment of children within the cluster.",
              },
              {
                name: "justify",
                type: '"start" | "center" | "end" | "between"',
                default: '"start"',
                description:
                  "Main-axis justification of children along the row.",
              },
              {
                name: "wrap",
                type: "boolean",
                default: "true",
                description:
                  "Whether items wrap to the next line when they exceed the container width.",
              },
              {
                name: "render",
                type: "ReactElement",
                default: "—",
                description:
                  "Render a different element instead of a wrapping div, merging this component's props onto it (e.g. render={<section />}).",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}
