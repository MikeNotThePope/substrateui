import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const tabsProps: PropDef[] = [
  {
    name: "defaultValue",
    type: "string",
    default: undefined,
    description:
      "The value of the tab that should be active when initially rendered. Use when you do not need to control the active tab.",
  },
  {
    name: "value",
    type: "string",
    default: undefined,
    description:
      "The controlled value of the currently active tab. Must be used with onValueChange.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    default: undefined,
    description:
      "Callback fired when the active tab changes. Receives the new tab value.",
  },
]

export default function TabsPage() {
  return (
    <DocPage
      title="Tabs"
      description="A set of layered panels where only one panel is visible at a time. Ideal for organizing related content into switchable sections."
    >
      <Stack gap="md">
        <H3>Basic Tabs</H3>
        <ComponentPreview
          code={`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Manage your account settings and preferences.
  </TabsContent>
  <TabsContent value="password">
    Update your password and security options.
  </TabsContent>
  <TabsContent value="notifications">
    Configure how you receive notifications.
  </TabsContent>
</Tabs>`}
        >
          <div className="w-full">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4 text-sm text-muted-foreground">
                Manage your account settings and preferences.
              </TabsContent>
              <TabsContent value="password" className="p-4 text-sm text-muted-foreground">
                Update your password and security options.
              </TabsContent>
              <TabsContent value="notifications" className="p-4 text-sm text-muted-foreground">
                Configure how you receive notifications.
              </TabsContent>
            </Tabs>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={tabsProps} />
      </Stack>
    </DocPage>
  )
}
