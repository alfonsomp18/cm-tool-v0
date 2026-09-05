import { cookies } from "next/headers"
import { PageHeader } from "@/components/page-header"
import { AuthoritiesTable } from "@/features/custom-authorities/authorities-table"
import { createClient } from "@/lib/supabase/server"
import { mapAuthorityRow, type AuthorityRow } from "@/features/custom-authorities/authorities-data"

export default async function CustomAuthoritiesPage() {
  const cookieStore = await cookies()
  const projectId = cookieStore.get("selected_project")?.value

  if (!projectId) {
    return (
      <>
        <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Select a project from the header to see its authorities.
        </div>
      </>
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("authorities")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true })

  const authorities = (data ?? []).map((row) => mapAuthorityRow(row as AuthorityRow))

  return (
    <>
      <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
      <AuthoritiesTable initialAuthorities={authorities} fetchError={error?.message ?? null} />
    </>
  )
}
