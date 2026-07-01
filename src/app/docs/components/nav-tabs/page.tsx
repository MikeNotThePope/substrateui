import { NavTabs, NavTabsLink } from "@/components/ui/nav-tabs"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const navTabsLinkProps: PropDef[] = [
  {
    name: "active",
    type: "boolean",
    default: undefined,
    description:
      "Marks this tab as the current one — draws the underline and sets aria-current=\"page\".",
  },
  {
    name: "disabled",
    type: "boolean",
    default: undefined,
    description: "Dims the tab and blocks interaction (aria-disabled).",
  },
  {
    name: "badge",
    type: "React.ReactNode",
    default: undefined,
    description: "Optional trailing count or status pill.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description:
      "Merge props onto the child element (e.g. a Next.js <Link>) instead of rendering an <a>, so the tab keeps soft navigation.",
  },
]

export default function NavTabsPage() {
  return (
    <DocPage
      title="NavTabs"
      description="A link-based tab bar for page-level navigation. Each tab is a real anchor, so pair it with server-driven routing (e.g. a ?tab= query param) to keep tabs bookmarkable and the back button working."
    >
      <Stack gap="md">
        <H3>Basic NavTabs</H3>
        <ComponentPreview
          code={`<NavTabs>
  <NavTabsLink href="?tab=applications" active>Applications</NavTabsLink>
  <NavTabsLink href="?tab=questionnaire" badge={2}>Questionnaire</NavTabsLink>
  <NavTabsLink href="?tab=faq" disabled>FAQ</NavTabsLink>
</NavTabs>`}
        >
          <div className="w-full">
            <NavTabs>
              <NavTabsLink href="#applications" active>
                Applications
              </NavTabsLink>
              <NavTabsLink href="#questionnaire" badge={2}>
                Questionnaire
              </NavTabsLink>
              <NavTabsLink href="#faq" disabled>
                FAQ
              </NavTabsLink>
            </NavTabs>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>With a Next.js Link</H3>
        <ComponentPreview
          code={`<NavTabs>
  <NavTabsLink asChild active>
    <Link href="?tab=applications">Applications</Link>
  </NavTabsLink>
  <NavTabsLink asChild>
    <Link href="?tab=faq">FAQ</Link>
  </NavTabsLink>
</NavTabs>`}
        >
          <div className="w-full">
            <NavTabs>
              <NavTabsLink asChild active>
                <a href="#applications">Applications</a>
              </NavTabsLink>
              <NavTabsLink asChild>
                <a href="#faq">FAQ</a>
              </NavTabsLink>
            </NavTabs>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>NavTabsLink API</H3>
        <PropsTable props={navTabsLinkProps} />
      </Stack>
    </DocPage>
  )
}
