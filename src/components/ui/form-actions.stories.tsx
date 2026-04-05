import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  FormActions,
  FormActionsPrimary,
  FormActionsSecondary,
} from "./form-actions"

const meta: Meta<typeof FormActions> = {
  title: "Forms/FormActions",
  component: FormActions,
}

export default meta
type Story = StoryObj<typeof FormActions>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <FormActions>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </FormActions>
    </div>
  ),
}

export const WithSecondary: Story = {
  render: () => (
    <div className="w-96">
      <FormActions>
        <FormActionsSecondary>
          <Button variant="outline">Delete</Button>
        </FormActionsSecondary>
        <FormActionsPrimary>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </FormActionsPrimary>
      </FormActions>
    </div>
  ),
}
