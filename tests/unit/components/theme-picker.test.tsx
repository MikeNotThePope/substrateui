import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemePicker, SiteThemeProvider, useSiteTheme } from '@/components/theme-picker'
import {
  LabelsProvider,
  type SiteChromeLabels,
} from '@/components/providers/labels-provider'

describe('ThemePicker', () => {
  it('renders a select trigger labelled "Theme" showing the current theme', () => {
    render(<ThemePicker />)
    const trigger = screen.getByLabelText('Theme')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('Plum')
  })

  it('opens the listbox on click and renders the theme options', async () => {
    const user = userEvent.setup()
    render(<ThemePicker />)
    await user.click(screen.getByLabelText('Theme'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    // Every entry in SITE_THEMES should be offered, including the ones added
    // after the plum rename.
    for (const name of ['Plum', 'Proof', 'Substrate', 'Lava', 'Tundra']) {
      expect(screen.getByRole('option', { name })).toBeInTheDocument()
    }
  })

  it('overrides the aria-label via the labels prop', () => {
    render(<ThemePicker labels={{ theme: 'Appearance' }} />)
    expect(screen.getByLabelText('Appearance')).toBeInTheDocument()
    expect(screen.queryByLabelText('Theme')).not.toBeInTheDocument()
  })

  it('reads the aria-label from the LabelsProvider context', () => {
    // Site chrome isn't part of the published label surface, so it goes in as
    // a typed variable rather than a literal.
    const labels: SiteChromeLabels = { themePicker: { theme: 'Thème' } }
    render(
      <LabelsProvider labels={labels}>
        <ThemePicker />
      </LabelsProvider>
    )
    expect(screen.getByLabelText('Thème')).toBeInTheDocument()
  })
})

describe('SiteThemeProvider', () => {
  function Probe() {
    return <span data-testid="theme">{useSiteTheme().theme}</span>
  }

  it('reads a stored theme back', async () => {
    localStorage.setItem('substrateui-theme', 'substrate')
    render(
      <SiteThemeProvider>
        <Probe />
      </SiteThemeProvider>
    )
    expect(await screen.findByTestId('theme')).toHaveTextContent('substrate')
  })

  it('migrates the pre-rename "press" value to proof', async () => {
    localStorage.setItem('substrateui-theme', 'press')
    render(
      <SiteThemeProvider>
        <Probe />
      </SiteThemeProvider>
    )
    expect(await screen.findByTestId('theme')).toHaveTextContent('proof')
  })

  it('migrates the pre-rename "default" value to plum', async () => {
    // "default" named this palette before it became a role. Visitors who chose
    // it still have that string in localStorage; it must not fall back silently.
    localStorage.setItem('substrateui-theme', 'default')
    render(
      <SiteThemeProvider>
        <Probe />
      </SiteThemeProvider>
    )
    expect(await screen.findByTestId('theme')).toHaveTextContent('plum')
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false)
  })
})
