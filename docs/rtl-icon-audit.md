# RTL Directional Icon Audit

Icons whose visual meaning depends on reading direction. In RTL contexts, some of these should be swapped for their mirrored counterpart (or flipped with `rtl:rotate-180` / `rtl:-scale-x-100`). Whether to flip is a **per-usage decision**: a "next page" chevron should follow reading direction, but a play button arrow should not.

## Classification categories

Each directional icon usage falls into one of three buckets:

- ****Flip in RTL**** — the icon's visual direction follows reading direction. Examples: accordion/submenu chevrons, pagination arrows, breadcrumb separators. These should mirror automatically in RTL.
- **Don't flip** — the icon's direction is physical or semantic, not reading-direction. Examples: media playback arrows (play/skip), volume controls, mathematical operators (>, <, →), arrows tied to real-world geography. These stay put even in RTL.
- **Conditional** — it depends on surrounding UX. Example: a sidebar collapse chevron may or may not flip depending on whether the sidebar is pinned to the start edge (flips with direction) or a fixed physical side (doesn't flip). Consumer decides per usage.

The table below classifies every directional icon in the library.

| File | Line | Icon | Context | Recommendation |
|---|---|---|---|---|
| src/components/ui/carousel.tsx | 231 | `ArrowLeft` | `CarouselPrevious` button content — scrolls to previous slide | **Flip in RTL** (previous = start-side slide) |
| src/components/ui/carousel.tsx | 264 | `ArrowRight` | `CarouselNext` button content — scrolls to next slide | **Flip in RTL** (next = end-side slide) |
| src/components/ui/context-menu.tsx | 49 | `ChevronRight` | `ContextMenuSubTrigger` indicator — submenu opens toward end | **Flip in RTL** (submenus open leftward) |
| src/components/ui/dropdown-menu.tsx | 49 | `ChevronRight` | `DropdownMenuSubTrigger` indicator — submenu opens toward end | **Flip in RTL** |
| src/components/ui/menubar.tsx | 116 | `ChevronRight` | `MenubarSubTrigger` indicator — submenu opens toward end | **Flip in RTL** |
| src/components/ui/breadcrumb.tsx | 111 | `ChevronRight` | Default breadcrumb separator — points in reading direction | **Flip in RTL** |
| src/components/ui/calendar.tsx | 149 | `ChevronLeftIcon` | `Chevron` component, orientation="left" — previous-month nav | Already flipped via `rtl:**:[.rdp-button\_previous>svg]:rotate-180` in calendar root className |
| src/components/ui/calendar.tsx | 155 | `ChevronRightIcon` | `Chevron` component, orientation="right" — next-month nav | Already flipped via `rtl:**:[.rdp-button\_next>svg]:rotate-180` in calendar root className |
| src/components/ui/pagination.tsx | 104 | `ChevronLeft` | `PaginationPrevious` leading icon — previous page | **Flip in RTL** (previous = end-side visually) |
| src/components/ui/pagination.tsx | 124 | `ChevronRight` | `PaginationNext` trailing icon — next page | **Flip in RTL** |
| src/components/ui/sidebar.tsx | 300 | `PanelLeft` | `SidebarTrigger` icon — represents a side panel | **Conditional** — flip if sidebar is pinned to start/end (direction-relative); don't flip if pinned to physical left |

## Non-directional icons (no action required)

The following lucide-react icons are used in the library but do NOT carry directional meaning: `Check`, `Circle`, `ChevronDown`, `ChevronUp`, `ChevronsUpDown`, `ChevronDownIcon`, `X`, `Search`, `Settings2`, `ArrowDown`, `ArrowUp`, `ArrowUpDown`, `Dot`, `CalendarIcon`, `GripVertical`, `MoreHorizontal`, `CircleCheck`, `Info`, `LoaderCircle`, `OctagonX`, `TriangleAlert`.

## How to flip a directional icon

For icons that should mirror in RTL, add `rtl:-scale-x-100` or `rtl:rotate-180` to the className at the usage site. Alternatively, expose an `icon` prop so consumers can pass a locale-appropriate icon.
