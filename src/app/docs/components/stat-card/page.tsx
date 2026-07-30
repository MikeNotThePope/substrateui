"use client"

import { DollarSign, Users, Activity, CreditCard } from "lucide-react"

import { StatCard } from "@/components/stat-card"
import { Grid } from "@/components/ui/grid"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const statCardProps: PropDef[] = [
  { name: "title", type: "string", default: undefined, description: "The metric's name, set in mono caps. Required." },
  { name: "value", type: "React.ReactNode", default: undefined, description: "The figure. A node, not a string, so a Countdown or a formatted number component can go here. Required." },
  { name: "change", type: "string", default: undefined, description: "Change text such as \"+12%\". Rendered as given — the component does no arithmetic and adds no sign." },
  { name: "changeType", type: '"positive" | "negative" | "neutral"', default: '"neutral"', description: "Which colour and glyph the change gets. Your call, not derived from the string: a falling error rate is good news." },
  { name: "icon", type: "React.ComponentType<{ className?: string }>", default: undefined, description: "Icon component for the top corner. Passed as a component, not an element, so the card sizes it." },
  { name: "labels", type: "StatCardLabels", default: undefined, description: "The screen-reader phrasing for the change indicator: increase, decrease, change." },
]

const labelProps: PropDef[] = [
  { name: "increase", type: "(change: string) => string", default: '"Increase of {change}"', description: "Announced for changeType=\"positive\"." },
  { name: "decrease", type: "(change: string) => string", default: '"Decrease of {change}"', description: "Announced for changeType=\"negative\"." },
  { name: "change", type: "(change: string) => string", default: '"Change of {change}"', description: "Announced for changeType=\"neutral\"." },
]

