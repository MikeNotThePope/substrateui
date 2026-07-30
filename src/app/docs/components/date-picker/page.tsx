"use client"

import { useState } from "react"
import { DatePicker } from "@/components/ui/date-picker"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
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
      description="A trigger button paired with a popover calendar. Selects a single date."
    >
      <ComponentPreview
        code={`const [date, setDate] = useState<Date | undefined>(undefined)

<DatePicker
  date={date}
  onDateChange={setDate}
  labels={{ placeholder: "Select a date..." }}
/>`}
      >
        <DatePicker
          date={date}
          onDateChange={setDate}
          labels={{ placeholder: "Select a date..." }}
        />
      </ComponentPreview>

      <ImportLine names={["DatePicker"]} />

      {/* Direction */}
      <Stack gap="md">
        <H3>Direction</H3>
        <P>
          Month-navigation chevrons flip automatically so &quot;previous
          month&quot; points in the reading direction. Week start day is a
          locale concern, not a direction concern — Saturday-start vs.
          Sunday-start calendars are controlled by the calendar locale
          prop, not by <code>dir</code>.
        </P>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          This one carries formatting as well as text — a date rendered US-style in a French locale is wrong even when every string around it is translated. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>datePicker</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "placeholder", type: "string", default: "\"Pick a date\"", description: "Trigger text with no date selected." },
          { name: "rangePlaceholder", type: "string", default: "\"Pick a date range\"", description: "Trigger text in range mode." },
          { name: "locale", type: "string", default: "\"en-US\"", description: "BCP 47 tag the default formatters use, and the calendar's own locale." },
          { name: "formatDate", type: "(date: Date) => string", default: "Intl, per locale", description: "Full date in the trigger. Replace for a format Intl doesn't produce." },
          { name: "formatDateShort", type: "(date: Date) => string", default: "Intl, per locale", description: "Compact date, used for each end of a range." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={datePickerProps} />
      </Stack>
    </DocPage>
  )
}
