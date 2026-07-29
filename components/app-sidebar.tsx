"use client"

import {
  Workflow,
  ListChecks,
  Database,
  Settings2,
  Code2,
  ShieldCheck,
  FlaskConical,
  LifeBuoy,
  Wrench,
  Plug,
  Sparkles,
  ArrowLeftRight,
  Snowflake,
  History,
  FileText,
  Compass,
  ChevronDown,
  Server,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  icon: React.ElementType
  badge?: string
  active?: boolean
  step?: number
}

const pipeline: NavItem[] = [
  { label: "Configuration Projects", icon: ListChecks, step: 1 },
  { label: "Data Ingestion", icon: Database, step: 2 },
  { label: "Automated Configurations", icon: Settings2, step: 3 },
  { label: "Automated ERP Code Mapping", icon: Code2 },
  { label: "Custom Authorities", icon: ShieldCheck, active: true },
  { label: "Automated Testing", icon: FlaskConical, step: 4 },
]

const tools: NavItem[] = [
  { label: "API Connection", icon: Plug },
  { label: "OpenArena AI", icon: Sparkles },
  { label: "REST/SOAP Mapping", icon: ArrowLeftRight },
  { label: "Snowflake", icon: Snowflake },
  { label: "Request History", icon: History },
  { label: "Documentation", icon: FileText },
  { label: "Welcome / Tour", icon: Compass },
]

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

function NavRow({ item }: { item: NavItem }) {
  const Icon = item.icon
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        item.active
          ? "bg-primary/10 font-medium text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {item.step ? (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
          {item.step}
        </span>
      ) : null}
      <Icon className={cn("h-4 w-4 shrink-0", item.active && "text-primary")} />
      <span className="truncate text-left">{item.label}</span>
    </button>
  )
}

export function AppSidebar() {
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
        <SectionHeader icon={Workflow} label="Project Pipeline" />
        <div className="flex flex-col gap-0.5">
          {pipeline.map((item) => (
            <NavRow key={item.label} item={item} />
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 px-3 py-2">
            <LifeBuoy className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Support &amp; Troubleshoot</span>
            <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="mt-2">
          <SectionHeader icon={Wrench} label="Tools" />
          <div className="flex flex-col gap-0.5">
            {tools.map((item) => (
              <NavRow key={item.label} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground">
          <Server className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">API Endpoints</span>
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">
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
