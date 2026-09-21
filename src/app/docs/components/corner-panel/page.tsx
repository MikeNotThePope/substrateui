import { MessageCircle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelFooter,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
} from "@/components/ui/corner-panel"
import { Stack } from "@/components/ui/stack"
import { Textarea } from "@/components/ui/textarea"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "CornerPanel",
  description:
    "A round launcher pinned to the bottom corner that swaps for a panel — a bottom sheet on a phone, a 380px card in the corner above md.",
  route: "/docs/components/corner-panel",
})

const rootProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state. Pair with `onOpenChange`.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Open state for the first render when uncontrolled.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Called with the state the panel wants to be in.",
  },
]

const partProps: PropDef[] = [
  {
    name: "CornerPanelTrigger",
    type: "Button props",
    default: undefined,
    description:
      "The round launcher, fixed to the bottom end corner. Rendered only while the panel is closed. Icon-only, so give it an `aria-label`.",
  },
  {
    name: "CornerPanelContent",
    type: "div props",
    default: undefined,
    description:
      "The `role=\"dialog\"` panel. Owns the focus trap and the Escape handler. Named by the title.",
  },
  {
    name: "CornerPanelHeader",
    type: "div props + actions",
    default: undefined,
    description:
      "The title row. `actions` takes the controls pinned to the end — Refresh, Close.",
  },
  {
    name: "CornerPanelTitle",
    type: "h2 props",
    default: undefined,
    description: "Names the panel and the scrolling body with it.",
  },
  {
    name: "CornerPanelClose",
    type: "Button props + labels",
    default: undefined,
    description: "An icon button that closes the panel. Labelled, because it is icon-only.",
  },
  {
    name: "CornerPanelBody",
    type: "div props",
    default: undefined,
    description: 'The scrolling middle. `role="region"` with `tabIndex={0}`.',
  },
  {
    name: "CornerPanelFooter",
    type: "div props",
    default: undefined,
    description: "The pinned bottom — a composer, a pair of buttons.",
  },
]

/**
 * The specimens below scope the panel to a box rather than to the viewport, by
 * passing `absolute` in `className`. A page carrying three viewport-fixed
 * launchers stacked on top of each other would show one component and lie about
 * two.
 */
const scopedTrigger = "absolute bottom-4 end-4"
const scopedContent = "absolute inset-x-0 bottom-0 md:inset-x-auto md:bottom-4 md:end-4 md:h-[280px]"

