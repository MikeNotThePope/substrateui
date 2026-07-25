"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SearchField } from "@/components/ui/search-field"

/** An item in a {@link Transfer}. */
export interface TransferItem {
  /** Unique key across the whole data source. */
  key: string
  /** Rendered row content. */
  label: React.ReactNode
  /** Dim the row and block selection. */
  disabled?: boolean
}

/** Which list an item moved into. */
export type TransferDirection = "target" | "source"

/** Text overrides for {@link Transfer}. */
export interface TransferLabels {
  /** Placeholder for the per-panel search inputs. @default "Search..." */
  searchPlaceholder?: string
  /** Shown when a panel has no items. @default "No items" */
  empty?: string
  /** Accessible label for the move-to-target button. @default "Move to target" */
  moveToTarget?: string
  /** Accessible label for the move-to-source button. @default "Move to source" */
  moveToSource?: string
  /** Builds the "n/total" count text. */
  itemCount?: (selected: number, total: number) => string
}

const DEFAULT_LABELS: Required<TransferLabels> = {
  searchPlaceholder: "Search...",
  empty: "No items",
  moveToTarget: "Move to target",
  moveToSource: "Move to source",
  itemCount: (selected, total) => (selected > 0 ? `${selected}/${total}` : `${total}`),
}

/** Minimal controlled/uncontrolled state helper. */
function useControlled<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const isControlled = controlled !== undefined
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const value = isControlled ? (controlled as T) : uncontrolled
  const set = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )
  return [value, set]
}

/** Props for {@link Transfer}. */
export interface TransferProps
  extends Omit<React.ComponentPropsWithRef<"div">, "onChange" | "title"> {
  /** Every item, in both lists. */
  dataSource: TransferItem[]
  /** Keys in the target (right) list — controlled. */
  targetKeys?: string[]
  /** Keys in the target list initially — uncontrolled. */
  defaultTargetKeys?: string[]
  /** Fired after a move, with the next target keys and what moved. */
  onChange?: (
    targetKeys: string[],
    direction: TransferDirection,
    movedKeys: string[]
  ) => void
  /** Checked keys across both panels — controlled. */
  selectedKeys?: string[]
  /** Fired when the checked set changes. */
  onSelectChange?: (selectedKeys: string[]) => void
  /** Panel headings, `[source, target]`. @default ["Source", "Target"] */
  titles?: [React.ReactNode, React.ReactNode]
  /** Show a search input in each panel. */
  showSearch?: boolean
  /** Height of each scrollable list, in px. @default 240 */
  listHeight?: number
  /** Disable the whole control. */
  disabled?: boolean
  /** Text overrides. */
  labels?: TransferLabels
}

/**
 * A dual-list picker: move items between a source and a target list with
 * checkboxes, per-panel search, and select-all. The classic pattern for
 * assigning permissions, columns, tags, or members.
 *
 * @example
 * <Transfer
 *   dataSource={users}
 *   defaultTargetKeys={["ada"]}
 *   titles={["Available", "Assigned"]}
 *   showSearch
 *   onChange={(keys) => save(keys)}
 * />
 */
