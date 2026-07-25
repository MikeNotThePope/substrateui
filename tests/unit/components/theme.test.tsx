import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  BASE_THEME,
  ThemeRegistry,
  ThemeSelect,
  createTheme,
  themeInitScript,
  themeToCss,
  useTheme,
} from "@/components/ui/theme"

const ocean = createTheme({
  name: "ocean",
  tokens: { ring: "oklch(0.62 0.13 232)" },
  light: { primary: "oklch(0.45 0.12 232)" },
  dark: { primary: "oklch(0.72 0.13 232)" },
})

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute("data-theme")
})

describe("createTheme", () => {
  it("merges shared tokens into both schemes, with per-scheme overrides winning", () => {
    expect(ocean.light).toEqual({
      ring: "oklch(0.62 0.13 232)",
      primary: "oklch(0.45 0.12 232)",
    })
    expect(ocean.dark).toEqual({
      ring: "oklch(0.62 0.13 232)",
      primary: "oklch(0.72 0.13 232)",
    })
  })

  it("title-cases the name when no label is given", () => {
    expect(createTheme({ name: "deep_ocean-blue" }).label).toBe("Deep Ocean Blue")
    expect(createTheme({ name: "ocean", label: "Sea" }).label).toBe("Sea")
  })

  it("inherits from another theme and overrides only what it names", () => {
    const shallow = createTheme({
      name: "shallow",
      extends: ocean,
      light: { primary: "oklch(0.60 0.10 232)" },
    })
    expect(shallow.light.ring).toBe("oklch(0.62 0.13 232)")
    expect(shallow.light.primary).toBe("oklch(0.60 0.10 232)")
    // The source theme is untouched.
    expect(ocean.light.primary).toBe("oklch(0.45 0.12 232)")
  })

  it("rejects names that would not be safe in a CSS selector", () => {
    expect(() => createTheme({ name: 'x"] { color: red } [z' })).toThrow(
      /not a valid theme name/
    )
  })
})

describe("themeToCss", () => {
  it("emits a light block and a dark block scoped to the theme name", () => {
    const css = themeToCss(ocean)
    expect(css).toContain('[data-theme="ocean"] {')
    expect(css).toContain('[data-theme="ocean"].dark')
    expect(css).toContain("  --primary: oklch(0.45 0.12 232);")
    expect(css).toContain("  --primary: oklch(0.72 0.13 232);")
  })

  it("also targets a scoped element sitting inside a dark root", () => {
    expect(themeToCss(ocean)).toContain('.dark [data-theme="ocean"]')
  })

  it("normalizes token names that already carry the -- prefix", () => {
    const css = themeToCss(createTheme({ name: "t", light: { "--primary": "red" } }))
    expect(css).toContain("  --primary: red;")
    expect(css).not.toContain("----primary")
  })

  it("skips schemes with no tokens and accepts an array", () => {
    const lightOnly = createTheme({ name: "lightonly", light: { primary: "red" } })
    const css = themeToCss([lightOnly, ocean])
    expect(css).toContain('[data-theme="lightonly"] {')
    expect(css).not.toContain('[data-theme="lightonly"].dark')
    expect(css).toContain('[data-theme="ocean"].dark')
  })
})

describe("themeInitScript", () => {
  it("reads the storage key and falls back to the base theme", () => {
    const script = themeInitScript()
    expect(script).toContain('"substrateui-theme"')
    expect(script).toContain(`"${BASE_THEME}"`)
    expect(script).toContain("setAttribute")
  })

  it("escapes a custom storage key rather than interpolating it raw", () => {
    expect(themeInitScript({ storageKey: 'a"b' })).toContain('"a\\"b"')
  })
})

function Probe() {
  const { theme, resolvedTheme, themes } = useTheme()
  return (
    <p>
      {theme}/{resolvedTheme?.label ?? "none"}/{themes.length}
    </p>
  )
}

