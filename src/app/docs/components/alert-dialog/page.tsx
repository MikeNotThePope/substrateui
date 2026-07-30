"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const alertDialogProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state of the alert dialog.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Callback fired when the open state changes.",
  },
]

export default function AlertDialogPage() {
  return (
    <DocPage
      title="Alert Dialog"
      description="A modal dialog that interrupts the user to confirm a destructive or important action. Requires explicit acknowledgment before proceeding."
    >
      {/* Confirmation Dialog */}
      <Stack gap="md">
        <H3>Confirmation Dialog</H3>
        <ComponentPreview
          code={`<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Delete Account
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently
        delete your account and remove your data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Yes, delete account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
        >
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              Delete Account
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Yes, delete account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "AlertDialog",
          "AlertDialogAction",
          "AlertDialogCancel",
          "AlertDialogContent",
          "AlertDialogDescription",
          "AlertDialogFooter",
          "AlertDialogHeader",
          "AlertDialogTitle",
          "AlertDialogTrigger",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="AlertDialog"
          nodes={[
            { name: "AlertDialogTrigger" },
            {
              name: "AlertDialogContent",
              children: [
                {
                  name: "AlertDialogHeader",
                  children: [
                    { name: "AlertDialogTitle" },
                    { name: "AlertDialogDescription" },
                  ],
                },
                {
                  name: "AlertDialogFooter",
                  children: [
                    { name: "AlertDialogCancel" },
                    { name: "AlertDialogAction" },
                  ],
                },
              ],
            },
          ]}
        />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Built on Base UI primitives, so focus is trapped inside the alert
            dialog while open and restored to the trigger on close. Unlike
            regular Dialog, Escape does not dismiss — the user must choose
            Cancel or Action explicitly, which is appropriate for
            destructive confirmations.
          </P>
          <P>
            Every alert dialog must have an AlertDialogTitle and should
            include an AlertDialogDescription that explains the
            consequences of the action. The description is wired up via{" "}
            <Code>aria-describedby</Code> automatically.
          </P>
        </Stack>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={alertDialogProps} />
      </Stack>
    </DocPage>
  )
}
