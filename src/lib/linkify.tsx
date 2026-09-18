import * as React from "react"

// A deliberately narrow pattern: http(s) only, stopping before trailing
// punctuation so "see https://example.com." does not link the full stop. It
// does not try to catch bare domains or mailto:, because a false positive here
// turns a word in someone's message into a link they did not write.
const URL_RE = /(https?:\/\/[^\s<>"']*[^\s<>"'.,;:!?)\]}])/g

/**
 * Turn the URLs in a plain-text string into anchors, leaving everything else as
 * text. For text a person typed and the product did not: a message body, a
 * note, a reason field.
 *
 * It returns nodes rather than HTML, so nothing in the input is ever parsed as
 * markup and there is no `dangerouslySetInnerHTML` at the call site. Render it
 * inside an element that wraps: the anchors carry `break-all` because a long
 * URL with no spaces in it will otherwise push a panel sideways.
 *
 * @example
 * <p className="whitespace-pre-wrap break-words">{linkify(message.body)}</p>
 *
 * @param text - Plain text, as typed.
 * @returns Text and anchor nodes, in order.
 */
export function linkify(text: string): React.ReactNode[] {
  // split() with a capturing group puts the captures at the odd indices, so the
  // parity is the test for "is this a URL" and no second pass is needed.
  return text
    .split(URL_RE)
    .map((part, i) =>
      i % 2 === 1 ? (
        <a
          key={i}
          href={part}
          className="break-all underline underline-offset-4"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        part
      ),
    )
}
