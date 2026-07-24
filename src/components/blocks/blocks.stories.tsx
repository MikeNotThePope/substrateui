import type { Meta, StoryObj } from "@storybook/react-vite"
import { Boxes, DollarSign, Palette, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SignInBlock } from "./sign-in-block"
import { SignUpBlock } from "./sign-up-block"
import { StatsBlock } from "./stats-block"
import { HeroBlock } from "./hero-block"
import { FeatureGridBlock } from "./feature-grid-block"

const meta: Meta = {
  title: "Blocks/Overview",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const SignIn: Story = {
  render: () => (
    <SignInBlock
      brand={<div className="text-lg font-bold">◆ Substrate</div>}
      forgotPasswordHref="#"
      signUpHref="#"
      socialButtons={
        <Button variant="outline" className="w-full">
          Continue with GitHub
        </Button>
      }
    />
  ),
}

export const SignUp: Story = {
  render: () => (
    <SignUpBlock brand={<div className="text-lg font-bold">◆ Substrate</div>} signInHref="#" termsHref="#" />
  ),
}

export const Stats: Story = {
  render: () => (
    <div className="p-8">
      <StatsBlock
        stats={[
          { title: "Revenue", value: "$48.2k", change: "+12%", changeType: "positive", icon: DollarSign },
          { title: "Active users", value: "2,340", change: "+3%", changeType: "positive", icon: Users },
          { title: "Churn", value: "1.2%", change: "-0.4%", changeType: "negative", icon: Zap },
        ]}
      />
    </div>
  ),
}

export const Hero: Story = {
  render: () => (
    <HeroBlock
      eyebrow="Now in beta"
      title="The design system that does everything"
      description="72 components, ready-made blocks, and an OKLCH token engine — batteries fully included."
      primaryAction={{ label: "Get started", href: "#" }}
      secondaryAction={{ label: "View on GitHub", href: "#" }}
    />
  ),
}

export const FeatureGrid: Story = {
  render: () => (
    <FeatureGridBlock
      eyebrow="What's inside"
      title="Everything in the box"
      description="No add-ons, no plugins to hunt down. The castle and everything under it."
      features={[
        { icon: Boxes, title: "72 components", description: "Atoms to organisms, all accessible by default." },
        { icon: Palette, title: "OKLCH tokens", description: "Dark mode is a single token swap." },
        { icon: Zap, title: "Framework-agnostic", description: "Bring any router via LinkProvider." },
      ]}
    />
  ),
}
