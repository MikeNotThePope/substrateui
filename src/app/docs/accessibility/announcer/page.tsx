import { DocPage } from "../../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { AnnouncerDemo } from "./announcer-demo"

const api: PropDef[] = [
  { name: "useAnnouncer()", type: "() => { announce, clear }", default: undefined, description: "React hook returning a stable announce/clear pair for use in effects and handlers." },
  { name: "announce(message, assertiveness?, timeout?)", type: "(string, 'assertive' | 'polite', number) => void", default: "'polite', 7000", description: "Imperatively announce a message. Empty string clears without announcing." },
  { name: "clearAnnouncer(assertiveness?)", type: "('assertive' | 'polite') => void", default: undefined, description: "Clear pending messages from one region, or both when omitted." },
  { name: "destroyAnnouncer()", type: "() => void", default: undefined, description: "Remove the live region from the document entirely (teardown / tests)." },
]

export default function AnnouncerPage() {
  return (
    <DocPage
      title="Announcer"
      description="Imperatively announce messages to screen readers for feedback that has no visual anchor — async results, background updates, undo confirmations. A single shared, visually-hidden ARIA live region does the work; import announce or useAnnouncer from @mikenotthepope/substrateui/hooks."
    >
      <Stack gap="md">
        <H3>Why</H3>
        <P>
          Some feedback never reaches screen-reader users because nothing on
          screen changes where their focus is: a search that finishes loading, a
          toast that fades, an item removed from a list. A live region announces
          that text out loud without moving focus or rendering anything visible.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Example</H3>
        <P className="text-sm text-muted-foreground">
          Turn on a screen reader (VoiceOver, NVDA) and press a button — the
          message is read aloud. The box below mirrors it for sighted testing.
        </P>
        <ComponentPreview
          code={`import { useAnnouncer } from "@mikenotthepope/substrateui/hooks"

function Results({ items }) {
  const { announce } = useAnnouncer()

  useEffect(() => {
    announce(\`\${items.length} results loaded\`, "polite")
  }, [items.length, announce])

  return <ul>{/* … */}</ul>
}`}
        >
          <AnnouncerDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Imperative use</H3>
        <P>
          Outside React — in a store, a fetch callback, a utility — call{" "}
          <Code>announce</Code> directly. It lazily creates the shared region on
          first use and is a safe no-op during SSR.
        </P>
        <ComponentPreview
          code={`import { announce } from "@mikenotthepope/substrateui/hooks"

async function saveDraft() {
  await api.save()
  announce("Draft saved", "polite")
}`}
        >
          <P className="text-sm text-muted-foreground">
            <Code>announce(&quot;Draft saved&quot;, &quot;polite&quot;)</Code>
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Politeness</H3>
        <P>
          Prefer <Code>&quot;polite&quot;</Code> (the default): it waits for the
          screen reader to finish what it&apos;s saying. Reserve{" "}
          <Code>&quot;assertive&quot;</Code> for genuinely urgent messages —
          errors that block the user — since it interrupts immediately.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={api} />
      </Stack>
    </DocPage>
  )
}
