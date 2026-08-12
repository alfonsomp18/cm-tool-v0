"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useProject } from "@/lib/project-context"

const menus = ["File", "Pipeline", "Tools", "Help"]

export function MenuBar() {
  const { selectedProject } = useProject()
  const enabled = Boolean(selectedProject)

  return (
    <div className="flex items-center gap-1 border-b border-border bg-card px-3 py-1.5 text-sm">
      {menus.map((m) => (
        <DropdownMenu key={m}>
          <DropdownMenuTrigger asChild>
            <button
              disabled={!enabled}
              title={enabled ? undefined : "Select a project to enable"}
              className="rounded-lg px-3 py-1 text-muted-foreground transition-opacity hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40 disabled:hover:bg-transparent"
            >
              {m}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem disabled>{m} menu coming soon</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </div>
  )
}
