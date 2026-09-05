"use server"

import { cookies } from "next/headers"

export async function setSelectedProjectCookie(projectId: string) {
  const cookieStore = await cookies()
  cookieStore.set("selected_project", projectId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
}
