"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { pipelineNav, toolsNav } from "@/lib/nav-config"
import { ModuleTabs } from "@/components/module-tabs"

function matchesItem(pathname: string, href?: string) {
  if (!href) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

function findSection(pathname: string) {
  if (pipelineNav.some((item) => matchesItem(pathname, item.href))) return "Project Pipeline"
  if (toolsNav.some((item) => matchesItem(pathname, item.href))) return "Tools"
  return null
}

export function PageHeader({ title, tabsBasePath }: { title: string; tabsBasePath?: string }) {
  const pathname = usePathname()
  const section = findSection(pathname)
  const isHome = pathname === "/"

  return (
    <div className="border-b border-border bg-card">
      <div className="flex flex-col gap-1 px-6 py-4">
        {!isHome && (
          <Link
            href="/"
            className="mb-1 flex w-fit items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        )}
        {section && (
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{section}</span>
        )}
        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>
      {tabsBasePath && <ModuleTabs basePath={tabsBasePath} />}
    </div>
  )
}
