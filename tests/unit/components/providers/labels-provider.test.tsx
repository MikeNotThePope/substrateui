import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LabelsProvider } from '@/components/providers/labels-provider'
import { Spinner } from '@/components/ui/spinner'

describe('LabelsProvider', () => {
  it('components render default labels when no provider is present', () => {
    render(<Spinner />)
    expect(screen.getByText('Loading…')).toBeInTheDocument()
  })

  it('components use labels from the provider', () => {
    render(
      <LabelsProvider labels={{ spinner: { loading: "Chargement…" } }}>
        <Spinner />
      </LabelsProvider>
    )
    expect(screen.getByText('Chargement…')).toBeInTheDocument()
    expect(screen.queryByText('Loading…')).not.toBeInTheDocument()
  })

  it('per-instance labels prop overrides provider labels', () => {
    render(
      <LabelsProvider labels={{ spinner: { loading: "Chargement…" } }}>
        <Spinner labels={{ loading: "Cargando…" }} />
      </LabelsProvider>
    )
    expect(screen.getByText('Cargando…')).toBeInTheDocument()
    expect(screen.queryByText('Chargement…')).not.toBeInTheDocument()
  })
})
