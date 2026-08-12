import { ListChecks } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function ConfigurationProjectsPage() {
  return (
    <>
      <PageHeader title="Configuration Projects" />
      <ComingSoon icon={ListChecks} label="Configuration Projects" />
    </>
  )
}
