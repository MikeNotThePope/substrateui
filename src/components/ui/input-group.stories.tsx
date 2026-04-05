import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  InputGroup,
  InputGroupPrefix,
  InputGroupSuffix,
} from "./input-group"
import { Input } from "./input"

const meta: Meta<typeof InputGroup> = {
  title: "Forms/InputGroup",
  component: InputGroup,
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup>
        <InputGroupPrefix>$</InputGroupPrefix>
        <Input placeholder="0.00" />
        <InputGroupSuffix>USD</InputGroupSuffix>
      </InputGroup>
    </div>
  ),
}

export const PrefixOnly: Story = {
  render: () => (
    <div className="w-64">
      <InputGroup>
        <InputGroupPrefix>@</InputGroupPrefix>
        <Input placeholder="username" />
      </InputGroup>
    </div>
  ),
}
