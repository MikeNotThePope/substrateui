---
"@mikenotthepope/substrateui": minor
---

Add a hooks library (`@mikenotthepope/substrateui/hooks`).

Borrowing the idea Mantine is best known for: a curated, SSR-safe, tree-shakeable set of React hooks for the state and browser plumbing every app needs — so the monolith ships the logic layer, not just the components.

- **State** — `useDisclosure`, `useToggle`, `useCounter`, `usePrevious`
- **Browser/DOM** — `useClipboard`, `useLocalStorage`, `useMediaQuery`, `useClickOutside`, `useHotkeys` (with platform-aware `mod`), `useElementSize`, `useIntersection`, `useIsMobile`
- **Timing/refs** — `useDebouncedValue`, `useInterval`, `useMounted`, `useMergedRef`

All are unit-tested and exported from the new `/hooks` entry point.
