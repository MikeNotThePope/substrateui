"use client"

import * as React from "react"
import { Sliders } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DirectionToggle } from "@/components/direction-toggle"
import { ThemePicker } from "@/components/theme-picker"
import { ThemeToggle } from "@/components/theme-toggle"

export function SitePreferences() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Display preferences"
        >
          <Sliders className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <ThemePicker />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Mode</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <ThemeToggle />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Direction</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <DirectionToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
