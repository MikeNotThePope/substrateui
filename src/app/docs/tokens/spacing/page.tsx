import { DocPage } from "../../_components/doc-page"
import { H2, Mono, Muted, Code, P } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Card, CardContent } from "@/components/ui/card"
import { ComponentPreview } from "../../_components/component-preview"

const spacingScale = [
  { name: "xs", value: "0.25rem", px: "4px" },
  { name: "sm", value: "0.5rem", px: "8px" },
  { name: "md", value: "1rem", px: "16px" },
  { name: "lg", value: "1.5rem", px: "24px" },
  { name: "xl", value: "2rem", px: "32px" },
  { name: "2xl", value: "3rem", px: "48px" },
]

function SpacingBar({ name, px }: { name: string; px: string }) {
  return (
    <div className="flex items-center gap-4">
      <Mono className="text-sm w-8 text-right shrink-0">{name}</Mono>
      <div
        className="h-8 bg-primary rounded"
        style={{ width: px }}
      />
      <Muted className="text-xs shrink-0">{px}</Muted>
    </div>
  )
}

function PlaceholderBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-16 rounded-lg bg-surface-sunken border-2 border-dashed border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
      {children}
    </div>
  )
}

export default function SpacingPage() {
  return (
    <DocPage
      title="Spacing"
      description="A 4px base unit system with named scale steps from xs to 2xl."
    >
      <Stack gap="xl">
        {/* Scale */}
        <section>
          <H2>Spacing Scale</H2>
          <P className="text-muted-foreground mt-1 mb-4">
            All spacing is based on a 4px unit. The scale is designed for consistent rhythm across components.
          </P>
          <Card className="border-2">
            <CardContent className="pt-6">
              <Stack gap="sm">
                {spacingScale.map((step) => (
                  <SpacingBar key={step.name} name={step.name} px={step.px} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </section>

        {/* Token table */}
        <section>
          <H2>Token Reference</H2>
          <div className="mt-4 border-2 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 bg-muted">
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">CSS Variable</th>
                  <th className="text-left p-3 font-semibold">Value</th>
                  <th className="text-left p-3 font-semibold">Pixels</th>
                </tr>
              </thead>
              <tbody>
                {spacingScale.map((step) => (
                  <tr key={step.name} className="border-b last:border-b-0">
                    <td className="p-3"><Code>{step.name}</Code></td>
                    <td className="p-3"><Code className="text-xs">--spacing-{step.name}</Code></td>
                    <td className="p-3"><Mono className="text-xs">{step.value}</Mono></td>
                    <td className="p-3"><Mono className="text-xs">{step.px}</Mono></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stack examples */}
        <section>
          <H2>Stack with Different Gaps</H2>
          <Stack gap="md" className="mt-4">
            <ComponentPreview code={`<Stack gap="sm">...</Stack>\n<Stack gap="md">...</Stack>\n<Stack gap="xl">...</Stack>`}>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <Mono className="text-xs text-muted-foreground mb-2">gap=&quot;sm&quot;</Mono>
                  <Stack gap="sm">
                    <PlaceholderBox>A</PlaceholderBox>
                    <PlaceholderBox>B</PlaceholderBox>
                    <PlaceholderBox>C</PlaceholderBox>
                  </Stack>
                </div>
                <div>
                  <Mono className="text-xs text-muted-foreground mb-2">gap=&quot;md&quot;</Mono>
                  <Stack gap="md">
                    <PlaceholderBox>A</PlaceholderBox>
                    <PlaceholderBox>B</PlaceholderBox>
                    <PlaceholderBox>C</PlaceholderBox>
                  </Stack>
                </div>
                <div>
                  <Mono className="text-xs text-muted-foreground mb-2">gap=&quot;xl&quot;</Mono>
                  <Stack gap="xl">
                    <PlaceholderBox>A</PlaceholderBox>
                    <PlaceholderBox>B</PlaceholderBox>
                    <PlaceholderBox>C</PlaceholderBox>
                  </Stack>
                </div>
              </div>
            </ComponentPreview>
          </Stack>
        </section>

        {/* Philosophy */}
        <section>
          <H2>Design Philosophy</H2>
          <Stack gap="md" className="mt-4">
            <Card className="border-2">
              <CardContent className="pt-6">
                <Stack gap="sm">
                  <P>
                    <strong>4px base unit.</strong> Every spacing value is a multiple of 4px. This creates a consistent
                    visual rhythm and prevents &quot;pixel pushing&quot; decisions.
                  </P>
                  <P>
                    <strong>Named scales, not arbitrary values.</strong> Use <Code>gap=&quot;md&quot;</Code> instead of <Code>gap-4</Code>.
                    Named tokens make the intent clear and are easy to change globally.
                  </P>
                  <P>
                    <strong>Layout primitives own the spacing.</strong> Stack, Cluster, and Grid handle gaps — individual
                    components rarely need margin.
                  </P>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </section>
      </Stack>
    </DocPage>
  )
}
