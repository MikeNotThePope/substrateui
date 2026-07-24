"use client"

/*
 * This module intentionally renders a link component resolved from React
 * context (a router link supplied via LinkProvider, or the default anchor).
 * That is a stable reference, not a component created during render, so the
 * static-components heuristic is a false positive throughout this file.
 */
/* eslint-disable react-hooks/static-components */

import * as React from "react"

/**
 * The minimal shape any link component must satisfy to plug into SubstrateUI.
 * Router links (Next `next/link`, React Router `Link`, TanStack Router `Link`,
 * Remix `Link`) all accept at least an `href`/`to` plus anchor attributes, so
 * they slot in here without adapters. Extra props are passed through untyped.
 */
export interface LinkComponentProps {
  href: string
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

/** A component that renders a navigable link. Defaults to a plain `<a>`. */
export type LinkComponent = React.ComponentType<LinkComponentProps>

/** Fallback link: a framework-free anchor element. */
const DefaultLink: LinkComponent = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
)

const LinkContext = React.createContext<LinkComponent>(DefaultLink)

/** Props for {@link LinkProvider}. */
export interface LinkProviderProps {
  /**
   * The link component every SubstrateUI `Link` (and any block/organism that
   * renders navigation) should use. Pass your framework's link, e.g.
   * `import NextLink from "next/link"` or React Router's `Link`.
   */
  component: LinkComponent
  children?: React.ReactNode
}

/**
 * Makes SubstrateUI framework-agnostic for navigation. Wrap your app once and
 * every `Link` rendered by the suite — including blocks and organisms — routes
 * through your framework's client-side navigation instead of a full page load.
 *
 * Without a provider, links fall back to a plain `<a>`, so the suite works in
 * any React app out of the box.
 *
 * @example
 * // Next.js
 * import NextLink from "next/link"
 * import { LinkProvider } from "@mikenotthepope/substrateui"
 *
 * <LinkProvider component={NextLink}>{children}</LinkProvider>
 *
 * @example
 * // React Router / Remix — adapt the `to` prop
 * import { Link as RouterLink } from "react-router-dom"
 * const Adapter = ({ href, ...props }) => <RouterLink to={href} {...props} />
 *
 * <LinkProvider component={Adapter}>{children}</LinkProvider>
 */
function LinkProvider({ component, children }: LinkProviderProps) {
  return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
}

/**
 * Returns the link component supplied by the nearest {@link LinkProvider}, or a
 * plain `<a>` fallback. Use this inside custom components that need to render a
 * router-aware link without hard-coding a framework.
 */
function useLinkComponent(): LinkComponent {
  return React.useContext(LinkContext)
}

/** Props for {@link Link}. */
export interface LinkProps extends Omit<React.ComponentPropsWithRef<"a">, "href"> {
  href: string
}

/**
 * A router-aware link. Renders through the component supplied by the nearest
 * {@link LinkProvider}, falling back to a plain `<a>`. Drop-in replacement for
 * an anchor that stays framework-agnostic.
 *
 * @example
 * <Link href="/pricing" className="underline">Pricing</Link>
 */
function Link({ href, children, ...props }: LinkProps) {
  const LinkComponent = useLinkComponent()
  return (
    <LinkComponent href={href} {...props}>
      {children}
    </LinkComponent>
  )
}

export { Link, LinkProvider, useLinkComponent }
