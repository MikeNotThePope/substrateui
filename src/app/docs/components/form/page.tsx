import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const formProps: PropDef[] = [
  {
    name: "gap",
    type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
    default: '"xl"',
    description:
      "Vertical spacing between child elements. Uses the Stack component internally for layout.",
  },
  {
    name: "onSubmit",
    type: "(e: React.FormEvent) => void",
    default: undefined,
    description: "Form submission handler.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the form element.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description:
      "Form content, typically Field components, FormSections, and FormActions.",
  },
]

export default function FormPage() {
  return (
    <DocPage
      title="Form"
      description="A form element wrapper with built-in vertical stack layout and configurable gap spacing. Provides consistent structure for form pages."
    >
      {/* Usage Pattern */}
      <Stack gap="md">
        <H3>Usage Pattern</H3>
        <ComponentPreview
          code={`import { Form } from "@/components/ui/form"
import { FormSection, FormSectionHeader, FormSectionTitle,
  FormSectionDescription, FormSectionContent } from "@/components/ui/form-section"
import { FormActions } from "@/components/ui/form-actions"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

<Form gap="xl" onSubmit={handleSubmit}>
  <FormSection>
    <FormSectionHeader>
      <FormSectionTitle>Profile</FormSectionTitle>
      <FormSectionDescription>
        Basic information about your account.
      </FormSectionDescription>
    </FormSectionHeader>
    <FormSectionContent>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Jane Doe" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="jane@example.com" />
      </Field>
    </FormSectionContent>
  </FormSection>

  <FormActions>
    <Button variant="outline">Cancel</Button>
    <Button type="submit">Save</Button>
  </FormActions>
</Form>`}
        >
          <p className="text-sm text-muted-foreground">
            The Form component wraps a native form element with a Stack layout
            for consistent vertical spacing between sections. See the code
            example for a complete usage pattern.
          </p>
        </ComponentPreview>
      </Stack>

      {/* Gap Variants */}
      <Stack gap="md">
        <H3>Gap Variants</H3>
        <ComponentPreview
          code={`{/* Tight spacing for compact forms */}
<Form gap="sm">...</Form>

{/* Default spacing (recommended) */}
<Form gap="xl">...</Form>

{/* Extra spacing for long-form pages */}
<Form gap="2xl">...</Form>`}
        >
          <p className="text-sm text-muted-foreground">
            Adjust the gap prop to control vertical spacing between form
            children. The default value of &quot;xl&quot; works well for most
            forms with distinct sections.
          </p>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={formProps} />
      </Stack>
    </DocPage>
  )
}
