"use client"

import { usePathname, useRouter } from "next/navigation"
import { AlertTriangle, Zap, Check, LogOut } from "lucide-react"
import { pipelineNav } from "@/lib/nav-config"
import { useProject } from "@/lib/project-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type StageState = "done" | "active" | "todo"

const steps = pipelineNav
  .filter((item) => item.step != null)
  .sort((a, b) => a.step! - b.step!)

const stateText: Record<StageState, string> = {
  done: ", completed",
  active: ", current step",
  todo: ", not started",
}

// Non-active steps are icon-only until xl; the label stays available to screen readers and as a hover title.
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
    <div className="flex items-center gap-2" title={label}>
      <div
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
          state === "done" && "border-success bg-success text-success-foreground",
          state === "active" && "border-primary bg-primary/10 text-primary",
          state === "todo" && "border-border bg-background text-muted-foreground",
        )}
      >
        {state === "done" ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
      </div>
      <span className="sr-only">
        {label}
        {stateText[state]}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "text-xs font-medium",
          state === "active" ? "text-primary" : "hidden text-muted-foreground xl:inline",
        )}
      >
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

export function AppHeader({
  projects,
  userEmail,
  projectsError,
}: {
  projects: ProjectOption[]
  userEmail: string
  projectsError?: string | null
}) {
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

  const activeStep = steps[activeIndex]

  return (
    <header className="flex flex-col border-b border-border bg-card">
      {/* One row: brand, pipeline stepper (md+), project switcher, account */}
      <div className="flex items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4">
        <MobileNavTrigger className="-ml-1" />

        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span className="hidden truncate text-base font-medium tracking-tight text-foreground xl:inline">
            End-to-End Certificate Manager tool
          </span>
        </div>

        {projectSelected && (
          <nav aria-label="Pipeline progress" className="hidden min-w-0 flex-1 justify-center md:flex">
            <ol className="flex items-center gap-2 xl:gap-3">
              {steps.map((step, i) => {
                const state: StageState = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo"
                return (
                  <li
                    key={step.label}
                    aria-current={state === "active" ? "step" : undefined}
                    className="flex items-center gap-2 xl:gap-3"
                  >
                    <StageNode label={step.shortLabel ?? step.label} icon={step.icon} state={state} />
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className={cn("h-0.5 w-3 rounded-full lg:w-4 xl:w-8", state === "done" ? "bg-success" : "bg-border")}
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <select
            aria-label="Project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="min-w-0 max-w-[9.5rem] rounded-lg border border-input bg-background px-2 py-1.5 text-sm font-medium outline-none focus-visible:border-ring focus-ring sm:max-w-[10rem] sm:px-3 lg:max-w-[14rem]"
          >
            {projects.length === 0 ? (
              <option value="">{projectsError ? "Couldn't load projects" : "No projects yet"}</option>
            ) : (
              <option value="">Select a project...</option>
            )}
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.environment}
              </option>
            ))}
          </select>

          {projectsError && (
            <span
              className="flex items-center gap-1 text-xs text-destructive"
              title={projectsError}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Couldn&apos;t load projects</span>
            </span>
          )}

          <div className="flex shrink-0 items-center gap-1 border-l border-border pl-2 sm:gap-2 sm:pl-3">
            <span className="hidden max-w-[10rem] truncate text-xs text-muted-foreground lg:inline" title={userEmail}>
              {userEmail}
            </span>
            <ThemeToggle />
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

      {/* Phones: the stepper doesn't fit in the row, so show the current step as a slim strip */}
      {projectSelected && (
        <p className="border-t border-border px-3 py-1 text-xs text-muted-foreground md:hidden">
          Step {activeIndex + 1} of {steps.length} ·{" "}
          <span className="font-medium text-foreground">{activeStep.shortLabel ?? activeStep.label}</span>
        </p>
      )}
    </header>
  )
}
