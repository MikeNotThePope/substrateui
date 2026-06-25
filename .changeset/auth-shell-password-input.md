---
"@mikenotthepope/substrateui": minor
---

Add `AuthShell` organism and `PasswordInput` atom.

`AuthShell` is a centered single-column card layout for authentication pages (sign in, sign up, password reset), with slots for a brand/logo, title, description, body, and footer.

`PasswordInput` is a drop-in replacement for `Input` on password fields, adding a show/hide visibility toggle. It is i18n-aware via the `passwordInput` labels namespace on `LabelsProvider` (`showPassword` / `hidePassword`).
