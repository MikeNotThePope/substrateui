"use client"

import { Check, Copy, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Cluster } from "@/components/ui/cluster"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { Switch } from "@/components/ui/switch"
import { Kbd } from "@/components/ui/kbd"
import { useDisclosure } from "@/hooks/use-disclosure"
import { useClipboard } from "@/hooks/use-clipboard"
import { useCounter } from "@/hooks/use-misc"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { useToggle } from "@/hooks/use-toggle"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useClickOutside } from "@/hooks/use-click-outside"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { useElementSize } from "@/hooks/use-element-size"
import { useIntersection } from "@/hooks/use-intersection"
import { useCountdown } from "@/hooks/use-countdown"
import { useIsMobile } from "@/hooks/use-mobile"
import { useAnnouncer } from "@/hooks/use-announcer"
import {
  usePrevious,
  useInterval,
  useMounted,
  useMergedRef,
} from "@/hooks/use-misc"
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

export function LocalStorageDemo() {
  const [note, setNote] = useLocalStorage("substrateui-docs-note", "")
  const mounted = useMounted()
  return (
    <Stack gap="sm">
      <Input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type something, then reload the page…"
        className="max-w-xs"
      />
      <p className="text-sm text-muted-foreground">
        {/* Guarded on `mounted`: the server has no localStorage, so rendering the
            stored value on the first pass would be a hydration mismatch. */}
        Stored under <code className="font-mono">substrateui-docs-note</code>:{" "}
        <span className="font-mono text-foreground">
          {mounted ? note || "—" : "…"}
        </span>
      </p>
      <Button variant="outline" size="sm" onClick={() => setNote("")}>
        Clear
      </Button>
    </Stack>
  )
}

export function MediaQueryDemo() {
  const isWide = useMediaQuery("(min-width: 768px)")
  const coarse = useMediaQuery("(pointer: coarse)")
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
  return (
    <Stack gap="sm" className="text-sm">
      <Cluster gap="sm" align="center">
        <Badge variant={isWide ? "success" : "outline"}>
          {isWide ? "matches" : "no match"}
        </Badge>
        <code className="font-mono">(min-width: 768px)</code>
      </Cluster>
      <Cluster gap="sm" align="center">
        <Badge variant={coarse ? "success" : "outline"}>
          {coarse ? "matches" : "no match"}
        </Badge>
        <code className="font-mono">(pointer: coarse)</code>
      </Cluster>
      <Cluster gap="sm" align="center">
        <Badge variant={reduced ? "success" : "outline"}>
          {reduced ? "matches" : "no match"}
        </Badge>
        <code className="font-mono">(prefers-reduced-motion: reduce)</code>
      </Cluster>
      <p className="text-muted-foreground">Resize the window to see the first one change.</p>
    </Stack>
  )
}

export function ClickOutsideDemo() {
  const [open, setOpen] = React.useState(false)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false))
  return (
    <Stack gap="sm">
      <Button variant="outline" onClick={() => setOpen(true)} disabled={open}>
        Open the panel
      </Button>
      {open && (
        <div
          ref={ref}
          className="rounded-md border-2 border-border bg-surface-raised p-4 text-sm"
        >
          Click anywhere outside this box to close it.
        </div>
      )}
    </Stack>
  )
}

export function HotkeysDemo() {
  const [last, setLast] = React.useState<string | null>(null)
  useHotkeys([
    ["mod+K", () => setLast("mod+K")],
    ["shift+?", () => setLast("shift+?")],
    ["Escape", () => setLast(null)],
  ])
  return (
    <Stack gap="sm" className="text-sm">
      <p className="text-muted-foreground">
        Press <Kbd keys={["Mod", "K"]} /> or <Kbd keys={["Shift", "?"]} />, then{" "}
        <Kbd>Esc</Kbd> to reset.
      </p>
      <p>
        Last fired:{" "}
        <span className="font-mono text-foreground">{last ?? "—"}</span>
      </p>
    </Stack>
  )
}

export function ElementSizeDemo() {
  const [ref, { width, height }] = useElementSize<HTMLTextAreaElement>()
  return (
    <Stack gap="sm">
      <textarea
        ref={ref}
        defaultValue="Drag my bottom-right corner."
        className="h-24 w-full max-w-xs resize rounded-md border-2 border-border bg-background p-2 text-sm"
      />
      <p className="text-sm text-muted-foreground">
        <span className="font-mono text-foreground">
          {Math.round(width)} × {Math.round(height)}
        </span>{" "}
        — reported by ResizeObserver, not by a resize event.
      </p>
    </Stack>
  )
}

