import {
  NavShellActions,
  NavShellBrand,
  NavShellBrandStrip,
} from "@/components/nav-shell"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, Code, Muted, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Nav Shell",
  description: "A full-page top-navigation layout: a sticky header bar with brand, inline navigation, and actions above a scrollable content region — or, with NavShellBrandStrip, a full-bleed strip carrying a flush mark and no navigation at all.",
  route: "/docs/layouts/nav-shell",
})

const navShellProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the shell container.",
  },
]

const navItemProps: PropDef[] = [
  {
    name: "icon",
    type: "React.ComponentType<{ className?: string }>",
    default: undefined,
    description: "Optional icon component rendered before the label.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    description: "Whether this item represents the current page.",
  },
  {
    name: "href",
    type: "string",
    default: undefined,
    description: "The link destination for the navigation item.",
  },
]

const brandStripProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "Additional CSS classes on the <header> itself. There is no inner column, so this is the only box there is: pass ps-4 to give the mark a start inset, or h-14 to match NavShellHeader.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description:
      "Typically NavShellBrand and NavShellActions. NavShellNav and NavShellMobileNav throw here — the strip is a banner that holds no navigation, and that claim is enforced rather than documented.",
  },
]

const mainProps: PropDef[] = [
  {
    name: "id",
    type: "string",
    default: '"main-content"',
    description:
      "The fragment SkipLink jumps to. Matches SkipLink's own default, so the pair needs no wiring. Override both together for a page with a different target.",
  },
  {
    name: "tabIndex",
    type: "number",
    default: "-1",
    description:
      "Makes the skip-link target focusable without adding a tab stop. Without it the browser scrolls to the anchor and leaves focus in the header the reader just asked to bypass.",
  },
]

const mobileNavProps: PropDef[] = [
  {
    name: "title",
    type: "string",
    default: '"Navigation"',
    description: "Accessible title shown at the top of the mobile drawer.",
  },
  {
    name: "triggerLabel",
    type: "string",
    default: '"Open navigation menu"',
    description: "Accessible label for the hamburger trigger button.",
  },
]

