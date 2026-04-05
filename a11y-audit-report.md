# SubstrateUI Accessibility Audit Report

Generated: 2026-04-05

## Systemic Fixes Applied

- **Global `prefers-reduced-motion` media query** added to `src/styles/tokens.css`.
  Kills animations, transitions, and smooth scrolling for users with the
  `prefers-reduced-motion: reduce` system setting.
- **Button press animation disabled for reduced-motion users** via
  `motion-reduce:active:translate-y-0 motion-reduce:transition-none`
  in `src/components/ui/button.tsx`.
- **Icon-only Button `aria-label` fixes:**
  - `src/app/docs/layout.tsx` — ThemeToggle Light/Dark/System (added
    `aria-label` + `aria-pressed` for toggle state).
  - `src/app/docs/layout.tsx` — Mobile menu trigger (`aria-label="Open
    navigation menu"`).
  - `src/app/docs/_components/component-preview.tsx` — Copy-code button
    (`aria-label` toggles between "Copy code" / "Copied").
  - `src/app/docs/components/dropdown-menu/page.tsx` — Dropdown trigger
    examples (`aria-label="Open menu"`).
  - `src/app/docs/components/button/page.tsx` — Icon button example
    (`aria-label="Add"`).

## Components Reviewed

### Inherit Radix (pass by default)

These components wrap Radix primitives, which supply focus management,
ARIA roles/states, keyboard navigation, and SR announcements:

Accordion, AlertDialog, AspectRatio, Avatar, Checkbox, Collapsible,
ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Label, Menubar,
NavigationMenu, Popover, Progress, RadioGroup, ScrollArea, Select,
Separator, Sheet, Slider, Switch, Tabs, Toggle, ToggleGroup, Tooltip.

### Custom Components Reviewed

**PASS (no changes required):**

- **Field / FieldLabel / FieldHint / FieldError** — `htmlFor`/`id` wiring
  via context, `aria-describedby` applied when hint/error present,
  FieldError has `role="alert"`.
- **FormSection** — uses semantic `<fieldset>` + `<legend>`.
- **FormActions / InputGroup / ButtonGroup** — pure layout containers.
- **Kbd** — renders semantic `<kbd>`.
- **Spinner** — `role="status"` + sr-only "Loading…".
- **Empty** — `<h3>` title + `<p>` description (semantic structure).
- **NativeSelect** — native `<select>`, label association delegated to
  consumer via standard `htmlFor`.
- **PageHeader** — semantic `<h1>` title.
- **Combobox** — trigger has `role="combobox"` + `aria-expanded`;
  Radix Popover + Command handle `aria-controls` /
  `aria-activedescendant`.

**FIXED:**

- **SearchField** (`src/components/ui/search-field.tsx`)
  - Added `role="search"` to wrapper, `type="search"` + `aria-label` to
    input, `aria-hidden="true"` to decorative search icon.
  - Wrapped clear `X` icon in a real `<button type="button">` with
    `aria-label="Clear search"` and focus-visible ring.
- **DataTable** (`src/components/ui/data-table.tsx`)
  - Sortable column header Button receives a descriptive `aria-label`
    reflecting current sort state ("sorted ascending. Click to sort
    descending.", etc.).
  - Sort-direction arrows marked `aria-hidden="true"`.
  - Pagination Previous/Next buttons gained `aria-label`.
- **Item** (`src/components/ui/item.tsx`)
  - Added `aria-disabled` forwarding when `disabled` prop is set.
  - NOTE: consumers should pass a `role` (e.g. `role="option"` or
    `role="menuitem"`) via props when using Item in a semantic list/menu.
    See "Known Limitations" below.
- **StatCard** (`src/components/stat-card.tsx`)
  - Added non-color sentiment indicator: visible `▲ / ▼ / •` glyph
    (`aria-hidden`) plus sr-only text ("Increase of", "Decrease of",
    "Change of"). Positive/negative status is no longer communicated by
    color alone.
- **DatePicker / DateRangePicker** (`src/components/ui/date-picker.tsx`)
  - Decorative `CalendarIcon` marked `aria-hidden="true"`. Trigger
    already has visible text as accessible name.

## Known Limitations

### Touch Target Sizes

Default Button sizes vs WCAG 2.5.5 (Level AAA) recommendation of 44×44px:

| Size      | Dimensions  | Meets 44px? |
| --------- | ----------- | ----------- |
| `default` | 40px (h-10) | No          |
| `sm`      | 36px (h-9)  | No          |
| `lg`      | 44px (h-11) | Yes         |
| `icon`    | 40×40px     | No          |

This is a deliberate trade-off — 40px is a widely used desktop default.
**For mobile-primary contexts, consumers should use `size="lg"`** which
meets the 44px minimum. This is documented in `src/app/docs/accessibility`.

### `<Item>` role / focus

`<Item>` is a generic `<div>` used in both selection menus and
informational lists, so it does not hard-code a `role`. When Item is used
as an interactive option/menuitem, consumers must:

1. Pass an appropriate `role` (`option`, `menuitem`, `listitem`, etc.).
2. Add `tabIndex={0}` if focusable outside a composite widget.
3. Add keyboard handlers (Enter/Space) if not inside a Radix primitive.

### Calendar DayButton

`CalendarDayButton` (wrapped via `react-day-picker`) spreads props from
the library, which supplies its own `aria-label` describing the date.
Not modified.

## Testing Recommendations

Consumers should test their apps with:

- **Screen readers** — VoiceOver (macOS/iOS) or NVDA (Windows).
- **Keyboard-only navigation** — unplug the mouse.
- **OS-level reduced motion** — verify animations collapse.
- **Browser zoom at 200%** — text should reflow, no horizontal scroll.
- **Forced colors / high contrast mode** — verify focus rings and
  semantic state are still visible when color is stripped.

## Next Steps

- Author `/docs/accessibility` page (Prompt 14) documenting the items in
  this report for consumers.
- Consider an `Item`-variant (e.g. `OptionItem`, `MenuItem`) that bakes
  in `role` + focus behavior, so consumers don't have to remember.
- Add automated a11y CI check (axe-core or Playwright a11y) so
  regressions are caught in PR.

## What This Audit Does NOT Cover

- Exhaustive screen-reader testing across browser/OS combinations.
- Dynamic-state audits (loading, error, live-region timing).
- Real-user testing with assistive-technology users.

The audit is the floor, not the ceiling.
