import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  MessageComposer,
  MessageThread,
  MessageThreadItem,
} from '@/components/ui/message-thread'

const SCROLL_HEIGHT = 1000

/**
 * jsdom has no layout, so `scrollHeight` is 0 and "scroll to the bottom" is
 * indistinguishable from doing nothing. It does store `scrollTop`, so stubbing
 * the one makes the other observable.
 */
let restoreScrollHeight: (() => void) | undefined

beforeAll(() => {
  const original = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight')
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get: () => SCROLL_HEIGHT,
  })
  restoreScrollHeight = () => {
    if (original) Object.defineProperty(HTMLElement.prototype, 'scrollHeight', original)
  }
})

afterAll(() => restoreScrollHeight?.())

beforeEach(() => {
  window.location.hash = ''
})

function Thread({ ids = ['a', 'b', 'c'] }: { ids?: string[] }) {
  return (
    <MessageThread aria-label="Conversation">
      {ids.map((id) => (
        <MessageThreadItem key={id} messageId={id}>
          Message {id}
        </MessageThreadItem>
      ))}
    </MessageThread>
  )
}

describe('MessageThread', () => {
  it('is a named log a keyboard can reach and scroll', () => {
    render(<Thread />)
    const log = screen.getByRole('log', { name: 'Conversation' })
    expect(log).toHaveAttribute('tabindex', '0')
    expect(log.className).toContain('overflow-y-auto')
  })

  it('opens at the newest message', () => {
    render(<Thread />)
    expect(screen.getByRole('log').scrollTop).toBe(SCROLL_HEIGHT)
  })

  it('scrolls to a new message when one arrives', () => {
    const { rerender } = render(<Thread />)
    const log = screen.getByRole('log')
    log.scrollTop = 0

    rerender(<Thread ids={['a', 'b', 'c', 'd']} />)
    expect(log.scrollTop).toBe(SCROLL_HEIGHT)
  })

  it('stays put when nothing new arrived', () => {
    const { rerender } = render(<Thread />)
    const log = screen.getByRole('log')
    log.scrollTop = 120

    rerender(<Thread />)
    expect(log.scrollTop).toBe(120)
  })

  it('gives each message an id a #message- hash can address', () => {
    render(<Thread />)
    expect(document.getElementById('message-b')).toHaveTextContent('Message b')
  })

  it('honours a #message- hash instead of jumping to the newest', () => {
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    window.location.hash = '#message-b'

    render(<Thread />)

    expect(scrollIntoView).toHaveBeenCalled()
    expect(scrollIntoView.mock.instances[0]).toBe(document.getElementById('message-b'))
    // Not also dragged to the bottom, which would undo the deep link.
    expect(screen.getByRole('log').scrollTop).toBe(0)
    scrollIntoView.mockRestore()
  })

  it('focuses the message the hash names, so a keyboard lands on it', () => {
    window.location.hash = '#message-b'
    render(<Thread />)
    expect(document.getElementById('message-b')).toHaveFocus()
  })

  it('falls back to the newest when the hash names nothing here', () => {
    window.location.hash = '#message-zzz'
    render(<Thread />)
    expect(screen.getByRole('log').scrollTop).toBe(SCROLL_HEIGHT)
  })

  it('ignores a hash that is not a message', () => {
    window.location.hash = '#main-content'
    render(<Thread />)
    expect(screen.getByRole('log').scrollTop).toBe(SCROLL_HEIGHT)
  })
})

describe('MessageComposer', () => {
  it('composes on the real Textarea, not a copy of its classes', () => {
    render(<MessageComposer label="Reply" />)
    // The one marker the three hand-rolled copies never carried, because they
    // pasted the class string onto a bare <textarea>.
    expect(screen.getByLabelText('Reply')).toHaveAttribute('data-slot', 'textarea')
  })

  it('labels the textarea without showing a label', () => {
    render(<MessageComposer label="Reply" />)
    expect(screen.getByLabelText('Reply').tagName).toBe('TEXTAREA')
  })

  it('will not send an empty message', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<MessageComposer label="Reply" onSend={onSend} />)

    const send = screen.getByRole('button', { name: 'Send' })
    expect(send).toBeDisabled()

    await user.type(screen.getByLabelText('Reply'), '   ')
    expect(send).toBeDisabled()
    expect(onSend).not.toHaveBeenCalled()
  })

  it('sends the trimmed text and clears itself', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<MessageComposer label="Reply" onSend={onSend} />)

    const textarea = screen.getByLabelText('Reply')
    await user.type(textarea, '  Looks good to me  ')
    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSend).toHaveBeenCalledWith('Looks good to me')
    expect(textarea).toHaveValue('')
    expect(textarea).toHaveFocus()
  })

  it('keeps the text when the caller owns the value', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<MessageComposer label="Reply" value="Draft" onValueChange={() => {}} onSend={onSend} />)

    await user.click(screen.getByRole('button', { name: 'Send' }))

    expect(onSend).toHaveBeenCalledWith('Draft')
    expect(screen.getByLabelText('Reply')).toHaveValue('Draft')
  })

  it('ties the error line to the textarea', () => {
    const { rerender } = render(<MessageComposer label="Reply" />)
    const textarea = screen.getByLabelText('Reply')
    expect(textarea).not.toHaveAttribute('aria-invalid')

    rerender(<MessageComposer label="Reply" error="That message is too long." />)

    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    const describedBy = textarea.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      'That message is too long.',
    )
  })

  it('keeps a role=status note in the document before it has anything to say', () => {
    // A live region added at the same moment as its text is a live region
    // nothing announces. It has to already be there.
    const { rerender } = render(<MessageComposer label="Reply" />)
    const status = screen.getByRole('status')
    expect(status).toBeEmptyDOMElement()

    rerender(<MessageComposer label="Reply" status="Reply sent" />)
    expect(status).toHaveTextContent('Reply sent')
  })

  it('stops sending while a send is in flight', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<MessageComposer label="Reply" defaultValue="Hello" pending onSend={onSend} />)

    const send = screen.getByRole('button', { name: 'Send' })
    expect(send).toBeDisabled()
    await user.click(send)
    expect(onSend).not.toHaveBeenCalled()
  })

  it('takes a submit label of its own', () => {
    render(<MessageComposer label="Reply" submitLabel="Post" />)
    expect(screen.getByRole('button', { name: 'Post' })).toBeInTheDocument()
  })
})
