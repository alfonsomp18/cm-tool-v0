import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MenuBar } from "@/components/menu-bar"
import { ProjectProvider } from "@/lib/project-context"
import { createClient } from "@/lib/supabase/server"
import { getCurrentProject } from "@/lib/current-project"

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { projects, projectId } = await getCurrentProject()

  return (
    <ProjectProvider initialProject={projectId}>
      <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-foreground">
        <MenuBar />
        <AppHeader projects={projects} userEmail={user.email ?? ""} />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
        </div>
      </div>
    </ProjectProvider>
  )
}
