"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, Sun, Moon, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Mono, Small } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

// ─── Navigation Data ──────────────────────────────────────────────────

const navSections = [
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
    ],
  },
  {
    title: "Accessibility",
    items: [
      { label: "Contrast Matrix", href: "/docs/accessibility/contrast" },
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
      { label: "Forms", href: "/docs/patterns/forms" },
      { label: "Page Layout", href: "/docs/patterns/page-layout" },
    ],
  },
]

// ─── Sidebar Nav ──────────────────────────────────────────────────────

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-6">
      {navSections.map((section) => (
        <div key={section.title}>
          <Mono className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1">
            {section.title}
          </Mono>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "block px-3 py-1.5 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

// ─── Theme Toggle ─────────────────────────────────────────────────────

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9" />

  return (
    <div className="flex items-center gap-1 border-2 rounded-lg p-1">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}

// ─── Layout ───────────────────────────────────────────────────────────

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[280px] md:flex-col md:fixed md:inset-y-0 border-r-2 bg-card">
        <div className="flex items-center h-14 px-4 border-b-2">
          <Link href="/" className="font-bold text-lg tracking-tight">
            SubstrateUI
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4 px-2">
          <SidebarNav />
        </ScrollArea>
        <div className="p-4 border-t-2">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 h-14 border-b-2 bg-card flex items-center justify-between px-4">
        <Link href="/" className="font-bold text-lg tracking-tight">
          SubstrateUI
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetTitle className="px-4 pt-4 font-bold text-lg">Navigation</SheetTitle>
              <ScrollArea className="h-full py-4 px-2">
                <SidebarNav onNavigate={() => setOpen(false)} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-[280px] mt-14 md:mt-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}
