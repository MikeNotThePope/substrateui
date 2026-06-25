"use client"

import * as React from "react"

import type { BreadcrumbLabels } from "@/components/ui/breadcrumb"
import type { CarouselLabels } from "@/components/ui/carousel"
import type { ComboboxLabels } from "@/components/ui/combobox"
import type { DataTableLabels } from "@/components/ui/data-table"
import type { DatePickerLabels } from "@/components/ui/date-picker"
import type { DialogLabels } from "@/components/ui/dialog"
import type { PaginationLabels } from "@/components/ui/pagination"
import type { PasswordInputLabels } from "@/components/ui/password-input"
import type { SearchFieldLabels } from "@/components/ui/search-field"
import type { SheetLabels } from "@/components/ui/sheet"
import type { SidebarLabels } from "@/components/ui/sidebar"
import type { SpinnerLabels } from "@/components/ui/spinner"
import type { DirectionToggleLabels } from "@/components/direction-toggle"
import type { SiteHeaderLabels } from "@/components/site-header"
import type { SiteHeaderNavLabels } from "@/components/site-header-nav"
import type { SitePreferencesLabels } from "@/components/site-preferences"
import type { StatCardLabels } from "@/components/stat-card"
import type { ThemePickerLabels } from "@/components/theme-picker"
import type { ThemeToggleLabels } from "@/components/theme-toggle"

/** All translatable strings for SubstrateUI components, keyed by component. */
interface SubstrateUILabels {
  breadcrumb?: Partial<BreadcrumbLabels>
  carousel?: Partial<CarouselLabels>
  combobox?: Partial<ComboboxLabels>
  dataTable?: Partial<DataTableLabels>
  datePicker?: Partial<DatePickerLabels>
  dialog?: Partial<DialogLabels>
  pagination?: Partial<PaginationLabels>
  passwordInput?: Partial<PasswordInputLabels>
  searchField?: Partial<SearchFieldLabels>
  sheet?: Partial<SheetLabels>
  sidebar?: Partial<SidebarLabels>
  spinner?: Partial<SpinnerLabels>
  directionToggle?: Partial<DirectionToggleLabels>
  siteHeader?: Partial<SiteHeaderLabels>
  siteHeaderNav?: Partial<SiteHeaderNavLabels>
  sitePreferences?: Partial<SitePreferencesLabels>
  statCard?: Partial<StatCardLabels>
  themePicker?: Partial<ThemePickerLabels>
  themeToggle?: Partial<ThemeToggleLabels>
}

const LabelsContext = React.createContext<SubstrateUILabels>({})

/**
 * Provides translated labels to all SubstrateUI components.
 *
 * Wrap your app (or a subtree) in this provider to set translations once
 * rather than passing `labels` to every component instance. Per-instance
 * `labels` props still override the provider value.
 *
 * @example
 * <LabelsProvider labels={{ dialog: { close: "Fermer" }, spinner: { loading: "Chargement…" } }}>
 *   <App />
 * </LabelsProvider>
 */
function LabelsProvider({
  labels,
  children,
}: {
  labels: SubstrateUILabels
  children: React.ReactNode
}) {
  return (
    <LabelsContext.Provider value={labels}>{children}</LabelsContext.Provider>
  )
}

/** Read the current labels context. Used internally by SubstrateUI components. */
function useLabels() {
  return React.useContext(LabelsContext)
}

export { LabelsProvider, useLabels, type SubstrateUILabels }
