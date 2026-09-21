"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const sheetProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state of the sheet.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Callback fired when the open state changes.",
  },
  {
    name: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"right"',
    description:
      "The edge of the viewport the sheet slides in from. With dockAt it must be left or right, because docking turns the sheet into a column beside the page.",
  },
  {
    name: "dockAt",
    type: '"sm" | "md" | "lg" | "xl" | "2xl"',
    default: undefined,
    description:
      "Breakpoint at or above which the sheet stops being an overlay and becomes a column in the page. Below it, the drawer. Omit it and the component is the Base UI dialog it has always been.",
  },
  {
    name: "headingLevel",
    type: "2 | 3 | 4 | 5 | 6",
    default: "2",
    description:
      "The level SheetTitle renders at, at both widths. Defaults to the h2 Base UI's dialog title already used. Ignored without dockAt.",
  },
]

const dockNotes: PropDef[] = [
  {
    name: "SheetTrigger",
    type: "hidden and inert when docked",
    default: undefined,
    description:
      "Below the breakpoint it carries aria-expanded, aria-controls and aria-haspopup=\"dialog\". At or above it, it carries none of the three and is hidden and inert. render still takes an element, so render={<Button />} works as it always has.",
  },
  {
    name: "SheetClose",
    type: "renders nothing when docked",
    default: undefined,
    description:
      "Not hidden, absent. Its whole job is to close the drawer, and above the breakpoint there is no drawer for it to have a job in. The built-in corner close button goes the same way.",
  },
  {
    name: "SheetDescription",
    type: "a paragraph when docked",
    default: undefined,
    description:
      "A dialog is announced with its description when it opens. A landmark is not announced at all, so the docked rail does not claim one and the text is read where it sits.",
  },
  {
    name: "SheetContent className",
    type: "string",
    default: undefined,
    description:
      "Lands on both forms, so a width meant only for the docked rail wants the breakpoint prefix: lg:w-96 sizes the rail and leaves the drawer at its own w-3/4. An unprefixed w-96 would narrow the drawer too.",
  },
  {
    name: "className (function form)",
    type: "not available",
    default: undefined,
    description:
      "Base UI lets className and render be functions of the part's state. A docking Sheet renders its own elements, so there is no Base UI state to call them with, and passing a function throws rather than silently dropping it. Select on data-docked instead.",
  },
]

