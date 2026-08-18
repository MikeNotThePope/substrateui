---
"@mikenotthepope/substrateui": minor
---

Let `EmptyTitle` be the heading the page actually needs

`EmptyTitle` rendered a hardcoded `h3`. That is right when the empty state sits
inside a page that already has a heading above it — an empty table on a
dashboard, a filtered list with no matches. It is wrong for the other half of
the cases: a 404, an error screen, or a "nothing here yet" page has the empty
state as its entire content, and its title is that document's `h1`.

With no way to say so, consumers copied the class string onto their own heading:

```tsx
<Empty className="max-w-lg">
  <EmptyIcon><CircleAlert /></EmptyIcon>
  <H1 className="text-lg font-semibold">This job isn't accepting applications</H1>
  <EmptyDescription>…</EmptyDescription>
</Empty>
```

`Empty`, `EmptyIcon`, `EmptyDescription` and `EmptyAction` all composed
correctly; one member of the family was hand-derived because it could not be the
element the document needed. In LavaHire that pattern appears at ten call sites —
`text-lg font-semibold` on an `<H1>` or `<H2>`, byte-identical to what
`EmptyTitle` already sets.

It now takes `render`, the same escape hatch the typography components use:

```tsx
<EmptyTitle render={<h1 />}>This page isn't available</EmptyTitle>
```

The default is unchanged, so nothing shifts for existing callers. The styling
travels with the element, so what a caller changes is the document outline, not
the look.

`empty.tsx` gains `"use client"` — `useRender` requires it, and every export of a
module carrying that directive becomes a client reference. Nothing calls these
exports as functions, only renders them, so server components are unaffected;
and the pages this matters for already carry a client boundary from the
typography components they use alongside it.
