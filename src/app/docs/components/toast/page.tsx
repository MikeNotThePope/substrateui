"use client"

import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const toastProps: PropDef[] = [
  {
    name: "toast(message)",
    type: "function",
    default: undefined,
    description: "Shows a default toast notification with the given message string.",
  },
  {
    name: "toast.success(message)",
    type: "function",
    default: undefined,
    description: "Shows a success toast with a green check icon.",
  },
  {
    name: "toast.error(message)",
    type: "function",
    default: undefined,
    description: "Shows an error toast with a red icon.",
  },
  {
    name: "toast.warning(message)",
    type: "function",
    default: undefined,
    description: "Shows a warning toast with a yellow icon.",
  },
  {
    name: "description",
    type: "string",
    default: undefined,
    description:
      "Optional description passed as second argument options: toast('Title', { description: '...' }).",
  },
]

export default function ToastPage() {
  return (
    <DocPage
      title="Toast"
      description="A non-intrusive notification that appears temporarily. Powered by Sonner. The <Toaster /> component must be placed in your root layout."
    >
      {/* Toast Examples */}
      <Stack gap="md">
        <H3>Trigger Toasts</H3>
        <ComponentPreview
          code={`import { toast } from "sonner"

toast("Event has been created")
toast.success("Profile saved successfully")
toast.error("Something went wrong")
toast.warning("Please review your input")`}
        >
          <Cluster gap="sm">
            <Button variant="outline" onClick={() => toast("Event has been created")}>
              Default Toast
            </Button>
            <Button variant="outline" onClick={() => toast.success("Profile saved successfully")}>
              Success Toast
            </Button>
            <Button variant="outline" onClick={() => toast.error("Something went wrong")}>
              Error Toast
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Please review your input")}>
              Warning Toast
            </Button>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={toastProps} />
      </Stack>

      <Toaster />
    </DocPage>
  )
}
