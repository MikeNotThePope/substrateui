import type { Meta, StoryObj } from "@storybook/react-vite"

import { Overline } from "./overline"
import { Stack } from "./stack"
import { Card, CardContent } from "./card"

const meta: Meta<typeof Overline> = {
  title: "Typography/Overline",
  component: Overline,
}

export default meta
type Story = StoryObj<typeof Overline>

/** The default size, `xs`, is what most of the system uses. */
export const Default: Story = {
  render: () => <Overline>Section label</Overline>,
}

/**
 * Three steps. `2xs` is the one Badge uses, and is the smallest type in the
 * system; `sm` is for a label that has to carry a card on its own.
 */
export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <Overline size="2xs">Two extra small — 11px</Overline>
      <Overline size="xs">Extra small — 12px</Overline>
      <Overline size="sm">Small — 14px</Overline>
    </Stack>
  ),
}

/**
 * It has no semantics of its own. `render` gives it whatever element the
 * surrounding document needs — here a real heading above a list.
 */
export const AsHeading: Story = {
  render: () => (
    <Card className="border-2">
      <CardContent className="pt-6">
        <Stack gap="sm">
          <Overline render={<h3 />}>Resources</Overline>
          <p className="text-sm text-muted-foreground">
            Rendered as an h3, so it is in the document outline.
          </p>
        </Stack>
      </CardContent>
    </Card>
  ),
}

/** Colour is a token, so a caller can retune it without losing the treatment. */
export const Toned: Story = {
  render: () => (
    <Stack gap="md">
      <Overline>Default, muted</Overline>
      <Overline className="text-primary">Accented</Overline>
      <Overline className="text-status-error-text">Needs attention</Overline>
    </Stack>
  ),
}
