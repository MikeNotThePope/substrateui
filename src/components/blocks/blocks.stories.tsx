import type { Meta, StoryObj } from "@storybook/react-vite"
import { Boxes, DollarSign, GitCommit, Package, Palette, Rocket, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SignInBlock } from "./sign-in-block"
import { SignUpBlock } from "./sign-up-block"
import { StatsBlock } from "./stats-block"
import { HeroBlock } from "./hero-block"
import { FeatureGridBlock } from "./feature-grid-block"
import { PricingBlock } from "./pricing-block"
import { CtaBlock } from "./cta-block"
import { FooterBlock } from "./footer-block"
import { ProductGridBlock } from "./product-grid-block"
import { ActivityFeedBlock } from "./activity-feed-block"

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

export const Pricing: Story = {
  render: () => (
    <PricingBlock
      eyebrow="Pricing"
      title="Simple, transparent pricing"
      tiers={[
        {
          name: "Hobby",
          price: "$0",
          period: "/mo",
          description: "For side projects.",
          features: ["1 project", "Community support"],
          cta: { label: "Start free", href: "#" },
        },
        {
          name: "Pro",
          price: "$29",
          period: "/mo",
          description: "For growing teams.",
          features: ["Unlimited projects", "Priority support", "Advanced analytics"],
          cta: { label: "Upgrade", href: "#" },
          featured: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large orgs.",
          features: ["SSO & SAML", "SLA", "Dedicated support"],
          cta: { label: "Contact sales", href: "#" },
        },
      ]}
    />
  ),
}

export const Cta: Story = {
  render: () => (
    <CtaBlock
      title="Ready to build?"
      description="Ship your next app on SubstrateUI — batteries fully included."
      primaryAction={{ label: "Get started", href: "#" }}
      secondaryAction={{ label: "Read the docs", href: "#" }}
      inverted
    />
  ),
}

export const Footer: Story = {
  render: () => (
    <FooterBlock
      brand={<div className="text-lg font-bold">◆ Substrate</div>}
      tagline="The monolithic design system for React."
      sections={[
        { title: "Product", links: [{ label: "Components", href: "#" }, { label: "Blocks", href: "#" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Storybook", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
      ]}
      copyright="© 2026 SubstrateUI. MIT licensed."
    />
  ),
}

export const ProductGrid: Story = {
  render: () => (
    <div className="p-8">
      <ProductGridBlock
        products={[
          { name: "Chunky Tee", price: "$29", rating: 4.5, reviewCount: 128, href: "#", onAddToCart: () => {} },
          { name: "OKLCH Hoodie", price: "$59", rating: 5, reviewCount: 42, href: "#", onAddToCart: () => {} },
          { name: "Token Mug", price: "$14", rating: 4, reviewCount: 310, href: "#", onAddToCart: () => {} },
        ]}
      />
    </div>
  ),
}

export const ActivityFeed: Story = {
  render: () => (
    <div className="max-w-md p-8">
      <ActivityFeedBlock
        items={[
          { icon: Rocket, time: "2h ago", title: "Deploy succeeded", description: "v1.3.0 is live in production." },
          { icon: Package, time: "5h ago", title: "Published to npm", description: "@mikenotthepope/substrateui@1.3.0" },
          { icon: GitCommit, time: "yesterday", title: "Merged #38", description: "Version Packages." },
        ]}
      />
    </div>
  ),
}
