"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const tooltipProps: PropDef[] = [
  {
    name: "content",
    type: "React.ReactNode",
    default: undefined,
    description: "The content displayed inside the tooltip. Passed as children of TooltipContent.",
    required: true,
  },
  {
    name: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"top"',
    description: "The preferred side of the trigger to render the tooltip.",
  },
  {
    name: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "The preferred alignment against the trigger.",
  },
]

export default function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      description="A small popup that appears on hover to provide additional context. Must be wrapped in a TooltipProvider."
    >
      {/* Basic Tooltip */}
      <Stack gap="md">
        <H3>Basic Tooltip</H3>
        <ComponentPreview
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>This is a tooltip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={tooltipProps} />
      </Stack>
    </DocPage>
  )
}
