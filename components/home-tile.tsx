import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { NavItem } from "@/lib/nav-config"
import { cn } from "@/lib/utils"

export function HomeTile({ item }: { item: NavItem }) {
  const Icon = item.icon
  const built = Boolean(item.href)

  const content = (
    <>
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg",
          built ? "bg-secondary text-foreground" : "bg-secondary text-muted-foreground",
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">{item.label}</span>
        {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
      </div>
      {built ? (
        <span className="flex items-center gap-1 text-xs font-medium text-primary">
          Open
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      ) : (
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          Coming soon
        </span>
      )}
    </>
  )

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:shadow-sm"
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
