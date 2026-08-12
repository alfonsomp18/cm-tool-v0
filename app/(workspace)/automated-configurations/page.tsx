import { Settings2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function AutomatedConfigurationsPage() {
  return (
    <>
      <PageHeader title="Automated Configurations" />
      <ComingSoon icon={Settings2} label="Automated Configurations" />
    </>
  )
}