export default function CornerPanelPage() {
  return (
    <DocPage
      title="CornerPanel"
      description="A round launcher pinned to the bottom corner that swaps for a panel: a full-width bottom sheet on a phone, a 380px card in the corner from md up. The shape behind a chat widget, an inbox or an account switcher — one application had hand-rolled it three times."
    >
      <ComponentPreview
        code={`import {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelFooter,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
} from "@mikenotthepope/substrateui"

<CornerPanel>
  <CornerPanelTrigger aria-label="Open chat">
    <MessageCircle />
  </CornerPanelTrigger>
  <CornerPanelContent>
    <CornerPanelHeader actions={<CornerPanelClose />}>
      <CornerPanelTitle>Chat</CornerPanelTitle>
    </CornerPanelHeader>
    <CornerPanelBody>{messages}</CornerPanelBody>
    <CornerPanelFooter>{composer}</CornerPanelFooter>
  </CornerPanelContent>
</CornerPanel>`}
      >
        <div className="relative h-[360px] w-full overflow-hidden rounded-md border-2 border-dashed border-border">
          <CornerPanel>
            <CornerPanelTrigger aria-label="Open chat" className={scopedTrigger}>
              <MessageCircle />
            </CornerPanelTrigger>
            <CornerPanelContent className={scopedContent}>
              <CornerPanelHeader
                actions={
                  <>
                    <Button variant="ghost" size="icon-sm" aria-label="Refresh">
                      <RefreshCw />
                    </Button>
                    <CornerPanelClose />
                  </>
                }
              >
                <CornerPanelTitle>Chat</CornerPanelTitle>
              </CornerPanelHeader>
              <CornerPanelBody>
                <Stack gap="sm">
                  <P className="text-sm">
                    Thanks for getting in touch — someone will be with you shortly.
                  </P>
                  <P className="text-sm">
                    In the meantime, the status page has the current incident list.
                  </P>
                </Stack>
              </CornerPanelBody>
              <CornerPanelFooter>
                <Stack gap="sm">
                  <Textarea rows={2} aria-label="Message" placeholder="Write a reply…" />
                  <Button size="sm" className="self-end">
                    Send
                  </Button>
                </Stack>
              </CornerPanelFooter>
            </CornerPanelContent>
          </CornerPanel>
        </div>
      </ComponentPreview>

      <ImportLine
        names={[
          "CornerPanel",
          "CornerPanelBody",
          "CornerPanelClose",
          "CornerPanelContent",
          "CornerPanelFooter",
          "CornerPanelHeader",
          "CornerPanelTitle",
          "CornerPanelTrigger",
        ]}
      />

      <Stack gap="md">
        <H3>The swap</H3>
        <P>
          The launcher is not hidden behind the panel — it is unmounted. That is what makes
          the corner read as one object in two states rather than as two things fighting over
          the same 56 pixels.
        </P>
        <P>
          It is also what makes returning focus awkward, and why this is worth having upstream
          at all. Focus cannot go back to an element that does not exist yet, so the
          hand-rolled copies reached for <Code>flushSync</Code> to force the launcher back
          into the DOM before focusing it. Here an effect in the root does it, after the
          commit that remounts the launcher — which is the ordering <Code>flushSync</Code> was
          buying.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>It is not modal</H3>
        <P>
          There is no backdrop and nothing behind it is inert. A support widget that blanks
          the page it is meant to help with is the wrong trade, and{" "}
          <Code>aria-modal</Code> is <Code>false</Code> for the same reason. Reach for{" "}
          <Code>Dialog</Code> or <Code>Sheet</Code> when the rest of the page genuinely must
          wait.
        </P>
        <P>
          Focus <em>is</em> trapped while it is open, which is the one modal-ish thing it
          does. None of the three copies trapped it; a Tab that wanders out of an open dialog
          and cannot find its way back is a keyboard user stranded, and closing it takes a
          reach for the mouse.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Placement</H3>
        <P>
          The trigger is <Code>fixed bottom-5 end-5</Code> and the panel is{" "}
          <Code>inset-x-0 bottom-0</Code> below <Code>md</Code>,{" "}
          <Code>md:bottom-5 md:end-5 md:w-[380px]</Code> above it. Both take a{" "}
          <Code>className</Code>, so passing <Code>absolute</Code> scopes them to a
          positioned ancestor instead of to the viewport — which is exactly what the specimen
          on this page does, so that three launchers do not pile up in one corner.
        </P>
        <P>
          <Code>end-5</Code> rather than <Code>right-5</Code>: the panel moves to the other
          corner under <Code>DirectionProvider</Code> without a second rule.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          Escape closes it from anywhere inside, because the panel listens on itself and the
          event bubbles up from whatever had focus. The scrolling body is a{" "}
          <Code>role=&quot;region&quot;</Code> with <Code>tabIndex={"{0}"}</Code>, named by the
          title: a scroll container nothing can focus is content a keyboard cannot read.
        </P>
        <P>
          The launcher and <Code>CornerPanelClose</Code> are icon-only, so both need an
          accessible name. Close carries one already — override it through{" "}
          <Code>labels</Code> or <Code>LabelsProvider</Code> to translate it. The launcher is
          yours to name.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P className="text-sm text-muted-foreground">CornerPanel</P>
        <PropsTable props={rootProps} />
        <P className="text-sm text-muted-foreground">Parts</P>
        <PropsTable props={partProps} />
      </Stack>
    </DocPage>
  )
}
