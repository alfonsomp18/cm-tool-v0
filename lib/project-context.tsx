"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ProjectContextValue {
  selectedProject: string
  setSelectedProject: (project: string) => void
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState("")
  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>{children}</ProjectContext.Provider>
  )
}

export function useProject() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error("useProject must be used within a ProjectProvider")
  return ctx
}
