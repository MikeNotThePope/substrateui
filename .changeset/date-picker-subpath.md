---
"@mikenotthepope/substrateui": major
---

Move `Calendar` and `DatePicker` out of the root barrel to their own entry, `@mikenotthepope/substrateui/date`.

The root re-exported the picker, so importing any atom from the root loaded react-day-picker and all of date-fns: 1549 modules on a root import against 188 on the subpaths, and a consumer's DOM test file that took 5.3s to start instead of 1.1s (#122). Every other atom stays at the root. Consumers of the picker change one import path; nobody else changes anything.
