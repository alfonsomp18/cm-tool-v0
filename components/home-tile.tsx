import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { NavItem } from "@/lib/nav-config"
import { cn } from "@/lib/utils"

export function HomeTile({ item }: { item: NavItem }) {
  const Icon = item.icon
  const implemented = Boolean(item.implemented)

  const content = (
    <>
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg bg-secondary",
          implemented ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-medium tracking-tight text-foreground">{item.label}</span>
        {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
      </div>
      {implemented ? (
        <span className="flex items-center gap-1 text-xs font-medium text-foreground">
          Open
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      ) : (
        <span className="text-[11px] text-muted-foreground">Coming soon</span>
      )}
    </>
  )

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors",
          implemented ? "hover:border-foreground/25" : "hover:border-input",
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 opacity-60">
      {content}
    </div>
  )
}
