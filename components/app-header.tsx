"use client"

import { usePathname, useRouter } from "next/navigation"
import { Menu, Zap, Check, LogOut } from "lucide-react"
import { pipelineNav } from "@/lib/nav-config"
import { useProject } from "@/lib/project-context"
import { createClient } from "@/lib/supabase/client"
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

interface ProjectOption {
  id: string
  name: string
  environment: string
}

export function AppHeader({ projects, userEmail }: { projects: ProjectOption[]; userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedProject, setSelectedProject } = useProject()
  const projectSelected = Boolean(selectedProject)
  const matchedIndex = steps.findIndex((step) => step.href === pathname)
  const activeIndex = matchedIndex === -1 ? steps.length - 1 : matchedIndex

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="flex flex-col border-b border-border bg-card">
      {/* Row 1: brand + project switcher + secondary status */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary" aria-label="Toggle menu">
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-balance text-base font-bold text-foreground">
            End-to-End Certificate Manager tool
          </span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium outline-none"
          >
            {projects.length === 0 && <option value="">No projects yet</option>}
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.environment}
              </option>
            ))}
          </select>

          <div
            className={cn(
              "flex items-center gap-3 border-l border-border pl-3 transition-opacity",
              !projectSelected && "pointer-events-none opacity-40",
            )}
          >
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

          <div className="flex items-center gap-2 border-l border-border pl-3">
            <span className="max-w-[10rem] truncate text-xs text-muted-foreground" title={userEmail}>
              {userEmail}
            </span>
            <button
              onClick={handleSignOut}
              aria-label="Sign out"
              title="Sign out"
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Flow — only meaningful once a project is selected */}
      <div className="flex items-center justify-center border-t border-border px-4 py-2.5">
        {projectSelected ? (
          <div className="flex items-center gap-3">
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
        ) : (
          <span className="text-xs text-muted-foreground">Select a project to see pipeline progress</span>
        )}
      </div>
    </header>
  )
}
