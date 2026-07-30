import { DocPage } from "../../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { H3, H4, P, Code } from "@/components/ui/typography"

const themeDna = [
  {
    name: "Plum",
    keywords: "Warm, tactile, confident, grounded, friendly-but-serious.",
    feels: "Quality stationery — cream paper, saturated ink, edges you can run a thumb over.",
    not: [
      "Cold or clinical — every neutral is warm; never introduce pure or blue-tinted grays",
      "Glassy or floaty — no blur, no translucency, no soft elevation; depth is borders and hard offset shadows",
      "Flat minimalism — nothing borderless; components wear their 2px borders proudly",
      "Neon — plum is ink, not electricity; amber is the only accent that shouts, and it's used sparingly",
    ],
  },
  {
    name: "Lava",
    keywords: "Volcanic, energetic, elemental, high-contrast.",
    feels: "Raw heat under a dark crust — cooled to the same hard edge as the rest of the set.",
    not: [
      "Soft — lava is hot, not molten; the geometry is the house cut corner and hard stop, same as every other theme",
      "Alarming — magma is heat, not danger; errors stay cherry red, so never use the primary for destructive actions",
      "Cyberpunk or neon — the palette is geological (magma, sulfur, basalt), never electric or glitchy",
      "Gray-shadowed — the hard shadow is tinted deep magma, embers under the crust; that tint is lava's one structural tell",
    ],
  },
  {
    name: "Proof",
    keywords: "Industrial, exact, printed, registered, legible.",
    feels: "A proof pulled off the press — process inks on cool stock, trim marks in the margin.",
    not: [
      "Corporate SaaS — cyan is a process ink, not a brand gradient; never fade it into anything",
      "Warm — the stock is deliberately cool (hue 264); cream paper belongs to plum",
      "Soft — corners are cut rather than rounded and motion stops hard; never add easing that floats",
      "Alarming — process magenta is brand furniture (marks, charts) and is never a status colour",
    ],
  },
  {
    name: "Substrate",
    keywords: "Measured, cold, instrumental, precise, quiet.",
    feels: "The instrument rather than the print — a dial settling on a reading.",
    not: [
      "Decorative — jade earns its place by marking state, not by looking pleasant",
      "Warm — graphite neutrals carry no cream; amber signals rather than decorates",
      "Bouncy — motion is a dial settling, never an overshoot",
      "Lava in green — the palette is cool and exact, never hot",
    ],
  },
  {
    name: "Tundra",
    keywords: "Cold, brittle, bright, sparse, quick.",
    feels: "Full daylight on ice — pale ground, hard edges, nothing lingering.",
    not: [
      "Cosy — frost neutrals stay blue; never warm them toward gray-beige",
      "Slow — motion is the quickest of the set; don't soften it to feel premium",
      "Rounded — corners are near-square (factor 0.15); rounding them erases the theme",
      "Pastel — rose is a cold signal, not a soft accent",
    ],
  },
]

/** One row per theme so the table scales as themes are added — the previous
 *  shape put each theme in its own column and only fitted two. */
const themeDiff = [
  ["Plum", "Plum ink", "Amber", "Warm gray (cream)", "140ms, hard stop", "Cut (0.25x)"],
  ["Proof", "Process cyan", "Process yellow", "Cool proof stock", "140ms, hard stop", "Cut (0.25x)"],
  ["Substrate", "Jade", "Instrument amber", "Graphite", "160ms, settling", "Softened (0.4x)"],
  ["Lava", "Magma — yellow→red as it deepens", "Sulfur yellow", "Basalt", "140ms, hard stop", "Cut (0.25x)"],
  ["Tundra", "Steel blue", "Cold rose", "Frost", "120ms, brittle", "Square (0.15x)"],
]

const cascadeExample = `:root { /* plum light — the default role */ }
.dark { /* plum dark — overrides :root */ }
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
        <H3>Theme DNA</H3>
        <P>
          Every theme is defined as much by what it refuses as by what it
          uses. The NOT-lists below keep the shipped themes from drifting
          from drifting toward each other — and set the bar for any theme you add.
        </P>
        {themeDna.map((theme) => (
          <Stack gap="sm" key={theme.name}>
            <H4>{theme.name}</H4>
            <P>
              <strong>Emotional keywords:</strong> {theme.keywords}{" "}
              <strong>Feels like:</strong> {theme.feels}
            </P>
            <P className="font-medium">This theme is NOT:</P>
            <ul className="list-disc ps-6 space-y-1 text-sm">
              {theme.not.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Stack>
        ))}
        <div className="border-2 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[14%]">Theme</TableHead>
                <TableHead>Primary</TableHead>
                <TableHead>Secondary</TableHead>
                <TableHead>Neutrals</TableHead>
                <TableHead>Motion</TableHead>
                <TableHead>Radius</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {themeDiff.map(([name, ...cells]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  {cells.map((cell) => (
                    <TableCell key={cell} className="text-sm">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Stack>

      <Stack gap="md">
        <H3>What themes may vary — and what they may not</H3>
        <P>
          Beyond color, themes may override three <em>feel</em> tokens:{" "}
          <Code>--motion-duration</Code> and <Code>--motion-ease</Code>{" "}
          (re-time every component transition that doesn&apos;t set an
          explicit duration/easing utility) and{" "}
          <Code>--radius-factor</Code> (scales every corner radius from a
          single multiplier). Use them sparingly. Plum, proof and lava all
          sit on the house baseline — a cut corner and a 140ms stop —
          because a theme should be recognisable across a room by its
          color; substrate slows and softens slightly, tundra goes quicker
          and squarer, and that spread is about as far as the feel tokens
          should travel.
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
