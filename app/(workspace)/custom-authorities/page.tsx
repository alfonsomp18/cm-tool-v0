import { PageHeader } from "@/components/page-header"
import { AuthoritiesTable } from "@/features/custom-authorities/authorities-table"

export default function CustomAuthoritiesPage() {
  return (
    <>
      <PageHeader title="Custom Authorities" tabsBasePath="/custom-authorities" />
      <AuthoritiesTable />
    </>
  )
}
