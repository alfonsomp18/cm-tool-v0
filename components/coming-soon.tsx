import type { LucideIcon } from "lucide-react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { pipelineNav, toolsNav } from "@/lib/nav-config"

const FALLBACK = "This section isn't available yet."

// The module's one-line description comes from the nav config (the same text as its Home tile), matched by
// label. Sub-pages such as "Settings" and "Activity" don't match a module, so they get the generic line.
function describe(label: string) {
  return [...pipelineNav, ...toolsNav].find((item) => item.label === label)?.description ?? FALLBACK
}

export function ComingSoon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{label} is coming soon</EmptyTitle>
        <EmptyDescription>{describe(label)}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
