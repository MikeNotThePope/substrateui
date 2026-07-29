"use client"

import { Boxes, DollarSign, GitCommit, Package, Palette, Rocket, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Divider } from "@/components/ui/divider"
import { Stack } from "@/components/ui/stack"
import { H2, H3, P, Code } from "@/components/ui/typography"
import { SignInBlock } from "@/components/blocks/sign-in-block"
import { SignUpBlock } from "@/components/blocks/sign-up-block"
import { StatsBlock } from "@/components/blocks/stats-block"
import { HeroBlock } from "@/components/blocks/hero-block"
import { FeatureGridBlock } from "@/components/blocks/feature-grid-block"
import { PricingBlock } from "@/components/blocks/pricing-block"
import { CtaBlock } from "@/components/blocks/cta-block"
import { FooterBlock } from "@/components/blocks/footer-block"
import { ProductGridBlock } from "@/components/blocks/product-grid-block"
import { ActivityFeedBlock } from "@/components/blocks/activity-feed-block"
import { DocPage } from "../_components/doc-page"
import { ComponentPreview } from "../_components/component-preview"

// Neutralizes the full-viewport height of auth blocks so they fit inside a
// docs preview frame without dominating the page.
const authPreviewShrink =
  "w-full [&_[data-slot=auth-shell]]:min-h-0 [&_[data-slot=auth-shell]]:py-0"

