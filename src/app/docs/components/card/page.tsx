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
import { H3 } from "@/components/ui/typography"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"

export default function CardPage() {
  return (
    <DocPage
      title="Card"
      description="A bordered container for grouping related content into distinct sections with optional header, body, and footer areas."
    >
      {/* Basic Card */}
      <Stack gap="md">
        <H3>Basic Card</H3>
        <ComponentPreview
          title="Basic Card"
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
      </Stack>

      {/* Interactive Card */}
      <Stack gap="md">
        <H3>Interactive Card</H3>
        <ComponentPreview
          title="Interactive Card"
          code={`<Card interactive>
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
    <CardDescription>This card has hover and active states.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Use the interactive prop to add cursor, border, and shadow transitions on hover, plus a subtle press effect on click.</p>
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

      {/* Card with Form */}
      <Stack gap="md">
        <H3>Card with Form</H3>
        <ComponentPreview
          title="Card with Form"
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

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>

        <Stack gap="sm">
          <p className="font-semibold text-sm text-muted-foreground">Card</p>
          <PropsTable
            props={[
              {
                name: "interactive",
                type: "boolean",
                default: "false",
                description:
                  "Adds hover border highlight, shadow lift, and active press effect.",
              },
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes to apply to the card.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                description: "Card content, typically CardHeader, CardContent, and CardFooter.",
              },
            ]}
          />
        </Stack>

        <Stack gap="sm">
          <p className="font-semibold text-sm text-muted-foreground">
            CardHeader
          </p>
          <PropsTable
            props={[
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes for the header section.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                description:
                  "Header content, typically CardTitle and CardDescription.",
              },
            ]}
          />
        </Stack>

        <Stack gap="sm">
          <p className="font-semibold text-sm text-muted-foreground">
            CardTitle
          </p>
          <PropsTable
            props={[
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes for the title.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                description: "Title text content.",
              },
            ]}
          />
        </Stack>

        <Stack gap="sm">
          <p className="font-semibold text-sm text-muted-foreground">
            CardDescription
          </p>
          <PropsTable
            props={[
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes for the description.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                description: "Description text content.",
              },
            ]}
          />
        </Stack>

        <Stack gap="sm">
          <p className="font-semibold text-sm text-muted-foreground">
            CardContent
          </p>
          <PropsTable
            props={[
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes for the content area.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                description: "Main body content of the card.",
              },
            ]}
          />
        </Stack>

        <Stack gap="sm">
          <p className="font-semibold text-sm text-muted-foreground">
            CardFooter
          </p>
          <PropsTable
            props={[
              {
                name: "className",
                type: "string",
                description: "Additional CSS classes for the footer.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                description:
                  "Footer content, typically action buttons.",
              },
            ]}
          />
        </Stack>
      </Stack>
    </DocPage>
  )
}
