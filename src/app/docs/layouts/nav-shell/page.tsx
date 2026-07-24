import { Stack } from "@/components/ui/stack"
import { H3, Code, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

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
