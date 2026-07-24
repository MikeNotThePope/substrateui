"use client"

import { Boxes, DollarSign, Palette, Users, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { SignInBlock } from "@/components/blocks/sign-in-block"
import { SignUpBlock } from "@/components/blocks/sign-up-block"
import { StatsBlock } from "@/components/blocks/stats-block"
import { HeroBlock } from "@/components/blocks/hero-block"
import { FeatureGridBlock } from "@/components/blocks/feature-grid-block"
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
      description="Full, opinionated compositions you paste in and wire up — sign-in and sign-up pages, dashboard stat rows, marketing heroes, and feature grids. Blocks are built from the same primitives you already have, and every link routes through LinkProvider so they work with any router."
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
            description="72 components, ready-made blocks, and an OKLCH token engine — batteries fully included."
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
    </DocPage>
  )
}
