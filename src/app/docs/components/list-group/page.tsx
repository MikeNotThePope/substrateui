import { CreditCard, Settings, User } from "lucide-react"
import { ListGroup, ListGroupItem } from "@/components/ui/list-group"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const props: PropDef[] = [
  { name: "ListGroup", type: "React.ComponentProps<'div'>", default: undefined, description: "The bordered, divided container." },
  { name: "ListGroupItem.active", type: "boolean", default: undefined, description: "Marks the row as the current selection." },
  { name: "ListGroupItem.disabled", type: "boolean", default: undefined, description: "Dims the row and blocks interaction." },
  { name: "ListGroupItem.render", type: "React.ReactElement", default: undefined, description: "Render as a link or button, e.g. render={<Link href=\"…\" />} or render={<button />}." },
]

export default function ListGroupPage() {
  return (
    <DocPage
      title="List Group"
      description="A bordered, divided list of items, links, or buttons inside a single element. Use render to turn rows into router links or buttons; interactive rows get hover and focus affordances automatically."
    >
      <Stack gap="md">
        <H3>Static items</H3>
        <ComponentPreview
          code={`<ListGroup>
  <ListGroupItem>Profile</ListGroupItem>
  <ListGroupItem active>Settings</ListGroupItem>
  <ListGroupItem>Messages</ListGroupItem>
  <ListGroupItem disabled>Billing (coming soon)</ListGroupItem>
</ListGroup>`}
        >
          <div className="w-72">
            <ListGroup>
              <ListGroupItem>Profile</ListGroupItem>
              <ListGroupItem active>Settings</ListGroupItem>
              <ListGroupItem>Messages</ListGroupItem>
              <ListGroupItem disabled>Billing (coming soon)</ListGroupItem>
            </ListGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Interactive rows</H3>
        <P>
          Pass <Code>render</Code> to render each row as a button or link. With a{" "}
          <Code>LinkProvider</Code> in place, <Code>render={`{<Link href="…" />}`}</Code>{" "}
          routes through your framework&apos;s client-side navigation.
        </P>
        <ComponentPreview
          code={`<ListGroup>
  <ListGroupItem render={<button type="button" />}><User /> Account</ListGroupItem>
  <ListGroupItem render={<button type="button" />} active><Settings /> Preferences</ListGroupItem>
  <ListGroupItem render={<a href="#" />}><CreditCard /> Payment methods</ListGroupItem>
</ListGroup>`}
        >
          <div className="w-72">
            <ListGroup>
              <ListGroupItem render={<button type="button" />}>
                <User /> Account
              </ListGroupItem>
              <ListGroupItem render={<button type="button" />} active>
                <Settings /> Preferences
              </ListGroupItem>
              <ListGroupItem render={<a href="#" />}>
                <CreditCard /> Payment methods
              </ListGroupItem>
            </ListGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
