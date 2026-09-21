import {
  MessageComposer,
  MessageThread,
  MessageThreadItem,
} from "@/components/ui/message-thread"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "MessageThread",
  description:
    "A conversation: a role=log that opens at its newest message and honours a #message- hash, and a composer built on the real Textarea.",
  route: "/docs/components/message-thread",
})

const messages = [
  { id: "1", author: "Dana", at: "09:02", body: "Thanks for sending the brief over." },
  { id: "2", author: "You", at: "09:04", body: "No problem — shout if anything is unclear." },
  { id: "3", author: "Dana", at: "09:31", body: "One question about the second milestone." },
  { id: "4", author: "You", at: "09:33", body: "Go ahead." },
]

const threadProps: PropDef[] = [
  {
    name: "aria-label",
    type: "string",
    default: '"Messages"',
    description: "Names the log. Give each thread on a page a name of its own.",
  },
  {
    name: "labels",
    type: "MessageThreadLabels",
    default: undefined,
    description: "Translations for the default thread name, the composer label and Send.",
  },
  {
    name: "...div props",
    type: "React.ComponentProps<'div'>",
    default: undefined,
    description: "Forwarded to the scroll container.",
  },
]

const itemProps: PropDef[] = [
  {
    name: "messageId",
    type: "string",
    default: undefined,
    required: true,
    description: "Becomes the element id `message-<id>`, which `#message-<id>` addresses.",
  },
  {
    name: "meta",
    type: "React.ReactNode",
    default: undefined,
    description: "Rendered above the body — a name, a timestamp.",
  },
]

const composerProps: PropDef[] = [
  {
    name: "label",
    type: "React.ReactNode",
    default: '"Message"',
    description: "The textarea's accessible name, rendered as an sr-only label.",
  },
  {
    name: "value / defaultValue / onValueChange",
    type: "string / string / (value: string) => void",
    default: undefined,
    description: "Controlled or uncontrolled text.",
  },
  {
    name: "onSend",
    type: "(value: string) => void",
    default: undefined,
    description: "Called with the trimmed text on submit.",
  },
  {
    name: "error",
    type: "React.ReactNode",
    default: undefined,
    description:
      "The message under the textarea. Truthy also sets `aria-invalid` and links the two with `aria-describedby`.",
  },
  {
    name: "status",
    type: "React.ReactNode",
    default: undefined,
    description: 'Announced through the role="status" note.',
  },
  {
    name: "pending",
    type: "boolean",
    default: "false",
    description: "A send is in flight: the button is disabled and submit does nothing.",
  },
  {
    name: "clearOnSend",
    type: "boolean",
    default: "true",
    description: "Clear the textarea after a send. Ignored while `value` is controlled.",
  },
  {
    name: "submitLabel",
    type: "React.ReactNode",
    default: '"Send"',
    description: "The submit button's text.",
  },
  {
    name: "rows",
    type: "number",
    default: "3",
    description: "Rows on the textarea.",
  },
]

export default function MessageThreadPage() {
  return (
    <DocPage
      title="MessageThread"
      description="A conversation, in two halves: a role=log that opens at its newest message and honours a #message- hash, and a composer built on the real Textarea with an aria-describedby error line and a role=status note. One application carried three copies of this."
    >
      <ComponentPreview
        code={`import {
  MessageComposer,
  MessageThread,
  MessageThreadItem,
} from "@mikenotthepope/substrateui"

<MessageThread aria-label="Conversation with Dana">
  {messages.map((m) => (
    <MessageThreadItem key={m.id} messageId={m.id} meta={<>{m.author} · {m.at}</>}>
      {m.body}
    </MessageThreadItem>
  ))}
</MessageThread>

<MessageComposer
  label="Reply"
  placeholder="Write a reply…"
  error={error}
  status={sent ? "Reply sent" : null}
  onSend={send}
/>`}
      >
        <div className="flex h-96 w-full max-w-md flex-col rounded-lg border-2 border-border">
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
            <MessageComposer label="Reply" placeholder="Write a reply…" />
          </div>
        </div>
      </ComponentPreview>

      <ImportLine names={["MessageThread", "MessageThreadItem", "MessageComposer"]} />

      <Stack gap="md">
        <H3>Where it opens</H3>
        <P>
          At the newest message. A thread that opens at the oldest one shows the reader the
          part they have already read. Every message that arrives after that scrolls it down
          again; nothing else does, so a reader who has scrolled up to find something is left
          alone until the conversation actually moves.
        </P>
        <P>
          Unless the URL says otherwise. Each item carries the element id{" "}
          <Code>message-&lt;messageId&gt;</Code>, so a link to{" "}
          <Code>#message-42</Code> is a link to one message — and on first paint that
          message is scrolled to and <em>focused</em>, rather than scrolled past on the way
          to the bottom. The focus half is the part a hand-rolled copy forgets: without it a
          screen reader is still reading the page the link came from. It is why{" "}
          <Code>MessageThreadItem</Code> carries <Code>tabIndex={"{-1}"}</Code>.
        </P>
        <P>
          A hash that names no message in this thread is ignored, and the thread opens at the
          newest message as usual.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Why role=log</H3>
        <P>
          <Code>log</Code> is the role for a running list of messages. It announces what
          arrives without reading the backlog out on arrival, which is what{" "}
          <Code>aria-live</Code> on a plain <Code>region</Code> would do. It is also a tab
          stop — <Code>tabIndex={"{0}"}</Code> — because a scroll container nothing can focus
          is content a keyboard cannot scroll.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>The composer uses Textarea</H3>
        <P>
          Not a bare <Code>&lt;textarea&gt;</Code> with <Code>Textarea</Code>&apos;s class
          string pasted onto it, which is what all three hand-rolled copies did — and which
          is why each of them drifted from the input it was imitating and none of them picked
          up a fix to it.
        </P>
        <P>
          <Code>error</Code> sets <Code>aria-invalid</Code> and links the message to the
          textarea with <Code>aria-describedby</Code>. An empty message cannot be sent: Send
          stays disabled until there is something other than whitespace to send.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>The status note is always there</H3>
        <P>
          The <Code>role=&quot;status&quot;</Code> paragraph is in the document from the
          first render, empty until there is something to say. A live region inserted at the
          same moment as its text is a live region nothing announces — the announcement is
          the <em>change</em>, and there was nothing to change from. This is the detail a
          hand-rolled copy gets wrong and never finds out about, because nothing visible is
          different either way.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Sending that can fail</H3>
        <P>
          Uncontrolled, the textarea clears after a send. If your send can fail, control{" "}
          <Code>value</Code> — then nothing clears on its own and a rejected message is still
          there to fix. <Code>clearOnSend={"{false}"}</Code> keeps it while uncontrolled.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P className="text-sm text-muted-foreground">MessageThread</P>
        <PropsTable props={threadProps} />
        <P className="text-sm text-muted-foreground">MessageThreadItem</P>
        <PropsTable props={itemProps} />
        <P className="text-sm text-muted-foreground">MessageComposer</P>
        <PropsTable props={composerProps} />
      </Stack>
    </DocPage>
  )
}
