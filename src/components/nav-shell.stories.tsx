import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  NavShell,
  NavShellHeader,
  NavShellBrand,
  NavShellBrandStrip,
  NavShellNav,
  NavShellNavItem,
  NavShellActions,
  NavShellMobileNav,
  NavShellMain,
} from "./nav-shell"
import { Button } from "./ui/button"
import { SkipLink } from "./ui/skip-link"
import { Center } from "./ui/center"
import { Stack } from "./ui/stack"
import { H2, P } from "./ui/typography"

const meta: Meta<typeof NavShell> = {
  title: "Organisms/NavShell",
  component: NavShell,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof NavShell>

function Links() {
  return (
    <>
      <NavShellNavItem active href="#">
        Home
      </NavShellNavItem>
      <NavShellNavItem href="#">Features</NavShellNavItem>
      <NavShellNavItem href="#">Pricing</NavShellNavItem>
      <NavShellNavItem href="#">Docs</NavShellNavItem>
    </>
  )
}

export const Default: Story = {
  render: () => (
    <NavShell>
      <NavShellHeader>
        <NavShellBrand>Acme</NavShellBrand>
        <NavShellNav>
          <Links />
        </NavShellNav>
        <NavShellActions>
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
          <NavShellMobileNav>
            <Links />
          </NavShellMobileNav>
        </NavShellActions>
      </NavShellHeader>
      <NavShellMain>
        <Center max="2xl" className="py-16">
          <Stack gap="md">
            <H2>Welcome to Acme</H2>
            <P className="text-muted-foreground">
              A top-navigation layout. Resize below the md breakpoint to reveal
              the hamburger and mobile drawer.
            </P>
          </Stack>
        </Center>
      </NavShellMain>
    </NavShell>
  ),
}

export const Mobile: Story = {
  ...Default,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
}

/**
 * The other header: a full-bleed strip with the mark flush against the start
 * edge, the actions at the end, and no navigation in it at all. `NavShellNav`
 * and `NavShellMobileNav` throw inside it rather than put a `navigation`
 * landmark in a banner that has nothing to navigate to.
 *
 * Tab into the frame to reach the `SkipLink`, then press Enter: focus lands
 * on the `<main>`, which `NavShellMain` makes focusable for exactly that.
 */
export const BrandStrip: Story = {
  render: () => (
    <NavShell>
      <SkipLink />
      <NavShellBrandStrip>
        <NavShellBrand className="min-w-0">
          <span className="grid h-15 w-15 shrink-0 place-items-center bg-primary text-primary-foreground">
            A
          </span>
          <span className="truncate">Acme</span>
        </NavShellBrand>
        <NavShellActions>
          <Button variant="ghost" size="sm">
            Account
          </Button>
          <Button variant="ghost" size="sm">
            Sign out
          </Button>
        </NavShellActions>
      </NavShellBrandStrip>
      <NavShellMain>
        <Center max="2xl" className="py-16">
          <Stack gap="md">
            <H2>One destination, so no nav</H2>
            <P className="text-muted-foreground">
              A staff tool whose every deeper page opens with a back arrow has
              nowhere for a nav menu to go. The strip carries the mark and the
              controls, and the skip link still earns its keep because the
              controls repeat on every page.
            </P>
          </Stack>
        </Center>
      </NavShellMain>
    </NavShell>
  ),
}
