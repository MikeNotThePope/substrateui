import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, render, renderHook, screen } from "@testing-library/react"

import { useDisclosure } from "@/hooks/use-disclosure"
import { useToggle } from "@/hooks/use-toggle"
import { useCounter, usePrevious } from "@/hooks/use-misc"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useClipboard } from "@/hooks/use-clipboard"
import {
  useAnnouncer,
  announce,
  clearAnnouncer,
  destroyAnnouncer,
} from "@/hooks/use-announcer"

describe("useDisclosure", () => {
  it("opens, closes, and toggles", () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current[0]).toBe(false)

    act(() => result.current[1].open())
    expect(result.current[0]).toBe(true)

    act(() => result.current[1].close())
    expect(result.current[0]).toBe(false)

    act(() => result.current[1].toggle())
    expect(result.current[0]).toBe(true)
  })

  it("fires onOpen/onClose callbacks", () => {
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const { result } = renderHook(() => useDisclosure(false, { onOpen, onClose }))

    act(() => result.current[1].open())
    act(() => result.current[1].open()) // already open — no second call
    expect(onOpen).toHaveBeenCalledTimes(1)

    act(() => result.current[1].close())
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe("useToggle", () => {
  it("cycles through options and jumps to a value", () => {
    const { result } = renderHook(() => useToggle(["ltr", "rtl"] as const))
    expect(result.current[0]).toBe("ltr")

    act(() => result.current[1]())
    expect(result.current[0]).toBe("rtl")

    act(() => result.current[1]())
    expect(result.current[0]).toBe("ltr")

    act(() => result.current[1]("rtl"))
    expect(result.current[0]).toBe("rtl")
  })
})

describe("useCounter", () => {
  it("increments and clamps to bounds", () => {
    const { result } = renderHook(() => useCounter(0, { min: 0, max: 2 }))
    act(() => result.current[1].decrement())
    expect(result.current[0]).toBe(0) // clamped at min

    act(() => result.current[1].increment())
    act(() => result.current[1].increment())
    act(() => result.current[1].increment())
    expect(result.current[0]).toBe(2) // clamped at max

    act(() => result.current[1].reset())
    expect(result.current[0]).toBe(0)
  })
})

describe("usePrevious", () => {
  it("returns the value from the previous render", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    })
    expect(result.current).toBeUndefined()

    rerender({ value: 2 })
    expect(result.current).toBe(1)

    rerender({ value: 3 })
    expect(result.current).toBe(2)
  })
})

describe("useDebouncedValue", () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it("updates only after the delay elapses", () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 200), {
      initialProps: { value: "a" },
    })
    expect(result.current).toBe("a")

    rerender({ value: "ab" })
    expect(result.current).toBe("a") // not yet

    act(() => vi.advanceTimersByTime(200))
    expect(result.current).toBe("ab")
  })
})

describe("useLocalStorage", () => {
  beforeEach(() => window.localStorage.clear())

  it("reads, writes, and persists", () => {
    const { result } = renderHook(() => useLocalStorage("k", "default"))
    expect(result.current[0]).toBe("default")

    act(() => result.current[1]("next"))
    expect(result.current[0]).toBe("next")
    expect(JSON.parse(window.localStorage.getItem("k") as string)).toBe("next")
  })

  it("accepts an updater function", () => {
    const { result } = renderHook(() => useLocalStorage("n", 1))
    act(() => result.current[1]((prev) => prev + 1))
    expect(result.current[0]).toBe(2)
    expect(JSON.parse(window.localStorage.getItem("n") as string)).toBe(2)
  })

  it("hydrates from what is already stored instead of overwriting it", () => {
    window.localStorage.setItem("k", JSON.stringify("stored"))
    const { result } = renderHook(() => useLocalStorage("k", "default"))
    expect(result.current[0]).toBe("stored")
    expect(JSON.parse(window.localStorage.getItem("k") as string)).toBe("stored")
  })

  /**
   * Two *separate components* on one key — the documented cross-instance sync,
   * and the shape that broke. Both hooks inside a single renderHook callback
   * would not catch it: the warning is "update a component while rendering a
   * *different* component", so one component holding both instances stays
   * silent however wrong the hook is.
   */
  function Probe<T>({ id, next }: { id: string; next: T }) {
    const [value, setValue] = useLocalStorage<T>("shared", null as T)
    return (
      <button data-testid={id} onClick={() => setValue(next)}>
        {JSON.stringify(value)}
      </button>
    )
  }

  it("moves every instance on the key without setting state during render", () => {
    // The write and its storage event used to run inside the state updater,
    // which React may call during the render phase — so instance A's update set
    // state on instance B mid-render.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    try {
      render(
        <>
          <Probe id="one" next="b" />
          <Probe id="two" next="b" />
        </>
      )

      act(() => screen.getByTestId("one").click())

      expect(screen.getByTestId("one")).toHaveTextContent('"b"')
      expect(screen.getByTestId("two")).toHaveTextContent('"b"')
      expect(spy).not.toHaveBeenCalled()
    } finally {
      spy.mockRestore()
    }
  })

  it("settles instead of bouncing when the value is an object", () => {
    // JSON.parse returns a fresh object each time, so Object.is can never end
    // an echo between two instances — only the stored-value check can.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    try {
      render(
        <>
          <Probe id="one" next={{ n: 1 }} />
          <Probe id="two" next={{ n: 1 }} />
        </>
      )

      act(() => screen.getByTestId("one").click())

      expect(screen.getByTestId("one")).toHaveTextContent('{"n":1}')
      expect(screen.getByTestId("two")).toHaveTextContent('{"n":1}')
      expect(spy).not.toHaveBeenCalled()
    } finally {
      spy.mockRestore()
    }
  })
})

describe("useClipboard", () => {
  it("sets copied after a successful copy", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })

    const { result } = renderHook(() => useClipboard())
    await act(async () => {
      await result.current.copy("hello")
    })
    expect(writeText).toHaveBeenCalledWith("hello")
    expect(result.current.copied).toBe(true)
  })
})

describe("useAnnouncer / announce", () => {
  afterEach(() => {
    destroyAnnouncer()
  })

  function region(assertiveness: "assertive" | "polite") {
    return document.querySelector<HTMLElement>(
      `[data-substrateui-announcer] [aria-live="${assertiveness}"]`,
    )
  }

  it("creates one shared visually-hidden live region on first announce", () => {
    expect(document.querySelector("[data-substrateui-announcer]")).toBeNull()
    announce("hello")
    announce("again")
    expect(document.querySelectorAll("[data-substrateui-announcer]")).toHaveLength(1)
  })

  it("routes messages to the polite region by default and assertive on request", () => {
    announce("polite message")
    announce("urgent message", "assertive")
    expect(region("polite")?.textContent).toContain("polite message")
    expect(region("assertive")?.textContent).toContain("urgent message")
  })

  it("appends a fresh node per call so identical messages re-announce", () => {
    announce("saved", "polite")
    announce("saved", "polite")
    expect(region("polite")?.childElementCount).toBe(2)
  })

  it("clears a region on demand", () => {
    announce("keep me", "assertive")
    announce("clear me", "polite")
    clearAnnouncer("polite")
    expect(region("polite")?.childElementCount).toBe(0)
    expect(region("assertive")?.childElementCount).toBe(1)
  })

  it("exposes a stable { announce, clear } from useAnnouncer", () => {
    const { result, rerender } = renderHook(() => useAnnouncer())
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
    expect(result.current.announce).toBe(announce)
    expect(result.current.clear).toBe(clearAnnouncer)
  })
})
