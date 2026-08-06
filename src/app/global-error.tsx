"use client" // Error boundaries must be Client Components

import "./globals.css"

/*
 * Replaces the root layout when the root layout itself is what failed, so it
 * gets no fonts, no ThemeProvider and no site chrome — everything it needs has
 * to be here. That also rules out `metadata`, which is why the title is set
 * with React's <title> instead.
 *
 * Styling stays on the raw tokens from globals.css rather than the component
 * suite: if the failure is in the suite, importing it here would take the
 * error page down with it.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <title>Something went wrong · SubstrateUI</title>
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center gap-6 px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Error
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Something went wrong.
          </h1>
          <p className="text-lg text-muted-foreground">
            The site failed to load. Trying again will re-fetch it — if it keeps failing, the issue
            is on our side and worth reporting.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-muted-foreground">digest: {error.digest}</p>
          )}
          <button
            onClick={() => unstable_retry()}
            className="rounded-md border-2 border-primary-border bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