export default function StatCardPage() {
  return (
    <DocPage
      title="Stat Card"
      description="One metric on a card: a name, a figure, and an optional change indicator. An organism — a composition of Card with a fixed internal layout, rather than a primitive you assemble yourself."
    >
      <ComponentPreview
        code={`<StatCard
  title="Total Revenue"
  value="$45,231.89"
  change="+20.1% from last month"
  changeType="positive"
  icon={DollarSign}
/>`}
      >
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          changeType="positive"
          icon={DollarSign}
          className="w-full max-w-xs"
        />
      </ComponentPreview>

      <ImportLine names={["StatCard"]} />

      <Stack gap="md">
        <H3>A row of them</H3>
        <P>
          The usual shape is a <Code>Grid</Code> of four across the top of a
          dashboard. The card has no width of its own, so the grid sets it.
        </P>
        <ComponentPreview
          code={`<Grid columns={4} gap="md">
  <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" changeType="positive" icon={DollarSign} />
  <StatCard title="Subscriptions" value="2,350" change="+180.1%" changeType="positive" icon={Users} />
  <StatCard title="Sales" value="12,234" change="+19%" changeType="positive" icon={CreditCard} />
  <StatCard title="Active Now" value="573" change="-201 since last hour" changeType="negative" icon={Activity} />
</Grid>`}
        >
          <Grid columns={2} gap="md" className="w-full">
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              change="+20.1%"
              changeType="positive"
              icon={DollarSign}
            />
            <StatCard
              title="Subscriptions"
              value="2,350"
              change="+180.1%"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Sales"
              value="12,234"
              change="+19%"
              changeType="positive"
              icon={CreditCard}
            />
            <StatCard
              title="Active Now"
              value="573"
              change="-201 since last hour"
              changeType="negative"
              icon={Activity}
            />
          </Grid>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>The sentiment is yours to set</H3>
        <Stack gap="sm">
          <P>
            <Code>changeType</Code> is not derived from the sign of{" "}
            <Code>change</Code>, and deliberately so. A falling error rate, a
            falling churn number, and a falling latency figure are all good news
            with a minus sign in front of them; guessing from the string would get
            them backwards.
          </P>
          <P>
            The component also does no arithmetic. Whatever you pass as{" "}
            <Code>change</Code> is printed as given, including the sign and the
            unit.
          </P>
        </Stack>
        <ComponentPreview
          code={`{/* Down is good here, so it is positive. */}
<StatCard title="Error Rate" value="0.4%" change="-1.2pp" changeType="positive" />

{/* Neutral where the direction carries no judgement. */}
<StatCard title="Median Session" value="4m 12s" change="±0s" changeType="neutral" />`}
        >
          <Grid columns={2} gap="md" className="w-full">
            <StatCard
              title="Error Rate"
              value="0.4%"
              change="-1.2pp"
              changeType="positive"
            />
            <StatCard
              title="Median Session"
              value="4m 12s"
              change="±0s"
              changeType="neutral"
            />
          </Grid>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>A node as the value</H3>
        <P>
          <Code>value</Code> takes a node, not a string, so anything that renders a
          figure can go in it — a live{" "}
          <a
            href="/docs/components/countdown"
            className="underline underline-offset-4 hover:text-primary"
          >
            Countdown
          </a>
          , a sparkline, a number that animates. The card supplies the type scale
          and the layout.
        </P>
        <ComponentPreview
          code={`<StatCard title="Sale ends" value={<Countdown deadline={endsAt} />} />`}
        >
          <StatCard
            title="Free tier used"
            value={
              <span className="tabular-nums">
                68<span className="text-lg text-muted-foreground">/100</span>
              </span>
            }
            change="+4 today"
            changeType="neutral"
            className="w-full max-w-xs"
          />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The change indicator&apos;s direction is drawn as a ▲, ▼, or • glyph,
          which is marked <Code>aria-hidden</Code> — a screen reader reading
          &quot;black up-pointing triangle&quot; before a number is noise. These
          three functions supply the words that replace it. Override one instance
          with the <Code>labels</Code> prop, or every instance through{" "}
          <Code>LabelsProvider</Code>&apos;s <Code>statCard</Code> key.
        </P>
        <P>
          All three are functions rather than strings, so the change text can sit
          anywhere in the sentence a language needs it. That does mean a function
          cannot cross the server/client boundary: pass these from a Client
          Component, or set them once on <Code>LabelsProvider</Code>, which already
          lives on the client side of that line. This page is a Client Component
          for exactly that reason.
        </P>
        <ComponentPreview
          code={`<StatCard
  title="Chiffre d'affaires"
  value="45 231,89 €"
  change="+20,1 %"
  changeType="positive"
  labels={{ increase: (change) => \`En hausse de \${change}\` }}
/>`}
        >
          <StatCard
            title="Chiffre d'affaires"
            value="45 231,89 €"
            change="+20,1 %"
            changeType="positive"
            labels={{ increase: (change) => `En hausse de ${change}` }}
            className="w-full max-w-xs"
          />
        </ComponentPreview>
        <PropsTable props={labelProps} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Colour is not the only cue for the change direction: each sentiment
            carries a glyph as well as a colour, so up and down are distinguishable
            without seeing red and green. The glyph is hidden from assistive
            technology and replaced by the label text.
          </P>
          <P>
            <Code>title</Code> renders as a <Code>p</Code>, not a heading, so a row
            of cards adds nothing to the document outline. Where the titles are the
            structure of the page, put a real heading above the grid — or wrap each
            card in a region you have named yourself.
          </P>
          <P>
            The title is set in mono uppercase via <Code>tracking-wider</Code>{" "}
            rather than <Code>text-transform</Code> alone. Keep the string in
            sentence case: some screen readers read an all-caps string letter by
            letter.
          </P>
          <P>
            A figure abbreviated for space — &quot;2.4k&quot;, &quot;$1.2M&quot; —
            is read as written. Where the exact number matters, put it in the
            accessible name or offer the underlying{" "}
            <a
              href="/docs/components/table"
              className="underline underline-offset-4 hover:text-primary"
            >
              table
            </a>
            .
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Every prop not listed goes to the underlying <Code>Card</Code>, and from
          there to its <Code>div</Code> — including <Code>className</Code>, which is
          where the card&apos;s width comes from. The internal layout is fixed; for
          a metric that needs a different arrangement, compose{" "}
          <Code>Card</Code> directly.
        </P>
        <PropsTable props={statCardProps} />
      </Stack>
    </DocPage>
  )
}
