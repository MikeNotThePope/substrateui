import * as React from "react"
import { DocPage } from "../../_components/doc-page"
import { H2, P, Mono, Small } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import contrastData from "./contrast-data.json"

interface PairingResult {
  name: string
  fg: string
  bg: string
  type: "normal" | "large" | "ui"
  backdrop: string | null
  required: number
  light: number | null
  dark: number | null
  lightPass: boolean
  darkPass: boolean
}

const results = contrastData.results as PairingResult[]

// ─── Grouping ─────────────────────────────────────────────────────────

const groups: { title: string; match: (r: PairingResult) => boolean }[] = [
  {
    title: "Core",
    match: (r) =>
      !r.name.includes("sidebar") &&
      !r.name.includes("surface-") &&
      !r.name.includes("status-") &&
      !r.name.includes("amber button") &&
      r.type !== "ui",
  },
  { title: "Sidebar", match: (r) => r.name.includes("sidebar") },
  { title: "Surfaces", match: (r) => r.name.includes("surface-") },
  { title: "Status", match: (r) => r.name.includes("status-") },
  { title: "Amber Button", match: (r) => r.name.includes("amber button") },
  { title: "UI Elements", match: (r) => r.type === "ui" },
]

// ─── Sample renderer ──────────────────────────────────────────────────

function Sample({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  return (
    <div
      className="rounded-md border-2 px-3 py-2 inline-flex items-center justify-center min-w-[80px]"
      style={{
        color: `var(--${fg})`,
        backgroundColor: `var(--${bg})`,
      }}
    >
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

function RatioCell({ ratio, pass }: { ratio: number | null; pass: boolean }) {
  if (ratio === null) {
    return <span className="text-muted-foreground">—</span>
  }
  return (
    <Cluster>
      <Mono className="text-sm">{ratio.toFixed(2)}:1</Mono>
      <Badge variant={pass ? "secondary" : "destructive"} className="text-xs">
        {pass ? "PASS" : "FAIL"}
      </Badge>
    </Cluster>
  )
}

// Tiny inline cluster to avoid importing an extra component
function Cluster({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>
}

// ─── Page ─────────────────────────────────────────────────────────────

export default function ContrastPage() {
  const generated = new Date(contrastData.generatedAt).toLocaleString()
  const totalPassing = results.filter((r) => r.lightPass && r.darkPass).length

  return (
    <DocPage
      title="Contrast Matrix"
      description="Every meaningful foreground/background pairing in SubstrateUI, audited against WCAG AA thresholds in both light and dark mode."
    >
      <Stack gap="lg">
        <section>
          <P>
            SubstrateUI ships with every color pairing verified: {totalPassing} of{" "}
            {results.length} pairings pass WCAG AA contrast requirements. Normal text requires{" "}
            <Mono>4.5:1</Mono>; large text and essential UI elements require <Mono>3:1</Mono>.
            Translucent surfaces are composited against their parent surface before measurement —
            the numbers below reflect what users actually see on screen.
          </P>
          <Small className="text-muted-foreground">
            Last audited: {generated}. Run <Mono>npm run audit:contrast</Mono> to regenerate.
          </Small>
        </section>

        {groups.map((group) => {
          const rows = results.filter(group.match)
          if (rows.length === 0) return null
          return (
            <section key={group.title}>
              <H2 className="mb-4">{group.title}</H2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pairing</TableHead>
                    <TableHead>Sample</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Light</TableHead>
                    <TableHead>Dark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.name}>
                      <TableCell>
                        <Mono className="text-xs">
                          {r.fg} / {r.bg}
                        </Mono>
                      </TableCell>
                      <TableCell>
                        <Sample fg={r.fg} bg={r.bg} label="Aa" />
                      </TableCell>
                      <TableCell>
                        <Mono className="text-xs">{r.required}:1</Mono>
                      </TableCell>
                      <TableCell>
                        <RatioCell ratio={r.light} pass={r.lightPass} />
                      </TableCell>
                      <TableCell>
                        <RatioCell ratio={r.dark} pass={r.darkPass} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          )
        })}
      </Stack>
    </DocPage>
  )
}
