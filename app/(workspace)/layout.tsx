import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MenuBar } from "@/components/menu-bar"
import { ProjectProvider } from "@/lib/project-context"
import { createClient } from "@/lib/supabase/server"

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, environment")
    .order("created_at", { ascending: true })

  const cookieStore = await cookies()
  const cookieProject = cookieStore.get("selected_project")?.value
  const initialProject =
    cookieProject && projects?.some((p) => p.id === cookieProject) ? cookieProject : (projects?.[0]?.id ?? "")

  return (
    <ProjectProvider initialProject={initialProject}>
      <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-foreground">
        <MenuBar />
        <AppHeader projects={projects ?? []} userEmail={user.email ?? ""} />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
        </div>
      </div>
    </ProjectProvider>
  )
}
