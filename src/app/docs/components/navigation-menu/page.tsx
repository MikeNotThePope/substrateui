import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const navigationMenuProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "Additional CSS classes to apply to the navigation menu container.",
  },
]

export default function NavigationMenuPage() {
  return (
    <DocPage
      title="Navigation Menu"
      description="A horizontal bar of navigation links, for the top level of a site."
    >
      <Stack gap="md">
        <H3>Horizontal Navigation</H3>
        <ComponentPreview
          code={`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
        Documentation
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "NavigationMenu",
          "NavigationMenuList",
          "NavigationMenuItem",
          "NavigationMenuLink",
          "navigationMenuTriggerStyle",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="NavigationMenu"
          nodes={[
            {
              name: "NavigationMenuList",
              children: [
                {
                  name: "NavigationMenuItem",
                  children: [
                    { name: "NavigationMenuLink" },
                  ],
                },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={navigationMenuProps} />
      </Stack>
    </DocPage>
  )
}
