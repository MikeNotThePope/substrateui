import { DocPage } from "../../_components/doc-page"
import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Code, Mono } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Card, CardContent } from "@/components/ui/card"
import { PropsTable } from "../../_components/props-table"

const specimens = [
  { label: "H1", description: "Page titles. text-4xl font-bold tracking-tight", component: <H1>The quick brown fox</H1> },
  { label: "H2", description: "Section headers. text-3xl font-semibold tracking-tight", component: <H2>The quick brown fox</H2> },
  { label: "H3", description: "Sub-sections. text-2xl font-semibold tracking-tight", component: <H3>The quick brown fox</H3> },
  { label: "H4", description: "Card headers. text-xl font-semibold tracking-tight", component: <H4>The quick brown fox</H4> },
  { label: "P", description: "Body text. text-base leading-7", component: <P>The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</P> },
  { label: "Lead", description: "Intro paragraphs. text-xl text-muted-foreground", component: <Lead>The quick brown fox jumps over the lazy dog.</Lead> },
  { label: "Large", description: "Emphasized text. text-lg font-semibold", component: <Large>The quick brown fox</Large> },
  { label: "Small", description: "Captions and metadata. text-sm font-medium", component: <Small>The quick brown fox</Small> },
  { label: "Muted", description: "Secondary text. text-sm text-muted-foreground", component: <Muted>The quick brown fox</Muted> },
  { label: "Code", description: "Inline code. font-mono bg-muted rounded px-1", component: <span>Run <Code>npm install substrateui</Code> to get started.</span> },
  { label: "Mono", description: "Monospace labels. font-mono tracking-tight", component: <Mono>--color-primary: oklch(0.480 0.145 314)</Mono> },
]

export default function TypographyTokensPage() {
  return (
    <DocPage
      title="Typography"
      description="DM Sans for prose, DM Mono for code and labels. A modular scale built for readability."
    >
      <Stack gap="xl">
        {/* Font Families */}
        <section>
          <H2>Font Families</H2>
          <Stack gap="md" className="mt-4">
            <Card className="border-2">
              <CardContent className="pt-6">
                <Stack gap="sm">
                  <p className="font-sans text-2xl">DM Sans — The quick brown fox</p>
                  <Muted>Primary font. Used for headings, body text, and UI labels.</Muted>
                  <Code>font-family: var(--font-sans)</Code>
                </Stack>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="pt-6">
                <Stack gap="sm">
                  <p className="font-mono text-2xl">DM Mono — The quick brown fox</p>
                  <Muted>Monospace font. Used for code, tokens, and technical labels.</Muted>
                  <Code>font-family: var(--font-mono)</Code>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </section>

        {/* Specimens */}
        <section>
          <H2>Type Scale</H2>
          <Stack gap="md" className="mt-4">
            {specimens.map((specimen) => (
              <Card key={specimen.label} className="border-2">
                <CardContent className="pt-6">
                  <Stack gap="sm">
                    <div className="flex items-baseline justify-between">
                      <Mono className="text-xs font-semibold text-primary">{`<${specimen.label}>`}</Mono>
                      <Muted className="text-xs">{specimen.description}</Muted>
                    </div>
                    <div className="pt-2 border-t">
                      {specimen.component}
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </section>

        {/* API */}
        <section>
          <H2>API Reference</H2>
          <div className="mt-4">
            <PropsTable props={[
              { name: "className", type: "string", description: "Additional CSS classes" },
              { name: "children", type: "React.ReactNode", required: true, description: "Text content" },
              { name: "asChild", type: "boolean", default: "false", description: "Render as child element (H1-H4 only)" },
            ]} />
          </div>
        </section>
      </Stack>
    </DocPage>
  )
}
