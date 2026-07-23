import { DocPage } from "../../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"

const cascadeExample = `:root { /* default light */ }
.dark { /* default dark — overrides :root */ }
[data-theme="ocean"] { /* ocean light */ }
[data-theme="ocean"].dark { /* ocean dark */ }`

const enableExample = `<html data-theme="ocean">
  <body className={isDark ? "dark" : ""}>
    {children}
  </body>
</html>`

const addThemeExample = `/* 1. Raw palette (OKLCH, 50–950 ramp) */
:root {
  --raw-ocean-50:  oklch(0.97 0.02 220);
  /* ...down to --raw-ocean-950 */
}

/* 2. Semantic mapping — light */
[data-theme="ocean"] {
  --background: var(--raw-ocean-50);
  --foreground: var(--raw-ocean-900);
  --primary: var(--raw-ocean-600);
  /* ...mirror every semantic token from :root */
}

/* 3. Semantic mapping — dark */
[data-theme="ocean"].dark {
  --background: var(--raw-ocean-950);
  --foreground: var(--raw-ocean-100);
  --primary: var(--raw-ocean-500);
  /* ...mirror every semantic token from .dark */
}`

export default function ThemesPage() {
  return (
    <DocPage
      title="Themes"
      description="SubstrateUI's token architecture supports multiple brand themes that layer on top of light/dark mode. Same components, same behaviors, different colors."
    >
      <Stack gap="md">
        <H3>Why multi-theme matters</H3>
        <P>
          The token architecture is designed so consuming apps can ship with
          their own brand palette without forking components. A theme is a
          remapping of semantic tokens — the component library never knows
          which theme is active; it just renders with whatever values the
          cascade resolves to. This means a single component ships once and
          works correctly across every theme a consumer chooses to build.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>How themes work</H3>
        <P>
          Themes and modes are orthogonal axes. The theme attribute selects
          the palette; the <Code>.dark</Code> class toggles the mode within
          that palette. Cascade order:
        </P>
        <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto rounded-md" dir="ltr">
          <code>{cascadeExample}</code>
        </pre>
        <P>
          The default theme is <Code>:root</Code> (no attribute required).
          Alternative themes attach via <Code>[data-theme=&quot;...&quot;]</Code>{" "}
          on the <Code>&lt;html&gt;</Code> element. Because theme selectors
          come after the default declarations in the stylesheet, they win
          on specificity ties — and the compound selector{" "}
          <Code>[data-theme=&quot;ocean&quot;].dark</Code> beats plain{" "}
          <Code>.dark</Code> for theme-specific dark overrides.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>How to enable a theme in your app</H3>
        <P>
          Set the <Code>data-theme</Code> attribute on <Code>&lt;html&gt;</Code>{" "}
          and toggle <Code>dark</Code> as you normally would:
        </P>
        <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto rounded-md" dir="ltr">
          <code>{enableExample}</code>
        </pre>
        <P>
          These docs include a theme picker at the top of every page — switch
          between themes, then toggle light/dark and LTR/RTL to
          see all combinations in action.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>How to add your own theme</H3>
        <P>Three additions to <Code>tokens.css</Code> give you a new theme:</P>
        <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto rounded-md" dir="ltr">
          <code>{addThemeExample}</code>
        </pre>
        <P>
          Mirror every semantic token that exists in <Code>:root</Code> inside
          your theme&apos;s light block, and every token from <Code>.dark</Code>{" "}
          inside your theme&apos;s dark block. Missing mappings fall through to
          the default theme and create subtle cross-theme bugs. Then run{" "}
          <Code>bun run audit:contrast</Code> to verify WCAG AA compliance
          across every pairing, and test both modes visually.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Contrast is theme-specific</H3>
        <P>
          Every theme must independently pass WCAG AA. A palette that works
          beautifully in light mode may fail its dark counterpart — a green
          that reads well on white often becomes too bright against a dark
          background. The contrast audit iterates all themes in all modes
          and fails the build if any pairing drops below threshold. Adjust
          OKLCH lightness values in 0.05 increments until every row passes.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>What themes may vary — and what they may not</H3>
        <P>
          Beyond color, themes may override three <em>feel</em> tokens:{" "}
          <Code>--motion-duration</Code> and <Code>--motion-ease</Code>{" "}
          (re-time every component transition that doesn&apos;t set an
          explicit duration/easing utility) and{" "}
          <Code>--radius-factor</Code> (scales every corner radius from a
          single multiplier). The lava theme uses all three to feel molten
          rather than merely recolored: slower, viscous ease-out motion,
          corners swollen 1.5x, and hard shadows tinted deep magma instead
          of gray.
        </P>
        <P>
          Semantic token names, the spacing scale, and the typography scale
          stay constant across themes. Those are structural — part of the
          system&apos;s identity, not the brand&apos;s. If you find yourself
          needing per-theme spacing or typography, you&apos;ve conflated
          brand identity with system structure; rethink the abstraction
          before forking it.
        </P>
      </Stack>
    </DocPage>
  )
}
