import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function AutomatedConfigurationsActivityPage() {
  return (
    <>
      <PageHeader title="Automated Configurations" tabsBasePath="/automated-configurations" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
