import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldLabel } from "./field"
import {
  FormSection,
  FormSectionContent,
  FormSectionDescription,
  FormSectionHeader,
  FormSectionTitle,
} from "./form-section"
import { Input } from "./input"

const meta: Meta<typeof FormSection> = {
  title: "Forms/FormSection",
  component: FormSection,
}

export default meta
type Story = StoryObj<typeof FormSection>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <FormSection>
        <FormSectionHeader>
          <FormSectionTitle>Account</FormSectionTitle>
          <FormSectionDescription>Update your account details.</FormSectionDescription>
        </FormSectionHeader>
        <FormSectionContent>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="you@example.com" />
          </Field>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <Input placeholder="username" />
          </Field>
        </FormSectionContent>
      </FormSection>
    </div>
  ),
}

export const GridLayout: Story = {
  render: () => (
    <div className="w-[640px]">
      <FormSection>
        <FormSectionHeader>
          <FormSectionTitle>Profile</FormSectionTitle>
        </FormSectionHeader>
        <FormSectionContent layout="grid">
          <Field>
            <FieldLabel>First</FieldLabel>
            <Input />
          </Field>
          <Field>
            <FieldLabel>Last</FieldLabel>
            <Input />
          </Field>
        </FormSectionContent>
      </FormSection>
    </div>
  ),
}
