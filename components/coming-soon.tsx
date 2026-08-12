import type { LucideIcon } from "lucide-react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export function ComingSoon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{label} module coming soon</EmptyTitle>
        <EmptyDescription>This page is wired up and ready — build the module here.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
