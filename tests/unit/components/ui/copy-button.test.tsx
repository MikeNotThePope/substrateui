import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { act, render, screen, fireEvent, waitFor } from "@testing-library/react"

import { CopyButton } from "@/components/ui/copy-button"
import { LabelsProvider } from "@/components/providers/labels-provider"

const URL = "https://example.com/companies/acme"

// fireEvent rather than userEvent: userEvent.setup() swaps in its own clipboard.
function stubClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  })
}

describe("CopyButton", () => {
  it("is a button named by its label", () => {
    render(<CopyButton value={URL} label="Copy company page link" />)
    const button = screen.getByRole("button", { name: "Copy company page link" })
    expect(button).toBeEnabled()
    expect(button).toHaveAttribute("type", "button")
  })

  it("is the square outline button", () => {
    render(<CopyButton value={URL} label="Copy" />)
    const classes = screen.getByRole("button", { name: "Copy" }).className.split(/\s+/)
    expect(classes).toContain("border-input")
    expect(classes).toContain("h-10")
    expect(classes).toContain("w-10")
  })

  it("copies the whole value, then is named Copied", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)
    render(<CopyButton value={URL} label="Copy company page link" />)

    fireEvent.click(screen.getByRole("button", { name: "Copy company page link" }))

    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledWith(URL)
  })

  it("goes back to its label two seconds after a copy", async () => {
    vi.useFakeTimers()
    try {
      stubClipboard(vi.fn().mockResolvedValue(undefined))
      render(<CopyButton value={URL} label="Copy apply link" />)
      fireEvent.click(screen.getByRole("button", { name: "Copy apply link" }))
      await vi.waitFor(() => screen.getByRole("button", { name: "Copied" }))
      await act(() => vi.advanceTimersByTimeAsync(2000))
      expect(screen.getByRole("button", { name: "Copy apply link" })).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it("keeps its label when the clipboard refuses", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"))
    stubClipboard(writeText)
    render(<CopyButton value={URL} label="Copy apply link" />)

    fireEvent.click(screen.getByRole("button", { name: "Copy apply link" }))

    await waitFor(() => expect(writeText).toHaveBeenCalled())
    expect(screen.getByRole("button", { name: "Copy apply link" })).toBeInTheDocument()
  })

  it("is disabled when there is nothing to copy", () => {
    render(<CopyButton value={null} label="Copy apply link" />)
    expect(screen.getByRole("button", { name: "Copy apply link" })).toBeDisabled()
  })

  it("reads Copied from LabelsProvider", async () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined))
    render(
      <LabelsProvider labels={{ copyButton: { copied: "Copié" } }}>
        <CopyButton value={URL} label="Copier" />
      </LabelsProvider>
    )
    fireEvent.click(screen.getByRole("button", { name: "Copier" }))
    expect(await screen.findByRole("button", { name: "Copié" })).toBeInTheDocument()
  })
})