function Transfer({
  dataSource,
  targetKeys: targetKeysProp,
  defaultTargetKeys = [],
  onChange,
  selectedKeys: selectedKeysProp,
  onSelectChange,
  titles = ["Source", "Target"],
  showSearch = false,
  listHeight = 240,
  disabled = false,
  labels: labelsProp,
  className,
  ref,
  ...props
}: TransferProps) {
  const labels = { ...DEFAULT_LABELS, ...labelsProp }

  const [targetKeys, setTargetKeys] = useControlled<string[]>(
    targetKeysProp,
    defaultTargetKeys
  )
  const [selectedKeys, setSelectedKeys] = useControlled<string[]>(
    selectedKeysProp,
    [],
    onSelectChange
  )

  const [sourceQuery, setSourceQuery] = React.useState("")
  const [targetQuery, setTargetQuery] = React.useState("")

  const targetSet = React.useMemo(() => new Set(targetKeys), [targetKeys])
  const selectedSet = React.useMemo(() => new Set(selectedKeys), [selectedKeys])

  const sourceItems = dataSource.filter((item) => !targetSet.has(item.key))
  const targetItems = dataSource.filter((item) => targetSet.has(item.key))

  const selectedInSource = sourceItems.filter((i) => selectedSet.has(i.key))
  const selectedInTarget = targetItems.filter((i) => selectedSet.has(i.key))

  function move(direction: TransferDirection) {
    const moving = (direction === "target" ? selectedInSource : selectedInTarget)
      .filter((i) => !i.disabled)
      .map((i) => i.key)
    if (moving.length === 0) return

    const movingSet = new Set(moving)
    const nextTarget =
      direction === "target"
        ? [...targetKeys, ...moving]
        : targetKeys.filter((k) => !movingSet.has(k))

    setTargetKeys(nextTarget)
    setSelectedKeys(selectedKeys.filter((k) => !movingSet.has(k)))
    onChange?.(nextTarget, direction, moving)
  }

  function toggleKey(key: string) {
    setSelectedKeys(
      selectedSet.has(key)
        ? selectedKeys.filter((k) => k !== key)
        : [...selectedKeys, key]
    )
  }

  /** Select or clear every enabled, currently-visible item in one panel. */
  function toggleAll(visible: TransferItem[], checked: boolean) {
    const enabled = visible.filter((i) => !i.disabled).map((i) => i.key)
    const enabledSet = new Set(enabled)
    setSelectedKeys(
      checked
        ? [...selectedKeys.filter((k) => !enabledSet.has(k)), ...enabled]
        : selectedKeys.filter((k) => !enabledSet.has(k))
    )
  }

  const canMoveToTarget = !disabled && selectedInSource.some((i) => !i.disabled)
  const canMoveToSource = !disabled && selectedInTarget.some((i) => !i.disabled)

  return (
    <div
      ref={ref}
      data-slot="transfer"
      className={cn(
        "flex flex-col items-stretch gap-3 sm:flex-row sm:items-center",
        className
      )}
      {...props}
    >
      <TransferPanel
        title={titles[0]}
        items={sourceItems}
        query={sourceQuery}
        onQueryChange={setSourceQuery}
        selectedSet={selectedSet}
        onToggleKey={toggleKey}
        onToggleAll={toggleAll}
        showSearch={showSearch}
        listHeight={listHeight}
        disabled={disabled}
        labels={labels}
      />

      <div className="flex shrink-0 flex-row justify-center gap-2 sm:flex-col">
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={!canMoveToTarget}
          aria-label={labels.moveToTarget}
          onClick={() => move("target")}
        >
          <ChevronRight className="h-4 w-4 rtl:-scale-x-100" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          disabled={!canMoveToSource}
          aria-label={labels.moveToSource}
          onClick={() => move("source")}
        >
          <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" />
        </Button>
      </div>

      <TransferPanel
        title={titles[1]}
        items={targetItems}
        query={targetQuery}
        onQueryChange={setTargetQuery}
        selectedSet={selectedSet}
        onToggleKey={toggleKey}
        onToggleAll={toggleAll}
        showSearch={showSearch}
        listHeight={listHeight}
        disabled={disabled}
        labels={labels}
      />
    </div>
  )
}

interface TransferPanelProps {
  title: React.ReactNode
  items: TransferItem[]
  query: string
  onQueryChange: (value: string) => void
  selectedSet: Set<string>
  onToggleKey: (key: string) => void
  onToggleAll: (visible: TransferItem[], checked: boolean) => void
  showSearch: boolean
  listHeight: number
  disabled: boolean
  labels: Required<TransferLabels>
}

function TransferPanel({
  title,
  items,
  query,
  onQueryChange,
  selectedSet,
  onToggleKey,
  onToggleAll,
  showSearch,
  listHeight,
  disabled,
  labels,
}: TransferPanelProps) {
  const headingId = React.useId()

  const visible = showSearch
    ? items.filter((item) =>
        itemText(item.label).toLowerCase().includes(query.trim().toLowerCase())
      )
    : items

  const selectable = visible.filter((i) => !i.disabled)
  const selectedCount = selectable.filter((i) => selectedSet.has(i.key)).length
  const allSelected = selectable.length > 0 && selectedCount === selectable.length
  const someSelected = selectedCount > 0 && !allSelected

  return (
    <div
      data-slot="transfer-panel"
      className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border-2 border-border bg-background"
    >
      <div className="flex items-center gap-2 border-b-2 border-border bg-muted/50 px-3 py-2">
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          disabled={disabled || selectable.length === 0}
          aria-labelledby={headingId}
          onCheckedChange={(checked) => onToggleAll(visible, checked === true)}
        />
        <span id={headingId} className="min-w-0 flex-1 truncate text-sm font-medium">
          {title}
        </span>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {labels.itemCount(selectedCount, items.length)}
        </span>
      </div>

      {showSearch && (
        <div className="border-b-2 border-border p-2">
          <SearchField
            value={query}
            onChange={onQueryChange}
            placeholder={labels.searchPlaceholder}
          />
        </div>
      )}

      <ul
        data-slot="transfer-list"
        style={{ height: listHeight }}
        className="m-0 list-none overflow-y-auto p-1"
      >
        {visible.length === 0 ? (
          <li className="grid h-full place-content-center px-3 text-sm text-muted-foreground">
            {labels.empty}
          </li>
        ) : (
          visible.map((item) => {
            const itemDisabled = disabled || item.disabled
            return (
              <li key={item.key}>
                <label
                  data-slot="transfer-item"
                  data-disabled={itemDisabled ? "" : undefined}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors",
                    itemDisabled
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Checkbox
                    checked={selectedSet.has(item.key)}
                    disabled={itemDisabled}
                    onCheckedChange={() => onToggleKey(item.key)}
                  />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                </label>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}

/** Best-effort plain text for search matching against a ReactNode label. */
function itemText(label: React.ReactNode): string {
  if (typeof label === "string") return label
  if (typeof label === "number") return String(label)
  if (Array.isArray(label)) return label.map(itemText).join(" ")
  if (React.isValidElement<{ children?: React.ReactNode }>(label)) {
    return itemText(label.props.children)
  }
  return ""
}

export { Transfer }
