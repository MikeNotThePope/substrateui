import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Center } from "@/components/ui/center"
import { Cluster } from "@/components/ui/cluster"
import { Grid } from "@/components/ui/grid"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"
import { H2, H3, Lead, P } from "@/components/ui/typography"

/** A single pricing tier rendered by {@link PricingBlock}. */
export interface PricingTier {
  /** Stable key; falls back to `name` when omitted. */
  id?: string
  name: React.ReactNode
  /** Headline price, e.g. "$29". */
  price: React.ReactNode
  /** Billing period suffix, e.g. "/mo". */
  period?: React.ReactNode
  description?: React.ReactNode
  features: React.ReactNode[]
  cta: { label: string; href: string }
  /** Visually promote this tier as the recommended option. */
  featured?: boolean
  /** Small ribbon label shown on the featured tier. @default "Popular" */
  badge?: string
}

/** Props for {@link PricingBlock}. */
export interface PricingBlockProps extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  tiers: PricingTier[]
  minCardWidth?: string
}

/**
 * A pricing section: an optional heading above a responsive row of tier cards,
 * each with a price, feature list, and CTA. The featured tier is promoted with
 * a primary border and ribbon. CTAs route through {@link LinkProvider}.
 *
 * @example
 * <PricingBlock
 *   title="Simple pricing"
 *   tiers={[
 *     { name: "Hobby", price: "$0", period: "/mo", features: ["1 project"], cta: { label: "Start", href: "/signup" } },
 *     { name: "Pro", price: "$29", period: "/mo", features: ["Unlimited"], cta: { label: "Upgrade", href: "/billing" }, featured: true },
 *   ]}
 * />
 */
function PricingBlock({
  eyebrow,
  title,
  description,
  tiers,
  minCardWidth = "280px",
  className,
  ref,
  ...props
}: PricingBlockProps) {
  return (
    <section
      ref={ref}
      data-slot="pricing-block"
      className={cn("py-12 px-4 md:py-16 md:px-8", className)}
      {...props}
    >
      <Center max="xl">
        <Stack gap="xl">
          {(eyebrow || title || description) && (
            <Stack gap="sm" align="center" className="text-center">
              {eyebrow && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {eyebrow}
                </span>
              )}
              {title && <H2>{title}</H2>}
              {description && <Lead className="max-w-2xl">{description}</Lead>}
            </Stack>
          )}

          <Grid columns="auto-fit" minChildWidth={minCardWidth} gap="lg" className="items-stretch">
            {tiers.map((tier) => (
              <Card
                key={tier.id ?? String(tier.name)}
                data-slot="pricing-tier"
                data-featured={tier.featured ? "" : undefined}
                className={cn(tier.featured && "border-primary-border shadow-hard md:-translate-y-2")}
              >
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <Cluster justify="between" align="center">
                    <H3 className="text-lg">{tier.name}</H3>
                    {tier.featured && <Badge>{tier.badge ?? "Popular"}</Badge>}
                  </Cluster>

                  <div>
                    <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                    {tier.period && (
                      <span className="text-sm text-muted-foreground">{tier.period}</span>
                    )}
                  </div>

                  {tier.description && (
                    <P className="text-sm text-muted-foreground">{tier.description}</P>
                  )}

                  <ul className="flex flex-1 flex-col gap-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-status-success-text" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={tier.featured ? "default" : "outline"}
                    render={<Link href={tier.cta.href} />}
                  >
                    {tier.cta.label}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Center>
    </section>
  )
}

export { PricingBlock }
