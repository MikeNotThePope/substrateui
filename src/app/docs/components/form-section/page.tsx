import {
  FormSection,
  FormSectionHeader,
  FormSectionTitle,
  FormSectionDescription,
  FormSectionContent,
} from "@/components/ui/form-section"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const formSectionProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the fieldset element.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description:
      "Should contain FormSectionHeader and FormSectionContent sub-components.",
  },
]

const formSectionHeaderProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the header container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Title and description elements for the section.",
  },
]

const formSectionTitleProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the legend heading.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The section title text.",
  },
]

const formSectionDescriptionProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the description paragraph.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Descriptive text explaining the purpose of the section.",
  },
]

const formSectionContentProps: PropDef[] = [
  {
    name: "layout",
    type: '"stack" | "grid"',
    default: '"stack"',
    description:
      "Controls the layout of child fields. Stack arranges vertically, grid uses a two-column layout on medium screens.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the content container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The form fields within this section.",
  },
]

export default function FormSectionPage() {
  return (
    <DocPage
      title="FormSection"
      description="A fieldset-based section for grouping related form fields with a header containing a title and description. Ideal for organizing long forms into logical groups."
    >
      {/* Basic Form Section */}
      <Stack gap="md">
        <H3>Basic Form Section</H3>
        <ComponentPreview
          code={`<FormSection>
  <FormSectionHeader>
    <FormSectionTitle>Profile</FormSectionTitle>
    <FormSectionDescription>
      Update your personal information.
    </FormSectionDescription>
  </FormSectionHeader>
  <FormSectionContent>
    <Field>
      <FieldLabel>Display name</FieldLabel>
      <Input placeholder="Jane Doe" />
    </Field>
    <Field>
      <FieldLabel>Bio</FieldLabel>
      <Input placeholder="A short description about you" />
    </Field>
  </FormSectionContent>
</FormSection>`}
        >
          <div className="w-full max-w-lg">
            <FormSection>
              <FormSectionHeader>
                <FormSectionTitle>Profile</FormSectionTitle>
                <FormSectionDescription>
                  Update your personal information.
                </FormSectionDescription>
              </FormSectionHeader>
              <FormSectionContent>
                <Field>
                  <FieldLabel>Display name</FieldLabel>
                  <Input placeholder="Jane Doe" />
                </Field>
                <Field>
                  <FieldLabel>Bio</FieldLabel>
                  <Input placeholder="A short description about you" />
                </Field>
              </FormSectionContent>
            </FormSection>
          </div>
        </ComponentPreview>
      </Stack>

      {/* Grid Layout */}
      <Stack gap="md">
        <H3>Grid Layout</H3>
        <ComponentPreview
          code={`<FormSection>
  <FormSectionHeader>
    <FormSectionTitle>Address</FormSectionTitle>
    <FormSectionDescription>
      Enter your shipping address.
    </FormSectionDescription>
  </FormSectionHeader>
  <FormSectionContent layout="grid">
    <Field>
      <FieldLabel>City</FieldLabel>
      <Input placeholder="San Francisco" />
    </Field>
    <Field>
      <FieldLabel>State</FieldLabel>
      <Input placeholder="CA" />
    </Field>
  </FormSectionContent>
</FormSection>`}
        >
          <div className="w-full max-w-lg">
            <FormSection>
              <FormSectionHeader>
                <FormSectionTitle>Address</FormSectionTitle>
                <FormSectionDescription>
                  Enter your shipping address.
                </FormSectionDescription>
              </FormSectionHeader>
              <FormSectionContent layout="grid">
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input placeholder="San Francisco" />
                </Field>
                <Field>
                  <FieldLabel>State</FieldLabel>
                  <Input placeholder="CA" />
                </Field>
              </FormSectionContent>
            </FormSection>
          </div>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>

        <H3>FormSection</H3>
        <PropsTable props={formSectionProps} />

        <H3>FormSectionHeader</H3>
        <PropsTable props={formSectionHeaderProps} />

        <H3>FormSectionTitle</H3>
        <PropsTable props={formSectionTitleProps} />

        <H3>FormSectionDescription</H3>
        <PropsTable props={formSectionDescriptionProps} />

        <H3>FormSectionContent</H3>
        <PropsTable props={formSectionContentProps} />
      </Stack>
    </DocPage>
  )
}
