import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const aspectRatioProps: PropDef[] = [
  {
    name: "ratio",
    type: "number",
    default: "1",
    description:
      "The width-to-height ratio. For example, 16/9 for widescreen or 1 for a square.",
  },
]

export default function AspectRatioPage() {
  return (
    <DocPage
      title="AspectRatio"
      description="Constrains its child content to a given width-to-height ratio. Useful for images, videos, and embedded media that need consistent proportions."
    >
      {/* 16:9 Ratio */}
      <Stack gap="md">
        <H3>16:9 Widescreen</H3>
        <ComponentPreview
          code={`<AspectRatio ratio={16 / 9}>
  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
    <span className="text-muted-foreground">16:9</span>
  </div>
</AspectRatio>`}
        >
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                <span className="text-muted-foreground font-medium">16:9</span>
              </div>
            </AspectRatio>
          </div>
        </ComponentPreview>
      </Stack>

      {/* 1:1 Ratio */}
      <Stack gap="md">
        <H3>1:1 Square</H3>
        <ComponentPreview
          code={`<AspectRatio ratio={1}>
  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
    <span className="text-muted-foreground">1:1</span>
  </div>
</AspectRatio>`}
        >
          <div className="w-full max-w-[200px]">
            <AspectRatio ratio={1}>
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                <span className="text-muted-foreground font-medium">1:1</span>
              </div>
            </AspectRatio>
          </div>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={aspectRatioProps} />
      </Stack>
    </DocPage>
  )
}