export default function NavShellPage() {
  return (
    <DocPage
      title="Nav Shell"
      description="A full-page top-navigation layout: a sticky header bar with brand, inline navigation, and actions above a scrollable content region. On mobile the inline nav collapses into a hamburger-triggered drawer. Use for marketing sites and top-nav applications."
    >
      <Stack gap="md">
        <H3>Structure Diagram</H3>
        <ComponentPreview
          code={`import {
  NavShell,
  NavShellHeader,
  NavShellBrand,
  NavShellNav,
  NavShellNavItem,
  NavShellActions,
  NavShellMobileNav,
  NavShellMain,
} from "@/components/nav-shell"
import { Button } from "@/components/ui/button"

<NavShell>
  <NavShellHeader>
    <NavShellBrand>Acme</NavShellBrand>
    {/* Inline nav — hidden below md */}
    <NavShellNav>
      <NavShellNavItem active href="/">Home</NavShellNavItem>
      <NavShellNavItem href="/pricing">Pricing</NavShellNavItem>
      <NavShellNavItem href="/docs">Docs</NavShellNavItem>
    </NavShellNav>
    <NavShellActions>
      <Button size="sm">Sign in</Button>
      {/* Hamburger + drawer — visible only below md */}
      <NavShellMobileNav>
        <NavShellNavItem active href="/">Home</NavShellNavItem>
        <NavShellNavItem href="/pricing">Pricing</NavShellNavItem>
        <NavShellNavItem href="/docs">Docs</NavShellNavItem>
      </NavShellMobileNav>
    </NavShellActions>
  </NavShellHeader>
  <NavShellMain>
    {/* page content */}
  </NavShellMain>
</NavShell>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden text-xs">
            <div className="h-14 border-b-2 bg-card px-4 flex items-center justify-between gap-4">
              <Code>NavShellBrand</Code>
              <div className="hidden md:flex items-center gap-1">
                <div className="rounded bg-accent px-2 py-1">
                  <Muted>NavShellNavItem (active)</Muted>
                </div>
                <div className="rounded px-2 py-1">
                  <Muted>NavShellNavItem</Muted>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Muted>NavShellActions</Muted>
              </div>
            </div>
            <div className="h-48 p-4 flex items-center justify-center">
              <Muted>NavShellMain (scrollable)</Muted>
            </div>
          </div>
        </ComponentPreview>
        <Muted>
          The inline <Code>NavShellNav</Code> is hidden below the{" "}
          <Code>md</Code> breakpoint, where <Code>NavShellMobileNav</Code>{" "}
          renders a hamburger that opens a drawer with the same links. Resize
          the browser to see the switch.
        </Muted>
      </Stack>

      <Stack gap="md">
        <H3>A header with no nav</H3>
        <P>
          Some applications have one destination. A staff tool where every
          deeper page opens with a back arrow has nowhere for a nav menu to go,
          and a candidate-facing page has a company to name and nothing to
          browse. Both still want the same chrome: a mark, a few controls, a
          rule under them. That is <Code>NavShellBrandStrip</Code>, and it sits
          in the same slot as <Code>NavShellHeader</Code> inside the same{" "}
          <Code>NavShell</Code>.
        </P>
        <ComponentPreview
          title="NavShellBrandStrip"
          code={`import {
  NavShell,
  NavShellBrandStrip,
  NavShellBrand,
  NavShellActions,
  NavShellMain,
} from "@mikenotthepope/substrateui/organisms"
import { SkipLink } from "@mikenotthepope/substrateui"

<NavShell>
  {/* First focusable element in the document, ahead of the strip. */}
  <SkipLink />
  <NavShellBrandStrip>
    <NavShellBrand className="min-w-0">
      {/* Full-bleed: the strip pads its end and not its start. */}
      <span className="grid h-15 w-15 shrink-0 place-items-center bg-primary text-primary-foreground">
        A
      </span>
      <span className="truncate">Acme</span>
    </NavShellBrand>
    <NavShellActions>
      <Button variant="ghost" size="sm">Account</Button>
      <Button variant="ghost" size="sm">Sign out</Button>
    </NavShellActions>
  </NavShellBrandStrip>
  {/* Already id="main-content" tabIndex={-1}: the SkipLink target. */}
  <NavShellMain>{children}</NavShellMain>
</NavShell>`}
        >
          <div className="w-full overflow-hidden rounded-lg border-2">
            <NavShellBrandStrip>
              <NavShellBrand className="min-w-0">
                <span className="grid h-15 w-15 shrink-0 place-items-center bg-primary text-primary-foreground">
                  A
                </span>
                <span className="truncate">Acme</span>
              </NavShellBrand>
              <NavShellActions>
                {/* The preview box is narrower than any phone, so the first
                    action steps aside below sm. A real strip at 390px fits
                    both with the full pe-10 gutter intact. */}
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Account
                </Button>
                <Button variant="ghost" size="sm">
                  Sign out
                </Button>
              </NavShellActions>
            </NavShellBrandStrip>
            <div className="h-32 p-4">
              <Muted>NavShellMain</Muted>
            </div>
          </div>
        </ComponentPreview>
        <Muted>
          The specimen is the strip alone, not a whole shell: this page already
          has a <Code>&lt;main&gt;</Code>, and a document gets one. Switch the
          direction toggle to RTL and the mark moves to the other edge — the
          flush side is <Code>pe-10</Code> and no start padding, so it follows
          the reading direction rather than the screen.
        </Muted>
      </Stack>

      <Stack gap="md">
        <H3>What the strip is, and what it is not</H3>
        <P>
          <strong>It is a banner.</strong> A <Code>&lt;header&gt;</Code> holding
          the site mark and the site-wide controls, which is what{" "}
          <Code>banner</Code> means. HTML-AAM maps{" "}
          <Code>&lt;header&gt;</Code> to that role unless it sits inside an{" "}
          <Code>article</Code>, <Code>aside</Code>, <Code>main</Code>,{" "}
          <Code>nav</Code> or <Code>section</Code>; <Code>NavShell</Code> is a{" "}
          <Code>&lt;div&gt;</Code>, so the mapping holds here exactly as it does
          for <Code>NavShellHeader</Code>.
        </P>
        <P>
          <strong>It is not a navigation landmark.</strong> There is no{" "}
          <Code>&lt;nav&gt;</Code> and no <Code>aria-label=&quot;Primary&quot;</Code>,
          because a navigation landmark promises a list of destinations and this
          strip has a mark and a sign-out button. That is not left as advice:{" "}
          <Code>NavShellNav</Code> and <Code>NavShellMobileNav</Code> throw
          inside the strip, and the message names{" "}
          <Code>NavShellHeader</Code> as the part to use instead. A bare{" "}
          <Code>NavShellNavItem</Code> in the actions is fine — a link claims no
          landmark on its own.
        </P>
        <P>
          <strong>It is not a toolbar.</strong> The actions are an ordinary
          cluster, so each control keeps its own tab stop. A{" "}
          <Code>role=&quot;toolbar&quot;</Code> would collapse a theme toggle, a
          link and a sign-out form into one stop behind a roving{" "}
          <Code>tabIndex</Code>, which is a grouping none of them asked for.
        </P>
        <P>
          <strong>It does not retire the skip link.</strong> WCAG 2.4.1 Bypass
          Blocks is about blocks that repeat, and the actions repeat on every
          page. With no nav the block is shorter, not absent. Render{" "}
          <Code>SkipLink</Code> as the first child of <Code>NavShell</Code>;{" "}
          <Code>NavShellMain</Code> is already the target it looks for.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Why a part and not a prop</H3>
        <P>
          <Code>NavShellHeader</Code> renders two elements: the{" "}
          <Code>&lt;header&gt;</Code> that carries the sticky band, and an inner{" "}
          <Code>mx-auto max-w-6xl</Code> box so brand, nav and actions share one
          centred measure. The strip wants the opposite of that inner box —
          nothing reaches the viewport edge from inside a centred column — so it
          is one element rather than two.
        </P>
        <P>
          A <Code>variant</Code> or a <Code>noNav</Code> flag would therefore
          have to delete an element, and a prop that deletes an element is two
          components wearing one name. A separate organism was the other way
          out, and it would have meant a second copy of{" "}
          <Code>NavShellBrand</Code>, <Code>NavShellActions</Code> and{" "}
          <Code>NavShellMain</Code> for the sake of one box. The shell is a
          header over a main; the nav was only ever one part of the header, and
          now there are two header parts to choose between.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Where it differs from NavShellHeader</H3>
        <P>
          Four deliberate differences, and none of them is configurable — pass{" "}
          <Code>className</Code> if you want otherwise.{" "}
          <strong>It does not stick.</strong> A sticky bar earns its height by
          keeping destinations in reach, and this one has no destinations, so it
          scrolls away with the page. <strong>It is opaque</strong> (
          <Code>bg-background</Code>, not <Code>bg-card/90 backdrop-blur</Code>),
          because nothing slides under a bar that does not stay.{" "}
          <strong>It is four pixels taller</strong> — <Code>h-15</Code> against{" "}
          <Code>h-14</Code> — because its content sits directly against its own
          box with no padded column to give it room.{" "}
          <strong>It pads its end only</strong>, so the mark is flush and the
          actions clear the edge.
        </P>
        <P>
          Everything else is shared. <Code>NavShellBrand</Code>,{" "}
          <Code>NavShellActions</Code> and <Code>NavShellMain</Code> are the
          same parts inside either header, and swapping one header for the other
          changes no other line.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>NavShell Props</H3>
        <PropsTable props={navShellProps} />
        <Muted>
          The same <Code>className</Code> passthrough applies to{" "}
          <Code>NavShellHeader</Code>, <Code>NavShellBrand</Code>,{" "}
          <Code>NavShellNav</Code>, <Code>NavShellActions</Code>, and{" "}
          <Code>NavShellMain</Code>.
        </Muted>
      </Stack>

      <Stack gap="md">
        <H3>NavShellBrandStrip Props</H3>
        <PropsTable props={brandStripProps} />
      </Stack>

      <Stack gap="md">
        <H3>NavShellMain Props</H3>
        <PropsTable props={mainProps} />
        <Muted>
          Both are ordinary props with defaults, so a page with a different
          target says so: <Code>&lt;NavShellMain id=&quot;report&quot;&gt;</Code>{" "}
          with <Code>&lt;SkipLink href=&quot;#report&quot; /&gt;</Code>. The{" "}
          <Code>outline-none</Code> is deliberate — focus only ever arrives here
          programmatically, and a ring around the whole page tells a reader who
          just pressed the link nothing they do not know.
        </Muted>
      </Stack>

      <Stack gap="md">
        <H3>NavShellNavItem Props</H3>
        <PropsTable props={navItemProps} />
      </Stack>

      <Stack gap="md">
        <H3>NavShellMobileNav Props</H3>
        <PropsTable props={mobileNavProps} />
      </Stack>
    </DocPage>
  )
}
