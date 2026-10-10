import { Button } from "@/components/ui/button"
import { StatusMessage } from "@/components/status-message"

export default function NotFound() {
  return (
    <div className="flex min-h-screen bg-background">
      <StatusMessage
        code="404"
        title="Page not found"
        description="This page doesn't exist, or it has moved. Check the address, or go back to Home."
      >
        <Button asChild>
          <a href="/">Back to Home</a>
        </Button>
      </StatusMessage>
    </div>
  )
}
