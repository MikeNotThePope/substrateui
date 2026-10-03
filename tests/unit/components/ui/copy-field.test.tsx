import * as React from "react"
import { describe, it, expect, vi, afterEach } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"

import { CopyField } from "@/components/ui/copy-field"
import { LabelsProvider } from "@/components/providers/labels-provider"

const VALUE = "3f2a9c1e-7b4d-4e21-9a0f-5c6d8e2b1a47"

// fireEvent rather than userEvent: userEvent.setup() swaps in its own clipboard.
function stubClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  })
}

describe("CopyField", () => {
  afterEach(() => {
    window.getSelection()?.removeAllRanges()
  })

  it("shows the value and a copy button", () => {
    render(<CopyField value={VALUE} />)
    expect(screen.getByText(VALUE)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  })

  it("names the button with label, keeping the visible text", () => {
    render(<CopyField value={VALUE} label="Copy reference" />)
    const button = screen.getByRole("button", { name: "Copy reference" })
    expect(button).toHaveTextContent("Copy")
  })

  it("copies the value, flips to Copied and announces it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)
    render(<CopyField value={VALUE} label="Copy reference" />)

    fireEvent.click(screen.getByRole("button", { name: "Copy reference" }))

    const button = await screen.findByRole("button", { name: "Copied" })
    expect(writeText).toHaveBeenCalledWith(VALUE)
    expect(button).toHaveTextContent("Copied")
    const region = document.querySelector('[aria-live="polite"]')
    expect(region).toHaveTextContent("Copied")
  })

  it("selects the value when the clipboard refuses", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")))
    render(<CopyField value={VALUE} />)

    fireEvent.click(screen.getByRole("button", { name: "Copy" }))

    await waitFor(() => expect(window.getSelection()?.toString()).toBe(VALUE))
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  })

  it("reads its labels from LabelsProvider", () => {
    render(
      <LabelsProvider labels={{ copyField: { copy: "Copier" } }}>
        <CopyField value={VALUE} />
      </LabelsProvider>
    )
    expect(screen.getByRole("button", { name: "Copier" })).toBeInTheDocument()
  })

  it("forwards className to the wrapper", () => {
    render(<CopyField value={VALUE} className="mt-2" data-testid="field" />)
    expect(screen.getByTestId("field")).toHaveClass("mt-2")
  })
})
