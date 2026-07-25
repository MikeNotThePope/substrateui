import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Cascader, type CascaderOption } from "./cascader"

const meta: Meta<typeof Cascader> = {
  title: "Forms/Cascader",
  component: Cascader,
}

export default meta
type Story = StoryObj<typeof Cascader>

const places: CascaderOption[] = [
  {
    value: "asia",
    label: "Asia",
    children: [
      {
        value: "jp",
        label: "Japan",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "osaka", label: "Osaka" },
        ],
      },
      {
        value: "kr",
        label: "South Korea",
        children: [{ value: "seoul", label: "Seoul" }],
      },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [
      {
        value: "pt",
        label: "Portugal",
        children: [
          { value: "lisbon", label: "Lisbon" },
          { value: "porto", label: "Porto" },
        ],
      },
      {
        value: "is",
        label: "Iceland",
        disabled: true,
        children: [{ value: "reykjavik", label: "Reykjavík" }],
      },
    ],
  },
  { value: "antarctica", label: "Antarctica" },
]

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Cascader options={places} placeholder="Pick a city" />
    </div>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <div className="w-80">
      <Cascader
        options={places}
        placeholder="Pick a city"
        defaultValue={["europe", "pt", "porto"]}
        showSearch
        clearable
      />
    </div>
  ),
}

export const ChangeOnSelect: Story = {
  render: () => (
    <div className="w-80">
      <Cascader options={places} placeholder="Pick any level" changeOnSelect />
    </div>
  ),
}

function ControlledCascader() {
  const [value, setValue] = React.useState<string[]>(["asia", "jp", "tokyo"])
  return (
    <div className="w-80 space-y-3">
      <Cascader options={places} value={value} onChange={setValue} clearable />
      <p className="font-mono text-sm text-muted-foreground">
        [{value.join(", ")}]
      </p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledCascader />,
}

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Cascader options={places} defaultValue={["antarctica"]} disabled />
    </div>
  ),
}
