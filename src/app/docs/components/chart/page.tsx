"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const containerProps: PropDef[] = [
  {
    name: "config",
    type: "ChartConfig",
    default: undefined,
    description:
      "Maps each series key to a label, an optional icon, and a colour. Required — it is what the tooltip and legend read, and what the CSS variables are generated from.",
  },
  {
    name: "id",
    type: "string",
    default: "a generated id",
    description:
      "Scopes the generated CSS variables. Only worth setting if you need a stable selector for a test or a screenshot.",
  },
]

const tooltipContentProps: PropDef[] = [
  { name: "indicator", type: '"dot" | "line" | "dashed"', default: '"dot"', description: "The swatch drawn beside each series in the tooltip." },
  { name: "hideLabel", type: "boolean", default: "false", description: "Drop the heading row — for a single-series chart where the label repeats the axis." },
  { name: "hideIndicator", type: "boolean", default: "false", description: "Drop the colour swatches." },
  { name: "labelKey", type: "string", default: undefined, description: "Which payload field supplies the heading, when it isn't the axis key." },
  { name: "nameKey", type: "string", default: undefined, description: "Which payload field supplies each row's name, when it isn't the series key." },
  { name: "labelFormatter", type: "(value, payload) => ReactNode", default: undefined, description: "Reformat the heading — a date into a readable month, for instance." },
  { name: "formatter", type: "(value, name, item, index, payload) => ReactNode", default: undefined, description: "Reformat each row. Use it for units and currency." },
]

const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const data = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 264, mobile: 140 },
]

const axis = {
  dataKey: "month",
  tickLine: false,
  axisLine: false,
  tickMargin: 10,
  tickFormatter: (value: string) => value.slice(0, 3),
}

