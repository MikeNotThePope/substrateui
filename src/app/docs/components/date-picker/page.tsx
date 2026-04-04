"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const datePickerProps: PropDef[] = [
  {
    name: "date",
    type: "Date",
    default: undefined,
    description: "The controlled selected date.",
  },
  {
    name: "onDateChange",
    type: "(date: Date | undefined) => void",
    default: undefined,
    description: "Callback fired when the selected date changes.",
  },
  {
    name: "placeholder",
    type: "string",
    default: '"Pick a date"',
    description: "Placeholder text when no date is selected.",
  },
]

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <DocPage
      title="Date Picker"
      description="A calendar-based date selection control. Combines a trigger button with a popover calendar for intuitive date picking."
    >
      {/* Basic */}
      <Stack gap="md">
        <H3>Basic</H3>
        <ComponentPreview
          code={`const [date, setDate] = useState<Date | undefined>(undefined)

<DatePicker
  date={date}
  onDateChange={setDate}
  placeholder="Select a date..."
/>`}
        >
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="Select a date..."
          />
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={datePickerProps} />
      </Stack>
    </DocPage>
  )
}
