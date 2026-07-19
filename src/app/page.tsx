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
import { cn } from "@/lib/utils"
import pkg from "../../package.json"

// Derived once at build time (Server Component) — shows major.minor, e.g. "v0.2"
const version = "v" + pkg.version.split(".").slice(0, 2).join(".")

// ─── Feature Data ─────────────────────────────────────────────────────

const iconAccents = {
  plum: "bg-primary text-primary-foreground border-primary-border",
  amber: "bg-secondary-fill text-secondary-fill-foreground border-secondary-fill-border",
  plumSoft: "bg-accent text-accent-foreground border-primary",
  amberSoft: "bg-secondary-surface text-secondary-text border-secondary-fill",
} as const

const features = [
  {
    icon: Box,
    accent: "plum",
    title: "Chunky Borders",
    description: "border-2 everywhere. Intentional, tactile, unapologetic.",
  },
  {
    icon: Palette,
    accent: "amber",
    title: "OKLCH Color System",
    description: "Perceptually uniform. CVD-safe plum + amber pairing.",
  },
  {
    icon: Layers,
    accent: "plumSoft",
    title: "Tailwind CSS v4 Native",
    description: "@theme inline, no config file, CSS-first tokens.",
  },
  {
    icon: Moon,
    accent: "amberSoft",
    title: "Dark Mode as Token Swap",
    description: "Flip .dark and the whole system follows. Zero component changes.",
  },
  {
    icon: Blocks,
    accent: "amber",
    title: "70+ Components",
    description: "From atomic Button to organism App Shell. Batteries included.",
  },
  {
    icon: Puzzle,
    accent: "plum",
    title: "Composition Over Configuration",
    description: "Field context, sub-component patterns, slot-based APIs.",
  },
] as const

// ─── Token swatch strip ───────────────────────────────────────────────

const swatches = [
  "bg-plum-300",
  "bg-plum-500",
  "bg-plum-700",
  "bg-plum-900",
  "bg-amber-500",
  "bg-amber-300",
  "bg-amber-100",
] as const

// ─── Chunky code block ────────────────────────────────────────────────

function CodeBlock({ title, code, className }: { title: string; code: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border-2 shadow-hard", className)}>
      <div className="flex items-center gap-1.5 border-b-2 bg-muted px-4 py-2.5">
        <span aria-hidden className="h-3 w-3 rounded-full border-2 border-border bg-primary" />
        <span aria-hidden className="h-3 w-3 rounded-full border-2 border-border bg-secondary-fill" />
        <span aria-hidden className="h-3 w-3 rounded-full border-2 border-border bg-background" />
        <Mono className="ms-2 text-xs text-muted-foreground">{title}</Mono>
      </div>
      <pre className="overflow-x-auto bg-warm-950 p-4 text-sm text-warm-200 dark:bg-warm-900">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="overflow-hidden border-b-2 bg-[radial-gradient(var(--border-subtle)_1px,transparent_1px)] [background-size:24px_24px] py-16 md:py-24">
        <Center max="2xl" className="px-4">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Stack gap="lg" className="sui-enter items-start text-left">
              <Badge
                variant="outline"
                className="border-secondary-fill-border bg-secondary-surface font-mono text-xs text-secondary-text shadow-hard-sm"
              >
                {version} — early access
              </Badge>
              <H1 className="text-5xl font-bold tracking-tight md:text-7xl">
                <span className="relative isolate inline-block">
                  SubstrateUI
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 -z-10 h-3 -rotate-1 bg-secondary-fill md:bottom-2 md:h-5"
                  />
                </span>
              </H1>
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
                  <Button variant="amber" size="lg">Browse Components</Button>
                </Link>
              </Cluster>
              <div className="flex items-center gap-1.5 pt-2" aria-hidden>
                {swatches.map((swatch) => (
                  <span key={swatch} className={cn("h-5 w-5 rounded-sm border-2", swatch)} />
                ))}
                <Mono className="ms-2 text-xs text-muted-foreground">--raw-plum · --raw-amber</Mono>
              </div>
            </Stack>

            {/* Live component collage */}
            <div className="sui-enter sui-enter-2 relative mx-auto w-full max-w-md pb-4 pe-4">
              <Card className="rotate-1 shadow-hard-amber">
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
              <Badge className="absolute -top-3 -start-2 z-10 -rotate-6 shadow-hard-sm">
                Radix under the hood
              </Badge>
              <Badge
                variant="outline"
                className="absolute -bottom-2 end-8 z-10 rotate-3 border-secondary-fill-border bg-secondary-fill text-secondary-fill-foreground shadow-hard-sm"
              >
                dark mode ready
              </Badge>
            </div>
          </div>
        </Center>
      </section>

      {/* Features Grid */}
      <section className="border-b-2 bg-surface-page py-20">
        <Center max="2xl" className="px-4">
          <Stack gap="xl">
            <div className="text-center">
              <H2 className="text-3xl font-bold tracking-tight md:text-4xl">Built Different</H2>
              <P className="mt-2 text-muted-foreground">Every decision is intentional. Every token is earned.</P>
            </div>
            <Grid columns={3} gap="lg">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="sui-reveal transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
                >
                  <CardContent className="pt-6">
                    <Stack gap="sm">
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-md border-2 shadow-hard-sm",
                          iconAccents[feature.accent]
                        )}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
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
              <H2 className="text-3xl font-bold tracking-tight md:text-4xl">Quick Start</H2>
              <P className="mt-2 text-muted-foreground">Three imports and you&apos;re in.</P>
            </div>

            <CodeBlock
              className="sui-reveal"
              title="globals.css"
              code={`@import "tailwindcss";
@import "tw-animate-css";
@import "substrateui/styles.css";
@source "../node_modules/substrateui";`}
            />

            <CodeBlock
              className="sui-reveal"
              title="app.tsx"
              code={`import { Button, Stack, Field, FieldLabel, Input } from 'substrateui'

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
}`}
            />

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
