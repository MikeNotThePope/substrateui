"use client"

import * as React from "react"

import { Cascader, type CascaderOption } from "@/components/ui/cascader"

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

export function CascaderDemo({
  showSearch = false,
  changeOnSelect = false,
  clearable = false,
  placeholder = "Pick a city",
}: {
  showSearch?: boolean
  changeOnSelect?: boolean
  clearable?: boolean
  placeholder?: string
}) {
  return (
    <div className="w-full max-w-sm">
      <Cascader
        options={places}
        placeholder={placeholder}
        showSearch={showSearch}
        changeOnSelect={changeOnSelect}
        clearable={clearable}
      />
    </div>
  )
}

export function ControlledCascaderDemo() {
  const [value, setValue] = React.useState<string[]>(["asia", "jp", "tokyo"])

  return (
    <div className="w-full max-w-sm space-y-3">
      <Cascader options={places} value={value} onChange={setValue} clearable />
      <p className="font-mono text-sm text-muted-foreground">
        value: [{value.join(", ")}]
      </p>
    </div>
  )
}
