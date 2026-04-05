import type { Meta, StoryObj } from "@storybook/react-vite"

import { Code, H1, H2, H3, H4, Large, Lead, Mono, Muted, P, Small } from "./typography"

const meta: Meta<typeof H1> = {
  title: "Data Display/Typography",
  component: H1,
}

export default meta
type Story = StoryObj<typeof H1>

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <P>This is a paragraph with base text.</P>
      <Lead>A lead paragraph for introductory text.</Lead>
      <Large>Large text block</Large>
      <Small>Small text element</Small>
      <Muted>Muted helper text</Muted>
      <P>
        Inline <Code>code</Code> and <Mono>mono</Mono> samples.
      </P>
    </div>
  ),
}
