import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'

import {
  NavShell,
  NavShellActions,
  NavShellBrand,
  NavShellBrandStrip,
  NavShellHeader,
  NavShellMain,
  NavShellMobileNav,
  NavShellNav,
  NavShellNavItem,
} from '@/components/nav-shell'
import { Button } from '@/components/ui/button'
import { SkipLink } from '@/components/ui/skip-link'

/** Classes as a set, so a `toContain` on `h-15` never reads `min-h-15`. */
const classes = (el: HTMLElement) => el.className.split(/\s+/)

/** The shape both lavahire shells hand-wrote: a strip, and a main below it. */
function Strip() {
  return (
    <NavShell>
      <SkipLink />
      <NavShellBrandStrip>
        <NavShellBrand>Acme</NavShellBrand>
        <NavShellActions>
          <Button size="sm">Sign out</Button>
        </NavShellActions>
      </NavShellBrandStrip>
      <NavShellMain>
        <p>Page body</p>
      </NavShellMain>
    </NavShell>
  )
}

describe('NavShellBrandStrip', () => {
  it('is a banner, which is what a strip of site-wide controls is', () => {
    render(<Strip />)
    const banner = screen.getByRole('banner')
    expect(banner.tagName).toBe('HEADER')
    expect(banner).toHaveAttribute('data-slot', 'nav-shell-brand-strip')
  })

  it('claims no navigation, because it holds none', () => {
    // The whole of the item: a header with no nav. A `navigation` landmark
    // here would promise a list of destinations and deliver a sign-out button.
    render(<Strip />)
    expect(screen.queryAllByRole('navigation')).toHaveLength(0)
  })

  it('is not a toolbar either: every control is its own tab stop', () => {
    render(<Strip />)
    expect(screen.queryAllByRole('toolbar')).toHaveLength(0)
  })

  it('holds the brand as a direct child, with no centred column in between', () => {
    // NavShellHeader nests a `mx-auto max-w-6xl` box inside the header. The
    // strip does not: the mark has to reach the viewport edge, and it cannot
    // do that from inside a column.
    render(<Strip />)
    const banner = screen.getByRole('banner')
    const brand = screen.getByText('Acme')
    expect(brand.parentElement).toBe(banner)
    expect(banner.innerHTML).not.toContain('max-w-6xl')
  })

  it('pads its end and not its start, so the mark sits flush', () => {
    render(<Strip />)
    const cls = classes(screen.getByRole('banner'))
    expect(cls).toContain('pe-10')
    expect(cls.some((c) => /^p[sxl]-/.test(c))).toBe(false)
  })

  it('uses logical padding, so the flush edge follows the reading direction', () => {
    // audit:direction bans physical utilities; lavahire's copy says `pr-10`,
    // which is the start edge in RTL and would put the mark in the wrong place.
    render(<Strip />)
    const cls = screen.getByRole('banner').className
    expect(cls).not.toMatch(/\bp[rl]-\d/)
  })

  it('scrolls away with the page rather than sticking to the top', () => {
    // A sticky bar earns its height by keeping destinations in reach. This one
    // has no destinations.
    render(<Strip />)
    const cls = classes(screen.getByRole('banner'))
    expect(cls).not.toContain('sticky')
    expect(cls).toContain('shrink-0')
  })

  it('is the strip both shells drew: h-15, a 2px rule under it, opaque', () => {
    render(<Strip />)
    const cls = classes(screen.getByRole('banner'))
    expect(cls).toContain('h-15')
    expect(cls).toContain('border-b-2')
    expect(cls).toContain('bg-background')
  })

  it('merges a caller className instead of dropping it', () => {
    render(
      <NavShellBrandStrip className="custom-class">
        <NavShellBrand>Acme</NavShellBrand>
      </NavShellBrandStrip>,
    )
    expect(classes(screen.getByRole('banner'))).toContain('custom-class')
  })
})

