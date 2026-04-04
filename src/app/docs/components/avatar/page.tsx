import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const avatarProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "Additional CSS classes. Use to override the default h-10 w-10 sizing.",
  },
]

const avatarImageProps: PropDef[] = [
  {
    name: "src",
    type: "string",
    required: true,
    description: "The image URL for the avatar.",
  },
  {
    name: "alt",
    type: "string",
    required: true,
    description: "Accessible alt text for the avatar image.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the image element.",
  },
]

const avatarFallbackProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description:
      "Fallback content shown while the image loads or when it fails. Typically initials.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes for the fallback container.",
  },
]

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="A circular container for user profile images with automatic fallback support. Shows initials or placeholder content when the image is unavailable."
    >
      {/* With Image */}
      <Stack gap="md">
        <H3>With Image</H3>
        <ComponentPreview
          code={`<Avatar>
  <AvatarImage
    src="https://github.com/shadcn.png"
    alt="User avatar"
  />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`}
        >
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </ComponentPreview>
      </Stack>

      {/* Fallback Only */}
      <Stack gap="md">
        <H3>Fallback Initials</H3>
        <ComponentPreview
          code={`<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`}
        >
          <Cluster gap="sm">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* Sizes */}
      <Stack gap="md">
        <H3>Custom Sizes</H3>
        <ComponentPreview
          code={`<Avatar className="h-8 w-8">
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>MD</AvatarFallback>
</Avatar>

<Avatar className="h-14 w-14">
  <AvatarFallback>LG</AvatarFallback>
</Avatar>

<Avatar className="h-20 w-20">
  <AvatarFallback>XL</AvatarFallback>
</Avatar>`}
        >
          <Cluster gap="sm" align="center">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback className="text-sm">MD</AvatarFallback>
            </Avatar>
            <Avatar className="h-14 w-14">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg">XL</AvatarFallback>
            </Avatar>
          </Cluster>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>

        <H3>Avatar</H3>
        <PropsTable props={avatarProps} />

        <H3>AvatarImage</H3>
        <PropsTable props={avatarImageProps} />

        <H3>AvatarFallback</H3>
        <PropsTable props={avatarFallbackProps} />
      </Stack>
    </DocPage>
  )
}
