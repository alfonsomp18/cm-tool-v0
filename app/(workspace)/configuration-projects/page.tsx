import type { Metadata } from "next"
import { ListChecks } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = { title: "Configuration Projects" }

export default function ConfigurationProjectsPage() {
  return (
    <>
      <PageHeader title="Configuration Projects" tabsBasePath="/configuration-projects" />
      <ComingSoon icon={ListChecks} label="Configuration Projects" />
    </>
  )
}
