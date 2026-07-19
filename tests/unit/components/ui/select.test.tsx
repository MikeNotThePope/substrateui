import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function Harness(props: {
  value?: string
  defaultValue?: string
  onValueChange?: (v: string | null) => void
  disabled?: boolean
}) {
  return (
    <Select
      value={props.value}
      defaultValue={props.defaultValue}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger aria-label="fruit" disabled={props.disabled}>
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Apple</SelectItem>
        <SelectItem value="b">Banana</SelectItem>
        <SelectItem value="c">Cherry</SelectItem>
      </SelectContent>
    </Select>
  )
}

describe('Select', () => {
  it('renders the trigger with placeholder when no value is set', () => {
    render(<Harness />)
    expect(screen.getByLabelText('fruit')).toHaveTextContent('Pick one')
  })

  it('displays the selected itemʼs label when a value is set', () => {
    render(<Harness defaultValue="b" />)
    expect(screen.getByLabelText('fruit')).toHaveTextContent('Banana')
  })

  it('reflects controlled value changes', () => {
    const { rerender } = render(<Harness value="a" onValueChange={() => {}} />)
    expect(screen.getByLabelText('fruit')).toHaveTextContent('Apple')
    rerender(<Harness value="c" onValueChange={() => {}} />)
    expect(screen.getByLabelText('fruit')).toHaveTextContent('Cherry')
  })

  it('opens the listbox on trigger click and renders options', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByLabelText('fruit'))
    const listbox = await screen.findByRole('listbox')
    expect(listbox).toBeInTheDocument()
    expect(screen.getAllByRole('option').length).toBe(3)
  })

  it('selecting an item closes the listbox and updates the value', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Harness onValueChange={onValueChange} />)
    await user.click(screen.getByLabelText('fruit'))
    const option = await screen.findByRole('option', { name: 'Banana' })
    await user.click(option)
    expect(onValueChange).toHaveBeenCalledWith('b', expect.anything())
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByLabelText('fruit')).toHaveTextContent('Banana')
  })

  it('does not open when the trigger is disabled', async () => {
    const user = userEvent.setup()
    render(<Harness disabled />)
    const trigger = screen.getByLabelText('fruit')
    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('applies custom className to the trigger', () => {
    render(
      <Select>
        <SelectTrigger aria-label="fruit" className="custom-extra">
          <SelectValue placeholder="Pick" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByLabelText('fruit').className).toContain('custom-extra')
  })
})
