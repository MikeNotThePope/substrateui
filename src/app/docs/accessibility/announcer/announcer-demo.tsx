"use client"

import * as React from "react"

import { useAnnouncer } from "@/hooks/use-announcer"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"

export function AnnouncerDemo() {
  const { announce } = useAnnouncer()
  const [log, setLog] = React.useState<string[]>([])

  function say(message: string, assertiveness: "assertive" | "polite") {
    announce(message, assertiveness)
    setLog((prev) => [`[${assertiveness}] ${message}`, ...prev].slice(0, 5))
  }

  return (
    <Stack gap="md" className="w-full">
      <Cluster gap="sm">
        <Button onClick={() => say(`${Math.ceil(Math.random() * 40)} results loaded`, "polite")}>
          Announce (polite)
        </Button>
        <Button
          variant="outline"
          onClick={() => say("Error: could not save changes", "assertive")}
        >
          Announce (assertive)
        </Button>
      </Cluster>

      <div className="rounded-lg border-2 border-border bg-muted/40 p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Sighted mirror (what a screen reader just heard)
        </p>
        {log.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing announced yet — turn on a screen reader and press a button.
          </p>
        ) : (
          <ul className="space-y-1 font-mono text-sm text-foreground">
            {log.map((line, i) => (
              <li key={`${line}-${i}`}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    </Stack>
  )
}
