"use client"

import { Caps } from "@/components/caps"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { cn } from "@/lib/utils"

/**
 * An install command, in whichever package manager the reader actually uses.
 *
 * The name is stated once, here. Getting Started used to print
 * `npm install substrateui` — the unscoped name, which is not this package and
 * fails to resolve — because the string was retyped per page. Defaulting
 * `packages` to the real name means a page cannot get it wrong by omission.
 *
 * The choice persists in localStorage under one key, so picking pnpm on the
 * homepage means Getting Started is already showing pnpm on arrival. useLocalStorage
 * broadcasts within the document too, so several of these on one page move
 * together rather than disagreeing with each other.
 */

const PKG = "@mikenotthepope/substrateui"

/** `add` is the install verb; the rest of the argv is identical everywhere. */
const MANAGERS = [
  { id: "bun", add: "bun add" },
  { id: "pnpm", add: "pnpm add" },
  { id: "npm", add: "npm install" },
  { id: "yarn", add: "yarn add" },
] as const

export function InstallCommand({
  packages = [PKG],
  className,
}: {
  packages?: string[]
  className?: string
}) {
  // Rendered before hydration and whenever nothing is stored. Bun first because
  // it is what the repo itself builds with.
  const [manager, setManager] = useLocalStorage<string>("sui-package-manager", "bun")

  // A stored value from an older build (or a hand-edited one) must not blank the
  // panel out — fall back rather than render a tablist with nothing selected.
  const active = MANAGERS.some((m) => m.id === manager) ? manager : "bun"

  return (
    <Tabs
      value={active}
      onValueChange={(value) => setManager(String(value))}
      className={cn("w-full overflow-hidden rounded-lg shadow-hard-sm", className)}
    >
      {/* The slug line names the plate, as on ComponentPreview: flush to the
          panel below it, not the free-floating pill TabsList paints by default. */}
      <TabsList className="flex h-auto w-full justify-start gap-1 rounded-none rounded-t-lg border-2 border-b-0 bg-muted p-1">
        {MANAGERS.map((m) => (
          <TabsTrigger key={m.id} value={m.id} className="rounded-sm px-2.5 py-1">
            <Caps>{m.id}</Caps>
          </TabsTrigger>
        ))}
      </TabsList>
      {MANAGERS.map((m) => (
        // mt-0 undoes the gap TabsContent leaves by default; here the panel is
        // the strip's other half rather than a thing sitting under it.
        <TabsContent key={m.id} value={m.id} className="mt-0">
          <CodeBlock
            code={`${m.add} ${packages.join(" ")}`}
            className="rounded-b-lg border-2 border-t-0"
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
