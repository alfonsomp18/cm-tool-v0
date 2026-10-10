"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { StatusMessage } from "@/components/status-message"

export function ErrorBoundaryView({
  error,
  reset,
  className,
}: {
  error: Error & { digest?: string }
  reset: () => void
  className?: string
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusMessage
      title="This page couldn't load"
      description="Something went wrong while loading it. Try again. If it keeps happening, send the reference below to support."
      reference={error.digest}
      className={className}
    >
      <Button onClick={reset}>Try again</Button>
      <Button variant="outline" asChild>
        <a href="/">Back to Home</a>
      </Button>
    </StatusMessage>
  )
}
