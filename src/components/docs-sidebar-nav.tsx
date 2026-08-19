"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { capsClass } from "@/components/caps"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar-menu-button-variants"
import { cn } from "@/lib/utils"

// ─── Navigation Data ──────────────────────────────────────────────────

export const navSections = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { label: "Colors", href: "/docs/tokens" },
      { label: "Typography", href: "/docs/tokens/typography" },
      { label: "Spacing", href: "/docs/tokens/spacing" },
      { label: "Themes", href: "/docs/foundations/themes" },
      { label: "Theming API", href: "/docs/foundations/theming" },
      { label: "Textures", href: "/docs/foundations/textures" },
      { label: "AI Prompt", href: "/docs/foundations/ai-prompt" },
    ],
  },
  {
    title: "Accessibility",
    items: [
      { label: "Overview", href: "/docs/accessibility" },
      { label: "Contrast Matrix", href: "/docs/accessibility/contrast" },
      { label: "Direction (RTL)", href: "/docs/accessibility/direction" },
      { label: "Announcer", href: "/docs/accessibility/announcer" },
    ],
  },
  {
    title: "General",
    items: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Badge", href: "/docs/components/badge" },
      { label: "ButtonGroup", href: "/docs/components/button-group" },
      { label: "Toggle", href: "/docs/components/toggle" },
      { label: "ToggleGroup", href: "/docs/components/toggle-group" },
      { label: "Kbd", href: "/docs/components/kbd" },
      { label: "Spinner", href: "/docs/components/spinner" },
      { label: "Skeleton", href: "/docs/components/skeleton" },
    ],
  },
  {
    title: "Typography",
    items: [
      { label: "Typography", href: "/docs/components/typography" },
      { label: "Overline", href: "/docs/components/overline" },
    ],
  },
  {
    title: "Layout Primitives",
    items: [
      { label: "Stack", href: "/docs/components/stack" },
      { label: "Cluster", href: "/docs/components/cluster" },
      { label: "Grid", href: "/docs/components/grid" },
      { label: "Center", href: "/docs/components/center" },
      { label: "Divider", href: "/docs/components/divider" },
      { label: "Separator", href: "/docs/components/separator" },
      { label: "ScrollArea", href: "/docs/components/scroll-area" },
      { label: "Resizable", href: "/docs/components/resizable" },
      { label: "Spacer", href: "/docs/components/spacer" },
    ],
  },
  {
    title: "Forms",
    items: [
      { label: "Label", href: "/docs/components/label" },
      { label: "Input", href: "/docs/components/input" },
      { label: "InputGroup", href: "/docs/components/input-group" },
      { label: "Textarea", href: "/docs/components/textarea" },
      { label: "Select", href: "/docs/components/select" },
      { label: "NativeSelect", href: "/docs/components/native-select" },
      { label: "Checkbox", href: "/docs/components/checkbox" },
      { label: "RadioGroup", href: "/docs/components/radio-group" },
      { label: "Switch", href: "/docs/components/switch" },
      { label: "Slider", href: "/docs/components/slider" },
      { label: "Combobox", href: "/docs/components/combobox" },
      { label: "Cascader", href: "/docs/components/cascader" },
      { label: "DatePicker", href: "/docs/components/date-picker" },
      { label: "InputOTP", href: "/docs/components/input-otp" },
      { label: "SearchField", href: "/docs/components/search-field" },
      { label: "PasswordInput", href: "/docs/components/password-input" },
    ],
  },
  {
    title: "Form Patterns",
    items: [
      { label: "Field", href: "/docs/components/field" },
      { label: "Fieldset", href: "/docs/components/fieldset" },
      { label: "FormSection", href: "/docs/components/form-section" },
      { label: "FormActions", href: "/docs/components/form-actions" },
      { label: "Form", href: "/docs/components/form" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { label: "Table", href: "/docs/components/table" },
      { label: "DataTable", href: "/docs/components/data-table" },
      { label: "Card", href: "/docs/components/card" },
      { label: "Avatar", href: "/docs/components/avatar" },
      { label: "AspectRatio", href: "/docs/components/aspect-ratio" },
      { label: "Calendar", href: "/docs/components/calendar" },
      { label: "Timeline", href: "/docs/components/timeline" },
      { label: "Rating", href: "/docs/components/rating" },
      { label: "ListGroup", href: "/docs/components/list-group" },
      { label: "Tree", href: "/docs/components/tree" },
      { label: "Descriptions", href: "/docs/components/descriptions" },
      { label: "Transfer", href: "/docs/components/transfer" },
      { label: "Countdown", href: "/docs/components/countdown" },
      { label: "StatCard", href: "/docs/components/stat-card" },
      { label: "Chart", href: "/docs/components/chart" },
      { label: "Carousel", href: "/docs/components/carousel" },
      { label: "Accordion", href: "/docs/components/accordion" },
      { label: "Collapsible", href: "/docs/components/collapsible" },
      { label: "Item", href: "/docs/components/item" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { label: "Alert", href: "/docs/components/alert" },
      { label: "Banner", href: "/docs/components/banner" },
      { label: "Progress", href: "/docs/components/progress" },
      { label: "Toast", href: "/docs/components/toast" },
      { label: "Empty", href: "/docs/components/empty" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { label: "Dialog", href: "/docs/components/dialog" },
      { label: "Sheet", href: "/docs/components/sheet" },
      { label: "Drawer", href: "/docs/components/drawer" },
      { label: "AlertDialog", href: "/docs/components/alert-dialog" },
      { label: "Popover", href: "/docs/components/popover" },
      { label: "Tooltip", href: "/docs/components/tooltip" },
      { label: "HoverCard", href: "/docs/components/hover-card" },
      { label: "ContextMenu", href: "/docs/components/context-menu" },
      { label: "DropdownMenu", href: "/docs/components/dropdown-menu" },
      { label: "Command", href: "/docs/components/command" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { label: "Tabs", href: "/docs/components/tabs" },
      { label: "NavTabs", href: "/docs/components/nav-tabs" },
      { label: "Link", href: "/docs/components/link" },
      { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { label: "Pagination", href: "/docs/components/pagination" },
      { label: "NavigationMenu", href: "/docs/components/navigation-menu" },
      { label: "Menubar", href: "/docs/components/menubar" },
      { label: "Sidebar", href: "/docs/components/sidebar" },
      { label: "Stepper", href: "/docs/components/stepper" },
    ],
  },
  {
    title: "Layouts",
    items: [
      { label: "App Shell", href: "/docs/layouts/app-shell" },
      { label: "Dashboard Shell", href: "/docs/layouts/dashboard-shell" },
      { label: "Nav Shell", href: "/docs/layouts/nav-shell" },
      { label: "Auth Shell", href: "/docs/layouts/auth-shell" },
      { label: "Page Layout", href: "/docs/layouts/page-layout" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { label: "Forms", href: "/docs/patterns/forms" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { label: "Overview", href: "/docs/blocks" },
    ],
  },
  {
    title: "Templates",
    items: [
      { label: "Overview", href: "/docs/templates" },
    ],
  },
  {
    title: "Utilities",
    items: [
      { label: "FocusTrap", href: "/docs/components/focus-trap" },
      { label: "SkipLink", href: "/docs/components/skip-link" },
    ],
  },
  {
    title: "Hooks",
    items: [
      { label: "Overview", href: "/docs/hooks" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Theme Generator", href: "/docs/foundations/theme-generator" },
      { label: "CLI", href: "/docs/foundations/cli" },
    ],
  },
]

// ─── Sidebar Nav ──────────────────────────────────────────────────────

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav aria-label="Documentation" className="flex flex-col">
      {navSections.map((section) => (
        <SidebarGroup key={section.title}>
          {/* Section labels are registration marks, not headings — the type
              printed on the edge of the sheet to say which plate you're on. */}
          <SidebarGroupLabel className={capsClass}>
            {section.title}
          </SidebarGroupLabel>
          <SidebarMenu>
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.href}>
                  {/* Compose the suite's menu-button styling onto a Next Link.
                      sidebarMenuButtonVariants is the documented path for
                      non-button elements, so we avoid SidebarMenuButton's
                      useSidebar() dependency (no SidebarProvider needed here). */}
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    data-active={isActive}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(sidebarMenuButtonVariants())}
                  >
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </nav>
  )
}
