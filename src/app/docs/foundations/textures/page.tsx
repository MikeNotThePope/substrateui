import { DocPage } from "../../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"

const textures = [
  {
    cls: "texture-noise",
    label: "Noise",
    blurb: "SVG grain — paper-like tooth for large flat surfaces.",
  },
  {
    cls: "texture-lines",
    label: "Lines",
    blurb: "Horizontal hairlines — editorial rhythm for heroes and CTAs.",
  },
  {
    cls: "texture-grid",
    label: "Grid",
    blurb: "Blueprint grid — technical feel for process or spec sections.",
  },
]

const usageExample = `<section className="bg-surface-page texture-noise">
  ...
</section>`

export default function TexturesPage() {
  return (
    <DocPage
      title="Textures"
      description="Optional pure-CSS background patterns for tactile depth. Zero dependencies, token-driven, theme- and mode-aware."
    >
      <Stack gap="md">
        <H3>The utilities</H3>
        <P>
          Three opt-in classes, layered onto whatever background color the
          element already has. Line and grid inks derive from the foreground
          token via <Code>color-mix</Code>, so they adapt to every theme and
          mode automatically; the noise tile is a low-opacity SVG grain that
          reads on any surface.
        </P>
        <div className="grid gap-4 sm:grid-cols-3">
          {textures.map((t) => (
            <Stack gap="sm" key={t.cls}>
              <div
                className={`${t.cls} bg-surface-page border-2 rounded-lg h-36`}
                role="img"
                aria-label={`${t.label} texture swatch`}
              />
              <P className="font-medium">
                <Code>{t.cls}</Code>
              </P>
              <P className="text-sm text-muted-foreground">{t.blurb}</P>
            </Stack>
          ))}
        </div>
      </Stack>

      <Stack gap="md">
        <H3>Usage</H3>
        <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto rounded-md" dir="ltr">
          <code>{usageExample}</code>
        </pre>
        <P>
          Textures are seasoning, not structure: use at most one per
          section, keep them on large surfaces (heroes, section
          backgrounds, empty states), and never put them behind dense text
          or small controls. They are decorative by design — at 5% ink they
          have no effect on contrast compliance.
        </P>
      </Stack>
    </DocPage>
  )
}
