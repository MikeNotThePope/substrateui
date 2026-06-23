---
"substrateui": patch
---

Fix the Spinner so its motion is visible in light mode. The arc (top border)
previously used a dark plum on a prominent medium-gray track, so it blended in
and the ring looked static. A dedicated, per-mode `--spinner-track` token now
gives light mode a subtle light-gray track for the arc to stand out against;
dark mode is unchanged.
