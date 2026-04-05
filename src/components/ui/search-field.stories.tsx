import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { SearchField } from "./search-field"

function BasicExample() {
  const [value, setValue] = React.useState("")
  return (
    <div className="w-80">
      <SearchField value={value} onChange={setValue} />
    </div>
  )
}

function ShortcutExample() {
  const [value, setValue] = React.useState("")
  return (
    <div className="w-80">
      <SearchField value={value} onChange={setValue} shortcut="/" />
    </div>
  )
}

const meta: Meta<typeof SearchField> = {
  title: "Forms/SearchField",
  component: SearchField,
}

export default meta
type Story = StoryObj<typeof SearchField>

export const Default: Story = {
  render: () => <BasicExample />,
}

export const WithShortcut: Story = {
  render: () => <ShortcutExample />,
}
