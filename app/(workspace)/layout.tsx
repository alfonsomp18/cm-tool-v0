import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MenuBar } from "@/components/menu-bar"
import { ProjectProvider } from "@/lib/project-context"
import { getCurrentProject } from "@/lib/current-project"

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  // middleware.ts already ran auth.getUser() to gate this request and
  // forwarded the result via headers - reuse it instead of paying for a
  // second Supabase Auth round-trip for the same check.
  const headerList = await headers()
  const userId = headerList.get("x-user-id")
  const userEmail = headerList.get("x-user-email") ?? ""

  if (!userId) {
    redirect("/login")
  }

  const { projects, projectId, error: projectsError } = await getCurrentProject()

  return (
    <ProjectProvider initialProject={projectId}>
      <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-foreground">
        <MenuBar />
        <AppHeader projects={projects} userEmail={userEmail} projectsError={projectsError} />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
        </div>
      </div>
    </ProjectProvider>
  )
}
