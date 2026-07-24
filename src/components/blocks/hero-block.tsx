import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import { Cluster } from "@/components/ui/cluster"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"
import { H1, Lead } from "@/components/ui/typography"

/** A call-to-action button config for {@link HeroBlock}. */
export interface HeroAction {
  label: string
  href: string
}

/** Props for {@link HeroBlock}. */
export interface HeroBlockProps extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  /** Small label above the headline (e.g. "New in v2"). */
  eyebrow?: React.ReactNode
  /** The main headline. */
  title: React.ReactNode
  /** Supporting subheadline. */
  description?: React.ReactNode
  /** Primary call-to-action (solid button). Routes through {@link LinkProvider}. */
  primaryAction?: HeroAction
  /** Secondary call-to-action (outline button). Routes through {@link LinkProvider}. */
  secondaryAction?: HeroAction
  /** Optional media slot rendered below the actions (image, video, screenshot). */
  media?: React.ReactNode
}

/**
 * A centered marketing hero: eyebrow, headline, subheadline, a primary and
 * secondary CTA, and an optional media slot. The castle's front door — drop it
 * at the top of a landing page. CTAs route through {@link LinkProvider}.
 *
 * @example
 * <HeroBlock
 *   eyebrow="Now in beta"
 *   title="The design system that does everything"
 *   description="72 components, blocks, and tokens — batteries fully included."
 *   primaryAction={{ label: "Get started", href: "/docs" }}
 *   secondaryAction={{ label: "View on GitHub", href: "https://github.com/…" }}
 * />
 */
function HeroBlock({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
  className,
  ref,
  ...props
}: HeroBlockProps) {
  return (
    <section
      ref={ref}
      data-slot="hero-block"
      className={cn("py-16 px-4 md:py-24 md:px-8", className)}
      {...props}
    >
      <Center max="2xl">
        <Stack gap="lg" align="center" className="text-center">
          {eyebrow && (
            <span
              data-slot="hero-eyebrow"
              className="inline-flex items-center rounded-full border-2 border-primary-border bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              {eyebrow}
            </span>
          )}

          <H1 className="max-w-3xl text-balance">{title}</H1>

          {description && <Lead className="max-w-2xl text-balance">{description}</Lead>}

          {(primaryAction || secondaryAction) && (
            <Cluster gap="sm" justify="center" className="pt-2">
              {primaryAction && (
                <Button size="lg" render={<Link href={primaryAction.href} />}>
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button size="lg" variant="outline" render={<Link href={secondaryAction.href} />}>
                  {secondaryAction.label}
                </Button>
              )}
            </Cluster>
          )}

          {media && (
            <div data-slot="hero-media" className="w-full pt-6">
              {media}
            </div>
          )}
        </Stack>
      </Center>
    </section>
  )
}

export { HeroBlock }
