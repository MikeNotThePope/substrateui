import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const alertProps: PropDef[] = [
  {
    name: "variant",
    type: '"default" | "destructive" | "success" | "warning" | "info"',
    default: '"default"',
    description:
      "The visual style of the alert. Each variant uses its corresponding status color from the design tokens.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the alert element.",
  },
]

export default function AlertPage() {
  return (
    <DocPage
      title="Alert"
      description="Displays a callout message to attract user attention. Supports icons and semantic variants for informational, success, warning, and error states."
    >
      {/* Alert Types */}
      <Stack gap="md">
        <H3>Alert Types</H3>
        <ComponentPreview
          code={`<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

<Alert variant="info">
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>A new version is available.</AlertDescription>
</Alert>

<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Your session is about to expire.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>`}
        >
          <Stack gap="sm" className="w-full">
            <Alert>
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>This is a default alert.</AlertDescription>
            </Alert>
            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>A new version is available.</AlertDescription>
            </Alert>
            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>Your session is about to expire.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again.</AlertDescription>
            </Alert>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={alertProps} />
      </Stack>
    </DocPage>
  )
}
