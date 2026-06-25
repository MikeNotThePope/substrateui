"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  sidebarMenuButtonVariants,
} from "@/components/ui/sidebar"
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
    ],
  },
  {
    title: "Accessibility",
    items: [
      { label: "Overview", href: "/docs/accessibility" },
      { label: "Contrast Matrix", href: "/docs/accessibility/contrast" },
      { label: "Direction (RTL)", href: "/docs/accessibility/direction" },
    ],
  },
  {
    title: "General",
    items: [
      { label: "Button", href: "/docs/components/button" },
      { label: "Badge", href: "/docs/components/badge" },
      { label: "Kbd", href: "/docs/components/kbd" },
      { label: "Spinner", href: "/docs/components/spinner" },
      { label: "Skeleton", href: "/docs/components/skeleton" },
    ],
  },
  {
    title: "Typography",
    items: [
      { label: "Typography", href: "/docs/components/typography" },
    ],
  },
  {
    title: "Layout",
    items: [
      { label: "Stack", href: "/docs/components/stack" },
      { label: "Cluster", href: "/docs/components/cluster" },
      { label: "Grid", href: "/docs/components/grid" },
      { label: "Center", href: "/docs/components/center" },
      { label: "Divider", href: "/docs/components/divider" },
      { label: "Spacer", href: "/docs/components/spacer" },
    ],
  },
  {
    title: "Forms",
    items: [
      { label: "Input", href: "/docs/components/input" },
      { label: "Textarea", href: "/docs/components/textarea" },
      { label: "Select", href: "/docs/components/select" },
      { label: "NativeSelect", href: "/docs/components/native-select" },
      { label: "Checkbox", href: "/docs/components/checkbox" },
      { label: "RadioGroup", href: "/docs/components/radio-group" },
      { label: "Switch", href: "/docs/components/switch" },
      { label: "Slider", href: "/docs/components/slider" },
      { label: "Combobox", href: "/docs/components/combobox" },
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
    ],
  },
  {
    title: "Feedback",
    items: [
      { label: "Alert", href: "/docs/components/alert" },
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
      { label: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { label: "Pagination", href: "/docs/components/pagination" },
      { label: "NavigationMenu", href: "/docs/components/navigation-menu" },
      { label: "Menubar", href: "/docs/components/menubar" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { label: "App Shell", href: "/docs/patterns/app-shell" },
      { label: "Auth Shell", href: "/docs/patterns/auth-shell" },
      { label: "Forms", href: "/docs/patterns/forms" },
      { label: "Page Layout", href: "/docs/patterns/page-layout" },
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
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
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
