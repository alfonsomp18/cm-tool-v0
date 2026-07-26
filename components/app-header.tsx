"use client"

import { Menu, Settings, Zap, FlaskConical, ClipboardCheck, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Stage {
  label: string
  icon: React.ElementType
  state: "done" | "active" | "todo"
}

const stages: Stage[] = [
  { label: "Config", icon: Settings, state: "done" },
  { label: "Ingestion", icon: ClipboardCheck, state: "done" },
  { label: "Automation", icon: Zap, state: "done" },
  { label: "Testing", icon: FlaskConical, state: "active" },
]

function StageNode({ stage }: { stage: Stage }) {
  const Icon = stage.icon
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-sm border",
          stage.state === "done" && "border-primary bg-primary text-primary-foreground",
          stage.state === "active" && "border-accent bg-accent/10 text-accent",
          stage.state === "todo" && "border-border bg-background text-muted-foreground",
        )}
      >
        {stage.state === "done" ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
      </div>
      <span
        className={cn(
          "text-[11px] font-medium",
          stage.state === "active" ? "text-accent" : "text-muted-foreground",
        )}
      >
        {stage.label}
      </span>
    </div>
  )
}

export function AppHeader() {
  return (
    <header className="flex items-center gap-3 border-b border-border bg-card px-3 py-2">
      <button className="rounded-sm p-1.5 text-muted-foreground hover:bg-secondary" aria-label="Toggle menu">
        <Menu className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
          <Zap className="h-3.5 w-3.5" />
        </div>
        <span className="text-balance text-sm font-semibold text-foreground">
          ONESOURCE IDT Professional Services Studio
        </span>
      </div>

      <div className="mx-auto flex items-center gap-3">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-3">
            <StageNode stage={stage} />
            {i < stages.length - 1 && (
              <div
                className={cn("h-px w-6", stage.state === "done" ? "bg-primary" : "bg-border")}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <select className="rounded-sm border border-input bg-background px-2 py-1 text-xs outline-none">
          <option>Embraport UAT</option>
        </select>
        <span className="rounded-sm bg-accent/15 px-2 py-1 text-[11px] font-semibold text-accent">
          UAT - AWS AMER | Embraport
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Connected (29m)
        </span>
        <div className="flex overflow-hidden rounded-sm border border-border text-[11px] font-semibold">
          <button className="bg-background px-2 py-1 text-muted-foreground">PT</button>
          <button className="bg-primary px-2 py-1 text-primary-foreground">EN</button>
        </div>
      </div>
    </header>
  )
}
