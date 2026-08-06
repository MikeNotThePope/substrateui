import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Card",
  description: "A bordered container that groups related content. Six parts, one prop. The parts are layout only — they carry padding and rhythm, not behaviour.",
  route: "/docs/components/card",
})

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="A bordered container that groups related content. Six parts, one prop. The parts are layout only — they carry padding and rhythm, not behaviour."
    >
      <ComponentPreview
        code={`<Card>
  <CardHeader>
    <CardTitle>Project Update</CardTitle>
    <CardDescription>Latest status on the design system rollout.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>All core components have been implemented and tested. The team is now focused on documentation and integration guides for consuming applications.</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>`}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Project Update</CardTitle>
            <CardDescription>
              Latest status on the design system rollout.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              All core components have been implemented and tested. The team is
              now focused on documentation and integration guides for consuming
              applications.
            </p>
          </CardContent>
          <CardFooter>
            <Button>View Details</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <ImportLine
        names={[
          "Card",
          "CardHeader",
          "CardTitle",
          "CardDescription",
          "CardContent",
          "CardFooter",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          Every part is optional and order is yours. <Code>CardContent</Code> and{" "}
          <Code>CardFooter</Code> both drop their top padding so a stack of parts
          keeps one rhythm instead of doubling the gap at each seam.
        </P>
        <CompositionTree
          root="Card"
          nodes={[
            {
              name: "CardHeader",
              children: [{ name: "CardTitle" }, { name: "CardDescription" }],
            },
            { name: "CardContent" },
            { name: "CardFooter" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Interactive</H3>
        <P>
          <Code>interactive</Code> adds the affordances of a pressable surface:
          the border takes the ring colour, the card lifts 2px into a larger hard
          shadow, and a click seats it 3px down with the shadow removed. All of it
          collapses under <Code>prefers-reduced-motion</Code>.
        </P>
        <ComponentPreview
          code={`<Card interactive>
  <CardHeader>
    <CardTitle>Analytics</CardTitle>
    <CardDescription>View traffic and engagement.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-bold">12,340</p>
    <p className="text-sm text-muted-foreground">visits this month</p>
  </CardContent>
</Card>`}
        >
          <Cluster gap="md" className="w-full">
            <Card interactive className="flex-1 min-w-[240px]">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View traffic and engagement.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">12,340</p>
                <p className="text-sm text-muted-foreground">
                  visits this month
                </p>
              </CardContent>
            </Card>
            <Card interactive className="flex-1 min-w-[240px]">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue summary.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$8,420</p>
                <p className="text-sm text-muted-foreground">
                  up 12% from last month
                </p>
              </CardContent>
            </Card>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Holding a form</H3>
        <P>
          A card is a plain container, so a form inside it needs no special
          handling — <Code>CardContent</Code> takes the fields and{" "}
          <Code>CardFooter</Code> takes the submit.
        </P>
        <ComponentPreview
          code={`<Card>
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Enter your details to get started.</CardDescription>
  </CardHeader>
  <CardContent>
    <Stack gap="md">
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input placeholder="Your full name" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" placeholder="you@example.com" />
      </Field>
    </Stack>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Sign Up</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Enter your details to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input placeholder="Your full name" />
                </Field>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" placeholder="you@example.com" />
                </Field>
              </Stack>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign Up</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            <Code>interactive</Code> is styling and nothing else. It does not add{" "}
            <Code>tabIndex</Code>, a role, or a key handler, so a card carrying
            only an <Code>onClick</Code> is unreachable by keyboard and invisible
            to screen readers — it looks pressable to a mouse user and does not
            exist for anyone else.
          </P>
          <P>
            Put a real control inside instead. Wrap the title in a link, or give
            the card a button in its footer, and let the whole surface be
            decoration around it. Where the entire card must be one target, render
            it <Code>render=&lt;a&gt;</Code>-style as an anchor or button so the
            browser supplies focus, activation, and the announced role.
          </P>
          <P>
            <Code>CardTitle</Code> is a <Code>div</Code>, not a heading, so it adds
            no document outline. In a list of cards where the titles are the
            structure, pass a heading element to <Code>render</Code> or nest one
            inside — otherwise a screen-reader user cannot navigate between them.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>Card</Code> owns one prop. The other five parts add padding and
          rhythm and take no props of their own — every prop you pass, including{" "}
          <Code>className</Code>, <Code>ref</Code>, and any{" "}
          <Code>data-*</Code> attribute, goes straight to the underlying{" "}
          <Code>div</Code>. See{" "}
          <Code>React.ComponentPropsWithRef&lt;&quot;div&quot;&gt;</Code> for that
          surface; the composition tree above is the more useful map of what goes
          where.
        </P>
        <PropsTable
          props={[
            {
              name: "interactive",
              type: "boolean",
              default: "false",
              description:
                "Hover border highlight, 2px shadow lift, and a 3px press offset on click. Styling only — it does not make the card focusable or operable.",
            },
          ]}
        />
      </Stack>
    </DocPage>
  )
}
