import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Center } from "@/components/ui/center"
import { Grid } from "@/components/ui/grid"
import { Stack } from "@/components/ui/stack"
import { H2, H4, P, Lead } from "@/components/ui/typography"

/** A single feature rendered by {@link FeatureGridBlock}. */
export interface FeatureItem {
  /** Stable key; falls back to `title` when omitted. */
  id?: string
  /** Icon component (e.g. a lucide-react icon). Rendered in a tinted badge. */
  icon?: React.ComponentType<{ className?: string }>
  title: React.ReactNode
  description: React.ReactNode
}

/** Props for {@link FeatureGridBlock}. */
export interface FeatureGridBlockProps extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  /** Optional small label above the section heading. */
  eyebrow?: React.ReactNode
  /** Optional section heading. */
  title?: React.ReactNode
  /** Optional supporting text below the heading. */
  description?: React.ReactNode
  /** The features to display. */
  features: FeatureItem[]
  /** Minimum width per card before wrapping. @default "260px" */
  minCardWidth?: string
}

/**
 * A marketing feature section: an optional heading block above a responsive grid
 * of feature cards, each with an icon, title, and description. Pairs with
 * {@link HeroBlock} to build a landing page.
 *
 * @example
 * <FeatureGridBlock
 *   title="Everything in the box"
 *   features={[
 *     { icon: Boxes, title: "72 components", description: "Atoms to organisms." },
 *     { icon: Palette, title: "OKLCH tokens", description: "Dark mode as a token swap." },
 *   ]}
 * />
 */
function FeatureGridBlock({
  eyebrow,
  title,
  description,
  features,
  minCardWidth = "260px",
  className,
  ref,
  ...props
}: FeatureGridBlockProps) {
  return (
    <section
      ref={ref}
      data-slot="feature-grid-block"
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

          <Grid columns="auto-fit" minChildWidth={minCardWidth} gap="lg">
            {features.map(({ id, icon: Icon, title: featureTitle, description: featureDescription }) => (
              <Card key={id ?? String(featureTitle)} data-slot="feature-card">
                <CardContent className="p-6">
                  <Stack gap="sm">
                    {Icon && (
                      <span className="inline-flex size-10 items-center justify-center rounded-md border-2 border-primary-border bg-primary/10 text-primary [&_svg]:size-5">
                        <Icon />
                      </span>
                    )}
                    <H4>{featureTitle}</H4>
                    <P className="text-sm text-muted-foreground">{featureDescription}</P>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Center>
    </section>
  )
}

export { FeatureGridBlock }
