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

function AsyncExample() {
  const [value, setValue] = React.useState("")
  const [results, setResults] = React.useState(options)
  const [loading, setLoading] = React.useState(false)

  const search = (query: string) => {
    setLoading(true)
    // Stand-in for a request; the component never filters in this mode.
    window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setResults(
        q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options
      )
      setLoading(false)
    }, 500)
  }

  return (
    <div className="w-64">
      <Combobox
        options={results}
        value={value}
        onValueChange={setValue}
        onInputChange={search}
        loading={loading}
        manualFilter
      />
    </div>
  )
}

export const Async: Story = {
  render: () => <AsyncExample />,
}

function FreeSoloExample() {
  const [value, setValue] = React.useState<string[]>([])
  return (
    <div className="w-64">
      <Combobox
        multiple
        freeSolo
        clearable
        options={options}
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}

export const FreeSolo: Story = {
  render: () => <FreeSoloExample />,
}

const grouped = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
]

const framework: Record<string, string> = {
  next: "React",
  remix: "React",
  nuxt: "Vue",
  svelte: "Svelte",
  astro: "Agnostic",
}

function GroupedExample() {
  const [value, setValue] = React.useState("")
  return (
    <div className="w-64">
      <Combobox
        options={grouped}
        value={value}
        onValueChange={setValue}
        groupBy={(o) => framework[o.value] ?? "Other"}
      />
    </div>
  )
}

export const Grouped: Story = {
  render: () => <GroupedExample />,
}

function LimitTagsExample() {
  const [value, setValue] = React.useState<string[]>([
    "next",
    "svelte",
    "astro",
    "remix",
  ])
  return (
    <div className="w-64">
      <Combobox
        multiple
        clearable
        limitTags={2}
        options={options}
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}

export const LimitTags: Story = {
  render: () => <LimitTagsExample />,
}
