import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, renderHook } from "@testing-library/react"

import { useDisclosure } from "@/hooks/use-disclosure"
import { useToggle } from "@/hooks/use-toggle"
import { useCounter, usePrevious } from "@/hooks/use-misc"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useClipboard } from "@/hooks/use-clipboard"

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
