"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AlertTriangle, Zap, LogOut } from "lucide-react"
import { navCurrent } from "@/lib/nav-active"
import { useProject } from "@/lib/project-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { createClient } from "@/lib/supabase/client"

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

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    // --ring is the brand blue, which would vanish on the blue bar, so focus rings inside the header are white.
    <header className="flex flex-col border-b border-header-foreground/15 bg-header font-header text-header-foreground [--ring:var(--header-foreground)]">
      {/* One row: brand on the left, project switcher and account on the right */}
      <div className="flex items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4">
        <MobileNavTrigger className="-ml-1 text-header-foreground/85 hover:bg-header-foreground/10 hover:text-header-foreground" />

        {/* The brand is the "home" link. The name stays on the link because the title text is hidden on phones. */}
        <Link
          href="/"
          aria-label="End-to-End Certificate Manager tool, home"
          aria-current={navCurrent("/", pathname) === "page" ? "page" : undefined}
          className="-m-1 flex min-w-0 items-center gap-2.5 rounded-lg p-1 hover:bg-header-foreground/10 focus-ring"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-header-foreground text-header">
            <Zap className="h-4 w-4" />
          </div>
          <span className="hidden truncate text-base font-medium tracking-tight lg:inline">
            End-to-End Certificate Manager tool
          </span>
        </Link>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <select
            aria-label="Project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="min-h-8 min-w-0 max-w-[9.5rem] rounded-lg border border-header-foreground/60 bg-header-foreground/10 px-2 py-1.5 text-sm font-medium text-header-foreground outline-none hover:bg-header-foreground/15 focus-visible:border-ring focus-ring sm:max-w-[10rem] sm:px-3 lg:max-w-[14rem] [&_option]:bg-card [&_option]:text-card-foreground"
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
              className="flex items-center gap-1 rounded-md bg-header-foreground px-1.5 py-0.5 text-xs font-medium text-destructive"
              title={projectsError}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Couldn&apos;t load projects</span>
            </span>
          )}

          <div className="flex shrink-0 items-center gap-1 border-l border-header-foreground/30 pl-2 sm:gap-2 sm:pl-3">
            <span className="hidden max-w-[10rem] truncate text-xs text-header-foreground/85 lg:inline" title={userEmail}>
              {userEmail}
            </span>
            <ThemeToggle className="text-header-foreground/85 hover:bg-header-foreground/10 hover:text-header-foreground active:bg-header-foreground/15" />
            <button
              type="button"
              onClick={handleSignOut}
              aria-label="Sign out"
              title="Sign out"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-header-foreground/85 hover:bg-header-foreground/10 hover:text-header-foreground active:bg-header-foreground/15"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
