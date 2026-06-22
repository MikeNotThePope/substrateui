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
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by DatePicker / DateRangePicker. All keys have English defaults. */
interface DatePickerLabels {
  placeholder?: string
  rangePlaceholder?: string
  locale?: string
  formatDate?: (date: Date) => string
  formatDateShort?: (date: Date) => string
}

function defaultFormatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function defaultFormatDateShort(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

const defaultDatePickerLabels: Required<DatePickerLabels> = {
  placeholder: "Pick a date",
  rangePlaceholder: "Pick a date range",
  locale: "en-US",
  formatDate: (date) => defaultFormatDate(date, "en-US"),
  formatDateShort: (date) => defaultFormatDateShort(date, "en-US"),
}

function resolveDatePickerLabels(
  context?: Partial<DatePickerLabels>,
  prop?: Partial<DatePickerLabels>,
): Required<DatePickerLabels> {
  const merged = resolveLabels(defaultDatePickerLabels, context, prop)
  const locale = merged.locale
  return {
    ...merged,
    formatDate: prop?.formatDate ?? context?.formatDate ?? ((date: Date) => defaultFormatDate(date, locale)),
    formatDateShort: prop?.formatDateShort ?? context?.formatDateShort ?? ((date: Date) => defaultFormatDateShort(date, locale)),
  }
}

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  /** @deprecated Use `labels.placeholder` instead. */
  placeholder?: string
  labels?: DatePickerLabels
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
  // Deprecated; forwarded into the labels API below for backward compatibility.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  placeholder,
  labels: labelsProp,
  className,
  disabled,
}: DatePickerProps) {
  const ctx = useLabels()
  const mergedProp: DatePickerLabels = {
    ...labelsProp,
    ...(placeholder != null && { placeholder }),
  }
  const labels = resolveDatePickerLabels(ctx.datePicker, mergedProp)

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
          <CalendarIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          {date ? (
            <span>{labels.formatDate(date)}</span>
          ) : (
            <span className="text-muted-foreground">{labels.placeholder}</span>
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
  /** @deprecated Use `labels.rangePlaceholder` instead. */
  placeholder?: string
  labels?: DatePickerLabels
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
  // Deprecated; forwarded into the labels API below for backward compatibility.
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  placeholder,
  labels: labelsProp,
  className,
  disabled,
}: DateRangePickerProps) {
  const ctx = useLabels()
  const mergedProp: DatePickerLabels = {
    ...labelsProp,
    ...(placeholder != null && { rangePlaceholder: placeholder }),
  }
  const labels = resolveDatePickerLabels(ctx.datePicker, mergedProp)

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
          <CalendarIcon className="size-4 text-muted-foreground" aria-hidden="true" />
          {dateRange?.from ? (
            <span>
              {labels.formatDateShort(dateRange.from)}
              {dateRange.to && ` – ${labels.formatDateShort(dateRange.to)}`}
            </span>
          ) : (
            <span className="text-muted-foreground">{labels.rangePlaceholder}</span>
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

export { DatePicker, DateRangePicker, type DatePickerLabels }
