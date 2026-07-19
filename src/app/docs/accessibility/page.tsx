import Link from "next/link"
import { DocPage } from "../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"

export default function AccessibilityPage() {
  return (
    <DocPage
      title="Accessibility"
      description="How SubstrateUI approaches accessibility, what the system handles for you, and what you are still responsible for when you build on top of it."
    >
      <Stack gap="md">
        <H3>Philosophy</H3>
        <P>
          Accessibility is a baseline requirement for SubstrateUI, not an
          optional feature or a follow-up pass. Every primitive in the library
          is expected to be usable by keyboard, legible at WCAG AA contrast,
          and respectful of user motion preferences the moment you drop it
          into an application. The goal is that building accessibly should be
          the path of least resistance — you should have to go out of your way
          to produce an inaccessible interface.
        </P>
        <P>
          That said, a design system cannot make an application accessible on
          its own. Accessibility is a property of the whole experience: the
          components, the content they wrap, the structure of each page, and
          the way keyboard focus moves through a flow. SubstrateUI gives you a
          solid floor. The ceiling is up to you.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>What SubstrateUI Provides</H3>
        <P>
          Interactive components are built on Base UI primitives, which
          supply focus management, correct ARIA roles and states, keyboard
          navigation, and screen reader announcements out of the box. Overlays
          trap focus while open and restore it to the trigger on close.
          Menus and comboboxes follow the ARIA authoring practices for their
          respective patterns.
        </P>
        <P>
          Every token pairing in the color system is verified against WCAG AA
          contrast thresholds (4.5:1 for normal text, 3:1 for large text and
          UI elements) in both light and dark mode. The audit runs as part of
          the library build, so a regression in any token relationship fails
          the release. The current report is embedded in these docs at the{" "}
          <Link href="/docs/accessibility/contrast" className="underline">
            contrast matrix
          </Link>{" "}
          page.
        </P>
        <P>
          Motion respects the user&apos;s system preference. A global{" "}
          <Code>prefers-reduced-motion</Code> rule disables transitions,
          animations, and smooth scrolling when the operating system requests
          reduced motion, and individual components (notably the{" "}
          <Code>Button</Code> press-down) ship their own motion-reduce
          overrides so they remain static rather than jumpy.
        </P>
        <P>
          Semantic HTML is used wherever the primitive has a natural element
          counterpart: <Code>Fieldset</Code> and <Code>Legend</Code> render
          the real tags, <Code>Kbd</Code> renders <Code>&lt;kbd&gt;</Code>,{" "}
          <Code>FieldError</Code> uses <Code>role=&quot;alert&quot;</Code>{" "}
          so validation errors are announced as they appear, and every
          focusable element has a visible focus ring with at least a 3:1
          contrast against its background.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>What You Are Still Responsible For</H3>
        <P>
          Icon-only buttons need an <Code>aria-label</Code>. The library
          cannot guess what a lone <Code>&lt;Plus /&gt;</Code> icon is
          supposed to do — you have to tell it. The same applies to any
          interactive control whose meaning is communicated only through an
          icon or a color.
        </P>
        <P>
          Form fields need labels. Use <Code>Field</Code> with{" "}
          <Code>FieldLabel</Code> so the label is programmatically associated
          with its input; placeholder text is not a substitute, because it
          disappears the moment the user starts typing and usually fails
          contrast requirements.
        </P>
        <P>
          Heading hierarchy belongs to your pages, not to the system. Use one{" "}
          <Code>H1</Code> per page, follow it with <Code>H2</Code>, and
          don&apos;t skip levels to chase a visual size. Screen reader users
          navigate by heading structure, and a scrambled outline makes a page
          hard to understand even when every individual component is perfect.
        </P>
        <P>
          Finally, test with assistive technology. Run through the app with
          the keyboard only. Turn on VoiceOver or NVDA and listen to what
          your flows actually sound like. No automated audit can replace
          hearing your own interface read aloud.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Testing Your App</H3>
        <P>
          The minimum viable accessibility pass on any new screen is a
          keyboard-only walkthrough: tab through every interactive element,
          make sure focus is always visible, confirm that Enter and Space
          activate controls appropriately, and verify that Escape closes
          overlays and returns focus to the trigger.
        </P>
        <P>
          Beyond that, test with a screen reader — VoiceOver on macOS and
          iOS, NVDA on Windows, TalkBack on Android — and listen for missing
          labels, unannounced state changes, and reading order that
          doesn&apos;t match the visual order. Zoom the browser to 200% and
          confirm the layout still works. Enable the system reduced-motion
          preference and watch for components that keep animating anyway.
          Toggle dark mode and make sure nothing you&apos;ve built depends
          on a light-mode-only assumption.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Touch Targets</H3>
        <P>
          WCAG 2.5.5 recommends a minimum touch target of 44×44 CSS pixels.
          The default <Code>Button</Code> height in SubstrateUI is 40px,
          which is comfortable on a desktop pointer-driven interface but
          sits just below the WCAG target on touch. For mobile-primary
          contexts — the key action in a sheet, the submit of a mobile
          form, a tap target surrounded by empty space on a small screen —
          prefer <Code>size=&quot;lg&quot;</Code>, which is 44px and meets
          the guideline.
        </P>
        <P>
          The same principle applies to icon-only buttons and any custom
          interactive element you build: give touch users enough room to
          land their thumb without misfiring on a neighbor.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Contrast Matrix</H3>
        <P>
          The full contrast audit — every token pairing, measured in both
          light and dark mode against the WCAG AA threshold for its usage
          type — is published at the{" "}
          <Link href="/docs/accessibility/contrast" className="underline">
            contrast matrix
          </Link>{" "}
          page. If you extend the token system with custom colors, add your
          pairings to the audit script so the same guarantee extends to
          them.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Known Limitations</H3>
        <P>
          SubstrateUI does not yet ship automated screen reader testing or
          ESLint rules for accessibility. Contribution is gated by the
          contrast audit and a manual review checklist (see{" "}
          <Code>CONTRIBUTING.md</Code>), and a11y regressions should be
          caught in review rather than by tooling. Adding{" "}
          <Code>axe-core</Code> to the documentation build and{" "}
          <Code>eslint-plugin-jsx-a11y</Code> to the lint config are
          reasonable next steps for consuming applications.
        </P>
      </Stack>
    </DocPage>
  )
}
