import Link from "next/link"
import { ArrowRight, Box, Palette, Layers, Moon, Blocks, Puzzle } from "lucide-react"

import { H1, H2, H3, P, Lead, Mono } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { Grid } from "@/components/ui/grid"
import { Center } from "@/components/ui/center"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import pkg from "../../package.json"

// Derived once at build time (Server Component) — shows major.minor, e.g. "v0.2"
const version = "v" + pkg.version.split(".").slice(0, 2).join(".")

// ─── Feature Data ─────────────────────────────────────────────────────

const features = [
  {
    icon: Box,
    title: "Chunky Borders",
    description: "border-2 everywhere. Intentional, tactile, unapologetic.",
  },
  {
    icon: Palette,
    title: "OKLCH Color System",
    description: "Perceptually uniform. CVD-safe plum + amber pairing.",
  },
  {
    icon: Layers,
    title: "Tailwind CSS v4 Native",
    description: "@theme inline, no config file, CSS-first tokens.",
  },
  {
    icon: Moon,
    title: "Dark Mode as Token Swap",
    description: "Flip .dark and the whole system follows. Zero component changes.",
  },
  {
    icon: Blocks,
    title: "70+ Components",
    description: "From atomic Button to organism App Shell. Batteries included.",
  },
  {
    icon: Puzzle,
    title: "Composition Over Configuration",
    description: "Field context, sub-component patterns, slot-based APIs.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <Center max="xl" className="px-4 text-center">
          <Stack gap="lg" className="items-center">
            <Badge variant="secondary" className="font-mono text-xs">{version} — early access</Badge>
            <H1 className="text-4xl md:text-6xl font-bold tracking-tight">SubstrateUI</H1>
            <Lead className="max-w-2xl text-lg md:text-xl">
              A chunky, opinionated design system for Next.js. OKLCH color tokens,
              Tailwind CSS v4, Radix UI primitives, and a personality that isn&apos;t afraid of borders.
            </Lead>
            <Cluster gap="sm">
              <Link href="/docs">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs/components/button">
                <Button variant="outline" size="lg">Browse Components</Button>
              </Link>
            </Cluster>
          </Stack>
        </Center>
      </section>

      {/* Preview card */}
      <section className="pb-20">
        <Center max="md" className="px-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Create Project</CardTitle>
              <CardDescription>Spin up a new project in one click.</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <Field>
                  <FieldLabel>Project Name</FieldLabel>
                  <Input placeholder="my-awesome-app" defaultValue="my-awesome-app" />
                  <FieldHint>This will be your repository name.</FieldHint>
                </Field>
                <Cluster gap="sm">
                  <Badge>Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="outline">Tailwind</Badge>
                </Cluster>
              </Stack>
            </CardContent>
            <CardFooter>
              <Cluster gap="sm">
                <Button variant="amber">Create Project</Button>
                <Button variant="outline">Cancel</Button>
              </Cluster>
            </CardFooter>
          </Card>
        </Center>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card border-y-2">
        <Center max="2xl" className="px-4">
          <Stack gap="xl">
            <div className="text-center">
              <H2 className="text-3xl font-bold tracking-tight">Built Different</H2>
              <P className="text-muted-foreground mt-2">Every decision is intentional. Every token is earned.</P>
            </div>
            <Grid columns={3} gap="lg">
              {features.map((feature) => (
                <Card key={feature.title} className="border-2">
                  <CardContent className="pt-6">
                    <Stack gap="sm">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <H3 className="text-lg font-semibold">{feature.title}</H3>
                      <P className="text-sm text-muted-foreground">{feature.description}</P>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Center>
      </section>

      {/* Code Example */}
      <section className="py-20">
        <Center max="lg" className="px-4">
          <Stack gap="xl">
            <div className="text-center">
              <H2 className="text-3xl font-bold tracking-tight">Quick Start</H2>
              <P className="text-muted-foreground mt-2">Three imports and you&apos;re in.</P>
            </div>

            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">globals.css</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>{`@import "tailwindcss";
@import "tw-animate-css";
@import "substrateui/styles.css";
@source "../node_modules/substrateui";`}</code>
              </pre>
            </div>

            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">app.tsx</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>{`import { Button, Stack, Field, FieldLabel, Input } from 'substrateui'

export default function App() {
  return (
    <Stack gap="md">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Button variant="amber">Subscribe</Button>
    </Stack>
  )
}`}</code>
              </pre>
            </div>

            <div className="text-center">
              <Link href="/docs">
                <Button size="lg">
                  Read the Docs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Stack>
        </Center>
      </section>

    </div>
  )
}
