import * as React from "react"
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DirectionProvider } from "@/components/ui/direction"

// ─── A matchMedia that can be moved across a breakpoint ──────────────
//
// tests/unit/setup.ts installs a matchMedia that answers `false` to
// everything and never fires. Both halves matter here: `unstackAt` reads a
// min-width query, and crossing that query at runtime is the behaviour under
// test, so this file installs one that answers from a width it owns and
// notifies its listeners when that width changes.

const REM = 16
let viewportWidth = 375
let listeners = new Set<() => void>()

function installMatchMedia() {
  viewportWidth = 375
  listeners = new Set()
  window.matchMedia = ((query: string) => {
    const match = /\(min-width:\s*([\d.]+)rem\)/.exec(query)
    const min = match ? Number.parseFloat(match[1]) * REM : 0
    return {
      get matches() {
        return viewportWidth >= min
      },
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_type: string, listener: () => void) => {
        listeners.add(listener)
      },
      removeEventListener: (_type: string, listener: () => void) => {
        listeners.delete(listener)
      },
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  }) as typeof window.matchMedia
}

/** Move the viewport and let every subscriber hear about it. */
function setViewportWidth(width: number) {
  act(() => {
    viewportWidth = width
    for (const listener of listeners) listener()
  })
}

const PHONE = 375
const DESKTOP = 1280

beforeEach(() => {
  installMatchMedia()
})

// ─── Specimens ───────────────────────────────────────────────────────

function Review({ unstackAt = "lg" as const, ...props }: { unstackAt?: "lg"; headingLevel?: 2 | 3 | 4 | 5 | 6 }) {
  return (
    <Tabs defaultValue="resume" unstackAt={unstackAt} {...props}>
      <TabsList>
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">Resume body</TabsContent>
      <TabsContent value="notes">Notes body</TabsContent>
      <TabsContent value="history">History body</TabsContent>
    </Tabs>
  )
}

describe("Tabs without unstackAt", () => {
  it("is the Base UI tablist it has always been", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account body</TabsContent>
        <TabsContent value="password">Password body</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(screen.getAllByRole("tab")).toHaveLength(2)
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Account body")
  })

  it("does not unstack at any width", () => {
    render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account body</TabsContent>
        <TabsContent value="password">Password body</TabsContent>
      </Tabs>
    )

    setViewportWidth(DESKTOP)

    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(screen.queryByRole("region")).not.toBeInTheDocument()
  })
})

