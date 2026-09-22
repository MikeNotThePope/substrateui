import { MessageCircle, Plus, Wrench } from "lucide-react"

import {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
} from "@/components/ui/corner-panel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FloatingAction } from "@/components/ui/floating-action"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "FloatingAction",
  description:
    "The round launcher pinned to the bottom corner of the viewport, on its own. A button, not an overlay: hand it to whatever opens.",
  route: "/docs/components/floating-action",
})

const floatingActionProps: PropDef[] = [
  {
    name: "lift",
    type: "0 | 1 | 2",
    default: "0",
    description:
      "How many launchers already hold the corner. `0` is the corner itself, `1` sits one launcher above it, `2` two.",
  },
  {
    name: "variant",
    type: "Button variant",
    default: '"default"',
    description: "Passed straight to `Button`. The size is fixed at 56px square.",
  },
  {
    name: "render",
    type: "ReactElement",
    default: undefined,
    description:
      "Render a different element instead of a button, the way `Button` does.",
  },
]

/**
 * Both specimens scope themselves to a box with `absolute`, the way the
 * CornerPanel page does. Three viewport-fixed launchers stacked in one corner
 * would show one component and lie about two.
 */
const scoped = "absolute bottom-4 end-4"
const scopedLifted = "absolute bottom-22 end-4"
const scopedPanel =
  "absolute inset-x-0 bottom-0 md:inset-x-auto md:bottom-4 md:end-4 md:h-[220px]"

