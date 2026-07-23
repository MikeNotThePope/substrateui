import { buildPrompt, themeIds } from "../docs/foundations/ai-prompt/prompt"

export const dynamic = "force-static"

export function GET() {
  const body = themeIds.map((id) => buildPrompt(id)).join("\n\n---\n\n")
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
