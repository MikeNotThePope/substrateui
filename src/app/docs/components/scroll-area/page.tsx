import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Scroll Area",
  description: "A scrolling frame with a scrollbar the theme draws, instead of the one the operating system draws.",
  route: "/docs/components/scroll-area",
})

const scrollAreaProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "Where the height goes. The root is overflow-hidden with no size of its own, so without a height or max-height nothing scrolls.",
  },
]

const scrollBarProps: PropDef[] = [
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description:
      "Which scrollbar to draw. ScrollArea renders both, so you only need this when composing Base UI's primitives yourself.",
  },
]

const releases = [
  { version: "1.16.0", note: "Aligned plum and lava with the house geometry." },
  { version: "1.15.1", note: "Fixed nested buttons in multi-select Combobox." },
  { version: "1.15.0", note: "Renamed the press theme to proof." },
  { version: "1.14.2", note: "Docs furniture: slug lines and trim rules." },
  { version: "1.14.1", note: "Button variant amber became secondary-fill." },
  { version: "1.14.0", note: "Countdown, Transfer, and Tree landed." },
  { version: "1.13.3", note: "Contrast audit covers every theme, both modes." },
  { version: "1.13.2", note: "Direction audit blocks physical properties." },
  { version: "1.13.1", note: "Announcer moved to a shared live region." },
  { version: "1.13.0", note: "Blocks, the init CLI, and the theme generator." },
]

export default function ScrollAreaPage() {
  return (
    <DocPage
      title="Scroll Area"
      description="A scrolling frame with a scrollbar the theme draws, instead of the one the operating system draws. Same overflow behaviour, a bar that matches the rest of the set."
    >
      <ComponentPreview
        code={`<ScrollArea className="h-56 w-full rounded-lg border-2">
  <div className="p-4">
    {releases.map((r) => (
      <div key={r.version}>
        <p className="font-mono text-xs">{r.version}</p>
        <p className="text-sm text-muted-foreground">{r.note}</p>
        <Separator className="my-3" />
      </div>
    ))}
  </div>
</ScrollArea>`}
      >
        <ScrollArea className="h-56 w-full max-w-md rounded-lg border-2">
          <div className="p-4">
            {releases.map((r) => (
              <div key={r.version}>
                <p className="font-mono text-xs">{r.version}</p>
                <p className="text-sm text-muted-foreground">{r.note}</p>
                <Separator className="my-3" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentPreview>

      <ImportLine names={["ScrollArea", "ScrollBar"]} />

      <Stack gap="md">
        <H3>It needs a height</H3>
        <P>
          The root is <Code>overflow-hidden</Code> and takes no size of its own.
          Without a <Code>height</Code> or <Code>max-height</Code> it grows to fit
          its content and never scrolls — which is the one way this component
          silently does nothing. Put the constraint on the{" "}
          <Code>ScrollArea</Code> itself, not on a wrapper.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Scrolling sideways</H3>
        <P>
          Both bars are already there — Base UI drops the one for an axis that
          doesn&apos;t overflow, so you get whichever the content calls for without
          asking. What you do need is inner content genuinely wider than the frame:{" "}
          <Code>w-max</Code> on the row below, so it sizes to its children instead
          of to the container.
        </P>
        <ComponentPreview
          code={`<ScrollArea className="w-full whitespace-nowrap rounded-lg border-2">
  <div className="flex w-max gap-3 p-4">
    {themes.map((t) => (
      <div key={t} className="w-32 shrink-0 rounded-md border-2 p-3 text-sm">
        {t}
      </div>
    ))}
  </div>
</ScrollArea>`}
        >
          <ScrollArea className="w-full max-w-md whitespace-nowrap rounded-lg border-2">
            <div className="flex w-max gap-3 p-4">
              {["proof", "plum", "lava", "moss", "slate"].map((t) => (
                <div
                  key={t}
                  className="w-32 shrink-0 rounded-md border-2 p-3 text-sm"
                >
                  {t}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            The vertical bar&apos;s border uses <Code>border-s</Code>, so it sits
            against the inline-end edge and moves to the left of the frame in RTL,
            where the browser puts the scrollbar. Nothing to configure.
          </P>
          <P>
            Horizontal scrolling starts from the inline-start edge, so in RTL the
            content begins at the right and scrolls leftward. If you set a scroll
            position programmatically, remember <Code>scrollLeft</Code> is negative
            or reversed in RTL depending on the browser — read it, don&apos;t assume
            it.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            The viewport is a real scroll container, so the keyboard works as it
            does anywhere: arrows, Page Up and Page Down, Home and End — once
            focus is inside. Content that is only reachable by scrolling must
            contain something focusable, or a keyboard user cannot get to it.
          </P>
          <P>
            The custom bar replaces the platform one, which is the whole point and
            also the cost: it does not honour a user&apos;s always-visible
            scrollbar setting, and the thumb is drawn in{" "}
            <Code>bg-border</Code>. Do not use a scrolling frame as the only cue
            that there is more content — a fading edge or a count says so without
            depending on the bar being noticed.
          </P>
          <P>
            The thumb is 10px wide, under the 24px pointer-target guideline. That
            is acceptable because the mouse wheel, the trackpad, and the keyboard
            all scroll without touching it; it would not be if dragging the thumb
            were the only way to move.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Built on Base UI&apos;s <Code>ScrollArea</Code>: the root, viewport, both
          scrollbars, their thumbs, and the corner are assembled here so a caller
          passes one element. Everything you pass goes to the root — see the{" "}
          <a
            href="https://base-ui.com/react/components/scroll-area"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Base UI scroll-area docs
          </a>{" "}
          for that surface.
        </P>
        <PropsTable props={scrollAreaProps} />

        <H3>ScrollBar</H3>
        <PropsTable props={scrollBarProps} />
      </Stack>
    </DocPage>
  )
}
