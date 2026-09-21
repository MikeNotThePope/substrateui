import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FileDropField } from '@/components/ui/file-drop-field'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

const cv = () => new File(['%PDF-1.4'], 'cv.pdf', { type: 'application/pdf' })
const shot = () => new File(['png'], 'headshot.png', { type: 'image/png' })

/** The dashed box itself — the label, which is the drop target and the ring holder. */
function box(): HTMLElement {
  const el = document.querySelector<HTMLElement>('[data-slot="file-drop-field"]')
  if (!el) throw new Error('no [data-slot="file-drop-field"] rendered')
  return el
}

/** What a browser hands `onDrop`. jsdom has no DataTransfer, so it is stood in for. */
function dataTransfer(files: File[]) {
  return {
    files,
    items: files.map((file) => ({ kind: 'file', type: file.type, getAsFile: () => file })),
    types: ['Files'],
  }
}

describe('FileDropField', () => {
  it('is a file input, and the whole dashed box is its label', async () => {
    const user = userEvent.setup()
    render(<FileDropField aria-label="Resume" accept=".pdf" />)

    const input = screen.getByLabelText('Resume')
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('accept', '.pdf')

    // Clicking the box reaches the input — that is what the wrapping label buys.
    const clicked = vi.fn()
    input.addEventListener('click', clicked)
    await user.click(box())
    expect(clicked).toHaveBeenCalled()
  })

  it('hides the input without taking it out of the tab order', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Before</button>
        <FileDropField aria-label="Resume" />
        <button type="button">After</button>
      </>,
    )

    const input = screen.getByLabelText('Resume')
    expect(input.className.split(/\s+/)).toContain('sr-only')
    expect(input).not.toHaveAttribute('aria-hidden')

    await user.tab()
    expect(screen.getByRole('button', { name: 'Before' })).toHaveFocus()
    await user.tab()
    expect(input).toHaveFocus()
  })

  it('takes the focus ring on the box, not on the 1px input', () => {
    render(<FileDropField aria-label="Resume" />)
    expect(box().className).toContain('focus-within:ring-2')
  })

  it('shows the picked file name', async () => {
    const user = userEvent.setup()
    render(<FileDropField aria-label="Resume" />)

    expect(screen.queryByText('cv.pdf')).toBeNull()
    await user.upload(screen.getByLabelText('Resume'), cv())
    expect(screen.getByText('cv.pdf')).toBeInTheDocument()
  })

  it('counts them instead of listing them when several are picked', async () => {
    const user = userEvent.setup()
    render(<FileDropField aria-label="Attachments" multiple />)

    await user.upload(screen.getByLabelText('Attachments'), [cv(), shot()])
    expect(screen.getByText('2 files selected')).toBeInTheDocument()
  })

  it('reports the files it picked up', async () => {
    const user = userEvent.setup()
    const onFilesChange = vi.fn()
    render(<FileDropField aria-label="Resume" onFilesChange={onFilesChange} />)

    await user.upload(screen.getByLabelText('Resume'), cv())
    expect(onFilesChange).toHaveBeenCalledTimes(1)
    expect(onFilesChange.mock.calls[0][0].map((f: File) => f.name)).toEqual(['cv.pdf'])
  })

  it('takes a file dropped on it', () => {
    const onFilesChange = vi.fn()
    render(<FileDropField aria-label="Resume" onFilesChange={onFilesChange} />)

    fireEvent.drop(box(), { dataTransfer: dataTransfer([cv()]) })

    expect(screen.getByText('cv.pdf')).toBeInTheDocument()
    expect(onFilesChange.mock.calls[0][0].map((f: File) => f.name)).toEqual(['cv.pdf'])
  })

  it('keeps one file when one is allowed and several are dropped', () => {
    render(<FileDropField aria-label="Resume" />)
    fireEvent.drop(box(), { dataTransfer: dataTransfer([cv(), shot()]) })
    expect(screen.getByText('cv.pdf')).toBeInTheDocument()
  })

  it('drops what `accept` does not name', () => {
    const onFilesChange = vi.fn()
    render(
      <FileDropField aria-label="Resume" accept=".pdf" multiple onFilesChange={onFilesChange} />,
    )

    fireEvent.drop(box(), { dataTransfer: dataTransfer([cv(), shot()]) })

    expect(screen.getByText('cv.pdf')).toBeInTheDocument()
    expect(screen.queryByText('headshot.png')).toBeNull()
    expect(onFilesChange.mock.calls[0][0].map((f: File) => f.name)).toEqual(['cv.pdf'])
  })

  it('matches a wildcard media type on drop', () => {
    render(<FileDropField aria-label="Photo" accept="image/*" />)
    fireEvent.drop(box(), { dataTransfer: dataTransfer([shot()]) })
    expect(screen.getByText('headshot.png')).toBeInTheDocument()
  })

  it('marks itself while a file is over it', () => {
    render(<FileDropField aria-label="Resume" />)
    const target = box()

    expect(target).not.toHaveAttribute('data-dragging')
    fireEvent.dragOver(target, { dataTransfer: dataTransfer([cv()]) })
    expect(target).toHaveAttribute('data-dragging', 'true')
    fireEvent.dragLeave(target, { dataTransfer: dataTransfer([cv()]) })
    expect(target).not.toHaveAttribute('data-dragging')
  })

  it('turns red when it is invalid, and says so', () => {
    const { rerender } = render(<FileDropField aria-label="Resume" />)
    expect(box().className).not.toContain('status-error')
    expect(screen.getByLabelText('Resume')).not.toHaveAttribute('aria-invalid')

    rerender(<FileDropField aria-label="Resume" invalid />)
    // Border, fill and text together, the way Alert's error variant does it.
    // The border alone is not enough to see: an unlayered
    // `* { border-color: var(--border) }` in tokens.css outranks every
    // border-colour utility on the site today (#143).
    expect(box().className).toContain('border-status-error')
    expect(box().className).toContain('bg-status-error-surface')
    expect(box().className).toContain('text-status-error-text')
    expect(screen.getByLabelText('Resume')).toHaveAttribute('aria-invalid', 'true')
  })

  it("takes a surrounding Field's error without being told twice", () => {
    render(
      <Field error>
        <FieldLabel>Resume</FieldLabel>
        <FileDropField />
        <FieldError>Required</FieldError>
      </Field>,
    )
    expect(box().className).toContain('border-status-error')
    expect(box().className).toContain('bg-status-error-surface')
  })

  it('sizes the box and the icon together', () => {
    const { rerender } = render(<FileDropField aria-label="Resume" size="sm" />)
    expect(box().className).toContain('[&_svg]:size-4')

    rerender(<FileDropField aria-label="Resume" size="lg" />)
    expect(box().className).toContain('[&_svg]:size-8')
  })

  it('takes an icon of the form’s choosing, and none at all', () => {
    const { rerender } = render(
      <FileDropField aria-label="Resume" icon={<svg data-testid="paperclip" />} />,
    )
    expect(screen.getByTestId('paperclip')).toBeInTheDocument()

    rerender(<FileDropField aria-label="Resume" icon={null} />)
    expect(box().querySelector('svg')).toBeNull()
  })

  it('ignores a drop when it is disabled', () => {
    const onFilesChange = vi.fn()
    render(<FileDropField aria-label="Resume" disabled onFilesChange={onFilesChange} />)

    fireEvent.drop(box(), { dataTransfer: dataTransfer([cv()]) })

    expect(onFilesChange).not.toHaveBeenCalled()
    expect(screen.queryByText('cv.pdf')).toBeNull()
  })

  it('takes a prompt and a hint of its own', () => {
    render(<FileDropField aria-label="Resume" prompt="Drop your CV" hint="PDF, up to 5MB" />)
    expect(screen.getByText('Drop your CV')).toBeInTheDocument()
    expect(screen.getByText('PDF, up to 5MB')).toBeInTheDocument()
  })
})
