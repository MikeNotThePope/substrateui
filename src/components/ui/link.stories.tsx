import type { Meta, StoryObj } from "@storybook/react-vite"

import { Link, LinkProvider, type LinkComponentProps } from "./link"

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  args: {
    href: "#",
    children: "Visit the docs",
    className: "text-primary underline underline-offset-4",
  },
  argTypes: {
    href: { control: "text" },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Link>

/** Default: no provider, so it renders a plain `<a>`. */
export const Default: Story = {}

/**
 * A tiny router stand-in supplied via LinkProvider. In a real app this is your
 * framework's link (`next/link`, React Router `Link`, etc.). Here it just tags
 * the anchor so you can see the provider took effect.
 */
function MockRouterLink({ href, children, ...props }: LinkComponentProps) {
  return (
    <a href={href} data-router="mock" {...props}>
      {children} →
    </a>
  )
}

export const WithProvider: Story = {
  decorators: [
    (Story) => (
      <LinkProvider component={MockRouterLink}>
        <Story />
      </LinkProvider>
    ),
  ],
}