describe("Tabs stacked, below unstackAt", () => {
  beforeEach(() => {
    viewportWidth = PHONE
  })

  it("is the APG tabs pattern", () => {
    render(<Review />)

    const list = screen.getByRole("tablist")
    expect(list).toBeInTheDocument()

    const tabs = screen.getAllByRole("tab")
    expect(tabs.map((tab) => tab.textContent)).toEqual(["Resume", "Notes", "History"])
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
    expect(tabs[1]).toHaveAttribute("aria-selected", "false")
  })

  it("wires aria-controls and aria-labelledby both ways", () => {
    render(<Review />)

    const tab = screen.getAllByRole("tab")[0]
    const panel = screen.getByRole("tabpanel")

    expect(tab).toHaveAttribute("aria-controls", panel.id)
    expect(panel).toHaveAttribute("aria-labelledby", tab.id)
    expect(tab.id).toBeTruthy()
    expect(panel.id).toBeTruthy()
  })

  it("names the panel with the tab, for a screen reader", () => {
    render(<Review />)
    expect(screen.getByRole("tabpanel", { name: "Resume" })).toBeInTheDocument()
  })

  it("keeps a roving tabIndex: one tab stop for the whole list", () => {
    render(<Review />)

    const tabs = screen.getAllByRole("tab")
    expect(tabs.map((tab) => tab.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"])
  })

  it("moves focus with ArrowRight and ArrowLeft, and wraps", async () => {
    const user = userEvent.setup()
    render(<Review />)

    const tabs = screen.getAllByRole("tab")
    tabs[0].focus()

    await user.keyboard("{ArrowRight}")
    expect(tabs[1]).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(tabs[2]).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(tabs[0]).toHaveFocus()
    await user.keyboard("{ArrowLeft}")
    expect(tabs[2]).toHaveFocus()
  })

  it("jumps to the ends with Home and End", async () => {
    const user = userEvent.setup()
    render(<Review />)

    const tabs = screen.getAllByRole("tab")
    tabs[0].focus()

    await user.keyboard("{End}")
    expect(tabs[2]).toHaveFocus()
    await user.keyboard("{Home}")
    expect(tabs[0]).toHaveFocus()
  })

  it("follows the reading direction, not the arrow's name", async () => {
    const user = userEvent.setup()
    render(
      <DirectionProvider dir="rtl">
        <Review />
      </DirectionProvider>
    )

    const tabs = screen.getAllByRole("tab")
    tabs[0].focus()

    await user.keyboard("{ArrowLeft}")
    expect(tabs[1]).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(tabs[0]).toHaveFocus()
  })

  it("selects on Enter, not on arrow focus", async () => {
    const user = userEvent.setup()
    render(<Review />)

    const tabs = screen.getAllByRole("tab")
    tabs[0].focus()

    await user.keyboard("{ArrowRight}")
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")

    await user.keyboard("{Enter}")
    expect(tabs[1]).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Notes body")
  })

  it("selects on arrow focus when the list asks for it", async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="resume" unstackAt="lg">
        <TabsList activateOnFocus>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">Resume body</TabsContent>
        <TabsContent value="notes">Notes body</TabsContent>
      </Tabs>
    )

    screen.getAllByRole("tab")[0].focus()
    await user.keyboard("{ArrowRight}")

    expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true")
  })

  it("skips a disabled tab", async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="resume" unstackAt="lg">
        <TabsList>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="notes" disabled>
            Notes
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">Resume body</TabsContent>
        <TabsContent value="notes">Notes body</TabsContent>
        <TabsContent value="history">History body</TabsContent>
      </Tabs>
    )

    const tabs = screen.getAllByRole("tab")
    tabs[0].focus()
    await user.keyboard("{ArrowRight}")

    expect(tabs[2]).toHaveFocus()
  })

  it("reports the value that was picked", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Tabs defaultValue="resume" unstackAt="lg" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">Resume body</TabsContent>
        <TabsContent value="notes">Notes body</TabsContent>
      </Tabs>
    )

    await user.click(screen.getByRole("tab", { name: "Notes" }))

    expect(onValueChange).toHaveBeenCalledWith("notes")
  })

  it("can be controlled", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Tabs value="resume" unstackAt="lg" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">Resume body</TabsContent>
        <TabsContent value="notes">Notes body</TabsContent>
      </Tabs>
    )

    await user.click(screen.getByRole("tab", { name: "Notes" }))

    expect(onValueChange).toHaveBeenCalledWith("notes")
    expect(screen.getByRole("tab", { name: "Resume" })).toHaveAttribute("aria-selected", "true")
  })

  it("keeps every pane mounted, so no breakpoint arrives to an empty panel", () => {
    render(<Review />)

    expect(screen.getByText("Notes body")).toBeInTheDocument()
    expect(screen.getByText("History body")).toBeInTheDocument()
  })
})

