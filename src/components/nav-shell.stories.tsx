import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  NavShell,
  NavShellHeader,
  NavShellBrand,
  NavShellNav,
  NavShellNavItem,
  NavShellActions,
  NavShellMobileNav,
  NavShellMain,
} from "./nav-shell"
import { Button } from "./ui/button"
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
