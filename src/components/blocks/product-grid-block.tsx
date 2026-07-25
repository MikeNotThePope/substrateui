"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Link } from "@/components/ui/link"
import { Rating } from "@/components/ui/rating"
import { Stack } from "@/components/ui/stack"

/** A single product rendered by {@link ProductGridBlock}. */
export interface Product {
  /** Stable key; falls back to `name` when omitted. */
  id?: string
  name: React.ReactNode
  price: React.ReactNode
  /** Image node (e.g. an <img> or next/image) shown in a 1:1 frame. */
  image?: React.ReactNode
  /** Aggregate rating (0..5), rendered read-only. */
  rating?: number
  /** Review count shown beside the rating. */
  reviewCount?: number
  /** Link to the product detail page. Routes through LinkProvider. */
  href?: string
  /** Add-to-cart handler; shows the button when provided. */
  onAddToCart?: () => void
}

/** Props for {@link ProductGridBlock}. */
export interface ProductGridBlockProps extends React.ComponentPropsWithRef<"section"> {
  products: Product[]
  minCardWidth?: string
  /** Label for the add-to-cart button. @default "Add to cart" */
  addToCartLabel?: string
}

/**
 * A responsive grid of product cards — image, title, star rating, price, and an
 * optional add-to-cart button. The storefront's product listing. Product links
 * route through {@link LinkProvider}.
 *
 * @example
 * <ProductGridBlock
 *   products={[
 *     { name: "Chunky Tee", price: "$29", rating: 4.5, reviewCount: 128, href: "/p/tee", onAddToCart: add },
 *   ]}
 * />
 */
function ProductGridBlock({
  products,
  minCardWidth = "240px",
  addToCartLabel = "Add to cart",
  className,
  ref,
  ...props
}: ProductGridBlockProps) {
  return (
    <section ref={ref} data-slot="product-grid-block" className={cn(className)} {...props}>
      <Grid columns="auto-fit" minChildWidth={minCardWidth} gap="lg" className="items-stretch">
        {products.map((product) => (
          <Card key={product.id ?? String(product.name)} data-slot="product-card">
            <CardContent className="flex h-full flex-col gap-3 p-4">
              <div className="overflow-hidden rounded-md border-2 border-border bg-muted">
                <AspectRatio ratio={1}>
                  {product.href ? (
                    <Link href={product.href} className="block size-full">
                      {product.image}
                    </Link>
                  ) : (
                    product.image
                  )}
                </AspectRatio>
              </div>

              <Stack gap="xs" className="flex-1">
                <h3 className="font-semibold leading-snug">
                  {product.href ? (
                    <Link href={product.href} className="hover:text-primary hover:underline underline-offset-4">
                      {product.name}
                    </Link>
                  ) : (
                    product.name
                  )}
                </h3>
                {typeof product.rating === "number" && (
                  <div className="flex items-center gap-2">
                    <Rating value={product.rating} size="sm" readOnly />
                    {typeof product.reviewCount === "number" && (
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    )}
                  </div>
                )}
              </Stack>

              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold tracking-tight">{product.price}</span>
                {product.onAddToCart && (
                  <Button size="sm" onClick={product.onAddToCart}>
                    {addToCartLabel}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </section>
  )
}

export { ProductGridBlock }
