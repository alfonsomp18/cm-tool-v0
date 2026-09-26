"use client"

import { createContext, useContext, useRef, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
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
  const persistedProject = useRef(initialProject)
  const latestRequest = useRef(0)

  function setSelectedProject(project: string) {
    const requestId = ++latestRequest.current
    setSelectedProjectState(project)

    setSelectedProjectCookie(project)
      .then(() => {
        persistedProject.current = project
        if (requestId === latestRequest.current) router.refresh()
      })
      .catch(() => {
        if (requestId !== latestRequest.current) return
        setSelectedProjectState(persistedProject.current)
        toast.error("Couldn't switch project. Please try again.")
      })
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
