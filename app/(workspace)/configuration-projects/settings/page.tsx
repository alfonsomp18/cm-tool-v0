import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function ConfigurationProjectsSettingsPage() {
  return (
    <>
      <PageHeader title="Configuration Projects" tabsBasePath="/configuration-projects" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
