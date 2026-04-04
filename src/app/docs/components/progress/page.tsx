import { Progress } from "@/components/ui/progress"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const progressProps: PropDef[] = [
  {
    name: "value",
    type: "number",
    default: "0",
    description: "The current progress value, between 0 and 100.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the progress bar container.",
  },
]

export default function ProgressPage() {
  return (
    <DocPage
      title="Progress"
      description="A horizontal bar that indicates the completion progress of a task. Animates smoothly between values."
    >
      {/* Progress Values */}
      <Stack gap="md">
        <H3>Progress Values</H3>
        <ComponentPreview
          code={`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
        >
          <Stack gap="md" className="w-full">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">25%</p>
              <Progress value={25} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">50%</p>
              <Progress value={50} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">75%</p>
              <Progress value={75} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">100%</p>
              <Progress value={100} />
            </div>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={progressProps} />
      </Stack>
    </DocPage>
  )
}
