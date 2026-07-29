import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"
import {
  CountdownDemo,
  CountdownRenderDemo,
  CountdownStatCardDemo,
} from "./countdown-demo"

const props: PropDef[] = [
  { name: "deadline", type: "Date | number", default: undefined, description: "When the countdown reaches zero — a Date or epoch milliseconds." },
  { name: "interval", type: "number", default: "1000", description: "Tick rate in milliseconds." },
  { name: "locale", type: "string", default: undefined, description: "BCP-47 locale for the formatted remainder. Defaults to the runtime locale." },
  { name: "onFinish", type: "() => void", default: undefined, description: "Fired once when the deadline is reached, and again only if a new deadline is set." },
  { name: "children", type: "(state: CountdownState) => React.ReactNode", default: undefined, description: "Render prop receiving the live state, replacing the default formatted string." },
  { name: "labels", type: "CountdownLabels", default: undefined, description: "Override the accessible name via labels.remaining." },
]

const stateProps: PropDef[] = [
  { name: "total", type: "number", default: undefined, description: "Milliseconds left, clamped at 0." },
  { name: "days / hours / minutes / seconds", type: "number", default: undefined, description: "The remainder split into whole units." },
  { name: "formatted", type: "string", default: undefined, description: "The remainder formatted for the locale, e.g. \"2 days, 3:04:05\"." },
  { name: "finished", type: "boolean", default: undefined, description: "True once the deadline has passed." },
  { name: "ready", type: "boolean", default: undefined, description: "False until the countdown has been measured in the browser." },
]

export default function CountdownPage() {
  return (
    <DocPage
      title="Countdown"
      description="A live countdown to a deadline. Formats itself for the current locale, announces itself as a timer rather than shouting every tick at screen readers, and hands you the raw units when you want to lay them out yourself."
    >
      <Stack gap="md">
        <H3>Basic</H3>
        <P>
          Pass a <Code>deadline</Code> and it ticks once a second until it
          reaches zero. Seed the deadline in state rather than computing it
          inline — <Code>Date.now() + n</Code> in JSX is recomputed on every
          render, which resets the countdown instead of advancing it.
        </P>
        <ComponentPreview
          code={`<Countdown deadline={saleEndsAt} onFinish={() => refetch()} />`}
        >
          <CountdownDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Formatting</H3>
        <P>
          The default output comes from <Code>Intl.DurationFormat</Code>, so it
          follows the locale and drops units that are still zero —{" "}
          <Code>04:05</Code>, then <Code>3:04:05</Code>, then{" "}
          <Code>2 days, 3:04:05</Code>. Pass <Code>locale</Code> to pin it to a
          specific one.
        </P>
        <ComponentPreview code={`<Countdown deadline={deadline} locale="ar-EG" />`}>
          <P className="text-sm text-muted-foreground">
            No format string to learn — the locale decides.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Custom layout</H3>
        <P>
          Pass a function as <Code>children</Code> to lay the units out
          yourself. This replaces a format-string DSL: you get the numbers and
          render whatever you like, including a different message once{" "}
          <Code>finished</Code> flips.
        </P>
        <ComponentPreview
          code={`<Countdown deadline={doorsOpenAt}>
  {({ hours, minutes, seconds, finished }) =>
    finished ? "Doors open" : \`\${hours}h \${minutes}m \${seconds}s\`}
</Countdown>`}
        >
          <CountdownRenderDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>In a StatCard</H3>
        <P>
          <Code>StatCard</Code> takes any node as its <Code>value</Code>, so a
          countdown drops straight in — the metric card and the live timer, with
          no third component in between.
        </P>
        <ComponentPreview
          code={`<StatCard title="Sale ends" value={<Countdown deadline={endsAt} />} />`}
        >
          <CountdownStatCardDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>The hook</H3>
        <P>
          <Code>useCountdown</Code> is the same logic without the markup, for
          when the remainder drives something other than text.
        </P>
        <ComponentPreview
          code={`const { days, hours, minutes, seconds, finished } = useCountdown(deadline, {
  interval: 1000,
  onFinish: () => refetch(),
})`}
        >
          <P className="text-sm text-muted-foreground">
            Import from <Code>@mikenotthepope/substrateui/hooks</Code>.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The element is a <Code>role=&quot;timer&quot;</Code>, whose implicit{" "}
          <Code>aria-live</Code> is off. That is deliberate: a polite live
          region here would read the clock aloud once a second. Screen reader
          users get the value on demand instead, which is why the timer carries
          an accessible name — <Code>&quot;Time remaining&quot;</Code> by
          default, overridable through <Code>labels.remaining</Code>.
        </P>
        <P>
          Server-rendered output is empty until the countdown is measured in the
          browser. The server cannot know what &quot;now&quot; is on the client,
          and rendering a clock during hydration guarantees a mismatch.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Props</H3>
        <PropsTable props={props} />
      </Stack>

      <Stack gap="md">
        <H3>CountdownState</H3>
        <P>
          The object handed to the render prop, and returned by{" "}
          <Code>useCountdown</Code>.
        </P>
        <PropsTable props={stateProps} />
      </Stack>
    </DocPage>
  )
}
