---
"@mikenotthepope/substrateui": minor
---

Add `CardLink` and `CardRaised`. A Card holding a `CardLink` opens from anywhere on it: the link's hit area stretches over the card, and what sits in `CardRaised` stays above it, so its text selects and copies and its controls click. It lifts on hover and rings on focus, and never presses in. `AccordionTrigger` takes a `detail`: text beside the title, outside the button and above its hit area, so a date or a reference selects while the rest of the row still toggles.
