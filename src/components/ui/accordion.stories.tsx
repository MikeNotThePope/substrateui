import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const meta: Meta<typeof Accordion> = {
  title: "Data Display/Accordion",
  component: Accordion,
  render: (args) => (
    <Accordion {...args} className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It follows the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. Matches the substrate theme by default.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Uses CSS transitions for open/close.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: { type: "single", collapsible: true, defaultValue: "item-1" },
}

export const Multiple: Story = {
  args: { type: "multiple", defaultValue: ["item-1", "item-2"] },
}
