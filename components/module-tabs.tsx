"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Overview", slug: "" },
  { label: "Settings", slug: "settings" },
  { label: "Activity", slug: "activity" },
]

export function ModuleTabs({ basePath }: { basePath: string }) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-1 px-6">
      {tabs.map((tab) => {
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
