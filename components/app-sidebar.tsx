"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Workflow, LifeBuoy, Wrench, ChevronDown, Server } from "lucide-react"
import { homeNav, pipelineNav, toolsNav, type NavItem } from "@/lib/nav-config"
import { cn } from "@/lib/utils"

function SectionHeader({
  icon: Icon,
  label,
  open,
  onToggle,
}: {
  icon: React.ElementType
  label: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary"
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <ChevronDown
        className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", !open && "-rotate-90")}
      />
    </button>
  )
}

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon
  const className = cn(
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
    active
      ? "bg-primary/10 font-medium text-primary"
      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
  )
  const content = (
    <>
      {item.step ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
          {item.step}
        </span>
      ) : null}
      <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
      <span className="truncate text-left">{item.label}</span>
    </>
  )

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {content}
      </Link>
    )
  }

  return <button className={className}>{content}</button>
}

type SectionKey = "pipeline" | "support" | "tools"

export function AppSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    pipeline: true,
    support: true,
    tools: true,
  })

  function toggleSection(key: SectionKey) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border p-3">
        <input
          type="search"
          placeholder="Search endpoint..."
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="mb-2">
          <NavRow item={homeNav} active={homeNav.href === pathname} />
        </div>

        <SectionHeader
          icon={Workflow}
          label="Project Pipeline"
          open={openSections.pipeline}
          onToggle={() => toggleSection("pipeline")}
        />
        {openSections.pipeline && (
          <div className="flex flex-col gap-0.5">
            {pipelineNav.map((item) => (
              <NavRow key={item.label} item={item} active={item.href === pathname} />
            ))}
          </div>
        )}

        <div className="mt-4">
          <SectionHeader
            icon={LifeBuoy}
            label="Support & Troubleshoot"
            open={openSections.support}
            onToggle={() => toggleSection("support")}
          />
        </div>

        <div className="mt-2">
          <SectionHeader
            icon={Wrench}
            label="Tools"
            open={openSections.tools}
            onToggle={() => toggleSection("tools")}
          />
          {openSections.tools && (
            <div className="flex flex-col gap-0.5">
              {toolsNav.map((item) => (
                <NavRow key={item.label} item={item} active={item.href === pathname} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground">
          <Server className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">API Endpoints</span>
          <span className="ml-auto rounded-full bg-foreground px-2 py-0.5 text-[11px] font-semibold text-background">
            142
          </span>
        </div>
      </nav>

      <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
        GET List Authorities · 200
      </div>
    </aside>
  )
}
