"use client"

import { usePathname } from "next/navigation"
import { pipelineNav, toolsNav } from "@/lib/nav-config"

function findSection(pathname: string) {
  if (pipelineNav.some((item) => item.href === pathname)) return "Project Pipeline"
  if (toolsNav.some((item) => item.href === pathname)) return "Tools"
  return null
}

export function PageHeader({ title }: { title: string }) {
  const pathname = usePathname()
  const section = findSection(pathname)

  return (
    <div className="flex flex-col gap-1 border-b border-border bg-card px-6 py-4">
      {section && (
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{section}</span>
      )}
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </div>
  )
}
