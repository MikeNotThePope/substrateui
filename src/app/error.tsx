"use client" // Error boundaries must be Client Components

import { useEffect } from "react"
import Link from "next/link"

import { Caps } from "@/components/caps"
import { Button } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import { Cluster } from "@/components/ui/cluster"
import { Stack } from "@/components/ui/stack"
import { H1, P, Mono } from "@/components/ui/typography"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  // Next 16.2 replaced `reset()` with `unstable_retry()`, which re-fetches the
  // segment rather than only re-rendering it — the difference between a real
  // retry and showing the same failure again.
  unstable_retry: () => void
}) {
  useEffect(() => {
    // No error reporting service is wired up yet, so the console is the only
    // place this is recoverable from. Swap for the reporter when one lands.
    console.error(error)
  }, [error])

  return (
    <Center max="2xl" className="px-4 py-24">
      <Stack gap="lg" className="items-start">
        <Caps className="text-muted-foreground">Error</Caps>
        <H1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
          Something went wrong.
        </H1>
        <P className="max-w-xl text-lg text-muted-foreground">
          This page failed to render. Trying again will re-fetch it — if it keeps failing, the
          issue is on our side and worth reporting.
        </P>
        {error.digest && (
          <Mono className="text-xs text-muted-foreground">digest: {error.digest}</Mono>
        )}
        <Cluster gap="sm">
          <Button size="lg" onClick={() => unstable_retry()}>
            Try again
          </Button>
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
