import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AuthoritiesTable } from "@/components/authorities-table"

const menus = ["File", "Pipeline", "Tools", "Help"]

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-foreground">
      {/* Menu bar */}
      <div className="flex items-center gap-1 border-b border-border bg-card px-3 py-1.5 text-sm">
        {menus.map((m) => (
          <button
            key={m}
            className="rounded-lg px-3 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {m}
          </button>
        ))}
      </div>

      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-card px-6 py-4">
            <h1 className="text-xl font-bold text-foreground">Custom Authorities</h1>
          </div>
          <AuthoritiesTable />
        </main>
      </div>
    </div>
  )
}
