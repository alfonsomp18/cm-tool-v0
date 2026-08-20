import { Settings } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ComingSoon } from "@/components/coming-soon"

export default function DocumentationSettingsPage() {
  return (
    <>
      <PageHeader title="Documentation" tabsBasePath="/documentation" />
      <ComingSoon icon={Settings} label="Settings" />
    </>
  )
}
