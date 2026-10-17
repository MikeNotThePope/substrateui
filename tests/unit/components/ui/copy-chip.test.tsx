import * as React from "react"
import { describe, it, expect, vi, afterEach } from "vitest"
import { act, render, screen, fireEvent, waitFor } from "@testing-library/react"

import { CopyChip } from "@/components/ui/copy-chip"
import { LabelsProvider } from "@/components/providers/labels-provider"
import { destroyAnnouncer } from "@/hooks/use-announcer"

const EMAIL = "staging-admin@admin.staging.example.com"

// fireEvent rather than userEvent: userEvent.setup() swaps in its own clipboard.
function stubClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  })
}

const announced = () => document.querySelector('[aria-live="polite"]')?.textContent ?? ""

describe("CopyChip", () => {
  afterEach(() => {
    window.getSelection()?.removeAllRanges()
    destroyAnnouncer()
  })

  it("is a button named by its value and described as Copy", () => {
    render(<CopyChip value={EMAIL} />)
    const chip = screen.getByRole("button", { name: EMAIL })
    expect(chip).toHaveAttribute("type", "button")
    expect(chip).toHaveAccessibleDescription("Copy")
  })

  it("leaves the label it sits in reading as the sentence", () => {
    render(
      <>
        <label htmlFor="confirm">
          Type <CopyChip value={EMAIL} breakAfter="@" /> to confirm
        </label>
        <input id="confirm" />
      </>
    )
    expect(screen.getByRole("textbox", { name: `Type ${EMAIL} to confirm` })).toBeInTheDocument()
  })

  it("never wraps the value without breakAfter", () => {
    render(<CopyChip value={EMAIL} />)
    const chip = screen.getByRole("button", { name: EMAIL })
    expect(chip.querySelectorAll("wbr")).toHaveLength(0)
    expect(screen.getByText(EMAIL)).toHaveClass("whitespace-nowrap")
  })

  it("breaks only after each breakAfter", () => {
    render(<CopyChip value={EMAIL} breakAfter="@" />)
    const chip = screen.getByRole("button", { name: EMAIL })
    expect(chip.querySelectorAll("wbr")).toHaveLength(1)
    expect(screen.getByText("staging-admin@")).toHaveClass("whitespace-nowrap")
    expect(screen.getByText("admin.staging.example.com")).toHaveClass("whitespace-nowrap")
  })

  it("copies the whole value and announces Copied", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)
    render(<CopyChip value={EMAIL} breakAfter="@" />)

    fireEvent.click(screen.getByRole("button", { name: EMAIL }))

    await waitFor(() => expect(announced()).toBe("Copied"))
    expect(writeText).toHaveBeenCalledWith(EMAIL)
    // The name holds still: the value, not the state.
    expect(screen.getByRole("button", { name: EMAIL })).toBeInTheDocument()
  })

  it("shows a check for two seconds after a copy", async () => {
    vi.useFakeTimers()
    try {
      stubClipboard(vi.fn().mockResolvedValue(undefined))
      render(<CopyChip value={EMAIL} />)
      const chip = screen.getByRole("button", { name: EMAIL })
      const icon = () => chip.querySelector("svg")?.getAttribute("class") ?? ""
      expect(icon()).toContain("lucide-copy")

      fireEvent.click(chip)
      await vi.waitFor(() => expect(icon()).toContain("lucide-check"))
      await act(() => vi.advanceTimersByTimeAsync(2000))
      expect(icon()).toContain("lucide-copy")
    } finally {
      vi.useRealTimers()
    }
  })

  it("selects the value when the clipboard refuses", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")))
    render(<CopyChip value={EMAIL} breakAfter="@" />)

    fireEvent.click(screen.getByRole("button", { name: EMAIL }))

    await waitFor(() => expect(window.getSelection()?.toString()).toBe(EMAIL))
    expect(announced()).toBe("")
  })

  it("reads its labels from LabelsProvider", () => {
    render(
      <LabelsProvider labels={{ copyChip: { copy: "Copier" } }}>
        <CopyChip value={EMAIL} />
      </LabelsProvider>
    )
    expect(screen.getByRole("button", { name: EMAIL })).toHaveAccessibleDescription("Copier")
  })

  it("keeps a description the caller adds", () => {
    render(
      <>
        <CopyChip value={EMAIL} aria-describedby="hint" />
        <p id="hint">The account&apos;s address</p>
      </>
    )
    expect(screen.getByRole("button", { name: EMAIL })).toHaveAccessibleDescription(
      "Copy The account's address"
    )
  })

  it("forwards className to the chip", () => {
    render(<CopyChip value={EMAIL} className="ms-1" />)
    expect(screen.getByRole("button", { name: EMAIL })).toHaveClass("ms-1")
  })
})
