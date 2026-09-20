import { cache } from "react"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export const getCurrentProject = cache(async () => {
  const supabase = await createClient()
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, environment")
    .order("created_at", { ascending: true })

  const cookieStore = await cookies()
  const cookieEntry = cookieStore.get("selected_project")
  const cookieValue = cookieEntry?.value

  // A cookie explicitly set to "" means the user deliberately deselected a
  // project - respect that. No cookie at all (first visit) or a cookie
  // pointing at a project the user no longer has (stale/deleted) both fall
  // back to the first project instead.
  let projectId: string
  if (cookieValue === "") {
    projectId = ""
  } else if (cookieValue && projects?.some((p) => p.id === cookieValue)) {
    projectId = cookieValue
  } else {
    projectId = projects?.[0]?.id ?? ""
  }

  return { projects: projects ?? [], projectId, error: error?.message ?? null }
})
