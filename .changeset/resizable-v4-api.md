---
"@mikenotthepope/substrateui": patch
---

Fix `Resizable` against react-resizable-panels 4

The component was written for the v2 API and never updated, so two things were
wrong once v4 was installed:

- The vertical layout was unstyled. Both `ResizablePanelGroup` and
  `ResizableHandle` keyed their vertical variants off
  `data-panel-group-direction`, an attribute v4 no longer emits. A handle in a
  vertical group came out 1px wide and full height — a vertical rule where a
  horizontal one belonged — and its widened drag target ran the wrong way too.
  Both now read the separator's own `aria-orientation`, which v4 does set, and
  the grip pill turns to lie along the rule.
- `ResizablePanelGroup` restated `flex` and `flex-direction` in classes. v4 sets
  both inline from `orientation`, so the class was dead and the group's real
  axis could disagree with the one being styled for.

`ResizablePanelGroup` also no longer applies `h-full w-full`. The library writes
`height: 100%; width: 100%` inline, which beats any class — so a `className` of
`h-48` never worked here, and keeping a class that tailwind-merge would happily
replace made it look as though it should. Size the group by sizing its parent.

Callers on the v4 API are unaffected. If you are still passing v2 prop names —
`direction`, `autoSaveId`, `onLayout`, or a percentage `className` height — those
were already being ignored; the new docs page covers what replaces them.
