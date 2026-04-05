import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  FormSection,
  FormSectionHeader,
  FormSectionTitle,
  FormSectionDescription,
  FormSectionContent,
} from '@/components/ui/form-section'

describe('FormSection', () => {
  it('renders as a <fieldset> element', () => {
    const { container } = render(
      <FormSection>
        <span>inside</span>
      </FormSection>
    )
    const el = container.querySelector('[data-slot="form-section"]')
    expect(el?.tagName).toBe('FIELDSET')
    expect(screen.getByText('inside')).toBeInTheDocument()
  })

  it('renders title as a <legend> element', () => {
    render(
      <FormSection>
        <FormSectionHeader>
          <FormSectionTitle>Account</FormSectionTitle>
        </FormSectionHeader>
      </FormSection>
    )
    const title = screen.getByText('Account')
    expect(title.tagName).toBe('LEGEND')
  })

  it('renders description below the title', () => {
    render(
      <FormSection>
        <FormSectionHeader>
          <FormSectionTitle>Account</FormSectionTitle>
          <FormSectionDescription>Your details.</FormSectionDescription>
        </FormSectionHeader>
      </FormSection>
    )
    expect(screen.getByText('Your details.')).toBeInTheDocument()
  })

  it('renders FormSectionContent children with stack layout by default', () => {
    render(
      <FormSection>
        <FormSectionContent>
          <span>field-1</span>
          <span>field-2</span>
        </FormSectionContent>
      </FormSection>
    )
    expect(screen.getByText('field-1')).toBeInTheDocument()
    expect(screen.getByText('field-2')).toBeInTheDocument()
  })

  it('FormSectionContent grid layout adds md:grid-cols-2', () => {
    const { container } = render(
      <FormSection>
        <FormSectionContent layout="grid">
          <span>a</span>
        </FormSectionContent>
      </FormSection>
    )
    const content = container.querySelector(
      '[data-slot="form-section-content"]'
    )
    expect(content?.className).toContain('md:grid-cols-2')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <FormSection className="custom-extra">
        <span>x</span>
      </FormSection>
    )
    expect(
      container.querySelector('[data-slot="form-section"]')?.className
    ).toContain('custom-extra')
  })
})
