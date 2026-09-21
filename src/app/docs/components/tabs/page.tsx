import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stack } from "@/components/ui/stack"
import { Code, H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Tabs",
  description:
    "Layered panels, one visible at a time — or, with unstackAt, side by side above a breakpoint and no longer tabs at all. The URL does not change, so reach for NavTabs when the tab needs to be linkable.",
  route: "/docs/components/tabs",
})

const tabsProps: PropDef[] = [
  {
    name: "defaultValue",
    type: "string",
    default: undefined,
    description:
      "The value of the tab that should be active when initially rendered. Use when you do not need to control the active tab. Required with unstackAt.",
  },
  {
    name: "value",
    type: "string",
    default: undefined,
    description:
      "The controlled value of the currently active tab. Must be used with onValueChange.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: undefined,
    description:
      "Callback fired when the active tab changes. Receives the new tab value. With unstackAt it fires only below the breakpoint, because above it there is no selection to change.",
  },
  {
    name: "unstackAt",
    type: '"sm" | "md" | "lg" | "xl" | "2xl"',
    default: undefined,
    description:
      "Breakpoint at or above which the panes stop being tabs and become side-by-side regions. Below it, the tabs pattern. Omit it and the component is the Base UI tablist it has always been.",
  },
  {
    name: "headingLevel",
    type: "2 | 3 | 4 | 5 | 6",
    default: "3",
    description:
      "The heading level each tab label becomes above unstackAt. Only the page knows its own outline. Ignored without unstackAt.",
  },
]

const unstackNotes: PropDef[] = [
  {
    name: "TabsList activateOnFocus",
    type: "boolean",
    default: "false",
    description:
      "Select a tab as soon as an arrow key focuses it, rather than waiting for Enter or Space. Same meaning and same default as without unstackAt.",
  },
  {
    name: "TabsList loopFocus",
    type: "boolean",
    default: "true",
    description: "Whether ArrowRight past the last tab returns to the first.",
  },
  {
    name: "TabsTrigger disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the tab and takes it out of the arrow-key order. Above the breakpoint it has no effect — the pane is shown either way.",
  },
  {
    name: "className (function form)",
    type: "not available",
    default: undefined,
    description:
      "Base UI lets className be a function of the part's state. An unstacking Tabs renders its own elements, so there is no Base UI state to call it with, and passing a function throws rather than silently dropping the class. Select on data-active or data-unstacked instead.",
  },
]

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      description="Layered panels, one visible at a time — or, with unstackAt, side by side above a breakpoint and no longer tabs at all. The URL does not change, so reach for NavTabs when the tab needs to be linkable."
    >
      <ComponentPreview
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Manage your account settings and preferences.
  </TabsContent>
  <TabsContent value="password">
    Update your password and security options.
  </TabsContent>
  <TabsContent value="notifications">
    Configure how you receive notifications.
  </TabsContent>
</Tabs>`}
      >
        <div className="w-full">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 text-sm text-muted-foreground">
              Manage your account settings and preferences.
            </TabsContent>
            <TabsContent value="password" className="p-4 text-sm text-muted-foreground">
              Update your password and security options.
            </TabsContent>
            <TabsContent value="notifications" className="p-4 text-sm text-muted-foreground">
              Configure how you receive notifications.
            </TabsContent>
          </Tabs>
        </div>
      </ComponentPreview>

      <ImportLine
        names={[
          "Tabs",
          "TabsContent",
          "TabsList",
          "TabsTrigger",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Tabs"
          nodes={[
            {
              name: "TabsList",
              children: [
                { name: "TabsTrigger" },
              ],
            },
            { name: "TabsContent" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Unstacking</H3>
        <P>
          A review screen wants both panes at once on a laptop and one at a time on a phone.{" "}
          <Code>unstackAt</Code> is that: the tabs pattern below the breakpoint, and at or
          above it every pane on screen with the tab strip gone. Narrow this page&rsquo;s
          window past <Code>lg</Code> and back to watch it change.
        </P>
        <ComponentPreview
          title="unstackAt=&quot;lg&quot;"
          code={`<Tabs defaultValue="resume" unstackAt="lg" headingLevel={4}>
  <TabsList>
    <TabsTrigger value="resume">Résumé</TabsTrigger>
    <TabsTrigger value="notes">Notes</TabsTrigger>
  </TabsList>
  <TabsContent value="resume">…</TabsContent>
  <TabsContent value="notes">…</TabsContent>
