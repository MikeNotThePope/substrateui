import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SitePreferences } from "@/components/site-preferences"
import {
  SiteHeaderMobileNav,
  SiteHeaderNav,
} from "@/components/site-header-nav"

const GITHUB_URL = "https://github.com/MikeNotThePope/substrateui"

export function SiteHeader() {
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 h-14 border-b-2 bg-card/90 backdrop-blur"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <SiteHeaderMobileNav />
          <Link href="/" className="font-bold text-lg tracking-tight">
            SubstrateUI
          </Link>
        </div>
        <SiteHeaderNav />
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            aria-label="GitHub repository"
          >
            <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.75.09-.73.09-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.22.69.83.57A12 12 0 0 0 12 .3" />
              </svg>
            </a>
          </Button>
          <SitePreferences />
        </div>
      </div>
    </header>
  )
}
