import { Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function AutomatedTestingActivityPage() {
  return (
    <>
      <PageHeader title="Automated Testing" tabsBasePath="/automated-testing" />
      <ComingSoon icon={Activity} label="Activity" />
    </>
  )
}
