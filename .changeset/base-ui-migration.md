---
"@mikenotthepope/substrateui": major
---

Migrate the entire component library from Radix UI to Base UI (`@base-ui/react` 1.6.0). All 26 `@radix-ui/*` packages plus `vaul` and `cmdk` are replaced by a single actively-maintained dependency built by the Radix/Floating UI team at MUI. Component names, exports, and markup-level APIs (including `asChild`) are preserved; upgrade notes below cover the breaking details.

**What stays the same**

- Every exported component name, part structure, and `data-slot` attribute.
- The `asChild` prop keeps working everywhere it did (now translated internally to Base UI's `render` prop; the library ships its own Radix-compatible `Slot`).
- Visual appearance and design tokens.

**Breaking changes**

- **Change callbacks gain a second argument.** `onCheckedChange`, `onValueChange`, `onOpenChange`, and `onPressedChange` now receive `(value, eventDetails)` per Base UI. Single-argument handlers keep working; TypeScript signatures widen.
- **`Select`**: cleared value is `null` instead of `""`; `onValueChange` is typed `(value: string | null, eventDetails)`. `position="item-aligned"` now uses Base UI's `alignItemWithTrigger` behavior.
- **`Checkbox`**: `checked="indeterminate"` is replaced by the separate `indeterminate` prop (`aria-checked="mixed"` unchanged).
- **State attributes for styling**: `data-[state=open|closed|checked|on|active]` selectors on library components are now Base UI attributes (`data-[open]`, `data-[closed]`, `data-[checked]`, `data-[pressed]`, `data-[active]`, `data-[popup-open]`). Custom `className` overrides keyed to Radix attributes must be updated, as must `--radix-*` CSS variables (`--radix-*-trigger-width` → `--anchor-width`, `--radix-*-transform-origin` → `--transform-origin`, `--radix-*-available-height` → `--available-height`).
- **`Switch`/`RadioGroup`/`Slider` roots render spans** with `data-disabled`/`aria-disabled` instead of native `disabled` buttons.
- **`Separator`** no longer accepts `decorative` (renders `role="separator"`).
- **`TooltipProvider`**: `delayDuration` → `delay` (Base UI prop names).
- **`HoverCard`** is backed by Base UI PreviewCard; `openDelay` default is now 600 ms (was 700 ms).
- **`Drawer`** is Base UI's Drawer instead of vaul; `shouldScaleBackground` is accepted but no longer applies background scaling.
- **`Command`** is rebuilt on Base UI Autocomplete with the same composable API (`heading`, derived item values, `onSelect`); cmdk-specific props (`shouldFilter`, custom `filter`) are gone, and filtering is case-insensitive substring matching.
- **Radix-only content props** (`onPointerDownOutside`, `onOpenAutoFocus`, etc.) no longer exist; use Base UI's equivalents on the corresponding parts.
- **`useDirection`** takes no argument and always returns the ambient direction.
