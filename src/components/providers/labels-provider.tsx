"use client"

import * as React from "react"

import type { CarouselLabels } from "@/components/ui/carousel"
import type { ComboboxLabels } from "@/components/ui/combobox"
import type { DataTableLabels } from "@/components/ui/data-table"
import type { DatePickerLabels } from "@/components/ui/date-picker"
import type { DialogLabels } from "@/components/ui/dialog"
import type { SheetLabels } from "@/components/ui/sheet"
import type { SpinnerLabels } from "@/components/ui/spinner"

/** All translatable strings for SubstrateUI components, keyed by component. */
interface SubstrateUILabels {
  carousel?: Partial<CarouselLabels>
  combobox?: Partial<ComboboxLabels>
  dataTable?: Partial<DataTableLabels>
  datePicker?: Partial<DatePickerLabels>
  dialog?: Partial<DialogLabels>
  sheet?: Partial<SheetLabels>
  spinner?: Partial<SpinnerLabels>
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
 * <LabelsProvider labels={{ dialog: { close: "Fermer" }, spinner: { loading: "Chargement\u2026" } }}>
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