export default function ChartPage() {
  return (
    <DocPage
      title="Chart"
      description="A themed wrapper around Recharts. You still write Recharts — the container adds the config context, generates a CSS variable per series, and restyles the grid, axes, and tooltip to match the rest of the set."
    >
      <ComponentPreview
        code={`const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartContainer config={config} className="h-[240px] w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} isAnimationActive={false} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />
  </BarChart>
</ChartContainer>`}
      >
        <ChartContainer config={config} className="h-[240px] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis {...axis} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              isAnimationActive={false}
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={4}
            />
            <Bar
              isAnimationActive={false}
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </ComponentPreview>

      <ImportLine
        names={[
          "ChartContainer",
          "ChartTooltip",
          "ChartTooltipContent",
          "ChartLegend",
          "ChartLegendContent",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          Everything inside the container is Recharts&apos; own — the chart type,
          the axes, the grid. Only the tooltip and legend <em>content</em> are
          replaced, because those are the parts that carry the theme.{" "}
          <Code>ChartTooltip</Code> is Recharts&apos; <Code>Tooltip</Code>
          re-exported, so it is the <Code>content</Code> prop that does the work.
        </P>
        <CompositionTree
          root="ChartContainer"
          nodes={[
            {
              name: "BarChart (any Recharts chart)",
              children: [
                { name: "CartesianGrid" },
                { name: "XAxis / YAxis" },
                {
                  name: "ChartTooltip",
                  children: [{ name: "ChartTooltipContent" }],
                },
                {
                  name: "ChartLegend",
                  children: [{ name: "ChartLegendContent" }],
                },
                { name: "Bar / Line / Area" },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>The config is the colour source</H3>
        <Stack gap="sm">
          <P>
            Each key in <Code>config</Code> becomes a CSS variable named{" "}
            <Code>--color-&lt;key&gt;</Code>, scoped to that one chart. So a series
            keyed <Code>desktop</Code> is painted with{" "}
            <Code>fill=&quot;var(--color-desktop)&quot;</Code> — the indirection is
            the point: the tooltip, the legend, and the bar all read one value, and
            changing the theme changes all three.
          </P>
          <P>
            Point the config at the theme&apos;s own <Code>--chart-1</Code> through{" "}
            <Code>--chart-5</Code> rather than at a literal colour. Those five are
            defined per theme, light and dark, so a chart follows the palette
            instead of pinning it. Use <Code>theme</Code> instead of{" "}
            <Code>color</Code> where a series needs different values in light and
            dark.
          </P>
        </Stack>
        <ComponentPreview
          defaultOpen
          code={`const config = {
  // One value for both modes — a theme token already handles the switch.
  desktop: { label: "Desktop", color: "var(--chart-1)" },

  // Or split it explicitly when the series needs different colours per mode.
  mobile: { label: "Mobile", theme: { light: "var(--chart-2)", dark: "var(--chart-4)" } },
} satisfies ChartConfig`}
        >
          <P className="text-sm text-muted-foreground">
            <Code>satisfies ChartConfig</Code> rather than a type annotation, so the
            key names stay literal and <Code>--color-desktop</Code> is checkable.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Lines and areas</H3>
        <P>
          The container makes no assumption about chart type — the same config and
          the same variables drive a line or an area chart. Note the legend, which
          reads its names from the config too.
        </P>
        <ComponentPreview
          code={`<ChartContainer config={config} className="h-[240px] w-full">
  <LineChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
    <Line dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`}
        >
          <ChartContainer config={config} className="h-[240px] w-full">
            <LineChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis {...axis} />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                isAnimationActive={false}
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                isAnimationActive={false}
                dataKey="mobile"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Formatting the tooltip</H3>
        <P>
          <Code>formatter</Code> and <Code>labelFormatter</Code> reshape the rows
          and the heading. A number with no unit is a number the reader has to guess
          at, so this is usually worth setting rather than optional.
        </P>
        <ComponentPreview
          code={`<ChartTooltip
  content={
    <ChartTooltipContent
      indicator="dashed"
      labelFormatter={(value) => \`\${value} 2026\`}
      formatter={(value, name) => \`\${name}: \${value} sessions\`}
    />
  }
/>`}
        >
          <ChartContainer config={config} className="h-[240px] w-full">
            <AreaChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis {...axis} />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    labelFormatter={(value) => `${value} 2026`}
                    formatter={(value, name) => `${name}: ${value} sessions`}
                  />
                }
              />
              <Area
                isAnimationActive={false}
                dataKey="desktop"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                fillOpacity={0.2}
              />
              <Area
                isAnimationActive={false}
                dataKey="mobile"
                stroke="var(--color-mobile)"
                fill="var(--color-mobile)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Animation</H3>
        <Stack gap="sm">
          <P>
            Recharts animates a series in from zero, and it does not check{" "}
            <Code>prefers-reduced-motion</Code>. Every example on this page passes{" "}
            <Code>isAnimationActive={"{false}"}</Code>, which is also what a
            screenshot test needs — an animating chart is a flaky snapshot.
          </P>
          <P>
            Watch for a chart that renders its grid and axes but no data: a bar
            mid-animation has zero height, and a Recharts rectangle of zero height
            draws nothing. If the animation never completes, the chart stays empty
            and looks like a data problem rather than a motion one.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Sizing</H3>
        <P>
          The container is <Code>aspect-video</Code> by default and wraps
          Recharts&apos; <Code>ResponsiveContainer</Code>, which measures its
          parent. Give the container a height — or let the aspect ratio give it one —
          because a <Code>ResponsiveContainer</Code> in a parent of zero height
          measures zero and draws nothing.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            Recharts draws into SVG with computed x-coordinates and does not read{" "}
            <Code>direction</Code>, so an RTL locale gets the axis still running
            left to right. Pass <Code>reversed</Code> on the{" "}
            <Code>XAxis</Code> and set the <Code>YAxis</Code> to{" "}
            <Code>orientation=&quot;right&quot;</Code> where the chart should read
            the way the page does.
          </P>
          <P>
            The tooltip and legend are ordinary DOM, so their text and layout flip
            on their own. This is the one place in the set where the direction
            toggle is not enough by itself.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            A chart is a picture of data, and the picture is not the data. Recharts
            renders SVG with no accessible structure by default, so a screen-reader
            user gets nothing. Put the numbers somewhere reachable — a{" "}
            <a
              href="/docs/components/table"
              className="underline underline-offset-4 hover:text-primary"
            >
              Table
            </a>{" "}
            beside or behind a disclosure, or at minimum a written summary of what
            the chart shows.
          </P>
          <P>
            The tooltip appears on hover and on focus of a data point, which means
            it is pointer-first: it is not a substitute for labelled axes. Keep the
            axis ticks.
          </P>
          <P>
            Colour must not be the only difference between series. Two lines in{" "}
            <Code>--chart-1</Code> and <Code>--chart-3</Code> are the same hue at
            different lightnesses and will merge for some readers — vary the dash
            pattern, the marker, or add direct labels.
          </P>
          <P>
            The chart colours are graphical objects, held to 3:1 against their
            background rather than the 4.5:1 required of text. Tick labels are text
            and use <Code>muted-foreground</Code>, which the{" "}
            <a
              href="/docs/accessibility/contrast"
              className="underline underline-offset-4 hover:text-primary"
            >
              contrast audit
            </a>{" "}
            covers for every theme.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Everything inside the container is Recharts&apos; API — see the{" "}
          <a
            href="https://recharts.org/en-US/api"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Recharts reference
          </a>
          . <Code>ChartLegendContent</Code> takes{" "}
          <Code>hideIcon</Code> and <Code>nameKey</Code>, and{" "}
          <Code>ChartStyle</Code> is exported for the rare case of generating the
          variables yourself.
        </P>
        <PropsTable props={containerProps} />

        <H3>ChartTooltipContent</H3>
        <PropsTable props={tooltipContentProps} />
      </Stack>
    </DocPage>
  )
}
