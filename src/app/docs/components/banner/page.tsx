"use client"

import { Banner } from "@/components/ui/banner"
import { Stack } from "@/components/ui/stack"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const props: PropDef[] = [
  { name: "variant", type: '"default" | "primary" | "info" | "warning"', default: '"default"', description: "Visual intent of the bar." },
  { name: "dismissible", type: "boolean", default: "true", description: "Show the dismiss button." },
  { name: "onDismiss", type: "() => void", default: undefined, description: "Fired after the user dismisses the banner." },
  { name: "dismissLabel", type: "string", default: '"Dismiss"', description: "Accessible label for the dismiss button." },
  { name: "className", type: "string", default: undefined, description: "Add `sticky top-0 z-50` to pin it to the top of the viewport." },
]

export default function BannerPage() {
  return (
    <DocPage
      title="Banner"
      description="A full-width announcement bar for site-wide messages — new releases, cookie notices, promotions. Dismissible and sticky-friendly: pin it to the top of the viewport with a sticky utility class."
    >
      <Stack gap="md">
        <H3>Variants</H3>
        <ComponentPreview
          code={`<Banner variant="primary">
  <p>SubstrateUI v1.3 is out. <a href="#" className="underline">See what's new</a>.</p>
</Banner>`}
        >
          <div className="w-full overflow-hidden rounded-md border-2 border-border">
            <Banner variant="default">
              <p>
                A new component just landed.{" "}
                <a href="#" className="font-semibold underline underline-offset-4">Read the docs</a>.
              </p>
            </Banner>
            <Banner variant="primary">
              <p>
                SubstrateUI v1.3 is out.{" "}
                <a href="#" className="font-semibold underline underline-offset-4">See what&apos;s new</a>.
              </p>
            </Banner>
            <Banner variant="info">
              <p>We use cookies to improve your experience.</p>
            </Banner>
            <Banner variant="warning">
              <p>Scheduled maintenance this Sunday at 02:00 UTC.</p>
            </Banner>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The banner is a labelled <code>region</code>, so screen-reader users can
          navigate to and from it. The dismiss control is a real button with an
          accessible label; once dismissed, the banner unmounts and returns focus
          to the normal flow.
        </P>
      </Stack>
    </DocPage>
  )
}