export default function BlocksPage() {
  return (
    <DocPage
      title="Blocks"
      description="Assembled compositions you paste in and wire up — sign-in and sign-up pages, dashboard stat rows, marketing heroes, and feature grids. Blocks are built from the same primitives you already have, and every link routes through LinkProvider so they work with any router."
    >
      <Stack gap="md">
        <H3>Installation</H3>
        <P>
          Blocks ship in their own entry point so they tree-shake independently
          of the primitives:
        </P>
        <ComponentPreview
          code={`import { SignInBlock, HeroBlock, StatsBlock } from "@mikenotthepope/substrateui/blocks"

// Make links router-aware once, at the root:
import NextLink from "next/link"
import { LinkProvider } from "@mikenotthepope/substrateui"

<LinkProvider component={NextLink}>{children}</LinkProvider>`}
        >
          <P className="text-sm text-muted-foreground">
            Import blocks from <Code>@mikenotthepope/substrateui/blocks</Code>.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Sign In</H3>
        <ComponentPreview
          code={`import { SignInBlock } from "@mikenotthepope/substrateui/blocks"
import { Button } from "@mikenotthepope/substrateui"

<SignInBlock
  brand={<Logo />}
  onSubmit={handleSignIn}
  forgotPasswordHref="/forgot"
  signUpHref="/sign-up"
  socialButtons={
    <Button variant="outline" className="w-full">Continue with GitHub</Button>
  }
/>`}
        >
          <div className={authPreviewShrink}>
            <SignInBlock
              brand={<div className="text-lg font-bold">◆ Substrate</div>}
              socialButtons={
                <Button variant="outline" className="w-full">
                  Continue with GitHub
                </Button>
              }
            />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Sign Up</H3>
        <ComponentPreview
          code={`import { SignUpBlock } from "@mikenotthepope/substrateui/blocks"

<SignUpBlock
  brand={<Logo />}
  onSubmit={handleSignUp}
  signInHref="/sign-in"
  termsHref="/terms"
/>`}
        >
          <div className={authPreviewShrink}>
            <SignUpBlock brand={<div className="text-lg font-bold">◆ Substrate</div>} />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Stats</H3>
        <ComponentPreview
          code={`import { StatsBlock } from "@mikenotthepope/substrateui/blocks"
import { DollarSign, Users, Zap } from "lucide-react"

<StatsBlock
  stats={[
    { title: "Revenue", value: "$48.2k", change: "+12%", changeType: "positive", icon: DollarSign },
    { title: "Active users", value: "2,340", change: "+3%", changeType: "positive", icon: Users },
    { title: "Churn", value: "1.2%", change: "-0.4%", changeType: "negative", icon: Zap },
  ]}
/>`}
        >
          <StatsBlock
            className="w-full"
            stats={[
              { title: "Revenue", value: "$48.2k", change: "+12%", changeType: "positive", icon: DollarSign },
              { title: "Active users", value: "2,340", change: "+3%", changeType: "positive", icon: Users },
              { title: "Churn", value: "1.2%", change: "-0.4%", changeType: "negative", icon: Zap },
            ]}
          />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Hero</H3>
        <ComponentPreview
          code={`import { HeroBlock } from "@mikenotthepope/substrateui/blocks"

<HeroBlock
  eyebrow="Now in beta"
  title="The design system that does everything"
  description="72 components, ready-made blocks, and an OKLCH token engine."
  primaryAction={{ label: "Get started", href: "/docs" }}
  secondaryAction={{ label: "View on GitHub", href: "https://github.com/…" }}
/>`}
        >
          <HeroBlock
            className="w-full py-8 px-0 md:py-10 md:px-0"
            eyebrow="Now in beta"
            title="The design system that does everything"
            description="72 components, ready-made blocks, and an OKLCH token engine."
            primaryAction={{ label: "Get started", href: "#" }}
            secondaryAction={{ label: "View on GitHub", href: "#" }}
          />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Feature Grid</H3>
        <ComponentPreview
          code={`import { FeatureGridBlock } from "@mikenotthepope/substrateui/blocks"
import { Boxes, Palette, Zap } from "lucide-react"

<FeatureGridBlock
  eyebrow="What's inside"
  title="Everything in the box"
  features={[
    { icon: Boxes, title: "72 components", description: "Atoms to organisms." },
    { icon: Palette, title: "OKLCH tokens", description: "Dark mode is a token swap." },
    { icon: Zap, title: "Framework-agnostic", description: "Bring any router." },
  ]}
/>`}
        >
          <FeatureGridBlock
            className="w-full py-8 px-0 md:py-10 md:px-0"
            eyebrow="What's inside"
            title="Everything in the box"
            features={[
              { icon: Boxes, title: "72 components", description: "Atoms to organisms, accessible by default." },
              { icon: Palette, title: "OKLCH tokens", description: "Dark mode is a single token swap." },
              { icon: Zap, title: "Framework-agnostic", description: "Bring any router via LinkProvider." },
            ]}
          />
        </ComponentPreview>
      </Stack>

      <Divider />

      <Stack gap="md">
        <H2>Marketing · Pricing</H2>
        <ComponentPreview
          code={`import { PricingBlock } from "@mikenotthepope/substrateui/blocks"

<PricingBlock
  title="Simple, transparent pricing"
  tiers={[
    { name: "Hobby", price: "$0", period: "/mo", features: ["1 project"], cta: { label: "Start free", href: "/signup" } },
    { name: "Pro", price: "$29", period: "/mo", features: ["Unlimited", "Priority support"], cta: { label: "Upgrade", href: "/billing" }, featured: true },
    { name: "Enterprise", price: "Custom", features: ["SSO", "SLA"], cta: { label: "Contact sales", href: "/contact" } },
  ]}
/>`}
        >
          <PricingBlock
            className="w-full py-6 px-0 md:py-6 md:px-0"
            title="Simple, transparent pricing"
            tiers={[
              { name: "Hobby", price: "$0", period: "/mo", description: "For side projects.", features: ["1 project", "Community support"], cta: { label: "Start free", href: "#" } },
              { name: "Pro", price: "$29", period: "/mo", description: "For growing teams.", features: ["Unlimited projects", "Priority support", "Advanced analytics"], cta: { label: "Upgrade", href: "#" }, featured: true },
              { name: "Enterprise", price: "Custom", description: "For large orgs.", features: ["SSO & SAML", "SLA", "Dedicated support"], cta: { label: "Contact sales", href: "#" } },
            ]}
          />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H2>Marketing · Call to action</H2>
        <ComponentPreview
          code={`import { CtaBlock } from "@mikenotthepope/substrateui/blocks"

<CtaBlock
  title="Ready to build?"
  description="Ship your next app on SubstrateUI."
  primaryAction={{ label: "Get started", href: "/docs" }}
  secondaryAction={{ label: "Read the docs", href: "/docs" }}
  inverted
/>`}
        >
          <div className="w-full overflow-hidden rounded-md">
            <CtaBlock
              title="Ready to build?"
              description="Ship your next app on SubstrateUI."
              primaryAction={{ label: "Get started", href: "#" }}
              secondaryAction={{ label: "Read the docs", href: "#" }}
              inverted
            />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H2>Marketing · Footer</H2>
        <ComponentPreview
          code={`import { FooterBlock } from "@mikenotthepope/substrateui/blocks"

<FooterBlock
  brand={<Logo />}
  tagline="The monolithic design system for React."
  sections={[
    { title: "Product", links: [{ label: "Components", href: "/docs/components" }] },
    { title: "Resources", links: [{ label: "Docs", href: "/docs" }] },
  ]}
  copyright="© 2026 SubstrateUI"
/>`}
        >
          <div className="w-full overflow-hidden rounded-md border-2 border-border">
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
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H2>Application · Activity feed</H2>
        <P className="text-sm text-muted-foreground">Built on the new <Code>Timeline</Code> component.</P>
        <ComponentPreview
          code={`import { ActivityFeedBlock } from "@mikenotthepope/substrateui/blocks"
import { Rocket, Package, GitCommit } from "lucide-react"

<ActivityFeedBlock
  items={[
    { icon: Rocket, time: "2h ago", title: "Deploy succeeded", description: "v1.3.0 is live." },
    { icon: Package, time: "5h ago", title: "Published to npm" },
  ]}
/>`}
        >
          <div className="w-full max-w-md">
            <ActivityFeedBlock
              items={[
                { icon: Rocket, time: "2h ago", title: "Deploy succeeded", description: "v1.3.0 is live in production." },
                { icon: Package, time: "5h ago", title: "Published to npm", description: "@mikenotthepope/substrateui@1.3.0" },
                { icon: GitCommit, time: "yesterday", title: "Merged #38", description: "Version Packages." },
              ]}
            />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H2>E-commerce · Product grid</H2>
        <P className="text-sm text-muted-foreground">Uses the new <Code>Rating</Code> component for review scores.</P>
        <ComponentPreview
          code={`import { ProductGridBlock } from "@mikenotthepope/substrateui/blocks"

<ProductGridBlock
  products={[
    { name: "Chunky Tee", price: "$29", rating: 4.5, reviewCount: 128, href: "/p/tee", onAddToCart: add },
  ]}
/>`}
        >
          <ProductGridBlock
            className="w-full"
            products={[
              { name: "Chunky Tee", price: "$29", rating: 4.5, reviewCount: 128, href: "#", onAddToCart: () => {} },
              { name: "OKLCH Hoodie", price: "$59", rating: 5, reviewCount: 42, href: "#", onAddToCart: () => {} },
              { name: "Token Mug", price: "$14", rating: 4, reviewCount: 310, href: "#", onAddToCart: () => {} },
            ]}
          />
        </ComponentPreview>
      </Stack>
    </DocPage>
  )
}
