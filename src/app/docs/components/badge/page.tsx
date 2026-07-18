import { Check, Clock, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const badgeProps: PropDef[] = [
  {
    name: "variant",
    type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error" | "info"',
    default: '"default"',
    description:
      "The visual style of the badge. Each variant uses a distinct color scheme suited to its semantic meaning.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the badge element.",
  },
]

export default function BadgePage() {
  return (
    <DocPage
      title="Badge"
      description="A compact label for displaying status, category, or metadata. Supports semantic color variants for clear visual communication."
    >
      {/* Variants */}
      <Stack gap="md">
        <H3>Variants</H3>
        <ComponentPreview
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`}
        >
          <Cluster gap="sm">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* In Context */}
      <Stack gap="md">
        <H3>In Context</H3>
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Deployment v2.4.1</CardTitle>
      <Badge variant="success">Live</Badge>
    </div>
    <CardDescription>
      Deployed to production 3 minutes ago.
    </CardDescription>
  </CardHeader>
</Card>

<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Deployment v2.4.0</CardTitle>
      <Badge variant="warning">Rolling back</Badge>
    </div>
    <CardDescription>
      Rollback initiated due to elevated error rate.
    </CardDescription>
  </CardHeader>
</Card>`}
        >
          <Stack gap="md" className="w-full">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Deployment v2.4.1</CardTitle>
                  <Badge variant="success">Live</Badge>
                </div>
                <CardDescription>
                  Deployed to production 3 minutes ago.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Deployment v2.4.0</CardTitle>
                  <Badge variant="warning">Rolling back</Badge>
                </div>
                <CardDescription>
                  Rollback initiated due to elevated error rate.
                </CardDescription>
              </CardHeader>
            </Card>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={badgeProps} />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Don&apos;t rely on color alone to communicate status. Badge
            variants have distinct colors, but users with color vision
            deficiency or monochrome displays will not distinguish them.
            Pair status badges with an icon or explicit text so the meaning
            is carried by more than hue.
          </P>
          <ComponentPreview
            code={`<Badge variant="success"><Check /> Active</Badge>
<Badge variant="secondary"><Clock /> Pending</Badge>
<Badge variant="destructive"><X /> Failed</Badge>`}
          >
            <Cluster gap="sm">
              <Badge variant="success">
                <Check className="w-3 h-3 mr-1" /> Active
              </Badge>
              <Badge variant="secondary">
                <Clock className="w-3 h-3 mr-1" /> Pending
              </Badge>
              <Badge variant="destructive">
                <X className="w-3 h-3 mr-1" /> Failed
              </Badge>
            </Cluster>
          </ComponentPreview>
        </Stack>
      </Stack>
    </DocPage>
  )
}
