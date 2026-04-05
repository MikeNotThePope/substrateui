import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Combobox } from "./combobox"

const options = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
  { value: "remix", label: "Remix" },
  { value: "nuxt", label: "Nuxt.js" },
]

function SingleExample() {
  const [value, setValue] = React.useState("")
  return (
    <div className="w-64">
      <Combobox options={options} value={value} onValueChange={setValue} />
    </div>
  )
}

function MultipleExample() {
  const [value, setValue] = React.useState<string[]>([])
  return (
    <div className="w-64">
      <Combobox multiple options={options} value={value} onValueChange={setValue} />
    </div>
  )
}

const meta: Meta<typeof Combobox> = {
  title: "Forms/Combobox",
  component: Combobox,
}

export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  render: () => <SingleExample />,
}

export const Multiple: Story = {
  render: () => <MultipleExample />,
}
