import Link from "next/link"

import { Caps } from "@/components/caps"
import { InstallCommand } from "@/components/install-command"
import { RegMark } from "@/components/reg-mark"
import { ThemeStrip } from "@/components/theme-strip"
import { H1, H2, H3, P, Lead, Mono } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { Center } from "@/components/ui/center"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { softwareJsonLd } from "@/lib/site"
import pkg from "../../package.json"

const version = "v" + pkg.version.split(".").slice(0, 2).join(".")

// ─── Tint ramp ────────────────────────────────────────────────────────
// Each token stepped down against the background at 25/50/75/100%.
// Mixed in oklab, NOT oklch: oklch interpolates hue on the shortest arc,
// so yellow stepped toward a cool background swings through green on the
// way. A tint is the same colour at lower strength — no hue rotation.

const TINTS = [25, 50, 75, 100] as const

const tintRamps = [
  { token: "--primary", label: "Primary" },
  { token: "--secondary-fill", label: "Secondary" },
  { token: "--foreground", label: "Neutral" },
] as const

function TintRamp({ token, label }: { token: string; label: string }) {
  return (
    <Stack gap="sm">
      <div aria-hidden className="flex h-10 overflow-hidden rounded-md border-2">
        {TINTS.map((pct) => (
          <span
            key={pct}
            className="flex-1"
            style={{ background: `color-mix(in oklab, var(${token}) ${pct}%, var(--background))` }}
          />
        ))}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <Caps>{label}</Caps>
        <Mono className="text-xs text-muted-foreground">{token}</Mono>
      </div>
    </Stack>
  )
}

// ─── Job docket ───────────────────────────────────────────────────────
// Replaces the feature-card grid. A docket is real press furniture and
// carries more information per pixel than six icons in rounded squares.

const docket: Array<[string, string, string]> = [
  ["Components", "75", "atomic Button through organism App Shell"],
  ["Themes", "5", "proof · substrate · lava · tundra · plum"],
  ["Audited pairs", "35", "per theme, light and dark. A failing ratio fails the build."],
  ["Colour", "OKLCH", "perceptually uniform ramps, so contrast is computed, not eyeballed"],
  ["Primitives", "Base UI", "focus management, dismissal and ARIA are handled"],
  ["CSS", "Tailwind v4", "@theme inline — no config file"],
  ["Peer deps", "react ≥ 18", "tailwindcss ≥ 4 · next and next-themes optional"],
  ["Licence", "MIT", "fork it, ship it, sell it"],
  ["Support", "None", "issues welcome, replies not promised"],
  ["Users", "1", "hi"],
]

// ─── Who it's for ─────────────────────────────────────────────────────
// Deliberately no competitor named. Each claim maps to something in the
// repo — the contrast audit, the token indirection, the peer-dep list —
// so none of it goes stale without a build failing first.

