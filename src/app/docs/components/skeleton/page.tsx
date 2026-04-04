import { Skeleton } from "@/components/ui/skeleton"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const skeletonProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "CSS classes to control the size and shape of the skeleton placeholder. Use rounded-full for circles, h-* and w-* for dimensions.",
  },
]

export default function SkeletonPage() {
  return (
    <DocPage
      title="Skeleton"
      description="A placeholder element that pulses to indicate content is loading. Compose multiple skeletons to match the shape of your real content."
    >
      <Stack gap="md">
        <H3>Card-Like Layout</H3>
        <ComponentPreview
          code={`{/* Avatar + text lines */}
<div className="flex items-center gap-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-48" />
    <Skeleton className="h-4 w-32" />
  </div>
</div>

{/* Content rectangle */}
<Skeleton className="h-32 w-full rounded-lg" />`}
        >
          <Stack gap="md" className="w-full">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-32 w-full rounded-lg" />
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={skeletonProps} />
      </Stack>
    </DocPage>
  )
}
