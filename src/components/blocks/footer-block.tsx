import * as React from "react"

import { cn } from "@/lib/utils"
import { Overline } from "@/components/ui/overline"
import { Center } from "@/components/ui/center"
import { Divider } from "@/components/ui/divider"
import { Grid } from "@/components/ui/grid"
import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"

/** A labelled column of links in a {@link FooterBlock}. */
export interface FooterSection {
  /** Stable key; falls back to `title` when omitted. */
  id?: string
  title: React.ReactNode
  links: { label: React.ReactNode; href: string }[]
}

/** Props for {@link FooterBlock}. */
export interface FooterBlockProps extends React.ComponentPropsWithRef<"footer"> {
  /** Brand/logo node shown above the tagline. */
  brand?: React.ReactNode
  /** Short blurb under the brand. */
  tagline?: React.ReactNode
  /** Columns of navigation links. */
  sections?: FooterSection[]
  /** Bottom-row copyright/legal line. */
  copyright?: React.ReactNode
}

/**
 * A site footer: a brand column beside stacked link columns, a divider, and a
 * copyright line. All links route through {@link LinkProvider}.
 *
 * @example
 * <FooterBlock
 *   brand={<Logo />}
 *   tagline="The monolithic design system."
 *   sections={[{ title: "Product", links: [{ label: "Docs", href: "/docs" }] }]}
 *   copyright="© 2026 SubstrateUI"
 * />
 */
function FooterBlock({
  brand,
  tagline,
  sections = [],
  copyright,
  className,
  ref,
  ...props
}: FooterBlockProps) {
  return (
    <footer
      ref={ref}
      data-slot="footer-block"
      className={cn("border-t-2 border-border bg-surface-raised px-4 py-12 md:px-8", className)}
      {...props}
    >
      <Center max="xl">
        <Stack gap="lg">
          <div className="grid gap-8 md:grid-cols-[1.5fr_2fr]">
            {(brand || tagline) && (
              <Stack gap="sm">
                {brand && <div data-slot="footer-brand">{brand}</div>}
                {tagline && <p className="max-w-xs text-sm text-muted-foreground">{tagline}</p>}
              </Stack>
            )}

            {sections.length > 0 && (
              <Grid columns="auto-fit" minChildWidth="140px" gap="lg">
                {sections.map((section) => (
                  <Stack key={section.id ?? String(section.title)} gap="sm">
                    <Overline className="font-semibold" render={<h3 />}>
                      {section.title}
                    </Overline>
                    <ul className="flex flex-col gap-2">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className="text-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Stack>
                ))}
              </Grid>
            )}
          </div>

          {copyright && (
            <>
              <Divider />
              <p className="text-sm text-muted-foreground">{copyright}</p>
            </>
          )}
        </Stack>
      </Center>
    </footer>
  )
}

export { FooterBlock }
