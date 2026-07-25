import type { Meta, StoryObj } from "@storybook/react-vite"
import { Rocket, GitCommit, Package } from "lucide-react"

import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineTime,
  TimelineTitle,
  TimelineBody,
} from "./timeline"

const meta: Meta<typeof Timeline> = {
  title: "Data Display/Timeline",
  component: Timeline,
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineDot />
        <TimelineTime>March 2026</TimelineTime>
        <TimelineTitle>Shipped v1.3</TimelineTitle>
        <TimelineBody>Blocks, the init CLI, and the theme generator landed.</TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineTime>February 2026</TimelineTime>
        <TimelineTitle>Migrated to Base UI</TimelineTitle>
        <TimelineBody>Swapped the primitive layer from Radix to Base UI 1.6.</TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot />
        <TimelineTime>January 2026</TimelineTime>
        <TimelineTitle>First release</TimelineTitle>
        <TimelineBody>72 components across the atomic scale.</TimelineBody>
      </TimelineItem>
    </Timeline>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineDot icon={Rocket} />
        <TimelineTitle>Deployed</TimelineTitle>
        <TimelineBody>Release went out to production.</TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot icon={Package} />
        <TimelineTitle>Published</TimelineTitle>
        <TimelineBody>Package pushed to npm.</TimelineBody>
      </TimelineItem>
      <TimelineItem>
        <TimelineDot icon={GitCommit} />
        <TimelineTitle>Merged</TimelineTitle>
        <TimelineBody>Feature branch merged to main.</TimelineBody>
      </TimelineItem>
    </Timeline>
  ),
}
