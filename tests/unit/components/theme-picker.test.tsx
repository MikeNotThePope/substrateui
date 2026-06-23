import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemePicker } from '@/components/theme-picker'
import { LabelsProvider } from '@/components/providers/labels-provider'

describe('ThemePicker', () => {
  it('renders a select trigger labelled "Theme" showing the current theme', () => {
    render(<ThemePicker />)
    const trigger = screen.getByLabelText('Theme')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Default')
  })

  it('opens the listbox on click and renders the theme options', async () => {
    const user = userEvent.setup()
    render(<ThemePicker />)
    await user.click(screen.getByLabelText('Theme'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument()
  })

  it('overrides the aria-label via the labels prop', () => {
    render(<ThemePicker labels={{ theme: 'Appearance' }} />)
    expect(screen.getByLabelText('Appearance')).toBeInTheDocument()
    expect(screen.queryByLabelText('Theme')).not.toBeInTheDocument()
  })

  it('reads the aria-label from the LabelsProvider context', () => {
    render(
      <LabelsProvider labels={{ themePicker: { theme: 'Thème' } }}>
        <ThemePicker />
      </LabelsProvider>
    )
    expect(screen.getByLabelText('Thème')).toBeInTheDocument()
  })
})
