import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { FileText, ImagePlus } from "lucide-react"

import { FileDropField } from "./file-drop-field"
import { Button } from "./button"
import { Field, FieldError, FieldLabel } from "./field"
import { Stack } from "./stack"

const meta: Meta<typeof FileDropField> = {
  title: "Forms/FileDropField",
  component: FileDropField,
}

export default meta
type Story = StoryObj<typeof FileDropField>

/** Click it, Tab to it and press Space, or drag a file onto it. */
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <FileDropField aria-label="Resume" name="resume" />
    </div>
  ),
}

/** The two things the hand-rolled copies disagreed on. */
export const Sizes: Story = {
  render: () => (
    <Stack gap="md" className="w-full max-w-sm">
      <FileDropField aria-label="Small" size="sm" prompt="Small" />
      <FileDropField aria-label="Default" prompt="Default" />
      <FileDropField aria-label="Large" size="lg" prompt="Large" />
    </Stack>
  ),
}

/** Pass the bare icon — the recipe sizes it with the box. */
export const Icons: Story = {
  render: () => (
    <Stack gap="md" className="w-full max-w-sm">
      <FileDropField aria-label="CV" icon={<FileText />} prompt="Upload your CV" />
      <FileDropField aria-label="Photo" icon={<ImagePlus />} prompt="Upload a photo" />
      <FileDropField aria-label="Anything" icon={null} prompt="No icon" />
    </Stack>
  ),
}

/** `accept` filters the picker, and — unlike a bare input — the drop too. */
export const Restricted: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <FileDropField
        aria-label="Resume"
        accept=".pdf,.doc,.docx"
        hint="PDF or Word, up to 5MB"
      />
    </div>
  ),
}

/** Several at once are counted rather than listed. */
export const Multiple: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <FileDropField aria-label="Attachments" multiple hint="Up to ten files" />
    </div>
  ),
}

function RejectedDemo() {
  const [file, setFile] = React.useState<File | null>(null)
  const missing = file === null

  return (
    <form
      className="w-full max-w-sm"
      onSubmit={(event) => event.preventDefault()}
    >
      <Stack gap="md">
        <Field error={missing}>
          <FieldLabel>Resume</FieldLabel>
          <FileDropField
            aria-label="Resume"
            accept=".pdf"
            hint="PDF only"
            onFilesChange={([picked]) => setFile(picked ?? null)}
          />
          {missing ? <FieldError>A resume is required.</FieldError> : null}
        </Field>
        <Button type="submit">Apply</Button>
      </Stack>
    </form>
  )
}

/** Inside a `Field`, the error state reaches the box on its own. */
export const Rejected: Story = {
  render: () => <RejectedDemo />,
}

/** Disabled: no pointer, no drop, no picker. */
export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <FileDropField aria-label="Resume" disabled />
    </div>
  ),
}
