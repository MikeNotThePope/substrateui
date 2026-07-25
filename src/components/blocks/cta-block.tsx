import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Center } from "@/components/ui/center"
import { Cluster } from "@/components/ui/cluster"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"
import { H2, Lead } from "@/components/ui/typography"

/** A call-to-action button config for {@link CtaBlock}. */
export interface CtaAction {
  label: string
  href: string
}

/** Props for {@link CtaBlock}. */
export interface CtaBlockProps extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  primaryAction?: CtaAction
  secondaryAction?: CtaAction
  /** Fill the band with the primary color for a high-contrast closing CTA. */
  inverted?: boolean
}

/**
 * A closing call-to-action band — the "sign up now" section near the foot of a
 * marketing page. Optionally inverted to the primary color for emphasis. CTAs
 * route through {@link LinkProvider}.
 *
 * @example
 * <CtaBlock
 *   title="Ready to build?"
 *   description="Ship your next app on SubstrateUI."
 *   primaryAction={{ label: "Get started", href: "/docs" }}
 *   inverted
 * />
 */
function CtaBlock({
  title,
  description,
  primaryAction,
  secondaryAction,
  inverted,
  className,
  ref,
  ...props
}: CtaBlockProps) {
  return (
    <section
      ref={ref}
      data-slot="cta-block"
      data-inverted={inverted ? "" : undefined}
      className={cn(
        "px-4 py-14 md:px-8",
        inverted && "bg-primary text-primary-foreground",
        className
      )}
      {...props}
    >
      <Center max="lg">
        <Stack gap="lg" align="center" className="text-center">
          <H2 className="text-balance">{title}</H2>
          {description && (
            <Lead className={cn("max-w-2xl text-balance", inverted && "text-primary-foreground/90")}>
              {description}
            </Lead>
          )}
          {(primaryAction || secondaryAction) && (
            <Cluster gap="sm" justify="center">
              {primaryAction && (
                <Button
                  size="lg"
                  variant={inverted ? "secondary" : "default"}
                  render={<Link href={primaryAction.href} />}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(inverted && "border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground")}
                  render={<Link href={secondaryAction.href} />}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </Cluster>
          )}
        </Stack>
      </Center>
    </section>
  )
}

export { CtaBlock }
