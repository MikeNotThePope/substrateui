"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/ui/countdown"
import { Stack } from "@/components/ui/stack"
import { StatCard } from "@/components/stat-card"

/**
 * Seeds the deadline once. Computing `Date.now() + n` inline in JSX would
 * recompute it on every render, so the countdown would reset instead of tick.
 */
function useDeadline(seconds: number) {
  const [deadline, setDeadline] = React.useState(() => Date.now() + seconds * 1000)
  const restart = React.useCallback(
    () => setDeadline(Date.now() + seconds * 1000),
    [seconds]
  )
  return [deadline, restart] as const
}

export function CountdownDemo() {
  const [deadline, restart] = useDeadline(90)

  return (
    <Stack gap="sm" align="start">
      <Countdown deadline={deadline} className="text-3xl font-bold" />
      <Button size="sm" variant="outline" onClick={restart}>
        Restart
      </Button>
    </Stack>
  )
}

export function CountdownRenderDemo() {
  const [deadline] = useDeadline(3 * 3600 + 725)

  return (
    <Countdown deadline={deadline} className="text-2xl font-bold">
      {({ hours, minutes, seconds, finished }) =>
        finished ? "Doors open" : `${hours}h ${minutes}m ${seconds}s`
      }
    </Countdown>
  )
}

export function CountdownStatCardDemo() {
  const [deadline] = useDeadline(2 * 86400 + 3 * 3600 + 245)

  return (
    <div className="w-64">
      <StatCard title="Sale ends" value={<Countdown deadline={deadline} />} />
    </div>
  )
}
