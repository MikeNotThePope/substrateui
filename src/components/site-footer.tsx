import Link from "next/link"

const GITHUB_URL = "https://github.com/MikeNotThePope/substrateui"

const columns: Array<{
  title: string
  links: Array<{ label: string; href: string; external?: boolean }>
}> = [
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Components", href: "/docs/components/button" },
      { label: "Themes", href: "/docs/foundations/themes" },
      { label: "Tokens", href: "/docs/tokens" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: GITHUB_URL, external: true },
      { label: "Issues", href: `${GITHUB_URL}/issues`, external: true },
      {
        label: "Contributing",
        href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`,
        external: true,
      },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto_auto]">
          <div>
            <Link
              href="/"
              className="font-bold text-lg tracking-tight text-foreground"
            >
              SubstrateUI
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              A chunky, OKLCH-powered design system for Next.js.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 mt-8 border-t border-border text-xs text-muted-foreground">
          © {year} SubstrateUI · MIT License
        </div>
      </div>
    </footer>
  )
}
