import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function ConfigurationProjectsActivityPage() {
  return (
    <>
      <PageHeader title="Configuration Projects" tabsBasePath="/configuration-projects" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
