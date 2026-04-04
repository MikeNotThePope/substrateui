import {
  FormActions,
  FormActionsPrimary,
  FormActionsSecondary,
} from "@/components/ui/form-actions"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const formActionsProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "Additional CSS classes to apply to the form actions container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description:
      "Action buttons. When using sub-components (FormActionsPrimary / FormActionsSecondary), buttons are split left and right. Otherwise, buttons are right-aligned.",
  },
]

const formActionsPrimaryProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the primary actions container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Primary action buttons (e.g., Save, Submit), aligned right.",
  },
]

const formActionsSecondaryProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the secondary actions container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description:
      "Secondary action buttons (e.g., Delete, Reset), aligned left.",
  },
]

export default function FormActionsPage() {
  return (
    <DocPage
      title="FormActions"
      description="A horizontal action bar for form submit and cancel buttons, separated by a top border. Supports simple right-aligned buttons or split primary/secondary layout."
    >
      {/* Simple Actions */}
      <Stack gap="md">
        <H3>Simple Actions</H3>
        <ComponentPreview
          code={`<FormActions>
  <Button variant="outline">Cancel</Button>
  <Button>Save changes</Button>
</FormActions>`}
        >
          <div className="w-full max-w-lg">
            <FormActions>
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </FormActions>
          </div>
        </ComponentPreview>
      </Stack>

      {/* Split Layout */}
      <Stack gap="md">
        <H3>Split Layout</H3>
        <ComponentPreview
          code={`<FormActions>
  <FormActionsSecondary>
    <Button variant="destructive">Delete account</Button>
  </FormActionsSecondary>
  <FormActionsPrimary>
    <Button variant="outline">Cancel</Button>
    <Button>Save changes</Button>
  </FormActionsPrimary>
</FormActions>`}
        >
          <div className="w-full max-w-lg">
            <FormActions>
              <FormActionsSecondary>
                <Button variant="destructive">Delete account</Button>
              </FormActionsSecondary>
              <FormActionsPrimary>
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </FormActionsPrimary>
            </FormActions>
          </div>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>

        <H3>FormActions</H3>
        <PropsTable props={formActionsProps} />

        <H3>FormActionsPrimary</H3>
        <PropsTable props={formActionsPrimaryProps} />

        <H3>FormActionsSecondary</H3>
        <PropsTable props={formActionsSecondaryProps} />
      </Stack>
    </DocPage>
  )
}
