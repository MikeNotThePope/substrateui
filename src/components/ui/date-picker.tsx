"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

/**
 * Single-date picker with a popover calendar and formatted display.
 *
 * @example
 * <DatePicker date={date} onDateChange={setDate} placeholder="Select date" />
 *
 * @prop date - Currently selected date
 * @prop onDateChange - Callback when a date is selected
 * @prop placeholder - Text shown when no date is selected
 */
function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-slot="date-picker"
          className={cn(
            "border-2 rounded-md h-10 px-3 w-full justify-start gap-2 font-normal",
            className
          )}
        >
          <CalendarIcon className="size-4 text-muted-foreground" />
          {date ? (
            <span>{formatDate(date)}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
        />
      </PopoverContent>
    </Popover>
  )
}

interface DateRangePickerProps {
  dateRange?: DateRange
  onDateRangeChange?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

/**
 * Date range picker with a two-month popover calendar.
 *
 * @example
 * <DateRangePicker dateRange={range} onDateRangeChange={setRange} />
 *
 * @prop dateRange - Currently selected date range
 * @prop onDateRangeChange - Callback when the range changes
 * @prop placeholder - Text shown when no range is selected
 */
function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Pick a date range",
  className,
  disabled,
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          data-slot="date-range-picker"
          className={cn(
            "border-2 rounded-md h-10 px-3 w-full justify-start gap-2 font-normal",
            className
          )}
        >
          <CalendarIcon className="size-4 text-muted-foreground" />
          {dateRange?.from ? (
            <span>
              {formatDateShort(dateRange.from)}
              {dateRange.to && ` – ${formatDateShort(dateRange.to)}`}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={onDateRangeChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
