import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import {
  MessageComposer,
  MessageThread,
  MessageThreadItem,
} from "./message-thread"

const meta: Meta<typeof MessageThread> = {
  title: "Data Display/MessageThread",
  component: MessageThread,
}

export default meta
type Story = StoryObj<typeof MessageThread>

const seed = [
  { id: "1", author: "Dana", at: "09:02", body: "Thanks for sending the brief over." },
  { id: "2", author: "You", at: "09:04", body: "No problem — shout if anything is unclear." },
  { id: "3", author: "Dana", at: "09:31", body: "One question about the second milestone." },
  { id: "4", author: "You", at: "09:33", body: "Go ahead." },
  { id: "5", author: "Dana", at: "09:40", body: "Is the review window inside it or after it?" },
]

/** The thread opens at the newest message, not the oldest. */
export const Default: Story = {
  render: () => (
    <div className="flex h-96 w-full max-w-md flex-col rounded-lg border-2 border-border">
      <MessageThread aria-label="Conversation with Dana">
        {seed.map((message) => (
          <MessageThreadItem
            key={message.id}
            messageId={message.id}
            meta={
              <>
                <span className="font-medium text-foreground">{message.author}</span>
                <span>{message.at}</span>
              </>
            }
          >
            {message.body}
          </MessageThreadItem>
        ))}
      </MessageThread>
    </div>
  ),
}

function ConversationDemo() {
  const [messages, setMessages] = React.useState(seed)
  const [status, setStatus] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  return (
    <div className="flex h-[32rem] w-full max-w-md flex-col rounded-lg border-2 border-border">
      <MessageThread aria-label="Conversation with Dana">
        {messages.map((message) => (
          <MessageThreadItem
            key={message.id}
            messageId={message.id}
            meta={
              <>
                <span className="font-medium text-foreground">{message.author}</span>
                <span>{message.at}</span>
              </>
            }
          >
            {message.body}
          </MessageThreadItem>
        ))}
      </MessageThread>
      <div className="border-t-2 border-border p-3">
        <MessageComposer
          label="Reply"
          placeholder="Write a reply…"
          error={error}
          status={status}
          onSend={(text) => {
            if (text.length > 280) {
              setError("Keep it under 280 characters.")
              setStatus(null)
              return
            }
            setError(null)
            setMessages((current) => [
              ...current,
              { id: String(current.length + 1), author: "You", at: "now", body: text },
            ])
            setStatus("Reply sent")
          }}
        />
      </div>
    </div>
  )
}

/** Sending scrolls the thread to the new message and announces it. */
export const WithComposer: Story = {
  render: () => <ConversationDemo />,
}

/** The error line is tied to the textarea by `aria-describedby`. */
export const Rejected: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <MessageComposer
        label="Reply"
        defaultValue="…"
        placeholder="Write a reply…"
        error="Keep it under 280 characters."
      />
    </div>
  ),
}

/** While a send is in flight nothing can be sent twice. */
export const Pending: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <MessageComposer label="Reply" defaultValue="On its way" pending status="Sending…" />
    </div>
  ),
}
