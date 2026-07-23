import { DocPage } from "../../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { PromptViewer } from "./prompt-viewer"

export default function AiPromptPage() {
  return (
    <DocPage
      title="AI Prompt"
      description="A drop-in prompt that teaches AI coding assistants to build with SubstrateUI — semantic tokens, component conventions, and the anti-patterns that keep output on-system."
    >
      <Stack gap="md">
        <H3>How to use it</H3>
        <P>
          Pick a theme, copy the prompt, and paste it into your AI assistant
          (Claude Code, Cursor, Copilot, etc.) before asking it to build UI —
          or save it as a project instruction file like{" "}
          <Code>CLAUDE.md</Code>. Because the prompt references semantic
          tokens rather than raw color values, everything the assistant
          generates stays theme-switchable, dark-mode-correct, and
          WCAG-compliant by construction.
        </P>
        <P>
          The prompt is also served as plain text at{" "}
          <Code>/llms.txt</Code> for agents that fetch context by URL.
        </P>
      </Stack>

      <PromptViewer />
    </DocPage>
  )
}
