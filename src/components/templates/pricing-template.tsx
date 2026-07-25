import * as React from "react"

import { HeroBlock } from "@/components/blocks/hero-block"
import { PricingBlock, type PricingTier } from "@/components/blocks/pricing-block"
import { FeatureGridBlock, type FeatureItem } from "@/components/blocks/feature-grid-block"
import { CtaBlock } from "@/components/blocks/cta-block"
import { FooterBlock, type FooterSection } from "@/components/blocks/footer-block"

/** A call-to-action config. */
export interface TemplateAction {
  label: string
  href: string
}

/** Props for {@link PricingTemplate}. */
export interface PricingTemplateProps {
  /** Top-of-page hero. */
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  /** The pricing tiers (required — the heart of the page). */
  tiers: PricingTier[]
  /** Optional feature highlights below the pricing grid. */
  features?: FeatureItem[]
  /** Closing call-to-action band. Omit to hide. */
  cta?: { title: React.ReactNode; description?: React.ReactNode; action?: TemplateAction }
  /** Brand shown in the footer. */
  brand?: React.ReactNode
  /** Footer link columns. */
  footerSections?: FooterSection[]
  /** Footer copyright line. */
  copyright?: React.ReactNode
}

/**
 * A complete marketing pricing page: hero, pricing tiers, optional feature
 * highlights, a closing CTA, and a footer — assembled from marketing blocks.
 * Pass your tiers (and optionally the rest) for a ready-to-ship page. All links
 * route through {@link LinkProvider}.
 *
 * @example
 * <PricingTemplate
 *   title="Pricing that scales with you"
 *   tiers={tiers}
 *   cta={{ title: "Start building today", action: { label: "Get started", href: "/signup" } }}
 *   copyright="© 2026 Acme"
 * />
 */
function PricingTemplate({
  eyebrow = "Pricing",
  title = "Pricing that scales with you",
  description = "Start free. Upgrade when you're ready. No surprises.",
  tiers,
  features,
  cta,
  brand,
  footerSections = [],
  copyright,
}: PricingTemplateProps) {
  return (
    <div data-slot="pricing-template">
      <HeroBlock
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="py-12 md:py-16"
      />

      <PricingBlock tiers={tiers} className="pt-0" />

      {features && features.length > 0 && (
        <FeatureGridBlock
          eyebrow="Every plan includes"
          features={features}
          className="bg-surface-raised"
        />
      )}

      {cta && (
        <CtaBlock
          title={cta.title}
          description={cta.description}
          primaryAction={cta.action}
          inverted
        />
      )}

      {(brand || footerSections.length > 0 || copyright) && (
        <FooterBlock brand={brand} sections={footerSections} copyright={copyright} />
      )}
    </div>
  )
}

export { PricingTemplate }
