import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const inputOtpProps: PropDef[] = [
  {
    name: "maxLength",
    type: "number",
    default: undefined,
    description: "The total number of OTP slots.",
  },
  {
    name: "value",
    type: "string",
    default: undefined,
    description: "The controlled value of the OTP input.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    default: undefined,
    description: "Callback fired when the OTP value changes.",
  },
]

export default function InputOtpPage() {
  return (
    <DocPage
      title="Input OTP"
      description="A one-time-code input with one slot per character. Focus advances as you type, a paste fills every slot, and separators are yours to place."
    >
      {/* 6-Digit OTP */}
      <Stack gap="md">
        <H3>6-Digit OTP</H3>
        <ComponentPreview
          code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
        >
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "InputOTP",
          "InputOTPGroup",
          "InputOTPSlot",
          "InputOTPSeparator",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="InputOTP"
          nodes={[
            {
              name: "InputOTPGroup",
              children: [
                { name: "InputOTPSlot" },
              ],
            },
            { name: "InputOTPSeparator" },
          ]}
        />
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={inputOtpProps} />
      </Stack>
    </DocPage>
  )
}
