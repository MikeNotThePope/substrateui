import Link from "next/link"
import type { Metadata } from "next"

import { Caps } from "@/components/caps"
import { Button } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import { Cluster } from "@/components/ui/cluster"
import { Stack } from "@/components/ui/stack"
import { H1, P } from "@/components/ui/typography"

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist.",
  // A 404 already carries noindex from Next, but the canonical would
  // otherwise point every dead URL at itself.
  alternates: { canonical: undefined },
}

export default function NotFound() {
  return (
    <Center max="2xl" className="px-4 py-24">
      <Stack gap="lg" className="items-start">
        <Caps className="text-muted-foreground">Error 404</Caps>
        <H1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          That page does not exist.
        </H1>
        <P className="max-w-xl text-lg text-muted-foreground">
          The link may be out of date, or the page may have moved. The component index is the
          fastest way back to whatever you were looking for.
        </P>
        <Cluster gap="sm">
          <Link href="/docs">
            <Button size="lg">Browse the docs</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              Go home
            </Button>
          </Link>
        </Cluster>
      </Stack>
    </Center>
  )
}
