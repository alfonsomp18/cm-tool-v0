"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { pipelineNav, toolsNav } from "@/lib/nav-config"

const tabs = [
  { label: "Overview", slug: "" },
  { label: "Settings", slug: "settings" },
  { label: "Activity", slug: "activity" },
]

export function ModuleTabs({ basePath }: { basePath: string }) {
  const pathname = usePathname()

  // Only offer sections that are built (see NavItem.tabs). With nothing beyond Overview there is nothing to
  // switch between, so no strip is shown.
  const built = [...pipelineNav, ...toolsNav].find((item) => item.href === basePath)?.tabs ?? []
  const visible = tabs.filter((tab) => !tab.slug || built.includes(tab.slug as "settings" | "activity"))
  if (visible.length < 2) return null

  return (
    <div className="flex items-center gap-1 px-4 md:px-6">
      {visible.map((tab) => {
        const href = tab.slug ? `${basePath}/${tab.slug}` : basePath
        const active = pathname === href
        return (
          <Link
            key={tab.label}
            href={href}
            className={cn(
              "border-b-2 px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
