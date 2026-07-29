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
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border-2",
          stage.state === "done" && "border-success bg-success text-success-foreground",
          stage.state === "active" && "border-accent bg-accent/10 text-accent",
          stage.state === "todo" && "border-border bg-background text-muted-foreground",
        )}
      >
        {stage.state === "done" ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      </div>
      <span
        className={cn(
          "text-xs font-medium",
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
    <header className="flex items-center gap-4 border-b border-border bg-card px-4 py-3">
      <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" aria-label="Toggle menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Zap className="h-4 w-4" />
        </div>
        <span className="text-balance text-base font-bold text-foreground">
          ONESOURCE IDT Professional Services Studio
        </span>
      </div>

      <div className="mx-auto flex items-center gap-3">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-3">
            <StageNode stage={stage} />
            {i < stages.length - 1 && (
              <div
                className={cn("h-0.5 w-8 rounded-full", stage.state === "done" ? "bg-success" : "bg-border")}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none">
          <option>Embraport UAT</option>
        </select>
        <span className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-accent">
          UAT - AWS AMER | Embraport
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success" />
          Connected (29m)
        </span>
        <div className="flex overflow-hidden rounded-lg border border-border text-xs font-semibold">
          <button className="bg-background px-2.5 py-1.5 text-muted-foreground">PT</button>
          <button className="bg-primary px-2.5 py-1.5 text-primary-foreground">EN</button>
        </div>
      </div>
    </header>
  )
}
