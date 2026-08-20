import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function AutomatedTestingSettingsPage() {
  return (
    <>
      <PageHeader title="Automated Testing" tabsBasePath="/automated-testing" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
