---
"@mikenotthepope/substrateui": minor
---

`InputGroup` takes `stack`: below `sm` its suffix drops to its own line under the input, inside the same border, and sits beside it from `sm` up. A long fixed suffix such as an email domain no longer squeezes the input to a few characters on a phone. New `InputGroupReadback` wraps a group and reads back the whole value plus its suffix on a line under it, which one tap selects to copy.
