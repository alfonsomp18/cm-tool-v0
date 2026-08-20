import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function WelcomeTourSettingsPage() {
  return (
    <>
      <PageHeader title="Welcome / Tour" tabsBasePath="/welcome-tour" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