export default function FloatingActionPage() {
  return (
    <DocPage
      title="FloatingAction"
      description="The round launcher pinned to the bottom corner of the viewport, on its own. CornerPanel already parks one of these in that corner to open a panel; this is the same 56px object when what it opens is a menu, a dialog, or nothing at all."
    >
      <ComponentPreview
        code={`import { FloatingAction } from "@mikenotthepope/substrateui"

<FloatingAction aria-label="New message">
  <Plus />
</FloatingAction>`}
      >
        <div className="relative h-[200px] w-full overflow-hidden rounded-md border-2 border-dashed border-border">
          <FloatingAction aria-label="New message" className={scoped}>
            <Plus />
          </FloatingAction>
        </div>
      </ComponentPreview>

      <ImportLine names={["FloatingAction"]} />

      <Stack gap="md">
        <H3>It holds no menu, and that is the point</H3>
        <P>
          A launcher with a menu built into it would be a second menu in this library,
          with its own idea of what an arrow key does. <Code>DropdownMenu</Code> already
          owns that job, and owns it better than a hand-rolled copy: the highlight wraps,
          Escape closes, Tab out closes, and a press that focuses nothing does not.
        </P>
        <P>
          So the composition is the API. Hand the launcher to{" "}
          <Code>DropdownMenuTrigger</Code> through its <Code>render</Code> prop and the
          two halves stay each other&apos;s business.
        </P>
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger
    render={
      <FloatingAction aria-label="Test tools">
        <Wrench />
      </FloatingAction>
    }
  />
  <DropdownMenuContent positionMethod="fixed" side="top" align="end" className="w-52">
    <DropdownMenuItem>Accounts</DropdownMenuItem>
    <DropdownMenuItem>Inbox</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Load test data</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <div className="relative h-[200px] w-full overflow-hidden rounded-md border-2 border-dashed border-border">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <FloatingAction aria-label="Test tools" className={scoped}>
                    <Wrench />
                  </FloatingAction>
                }
              />
              <DropdownMenuContent
                positionMethod="fixed"
                side="top"
                align="end"
                className="w-52"
              >
                <DropdownMenuItem>Accounts</DropdownMenuItem>
                <DropdownMenuItem>Inbox</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Load test data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>
          <Code>positionMethod=&quot;fixed&quot;</Code> is not decoration
        </H3>
        <P>
          A launcher pinned with <Code>position: fixed</Code> is anchored in viewport
          coordinates. A popup placed <Code>absolute</Code> is measured in document ones.
          The two agree only while the page is scrolled to the top, so on a long page the
          menu parts company with the button the moment the reader scrolls.
        </P>
        <P>
          <Code>DropdownMenuContent</Code> takes <Code>positionMethod</Code> for exactly
          this. <Code>side=&quot;top&quot; align=&quot;end&quot;</Code> is the other half:
          a menu over a bottom corner opens upward and toward the corner it came from, and
          Base UI moves it back inside the viewport on its own if there is no room.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Sharing the corner</H3>
        <P>
          The corner is a single resource and this library now puts two things in it.{" "}
          <Code>lift</Code> is how the second one gets out of the first one&apos;s way:{" "}
          <Code>lift={"{1}"}</Code> is one launcher up, <Code>lift={"{2}"}</Code> two. The
          arithmetic is 56 pixels of button and 16 of air, so each step is 72 on top of
          the corner&apos;s own 20.
        </P>
        <ComponentPreview
          code={`<CornerPanelTrigger aria-label="Open chat">
  <MessageCircle />
</CornerPanelTrigger>

<FloatingAction aria-label="Test tools" lift={1}>
  <Wrench />
</FloatingAction>`}
        >
          <div className="relative h-[280px] w-full overflow-hidden rounded-md border-2 border-dashed border-border">
            <CornerPanel>
              <CornerPanelTrigger aria-label="Open chat" className={scoped}>
                <MessageCircle />
              </CornerPanelTrigger>
              <CornerPanelContent className={scopedPanel}>
                <CornerPanelHeader actions={<CornerPanelClose />}>
                  <CornerPanelTitle>Chat</CornerPanelTitle>
                </CornerPanelHeader>
                <CornerPanelBody>
                  <P className="text-sm">Someone will be with you shortly.</P>
                </CornerPanelBody>
              </CornerPanelContent>
            </CornerPanel>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <FloatingAction aria-label="Test tools" className={scopedLifted}>
                    <Wrench />
                  </FloatingAction>
                }
              />
              <DropdownMenuContent
                positionMethod="fixed"
                side="top"
                align="end"
                className="w-52"
              >
                <DropdownMenuItem>Accounts</DropdownMenuItem>
                <DropdownMenuItem>Inbox</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </ComponentPreview>
        <P className="text-sm text-muted-foreground">
          Both specimens on this page pass <Code>absolute</Code> in{" "}
          <Code>className</Code> to scope themselves to the dashed box. Three
          viewport-fixed launchers piled into one corner would show one component and lie
          about two.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>
          <Code>end-5</Code> rather than <Code>right-5</Code>
        </H3>
        <P>
          The corner follows the reading direction, so the launcher moves to the other
          side under <Code>DirectionProvider</Code> with no second rule. The menu follows
          it: <Code>align=&quot;end&quot;</Code> is a logical alignment too.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          It is icon-only, so it needs an accessible name and nothing here can guess it.
          Give it an <Code>aria-label</Code>. As a <Code>DropdownMenuTrigger</Code> it
          also picks up <Code>aria-haspopup=&quot;menu&quot;</Code>,{" "}
          <Code>aria-expanded</Code> and <Code>aria-controls</Code> from Base UI, so the
          name is the only part left to you.
        </P>
        <P>
          It renders <Code>type=&quot;button&quot;</Code>, so a launcher that happens to
          sit inside a form cannot submit it.
        </P>
        <P>
          One thing worth knowing about the menu it opens, because a hand-rolled copy
          usually gets it wrong: Safari does not focus a button when you tap it, so the
          press lands on a menu item while focus falls to the document body. A menu that
          closes on any focus-out unmounts the item before its click arrives, and the tap
          does nothing at all. Base UI closes on focus moving{" "}
          <em>somewhere else</em>, which a Tab does and a tap does not, so the press
          lands.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={floatingActionProps} />
      </Stack>
    </DocPage>
  )
}
