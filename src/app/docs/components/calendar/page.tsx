"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const calendarProps: PropDef[] = [
  {
    name: "mode",
    type: '"single" | "range" | "multiple"',
    default: undefined,
    description:
      "Selection mode. Single selects one date, range selects a start and end, multiple allows selecting many dates.",
  },
  {
    name: "selected",
    type: "Date | DateRange | Date[]",
    default: undefined,
    description:
      "The currently selected date(s). Type depends on the mode prop.",
  },
  {
    name: "onSelect",
    type: "(date: Date | DateRange | Date[] | undefined) => void",
    default: undefined,
    description: "Callback fired when the selection changes.",
  },
  {
    name: "showOutsideDays",
    type: "boolean",
    default: "true",
    description:
      "Whether to display days from adjacent months in the calendar grid.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the calendar container.",
  },
]

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2025, 0, 20))

  return (
    <DocPage
      title="Calendar"
      description="A date picker calendar built on react-day-picker with themed styling. Supports single date, range, and multiple date selection modes."
    >
      {/* Single Date */}
      <Stack gap="md">
        <H3>Single Date Selection</H3>
        <ComponentPreview
          code={`const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={new Date(2025, 0)}
            today={new Date(2025, 0, 15)}
          />
        </ComponentPreview>
      </Stack>

      <ImportLine names={["Calendar"]} />

      {/* Static Display */}
      <Stack gap="md">
        <H3>Static Display</H3>
        <ComponentPreview
          code={`<Calendar />`}
        >
          <Calendar defaultMonth={new Date(2025, 0)} today={new Date(2025, 0, 15)} />
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            The month-navigation chevrons are already handled: the calendar root
            carries <Code>rtl:**:[.rdp-button_previous&gt;svg]:rotate-180</Code>{" "}
            and its next-button twin, so &quot;previous month&quot; points to the
            start of the line in either direction. Nothing to add at the call site.
          </P>
          <P>
            The grid itself runs the way the locale does, and the weekday order
            comes from the locale rather than from the direction — set{" "}
            <Code>locale</Code> as well as flipping direction, or you get an RTL
            calendar that still starts its week on Sunday. See{" "}
            <a
              href="/docs/accessibility/direction"
              className="underline underline-offset-4 hover:text-primary"
            >
              Direction (RTL)
            </a>
            .
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={calendarProps} />
      </Stack>
    </DocPage>
  )
}
