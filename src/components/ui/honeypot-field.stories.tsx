import type { Meta, StoryObj } from "@storybook/react-vite"

import { HoneypotField } from "./honeypot-field"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Stack } from "./stack"

const meta: Meta<typeof HoneypotField> = {
  title: "Utilities/HoneypotField",
  component: HoneypotField,
}

export default meta
type Story = StoryObj<typeof HoneypotField>

/**
 * The field renders nothing a person can see, so the story is the form around
 * it. Tab through it: focus goes from the email box straight to the button.
 */
export const Default: Story = {
  render: () => (
    <form className="relative">
      <Stack gap="md" className="max-w-sm">
        <Stack gap="sm">
          <Label htmlFor="honeypot-story-email">Email</Label>
          <Input id="honeypot-story-email" name="email" type="email" />
        </Stack>
        <HoneypotField />
        <Button type="button">Request access</Button>
      </Stack>
    </form>
  ),
}

/** The name is what the server reads, so a form can pick its own. */
export const CustomName: Story = {
  render: () => (
    <form className="relative">
      <Stack gap="md" className="max-w-sm">
        <Stack gap="sm">
          <Label htmlFor="honeypot-story-name">Name</Label>
          <Input id="honeypot-story-name" name="name" />
        </Stack>
        <HoneypotField name="fax_number" />
        <Button type="button">Send</Button>
      </Stack>
    </form>
  ),
}
