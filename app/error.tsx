"use client"

import { ErrorBoundaryView } from "@/components/error-boundary-view"

export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <ErrorBoundaryView error={error} reset={reset} />
    </div>
  )
}