export function IntersectionDemo() {
  const [ref, entry] = useIntersection<HTMLDivElement>({ threshold: 0.9 })
  const visible = entry?.isIntersecting ?? false
  return (
    <Stack gap="sm">
      <Cluster gap="sm" align="center">
        <Badge variant={visible ? "success" : "outline"}>
          {visible ? "in view" : "out of view"}
        </Badge>
        <span className="text-sm text-muted-foreground">
          threshold 0.9 — scroll the box
        </span>
      </Cluster>
      <div className="h-32 max-w-xs overflow-y-auto rounded-md border-2 border-border p-3">
        <p className="pb-24 text-sm text-muted-foreground">Scroll down…</p>
        <div
          ref={ref}
          className="rounded-md border-2 border-border bg-surface-raised p-4 text-sm"
        >
          Watched element
        </div>
        <p className="pt-24 text-sm text-muted-foreground">…and back up.</p>
      </div>
    </Stack>
  )
}

export function PreviousDemo() {
  const [value, setValue] = React.useState("")
  const previous = usePrevious(value)
  return (
    <Stack gap="sm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here…"
        className="max-w-xs"
      />
      <p className="text-sm text-muted-foreground">
        now <span className="font-mono text-foreground">{value || "—"}</span>,
        before <span className="font-mono text-foreground">{previous || "—"}</span>
      </p>
    </Stack>
  )
}

export function IntervalDemo() {
  const [ticks, setTicks] = React.useState(0)
  const [running, setRunning] = React.useState(false)
  useInterval(() => setTicks((n) => n + 1), 1000, running)
  return (
    <Cluster gap="sm" align="center">
      <Button variant="outline" onClick={() => setRunning((r) => !r)}>
        {running ? "Pause" : "Start"}
      </Button>
      <span className="w-10 text-center font-mono text-lg font-bold">{ticks}</span>
      <span className="text-xs text-muted-foreground">ticks, 1s apart</span>
    </Cluster>
  )
}

export function CountdownHookDemo() {
  // Fixed at mount rather than a module constant, so it doesn't start expired.
  const [deadline] = React.useState(() => new Date(Date.now() + 90_000))
  const { minutes, seconds, formatted, finished } = useCountdown(deadline)
  return (
    <Stack gap="sm" className="text-sm">
      <span className="font-mono text-2xl font-bold tabular-nums">{formatted}</span>
      <p className="text-muted-foreground">
        {finished
          ? "Finished."
          : `${minutes}m ${seconds}s left — the parts and a locale-formatted string.`}
      </p>
    </Stack>
  )
}

export function MountedDemo() {
  const mounted = useMounted()
  return (
    <Cluster gap="sm" align="center">
      <Badge variant={mounted ? "success" : "outline"}>
        {mounted ? "mounted" : "server render"}
      </Badge>
      <span className="text-sm text-muted-foreground">
        false on the server and on the first client pass, so both agree
      </span>
    </Cluster>
  )
}

export function MergedRefDemo() {
  const own = React.useRef<HTMLInputElement>(null)
  const [measured, { width }] = useElementSize<HTMLInputElement>()
  const ref = useMergedRef(own, measured)
  return (
    <Stack gap="sm">
      <Input ref={ref} placeholder="One element, two refs" className="max-w-xs" />
      <Cluster gap="sm" align="center">
        <Button variant="outline" size="sm" onClick={() => own.current?.focus()}>
          Focus via the first ref
        </Button>
        <span className="text-sm text-muted-foreground">
          measured by the second:{" "}
          <span className="font-mono text-foreground">{Math.round(width)}px</span>
        </span>
      </Cluster>
    </Stack>
  )
}

export function IsMobileDemo() {
  const isMobile = useIsMobile()
  return (
    <Cluster gap="sm" align="center">
      <Badge variant={isMobile ? "success" : "outline"}>
        {isMobile ? "mobile" : "not mobile"}
      </Badge>
      <span className="text-sm text-muted-foreground">
        below 768px — the same breakpoint Sidebar switches to a sheet at
      </span>
    </Cluster>
  )
}

export function AnnouncerDemo() {
  const { announce, clear } = useAnnouncer()
  const [count, setCount] = React.useState(0)
  return (
    <Stack gap="sm">
      <Cluster gap="sm">
        <Button
          variant="outline"
          onClick={() => {
            const next = count + 1
            setCount(next)
            announce(`${next} result${next === 1 ? "" : "s"} loaded`)
          }}
        >
          Load a result
        </Button>
        <Button variant="ghost" onClick={() => clear()}>
          Clear
        </Button>
      </Cluster>
      <p className="text-sm text-muted-foreground">
        {count} loaded. Nothing changes on screen — turn a screen reader on, or
        inspect the shared live region, to hear it.
      </p>
    </Stack>
  )
}