describe("ThemeRegistry", () => {
  it("applies the default theme to the document element", () => {
    render(
      <ThemeRegistry themes={[ocean]}>
        <Probe />
      </ThemeRegistry>
    )
    expect(document.documentElement).toHaveAttribute("data-theme", BASE_THEME)
    expect(screen.getByText("default/none/1")).toBeInTheDocument()
  })

  it("injects the themes' CSS into the head", () => {
    render(
      <ThemeRegistry themes={[ocean]}>
        <Probe />
      </ThemeRegistry>
    )
    const style = document.head.querySelector("style[data-substrateui-themes]")
    expect(style?.textContent).toContain('[data-theme="ocean"]')
  })

  it("skips injection when injectCss is off", () => {
    render(
      <ThemeRegistry themes={[ocean]} injectCss={false}>
        <Probe />
      </ThemeRegistry>
    )
    expect(document.head.querySelector("style[data-substrateui-themes]")).toBeNull()
  })

  it("restores a persisted theme on mount", () => {
    localStorage.setItem("substrateui-theme", "ocean")
    render(
      <ThemeRegistry themes={[ocean]}>
        <Probe />
      </ThemeRegistry>
    )
    expect(document.documentElement).toHaveAttribute("data-theme", "ocean")
    expect(screen.getByText("ocean/Ocean/1")).toBeInTheDocument()
  })

  it("ignores storage when persist is off", () => {
    localStorage.setItem("substrateui-theme", "ocean")
    render(
      <ThemeRegistry themes={[ocean]} defaultTheme="ocean" persist={false}>
        <Probe />
      </ThemeRegistry>
    )
    expect(document.documentElement).toHaveAttribute("data-theme", "ocean")

    localStorage.clear()
    expect(localStorage.getItem("substrateui-theme")).toBeNull()
  })

  it("themes a subtree without touching the document element when scoped", () => {
    render(
      <ThemeRegistry themes={[ocean]} defaultTheme="ocean" scoped persist={false}>
        <Probe />
      </ThemeRegistry>
    )
    expect(document.documentElement).not.toHaveAttribute("data-theme")
    expect(document.querySelector('[data-slot="theme-scope"]')).toHaveAttribute(
      "data-theme",
      "ocean"
    )
  })

  it("throws when useTheme is called outside a registry", () => {
    expect(() => render(<Probe />)).toThrow(/within a <ThemeRegistry>/)
  })
})

describe("ThemeSelect", () => {
  it("offers the base palette plus every registered theme", async () => {
    const user = userEvent.setup()
    render(
      <ThemeRegistry themes={[ocean]}>
        <ThemeSelect />
      </ThemeRegistry>
    )
    await user.click(screen.getByLabelText("Theme"))
    expect(await screen.findByRole("listbox")).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Default" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "Ocean" })).toBeInTheDocument()
  })

  it("hides the base palette when includeBase is off", async () => {
    const user = userEvent.setup()
    render(
      <ThemeRegistry themes={[ocean]} defaultTheme="ocean">
        <ThemeSelect includeBase={false} label="Palette" />
      </ThemeRegistry>
    )
    await user.click(screen.getByLabelText("Palette"))
    expect(await screen.findByRole("listbox")).toBeInTheDocument()
    expect(screen.queryByRole("option", { name: "Default" })).not.toBeInTheDocument()
  })

  it("switches the theme and persists the choice", async () => {
    const user = userEvent.setup()
    render(
      <ThemeRegistry themes={[ocean]}>
        <ThemeSelect />
        <Probe />
      </ThemeRegistry>
    )
    await user.click(screen.getByLabelText("Theme"))
    await user.click(await screen.findByRole("option", { name: "Ocean" }))

    await act(async () => {})
    expect(document.documentElement).toHaveAttribute("data-theme", "ocean")
    expect(localStorage.getItem("substrateui-theme")).toBe("ocean")
    expect(screen.getByText("ocean/Ocean/1")).toBeInTheDocument()
  })
})
