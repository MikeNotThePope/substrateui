---
"@mikenotthepope/substrateui": minor
---

Flowbite-inspired expansion: five new components, a categorized blocks library, and a page-templates layer.

- **New components** — `Timeline`, `Rating` (fractional display + interactive input), `Stepper` (horizontal/vertical), `Banner` (dismissible announcement bar), and `ListGroup`. All exported from the main entry with stories and docs.
- **Categorized blocks** — the `substrateui/blocks` entry now spans Marketing, Application, Auth, and E-commerce, adding `PricingBlock`, `CtaBlock`, `FooterBlock`, `ActivityFeedBlock` (built on `Timeline`), and `ProductGridBlock` (built on `Rating`).
- **Page templates** — a new `@mikenotthepope/substrateui/templates` entry with complete, parameterized pages assembled from blocks and shells: `DashboardTemplate` (top bar + collapsible sidebar + stats + activity feed) and `PricingTemplate` (hero + tiers + features + CTA + footer).
