"use client"

import { Check, Copy, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cluster } from "@/components/ui/cluster"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { Switch } from "@/components/ui/switch"
import { useDisclosure } from "@/hooks/use-disclosure"
import { useClipboard } from "@/hooks/use-clipboard"
import { useCounter } from "@/hooks/use-misc"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { useToggle } from "@/hooks/use-toggle"
import * as React from "react"

export function DisclosureDemo() {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <Stack gap="sm">
      <Cluster gap="sm" align="center">
        <Switch checked={opened} onCheckedChange={() => toggle()} aria-label="Toggle panel" />
        <span className="text-sm text-muted-foreground">{opened ? "opened" : "closed"}</span>
      </Cluster>
      {opened && (
        <div className="rounded-md border-2 border-border bg-surface-raised p-4 text-sm">
          Panel content — driven by <code className="font-mono">useDisclosure</code>.
        </div>
      )}
    </Stack>
  )
}

export function ClipboardDemo() {
  const clipboard = useClipboard({ timeout: 1500 })
  return (
    <Button variant="outline" onClick={() => clipboard.copy("npx substrateui init")}>
      {clipboard.copied ? <Check /> : <Copy />}
      {clipboard.copied ? "Copied" : "Copy command"}
    </Button>
  )
}

export function CounterDemo() {
  const [count, { increment, decrement }] = useCounter(1, { min: 0, max: 10 })
  return (
    <Cluster gap="sm" align="center">
      <Button size="icon" variant="outline" onClick={decrement} aria-label="Decrement">
        <Minus />
      </Button>
      <span className="w-8 text-center font-mono text-lg font-bold">{count}</span>
      <Button size="icon" variant="outline" onClick={increment} aria-label="Increment">
        <Plus />
      </Button>
      <span className="text-xs text-muted-foreground">clamped 0–10</span>
    </Cluster>
  )
}

export function DebouncedDemo() {
  const [value, setValue] = React.useState("")
  const debounced = useDebouncedValue(value, 400)
  return (
    <Stack gap="sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type quickly…"
        className="max-w-xs"
      />
      <p className="text-sm text-muted-foreground">
        Debounced (400ms):{" "}
        <span className="font-mono text-foreground">{debounced || "—"}</span>
      </p>
    </Stack>
  )
}

export function ToggleDemo() {
  const [value, toggle] = useToggle(["sm", "md", "lg", "xl"] as const)
  return (
    <Cluster gap="sm" align="center">
      <Button variant="outline" onClick={() => toggle()}>
        Cycle size
      </Button>
      <Badge>{value}</Badge>
    </Cluster>
  )
}
