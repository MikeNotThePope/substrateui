import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'

// Fixed reference date so tests are deterministic regardless of clock
const JUNE_15_2024 = new Date(2024, 5, 15)

function Controlled({
  initial,
  onDateChange,
}: {
  initial?: Date
  onDateChange?: (d: Date | undefined) => void
}) {
  const [date, setDate] = React.useState<Date | undefined>(initial)
  return (
    <DatePicker
      date={date}
      onDateChange={(d) => {
        setDate(d)
        onDateChange?.(d)
      }}
    />
  )
}

describe('DatePicker', () => {
  it('renders the placeholder when no date is selected', () => {
    render(<DatePicker placeholder="Pick one" />)
    expect(
      screen.getByRole('button', { name: /Pick one/ })
    ).toBeInTheDocument()
  })

  it('renders the formatted date when date prop is set', () => {
    render(<DatePicker date={JUNE_15_2024} />)
    expect(
      screen.getByRole('button', { name: /June 15, 2024/ })
    ).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    render(<DatePicker disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not open the calendar when disabled', async () => {
    const user = userEvent.setup()
    render(<DatePicker disabled />)
    await user.click(screen.getByRole('button')).catch(() => {})
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
  })

  it('opens the calendar popover when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<DatePicker />)
    await user.click(screen.getByRole('button'))
    expect(await screen.findByRole('grid')).toBeInTheDocument()
  })

  it('fires onDateChange with a Date when a day is clicked', async () => {
    const user = userEvent.setup()
    const onDateChange = vi.fn()
    render(<Controlled onDateChange={onDateChange} />)
    await user.click(screen.getByRole('button'))
    await screen.findByRole('grid')
    // Day buttons are rendered with a data-day="M/D/YYYY" attribute by react-day-picker.
    // Pick any in-month day (not a rendered outside-day) — the 15th is always present.
    const dayButtons = Array.from(
      document.querySelectorAll('button[data-day]')
    ) as HTMLElement[]
    expect(dayButtons.length).toBeGreaterThan(0)
    const target =
      dayButtons.find((b) => /\/15\//.test(b.getAttribute('data-day') || '')) ??
      dayButtons[10]
    await user.click(target)
    expect(onDateChange).toHaveBeenCalledTimes(1)
    const arg = onDateChange.mock.calls[0][0] as Date
    expect(arg).toBeInstanceOf(Date)
  })

  it('merges custom className on the trigger', () => {
    render(<DatePicker className="custom-extra" />)
    expect(screen.getByRole('button').className).toContain('custom-extra')
  })
})

describe('DateRangePicker', () => {
  it('renders placeholder when no range is selected', () => {
    render(<DateRangePicker placeholder="Pick range" />)
    expect(
      screen.getByRole('button', { name: /Pick range/ })
    ).toBeInTheDocument()
  })

  it('renders the formatted range when dateRange is set (from only)', () => {
    render(
      <DateRangePicker dateRange={{ from: JUNE_15_2024, to: undefined }} />
    )
    expect(screen.getByRole('button').textContent).toMatch(/Jun 15, 2024/)
  })

  it('renders both endpoints when from and to are set', () => {
    render(
      <DateRangePicker
        dateRange={{ from: JUNE_15_2024, to: new Date(2024, 5, 20) }}
      />
    )
    const text = screen.getByRole('button').textContent || ''
    expect(text).toMatch(/Jun 15, 2024/)
    expect(text).toMatch(/Jun 20, 2024/)
  })

  it('is disabled when disabled prop is true', () => {
    render(<DateRangePicker disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
