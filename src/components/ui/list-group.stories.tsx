import type { Meta, StoryObj } from "@storybook/react-vite"
import { CreditCard, Settings, User } from "lucide-react"

import { ListGroup, ListGroupItem } from "./list-group"

const meta: Meta<typeof ListGroup> = {
  title: "Data Display/ListGroup",
  component: ListGroup,
}

export default meta
type Story = StoryObj<typeof ListGroup>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <ListGroup>
        <ListGroupItem>Profile</ListGroupItem>
        <ListGroupItem active>Settings</ListGroupItem>
        <ListGroupItem>Messages</ListGroupItem>
        <ListGroupItem disabled>Billing (coming soon)</ListGroupItem>
      </ListGroup>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="w-72">
      <ListGroup>
        <ListGroupItem render={<button type="button" />}>
          <User /> Account
        </ListGroupItem>
        <ListGroupItem render={<button type="button" />} active>
          <Settings /> Preferences
        </ListGroupItem>
        <ListGroupItem render={<a href="#" />}>
          <CreditCard /> Payment methods
        </ListGroupItem>
      </ListGroup>
    </div>
  ),
}
