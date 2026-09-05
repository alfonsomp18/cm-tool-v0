"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { setSelectedProjectCookie } from "@/lib/actions/project"

interface ProjectContextValue {
  selectedProject: string
  setSelectedProject: (project: string) => void
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({
  children,
  initialProject,
}: {
  children: ReactNode
  initialProject: string
}) {
  const router = useRouter()
  const [selectedProject, setSelectedProjectState] = useState(initialProject)

  function setSelectedProject(project: string) {
    setSelectedProjectState(project)
    void setSelectedProjectCookie(project).then(() => router.refresh())
  }

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>{children}</ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error("useProject must be used within a ProjectProvider")
  return ctx
}