const audience: Array<{ heading: string; body: string }> = [
  {
    heading: "More than one brand",
    body: "A theme is a token map, and no component ever learns its name. Adding the sixth palette costs a file, not a refactor — and light and dark come with it.",
  },
  {
    heading: "Accessibility as a requirement",
    body: "35 colour pairings per theme are checked against WCAG AA on every commit, and a failing ratio fails the build. Base UI handles focus, dismissal and ARIA underneath.",
  },
  {
    heading: "Owning your own stack",
    body: "MIT, no runtime service, no account. React 18+ and Tailwind v4 are the only hard peers — Next and next-themes are optional, so it is not a Next.js-only system.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background outline-none">
      {/* Structured data. Next does not emit this from `metadata`, so it goes
          in the body as a script tag — which is valid and what Google's own
          guidance shows. */}
      <script
        type="application/ld+json"
        // The payload is built from constants in this repo, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd({ version: pkg.version })) }}
      />
      {/* ── Thesis + the fan deck ─────────────────────────────── */}
      <section className="border-b-2 py-16 md:py-24">
        <Center max="2xl" className="px-4">
          <Stack gap="xl">
            <Stack gap="lg" className="sui-enter items-start text-left">
              <Cluster gap="sm" className="items-center">
                <RegMark className="h-4 w-4 text-primary" />
                <Caps className="text-muted-foreground">{version} · MIT · React 18+ · no roadmap</Caps>
              </Cluster>

              <H1 className="font-display text-5xl font-extrabold tracking-tight md:text-7xl">
                A themeable React design system. Use it{" "}
                <span className="relative isolate inline-block">
                  or don&rsquo;t
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-secondary-fill md:bottom-2 md:h-5"
                  />
                </span>
                .
              </H1>

              <Lead className="max-w-2xl text-lg md:text-xl">
                I built it for my own projects. 75 components, five themes, every colour pairing
                audited against WCAG AA &mdash; because I&rsquo;m the one who has to look at it. Set one
                attribute and everything repaints, including the components you wrote.
              </Lead>

              <InstallCommand className="max-w-xl" />

              <Cluster gap="sm">
                <Link href="/docs">
                  <Button size="lg">Read the docs</Button>
                </Link>
                <Link href="/docs/tokens">
                  <Button variant="outline" size="lg">
                    See the tokens
                  </Button>
                </Link>
              </Cluster>
            </Stack>

            {/* The signature. Every chip paints itself in the theme it
                selects, so the deck is the demo rather than a control. */}
            <div className="sui-enter sui-enter-2">
              <ThemeStrip />
              <Mono className="mt-3 block text-xs text-muted-foreground">
                pick a theme. this page is the demo. yes, that&rsquo;s a lot of themes for one person.
              </Mono>
            </div>
          </Stack>
        </Center>
      </section>

      {/* ── Tint ramps ────────────────────────────────────────── */}
      <section className="border-b-2 bg-surface-page py-12">
        <Center max="2xl" className="px-4">
          <Stack gap="lg">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Caps className="text-muted-foreground">Tint ramps</Caps>
              <Mono className="text-xs text-muted-foreground">
                tints mixed in oklab · 25 / 50 / 75 / 100%
              </Mono>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tintRamps.map((ramp) => (
                <TintRamp key={ramp.token} {...ramp} />
              ))}
            </div>
          </Stack>
        </Center>
      </section>

      {/* ── Live UI beside the map that produced it ───────────── */}
      <section className="border-b-2 py-20">
        <Center max="2xl" className="px-4">
          <Stack gap="xl">
            <Stack gap="sm">
              <Caps className="text-muted-foreground">Live</Caps>
              <H2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                The same markup in every theme.
              </H2>
              <P className="max-w-2xl text-muted-foreground">
                Nothing on the left knows which theme it is in. The map on the right is the only
                thing that changed — and it is the whole theme, not an excerpt.
              </P>
            </Stack>

            <div className="grid items-start gap-8 lg:grid-cols-2">
              <Card className="sui-reveal">
                <CardHeader>
                  <Cluster gap="sm" className="items-center justify-between">
                    <CardTitle>Project settings</CardTitle>
                    <Badge variant="outline">Draft</Badge>
                  </Cluster>
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    <Field>
                      <FieldLabel>Repository name</FieldLabel>
                      <Input defaultValue="storefront" />
                      <FieldHint>Lowercase, no spaces.</FieldHint>
                    </Field>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <P className="text-sm font-medium">Preview deployments</P>
                        <P className="text-xs text-muted-foreground">Build every pull request.</P>
                      </div>
                      <Switch defaultChecked aria-label="Preview deployments" />
                    </div>
                  </Stack>
                </CardContent>
                <CardFooter>
                  <Cluster gap="sm">
                    <Button>Save changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </Cluster>
                </CardFooter>
              </Card>

              <Stack gap="sm" className="sui-reveal">
                <Caps className="text-muted-foreground">theme.ts</Caps>
                <div className="overflow-hidden rounded-lg border-2 shadow-hard">
                  <pre className="overflow-x-auto bg-warm-950 p-4 text-sm text-warm-200 dark:bg-warm-900">
                    <code>{`import { createTheme, ThemeRegistry } from 'substrateui'

const proof = createTheme({
  name: 'proof',
  light: { primary: 'oklch(0.520 0.133 232)' },
  dark:  { primary: 'oklch(0.750 0.115 233)' },
})

// Wrap once — every component below repaints.
<ThemeRegistry themes={[proof]} defaultTheme="proof">
  <App />
</ThemeRegistry>`}</code>
                  </pre>
                </div>
                <P className="text-sm text-muted-foreground">
                  A theme sets palette, motion curve and corner radius. Light and dark come with it.
                </P>
              </Stack>
            </div>
          </Stack>
        </Center>
      </section>

      {/* ── Who it's for ──────────────────────────────────────── */}
      <section className="border-b-2 bg-surface-page py-20">
        <Center max="2xl" className="px-4">
          <Stack gap="xl">
            <Stack gap="sm">
              <Caps className="text-muted-foreground">Fit</Caps>
              <H2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Who it&apos;s for
              </H2>
              <P className="max-w-2xl text-muted-foreground">
                Me, mostly. If you recognise yourself below, help yourself &mdash; every claim is
                checked by the build, not by me.
              </P>
            </Stack>

            <div className="grid gap-6 md:grid-cols-3">
              {audience.map(({ heading, body }) => (
                <Stack key={heading} gap="sm" className="border-t-2 pt-4">
                  <H3 className="font-display text-lg font-bold">{heading}</H3>
                  <P className="text-sm text-muted-foreground">{body}</P>
                </Stack>
              ))}
            </div>
          </Stack>
        </Center>
      </section>

      {/* ── Job docket ────────────────────────────────────────── */}
      <section className="py-20">
        <Center max="2xl" className="px-4">
          <Stack gap="xl">
            <Stack gap="sm">
              <Caps className="text-muted-foreground">Job docket</Caps>
              <H2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">What you get, roughly</H2>
            </Stack>

            <div className="overflow-hidden rounded-lg border-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[28%]">Item</TableHead>
                    <TableHead className="w-[18%]">Value</TableHead>
                    <TableHead>Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docket.map(([item, value, detail]) => (
                    <TableRow key={item}>
                      <TableCell>
                        <Caps>{item}</Caps>
                      </TableCell>
                      <TableCell className="font-semibold">{value}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{detail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Stack gap="md">
              <H3 className="font-display text-lg font-bold">Bring your own theme</H3>
              <P className="max-w-2xl text-muted-foreground">
                Five themes ship, but the set is open. A theme is a token map — no component ever
                learns its name.
              </P>
              <Cluster gap="sm">
                <Link href="/docs/foundations/theming">
                  <Button size="lg">Theming guide</Button>
                </Link>
                <Link href="/docs/foundations/themes">
                  <Button variant="outline" size="lg">
                    Theme DNA
                  </Button>
                </Link>
              </Cluster>
            </Stack>
          </Stack>
        </Center>
      </section>
    </main>
  )
}
