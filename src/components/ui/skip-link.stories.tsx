import type { Meta, StoryObj } from "@storybook/react-vite"

import { SkipLink } from "./skip-link"
import { Button } from "./button"
import { Stack } from "./stack"

const meta: Meta<typeof SkipLink> = {
  title: "Utilities/SkipLink",
  component: SkipLink,
}

export default meta
type Story = StoryObj<typeof SkipLink>

/**
 * The link is invisible until it has focus, so the story has to be tabbed into
 * to show anything — which is exactly the behaviour under test.
 */
export const Default: Story = {
  render: () => (
    <Stack gap="md">
      <p className="text-sm text-muted-foreground">
        Click here, then press Tab. The skip link appears in the top-start corner.
      </p>
      <SkipLink href="#story-main" />
      <Stack gap="sm" className="rounded-lg border-2 border-border p-4">
        <p className="text-sm font-medium">Navigation</p>
        <Button variant="ghost" size="sm">
          Products
        </Button>
        <Button variant="ghost" size="sm">
          Pricing
        </Button>
      </Stack>
      <div id="story-main" tabIndex={-1} className="rounded-lg border-2 border-border p-4">
        <p className="text-sm font-medium">Main content</p>
        <p className="text-sm text-muted-foreground">
          Activating the skip link moves focus here, past the navigation.
        </p>
      </div>
    </Stack>
  ),
}

/** The label is the children, so it can be translated or reworded. */
export const CustomLabel: Story = {
  render: () => (
    <Stack gap="md">
      <p className="text-sm text-muted-foreground">Press Tab to reveal.</p>
      <SkipLink href="#story-main-2">Saltar al contenido</SkipLink>
      <div id="story-main-2" tabIndex={-1} className="rounded-lg border-2 border-border p-4">
        <p className="text-sm text-muted-foreground">Contenido principal</p>
      </div>
    </Stack>
  ),
}
