"use client"

import "./globals.css"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
          <h1 className="text-xl font-medium tracking-tight">The app couldn&apos;t load</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Something went wrong while starting up. Reload the page. If it keeps happening, send the reference below to
            support.
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reload
          </button>
          {error.digest && <p className="mt-6 font-mono text-[11px] text-muted-foreground">Reference: {error.digest}</p>}
        </div>
      </body>
    </html>
  )
}
