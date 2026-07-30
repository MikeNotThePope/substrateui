"use client"

import { BarChart3, LayoutDashboard, Package, Rocket, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DashboardTemplate } from "@/components/templates/dashboard-template"
import { PricingTemplate } from "@/components/templates/pricing-template"
import { DocPage } from "../_components/doc-page"
import { ComponentPreview } from "../_components/component-preview"

export default function TemplatesPage() {
  return (
    <DocPage
      title="Templates"
      description="Assembled pages built from blocks and shells. Pass data props for a ready-to-ship page, or drop in your own content. Every link routes through LinkProvider, so templates work with any router."
    >
      <Stack gap="md">
        <H3>Installation</H3>
        <P>
          Templates ship in their own entry so they tree-shake independently:
        </P>
        <ComponentPreview
          defaultOpen
          code={`import { DashboardTemplate, PricingTemplate } from "@mikenotthepope/substrateui/templates"`}
        >
          <P className="text-sm text-muted-foreground">
            Import from <Code>@mikenotthepope/substrateui/templates</Code>.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Dashboard</H3>
        <P>
          A full admin page: top bar over a collapsible sidebar and main region,
          prewired with a stats row and an activity feed.
        </P>
        <ComponentPreview
          code={`import { DashboardTemplate } from "@mikenotthepope/substrateui/templates"
import { LayoutDashboard, Users, Settings } from "lucide-react"

<DashboardTemplate
  brand="Acme Inc"
  actions={<Button variant="outline" size="sm">Feedback</Button>}
  navItems={[
    { label: "Overview", href: "/", icon: LayoutDashboard, active: true },
    { label: "Team", href: "/team", icon: Users },
    { label: "Settings", href: "/settings", icon: Settings },
  ]}
  stats={[
    { title: "Revenue", value: "$48.2k", change: "+12%", changeType: "positive" },
    { title: "Users", value: "2,340", change: "+3%", changeType: "positive" },
    { title: "Churn", value: "1.2%", change: "-0.4%", changeType: "negative" },
  ]}
  activity={[
    { icon: Rocket, time: "2h ago", title: "Deploy succeeded" },
    { icon: Package, time: "5h ago", title: "Published v1.3.0" },
  ]}
/>`}
        >
          <div className="w-full overflow-hidden rounded-md border-2 border-border [&_[data-slot=dashboard-template]]:!h-[540px]">
            <DashboardTemplate
              brand="Acme Inc"
              actions={
                <Button variant="outline" size="sm">
                  Feedback
                </Button>
              }
              navItems={[
                { label: "Overview", href: "#", icon: LayoutDashboard, active: true },
                { label: "Analytics", href: "#", icon: BarChart3 },
                { label: "Team", href: "#", icon: Users },
                { label: "Settings", href: "#", icon: Settings },
              ]}
              stats={[
                { title: "Revenue", value: "$48.2k", change: "+12%", changeType: "positive" },
                { title: "Active users", value: "2,340", change: "+3%", changeType: "positive" },
                { title: "Churn", value: "1.2%", change: "-0.4%", changeType: "negative" },
              ]}
              activity={[
                { icon: Rocket, time: "2h ago", title: "Deploy succeeded", description: "v1.3.0 is live." },
                { icon: Package, time: "5h ago", title: "Published to npm" },
              ]}
            />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Pricing page</H3>
        <P>
          A full marketing pricing page: hero, tiers, feature highlights, a
          closing CTA, and a footer — all from marketing blocks.
        </P>
        <ComponentPreview
          code={`import { PricingTemplate } from "@mikenotthepope/substrateui/templates"

<PricingTemplate
  title="Pricing that scales with you"
  tiers={tiers}
  cta={{ title: "Start building today", action: { label: "Get started", href: "/signup" } }}
  copyright="© 2026 Acme"
/>`}
        >
          <div className="max-h-[560px] w-full overflow-y-auto rounded-md border-2 border-border">
            <PricingTemplate
              title="Pricing that scales with you"
              tiers={[
                { name: "Hobby", price: "$0", period: "/mo", description: "For side projects.", features: ["1 project", "Community support"], cta: { label: "Start free", href: "#" } },
                { name: "Pro", price: "$29", period: "/mo", description: "For growing teams.", features: ["Unlimited projects", "Priority support", "Analytics"], cta: { label: "Upgrade", href: "#" }, featured: true },
                { name: "Enterprise", price: "Custom", description: "For large orgs.", features: ["SSO & SAML", "SLA", "Dedicated support"], cta: { label: "Contact sales", href: "#" } },
              ]}
              cta={{ title: "Start building today", description: "No credit card required.", action: { label: "Get started", href: "#" } }}
              brand={<div className="text-lg font-bold">◆ Substrate</div>}
              footerSections={[
                { title: "Product", links: [{ label: "Components", href: "#" }, { label: "Pricing", href: "#" }] },
                { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
              ]}
              copyright="© 2026 SubstrateUI. MIT licensed."
            />
          </div>
        </ComponentPreview>
      </Stack>
    </DocPage>
  )
}
