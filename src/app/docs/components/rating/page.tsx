"use client"

import * as React from "react"
import { Rating } from "@/components/ui/rating"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const props: PropDef[] = [
  { name: "value", type: "number", default: "0", description: "Current rating. Fractional values (e.g. 3.5) fill partially in read-only mode." },
  { name: "max", type: "number", default: "5", description: "Number of stars." },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Star size." },
  { name: "onValueChange", type: "(value: number) => void", default: undefined, description: "When provided, stars become interactive and this fires with the chosen value (1..max)." },
  { name: "readOnly", type: "boolean", default: undefined, description: "Force a non-interactive display even with a handler." },
  { name: "label", type: "string", default: '"Rating"', description: "Accessible label for the group." },
]

function InteractiveDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <Cluster gap="sm" align="center">
      <Rating value={value} onValueChange={setValue} />
      <span className="font-mono text-sm text-muted-foreground">{value}/5</span>
    </Cluster>
  )
}

export default function RatingPage() {
  return (
    <DocPage
      title="Rating"
      description="A star rating — a fractional-fill display for aggregate scores, or an interactive input when you pass a change handler. Filled stars use the amber secondary fill."
    >
      <Stack gap="md">
        <H3>Display</H3>
        <ComponentPreview
          code={`<Rating value={4} readOnly />
<Rating value={3.5} readOnly />`}
        >
          <Stack gap="sm">
            <Rating value={4} readOnly />
            <Rating value={3.5} readOnly />
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Sizes</H3>
        <ComponentPreview
          code={`<Rating value={4} size="sm" readOnly />
<Rating value={4} size="md" readOnly />
<Rating value={4} size="lg" readOnly />`}
        >
          <Stack gap="sm">
            <Rating value={4} size="sm" readOnly />
            <Rating value={4} size="md" readOnly />
            <Rating value={4} size="lg" readOnly />
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Interactive</H3>
        <ComponentPreview
          code={`const [value, setValue] = React.useState(3)

<Rating value={value} onValueChange={setValue} />`}
        >
          <InteractiveDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The display variant exposes an <code>img</code> role with a label like
          &quot;Rating: 4 out of 5&quot;. The interactive variant is a{" "}
          <code>radiogroup</code> of star buttons — each is keyboard focusable and
          labelled, and hover/focus preview the value before selection.
        </P>
      </Stack>
    </DocPage>
  )
}
