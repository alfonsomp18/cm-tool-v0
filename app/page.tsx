import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { AuthoritiesTable } from "@/components/authorities-table"

const menus = ["File", "Pipeline", "Tools", "Help"]

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-foreground">
      {/* Menu bar */}
      <div className="flex items-center gap-0.5 border-b border-border bg-card px-2 py-1 text-[13px]">
        {menus.map((m) => (
          <button
            key={m}
            className="rounded-sm px-2 py-0.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            {m}
          </button>
        ))}
      </div>

      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2">
            <h1 className="text-sm font-semibold text-foreground">Custom Authorities</h1>
          </div>
          <AuthoritiesTable />
        </main>
      </div>
    </div>
  )
}
