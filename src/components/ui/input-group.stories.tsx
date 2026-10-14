import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  InputGroup,
  InputGroupPrefix,
  InputGroupReadback,
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

/** A long fixed suffix drops under the input below `sm`; the line under it reads back the whole value. */
export const StackedWithReadback: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroupReadback
        label="New address"
        suffix="@alpha.magmalytics.science"
        defaultValue="alpha.new.address"
      >
        <InputGroup stack>
          <Input aria-label="New email" defaultValue="alpha.new.address" />
          <InputGroupSuffix>@alpha.magmalytics.science</InputGroupSuffix>
        </InputGroup>
      </InputGroupReadback>
    </div>
  ),
}
