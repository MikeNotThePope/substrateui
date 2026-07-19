---
"@mikenotthepope/substrateui": major
---

Migrate the entire component library from Radix UI to Base UI (`@base-ui/react` 1.6.0). All 26 `@radix-ui/*` packages plus `vaul` and `cmdk` are replaced by a single actively-maintained dependency built by the Radix/Floating UI team at MUI. Component names, exports, and part structure are unchanged; the library now exposes Base UI's APIs directly.

**Composition: `asChild` → `render`**

The Radix `asChild` prop is gone everywhere. Composition uses Base UI's `render` prop, including on the library's own components (`Button`, `Stack`, `Grid`, `Cluster`, `Center`, `BreadcrumbLink`, `NavTabsLink`, sidebar parts):

```tsx
// before
<DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
<Button asChild><Link href="/docs">Docs</Link></Button>

// after
<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
<Button render={<Link href="/docs" />}>Docs</Button>
```

**Value APIs follow Base UI**

- `Accordion` and `ToggleGroup` drop `type="single" | "multiple"` and `collapsible`; values are always arrays, one item is open/pressed at a time by default, and the `multiple` prop allows several.
- `Select`: cleared value is `null` instead of `""`; `SelectContent` drops `position` (popover anchoring is the default; `alignItemWithTrigger` opts into the macOS-style overlay).
- `Checkbox`: `checked="indeterminate"` is replaced by the `indeterminate` prop.
- Change callbacks (`onCheckedChange`, `onValueChange`, `onOpenChange`, `onPressedChange`) receive `(value, eventDetails)`.
- `Combobox` drops the deprecated `placeholder`/`searchPlaceholder`/`emptyMessage` props in favor of `labels`.
- `TooltipProvider` uses Base UI's `delay`/`closeDelay` (formerly `delayDuration`); `HoverCard` delays follow Base UI PreviewCard's API.
- `Drawer` (now Base UI instead of vaul) drops `shouldScaleBackground`; `Separator` drops `decorative`; `useDirection` takes no argument.

**Styling hooks follow Base UI**

State selectors on library components are now Base UI data attributes: `data-[open]`, `data-[closed]`, `data-[checked]`, `data-[pressed]`, `data-[active]`, `data-[popup-open]`, `data-[highlighted]`, `data-[starting-style]`/`data-[ending-style]` — replacing Radix's `data-[state=…]`. CSS variables change accordingly: `--radix-*-trigger-width` → `--anchor-width`, `--radix-*-transform-origin` → `--transform-origin`, `--radix-*-available-height` → `--available-height`, `--radix-accordion-content-height` → `--accordion-panel-height`.

**Behavioral notes**

- `Switch`/`RadioGroup`/`Slider` roots render spans with `data-disabled`/`aria-disabled` instead of native disabled buttons.
- `Command` is rebuilt on Base UI Autocomplete with the same composable API (`heading`, derived item values, `onSelect`); cmdk's `shouldFilter`/custom `filter` are gone and filtering is case-insensitive substring matching.
- Radix-only content props (`onPointerDownOutside`, `onOpenAutoFocus`, …) no longer exist; use Base UI's equivalents on the corresponding parts.
