"use client"

import { usePathname } from "next/navigation"
import { Menu, Zap, Check } from "lucide-react"
import { pipelineNav } from "@/lib/nav-config"
import { useProject } from "@/lib/project-context"
import { cn } from "@/lib/utils"

type StageState = "done" | "active" | "todo"

const steps = pipelineNav
  .filter((item) => item.step != null)
  .sort((a, b) => a.step! - b.step!)

function StageNode({
  label,
  icon: Icon,
  state,
}: {
  label: string
  icon: React.ElementType
  state: StageState
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border-2",
          state === "done" && "border-success bg-success text-success-foreground",
          state === "active" && "border-primary bg-primary/10 text-primary",
          state === "todo" && "border-border bg-background text-muted-foreground",
        )}
      >
        {state === "done" ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      </div>
      <span className={cn("text-xs font-medium", state === "active" ? "text-primary" : "text-muted-foreground")}>
        {label}
      </span>
    </div>
  )
}

export function AppHeader() {
  const pathname = usePathname()
  const { selectedProject, setSelectedProject } = useProject()
  const projectSelected = Boolean(selectedProject)
  const matchedIndex = steps.findIndex((step) => step.href === pathname)
  const activeIndex = matchedIndex === -1 ? steps.length - 1 : matchedIndex

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
        {steps.map((step, i) => {
          const state: StageState = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo"
          return (
            <div key={step.label} className="flex items-center gap-3">
              <StageNode label={step.shortLabel ?? step.label} icon={step.icon} state={state} />
              {i < steps.length - 1 && (
                <div className={cn("h-0.5 w-8 rounded-full", state === "done" ? "bg-success" : "bg-border")} />
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-2.5">
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none"
        >
          <option value="">Select a project...</option>
          <option value="embraport-uat">Embraport UAT</option>
          <option value="embraport-prod">Embraport PROD</option>
          <option value="contoso-uat">Contoso Freight UAT</option>
        </select>

        <div
          className={cn(
            "flex items-center gap-2.5 transition-opacity",
            !projectSelected && "pointer-events-none opacity-40",
          )}
        >
          <span className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            UAT - AWS AMER | Embraport
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success" />
            Connected (29m)
          </span>
          <div className="flex overflow-hidden rounded-lg border border-border text-xs font-semibold">
            <button
              disabled={!projectSelected}
              className="bg-background px-2.5 py-1.5 text-muted-foreground disabled:pointer-events-none"
            >
              PT
            </button>
            <button
              disabled={!projectSelected}
              className="bg-foreground px-2.5 py-1.5 text-background disabled:pointer-events-none"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
