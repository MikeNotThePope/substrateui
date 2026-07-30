import { H3 } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { CodeBlock } from "./code-block"

/**
 * The Import section: the one line you actually need to paste.
 *
 * Not an Installation section. shadcn prints an install command on every
 * component page because its CLI copies source into your repo; ours is an
 * installed package (see bin/substrateui.mjs), so you install once and the
 * per-page fact is which symbols come from where. Package-manager tabs live
 * on Getting Started.
 */
export function ImportLine({
  names,
  entry = "@mikenotthepope/substrateui",
}: {
  names: string[]
  entry?: string
}) {
  // One symbol stays on one line; several break so the list stays scannable
  // and the diff of adding one is a single line.
  const inner =
    names.length > 1 ? `{\n  ${names.join(",\n  ")},\n}` : `{ ${names[0]} }`

  return (
    <Stack gap="md">
      <H3>Import</H3>
      <CodeBlock code={`import ${inner} from "${entry}"`} className="rounded-lg border-2" />
    </Stack>
  )
}
