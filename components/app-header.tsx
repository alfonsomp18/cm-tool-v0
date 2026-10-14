"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AlertTriangle, Zap, LogOut } from "lucide-react"
import { pipelineNav, type NavItem } from "@/lib/nav-config"
import { useProject } from "@/lib/project-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

// The tracker shows where you are and which stages exist. It does not show completion:
// nothing in the data records stage progress yet, so it can't claim any stage is done.
type StageState = "active" | "available" | "upcoming"

const steps = pipelineNav
  .filter((item) => item.step != null)
  .sort((a, b) => a.step! - b.step!)

function stageState(step: NavItem, pathname: string): StageState {
  if (step.href && (pathname === step.href || pathname.startsWith(`${step.href}/`))) return "active"
  return step.implemented ? "available" : "upcoming"
}

function StageNode({ step, state }: { step: NavItem; state: StageState }) {
  const Icon = step.icon
  const label = step.shortLabel ?? step.label
  const fullLabel = state === "upcoming" ? `${step.label} (coming soon)` : step.label

  const content = (
    <>
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full border-2",
          state === "active" && "border-primary bg-primary/10 text-primary",
          state === "available" && "border-foreground/30 bg-background text-foreground",
          state === "upcoming" && "border-border bg-background text-muted-foreground",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <span
        className={cn(
          "text-xs font-medium",
          state === "active" ? "text-primary" : "hidden md:inline",
          state === "available" && "text-foreground",
          state === "upcoming" && "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </>
  )

  const className = "flex items-center gap-2 rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

  if (!step.href) {
    return (
      <div className={className} title={fullLabel}>
        {content}
      </div>
    )
  }

  return (
    <Link
      href={step.href}
      className={className}
      title={fullLabel}
      aria-label={fullLabel}
      aria-current={state === "active" ? "step" : undefined}
    >
      {content}
    </Link>
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

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="flex flex-col border-b border-border bg-card">
      {/* Row 1: brand + project switcher + account */}
      <div className="flex items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4">
        <MobileNavTrigger className="-ml-1" />

        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span className="hidden truncate text-base font-medium tracking-tight text-foreground sm:inline">
            End-to-End Certificate Manager tool
          </span>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="min-w-0 max-w-[9.5rem] rounded-lg border border-input bg-background px-2 py-1.5 text-sm font-medium outline-none sm:max-w-[14rem] sm:px-3"
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

      {/* Row 2: pipeline stages — only shown once a project is selected */}
      <div className="flex items-center justify-center border-t border-border px-4 py-2.5">
        {projectSelected ? (
          <div className="flex items-center gap-2 md:gap-3">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 md:gap-3">
                <StageNode step={step} state={stageState(step, pathname)} />
                {i < steps.length - 1 && <div className="h-0.5 w-4 rounded-full bg-border md:w-8" />}
              </div>
            ))}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Select a project to see the pipeline</span>
        )}
      </div>
    </header>
  )
}