export default function SheetPage() {
  return (
    <DocPage
      title="Sheet"
      description="A panel that slides in from an edge of the viewport — navigation, filters, detail views that do not need a route of their own."
    >
      {/* Basic Sheet */}
      <Stack gap="md">
        <H3>Right Sheet</H3>
        <ComponentPreview
          code={`<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>
        Adjust your preferences below.
      </SheetDescription>
    </SheetHeader>
    <p className="text-sm text-muted-foreground mt-4">
      Sheet body content goes here.
    </p>
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>
                  Adjust your preferences below.
                </SheetDescription>
              </SheetHeader>
              <p className="text-sm text-muted-foreground mt-4">
                Sheet body content goes here.
              </p>
            </SheetContent>
          </Sheet>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "Sheet",
          "SheetContent",
          "SheetDescription",
          "SheetHeader",
          "SheetTitle",
          "SheetTrigger",
        ]}
      />

      {/* Docking */}
      <Stack gap="md">
        <H3>Docking</H3>
        <P>
          A side rail wants to be a drawer on a phone and a column on a laptop.{" "}
          <Code>dockAt</Code> is that: the overlay below the breakpoint, and at or above it
          a rail that is simply part of the page, with no trigger and nothing to dismiss.
          Narrow this page&rsquo;s window past <Code>lg</Code> and back to watch it change.
        </P>
        <ComponentPreview
          title="dockAt=&quot;lg&quot;"
          code={`<Sheet dockAt="lg">
  <div className="flex items-start gap-6">
    <div className="min-w-0 flex-1">
      <p>Senior Platform Engineer, and the twelve people who applied.</p>
      <SheetTrigger render={<Button variant="outline" />}>Job details</SheetTrigger>
    </div>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Job details</SheetTitle>
        <SheetDescription>Pay, location and the hiring team.</SheetDescription>
      </SheetHeader>
      …
    </SheetContent>
  </div>
</Sheet>`}
        >
          <Sheet dockAt="lg">
            <div className="flex w-full items-start gap-6">
              <div className="min-w-0 flex-1">
                <Stack gap="sm">
                  <P className="text-sm">
                    Senior Platform Engineer, and the twelve people who have applied for it.
                  </P>
                  <SheetTrigger render={<Button variant="outline" />}>Job details</SheetTrigger>
                </Stack>
              </div>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Job details</SheetTitle>
                  <SheetDescription>Pay, location and the hiring team.</SheetDescription>
                </SheetHeader>
                <P className="text-sm text-muted-foreground">
                  Remote, or the Leeds office two days a week.
                </P>
                <P className="text-sm text-muted-foreground">
                  Posted eleven days ago by Dana, who is also the hiring manager.
                </P>
              </SheetContent>
            </div>
          </Sheet>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Above the breakpoint it is not a dialog, and it does not say it is</H3>
        <P>
          This is the part worth arguing about. A docked rail is on screen beside the
          content, not over it. There is nothing to dismiss, so there is no scrim and no
          outside press; there is nowhere for focus to be trapped out of, so there is no
          trap; and Escape closes nothing, because closing is not something the rail can
          do. A <Code>dialog</Code> role there would describe a layer that is not
          there, and the <Code>aria-hidden</Code> Base UI puts on the rest of the
          document to make that layer modal would take a page away from a screen
          reader that can plainly see it.
        </P>
        <P>
          So above the breakpoint the sheet is an <Code>&lt;aside&gt;</Code>: a{" "}
          <Code>complementary</Code> landmark, named by the same{" "}
          <Code>SheetTitle</Code> that named the dialog, which is also what keeps it a
          landmark when a page nests it inside another sectioning element. Content beside
          content, with a name, reachable from a screen reader&rsquo;s landmark list
          instead of from a button.
        </P>
        <P>
          The trigger goes further than hiding. A button that controls nothing, reporting
          that the nothing is collapsed, is a sentence a screen reader reads out, so at
          or above the breakpoint the trigger carries neither <Code>aria-expanded</Code>{" "}
          nor <Code>aria-controls</Code>, and is <Code>hidden</Code> and{" "}
          <Code>inert</Code> as well as off screen. The class is what takes it off the
          screen, so the layout never waits for JavaScript; the attributes are what take
          it out of the accessibility tree, because a control kept from a screen reader
          only by a stylesheet is a control that comes back the day the stylesheet does
          not load.
        </P>
        <P>
          Which is also the warning on the label. <Code>complementary</Code> is a
          landmark, and landmarks are for content worth jumping to.{" "}
          <Code>dockAt</Code> earns its keep on a rail of substance: the facts about the
          job, beside the people who applied for it. A filter panel with three checkboxes
          is a sheet at every width, and should stay one.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Below the breakpoint, what the drawer keeps</H3>
        <P>
          Everything it had: <Code>role=&quot;dialog&quot;</Code> with the rest of the
          document <Code>aria-hidden</Code> and the page&rsquo;s scroll locked, focus
          trapped inside and restored to the trigger on close, Escape and outside press
          to dismiss, and the corner close button with its <Code>sr-only</Code> label. The
          scrim is <Code>bg-background/80</Code>, the page washed out rather than dimmed
          to black, which is the right note for a panel that is a column one breakpoint
          up. A <Code>Sheet</Code> without{" "}
          <Code>dockAt</Code> keeps the black scrim it has always had.
        </P>
        <P>
          The trigger gets the three attributes the rail earned:{" "}
          <Code>aria-expanded</Code>, <Code>aria-controls</Code> and{" "}
          <Code>aria-haspopup=&quot;dialog&quot;</Code>. <Code>aria-controls</Code> is
          worth a line of its own, because it now points at an element that is really in
          the document: the rail is rendered whenever the drawer is not, closed below the
          breakpoint with <Code>hidden</Code> and <Code>inert</Code> on it. A plain{" "}
          <Code>Sheet</Code> has nothing to point at until it opens.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Crossing the breakpoint</H3>
        <P>
          Docking closes an open drawer, and says so once with{" "}
          <Code>onOpenChange(false)</Code>. Everything that was inside it is on screen, so
          there is nothing left for the open state to mean, and leaving it set would
          reopen a modal on the way back down, taking focus from wherever the reader had
          got to for a reason nothing on screen gave. Focus was inside the drawer, because
          the drawer was modal, so it moves to the rail rather than onto the body.
        </P>
        <P>
          What the rail cannot do is keep what is inside it. The drawer is a dialog in a
          portal over a scrim; the rail is a column in the flow beside the content it
          belongs to. Those are two places in the document, and React cannot move a
          subtree between parents without remounting it, so a half-typed note in a rail
          does not survive the crossing, where the same note in a{" "}
          <Code>Tabs unstackAt</Code> pane does. Keep a draft in state above the sheet if
          it has to survive a rotation.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Between first paint and hydration</H3>
        <P>
          The server cannot know the viewport, so the markup it sends is the rail: a named
          landmark is the weaker of the two claims and is true at either width, where
          &ldquo;modal dialog&rdquo; is not. The drawer&rsquo;s half goes on one commit
          later, once the width is known and only if it is below the breakpoint. Until
          then the trigger says nothing about expanding, because it does not yet know
          whether there is anything to expand.
        </P>
        <P>
          The layout does not wait for any of that. Which of the two is on screen is a
          class, so it is right in the first frame and nothing moves when the JavaScript
          lands.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Sheet"
          nodes={[
            { name: "SheetTrigger" },
            {
              name: "SheetContent",
              children: [
                {
                  name: "SheetHeader",
                  children: [
                    { name: "SheetTitle" },
                    { name: "SheetDescription" },
                  ],
                },
              ],
            },
          ]}
        />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The close button is an icon, so this string is its entire accessible name. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>sheet</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "close", type: "string", default: "\"Close\"", description: "Accessible name for the corner close button." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Built on Base UI primitives, so focus is trapped inside the sheet
            while open and restored to the trigger on close. Escape closes
            the sheet. The backdrop is marked <Code>aria-hidden</Code>.
          </P>
          <P>
            Every sheet must have a SheetTitle. If the title should be
            visually hidden, wrap it in <Code>VisuallyHidden</Code> from
            Base UI.
          </P>
        </Stack>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={sheetProps} />
        <P className="text-sm text-muted-foreground">Parts, under dockAt</P>
        <PropsTable props={dockNotes} />
      </Stack>
    </DocPage>
  )
}
