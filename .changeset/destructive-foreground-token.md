---
"@mikenotthepope/substrateui": patch
---

Define the missing `destructive-foreground` token. Button and Badge referenced `text-destructive-foreground`, but the token was never defined, so Tailwind v4 silently dropped the utility and destructive controls inherited the page text color (failing WCAG AA contrast in light mode). The token is now defined in all four theme blocks — white everywhere except Lava dark, whose lighter destructive fill needs near-black — mapped in `@theme inline`, and the contrast audit now checks the pair components actually use.
