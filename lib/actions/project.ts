"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

const ENVIRONMENTS = ["UAT", "PROD"]

export async function setSelectedProjectCookie(projectId: string) {
  const cookieStore = await cookies()
  cookieStore.set("selected_project", projectId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
}

export async function createProject(input: { name: string; environment: string }): Promise<{ error: string | null }> {
  const name = input.name.trim()
  if (!name) return { error: "Enter a project name." }
  if (name.length > 60) return { error: "Keep the project name to 60 characters or fewer." }
  if (!ENVIRONMENTS.includes(input.environment)) return { error: "Choose UAT or PROD." }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Your session has expired. Sign in again." }

  // RLS only allows inserting a row whose owner_id is the signed-in user.
  const { data, error } = await supabase
    .from("projects")
    .insert({ name, environment: input.environment, owner_id: user.id })
    .select("id")
    .single()
  if (error) return { error: "Couldn't create the project. Try again." }

  await setSelectedProjectCookie(data.id)
  return { error: null }
}
