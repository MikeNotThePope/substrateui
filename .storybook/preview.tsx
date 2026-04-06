import * as React from "react"
import type { Preview, Decorator } from "@storybook/react-vite"

import "../src/app/globals.css"
import { DirectionProvider } from "../src/components/ui/direction"

type Theme = "light" | "dark"
type Direction = "ltr" | "rtl"
type Palette = "plum"

const applyRootAttributes = (theme: Theme, direction: Direction, palette: Palette) => {
  if (typeof document === "undefined") return
  const html = document.documentElement
  html.classList.toggle("dark", theme === "dark")
  html.setAttribute("dir", direction)
  if (palette === "plum") {
    html.removeAttribute("data-theme")
  } else {
    html.setAttribute("data-theme", palette)
  }
}

const SubstrateFrame = ({
  theme,
  direction,
  palette,
  children,
}: {
  theme: Theme
  direction: Direction
  palette: Palette
  children: React.ReactNode
}) => {
  React.useEffect(() => {
    applyRootAttributes(theme, direction, palette)
  }, [theme, direction, palette])

  // Apply immediately on first render so the first paint is correct.
  applyRootAttributes(theme, direction, palette)

  return (
    <DirectionProvider dir={direction}>
      <div className="bg-background text-foreground p-6 min-h-[120px]">
        {children}
      </div>
    </DirectionProvider>
  )
}

const withSubstrate: Decorator = (Story, context) => {
  const theme = context.globals.theme as Theme
  const direction = context.globals.direction as Direction
  const palette = context.globals.palette as Palette

  return (
    <SubstrateFrame theme={theme} direction={direction} palette={palette}>
      <Story />
    </SubstrateFrame>
  )
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light / dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      name: "Direction",
      description: "Text direction",
      defaultValue: "ltr",
      toolbar: {
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR" },
          { value: "rtl", title: "RTL" },
        ],
        dynamicTitle: true,
      },
    },
    palette: {
      name: "Palette",
      description: "Semantic palette",
      defaultValue: "plum",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "plum", title: "Plum" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    direction: "ltr",
    palette: "plum",
  },
  decorators: [withSubstrate],
  tags: ["autodocs"],
}

export default preview
