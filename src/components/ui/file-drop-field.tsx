"use client"

import * as React from "react"
import { Upload } from "lucide-react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { fileDropFieldVariants } from "./file-drop-field-variants"
import { useFieldControl } from "@/components/ui/field"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by FileDropField. All keys have English defaults. */
interface FileDropFieldLabels {
  /** Shown while nothing is picked. */
  prompt?: string
  /** Suffix after the count when more than one file is picked. */
  filesSelected?: string
}

const defaultFileDropFieldLabels: Required<FileDropFieldLabels> = {
  prompt: "Choose a file or drag it here",
  filesSelected: "files selected",
}

// ─── accept matching ─────────────────────────────────────────────────

/**
 * Does `file` satisfy an `accept` list?
 *
 * The browser applies `accept` to the file picker and to nothing else, so a
 * drop arrives unfiltered. A dashed box that says "PDF only" and then swallows
 * a `.exe` is worse than one that never offered to take a drop, so the same
 * list is applied here by hand. The grammar is the HTML one: an extension
 * (`.pdf`), a media type (`application/pdf`), or a media type with a wildcard
 * subtype (`image/*`).
 */
function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true
  const patterns = accept
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
  if (patterns.length === 0) return true

  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()

  return patterns.some((pattern) => {
    if (pattern.startsWith(".")) return name.endsWith(pattern)
    if (pattern.endsWith("/*")) return type.startsWith(pattern.slice(0, -1))
    return type === pattern
  })
}

// ─── Component ───────────────────────────────────────────────────────

/** Props accepted by the FileDropField component. */
export interface FileDropFieldProps
  extends Omit<
    React.ComponentPropsWithRef<"input">,
    "type" | "size" | "children" | "value" | "defaultValue"
  > {
  /** Box padding, type scale and icon size, moved together. */
  size?: VariantProps<typeof fileDropFieldVariants>["size"]
  /**
   * The mark above the prompt. Defaults to an upload arrow; pass `null` for no
   * icon at all. Sized by the recipe, so pass the bare icon.
   */
  icon?: React.ReactNode
  /** Replaces the default prompt line. */
  prompt?: React.ReactNode
  /** A muted line under the prompt — accepted types, a size limit. */
  hint?: React.ReactNode
  /**
   * Draw the box as rejected and set `aria-invalid`. Defaults to the error
   * state of a surrounding {@link Field}, so inside one there is nothing to
   * pass.
   */
  invalid?: boolean
  /**
   * The files after a pick or a drop, already filtered by `accept` and by
   * `multiple`. This is the only event a drop raises — see the note on the
   * component.
   */
  onFilesChange?: (files: File[]) => void
  labels?: FileDropFieldLabels
}

/**
 * A file input dressed as a drop target: an `sr-only` `<input type="file">`
 * inside a dashed box that takes the focus ring, the click and the drop.
 *
 * Two applications had hand-rolled this, and had already drifted on the two
 * things that are props here — the box size and the icon
 * (MikeNotThePope/substrateui#123).
 *
 * The input stays a real, focusable, keyboard-operable file input; only its
 * appearance is borrowed. That is what keeps Tab, Space and the platform file
 * picker working without a line of code, and it is why the box is a `<label>`
 * rather than a `<div>` with a click handler.
 *
 * **A drop does not fire the input's `change` event.** It assigns the dropped
 * files to the input where the browser allows it, so a plain form submission
 * carries them, but nothing synthesises a `change`. Read the files from
 * `onFilesChange`, which covers both the picker and the drop.
 *
 * The box's own text is the input's accessible name. Once that is more than the
 * prompt — a hint, a picked file — give it an `aria-label` of its own.
 *
 * @example
 * <FileDropField
 *   name="resume"
 *   aria-label="Resume"
 *   accept=".pdf,.doc,.docx"
 *   hint="PDF or Word, up to 5MB"
 *   onFilesChange={([file]) => setResume(file)}
 * />
 *
 * @prop size - Box padding, type scale and icon size (sm, default, lg).
 * @prop icon - The mark above the prompt, or `null` for none.
 * @prop prompt - Replaces the default prompt line.
 * @prop hint - A muted line under the prompt.
 * @prop invalid - Draw as rejected; defaults to a surrounding Field's error.
 * @prop onFilesChange - The files after a pick or a drop.
 */
function FileDropField({
  size,
  icon,
  prompt,
  hint,
  invalid,
  onFilesChange,
  labels: labelsProp,
  className,
  multiple,
  accept,
  disabled,
  onChange,
  ref,
  ...props
}: FileDropFieldProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultFileDropFieldLabels, ctx.fileDropField, labelsProp)

  const fieldControl = useFieldControl()
  const isInvalid = invalid ?? fieldControl["aria-invalid"] === true

  const [picked, setPicked] = React.useState<File[]>([])
  const [dragging, setDragging] = React.useState(false)

  const innerRef = React.useRef<HTMLInputElement>(null)
  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    },
    [ref]
  )

  const commit = React.useCallback(
    (files: File[]) => {
      setPicked(files)
      onFilesChange?.(files)
    },
    [onFilesChange]
  )

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    commit(Array.from(event.target.files ?? []))
    onChange?.(event)
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setDragging(false)
    if (disabled) return

    const dropped = Array.from(event.dataTransfer?.files ?? []).filter((file) =>
      matchesAccept(file, accept)
    )
    if (dropped.length === 0) return

    const next = multiple ? dropped : dropped.slice(0, 1)

    // So a plain form submit carries what was dropped. `files` is settable in
    // every browser that has drag and drop, and settable from a `FileList`
    // only — which is why this takes the untouched `dataTransfer.files` rather
    // than the filtered array whenever the two agree.
    const input = innerRef.current
    if (input && event.dataTransfer && next.length === event.dataTransfer.files.length) {
      try {
        input.files = event.dataTransfer.files
      } catch {
        // jsdom, and any browser that keeps `files` read-only. The component's
        // own state is the source of truth either way.
      }
    }

    commit(next)
  }

  function handleDragOver(event: React.DragEvent<HTMLLabelElement>) {
    if (disabled) return
    // Without this the browser navigates to the dropped file instead.
    event.preventDefault()
    setDragging(true)
  }

  const summary =
    picked.length === 0
      ? null
      : picked.length === 1
        ? picked[0].name
        : `${picked.length} ${labels.filesSelected}`

  return (
    <label
      data-slot="file-drop-field"
      data-dragging={dragging ? "true" : undefined}
      className={cn(fileDropFieldVariants({ size, invalid: isInvalid }), className)}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        {...fieldControl}
        ref={setRefs}
        type="file"
        data-slot="file-drop-field-input"
        className="sr-only"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        aria-invalid={isInvalid || undefined}
        onChange={handleChange}
        {...props}
      />
      {icon === null ? null : <span aria-hidden="true">{icon ?? <Upload />}</span>}
      <span data-slot="file-drop-field-prompt" className="font-medium">
        {prompt ?? labels.prompt}
      </span>
      {summary ? (
        <span data-slot="file-drop-field-file" className="break-all font-mono text-xs">
          {summary}
        </span>
      ) : null}
      {hint ? (
        <span data-slot="file-drop-field-hint" className="text-xs text-muted-foreground">
          {hint}
        </span>
      ) : null}
    </label>
  )
}

export { FileDropField, type FileDropFieldLabels }
