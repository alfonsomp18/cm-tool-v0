import { cache } from "react"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export const getCurrentProject = cache(async () => {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, environment")
    .order("created_at", { ascending: true })

  const cookieStore = await cookies()
  const cookieProject = cookieStore.get("selected_project")?.value
  const projectId =
    cookieProject && projects?.some((p) => p.id === cookieProject) ? cookieProject : (projects?.[0]?.id ?? "")

  return { projects: projects ?? [], projectId }
})
