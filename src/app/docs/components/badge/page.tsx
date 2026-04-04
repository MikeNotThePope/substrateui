import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const badgeProps: PropDef[] = [
  {
    name: "variant",
    type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error"',
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
<Badge variant="error">Error</Badge>`}
        >
          <Cluster gap="sm">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
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
    </DocPage>
  )
}
