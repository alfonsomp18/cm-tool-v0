"use client"

import { Menubar, MenubarContent, MenubarLabel, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { useProject } from "@/lib/project-context"

const menus = ["File", "Pipeline", "Tools", "Help"]

// A real ARIA menubar: one Tab stop, Left/Right arrows move between menus, Down/Enter/Space open one.
// Menus stay openable before a project is chosen and say why they're empty, rather than being `disabled`
// (disabled buttons drop out of the tab order and their `title` explanation never reaches keyboard or touch users).
export function MenuBar() {
  const { selectedProject } = useProject()
  const enabled = Boolean(selectedProject)

  return (
    <Menubar
      aria-label="Application menu"
      className="h-auto gap-1 rounded-none border-0 border-b border-border bg-card px-3 py-1.5 text-sm shadow-none"
    >
      {menus.map((m) => (
        <MenubarMenu key={m}>
          <MenubarTrigger className="min-h-9 rounded-lg px-3 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground focus-ring sm:min-h-8">
            {m}
          </MenubarTrigger>
          <MenubarContent>
            {enabled ? (
              <MenubarItem disabled>{m} menu coming soon</MenubarItem>
            ) : (
              <MenubarLabel className="font-normal text-muted-foreground">
                Select a project to use the {m} menu
              </MenubarLabel>
            )}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  )
}
