import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { DatePicker, DateRangePicker } from "./date-picker"

function SingleExample() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <div className="w-64">
      <DatePicker date={date} onDateChange={setDate} />
    </div>
  )
}

function RangeExample() {
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <div className="w-72">
      <DateRangePicker dateRange={range} onDateRangeChange={setRange} />
    </div>
  )
}

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => <SingleExample />,
}

export const Range: Story = {
  render: () => <RangeExample />,
}