</Tabs>`}
        >
          <div className="w-full">
            <Tabs defaultValue="resume" unstackAt="lg" headingLevel={4}>
              <TabsList>
                <TabsTrigger value="resume">Résumé</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="resume" className="text-sm text-muted-foreground">
                <Stack gap="sm">
                  <P className="text-sm">
                    Eight years of back-end work, the last three of them on payments.
                  </P>
                  <P className="text-sm">
                    Wrote the settlement reconciler that closed the month-end gap.
                  </P>
                </Stack>
              </TabsContent>
              <TabsContent value="notes" className="text-sm text-muted-foreground">
                <Stack gap="sm">
                  <P className="text-sm">
                    Screening call went long in a good way. Asked better questions than we did.
                  </P>
                  <P className="text-sm">Wants to know who owns the on-call rota.</P>
                </Stack>
              </TabsContent>
            </Tabs>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Above the breakpoint it is not tabs, and it does not say it is</H3>
        <P>
          This is the part worth arguing about. A <Code>tablist</Code> whose panels are all on
          screen describes a control that is not there. There is no selection, so{" "}
          <Code>aria-selected</Code> has nothing to report; there is nothing to arrow between,
          so a roving <Code>tabIndex</Code> is a tab stop that does nothing; and{" "}
          <Code>aria-controls</Code> points at content already in front of you. Keeping the
          markup and hiding the strip with a class would leave every one of those claims in
          the accessibility tree, true of nothing.
        </P>
        <P>
          So above the breakpoint there is no tablist. Each label becomes a heading, and each
          pane becomes a <Code>region</Code> named by that heading — through the same{" "}
          <Code>aria-labelledby</Code>, pointing at the same element, which was the tab a
          moment ago. That is the honest reading of two panes side by side: two pieces of
          content, each with a name, each reachable from a screen reader&rsquo;s landmark and
          heading lists instead of from an arrow key.
        </P>
        <P>
          Which is also the warning on the label. <Code>region</Code> is a landmark, and
          landmarks are for content worth jumping to. <Code>unstackAt</Code> earns its keep on
          two or three substantial panes — a résumé beside the notes about it. Six chips of
          settings are tabs at every width, and should stay tabs.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Why a class could not have done this</H3>
        <P>
          The request this shipped from said the blocker was Base UI&rsquo;s{" "}
          <Code>TabsPanel</Code> setting the <Code>hidden</Code> attribute, which no
          breakpoint class can undo. That part is not right:{" "}
          <Code>[hidden] &#123; display: none &#125;</Code> is a user-agent rule, and any
          author class outranks it by origin. Base UI&rsquo;s own Tailwind example depends on
          that — its panel carries <Code>[[hidden]]:hidden</Code> to put the hiding back after{" "}
          <Code>flex</Code> has undone it.
        </P>
        <P>
          Two things underneath it are the blocker. A closed Base UI panel is also{" "}
          <Code>inert</Code>, which no class undoes. And one level up from either of them,{" "}
          <Code>role</Code> is not a property, so no media query can change what an element
          claims to be. The layout was never the hard part. The claim was.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Between first paint and hydration</H3>
        <P>
          The server cannot know the viewport, so the markup it sends is the regions form:
          headings and named regions, which is the weaker of the two claims and true at either
          width. The tabs pattern goes on one commit later, once the width is known and only
          if it is below the breakpoint. Below it, that leaves a moment where the headings name
          panes the stylesheet has not revealed — the same moment in which a tab would not have
          responded to a click either, because all of this is a client component.
        </P>
        <P>
          The layout does not wait for any of that. Which pane shows is a class, so it is right
          in the first frame and nothing moves when the JavaScript lands. Semantics are
          JavaScript, layout is CSS, and they are allowed to disagree for exactly one commit.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>What the keyboard does, below the breakpoint</H3>
        <P>
          The full pattern, unchanged from the tabs above: one tab stop for the whole strip,
          ArrowLeft and ArrowRight to move within it, Home and End for the ends, Enter or Space
          to select — or <Code>activateOnFocus</Code> on <Code>TabsList</Code> to select as
          focus lands. Arrow keys follow the reading direction, so under{" "}
          <Code>DirectionProvider dir=&quot;rtl&quot;</Code> ArrowLeft moves to the next tab
          along. Disabled tabs are skipped.
        </P>
        <P>
          Every pane stays mounted at every width, so nothing inside one is thrown away when
          the breakpoint is crossed: a half-typed note is still half-typed after a rotation.
          Below the breakpoint the inactive panes carry <Code>hidden</Code> and{" "}
          <Code>inert</Code> as well as the class that hides them — a pane kept out of the
          accessibility tree only by a stylesheet is a pane that comes back when the stylesheet
          does not load.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={tabsProps} />
        <P className="text-sm text-muted-foreground">Parts, under unstackAt</P>
        <PropsTable props={unstackNotes} />
      </Stack>
    </DocPage>
  )
}
