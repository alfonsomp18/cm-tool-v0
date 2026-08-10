import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { MenuBar } from "@/components/menu-bar"
import { ProjectProvider } from "@/lib/project-context"

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-foreground">
        <MenuBar />
        <AppHeader />

        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
        </div>
      </div>
    </ProjectProvider>
  )
}
