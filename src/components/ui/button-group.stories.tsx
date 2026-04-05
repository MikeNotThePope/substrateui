import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { ButtonGroup } from "./button-group"

const meta: Meta<typeof ButtonGroup> = {
  title: "Atoms/ButtonGroup",
  component: ButtonGroup,
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
}

export const Two: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
}
