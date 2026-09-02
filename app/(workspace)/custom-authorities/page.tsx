import { PageHeader } from "@/components/page-header"
import { AuthoritiesTable } from "@/features/custom-authorities/authorities-table"
import { createClient } from "@/lib/supabase/server"
import { mapAuthorityRow, type AuthorityRow } from "@/features/custom-authorities/authorities-data"

export default async function CustomAuthoritiesPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("authorities")
    .select("*")
    .order("created_at", { ascending: true })

  const authorities = (data ?? []).map((row) => mapAuthorityRow(row as AuthorityRow))

  return (
    <>
      <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
      <AuthoritiesTable initialAuthorities={authorities} fetchError={error?.message ?? null} />
    </>
  )
}