describe("Tabs unstacked, at and above unstackAt", () => {
  beforeEach(() => {
    viewportWidth = DESKTOP
  })

  it("reports no tabs at all — there is no tablist, no tab and no tabpanel", () => {
    render(<Review />)

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
    expect(screen.queryAllByRole("tab")).toHaveLength(0)
    expect(screen.queryAllByRole("tabpanel")).toHaveLength(0)
  })

  it("reports each pane as a region named by its own label", () => {
    render(<Review />)

    expect(screen.getByRole("region", { name: "Resume" })).toHaveTextContent("Resume body")
    expect(screen.getByRole("region", { name: "Notes" })).toHaveTextContent("Notes body")
    expect(screen.getByRole("region", { name: "History" })).toHaveTextContent("History body")
  })

  it("turns each label into a heading", () => {
    render(<Review />)

    expect(screen.getByRole("heading", { level: 3, name: "Resume" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Notes" })).toBeInTheDocument()
  })

  it("takes the heading level from the caller, because only they know the outline", () => {
    render(<Review headingLevel={2} />)

    expect(screen.getByRole("heading", { level: 2, name: "Resume" })).toBeInTheDocument()
  })

  it("labels each pane with the same element the tab did", () => {
    viewportWidth = PHONE
    render(<Review />)
    const stackedIds = screen.getAllByRole("tab").map((tab) => tab.id)

    setViewportWidth(DESKTOP)
    const unstackedIds = screen
      .getAllByRole("region")
      .map((pane) => pane.getAttribute("aria-labelledby"))

    expect(unstackedIds).toEqual(stackedIds)
    expect(stackedIds.every(Boolean)).toBe(true)
  })

  it("hides no pane: the stylesheet reveals them and nothing marks them hidden", () => {
    render(<Review />)

    for (const pane of screen.getAllByRole("region")) {
      expect(pane).not.toHaveAttribute("hidden")
      expect(pane).not.toHaveAttribute("inert")
      // The class that hides an inactive pane below the breakpoint carries
      // its own undoing at it.
      if (/(^|\s)hidden(\s|$)/.test(pane.className)) {
        expect(pane.className).toMatch(/(^|\s)lg:block(\s|$)/)
      }
    }
  })
})

describe("Tabs crossing unstackAt", () => {
  it("swaps the pattern in both directions", () => {
    viewportWidth = PHONE
    render(<Review />)

    expect(screen.getByRole("tablist")).toBeInTheDocument()

    setViewportWidth(DESKTOP)
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
    expect(screen.getAllByRole("region")).toHaveLength(3)

    setViewportWidth(PHONE)
    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(screen.queryAllByRole("region")).toHaveLength(0)
  })

  it("does not throw away what is inside a pane", async () => {
    const user = userEvent.setup()
    viewportWidth = PHONE
    render(
      <Tabs defaultValue="notes" unstackAt="lg">
        <TabsList>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">Resume body</TabsContent>
        <TabsContent value="notes">
          <input aria-label="Note" defaultValue="" />
        </TabsContent>
      </Tabs>
    )

    await user.type(screen.getByLabelText("Note"), "half a sentence")
    expect(screen.getByLabelText("Note")).toHaveValue("half a sentence")

    setViewportWidth(DESKTOP)

    expect(screen.getByLabelText("Note")).toHaveValue("half a sentence")
  })
})

describe("Tabs unstackAt on the server", () => {
  it("claims nothing it cannot know: no tablist in the HTML", async () => {
    const { renderToString } = await import("react-dom/server")
    const html = renderToString(<Review />)

    expect(html).not.toContain('role="tablist"')
    expect(html).not.toContain('role="tab"')
    expect(html).not.toContain('role="tabpanel"')
  })

  it("ships the regions, and the panes the breakpoint will need", async () => {
    const { renderToString } = await import("react-dom/server")
    const html = renderToString(<Review />)

    expect(html.match(/role="region"/g)).toHaveLength(3)
    expect(html).toContain("Notes body")
    expect(html).toContain("History body")
    // Hiding an inactive pane before the width is known is the stylesheet's
    // job — the attribute would still be there at desktop.
    expect(html).not.toContain(" hidden=")
    expect(html).not.toContain(" inert=")
  })
})

describe("Tabs unstackAt misuse", () => {
  it("says so when it is given no pane to start on", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    expect(() =>
      render(
        <Tabs unstackAt="lg">
          <TabsList>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>
          <TabsContent value="resume">Resume body</TabsContent>
        </Tabs>
      )
    ).toThrow(/unstackAt/)
    error.mockRestore()
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})
