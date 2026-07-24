import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ThemeGeneratorClient } from "./theme-generator-client"

export default function ThemeGeneratorPage() {
  return (
    <DocPage
      title="Theme Generator"
      description="Dial in a primary hue and chroma, watch the components recolor live, and copy a drop-in CSS override. Because SubstrateUI is a 3-layer OKLCH token system, retinting the whole suite — light and dark — is a handful of variables, not a fork."
    >
      <Stack gap="md">
        <ThemeGeneratorClient />
      </Stack>

      <Stack gap="md">
        <H3>How it works</H3>
        <P>
          The generator keeps the lightness of every semantic token fixed and
          rotates hue while scaling chroma. That preserves the contrast
          relationships the default theme was audited against, so a new hue stays
          WCAG-safe by construction. It only overrides <Code>--primary</Code>,{" "}
          <Code>--primary-border</Code>, <Code>--ring</Code>, and{" "}
          <Code>--accent</Code> — every component reads those through the token
          layer, so nothing else needs to change.
        </P>
      </Stack>
    </DocPage>
  )
}