describe('NavShellBrandStrip refuses the landmark it does not have', () => {
  it('will not render a NavShellNav inside itself', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <NavShellBrandStrip>
          <NavShellBrand>Acme</NavShellBrand>
          <NavShellNav>
            <NavShellNavItem href="/">Home</NavShellNavItem>
          </NavShellNav>
        </NavShellBrandStrip>,
      ),
    ).toThrow(/NavShellHeader/)
    error.mockRestore()
  })

  it('will not render a NavShellMobileNav inside itself either', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <NavShellBrandStrip>
          <NavShellBrand>Acme</NavShellBrand>
          <NavShellActions>
            <NavShellMobileNav>
              <NavShellNavItem href="/">Home</NavShellNavItem>
            </NavShellMobileNav>
          </NavShellActions>
        </NavShellBrandStrip>,
      ),
    ).toThrow(/NavShellHeader/)
    error.mockRestore()
  })

  it('allows a bare NavShellNavItem, which claims no landmark on its own', () => {
    render(
      <NavShellBrandStrip>
        <NavShellActions>
          <NavShellNavItem href="/help">Help</NavShellNavItem>
        </NavShellActions>
      </NavShellBrandStrip>,
    )
    expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument()
    expect(screen.queryAllByRole('navigation')).toHaveLength(0)
  })
})

describe('NavShellMain is the SkipLink target', () => {
  it('carries the id SkipLink looks for by default', () => {
    render(<Strip />)
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      `#${main.id}`,
    )
  })

  it('can actually take focus, which is the whole point of the skip link', () => {
    // Not an assertion about `tabIndex` — an assertion about what `tabIndex`
    // is for. A <main> without it is not focusable, and focus stays on body.
    render(<Strip />)
    const main = screen.getByRole('main')
    main.focus()
    expect(main).toHaveFocus()
  })

  it('takes no tab stop of its own, so Tab past the link lands in the content', async () => {
    const user = userEvent.setup()
    render(
      <NavShell>
        <SkipLink />
        <NavShellMain>
          <button type="button">First thing on the page</button>
        </NavShellMain>
      </NavShell>,
    )
    await user.tab()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'First thing on the page' })).toHaveFocus()
  })

  it('draws no ring, because focus arrives programmatically', () => {
    render(<Strip />)
    expect(classes(screen.getByRole('main'))).toContain('outline-none')
  })

  it('lets a page name its own target instead', () => {
    render(<NavShellMain id="elsewhere">body</NavShellMain>)
    expect(screen.getByRole('main')).toHaveAttribute('id', 'elsewhere')
  })
})

describe('NavShellHeader is untouched by any of this', () => {
  it('still renders a banner with a centred column inside it', () => {
    render(
      <NavShell>
        <NavShellHeader>
          <NavShellBrand>Acme</NavShellBrand>
          <NavShellNav>
            <NavShellNavItem href="/">Home</NavShellNavItem>
          </NavShellNav>
        </NavShellHeader>
      </NavShell>,
    )
    const banner = screen.getByRole('banner')
    expect(banner).toHaveAttribute('data-slot', 'nav-shell-header')
    expect(banner.innerHTML).toContain('max-w-6xl')
  })

  it('still lets NavShellNav be the Primary navigation landmark', () => {
    render(
      <NavShellHeader>
        <NavShellNav>
          <NavShellNavItem href="/">Home</NavShellNavItem>
        </NavShellNav>
      </NavShellHeader>,
    )
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
  })
})

describe('NavShellBrandStrip on the server', () => {
  it('ships the strip and the focusable main in the first byte of HTML', () => {
    const html = renderToString(<Strip />)
    expect(html).toContain('data-slot="nav-shell-brand-strip"')
    expect(html).toContain('id="main-content"')
    expect(html).toContain('tabindex="-1"')
    expect(html).not.toContain('<nav')
    expect(html).not.toContain('max-w-6xl')
  })
})
