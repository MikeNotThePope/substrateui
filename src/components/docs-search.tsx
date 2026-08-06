"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"
import type { DocsIndexEntry } from "@/lib/docs-index"

/**
 * Search across every docs page.
 *
 * The index is built at build time from the pages themselves and handed down
 * as a prop, so there is no fetch, no loading state and nothing to keep in
 * sync. Filtering is Command's own — this palette is the Command component
 * doing the job it documents.
 */
export function DocsSearch({
  entries,
  className,
}: {
  entries: DocsIndexEntry[]
  className?: string
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [isMac, setIsMac] = React.useState(false)

  // Read the platform after mount: it differs between server and client, and
  // rendering the wrong modifier key would be a hydration mismatch. Sniffing
  // userAgent because navigator.platform is deprecated.
  React.useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.userAgent))
  }, [])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return
      // Browsers bind Cmd/Ctrl+K to the address bar; this only overrides it
      // while the docs are focused, which is where the shortcut is advertised.
      event.preventDefault()
      setOpen((prev) => !prev)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  const grouped = React.useMemo(() => {
    const map = new Map<string, DocsIndexEntry[]>()
    for (const entry of entries) {
      const list = map.get(entry.group)
      if (list) list.push(entry)
      else map.set(entry.group, [entry])
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [entries])

  const go = React.useCallback(
    (route: string) => {
      setOpen(false)
      router.push(route)
    },
    [router],
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md border-2 border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        <Search className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
        <span className="flex-1 text-start">Search docs…</span>
        <Kbd keys={isMac ? ["⌘", "K"] : ["Ctrl", "K"]} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search documentation</DialogTitle>
        <DialogDescription className="sr-only">
          Find a component, token or guide by name. Use the arrow keys to move between results.
        </DialogDescription>
        <CommandInput placeholder="Search components, tokens and guides…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          {grouped.map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((entry) => (
                <CommandItem
                  key={entry.route}
                  // The route is the value so onSelect receives it directly;
                  // title and description ride along as keywords so the filter
                  // searches prose, not just page names.
                  value={entry.route}
                  keywords={[entry.title, entry.description, entry.group]}
                  onSelect={go}
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="font-medium">{entry.title}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {entry.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
