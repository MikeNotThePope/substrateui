import { ImageResponse } from "next/og"

import pkg from "../../package.json"

export const alt =
  "SubstrateUI — a themeable React design system. 75 components on OKLCH, Tailwind CSS v4 and Base UI."

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/*
 * Colours are the default (plum) theme's tokens, resolved to hex.
 *
 * Two constraints force the hex literals. Satori — the renderer behind
 * ImageResponse — parses a subset of CSS and does not evaluate oklch(), and
 * nothing here can read a CSS custom property anyway: this is a standalone
 * PNG, not a page under :root. The OKLCH source is named beside each value so
 * a token change can be traced back to what it should become here.
 *
 * The theme swatches are each theme's --primary, which is the one token a
 * reader can actually recognise a theme by.
 */
const BACKGROUND = "#f3efeb" // --raw-warm-100  oklch(0.954 0.007 68)
const FOREGROUND = "#1a1816" // --raw-warm-900  oklch(0.211 0.005 68)
const MUTED = "#7d766e" //     --raw-warm-500  oklch(0.570 0.015 71)
const HIGHLIGHT = "#d39407" // --raw-amber-500 oklch(0.711 0.147 78)

const THEMES: Array<[string, string]> = [
  ["proof", "#0072a4"], //     --raw-cyan-700   oklch(0.520 0.121 235)
  ["substrate", "#007e65"], // --raw-jade-700   oklch(0.520 0.121 175)
  ["lava", "#bf2400"], //      --raw-magma-700  oklch(0.52  0.195 35)
  ["tundra", "#1e6ea7"], //    --raw-steel-700  oklch(0.520 0.117 245)
  ["plum", "#7a3f96"], //      --raw-plum-600   oklch(0.480 0.145 314)
]

const version = "v" + pkg.version.split(".").slice(0, 2).join(".")

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BACKGROUND,
          color: FOREGROUND,
          // The system's signature is a heavy rule. At 1200px wide the 2px
          // border the site uses would vanish, so it is scaled, not dropped.
          borderBottom: `16px solid ${FOREGROUND}`,
          padding: "64px 80px 52px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
              fontWeight: 600,
            }}
          >
            {`SubstrateUI · ${version} · MIT`}
          </div>

          {/* Laid out as words rather than one string so the highlight behind
              "React" is a real box Satori can paint. The site draws it with an
              absolutely positioned span; that trick does not survive here. */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: 28,
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <span style={{ marginRight: 20 }}>A themeable</span>
            <span
              style={{
                marginRight: 20,
                padding: "0 14px 10px",
                background: HIGHLIGHT,
                color: FOREGROUND,
              }}
            >
              React
            </span>
            <span>design system.</span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              maxWidth: 880,
              fontSize: 28,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            75 components on OKLCH, Tailwind CSS v4 and Base UI. Five themes, light and dark, every
            colour pairing audited against WCAG AA.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginTop: 56 }}>
          {THEMES.map(([name, colour]) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  height: 56,
                  background: colour,
                  border: `4px solid ${FOREGROUND}`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  fontSize: 20,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: MUTED,
                  fontWeight: 600,
                }}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
